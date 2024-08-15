import { Product } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";
import { useId } from "../../sdk/useId.ts";

interface Props {
  products: Product[];
  itemListName?: string;
}

function ProductSlider({ products, itemListName }: Props) {
  const id = useId();

  return (
    <>
      <div
        id={id}
        class="grid grid-rows-1 relative px-[1.25rem] mt-[5rem] lg:mt-[3rem] mx-auto max-w-[1060px]"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1 mb-[70px] lg:mb-0">
          <Slider class="carousel carousel-start lg:carousel-end gap-[16px] w-full">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                )}
              >
                <ProductCard
                  preload={false}
                  index={index}
                  product={product}
                  itemListName={itemListName}
                  class="w-[290px] lg:w-[241px]"
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>
      </div>
      <Slider.JS rootId={id} infinite={true} />
    </>
  );
}

export default ProductSlider;
