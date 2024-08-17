import Image from "apps/website/components/Image.tsx";
import { HEADER_HEIGHT_DESKTOP } from "../../constants.ts";
import { Color, ImageWidget } from "apps/admin/widgets.ts";

export interface Link {
  text?: string;
  url?: string;
  color?: Color;
  bold?: boolean;
  underline?: boolean;
}

export interface NavLeaf {
  title?: {
    text?: string;
    url?: string;
    color?: Color;
    bold?: boolean;
    underline?: boolean;
  };
  links?: Link[];
  seeMore?: {
    text?: string;
    url?: string;
  };
}

export interface NavItemNode {
  text: string;
  url: string;
  color?: Color;
  bold?: boolean;
  underline?: boolean;
  image?: ImageWidget;
  imageText?: string;
  imageUrl?: string;
  children: NavLeaf[];
}

function NavItem({ item }: { item: NavItemNode }) {
  const { url, text, children, color, image, imageUrl } = item;
  return (
    <li class="relative group flex items-center px-2.5">
      <a
        href={url}
        style={{
          color: color ? color : "inherit",
          height: HEADER_HEIGHT_DESKTOP,
        }}
        class="flex items-center text-base font-semibold text-white leading-[1.3125rem] tracking-normal text-center"
      >
        <span class="after:content-[''] after:w-full after:absolute after:bottom-[-3px] after:left-0 after:transition-all after:ease-in-out after:duration-300 after:delay-0 after:h-[3px] after:scale-x-50 after:group-hover:scale-x-100 after:bg-transparent after:group-hover:bg-black">
          {text}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed top-0 left-0 w-full hidden hover:flex group-hover:flex bg-[#f9f9f9] p-[20px_3vw] pt-7"
            style={{
              boxShadow: "rgba(0,0,0,0.06) 0px 12px 12px",
              marginTop: "125px",
            }}
          >
            <div class="pb-5 w-full mx-auto group-hover:flex items-start justify-center gap-[35px]">
              {image && (
                <>
                  <a
                    style={{
                      height: "65%",
                    }}
                    href={imageUrl ?? "#"}
                  >
                    <Image
                      class=""
                      src={image}
                      alt={image}
                      width={430}
                      height={430}
                      loading="lazy"
                    />
                    <p class="text-primary text-[15px] font-bold leading-[1.4375rem] tracking-normal">
                      {item.imageText}
                    </p>
                    <p class="text-primary underline text-[13px] leading-[1.4375rem] tracking-normal">
                      Compre agora
                    </p>
                  </a>
                </>
              )}
              <ul
                class="grid gap-[15px] w-full justify-center pt-3 pb-[5px] overflow-hidden"
                style={{
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                }}
              >
                {children.map((child) => (
                  <li class="min-w-[195px] leading-[0.8125rem] text-xs tracking-normal text-neutral">
                    <a
                      class="flex pb-5 text-primary text-lg leading-[2.125rem] tracking-normal font-bold"
                      href={child.title?.url}
                    >
                      {child.title?.text}
                    </a>
                    <ul>
                      {child?.links?.map((link) => (
                        <li class="text-base-300 font-semibold text-[13px] leading-6 tracking-normal hover:underline">
                          <a href={link.url}>
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a
                      class="underline font-semibold text-base-300 text-[13px] leading-6 tracking-normal"
                      href={child.seeMore?.url}
                    >
                      {child.seeMore?.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
