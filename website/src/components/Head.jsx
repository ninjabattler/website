import React from 'react';
import { Helmet } from "react-helmet";

export default function Head(props) {

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{'Ninjabattler - ' + props.meta.title}</title>
      <meta name='description' content="Some words written by Ninjabattler" />
      <meta property='og:locale' content='en_CA' />
      <meta property='og:author' content='Ninjabattler' />
      <meta name='theme-color' content={props.meta.colour} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={props.meta.title} />
      {/* <meta property='og:description' content={props.meta.description} /> */}
      <meta property='og:image' content={'/static/media/' + props.meta.thumbnail} />
      {/* <meta property='og:url' content=`https://mywebsite.com${url}` /> */}
      {/* <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@mywebsite' />
      <meta name='twitter:creator' content='@mywebsite' /> */}
    </Helmet>
  )
}