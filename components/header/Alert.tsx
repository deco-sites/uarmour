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
      <Slider class="carousel carousel-center w-full gap-6 bg-primary text-white">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span
              class="py-2.5 px-8 lg:px-4 lg:px-2.5 leading-5 w-screen text-center text-white text-xs lg:text-xs font-semibold"
              dangerouslySetInnerHTML={{ __html: alert }}
            />
          </Slider.Item>
        ))}
      </Slider>

      <div class="h-full absolute lg:h-11 w-full justify-between right-0 top-0 flex w-full gap-3 items-center">
        <div class="group">
          <Slider.PrevButton class="lg:absolute lg:top-1/4 lg:left-[32.43vw] w-[15px] h-[15px] lg:w-[33px] lf:h-[33px] flex justify-center items-center text-white bg-transparent no-animation">
            <Icon
              id="chevron-right"
              size={33}
              class="fill-white rotate-180"
            />
          </Slider.PrevButton>
        </div>

        <div class="group">
          <Slider.NextButton class="lg:absolute lg:top-1/4 lg:right-[32.43vw] w-[15px] h-[15px] lg:w-[33px] lf:h-[33px] flex justify-center items-center text-white bg-transparent no-animation">
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
