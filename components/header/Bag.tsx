import { useScript } from "deco/hooks/useScript.ts";
import { MINICART_DRAWER_ID } from "../../constants.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe((sdk) => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;

    if (!counter) {
      return;
    }

    // Set minicart items count on header
    if (count === 0) {
      counter.classList.add("hidden");
    } else {
      counter.classList.remove("hidden");
    }

    counter.innerText = count > 9 ? "9+" : count.toString();
  });

function Bag() {
  const id = useId();

  return (
    <>
      <label
        class="indicator cursor-pointer lg:px-[15px] relative"
        for={MINICART_DRAWER_ID}
        aria-label="open cart"
      >
        <span
          id={id}
          class="hidden absolute top-[-5px] right-0 text-white lg:text-base-200 bg-[#0085ca] rounded-full text-xs font-roboto w-[20px] h-[20px] flex justify-center items-center"
        />

        <span class="hidden lg:flex">
          <Icon
            size={17}
            id="shopping_bag"
            class="text-accent-content"
            fill={"#949494"}
          />
        </span>
        <span class="lg:hidden">
          <Icon size={23} id="shopping_bag" class="text-white" fill={"white"} />
        </span>
      </label>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </>
  );
}

export default Bag;
