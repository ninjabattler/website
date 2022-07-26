import { React, useEffect, useState, useRef } from 'react';
import styles from '../../styles/ReviewPage.module.css';
import JsxParser from 'react-jsx-parser';
import Head from 'next/dist/shared/lib/head';
import VideoHeader from '../../components/VideoHeader';
import InfoBar from '../../components/InfoBar';
import Picture from '../../components/Picture';
import ListItem from '../../components/ListItem';
import Underline from '../../components/Underline';
import Quote from '../../components/Quote';
import Paragraph from '../../components/Paragraph';
import TitleCard from '../../components/TitleCard';
import Comment from '../../components/Comment';
import CodeBlock from '../../components/CodeBlock';
import { CommentTwoTone } from '@material-ui/icons';
import VideoBackground from '../../components/VideoBackground';
import SubtitleCard from '../../components/SubtitleCard';
import Dialogue from '../../components/Dialogue';
import { articlePageServerSideProps } from '../../ssr/articles/title';
import LikePanel from '../../components/feedbackAndShare/LikePanel/LikePanel';
import ShareBar from '../../components/feedbackAndShare/ShareBar/ShareBar';
import CommentArea from '../../components/feedbackAndShare/CommentArea/CommentArea';
import noCommentMessages from '../../constants/noCommentMessages.json';

export const getServerSideProps = articlePageServerSideProps;

export default function ArticlePage(props) {
  const [commenting, setCommenting] = useState(false);
  const [comments, setComments] = useState(props.articleData.comments);
  const [likes, setLikes] = useState(Number(props.articleData.likes));
  const [dislikes, setDislikes] = useState(Number(props.articleData.dislikes));
  const [isLiked, setIsLiked] = useState(props.liked);
  const [isDisliked, setIsDisliked] = useState(props.disliked);
  const [windowServer, setWindow] = useState({});
  const [showPanel, setShowPanel] = useState(true);
  const [viewComment, setViewComment] = useState(false);
  const [showCommentPanel, setShowCommentPanel] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const commentRef = useRef();

  useEffect(() => {
    setWindow(window)
    window.addEventListener('scroll', scrollListener)
  }, [])

  const scrollListener = (ev) => {
    if (window.scrollY >= window.innerHeight + 300) {
      setShowCommentPanel(true);
      window.removeEventListener('scroll', scrollListener)
    }
  }

  return (
    <>
      <Head>
        <title>Ninjabattler - {props.articleData.title}</title>
        <meta name='description' content={props.articleData.description} />
        <meta property='og:locale' content='en_CA' />
        <meta name='theme-color' content={`${props.articleData.colour}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content={`Ninjabattler - ${props.articleData.title}`}></meta>
        <meta itemProp="description" content={props.articleData.description}></meta>
        <meta itemProp="image" content={props.articleData.thumbnail}></meta>
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={props.url}></meta>
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`Ninjabattler - ${props.articleData.title}`} />
        <meta property='og:description' content={props.articleData.description} />
        <meta property='og:image' content={props.articleData.thumbnail} />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={`Ninjabattler - ${props.articleData.title}`}></meta>
        <meta name="twitter:description" content={props.articleData.description}></meta>
        <meta name="twitter:image" content={props.articleData.thumbnail}></meta>
        {/* <!-- Meta Tags Generated via http://heymeta.com -->*/}

        {/* <!--FONTS--> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Gloria+Hallelujah&family=Trade+Winds&family=Hanalei+Fill&family=Rock+Salt&display=swap" rel="stylesheet" />
      </Head>

      <VideoBackground video={props.articleData.video_header || ""} pageColour={props.articleData.colour} />

      <main id={styles.reviewPage}>
        {!showPanel && (<div id={styles.mobileCover}></div>)}
        <VideoHeader video={props.articleData.video_header || ""} title={props.articleData.title} pageColour={props.articleData.colour} />
        <InfoBar date={props.articleData.formatteddate} category={props.articleData.category} genre={props.articleData.genre} />

        <div>
          <article className={styles.articleContainer} style={windowServer.innerWidth < 426 ? { boxShadow: `2px 2px 0px ${props.articleData.colour}` } : { boxShadow: `5px 5px 0px ${props.articleData.colour}` }}>
            {props.articleData.narration && (<iframe id={styles.adAurisIframe} src={`${props.articleData.narration}?color=${props.articleData.colour.split('#')[1]}`} style={{ border: 'none', height: '100px', width: '80%' }} ></iframe>)}
            <JsxParser
              components={{ Picture, ListItem, Underline, Quote, Paragraph, TitleCard, CodeBlock, SubtitleCard, Dialogue }}

              jsx={props.articleData.content}
            />
          </article>

          <aside className={styles.commentPanel} style={windowServer.innerWidth < 426 ? { marginLeft: showPanel ? "-81%" : "0%", display: showCommentPanel ? 'initial' : 'none' } : { display: showCommentPanel ? 'initial' : 'none' }}>
            <LikePanel
              postId={props.articleData.id}
              userId={props.userId}
              pageColour={props.articleData.colour}
              likes={likes}
              isLiked={isLiked}
              setLikes={setLikes}
              setIsLiked={setIsLiked}
              dislikes={dislikes}
              isDisliked={isDisliked}
              setDislikes={setDislikes}
              setIsDisliked={setIsDisliked}
            />

            <ShareBar
              title={props.articleData.title}
              windowServer={windowServer}
            />

            <CommentArea
              commentRef={commentRef}
              comments={comments}
              setComments={setComments}
              postId={props.articleData.id}
              userId={props.userId}
              commenting={commenting}
              setCommentContent={setCommentContent}
              setViewComment={setViewComment}
              viewComment={viewComment}
              setCommenting={setCommenting}
              commentContent={commentContent}
            />

            <div className={styles.comments}>
              {comments.length <= 1 && (
                <p id={styles.noCommentMessage} dangerouslySetInnerHTML={{ __html: noCommentMessages[props.randomQuoteIndex] }}></p>
              )}
              {comments.map((com) => {
                if (com.username) {
                  return (<Comment
                    pageColour={com.user_id === props.userId ? props.articleData.colour : 'transparent'}
                    username={com.username.slice(0, 10)}
                    date={com.formatteddate}
                    content={com.content}
                    avatar={com.avatar} />)
                }
              })}
            </div>

            <button id={styles.mobileCommentButton} onClick={() => { setShowPanel(!showPanel) }}><CommentTwoTone /></button>
          </aside>
        </div>

      </main>
    </>)
}