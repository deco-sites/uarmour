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
    <footer class="bg-[#f0f0f0]">
      <div class="hidden lg:flex py-[40px] w-full max-w-[1025px] mx-auto">
        <div class="flex justify-between gap-[20px] w-full">
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
              <div class="h-[48px] w-full relative">
                <span class="z-[1] absolute top-[-15px] bg-[#f0f0f0] left-[12px] p-[5px] text-[#1d1d1d] text-[14px] font-bold leading-[1.1875rem] tracking-[0rem]">
                  Newsletter
                </span>
                <div class="rounded-[4px] w-full h-full">
                  <input
                    class="h-full border border-[#1d1d1d] rounded-[4px] text-black text-[13px] leading-[1.8125rem] tracking-[0.05rem] bg-[#f0f0f0] outline-none w-full px-[16px] py-[1px]"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <button class="min-w-[105px] w-auto h-[48px] rounded-[4px] transition-all duration-[.5s] border-[1.5px] border-white bg-[#1d1d1d] text-white hover:bg-[#666666] hover:text-[#000]">
                  Enviar
                </button>
              </div>
            </div>
            <p class="text-[#707070] text-[12px] leading-[1.125rem] tracking-[0.007rem] mt-[14px]">
              Fique por dentro!<br />Cadastre-se para receber ofertas e
              novidades exclusivas.<br />Ao fornecer o seu e-mail, você concorda
              com a nossa{" "}
              <a class="underline" href="/politica-de-privacidade">
                Política de Privacidade
              </a>. Você pode se descadastrar a qualquer momento.
            </p>
            <p class="text-[#707070] text-[12px] leading-[1.125rem] tracking-[0.007rem] mt-[14px]">
              <span class="text-[#707070] font-bold">
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
            <div class="mt-[20px]">
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
            <div class="mt-[20px]">
              <p class="text-[#1d1d1d] font-bold text-[18px] leading-[1.75rem] tracking-[0.055rem]">
                Formas de Pagamento
              </p>
              <div class="mt-[15px] flex gap-[6px]">
                {paymentMethods?.map((paymentMethod) => (
                  <div class="p-[3px] h-[27px] w-[45px] bg-white border border-[#1d1d1d] rounded-[4px] flex justify-center items-center">
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
            <div class="mt-[20px]">
              <p class="text-[#707070] text-[11px] leading-[1.125rem] tracking-[0.007rem] ">
                © 2024 Under Armour - Todos os direitos reservados. <br />{" "}
                Vulcabras - SP Comércio de Artigos Esportivos Ltda. CNPJ:
                18.565.468/0012-41 <br />{" "}
                Estrada Municipal Luiz Lopes Neto, 21 - Tenentes - CEP:
                37.640-000 - Extrema/MG
              </p>
            </div>
          </div>
          <div>
            <p class="text-[#1d1d1d] font-bold text-[16px] leading-[1rem] tracking-[0.055rem]">
              {helpLinks?.title}
            </p>
            <ul class="pt-[24px] flex flex-col">
              {helpLinks?.children.map((link) => (
                <a
                  class="text-black text-[14px] leading-[1.5625rem] tracking-[0.007rem]"
                  href={link.href}
                >
                  {link.title}
                </a>
              ))}
            </ul>
            <div class="mt-[104px]">
              <p class="text-[#1d1d1d] font-bold text-[18px] leading-[1.75rem] tracking-[0.055rem]">
                Segurança
              </p>
              <div class="mt-[15px] flex gap-[6px]">
                {security?.map((paymentMethod) => (
                  <div class="p-[3px] h-[27px] bg-white border border-[#1d1d1d] rounded-[4px] flex justify-center items-center">
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
            <div class="mt-[64px] relative">
              <p class="absolute text-nowrap text-[#000115] text-[13px] leading-[13px] tracking-[-0.015rem]">
                <b>Telefone:</b>
                <a href={contactUs?.phone.href}>{contactUs?.phone.text}</a>
                <b>- E-mail:</b>
                <a href={contactUs?.email.href}>{contactUs?.email.text}</a>
              </p>
            </div>
          </div>
          <div>
            <p class="text-[#1d1d1d] font-bold text-[16px] leading-[1rem] tracking-[0.055rem]">
              {aboutUsLinks?.title}
            </p>
            <ul class="pt-[24px] flex flex-col">
              {aboutUsLinks?.children.map((link) => (
                <a
                  class="text-black text-[14px] leading-[1.5625rem] tracking-[0.007rem]"
                  href={link.href}
                >
                  {link.title}
                </a>
              ))}
            </ul>
          </div>
          <div>
            <p class="text-[#1d1d1d] font-bold text-[16px] leading-[1.75rem] tracking-[0.055rem]">
              UA Social
            </p>
            <ul class="pt-[24px] flex flex-col gap-[25px]">
              {social?.map((link) => (
                <div class="flex gap-[10px]">
                  <Image width={17} src={link.image} />
                  <a
                    class="text-black text-[16px] leading-[1.5625rem] tracking-[0.007rem]"
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
            <div class="h-[48px] w-full relative">
              <span class="z-[1] absolute top-[-15px] bg-[#f0f0f0] left-[12px] p-[5px] text-[#1d1d1d] text-[14px] font-bold leading-[1.1875rem] tracking-[0rem]">
                Newsletter
              </span>
              <div class="rounded-[4px] w-full h-full">
                <input
                  class="h-full border border-[#1d1d1d] rounded-[4px] text-black text-[13px] leading-[1.8125rem] tracking-[0.05rem] bg-[#f0f0f0] outline-none w-full px-[16px] py-[1px]"
                  type="text"
                />
              </div>
            </div>
            <div>
              <button class="min-w-[105px] w-auto h-[48px] rounded-[4px] transition-all duration-[.5s] border-[1.5px] border-white bg-[#1d1d1d] text-white hover:bg-[#666666] hover:text-[#000]">
                Enviar
              </button>
            </div>
          </div>
          <p class="text-[#707070] text-[12px] leading-[1.125rem] tracking-[0.007rem] mt-[14px]">
            Fique por dentro!<br />Cadastre-se para receber ofertas e novidades
            exclusivas.<br />Ao fornecer o seu e-mail, você concorda com a nossa
            {" "}
            <a class="underline" href="/politica-de-privacidade">
              Política de Privacidade
            </a>. Você pode se descadastrar a qualquer momento.
          </p>
          <p class="text-[#707070] text-[12px] leading-[1.125rem] tracking-[0.007rem] mt-[14px]">
            <span class="text-[#707070] font-bold">
              FIQUE ATENTO ÀS FRAUDES!
            </span>
            <br />O site Underarmour.com.br é o site exclusivo da marca para
            compras online. Antes de efetuar a compra, verifique que você está
            no site oficial.<br /> <br />{" "}
            Em caso de dúvida ou comunicação suspeita, se informe nos perfis
            oficiais da marca ou pela central de atendimento.
          </p>
          <div>
            <details class="mt-[12px]">
              <summary class="flex justify-between items-center font-bold border-t border-[#707070] mb-[20px]">
                {helpLinks?.title}
              </summary>
              <div class="flex flex-col pl-[23px]">
                {helpLinks?.children.map((link) => (
                  <a
                    class="text-black text-[14px] leading-[1.5625rem] tracking-[0.007rem]"
                    href={link.href}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </details>
            <details class="mt-[12px]">
              <summary class="flex justify-between items-center font-bold border-t border-[#707070] mb-[20px]">
                {aboutUsLinks?.title}
              </summary>
              <div class="flex flex-col pl-[23px]">
                {aboutUsLinks?.children.map((link) => (
                  <a
                    class="text-black text-[14px] leading-[1.5625rem] tracking-[0.007rem]"
                    href={link.href}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </details>
            <details class="mt-[12px]">
              <summary class="flex justify-between items-center font-bold border-t border-[#707070] mb-[20px]">
                UA Social
              </summary>
              <div class="flex flex-col gap-[10px] pl-[23px]">
                {social?.map((link) => (
                  <div class="flex gap-[10px]">
                    <Image width={17} src={link.image} />
                    <a
                      class="text-black text-[16px] leading-[1.5625rem] tracking-[0.007rem]"
                      href={link.href}
                    >
                      {link.text}
                    </a>
                  </div>
                ))}
              </div>
            </details>
          </div>
          <div class="mt-[20px]">
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
          <div class="mt-[20px]">
            <p class="text-[#1d1d1d] font-bold text-[18px] leading-[1.75rem] tracking-[0.055rem]">
              Formas de Pagamento
            </p>
            <div class="mt-[15px] flex gap-[6px]">
              {paymentMethods?.map((paymentMethod) => (
                <div class="p-[3px] h-[27px] w-[45px] bg-white border border-[#1d1d1d] rounded-[4px] flex justify-center items-center">
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
          <div class="mt-[20px]">
            <p class="text-[#1d1d1d] font-bold text-[18px] leading-[1.75rem] tracking-[0.055rem]">
              Segurança
            </p>
            <div class="mt-[15px] flex gap-[6px]">
              {security?.map((paymentMethod) => (
                <div class="p-[3px] h-[27px] bg-white border border-[#1d1d1d] rounded-[4px] flex justify-center items-center">
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
          <div class="mt-[64px] relative">
            <p class="text-nowrap text-center text-[#000115] text-[13px] leading-[13px] tracking-[-0.015rem]">
              <b>Telefone:</b>
              <a href={contactUs?.phone.href}>{contactUs?.phone.text}</a>
              <b>- E-mail:</b>
              <a href={contactUs?.email.href}>{contactUs?.email.text}</a>
            </p>
          </div>
          <div class="my-[25px]">
            <p class="text-[#707070] text-center text-[11px] leading-[1.125rem] tracking-[0.007rem] ">
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
