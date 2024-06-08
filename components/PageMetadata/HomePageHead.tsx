import React, { FC } from "react";
import Head from "next/head";

/**
 * The <head> tag for the Home Page
 * @author Ninjabattler
 */
const HomePageHead: FC<{}> = () => (
  <Head>
    <title>Ninjabattler</title>
    <meta
      name="description"
      content="Ninjabattler, a personal blog/portfolio thing with reviews, opinions and ramblings about video games, programming, and Blender"
    />
    <meta property="og:locale" content="en_CA" />
    <meta name="theme-color" content="#dddd44" />
    <link rel="icon" href="/favicon.ico" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* <!-- Google / Search Engine Tags --> */}
    <meta itemProp="name" content="Ninjabattler"></meta>
    <meta
      itemProp="description"
      content="Ninjabattler, a personal blog/portfolio thing with reviews, opinions and ramblings about video games, programming, and Blender"
    ></meta>
    <meta itemProp="image" content="/Website Robot 2.png"></meta>
    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:url" content="/"></meta>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Ninjabattler" />
    <meta
      property="og:description"
      content="Ninjabattler, a personal blog/portfolio thing with reviews, opinions and ramblings about video games, programming, and Blender"
    />
    <meta property="og:image" content="/Website Robot 2.png" />
    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image"></meta>
    <meta name="twitter:title" content="Ninjabattler"></meta>
    <meta
      name="twitter:description"
      content="Ninjabattler, a personal blog/portfolio thing with reviews, opinions and ramblings about video games, programming, and Blender"
    ></meta>
    <meta name="twitter:image" content="/Website Robot 2.png"></meta>
    {/* <!-- Meta Tags Generated via http://heymeta.com -->*/}
  </Head>
);

export default HomePageHead;
