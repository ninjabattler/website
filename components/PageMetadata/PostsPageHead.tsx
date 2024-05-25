import React, { FC } from "react";
import { ColourType, TitleType, UrlType } from "../../types";
import Head from "next/head";

type PostsPageHeadProps = {
  title: TitleType | null;
};

/**
 * The <head> tag for the Posts Page
 * @author Ninjabattler
 */
const PostsPageHead: FC<PostsPageHeadProps> = ({ title }) => (
  <Head>
    <title>{`${title || "Posts"} | Ninjabattler`}</title>
    <meta
      name="description"
      content="Smaller stuff that can't fit into an article, and some renders"
    />
    <meta property="og:locale" content="en_CA" />
    <meta name="theme-color" content="#dddd44" />
    <link rel="icon" href="/favicon.ico" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* <!-- Google / Search Engine Tags --> */}
    <meta itemProp="name" content={`${title || "Posts"} | Ninjabattler`}></meta>
    <meta
      itemProp="description"
      content="Smaller stuff that can't fit into an article, and some renders"
    ></meta>
    <meta itemProp="image" content="/Website Robot 2.png"></meta>
    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:url" content="/posts"></meta>
    <meta property="og:type" content="website" />
    <meta property="og:title" content={`${title || "Posts"} | Ninjabattler`} />
    <meta
      property="og:description"
      content="Smaller stuff that can't fit into an article, and some renders"
    />
    <meta property="og:image" content="/Website Robot 2.png" />
    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image"></meta>
    <meta
      name="twitter:title"
      content={`${title || "Posts"} | Ninjabattler`}
    ></meta>
    <meta
      name="twitter:description"
      content="Smaller stuff that can't fit into an article, and some renders"
    ></meta>
    <meta name="twitter:image" content="/Website Robot 2.png"></meta>
    {/* <!-- Meta Tags Generated via http://heymeta.com -->*/}
  </Head>
);

export default PostsPageHead;
