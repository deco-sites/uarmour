import { useScript } from "deco/hooks/useScript.ts";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

const onLoad = (containerID: string) => {
  window.STOREFRONT.USER.subscribe((sdk) => {
    const container = document.getElementById(containerID) as HTMLDivElement;

    const nodes = container.querySelectorAll<HTMLAnchorElement>("a");

    const login = nodes.item(0);
    const account = nodes.item(1);

    const user = sdk.getUser();

    if (user?.email) {
      login.classList.add("hidden");
      account.classList.remove("hidden");
    } else {
      login.classList.remove("hidden");
      account.classList.add("hidden");
    }
  });
};

function SignIn(_props: { variant: "mobile" | "desktop" }) {
  const id = useId();

  return (
    <div class="pr-[5px] lg:px-[15px]" id={id}>
      <a
        class={clx(
          "",
        )}
        href="/login"
        aria-label="Login"
      >
        <Icon size={21} id="account" />
      </a>
      <a
        class={clx(
          "hidden",
          "",
        )}
        href="/account"
        aria-label="Account"
      >
        <Icon size={21} id="account" />
      </a>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}

export default SignIn;
