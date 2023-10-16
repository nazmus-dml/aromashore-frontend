import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name='description' content='Generated by create next app' />
        <link rel='shortcut icon' type='image/png' href='/app/assets/images/fav.png' />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css' />
        <link rel='stylesheet' href='/app/assets/css/bootstrap.css' />
        <link rel='stylesheet' href='/app/assets/css/slick.min.css' />
        <link rel='stylesheet' href='/app/assets/css/fontawesome.css' />
        <link rel='stylesheet' href='/app/assets/css/bootstrap-drawer.min.css' />
        <link rel='stylesheet' href='/app/assets/css/style.css' />
        <link rel='stylesheet' href='/app/assets/auth/style.css' />
        {/* <script src='/app/assets/js/bootstrap.bundle.min.js'></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
