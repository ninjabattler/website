import { React, useEffect, useState } from 'react';
import './stylesheets/ArticlesPage.css';
import JsxParser from 'react-jsx-parser';
import Paragraph from './Paragraph';
import TitleCard from './TitleCard'
import Carousel from './Carousel'
// import ParticlesBg from 'particles-bg';
import axios from 'axios';

export default function ArticlesPage(props) {

  const [articles, setArticles] = useState(false)

  useEffect(() => {
    if (!articles) {
      axios.get('/postData/articles')
        .then((res) => {
          setArticles(res.data.rows)
          console.log(res.data.rows)
        })
    }
  }, [])

  return (
    <>
      <Carousel items={articles ? articles.slice(0, 3) : []} />
      <main id='articlesPage'>
        <div style={{ width: '100%', position: 'sticky', top: '0', height: '100%' }}>
          <TitleCard title='Previous Articles' pageColour='black' inverse />
        </div>
        <div className='articlesPageContainer'>
          {articles ?
            (<>{articles.map((item) => {
              return (
                <a href={`/posts/${item.title.toLowerCase().replace(' ', '_')}`} className='articleCard'>
                  <article className='articleCardItem'
                    onMouseEnter={(e) => {
                      e.target.parentElement.children["0"].className = 'fade'
                    }}
                    onMouseLeave={(e) => {
                      e.target.parentElement.children["0"].className = 'fadeIn'
                    }}>
                    <div>
                      <img src={item.thumbnail} alt='thumbnail' />
                      <video loop muted autoPlay >
                        <source src={item.video_header} type="video/webm"></source>
                        <source src={item.video_header} type="video/ogg"></source>
                        <source src={item.video_header} type="video/mp4"></source>
                      </video>
                      <div> </div>
                      <section>
                        <h1 style={{ filter: `drop-shadow(1px 1px 0px ${item.colour})` }}>{item.title}</h1>
                      </section>
                    </div>

                    <div>
                      <aside>
                        <JsxParser
                          components={{ Paragraph }}

                          jsx={item.content ? item.content.split(/\/n/g).slice(0, 4).join('') : ''}
                        />
                      </aside>
                    </div>
                  </article>
                </a>)
            })}</>)
            :
            (<></>)
          }
        </div>
      </main>
    </>)
}