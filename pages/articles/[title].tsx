import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/ReviewPage.module.scss';
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
import { AppData, ArticleData, PostCommentType, WindowServerType } from '../../types';
import { parseJsonArticle } from '../../helpers/parseJsonArticle';
import MainSettings from '../../components/articleCreationComponents/MainSettings/MainSettings';

export const getServerSideProps: GetServerSideProps = articlePageServerSideProps;

export default function ArticlePage({ articleData, disliked, liked, randomQuoteIndex, url, userId, edit, jsonLocation }: InferGetServerSidePropsType<typeof articlePageServerSideProps> & AppData) {
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
  const [article, setArticle] = useState<ArticleData>(articleData);
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
      }, 4000)
    }
  }

  const updateArticleData = (data): void => {
    setArticle(data);
  }

  return (
    <>
      <Head>
        <title>Ninjabattler - {article.title}</title>
        <meta name='description' content={article.description} />
        <meta property='og:locale' content='en_CA' />
        <meta name='theme-color' content={`${article.colour}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content={`Ninjabattler - ${article.title}`}></meta>
        <meta itemProp="description" content={article.description}></meta>
        <meta itemProp="image" content={article.thumbnail}></meta>
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={url}></meta>
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`Ninjabattler - ${article.title}`} />
        <meta property='og:description' content={article.description} />
        <meta property='og:image' content={article.thumbnail} />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={`Ninjabattler - ${article.title}`}></meta>
        <meta name="twitter:description" content={article.description}></meta>
        <meta name="twitter:image" content={article.thumbnail}></meta>
        {/* <!-- Meta Tags Generated via http://heymeta.com -->*/}
        <style>
          {`
            :root {
              --article-colour: ${article.colour};
            }
          `}
        </style>
      </Head>

      <VideoBackground video={article.video_header || ""} pageColour={article.colour} />

      <main id={styles.reviewPage}>
        {!showPanel && (<div id={styles.mobileCover}></div>)}
        <VideoHeader video={article.video_header || ""} title={article.title} pageColour={article.colour} />
        <InfoBar date={article.formatteddate} category={article.category} genre={article.genre} />

        <div>
          <article className={styles.articleContainer} style={windowServer.innerWidth < 426 ? { boxShadow: `2px 2px 0px ${article.colour}` } : { boxShadow: `5px 5px 0px ${article.colour}` }}>
            {article.narration && (<iframe id={styles.adAurisIframe} src={`${article.narration}?color=${article.colour.split('#')[1]}`} style={{ border: 'none', height: '100px', width: '80%' }} ></iframe>)}

            {/* @ts-ignore - JsxParser has an error with how it exports, works perfectly fine though */}
            <JsxParser
              components={{ Picture, ListItem, Underline, Quote, Paragraph, TitleCard, CodeBlock, SubtitleCard, Dialogue } as {}}

              jsx={parseJsonArticle(article.content)}
            />

            {article.footnotes[0] &&
              <>
                <h1 id={styles.footnotesHeader}>References</h1>
                <ol id={styles.footnotes}>
                  {article.footnotes?.map((footnote, i) => {
                    return (
                      <li key='i'>
                        <a
                          href={footnote.link}
                          target="_blank"
                          rel="noreferrer"
                          id={`f-${i + 1}`}
                        >{
                            footnote.title}
                        </a>
                      </li>
                    )
                  })}
                </ol>
              </>
            }
          </article>

          {edit &&
            <aside className={styles.creationPanel}>
              <MainSettings articleData={article} jsonLocation={jsonLocation} updateArticleData={updateArticleData} />
            </aside>
          }

          {!edit &&
            <aside className={styles.commentPanel} style={windowServer.innerWidth < 426 ? { marginLeft: showPanel ? "-100%" : "0%", display: showCommentPanel ? 'initial' : 'none' } : { display: showCommentPanel ? 'initial' : 'none' }}>
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
                {comments.length <= 0 && (
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

            </aside>
          }
        </div>

        <button
          id={styles.mobileCommentButton}
          style={{ display: showCommentPanel ? 'initial' : 'none' }}
          onClick={() => { setShowPanel(!showPanel) }}
        ><CommentTwoTone /></button>
      </main>
    </>)
}