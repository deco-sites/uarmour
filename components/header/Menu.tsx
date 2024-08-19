import Icon from "../../components/ui/Icon.tsx";
import { NavItemNode } from "./NavItem.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  navItems: NavItemNode[];
}

function MenuItem({ item, index }: { item: NavItemNode, index: number }) {
  return (
    <div>
      {
        item.children.length === 0 
        ? 
          (
            <a href={item.url}>
              <p class="px-5 py-[22px] font-semibold	text-black text-base leading-[1.3125rem] tracking-[0]">
                {item.text}
              </p>
            </a>
          )
        :
          (
            <div class="px-5 py-[22px]">
              <label class="flex justify-between items-center font-semibold	text-black text-base leading-[1.3125rem] tracking-[0]" htmlFor={`menu-item-checkbox-${index}`}>
                {item.text}
                <Icon id="chevron-right" class="fill-[#757575] text-[#757575]" size={36} fill={"#757575"} />
              </label>
              <input id={`menu-item-checkbox-${index}`} class="hidden peer" type="checkbox" />
              <div class="peer-checked:translate-x-0 translate-x-[-100%] transition-all duration-300 bg-white text-black fixed top-0 left-0 w-full h-full">
                <a class="w-full font-semibold tracking-[0] leading-[1.3125rem] text-primary text-base bg-base-200 flex items-center justify-center h-[70px]" href={item.url}>
                  {item.text}
                </a>
                <label class="flex items-center gap-1.5 text-xs text-primary leading-3 tracking-[0.05rem] h-[38px] pl-1.5" htmlFor={`menu-item-checkbox-${index}`}>
                  <Icon id="chevron-right" class="rotate-180 fill-[#757575] text-[#757575]" size={30} fill={"#757575"} />
                  VOLTAR
                </label>
                {
                  item.children.map((leaf, indexLeaf) => (
                    <>
                    {
                      leaf.links?.length === 0 
                      ? 
                        (
                          <a href={leaf.title?.url}>
                            <p class="px-5 py-[22px] font-semibold	text-black text-base leading-[1.3125rem] tracking-[0]">
                              {leaf.title?.text}
                            </p>
                          </a>
                        )
                      :
                        (
                          <div class="px-5 py-[22px]">
                            <label class="flex justify-between items-center font-semibold	text-black text-base leading-[1.3125rem] tracking-[0]" htmlFor={`menu-item-checkbox-leaf-${index}-${indexLeaf}`}>
                              {leaf.title?.text}
                              <Icon id="chevron-right" class="fill-[#757575] text-[#757575]" size={36} fill={"#757575"} />
                            </label>
                            <input id={`menu-item-checkbox-leaf-${index}-${indexLeaf}`} class="hidden peer" type="checkbox" />
                            <div class="peer-checked:translate-x-0 translate-x-[-100%] transition-all duration-300 bg-white text-black fixed top-0 left-0 w-full h-full">
                              <a class="w-full font-semibold tracking-[0] leading-[1.3125rem] text-primary text-base bg-base-200 flex items-center justify-center h-[70px]" href={item.url}>
                                {leaf.title?.text}
                              </a>
                              <label class="flex items-center gap-1.5 text-xs text-primary leading-3 tracking-[0.05rem] h-[38px] pl-1.5" htmlFor={`menu-item-checkbox-leaf-${index}-${indexLeaf}`}>
                                <Icon id="chevron-right" class="rotate-180 fill-[#757575] text-[#757575]" size={30} fill={"#757575"} />
                                VOLTAR
                              </label>
                              {
                                leaf.links?.map(link => (
                                  <a href={link.url}>
                                    <p class="px-5 py-[22px] font-semibold	text-black text-base leading-[1.3125rem] tracking-[0]">
                                      {link.text}
                                    </p>
                                  </a>
                                ))
                              }
                              <a href={leaf.seeMore?.url}>
                                <p class="px-5 py-[22px] uppercase font-semibold underline text-black text-xs	 leading-[1.3125rem] tracking-[0]">
                                  {leaf.seeMore?.text}
                                </p>
                              </a>
                            </div>
                          </div>
                        )
                    }
                    </>
                  ))
                }
                <a href={item.url}>
                  <p class="px-5 py-[22px] font-semibold underline text-black text-xs	 leading-[1.3125rem] tracking-[0]">
                    VER TUDO
                  </p>
                </a>
              </div>
            </div>
          )
      }
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
        {navItems.map((item, index) => (
          <li>
            <MenuItem item={item} index={index}/>
          </li>
        ))}
      </ul>
      <div class="bg-[#e3e3e3] text-primary text-xs leading-4 font-semibold uppercase flex justify-around h-[93px] items-center">
        <div class="flex flex-col gap-2.5 justify-center items-center">
          <Image
            class=""
            src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11898/345f5474-606a-4077-bfc6-b8d21caf7206"}
            alt={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11898/345f5474-606a-4077-bfc6-b8d21caf7206"}
            width={20}
            loading="lazy"
          />
          LOGIN
        </div>
        <div class="flex flex-col gap-2.5 justify-center items-center">
          <Image
            class=""
            src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11898/e8c8ffe7-db8b-4bec-9977-475c91b7f54b"}
            alt={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11898/e8c8ffe7-db8b-4bec-9977-475c91b7f54b"}
            width={25}
            loading="lazy"
          />
          PEDIDOS
        </div>
        <div class="flex flex-col gap-2.5 justify-center items-center">
          <Image
            class=""
            src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11898/6078bed8-e066-4ace-a45d-77ccc19c2b56"}
            alt={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11898/6078bed8-e066-4ace-a45d-77ccc19c2b56"}
            width={20}
            loading="lazy"
          />
          AJUDA
        </div>
      </div>
    </div>
  );
}

export default Menu;
