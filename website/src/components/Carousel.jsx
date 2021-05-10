import { React, useState } from 'react';
import './stylesheets/Carousel.css';
import FireText from './animatedText/FireText';
import IceText from './animatedText/IceText';
import ThunderText from './animatedText/ThunderText';
import EarthText from './animatedText/EarthText';
import JsxParser from 'react-jsx-parser';

export default function Carousel({ items }) {
  let i = 0
  console.log(items)
  return (
    <section className='carousel'>
      <main>
        {items.map((item) => {
          i++
          return (
            <a href={`/posts/${item.title.toLowerCase().replace(' ', '_')}`} className={`carouselItem ${i > 1 ? 'hidden' : 'shown'}`}>
              <img src={item.thumbnail} />
              <aside>
                <h3>{item.title}</h3>
                <h3 style={{transform: 'rotate(-7deg)'}}>{item.formatteddate}</h3>
                <h3>{item.category}/{item.genre}</h3>
              </aside>
            </a>)
        })}
      </main>
      {/* <div className='carouselOptions'>
        <input type='checkbox' />
        <input type='checkbox' />
        <input type='checkbox' />
      </div> */}
    </section>)
}