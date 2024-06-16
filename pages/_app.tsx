import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/NavBar";
import "../styles/globals.scss";
import "swiper/css/bundle";
import { NextRouter, useRouter } from "next/router";
import { AppProps } from "next/app";
import "highlight.js/styles/vs2015.css";
// @ts-expect-error - CommonJs warning
import { Mousewheel } from "swiper/modules";
// @ts-expect-error - CommonJs warning
import Swiper from "swiper";
import { SessionProvider } from "next-auth/react";
import { Russo_One, Righteous } from "next/font/google";
import Head from "next/head";

const russoOne = Russo_One({
  weight: "400",
  subsets: ["latin"],
});

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();
  Swiper.use([Mousewheel]);

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <style>{`
          html {
            --righteous: ${righteous.style.fontFamily};
            --russo-one: ${russoOne.style.fontFamily};
          }
        `}</style>
      </Head>

      {!router.pathname.startsWith("/studio") && <NavBar />}

      <Component {...pageProps} />

      {!router.pathname.startsWith("/studio") && <Footer />}
    </SessionProvider>
  );
}

export default MyApp;
