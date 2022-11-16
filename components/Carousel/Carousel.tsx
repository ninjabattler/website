import React, { ReactElement, useState } from 'react';
import styles from './Carousel.module.scss';
import JsxParser from 'react-jsx-parser';
import Paragraph from '../articleComponents/Paragraph/Paragraph';
import Image from 'next/image';
import Link from 'next/link';
import { formatSqlDate } from '../../helpers/dateHelpers';
import { parseJsonArticle } from '../../helpers/parseJsonArticle';

type CarouselProps = {
  items: Array<any>;
  setLinkClicked: Function;
}

const Carousel = ({ items, setLinkClicked }: CarouselProps): ReactElement => {

  const [currentOption, setCurrentOption] = useState('left');

  const selectItem = (option) => {
    if (option !== currentOption) {
      setCurrentOption(option);
    }
  };

  let i = 0;

  const optionIndexMap = {
    left: 0,
    mid: 1,
    right: 2
  }

  return (
    <section className={styles.carousel}>
      {items.map((item, index) => {
        return (
          <div key={index} style={{ opacity: index === optionIndexMap[currentOption] ? 1 : 0 }} className={styles.backgroundImg}>
            <img src={item.thumbnail} />
          </div>
        )
      })
      }
      <main>
        {items.map((item) => {
          i++
          return (
            <Link key={item.title} href={`/articles/${item.title.toLowerCase().replace(/ /g, '_')}`} >
              <a onClick={(e) => { e.preventDefault(); setLinkClicked(`/articles/${item.title.toLowerCase().replace(/ /g, '_')}`) }} className={`${styles.carouselItem} ${i < 2 ? styles[currentOption] : ''}`}>

                <div className={styles.imageContainer}>
                  <Image width={16} height={9.55} layout="responsive" src={item.thumbnail} />
                </div>
                <aside id={styles.carouselItemAside}>
                  <h1>{item.title}</h1>
                  <section>
                    <div className={styles.background}></div>
                    <h3><i>{formatSqlDate(item.formatteddate)}</i></h3>
                    <h3><i>{item.category}/{item.genre}</i></h3>
                  </section>

                  {/* @ts-ignore - JsxParser has an error with how it exports, works perfectly fine though */}
                  <JsxParser
                    components={{ Paragraph } as {}}

                    jsx={item.content ? parseJsonArticle(item.content.slice(0, 2)) : ''}
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

export default Carousel