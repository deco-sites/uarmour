import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  variant: "Normal" | "Reverse";
}

export interface Props {
  title: HTMLWidget;
  description: string;
  image?: ImageWidget;
  mobileImage?: ImageWidget;
  placement: "left" | "right";
  cta: CTA[];
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function HeroFlats({
  title = "Hero",
  description = "Your description here",
  image,
  mobileImage,
  placement,
  cta,
}: Props) {
  return (
    <div>
      <div class="mx-auto flex flex-col items-center gap-20 bg-secondary">
        <div
          class={`flex w-full xl:container xl:mx-auto z-10 ${
            image
              ? PLACEMENT[placement]
              : "flex-col items-center justify-center text-center"
          } items-end`}
        >
          {image && (
            <Image
              width={1170}
              height={720}
              class="hidden lg:flex lg:w-3/5 object-fit"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image}
              alt={image}
              preload={true}
              decoding="sync"
              loading="eager"
            />
          )}
          {mobileImage && (
            <Image
              width={414}
              height={414}
              class="w-full lg:hidden object-fit"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={mobileImage}
              alt={mobileImage}
              preload={true}
              decoding="sync"
              loading="eager"
            />
          )}
          <div
            class={`hidden lg:flex lg:flex-col px-20 pb-20 lg:w-2/5 space-y-4 ${
              image ? "lg:w-1/2" : "flex flex-col items-center justify-end"
            }`}
          >
            <div
              class="inline-block text-[5rem] leading-[100%] font-black text-white"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            >
            </div>
            <p class="text-white text-base md:text-lg leading-[150%]">
              {description}
            </p>
            <div
              class="flex flex-col items-center lg:items-start lg:flex-row gap-4 w-full"
              style={{ marginTop: "32px" }}
            >
              {cta?.map((item) => (
                <a
                  key={item?.id}
                  id={item?.id}
                  href={item?.href}
                  target={item?.href.includes("http") ? "_blank" : "_self"}
                  class={`group w-full relative overflow-hidden text-center rounded text-base hover:bg-gradient-to-r py-3 transition-all duration-300 ease-out ${
                    item.variant === "Reverse"
                      ? "bg-secondary text-white"
                      : "bg-accent text-black"
                  }`}
                >
                  <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40">
                  </span>
                  <span class="relative font-semibold text-base text-center">
                    {item?.text}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
