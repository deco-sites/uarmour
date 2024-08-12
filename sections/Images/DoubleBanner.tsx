import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy alt
 */
interface Banner {
  mobile: ImageWidget;
  desktop: ImageWidget;

  title: string;
  description: string;

  /** @description Adicione um link */
  href: string;
}

interface Props {
  /**
   * @maxItems 2
   * @minItems 2
   */
  banners?: Banner[];
}

export default function Gallery({
  banners = [],
}: Props) {
  return (
    <div class="flex p-[2rem] gap-[2rem] lg:gap-[3rem] lg:justify-center overflow-scroll lg:overflow-hidden w-full mt-[2rem] mb-[4rem]">
      {banners.map((banner) => (
        <div class="lg:w-[42%]">
          <a
            href={banner.href}
            class="flex flex-col w-[70vw] md:w-[50vw] lg:w-full"
          >
            <Image
              width={160}
              class="hidden lg:flex w-full object-fit"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={banner.desktop}
              alt={banner.desktop}
              decoding="async"
              loading="lazy"
            />
            <Image
              width={160}
              class="lg:hidden w-full object-fit"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={banner.mobile}
              alt={banner.mobile}
              decoding="async"
              loading="lazy"
            />
            <p
              class="text-[.8rem] text-[#000] font-bold "
              style={{ margin: "1rem 0 -.25rem" }}
            >
              {banner.title}
            </p>
            <p class="text-[.8rem] text-[#000] ">{banner.description}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
