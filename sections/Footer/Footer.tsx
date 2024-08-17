import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

/** @titleBy title */
interface Item {
  title?: string;
  href?: string;
}

/** @titleBy title */
interface Link {
  title: string;
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  text?: string;
  image: ImageWidget;
}

interface ContactUs {
  phone: {
    text: string;
    href: string;
  };
  email: {
    text: string;
    href: string;
  };
}

interface Props {
  helpLinks?: Link;
  aboutUsLinks?: Link;
  social?: Social[];
  contactUs?: ContactUs;
  paymentMethods?: Social[];
  security?: Social[];
}

function Footer({
  helpLinks,
  aboutUsLinks,
  social,
  paymentMethods,
  contactUs,
  security,
}: Props) {
  return (
    <footer class="bg-base-content">
      <div class="hidden lg:flex py-10 w-full max-w-[1025px] mx-auto">
        <div class="flex justify-between gap-5 w-full">
          <div class="max-w-[420px] w-full h-full flex flex-col">
            <Image
              class="mb-[25px]"
              width={143}
              loading={"lazy"}
              decoding={"async"}
              src="https://underarmourbr.vtexassets.com/assets/vtex/assets-builder/underarmourbr.store-theme/6.0.26/icons/under-armour-footer___d7a24c4150ce2c24dcad78cf82335055.svg"
              alt=""
            />
            <div class="flex w-auto items-center gap-[15px] pr-[30px]">
              <div class="h-12 w-full relative">
                <span class="z-[1] absolute top-[-15px] bg-base-content left-3 p-[5px] text-primary text-sm font-bold leading-[1.1875rem] tracking-normal">
                  Newsletter
                </span>
                <div class="rounded w-full h-full">
                  <input
                    class="h-full border border-primary rounded text-black text-[13px] leading-[1.8125rem] tracking-[0.05rem] bg-base-content outline-none w-full px-4 py-[1px]"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <button class="min-w-[105px] w-auto h-12 rounded transition-all duration-500 border-[1.5px] border-white bg-primary text-white hover:bg-info-content hover:text-secondary">
                  Enviar
                </button>
              </div>
            </div>
            <p class="text-neutral-content text-xs leading-[1.125rem] tracking-[0.007rem] mt-3.5">
              Fique por dentro!<br />Cadastre-se para receber ofertas e
              novidades exclusivas.<br />Ao fornecer o seu e-mail, você concorda
              com a nossa{" "}
              <a class="underline" href="/politica-de-privacidade">
                Política de Privacidade
              </a>. Você pode se descadastrar a qualquer momento.
            </p>
            <p class="text-neutral-content text-xs leading-[1.125rem] tracking-[0.007rem] mt-3.5">
              <span class="text-neutral-content font-bold">
                FIQUE ATENTO ÀS FRAUDES!
              </span>
              <br />O site Underarmour.com.br é o site exclusivo da marca para
              compras online. Antes de efetuar a compra, verifique que você está
              no site oficial.<br /> <br />{" "}
              Em caso de dúvida ou comunicação suspeita, se informe nos perfis
              oficiais da marca ou pela central de atendimento.
            </p>
            <div>
            </div>
            <div class="mt-5">
              <a href="https://www.mapmyrun.com/">
                <Image
                  class=""
                  width={44}
                  loading={"lazy"}
                  decoding={"async"}
                  src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11898/9dc01e96-d38e-44d2-a9d9-6e72eece372a"
                  alt=""
                />
              </a>
            </div>
            <div class="mt-5">
              <p class="text-primary font-bold text-lg leading-7 tracking-[0.055rem]">
                Formas de Pagamento
              </p>
              <div class="mt-[15px] flex gap-1.5">
                {paymentMethods?.map((paymentMethod) => (
                  <div class="p-[3px] h-[27px] w-[45px] bg-white border border-primary rounded flex justify-center items-center">
                    <Image
                      class=""
                      width={45}
                      height={27}
                      loading={"lazy"}
                      decoding={"async"}
                      src={paymentMethod.image}
                      alt={paymentMethod.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div class="mt-5">
              <p class="text-neutral-content text-[11px] leading-[1.125rem] tracking-[0.007rem] ">
                © 2024 Under Armour - Todos os direitos reservados. <br />{" "}
                Vulcabras - SP Comércio de Artigos Esportivos Ltda. CNPJ:
                18.565.468/0012-41 <br />{" "}
                Estrada Municipal Luiz Lopes Neto, 21 - Tenentes - CEP:
                37.640-000 - Extrema/MG
              </p>
            </div>
          </div>
          <div>
            <p class="text-primary font-bold text-base leading-4 tracking-[0.055rem]">
              {helpLinks?.title}
            </p>
            <ul class="pt-6 flex flex-col">
              {helpLinks?.children.map((link) => (
                <a
                  class="text-black text-sm leading-[1.5625rem] tracking-[0.007rem]"
                  href={link.href}
                >
                  {link.title}
                </a>
              ))}
            </ul>
            <div class="mt-[104px]">
              <p class="text-primary font-bold text-lg leading-7 tracking-[0.055rem]">
                Segurança
              </p>
              <div class="mt-[15px] flex gap-1.5">
                {security?.map((paymentMethod) => (
                  <div class="p-[3px] h-[27px] bg-white border border-primary rounded flex justify-center items-center">
                    <img
                      class=""
                      height={27}
                      loading={"lazy"}
                      decoding={"async"}
                      src={paymentMethod.image}
                      alt={paymentMethod.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div class="mt-16 relative">
              <p class="absolute text-nowrap text-info text-[13px] leading-[13px] tracking-[-0.015rem]">
                <b>Telefone:</b>
                <a href={contactUs?.phone.href}>{contactUs?.phone.text}</a>
                <b>- E-mail:</b>
                <a href={contactUs?.email.href}>{contactUs?.email.text}</a>
              </p>
            </div>
          </div>
          <div>
            <p class="text-primary font-bold text-base leading-4 tracking-[0.055rem]">
              {aboutUsLinks?.title}
            </p>
            <ul class="pt-6 flex flex-col">
              {aboutUsLinks?.children.map((link) => (
                <a
                  class="text-black text-sm leading-[1.5625rem] tracking-[0.007rem]"
                  href={link.href}
                >
                  {link.title}
                </a>
              ))}
            </ul>
          </div>
          <div>
            <p class="text-primary font-bold text-base leading-7 tracking-[0.055rem]">
              UA Social
            </p>
            <ul class="pt-6 flex flex-col gap-[25px]">
              {social?.map((link) => (
                <div class="flex gap-2.5">
                  <Image width={17} src={link.image} />
                  <a
                    class="text-black text-base leading-[1.5625rem] tracking-[0.007rem]"
                    href={link.href}
                  >
                    {link.text}
                  </a>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div class="lg:hidden flex p-[36px_16px]">
        <div class="w-full h-full flex flex-col">
          <Image
            class="mb-[25px]"
            width={143}
            loading={"lazy"}
            decoding={"async"}
            src="https://underarmourbr.vtexassets.com/assets/vtex/assets-builder/underarmourbr.store-theme/6.0.26/icons/under-armour-footer___d7a24c4150ce2c24dcad78cf82335055.svg"
            alt=""
          />
          <div class="flex w-auto items-center gap-[15px]">
            <div class="h-12 w-full relative">
              <span class="z-[1] absolute top-[-15px] bg-base-content left-3 p-[5px] text-primary text-sm font-bold leading-[1.1875rem] tracking-normal">
                Newsletter
              </span>
              <div class="rounded w-full h-full">
                <input
                  class="h-full border border-primary rounded text-black text-[13px] leading-[1.8125rem] tracking-[0.05rem] bg-base-content outline-none w-full px-4 py-[1px]"
                  type="text"
                />
              </div>
            </div>
            <div>
              <button class="min-w-[105px] w-auto h-12 rounded transition-all duration-500 border-[1.5px] border-white bg-primary text-white hover:bg-info-content hover:text-secondary">
                Enviar
              </button>
            </div>
          </div>
          <p class="text-neutral-content text-xs leading-[1.125rem] tracking-[0.007rem] mt-3.5">
            Fique por dentro!<br />Cadastre-se para receber ofertas e novidades
            exclusivas.<br />Ao fornecer o seu e-mail, você concorda com a nossa
            {" "}
            <a class="underline" href="/politica-de-privacidade">
              Política de Privacidade
            </a>. Você pode se descadastrar a qualquer momento.
          </p>
          <p class="text-neutral-content text-xs leading-[1.125rem] tracking-[0.007rem] mt-3.5">
            <span class="text-neutral-content font-bold">
              FIQUE ATENTO ÀS FRAUDES!
            </span>
            <br />O site Underarmour.com.br é o site exclusivo da marca para
            compras online. Antes de efetuar a compra, verifique que você está
            no site oficial.<br /> <br />{" "}
            Em caso de dúvida ou comunicação suspeita, se informe nos perfis
            oficiais da marca ou pela central de atendimento.
          </p>
          <div>
            <details class="mt-3">
              <summary class="flex justify-between text-black items-center font-bold border-t border-neutral-content mb-5">
                {helpLinks?.title}
              </summary>
              <div class="flex flex-col pl-[23px]">
                {helpLinks?.children.map((link) => (
                  <a
                    class="text-black text-sm leading-[1.5625rem] tracking-[0.007rem]"
                    href={link.href}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </details>
            <details class="mt-3">
              <summary class="flex justify-between text-black items-center font-bold border-t border-neutral-content mb-5">
                {aboutUsLinks?.title}
              </summary>
              <div class="flex flex-col pl-[23px]">
                {aboutUsLinks?.children.map((link) => (
                  <a
                    class="text-black text-sm leading-[1.5625rem] tracking-[0.007rem]"
                    href={link.href}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </details>
            <details class="mt-3">
              <summary class="flex justify-between text-black items-center font-bold border-t border-neutral-content mb-5">
                UA Social
              </summary>
              <div class="flex flex-col gap-2.5 pl-[23px]">
                {social?.map((link) => (
                  <div class="flex gap-2.5">
                    <Image width={17} src={link.image} />
                    <a
                      class="text-black text-base leading-[1.5625rem] tracking-[0.007rem]"
                      href={link.href}
                    >
                      {link.text}
                    </a>
                  </div>
                ))}
              </div>
            </details>
          </div>
          <div class="mt-5">
            <a href="https://www.mapmyrun.com/">
              <Image
                class=""
                width={44}
                loading={"lazy"}
                decoding={"async"}
                src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11898/9dc01e96-d38e-44d2-a9d9-6e72eece372a"
                alt=""
              />
            </a>
          </div>
          <div class="mt-5">
            <p class="text-primary font-bold text-lg leading-7 tracking-[0.055rem]">
              Formas de Pagamento
            </p>
            <div class="mt-[15px] flex gap-1.5">
              {paymentMethods?.map((paymentMethod) => (
                <div class="p-[3px] h-[27px] w-[45px] bg-white border border-primary rounded flex justify-center items-center">
                  <Image
                    class=""
                    width={45}
                    height={27}
                    loading={"lazy"}
                    decoding={"async"}
                    src={paymentMethod.image}
                    alt={paymentMethod.alt}
                  />
                </div>
              ))}
            </div>
          </div>
          <div class="mt-5">
            <p class="text-primary font-bold text-lg leading-7 tracking-[0.055rem]">
              Segurança
            </p>
            <div class="mt-[15px] flex gap-1.5">
              {security?.map((paymentMethod) => (
                <div class="p-[3px] h-[27px] bg-white border border-primary rounded flex justify-center items-center">
                  <img
                    class=""
                    height={27}
                    loading={"lazy"}
                    decoding={"async"}
                    src={paymentMethod.image}
                    alt={paymentMethod.alt}
                  />
                </div>
              ))}
            </div>
          </div>
          <div class="mt-16 relative">
            <p class="text-nowrap text-center text-info text-[13px] leading-[13px] tracking-[-0.015rem]">
              <b>Telefone:</b>
              <a href={contactUs?.phone.href}>{contactUs?.phone.text}</a>
              <b>- E-mail:</b>
              <a href={contactUs?.email.href}>{contactUs?.email.text}</a>
            </p>
          </div>
          <div class="my-[25px]">
            <p class="text-neutral-content text-center text-[11px] leading-[1.125rem] tracking-[0.007rem] ">
              © 2024 Under Armour - Todos os direitos reservados. <br />{" "}
              Vulcabras - SP Comércio de Artigos Esportivos Ltda. CNPJ:
              18.565.468/0012-41 <br />{" "}
              Estrada Municipal Luiz Lopes Neto, 21 - Tenentes - CEP: 37.640-000
              - Extrema/MG
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
