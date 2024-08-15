import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="relative">
      <Slider class="carousel carousel-center w-full gap-6 bg-[#1d1d1d] text-white">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span
              class="py-[10px] px-[2rem] lg:px-[16px] lg:py-[10px] leading-[20px] w-screen text-center text-white text-[12px] lg:text-[12px] font-[600]"
              dangerouslySetInnerHTML={{ __html: alert }}
            />
          </Slider.Item>
        ))}
      </Slider>

      <div class="h-full absolute lg:h-[44px] w-full justify-between right-0 top-0 flex w-full gap-[12px] items-center">
        <div class="group">
          <Slider.PrevButton class="lg:absolute lg:top-[14%] lg:left-[32.43vw] w-[15px] h-[15px] lg:w-[33px] lf:h-[33px] flex justify-center items-center text-white bg-transparent no-animation">
            <Icon
              id="chevron-right"
              size={33}
              class="fill-white rotate-180"
            />
          </Slider.PrevButton>
        </div>

        <div class="group">
          <Slider.NextButton class="lg:absolute lg:top-[14%] lg:right-[32.43vw] w-[15px] h-[15px] lg:w-[33px] lf:h-[33px] flex justify-center items-center text-white bg-transparent no-animation">
            <Icon
              id="chevron-right"
              size={33}
              class="fill-white"
            />
          </Slider.NextButton>
        </div>
      </div>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
