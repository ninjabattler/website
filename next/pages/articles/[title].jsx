import { React, useEffect, useState } from 'react';
import styles from '../../styles/ReviewPage.module.css';
import JsxParser from 'react-jsx-parser';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Head from 'next/dist/shared/lib/head';
import prisma from '../../prisma/prisma';
import { selectSingleArticle, selectUserId } from '../../prisma/queries/queries';
import VideoHeader from '../../components/VideoHeader';
import InfoBar from '../../components/InfoBar';
import Picture from '../../components/Picture';
import ListItem from '../../components/ListItem';
import Underline from '../../components/Underline';
import Quote from '../../components/Quote';
import Paragraph from '../../components/Paragraph';
import TitleCard from '../../components/TitleCard';
import Comment from '../../components/Comment';
import axios from 'axios';

export const getServerSideProps = async (req) => {
  let ip = await axios({ method: 'get', url: `https://api.ipify.org?format=json`, headers: { 'Content-Type': 'application/json' }, })
  ip = ip.data.ip;

  const userId = await selectUserId(prisma, ip)
  const articleTitle = req.query.title.replace('_', ' ');
  const articleData = await selectSingleArticle(prisma, articleTitle);

  return {
    props: {
      articleData: articleData[0],
      userId: userId
    }
  }
}

export default function ArticlePage(props) {
  const [commenting, setCommenting] = useState(false)
  const [likes, setLikes] = useState(props.articleData.likes)
  const [dislikes, setDislikes] = useState(props.articleData.dislikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [windowServer, setWindow] = useState({})

  useEffect(() => {
    setWindow(window)
  }, [])

  return (
    <>
      <NavBar />
      <Head>
        <title>Ninjabattler - {props.articleData.title}</title>
        <meta name='description' content={props.articleData.description} />
        <meta property='og:locale' content='en_CA' />
        <meta name='theme-color' content={`#${props.articleData.colour}`} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`Ninjabattler - ${props.articleData.title}`} />
        <meta property='og:description' content={props.articleData.description} />
        <meta property='og:image' content={props.articleData.thumbnail} />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        {/* <!--FONTS--> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Gloria+Hallelujah&family=Trade+Winds&family=Hanalei+Fill&family=Rock+Salt&display=swap" rel="stylesheet" />
      </Head>

      <main id={styles.reviewPage}>
        <VideoHeader video={props.articleData.video_header} title={props.articleData.title} pageColour={props.articleData.colour} />
        <InfoBar date={props.articleData.formatteddate} categoryGenre={`${props.articleData.category}/${props.articleData.genre}`} />

        <div>
          <article className={styles.articleContainer} style={{ boxShadow: `5px 5px 0px ${props.articleData.colour}` }}>
            {props.articleData.narration && (<iframe src={`${props.articleData.narration}?color=${props.articleData.colour.split('#')[1]}`} style={{ border: 'none', height: '250px', width: '100%' }} ></iframe>)}
            <JsxParser
              components={{ Picture, ListItem, Underline, Quote, Paragraph, TitleCard }}

              jsx={props.articleData.content}
            />
          </article>

          <aside className={styles.commentPanel}>
            <aside className={styles.likePanel} >

              <button onClick={() => {
                like({ like: true, id, }, () => {
                  isLiked = !isLiked
                  if (isLiked === true) {
                    setLikes(likes + 1)
                  } else {
                    setLikes(likes - 1)
                  }
                  if (isDisliked) {
                    isDisliked = !isDisliked
                    setDislikes(dislikes - 1)
                  }
                  console.log(isLiked, isDisliked)
                })
              }}
                style={{ color: isLiked === true ? colour : '#292929' }}>
                <i class="far fa-thumbs-up">{likes}</i>

              </button>

              <div id={styles.likeBar} style={{ backgroundImage: `linear-gradient(90deg, ${props.articleData.colour} ${(likes / (likes + dislikes)) * 100}%, transparent ${(likes / (likes + dislikes)) * 100}%)` }}>

              </div>
              <button onClick={() => {
                like({ like: false, id, }, () => {
                  isDisliked = !isDisliked
                  if (isDisliked === true) {
                    setDislikes(dislikes + 1)
                  } else {
                    setDislikes(dislikes - 1)
                  }
                  if (isLiked) {
                    isLiked = !isLiked
                    setLikes(likes - 1)
                  }
                  console.log(isLiked, isDisliked)
                })
              }}
                style={{ color: isDisliked === true ? colour : '#292929' }}>
                <i class="far fa-thumbs-down">{dislikes}</i>
              </button>
            </aside>

            <aside id={styles.shareBar}>
              <div style={{ cursor: 'default' }}><i class="fas fa-share"></i></div>
              <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small"><a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(windowServer.location).replace(/'/g, "%27").replace(/"/g, "%22")}`} class="fb-xfbml-parse-ignore"><i class="fab fa-facebook-square"></i></a></div>
              <div><a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false"><i class="fab fa-twitter-square"></i></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>
              <div><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(windowServer.location).replace(/'/g, "%27").replace(/"/g, "%22")}`} target="_blank" ><i class="fab fa-linkedin"></i></a></div>
              <div><a href={`http://www.reddit.com/submit?url=${windowServer.location}&title=Ninjabattler-${props.articleData.title}`} target="_blank"><i class="fab fa-reddit-square"></i></a></div>
            </aside>

            {commenting === true ?
              (<>
                <p id={styles.commentLoading}>
                  <img src={ninjabattler} />
                </p>
              </>) :
              (<>
                <textarea
                  id={styles.commentArea}
                  name="comment"
                  placeholder="Leave a comment!"
                  onChange={(e) => {
                    commentContent = e.target.value
                  }}
                  onFocus={(e) => {
                    e.target.placeholder = ''
                  }}
                  onBlur={(e) => {
                    e.target.placeholder = 'Leave a comment!'
                  }}>
                </textarea>
                <button onClick={() => {
                  comment({ content: commentContent, id: id }, setCommenting, (newComments) => {
                    commentContent = ''
                    setComments(newComments)
                  })
                }}>
                  <i class="fas fa-caret-square-right"></i>
                </button>
              </>)}

            <div className={styles.comments}>
              {props.articleData.comments.map((com) => {
                return (<Comment
                  pageColour={com.user_id === props.userId ? colour : 'transparent'}
                  username={com.username.slice(0, 10)}
                  date={com.formatteddate}
                  content={com.content}
                  avatar={com.avatar} />)
              })}
            </div>
          </aside>
        </div>

      </main>
      <Footer />
    </>)
}