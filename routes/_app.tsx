import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "deco/hooks/useScript.ts";
import { Context } from "deco/deco.ts";

const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: 'neue-plak';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(${
              asset("/fonts/neue-plak-regular.woff2")
            }) format('woff2');
            }
            @font-face {
              font-family: 'neue-plak';
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: url(${
              asset("/fonts/neue-plak-semibold.woff2")
            }) format('woff2');
            }
            @font-face {
              font-family: 'neue-plak';
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: url(${asset("/fonts/neue-plak-bold.woff2")}) format('woff2');
            }
            @font-face {
              font-family: 'neue-plak';
              font-style: normal;
              font-weight: 900;
              font-display: swap;
              src: url(${
              asset("/fonts/neue-plak-black.woff2")
            }) format('woff2');
            }
            @font-face {
              font-family: 'inter';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(${asset("/fonts/inter.woff2")}) format('woff2');
            }
          `,
          }}
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});
