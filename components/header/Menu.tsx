import Icon from "../../components/ui/Icon.tsx";
import { NavItemNode } from "./NavItem.tsx";

export interface Props {
  navItems: NavItemNode[];
}

function MenuItem({ item }: { item: NavItemNode }) {
  return (
    <div class="collapse">
      {item.children.length > 0 &&
        <input id="collapse-input-animation" type="checkbox" />}
      <div
        class="collapse-title flex justify-between items-center p-5 text-secondary text-base leading-[1.3125rem] font-semibold tracking-normal"
        style={{
          minHeight: "fit-content",
          height: "min-content",
        }}
      >
        {item.children.length == 0 &&
          <a href={item.url}>{item.text}</a>}
        {item.children.length > 0 && item.text}
        {item.children.length > 0 &&
          (
            <Icon
              class="abtransition-all duration-300 text-[#757575]"
              id={"chevron-right"}
              fill={"#757575"}
              size={35}
            />
          )}
      </div>
      {item.children.length > 0 &&
        (
          <div class="collapse-content">
            <ul class="divide-y divide-base-200">
              {item.children?.map((node) => {
                if (node.title?.text) {
                  return (
                    <>
                      <div class="collapse collapse-child">
                        <input id="collapse-input-animation" type="checkbox" />
                        <div
                          class="collapse-title flex justify-between items-center pl-[10px] pr-[3px] divide-y divide-base-200 py-[12px] text-neutral text-xs leading-[11px] font-roboto tracking-normal uppercase"
                          style={{
                            minHeight: "fit-content",
                            height: "min-content",
                          }}
                        >
                          {node.title.text}
                          <Icon
                            class="abtransition-all duration-300 text-[#757575]"
                            id={"chevron-right"}
                            fill={"#757575"}
                            size={35}
                          />
                        </div>
                        <div class="collapse-content">
                          <ul>
                            {node?.links?.map((link) => (
                              <li class="pl-[10px] py-[12px] text-neutral-content text-xs leading-[11px] font-roboto tracking-normal uppercase">
                                <a href={link.url}>{link.text}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  );
                } else if (node.links && node.links.length > 0) {
                  return (
                    <ul>
                      {node?.links?.map((link) => (
                        <li>
                          <a
                            class="text-sm text-neutral-content text-xs leading-[11px] font-roboto tracking-normal uppercase"
                            href={link.url}
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  );
                }
              })}
              <li>
                <a
                  class="pl-[10px] text-neutral-content text-xs leading-[11px] font-roboto tracking-normal uppercase"
                  href={item.url}
                >
                  VER TUDO
                </a>
              </li>
            </ul>
          </div>
        )}
    </div>
  );
}

function Menu({ navItems }: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto bg-white"
      style={{ minWidth: "100vw" }}
    >
      <ul class="flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto">
        {navItems.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
