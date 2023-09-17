import React, { ReactElement, useState } from 'react';
import styles from './Carousel.module.scss';
import Paragraph from '../articleComponents/Paragraph/Paragraph';
import Image from 'next/image';
import Link from 'next/link';
import { formatSqlDate } from '../../helpers/dateHelpers';
import { parseJsonArticle } from '../../helpers/parseJsonArticle';
import { ArticleData, ParagraphItem } from '../../types';

type CarouselProps = {
  items: ArticleData[];
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
            <img src={item.thumbnail} alt='background thumbnail' />
          </div>
        )
      })
      }
      <main>
        {items.map((item) => {
          i++
          return (
            <Link legacyBehavior key={item.title} href={`/articles/${item.title.toLowerCase().replace(/ /g, '_')}`} >
              <a onClick={(e) => { e.preventDefault(); setLinkClicked(`/articles/${item.title.toLowerCase().replace(/ /g, '_')}`) }} className={`${styles.carouselItem} ${i < 2 ? styles[currentOption] : ''}`}>

                <div className={styles.imageContainer}>
                  <Image width={16} height={9.6} layout="responsive" src={item.thumbnail} alt='thumbnail' />
                </div>
                <aside id={styles.carouselItemAside}>
                  <h1>{item.title}</h1>
                  <section>
                    <div className={styles.background}></div>
                    <h3>{formatSqlDate(item.formatteddate)}</h3>
                    <h3>{item.category}/{item.genre}</h3>
                  </section>

                  <div>
                    {item.content.map((contentItem) => {
                      if (contentItem.type === 'Paragraph') {
                        contentItem = contentItem as ParagraphItem
                        return <Paragraph content={contentItem.content} />
                      } else {
                        return <></>
                      }
                    })}
                  </div>
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