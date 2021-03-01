import { React, useState } from 'react';
import './stylesheets/ReviewPosts.css';
// import FireText from './animatedText/FireText';
// import IceText from './animatedText/IceText';
// import ThunderText from './animatedText/ThunderText';
// import EarthText from './animatedText/EarthText';
// import JsxParser from 'react-jsx-parser';

export default function ReviewPost(props){

  const [closed, setClosed] = useState(true)

  //Formatt the title for the url by setting all letters to lower case and replaceing
  //spaces with underscores
  const splitTitle = props.title.toLowerCase().split(' ')
  let formattedTitle = '';

  splitTitle.forEach(title => {
    formattedTitle += title + '_'
  });

  formattedTitle = formattedTitle.slice(0, -1)

  return (
    <a href={`http://ninjabattler.ca/posts/${formattedTitle}`}>
      <article className='reviewPost'>
        <header>
          <h1 style={{filter: `drop-shadow(1px 1px 0px ${props.colour})`}}>{props.title}</h1>
        </header>
        <img src={props.thumbnail}/>
        <footer>
          <h3 style={{filter: `drop-shadow(1px 1px 0px ${props.colour})`}}>{props.date}</h3>
        </footer>
      </article>
    </a>)
}