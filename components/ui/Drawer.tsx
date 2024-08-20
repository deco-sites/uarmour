import { useScript } from "deco/hooks/useScript.ts";
import { type ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "./Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  aside: ComponentChildren;
  id?: string;
}

const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }

    const input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) {
      return;
    }

    input.checked = false;
  };

  addEventListener("keydown", handler);
};

function Drawer({
  children,
  aside,
  open,
  class: _class = "",
  id = useId(),
}: Props) {
  return (
    <>
      <div class={clx("drawer", _class)}>
        <input
          id={id}
          name={id}
          checked={open}
          type="checkbox"
          class="drawer-toggle"
          aria-label={open ? "open drawer" : "closed drawer"}
        />

        <div class="drawer-content">
          {children}
        </div>

        <aside
          data-aside
          class={clx(
            "drawer-side h-full z-40 overflow-hidden",
            "[[data-aside]&_section]:contents", // lazy-loading via useSection
          )}
        >
          <label for={id} class="drawer-overlay bg-[transparent_!important]" />
          {aside}
        </aside>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}

function Aside(
  { title, drawer, children, hasTop = true, minicartTop = false }: {
    title: string;
    drawer: string;
    children: ComponentChildren;
    hasTop?: boolean;
    minicartTop?: boolean;
  },
) {
  return (
    <div
      data-aside
      class="grid w-full divide-y divide-base-200 lg:w-[500px] h-full relative"
      style={{
        backgroundColor: "#fff",
        maxWidth: "100vw",
        maxHeight: "100%",
        gridTemplateRows: "auto 1fr",
        top: "0",
        boxShadow: "0px 0px 20px rgba(0,0,0,0.16)",
      }}
    >
      {hasTop &&
        (
          <div class="flex justify-between items-center p-5 pb-3 pr-[35px] border-b border-neutral-content h-[66px]">
            {
              /* <h1 class="">
              <span class="text-neutral text-base font-bold leading-6 tracking-normal">
                {title}
              </span>
            </h1> */
            }
            <Image
              class="mx-auto"
              width={46}
              src={"https://underarmourbr.vtexassets.com/assets/vtex/assets-builder/underarmourbr.store-theme/6.0.26/icons/header/under-black-icon___0fc911fe3ff9e9f0a96f2c60abc84c76.svg"}
            />
            <label
              for={drawer}
              aria-label="X"
              class="absolute right-[30px] cursor-pointer text-neutral text-base font-bold leading-6 tracking-normal"
            >
              <Icon id={"close"} />
            </label>
          </div>
        )}
      {minicartTop &&
        (
          <div class="flex justify-between items-center py-4 px-3 border-b border-[#c9c9c9] h-[48px]">
            <Image
              width={14}
              src={"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14.354' height='20.079' viewBox='0 0 14.354 20.079'%3E%3Cpath id='Caminho_3601' data-name='Caminho 3601' d='M28.118,132.6a.846.846,0,0,0-.84-.752H24.909v-.8a3.653,3.653,0,0,0-7.3,0v.8H15.182a.847.847,0,0,0-.838.738l-.072,13.573a.846.846,0,0,0,.84.949H27.278a.844.844,0,0,0,.831-.933Zm-4.221-.752H18.62v-.8a2.64,2.64,0,0,1,5.277,0Zm-5.782,2.72a.5.5,0,0,0,.505-.491v-1.1H23.9v1.1a.506.506,0,0,0,1.012,0v-1.1H27.02l-.07,13-11.514,0V132.983h2.172v1.1A.5.5,0,0,0,18.115,134.571Z' transform='translate(-14.014 -127.282)' fill='%231d1d1d' stroke='%231d1d1d' stroke-width='0.5'/%3E%3C/svg%3E%0A"}
            />
            <h1 class="">
              <span class="text-neutral text-base font-bold leading-6 tracking-normal">
                {title}
              </span>
            </h1>
            <label
              for={drawer}
              aria-label="X"
              class="cursor-pointer text-neutral text-base font-bold leading-6 tracking-normal"
            >
              <Icon id={"close"} />
            </label>
          </div>
        )}
      {children}
    </div>
  );
}

Drawer.Aside = Aside;

export default Drawer;
