import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/ReviewPage.module.css';
import JsxParser from 'react-jsx-parser';
import Head from 'next/dist/shared/lib/head';
import VideoHeader from '../../components/VideoHeader/VideoHeader';
import InfoBar from '../../components/articleComponents/InfoBar/InfoBar';
import Picture from '../../components/articleComponents/Picture/Picture';
import ListItem from '../../components/articleComponents/ListItem/ListItem';
import Underline from '../../components/articleComponents/Underline/Underline';
import Quote from '../../components/articleComponents/Quote/Quote';
import Paragraph from '../../components/articleComponents/Paragraph/Paragraph';
import TitleCard from '../../components/articleComponents/TitleCard/TitleCard';
import Comment from '../../components/Comment/Comment';
import CodeBlock from '../../components/articleComponents/CodeBlock/CodeBlock';
import { CommentTwoTone } from '@material-ui/icons';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import SubtitleCard from '../../components/articleComponents/SubtitleCard/SubtitleCard';
import Dialogue from '../../components/articleComponents/Dialogue/Dialogue';
import { articlePageServerSideProps } from '../../ssr/articles/title';
import LikePanel from '../../components/feedbackAndShare/LikePanel/LikePanel';
import ShareBar from '../../components/feedbackAndShare/ShareBar/ShareBar';
import CommentArea from '../../components/feedbackAndShare/CommentArea/CommentArea';
import noCommentMessages from '../../constants/noCommentMessages.json';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AppData, PostCommentType, WindowServerType } from '../../types';

export const getServerSideProps: GetServerSideProps = articlePageServerSideProps;

export default function ArticlePage({ articleData, disliked, liked, randomQuoteIndex, url, userId }: InferGetServerSidePropsType<typeof articlePageServerSideProps> & AppData) {
  const [commenting, setCommenting] = useState<boolean>(false);
  const [comments, setComments] = useState<PostCommentType[]>(articleData.comments);
  const [likes, setLikes] = useState<number>(Number(articleData.likes));
  const [dislikes, setDislikes] = useState<number>(Number(articleData.dislikes));
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [isDisliked, setIsDisliked] = useState<boolean>(disliked);
  const [windowServer, setWindow] = useState<WindowServerType>({});
  const [showPanel, setShowPanel] = useState<boolean>(true);
  const [viewComment, setViewComment] = useState<boolean>(false);
  const [showCommentPanel, setShowCommentPanel] = useState<boolean>(false);
  const [noAnim, setNoAnim] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>('');
  const commentRef = useRef();

  useEffect(() => {
    setWindow(window)
    window.addEventListener('scroll', scrollListener)
  }, [])

  const scrollListener = () => {
    if (window.scrollY >= window.innerHeight + 300) {
      setShowCommentPanel(true);
      window.removeEventListener('scroll', scrollListener);
      setTimeout(() => {
        setNoAnim(true)
      }, 2000)
    }
  }

  return (
    <>
      <Head>
        <title>Ninjabattler - {articleData.title}</title>
        <meta name='description' content={articleData.description} />
        <meta property='og:locale' content='en_CA' />
        <meta name='theme-color' content={`${articleData.colour}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content={`Ninjabattler - ${articleData.title}`}></meta>
        <meta itemProp="description" content={articleData.description}></meta>
        <meta itemProp="image" content={articleData.thumbnail}></meta>
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={url}></meta>
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`Ninjabattler - ${articleData.title}`} />
        <meta property='og:description' content={articleData.description} />
        <meta property='og:image' content={articleData.thumbnail} />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={`Ninjabattler - ${articleData.title}`}></meta>
        <meta name="twitter:description" content={articleData.description}></meta>
        <meta name="twitter:image" content={articleData.thumbnail}></meta>
        {/* <!-- Meta Tags Generated via http://heymeta.com -->*/}
        <style>
          {`
            :root {
              --article-colour: ${articleData.colour};
            }
          `}
        </style>
      </Head>

      <VideoBackground video={articleData.video_header || ""} pageColour={articleData.colour} />

      <main id={styles.reviewPage}>
        {!showPanel && (<div id={styles.mobileCover}></div>)}
        <VideoHeader video={articleData.video_header || ""} title={articleData.title} pageColour={articleData.colour} />
        <InfoBar date={articleData.formatteddate} category={articleData.category} genre={articleData.genre} />

        <div>
          <article className={styles.articleContainer} style={windowServer.innerWidth < 426 ? { boxShadow: `2px 2px 0px ${articleData.colour}` } : { boxShadow: `5px 5px 0px ${articleData.colour}` }}>
            {articleData.narration && (<iframe id={styles.adAurisIframe} src={`${articleData.narration}?color=${articleData.colour.split('#')[1]}`} style={{ border: 'none', height: '100px', width: '80%' }} ></iframe>)}
            {/* @ts-ignore - JsxParser has an error with how it exports, works perfectly fine though */}
            <JsxParser
              components={{ Picture, ListItem, Underline, Quote, Paragraph, TitleCard, CodeBlock, SubtitleCard, Dialogue } as {}}

              jsx={articleData.content}
            />
          </article>

          <aside className={styles.commentPanel} style={windowServer.innerWidth < 426 ? { marginLeft: showPanel ? "-81%" : "0%", display: showCommentPanel ? 'initial' : 'none' } : { display: showCommentPanel ? 'initial' : 'none' }}>
            <LikePanel
              postId={articleData.id}
              userId={userId}
              pageColour={articleData.colour}
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
              title={articleData.title}
              windowServer={windowServer}
              articleLink={url}
              pageColour={articleData.colour}
            />

            <CommentArea
              commentRef={commentRef}
              comments={comments}
              setComments={setComments}
              postId={articleData.id}
              userId={userId}
              commenting={commenting}
              setCommentContent={setCommentContent}
              setViewComment={setViewComment}
              viewComment={viewComment}
              setCommenting={setCommenting}
              commentContent={commentContent}
              noAnim={noAnim}
            />

            <div className={styles.comments}>
              {comments.length <= 1 && (
                <p id={styles.noCommentMessage} dangerouslySetInnerHTML={{ __html: noCommentMessages[randomQuoteIndex] }}></p>
              )}
              {comments.map((com) => {
                if (com.username) {
                  return (<Comment
                    pageColour={com.user_id === userId ? articleData.colour : 'transparent'}
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