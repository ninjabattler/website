import { React, useState } from 'react';
import './stylesheets/Carousel.css';
import FireText from './animatedText/FireText';
import IceText from './animatedText/IceText';
import ThunderText from './animatedText/ThunderText';
import EarthText from './animatedText/EarthText';
import JsxParser from 'react-jsx-parser';
import Paragraph from './Paragraph';
import Underline from './Underline';

export default function Carousel({ items }) {

  const [currentOption, setCurrentOption] = useState('left');

  const selectItem = (option) => {
    if (option !== currentOption) {
      setCurrentOption(option);
    }
  };

  let i = 0;

  return (
    <section className={`carousel`}>
      <main>
        {items.map((item) => {
          i++
          return (
            <a href={`/posts/${item.title.toLowerCase().replace(' ', '_')}`} className={`carouselItem ${i < 2 ? currentOption : ''}`}>
              <img src={item.thumbnail} />
              <aside>
                <h1>{item.title}</h1>
                <div>
                  <h3><i class="fas fa-calendar-alt"></i>{item.formatteddate}</h3>
                  <h3><i class="fas fa-gamepad"></i>{item.category}/{item.genre}</h3>
                </div>

                <JsxParser
                  components={{ Paragraph }}

                  jsx={item.content ? item.content.split(/\n/g).slice(0, 2).join('') : ''}
                />
              </aside>
            </a>)
        })}
      </main>
      <div className='carouselOptions'>
        <input type='checkbox' checked={currentOption === 'left'} onClick={() => { selectItem('left') }}/>
        <input type='checkbox' checked={currentOption === 'mid'} onClick={() => { selectItem('mid') }}/>
        <input type='checkbox' checked={currentOption === 'right'} onClick={() => { selectItem('right') }}/>
      </div>
    </section>)
}