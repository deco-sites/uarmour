import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section from "../../components/ui/Section.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { HTMLWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/mod.ts";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  variant: "Normal" | "Reverse";
}

export interface Props {
  title: HTMLWidget;
  description: HTMLWidget;
  cta: CTA;
  products: Product[] | null;
}

export const loader = async (props: Props, req: Request) => {
  const productsWithVariations = await Promise.all(
    props.products.map(async (product) => {
      if (product?.isVariantOf?.model) {
        const variations = await fetch(
          `https://www.mizuno.com.br/api/catalog_system/pub/products/search?fq=alternateIds_RefId:${
            product.isVariantOf.model.substr(0, 10)
          }*&_from=0&_to=20`,
        ).then((r) => r.json());

        return {
          ...product,
          variationColors: variations,
        };
      }
      return product;
    }),
  );

  return {
    ...props,
    products: productsWithVariations,
  };
};

export default function ProductShelf(
  { products, title, description, cta }: SectionProps<typeof loader>,
) {
  if (!products || products.length === 0) {
    return null;
  }

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        item_list_name: title,
        items: products.map((product, index) =>
          mapProductToAnalyticsItem({
            index,
            product,
            ...(useOffer(product.offers)),
          })
        ),
      },
    },
  });

  return (
    <Section.Container
      {...viewItemListEvent}
      class="[view-transition-name:loading-fallback-2]"
    >
      <div class="flex flex-col gap-[1.5rem] max-w-[60%] items-center justify-center mx-auto">
        <h3
          class="text-[#000] font-black uppercase text-[2.5rem] lg:text-[4rem] leading-[1] text-center"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          class="text-[#000] text-[.75rem] text-center font-[600]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <a
          key={cta?.id}
          id={cta?.id}
          href={cta?.href}
          target={cta?.href.includes("http") ? "_blank" : "_self"}
          class={`group relative overflow-hidden text-center rounded-[.5rem] text-[16px] hover:bg-gradient-to-r p-[1rem_2rem] lg:p-[1rem_5rem] transition-all duration-300 ease-out ${
            cta.variant === "Reverse"
              ? "bg-secondary text-white"
              : "bg-black text-white"
          }`}
        >
          <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40">
          </span>
          <span class="relative font-[600] text-[.75rem] text-center">
            {cta?.text}
          </span>
        </a>
      </div>
      <ProductSlider products={products} itemListName={title} />
    </Section.Container>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "716px" }}
      class="flex justify-center items-center [view-transition-name:loading-fallback-2]"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
