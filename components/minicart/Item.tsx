import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useScript } from "deco/hooks/useScript.ts";
// import QuantitySelector from "../ui/QuantitySelector.tsx";

export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
};

export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}

// const QUANTITY_MAX_VALUE = 100;

const removeItemHandler = () => {
  const itemID = (event?.currentTarget as HTMLButtonElement | null)
    ?.closest("fieldset")
    ?.getAttribute("data-item-id");

  if (typeof itemID === "string") {
    window.STOREFRONT.CART.setQuantity(itemID, 0);
  }
};

function CartItem({ item, locale, currency }: Props) {
  const { image, price = Infinity, item_url } = item;
  const isGift = price < 0.01;

  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;

  return (
    <fieldset
      // deno-lint-ignore no-explicit-any
      data-item-id={(item as any).item_id}
      class="grid grid-rows-1 gap-2"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <a class="bg-base-300 rounded-lg mr-5" href={item_url}>
        <Image
          alt={name}
          src={image.replace("55-55", "250-250")}
          width={110}
          class="object-contain w-[110px]"
        />
      </a>

      {/* Info */}
      <div class="flex flex-col gap-2 justify-between">
        {/* Name and Remove button */}
        <div class="flex justify-between">
          <legend
            class="text-[1.125rem] leading-[18px] font-medium	text-black max-w-[11.625rem] mb-5"
            style={{
              "-webkit-box-orient": "vertical",
              "-webkit-line-clamp": "2",
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </legend>
          <button
            class={clx(
              isGift && "hidden",
              "h-min	",
            )}
            hx-on:click={useScript(removeItemHandler)}
          >
            <Image
              width={18}
              src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11899/1e896331-8348-4e80-a861-91e06253ad37"
            />
          </button>
        </div>

        {/* Price Block */}
        <div class="flex items-center gap-2">
          <span class="text-[.75rem] text-black leading-[.875rem] tracking-normal font-bold	">
            {isGift ? "Grátis" : formatPrice(price, currency, locale)}
          </span>
        </div>

        {/* Quantity Selector */}
        {
          /* <div class={clx(isGift && "hidden")}>
          <QuantitySelector
            min={0}
            max={QUANTITY_MAX_VALUE}
            value={quantity}
            name={`item::${index}`}
          />
        </div> */
        }
      </div>
    </fieldset>
  );
}

export default CartItem;
