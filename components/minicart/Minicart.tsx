import { useScript } from "deco/hooks/useScript.ts";
import { AppContext } from "../../apps/site.ts";
import { MINICART_DRAWER_ID, MINICART_FORM_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useComponent } from "../../sections/Component.tsx";
// import Coupon from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import CartItem, { Item } from "./Item.tsx";

export interface Minicart {
  /** Cart from the ecommerce platform */
  platformCart: Record<string, unknown>;
  /** Cart from storefront. This can be changed at your will */
  storefront: {
    items: Item[];
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
    locale: string;
    currency: string;
    enableCoupon?: boolean;
    freeShippingTarget: number;
    checkoutHref: string;
  };
}

const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;

  window.STOREFRONT.CART.dispatch(form);

  // view_cart event
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((items, observer) => {
      for (const item of items) {
        if (item.isIntersecting && item.target === form) {
          window.DECO.events.dispatch({
            name: "view_cart",
            params: window.STOREFRONT.CART.getCart(),
          });
          observer?.unobserve(item.target);
        }
      }
    }).observe(form);
  }

  // Disable form interactivity while cart is being submitted
  document.body.addEventListener(
    "htmx:before-send",
    // deno-lint-ignore no-explicit-any
    ({ detail: { elt } }: any) => {
      if (elt !== form) {
        return;
      }

      // Disable addToCart button interactivity
      document.querySelectorAll("div[data-cart-item]").forEach((container) => {
        container?.querySelectorAll("button")
          .forEach((node) => node.disabled = true);
        container?.querySelectorAll("input")
          .forEach((node) => node.disabled = true);
      });
    },
  );
};

const sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};

export const action = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
) =>
  req.method === "PATCH"
    ? ({ cart: await ctx.invoke("site/loaders/minicart.ts") }) // error fallback
    : ({ cart: await ctx.invoke("site/actions/minicart/submit.ts") });

export function ErrorFallback() {
  return (
    <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full gap-2">
      <div class="flex flex-col gap-1 p-6 justify-center items-center">
        <span class="font-semibold">
          Error while updating cart
        </span>
        <span class="text-sm text-center">
          Click in the button below to retry or refresh the page
        </span>
      </div>

      <button
        class="btn btn-primary"
        hx-patch={useComponent(import.meta.url)}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        Retry
      </button>
    </div>
  );
}

export default function Cart({
  cart: {
    platformCart,
    storefront: {
      items,
      total,
      subtotal,
      coupon,
      locale,
      currency,
      freeShippingTarget,
      checkoutHref,
    },
  },
}: { cart: Minicart }) {
  const count = items.length;

  return (
    <>
      <form
        class="contents"
        id={MINICART_FORM_ID}
        hx-sync="this:replace"
        hx-trigger="submit, change delay:300ms"
        hx-target="this"
        hx-indicator="this"
        hx-disabled-elt="this"
        hx-post={useComponent(import.meta.url)}
        hx-swap="outerHTML"
      >
        {/* Button to submit the form */}
        <button hidden autofocus />

        {/* Add to cart controllers */}
        <input name="add-to-cart" type="hidden" />
        <button hidden name="action" value="add-to-cart" />

        {/* This contains the STOREFRONT cart. */}
        <input
          type="hidden"
          name="storefront-cart"
          value={encodeURIComponent(
            JSON.stringify({ coupon, currency, value: total, items }),
          )}
        />

        {/* This contains the platformCart cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
        <input
          type="hidden"
          name="platform-cart"
          value={encodeURIComponent(JSON.stringify(platformCart))}
        />

        <div
          class={clx(
            "flex flex-col flex-grow justify-center items-center overflow-hidden w-full",
            "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300",
          )}
        >
          {count === 0
            ? (
              <div class="flex flex-col items-center h-full w-[90%]">
                <span class="flex justify-center items-center h-full font-roboto text-base text-accent font-bold leading-[1.125rem] tracking-normal text-center">
                  Seu carrinho está vazio!
                </span>
                <label
                  for={MINICART_DRAWER_ID}
                  class="btn btn-outline no-animation mx-5 my-[30px] h-[46px] bg-base-300 hover:bg-base-300 text-neutral hover:text-neutral w-full border-0 rounded-[28px] text-base font-bold leading-4 uppercase tracking-normal"
                  style={{
                    fontFamily:
                      "-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,ubuntu,roboto,noto,segoe ui,arial,sans-serif",
                  }}
                >
                  Continuar comprando
                </label>
              </div>
            )
            : (
              <>
                {/* Cart Items */}
                <ul
                  role="list"
                  class="flex-grow overflow-y-auto flex flex-col w-full divide-y-2 divide-base-300 "
                >
                  {items.map((item, index) => (
                    <li class="px-5 py-2.5 pr-[34px]">
                      <CartItem
                        item={item}
                        index={index}
                        locale={locale}
                        currency={currency}
                      />
                    </li>
                  ))}
                </ul>

                {/* Cart Footer */}
                <footer
                  class="w-full pb-5"
                  style={{
                    boxShadow: "1px 0 0 1px #c2c2c2",
                  }}
                >
                  {/* Subtotal */}
                  <div class="flex flex-col">
                    {/* Free Shipping Bar */}
                    <div class="px-[30px] py-4 w-full">
                      <FreeShippingProgressBar
                        total={total}
                        locale={locale}
                        currency={currency}
                        target={freeShippingTarget}
                      />
                    </div>
                    {
                      /* {discounts > 0 && (
                      <div class="flex justify-between items-center px-4">
                        <span class="text-sm">Descontos</span>
                        <span class="text-sm">
                          {formatPrice(discounts, currency, locale)}
                        </span>
                      </div>
                    )} */
                    }

                    {/* {enableCoupon && <Coupon coupon={coupon} />} */}
                  </div>

                  {/* Total */}
                  <div class="px-[30px] py-4 flex flex-col justify-end items-end gap-4">
                    <div class="w-full flex justify-between text-black text-[.875rem] leading-4 tracking-[.04375rem] mt-[18px]">
                      <span>Subtotal:</span>
                      <output class="text-base" form={MINICART_FORM_ID}>
                        {formatPrice(subtotal, currency, locale)}
                      </output>
                    </div>
                    <div class="flex justify-between mb-[18px] items-center w-full text-black font-bold	 text-xl leading-4 tracking-[.04375rem]">
                      <span>Total:</span>
                      <output class="text-base" form={MINICART_FORM_ID}>
                        {formatPrice(total, currency, locale)}
                      </output>
                    </div>
                  </div>

                  <div class=" px-[30px]">
                    <a
                      class="btn bg-[#f00027] hover:bg-[#f00027] rounded-[5px] h-[50px] text-sm text-white  hover:text-primary tracking-[0.055rem] font-bold leading-[1.1875rem] w-full no-animation"
                      href={checkoutHref}
                      hx-on:click={useScript(sendBeginCheckoutEvent)}
                    >
                      <span class="[.htmx-request_&]:hidden">
                        Finalizar compra
                      </span>
                      <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                    </a>
                  </div>
                </footer>
              </>
            )}
        </div>
      </form>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_FORM_ID),
        }}
      />
    </>
  );
}
