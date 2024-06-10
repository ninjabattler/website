import React, { FC } from "react";
import Head from "next/head";

type ArticlesPageHeadProps = {
  searchResults: boolean;
};

/**
 * The <head> tag for the Articles Page
 * @author Ninjabattler
 */
const ArticlesPageHead: FC<ArticlesPageHeadProps> = ({ searchResults }) => (
  <Head>
    <title>
      {searchResults ? "Search Results" : "Articles"} | Ninjabattler
    </title>
    <meta
      name="description"
      content="Reviews, tutorials and other stuff written by me"
    />
    <meta property="og:locale" content="en_CA" />
    <meta name="theme-color" content="#dddd44" />
    <link rel="icon" href="/favicon.ico" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* <!-- Google / Search Engine Tags --> */}
    <meta
      itemProp="name"
      content={`${searchResults ? "Search Results" : "Articles"} | Ninjabattler`}
    ></meta>
    <meta
      itemProp="description"
      content="Reviews, tutorials and other stuff written by me"
    ></meta>
    <meta itemProp="image" content="/Website Robot 2.png"></meta>
    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:url" content="/articles"></meta>
    <meta property="og:type" content="website" />
    <meta
      property="og:title"
      content={`${searchResults ? "Search Results" : "Articles"} | Ninjabattler`}
    />
    <meta
      property="og:description"
      content="Reviews, tutorials and other stuff written by me"
    />
    <meta property="og:image" content="/Website Robot 2.png" />
    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image"></meta>
    <meta
      name="twitter:title"
      content={`${searchResults ? "Search Results" : "Articles"} | Ninjabattler`}
    ></meta>
    <meta
      name="twitter:description"
      content="Reviews, tutorials and other stuff written by me"
    ></meta>
    <meta name="twitter:image" content="/Website Robot 2.png"></meta>
    {/* <!-- Meta Tags Generated via http://heymeta.com -->*/}
  </Head>
);

export default ArticlesPageHead;
