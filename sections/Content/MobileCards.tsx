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
    <div class="lg:hidden my-10 px-8 flex gap-8 flex-wrap justify-between	">
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
            class="my-2 flex font-bold text-secondary leading-normal text-base"
            href={card.href}
          >
            {card.description}
          </a>
        </div>
      ))}
    </div>
  );
}
