import { React, useState } from 'react';
import styles from '../styles/Carousel.module.css';
import FireText from './animatedText/FireText';
import IceText from './animatedText/IceText';
import ThunderText from './animatedText/ThunderText';
import EarthText from './animatedText/EarthText';
import JsxParser from 'react-jsx-parser';
import Paragraph from './Paragraph';
import Image from 'next/image';
import Link from 'next/link';
// import Underline from './Underline';

export default function Carousel({ items, setLinkClicked }) {

  const [currentOption, setCurrentOption] = useState('left');

  const selectItem = (option) => {
    if (option !== currentOption) {
      setCurrentOption(option);
    }
  };

  let i = 0;

  return (
    <section className={styles.carousel}>
      <main>
        {items.map((item) => {
          i++
          return (
            <Link key={item.title} href={`/articles/${item.title.toLowerCase().replace(' ', '_')}`} >
              <a onClick={() => { setLinkClicked(true) }} className={`${styles.carouselItem} ${i < 2 ? styles[currentOption] : ''}`}>

                <div className={styles.imageContainer}>
                  <Image width={16} height={9.55} layout="responsive" src={item.thumbnail} />
                </div>
                <aside id={styles.carouselItemAside}>
                  <h1>{item.title}</h1>
                  <div>
                    <h3><i className="fas fa-calendar-alt"></i>{item.formatteddate}</h3>
                    <h3><i className="fas fa-gamepad"></i>{item.category}/{item.genre}</h3>
                  </div>

                  <JsxParser
                    components={{ Paragraph }}

                    jsx={item.content ? item.content.split(/\n/g).slice(0, 2).join('') : ''}
                  />
                </aside>
              </a>
            </Link>)
        })}
      </main>
      <div className={styles.carouselOptions}>
        <input type='checkbox' checked={currentOption === 'left'} onClick={() => { selectItem('left') }} />
        <input type='checkbox' checked={currentOption === 'mid'} onClick={() => { selectItem('mid') }} />
        <input type='checkbox' checked={currentOption === 'right'} onClick={() => { selectItem('right') }} />
      </div>
    </section>)
}