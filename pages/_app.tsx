import "../styles/index.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-20420622-1"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-20420622-1');`,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
