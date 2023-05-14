import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/ReviewPage.module.scss';
import Head from 'next/dist/shared/lib/head';
import VideoHeader from '../../components/VideoHeader/VideoHeader';
// import InfoBar from '../../components/articleComponents/InfoBar/InfoBar';
import Picture from '../../components/articleComponents/Picture/Picture';
import ListItem from '../../components/articleComponents/ListItem/ListItem';
import Underline from '../../components/articleComponents/Underline/Underline';
import Quote from '../../components/articleComponents/Quote/Quote';
import Paragraph from '../../components/articleComponents/Paragraph/Paragraph';
import TitleCard from '../../components/articleComponents/TitleCard/TitleCard';
import Comment from '../../components/Comment/Comment';
import { CommentTwoTone } from '@material-ui/icons';
// import VideoBackground from '../../components/VideoBackground/VideoBackground';
import SubtitleCard from '../../components/articleComponents/SubtitleCard/SubtitleCard';
import Dialogue from '../../components/articleComponents/Dialogue/Dialogue';
import { articlePageServerSideProps } from '../../ssr/articles/title';
import LikePanel from '../../components/feedbackAndShare/LikePanel/LikePanel';
import ShareBar from '../../components/feedbackAndShare/ShareBar/ShareBar';
import noCommentMessages from '../../constants/noCommentMessages.json';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AppData, ArticleData, ArticleList, CodeBlockItem, DialogueItem, ParagraphItem, PictureItem, PostCommentType, QuoteItem, SubtitleCardItem, TitleCardItem, WindowServerType } from '../../types';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
const CodeBlock = dynamic(() => import('../../components/articleComponents/CodeBlock/CodeBlock'), { loading: () => <></> });
const CommentArea = dynamic(() => import('../../components/feedbackAndShare/CommentArea/CommentArea'), { loading: () => <></> });
const MainSettings = dynamic(() => import('../../components/articleCreationComponents/MainSettings/MainSettings'), { loading: () => <></> });

export const getServerSideProps: GetServerSideProps = articlePageServerSideProps;

export default function ArticlePage({ articleData, disliked, liked, randomQuoteIndex, url, userId, edit, jsonLocation }: InferGetServerSidePropsType<typeof articlePageServerSideProps> & AppData) {
  const [commenting, setCommenting] = useState<boolean>(false);
  const [comments, setComments] = useState<PostCommentType[]>([]);
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
    setComments(articleData.comments.sort((a, b) => {
      if (a.id > b.id) {
        return 1
      } else {
        return -1
      }
    }))
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
              --article-colour2: ${article.colour2 || article.colour};
            }
          `}
        </style>
      </Head>

      <VideoHeader
        video={article.video_header || ""}
        title={article.title}
        pageColour={article.colour}
        infoBarProps={
          {
            date: article.formatteddate,
            category: article.category,
            genre: article.genre
          }
        }
      />

      <main id={styles.reviewPage}>
        {!showPanel && (<div id={styles.mobileCover}></div>)}

        <div className={styles.mainContent}>
          {/* Blend */}
          <div className={styles.containerBlend}>
            <div className={styles.background}>
              <div className={styles.sketchBackground} />
            </div>
          </div>

          {/* Main Content */}
          <article className={styles.articleContainer}>
            <div className={styles.sketchBackground} />

            {article.narration && (<iframe id={styles.adAurisIframe} src={`${article.narration}?color=${article.colour.split('#')[1]}`} style={{ border: 'none', height: '100px', width: '80%' }} ></iframe>)}

            <div>
              {(() => {
                return article.content.map((contentItem, i) => {
                  switch (contentItem.type) {
                    case 'Paragraph':
                      const paragraphItem = contentItem as ParagraphItem
                      return <Paragraph
                        key={i}
                        content={paragraphItem.content}
                      />
                    case 'TitleCard':
                      const titleCardItem = contentItem as TitleCardItem
                      return <TitleCard
                        key={i}
                        title={titleCardItem.title}
                        imageSrc={titleCardItem.imageSrc}
                        pageColour={titleCardItem.pageColour || 'var(--article-colour)'}
                        coverBelow={article.content[i + 1].type === 'Picture'}
                      />
                    case 'Picture':
                      const pictureItem = contentItem as PictureItem
                      return <Picture
                        key={i}
                        imageSrc={pictureItem.imageSrc}
                        pageColour={pictureItem.pageColour || 'var(--article-colour)'}
                      />
                    case 'Quote':
                      const quoteItem = contentItem as QuoteItem
                      return <Quote
                        key={i}
                        quote={quoteItem.quote}
                        source={quoteItem.source}
                      />
                    case 'Underline':
                      return <Underline key={i} />
                    case 'List':
                      const list = contentItem as ArticleList
                      return <ul>
                        {
                          list.items.map((li) => {
                            return <ListItem
                              key={i}
                              content={li.content}
                              imgSrc={li.imageSrc}
                              pageColour={li.pageColour}
                            />
                          })
                        }
                      </ul>
                    case 'CodeBlock':
                      const codeBlockItem = contentItem as CodeBlockItem
                      return <CodeBlock
                        key={i}
                        code={codeBlockItem.code}
                        language={codeBlockItem.language}
                        highlight={codeBlockItem.highlight}
                        title={codeBlockItem.title}
                      />
                    case 'Dialogue':
                      const dialogueItem = contentItem as DialogueItem
                      return <Dialogue
                        key={i}
                        text={dialogueItem.content}
                        imageSrc={dialogueItem.imageSrc}
                        pageColour={dialogueItem.pageColour || 'var(--article-colour)'}
                        speaker={dialogueItem.speaker}
                      />
                    case 'SubtitleCard':
                      const subtitleCardItem = contentItem as SubtitleCardItem
                      return <SubtitleCard
                        key={i}
                        title={subtitleCardItem.title}
                        smaller={subtitleCardItem.smaller}
                        extraSmaller={subtitleCardItem.extraSmaller}
                        higher={subtitleCardItem.higher}
                        imageSrc={subtitleCardItem.imageSrc}
                        lower={subtitleCardItem.lower}
                        pageColour={subtitleCardItem.pageColour || 'var(--article-colour)'}
                      />
                    default:
                      return <></>
                  }
                });
              })()}
            </div>

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
                      date={com.date}
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