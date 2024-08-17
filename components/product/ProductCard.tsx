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
            "w-full bg-base-200",
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
          <div class="flex gap-5">
            <ul class="lg:flex gap-3.5 overflow-hidden">
              {secondVariants.map((variant) => (
                <li class="bg-base-content cursor-pointer text-primary-content min-w-[2rem] min-h-[2rem] flex justify-center items-center hover:border hover:border-primary">
                  <a
                    class="w-full h-full font-semibold text-[.8125rem] leading-[.875rem] flex justify-center items-center"
                    href={variant[1]}
                  >
                    {variant[0]}
                  </a>
                </li>
              ))}
            </ul>
            <button class="w-[30px] ml-auto border-[0] bg-[grey] rounded-l relative right-[-5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="21"
                viewBox="0 0 25 21"
              >
                <g
                  fill="#fff"
                  data-name="Group 3962"
                  transform="translate(-228 -12.187)"
                >
                  <path
                    stroke="#fff"
                    stroke-width="0.5"
                    d="M252.725 19.424a.655.655 0 00-.65-.582h-1.834v-.619a2.828 2.828 0 00-5.653 0v.619h-1.878a.656.656 0 00-.649.572l-.056 10.508a.655.655 0 00.65.735h9.42a.653.653 0 00.643-.722zm-3.268-.582h-4.085v-.619a2.044 2.044 0 014.085 0zm-4.476 2.106a.386.386 0 00.391-.38v-.849h4.085v.849a.392.392 0 00.784 0v-.849h1.634l-.054 10.062h-8.914V19.718h1.681v.849a.386.386 0 00.393.38z"
                    data-name="Path 3600"
                  >
                  </path>
                  <text
                    data-name="+"
                    font-family="SegoeUI, Segoe UI"
                    font-size="16"
                    letter-spacing=".055em"
                    transform="translate(234 29.187)"
                  >
                    <tspan x="-5.473" y="0">+</tspan>
                  </text>
                </g>
              </svg>
            </button>
          </div>
          <ul class="lg:flex mt-4 overflow-hidden min-h-[50px]">
            {variationColors && variationColors.length > 0 &&
              variationColors.map((variation) => (
                <li class="mr-[22px] min-w-[45px] max-h-[45px] bg-base-200">
                  <a
                    class="w-full h-full min-w-[45px] max-h-[45px] bg-base-200"
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
                      class={"border border-secondary-content bg-base-200"}
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

      <a href={relativeUrl} class="mt-2.5">
        <span class="min-w-[5.125rem] max-w-[5.125rem] my-2.5 text-primary-content bg-base-content leading-3 text-xs flex justify-center items-center p-1.5">
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
            class="font-semibold font-roboto text-sm leading-[1.125rem] overflow-hidden text-ellipsis	text-primary "
          >
            {title}
          </span>
        </div>

        <div class="flex flex-col gap-2.5 pt-3">
          {
            /* {listPrice && (
            <span class="line-through font-normal text-gray-400">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )} */
          }
          <span class="font-semibold text-primary text-sm leading-[.875rem]">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          {
            /* <span class="text-neutral-content text-sm leading-[.875rem]">
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
