import React, { FC } from "react";
import { ColourType, TitleType, UrlType } from "../../types";
import Head from "next/head";

type ReviewPageHeadProps = {
  title: TitleType;
  description: string;
  thumbnail: UrlType;
  url: UrlType;
  primaryColour: ColourType;
  secondaryColour: ColourType;
  spaceColour: ColourType;
  starsColour: ColourType;
};

/**
 * The <head> tag for the Review Page
 * @author Ninjabattler
 */
const ReviewPageHead: FC<ReviewPageHeadProps> = ({
  title,
  description,
  thumbnail,
  url,
  primaryColour,
  secondaryColour,
  spaceColour,
  starsColour,
}) => (
  <Head>
    <title>{`${title} | Ninjabattler`}</title>
    <meta name="description" content={description} />
    <meta property="og:locale" content="en_CA" />
    <meta name="theme-color" content={`${primaryColour}`} />
    <link rel="icon" href="/favicon.ico" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* <!-- Google / Search Engine Tags --> */}
    <meta itemProp="name" content={`${title} | Ninjabattler`}></meta>
    <meta itemProp="description" content={description}></meta>
    <meta itemProp="image" content={thumbnail}></meta>
    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:url" content={url}></meta>
    <meta property="og:type" content="website" />
    <meta property="og:title" content={`${title} | Ninjabattler`} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={thumbnail} />
    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image"></meta>
    <meta name="twitter:title" content={`${title} | Ninjabattler`}></meta>
    <meta name="twitter:description" content={description}></meta>
    <meta name="twitter:image" content={thumbnail}></meta>
    {/* <!-- Meta Tags Generated via http://heymeta.com -->*/}
    <style>
      {`
        :root {
          --article-colour: ${primaryColour} !important;
          --article-colour2: ${secondaryColour} !important;
          --article-colour-space: ${spaceColour} !important;
          --article-colour-stars: ${starsColour} !important;
        }
      `}
    </style>
  </Head>
);

export default ReviewPageHead;
