import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import { Ring } from "./ProductVariantSelector.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
}

const WIDTH = 287;
const HEIGHT = 287;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const id = useId();

  const { url, image: images, offers, isVariantOf, variationColors } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  const { listPrice, price, seller = "1", availability, installments } =
    useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const possibilities = useVariantPossibilities(hasVariant, product);
  // const firstSkuVariations = Object.entries(possibilities)[0];
  // const variants = Object.entries(firstSkuVariations[1] ?? {});
  const secondSkuVariations = Object.entries(possibilities)[1];
  const secondVariants = Object.entries(secondSkuVariations[1] ?? {}); // <-
  const relativeUrl = relative(url);
  // const percent = listPrice && price
  //   ? Math.round(((listPrice - price) / listPrice) * 100)
  //   : 0;

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  return (
    <div
      {...event}
      class={clx("card card-compact group text-sm", _class)}
    >
      <figure
        class={clx(
          "relative bg-base-200 group",
          "rounded border border-transparent",
        )}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
          class={clx(
            "absolute top-0 left-0",
            "grid grid-cols-1 grid-rows-1",
            "w-full bg-[#f2f2f2]",
            !inStock && "opacity-70",
          )}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{
              aspectRatio: ASPECT_RATIO,
              mixBlendMode: "multiply",
              contentVisibility: "auto",
              backgroundSize: "contain",
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat",
            }}
            class={clx(
              "object-cover",
              "w-full",
              "col-span-full row-span-full",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
        <div class="p-[.3125rem] absolute bottom-0 left-0 w-full bg-white ease-in-out transition-all duration-[.4s] translate-y-full group-hover:translate-y-0">
          <div class="flex gap-[20px]">
            <ul class="lg:flex gap-[.875rem] overflow-hidden">
              {secondVariants.map((variant) => (
                <li class="bg-[#f0f0f0] cursor-pointer text-[#545454] min-w-[2rem] min-h-[2rem] flex justify-center items-center hover:border hover:border-[#1d1d1d]">
                  <a
                    class="w-full h-full font-[600] text-[.8125rem] leading-[.875rem] flex justify-center items-center"
                    href={variant[1]}
                  >
                    {variant[0]}
                  </a>
                </li>
              ))}
            </ul>
            <button class="ml-auto border-[0] bg-[grey] rounded-l-[.25rem] relative right-[-5px]">
              <Icon id="add-to-cart" size={25} />
            </button>
          </div>
          <ul class="lg:flex mt-[16px] overflow-hidden min-h-[50px]">
            {variationColors && variationColors.length > 0 &&
              variationColors.map((variation) => (
                <li class="mr-[22px] min-w-[45px] max-h-[45px] bg-[#f2f2f2]">
                  <a
                    class="w-full h-full min-w-[45px] max-h-[45px] bg-[#f2f2f2]"
                    href={"/" + variation.linkText + "/p"}
                  >
                    <Image
                      src={variation.items[0].images[0].imageUrl}
                      alt={front.alternateName}
                      width={45}
                      style={{
                        aspectRatio: ASPECT_RATIO,
                        mixBlendMode: "multiply",
                        contentVisibility: "auto",
                        backgroundSize: "contain",
                        backgroundPosition: "50%",
                        backgroundRepeat: "no-repeat",
                      }}
                      height={46}
                      class={"border border-[#eee5e5] bg-[#f2f2f2]"}
                      loading={"lazy"}
                      decoding="async"
                    />
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div class="absolute top-0 right-0">
          <WishlistButton item={item} variant="icon" />
        </div>
      </figure>

      <a href={relativeUrl} class="mt-[.625rem]">
        <span class="min-w-[5.125rem] max-w-[5.125rem] my-[10px] text-[#545454] bg-[#f0f0f0] leading-[.75rem] text-[.75rem] flex justify-center items-center p-[.375rem]">
          {variationColors && variationColors.length > 0 &&
            variationColors.length +
              (variationColors.length > 1 ? " Cores" : " Cor")}
        </span>
        <div>
          <span
            style={{
              "-webkit-line-clamp": "2",
              "-webkit-box-orient": "vertical",
              display: "-webkit-box",
            }}
            class="font-[600] font-roboto text-[.875rem] leading-[1.125rem] overflow-hidden text-ellipsis	text-[#1d1d1d] "
          >
            {title}
          </span>
        </div>

        <div class="flex flex-col gap-[.625rem] pt-[.75rem]">
          {
            /* {listPrice && (
            <span class="line-through font-normal text-gray-400">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )} */
          }
          <span class="font-[600] text-[#1d1d1d] text-[.875rem] leading-[.875rem]">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          {
            /* <span class="text-[#707070] text-[.875rem] leading-[.875rem]">
            {installments}
          </span> */
          }
          <Image
            src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11898/f087df0c-30fb-440f-9e89-24f53bd4270f"}
            width={83}
            class={clx(
              "object-cover",
              "",
              "",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      </a>

      {/* SKU Selector */}
      {
        /* {variants.length > 1 && (
        <ul class="flex items-center justify-start gap-2 pt-4 pb-1 pl-1 overflow-x-auto">
          {variants.map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link} class="cursor-pointer">
                  <input
                    class="hidden peer"
                    type="radio"
                    name={`${id}-${firstSkuVariations[0]}`}
                    checked={link === relativeUrl}
                  />
                  <Ring value={value} checked={link === relativeUrl} />
                </a>
              </li>
            ))}
        </ul>
      )} */
      }

      <div class="flex-grow" />

      {
        /* <div>
        {inStock
          ? (
            <AddToCartButton
              product={product}
              seller={seller}
              item={item}
              class={clx(
                "btn",
                "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                "hover:!bg-transparent",
                "disabled:!bg-transparent disabled:!opacity-50",
                "btn-primary hover:!text-primary disabled:!text-primary",
              )}
            />
          )
          : (
            <a
              href={relativeUrl}
              class={clx(
                "btn",
                "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                "hover:!bg-transparent",
                "disabled:!bg-transparent disabled:!opacity-75",
                "btn-error hover:!text-error disabled:!text-error",
              )}
            >
              Sold out
            </a>
          )}
      </div> */
      }
    </div>
  );
}

export default ProductCard;
