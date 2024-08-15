import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Card {
  image: ImageWidget;
  description: string;
  href: string;
}

export interface Props {
  cards: Card[];
}

export default function MobileCards({
  cards = [],
}: Props) {
  return (
    <div class="lg:hidden my-[40px] px-[32px] flex gap-[2rem] flex-wrap justify-between	">
      {cards.map((card) => (
        <div class="flex flex-col w-full max-w-[44%]">
          <a href={card.href} class="w-full h-full">
            <Image
              width={160}
              height={160}
              class="w-full object-fit"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={card.image}
              alt={card.image}
              decoding="async"
              loading="lazy"
            />
          </a>
          <a
            class="my-[.5rem] flex font-bold text-[#000] leading-[1.5] text-[16px]"
            href={card.href}
          >
            {card.description}
          </a>
        </div>
      ))}
    </div>
  );
}
