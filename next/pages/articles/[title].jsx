import { React, useEffect, useState, useRef } from 'react';
import styles from '../../styles/ReviewPage.module.css';
import JsxParser from 'react-jsx-parser';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Head from 'next/dist/shared/lib/head';
import db from '../../db/db';
import { selectSingleArticle, selectUserId, selectUsersLike, insertNewUser } from '../../db/queries';
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
import { ThumbUpSharp, ThumbDownSharp, ArrowForwardIosRounded, Reddit, Twitter, LinkedIn, Facebook, CommentTwoTone } from '@material-ui/icons'
import axios from 'axios';
import VideoBackground from '../../components/VideoBackground';
import requestIp from 'request-ip'
import SubtitleCard from '../../components/SubtitleCard';

export const getServerSideProps = async (req) => {
  // let ip = await axios({ method: 'get', url: `https://api.ipify.org?format=json`, headers: { 'Content-Type': 'application/json' }, })
  // ip = ip.data.ip;

  const ip = requestIp.getClientIp(req.req)

  let userId = await selectUserId(db, ip)

  if (!userId[0]) {
    userId = await insertNewUser(db, ip)
  }

  const userLike = await selectUsersLike(db, userId[0].id)
  const articleTitle = req.query.title.replace(/_/g, ' ');
  const articleData = await selectSingleArticle(db, articleTitle);

  let liked = false;
  let disliked = false;

  if (userLike[0]) {
    if (userLike[0].liked) {
      liked = true;
    } else {
      disliked = true;
    }
  }

  console.log(articleData)

  if (!articleData[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      articleData: { ...articleData[0] },
      userId: userId[0].id,
      liked,
      disliked,
      url: `https://ninjabattler.ca/articles/${req.params.title}`
    }
  }
}

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
  const [commentContent, setCommentContent] = useState('');
  const commentRef = useRef();

  useEffect(() => {
    setWindow(window)
  }, [])

  const like = async ({ like }, cb) => {
    const newLike = await axios({
      method: 'post',
      url: `/api/likes/newLike/`,
      params: { like: like, postId: props.articleData.id, userId: props.userId },
      headers: { 'Content-Type': 'application/json' }
    })

    cb()
  }

  const comment = async (params, setCommenting, cb) => {
    try {
      setCommenting(true)
      const newComment = await axios({
        method: 'post',
        url: `/api/comments/newComment/`,
        params: { postId: params.id, content: params.content, userId: props.userId },
        headers: { 'Content-Type': 'application/json' }
      })

      const newCommentsList = [{ ...newComment.data, user_id: props.userId }, ...comments]

      setCommenting(false)
      cb(newCommentsList)
    }
    catch (err) {
      console.log(err);
    }
  }

  const styleText = (text) => {
    const boldPattern = new RegExp('(\\*{2}|_{2})([a-zA-Z0-9^\s]*)(\\*{2}|_{2})', 'g');
    const italicPattern = new RegExp('(\\*|_)([a-zA-Z0-9^\s]*)(\\*|_)', 'g');
    const blockQuotePattern = new RegExp('^>(.*)$', 'gm');

    let styledText = text.replace(/<\/?[a-zA-Z0-9]*>/g, '');
    styledText = styledText.replace(boldPattern, '<b>$2</b>');
    styledText = styledText.replace(italicPattern, '<i>$2</i>');
    styledText = styledText.replace(blockQuotePattern, '</p><blockquote>$1</blockquote><p>');

    return `<p>${styledText}</p>`
  }

  return (
    <>
      <NavBar />
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
        <InfoBar date={props.articleData.formatteddate} categoryGenre={`${props.articleData.category}/${props.articleData.genre}`} />

        <div>
          <article className={styles.articleContainer} style={windowServer.innerWidth < 426 ? { boxShadow: `2px 2px 0px ${props.articleData.colour}` } : { boxShadow: `5px 5px 0px ${props.articleData.colour}` }}>
            {props.articleData.narration && (<iframe id={styles.adAurisIframe} src={`${props.articleData.narration}?color=${props.articleData.colour.split('#')[1]}`} style={{ border: 'none', height: '100px', width: '80%' }} ></iframe>)}
            <JsxParser
              components={{ Picture, ListItem, Underline, Quote, Paragraph, TitleCard, CodeBlock, SubtitleCard }}

              jsx={props.articleData.content}
            />
          </article>

          <aside className={styles.commentPanel} style={windowServer.innerWidth < 426 ? { marginLeft: showPanel ? "-81%" : "0%" } : {}}>
            <aside className={styles.likePanel} >

              <button onClick={() => {
                like({ like: true, }, () => {
                  setIsLiked(!isLiked)
                  if (isLiked === false) {
                    setLikes(likes + 1)
                  } else {
                    setLikes(likes - 1)
                  }
                  if (isDisliked) {
                    setIsDisliked(!isDisliked)
                    setDislikes(dislikes - 1)
                  }
                  console.log(isLiked, isDisliked)
                })
              }}
                style={{ color: isLiked === true ? props.articleData.colour : '#292929' }}>
                <span className={styles.likeOption}><ThumbUpSharp className={styles.shareIcon} />{likes}</span>

              </button>

              <div id={styles.likeBar} style={{ backgroundImage: `linear-gradient(90deg, ${props.articleData.colour} ${(likes / (likes + dislikes)) * 100}%, transparent ${(likes / (likes + dislikes)) * 100}%)` }}>

              </div>
              <button onClick={() => {
                like({ like: false }, () => {
                  setIsDisliked(!isDisliked)
                  if (isDisliked === false) {
                    setDislikes(dislikes + 1)
                  } else {
                    setDislikes(dislikes - 1)
                  }
                  if (isLiked) {
                    setIsLiked(!isLiked)
                    setLikes(likes - 1)
                  }
                  console.log(isLiked, isDisliked)
                })
              }}
                style={{ color: isDisliked === true ? props.articleData.colour : '#292929' }}>
                <span className={styles.likeOption}><ThumbDownSharp className={styles.shareIcon} />{dislikes}</span>
              </button>
            </aside>

            <aside id={styles.shareBar}>
              <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small">
                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(windowServer.location).replace(/'/g, "%27").replace(/"/g, "%22")}`} className="fb-xfbml-parse-ignore" rel="noreferrer">
                  <Facebook className={styles.shareIcon} />
                </a>
              </div>
              <div>
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false" rel="noreferrer">
                  <Twitter className={styles.shareIcon} />
                </a>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
              </div>
              <div>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(windowServer.location).replace(/'/g, "%27").replace(/"/g, "%22")}`} target="_blank" rel="noreferrer">
                  <LinkedIn className={styles.shareIcon} />
                </a>
              </div>
              <div>
                <a href={`http://www.reddit.com/submit?url=${windowServer.location}&title=Ninjabattler-${props.articleData.title}`} target="_blank" rel="noreferrer">
                  <Reddit className={styles.shareIcon} />
                </a>
              </div>
            </aside>

            {commenting === true ?
              (<>
                <p id={styles.commentLoading}>
                  <img src={'/Ninja placeholder.png'} />
                </p>
              </>) :
              (<>
                <div id={styles.commentViewBar}>
                  <button className={!viewComment && styles.selected} onClick={() => { setViewComment(false) }}>
                    <b>
                      Edit
                    </b>
                  </button>
                  <button className={viewComment && styles.selected} onClick={() => { setViewComment(true) }}>
                    <b>
                      View
                    </b>
                  </button>
                </div>

                {
                  viewComment ?
                    (<div id={styles.commentArea} dangerouslySetInnerHTML={{ __html: styleText(commentContent) }}></div>)
                    :
                    (<textarea
                      id={styles.commentArea}
                      placeholder='Leave a comment'
                      value={commentContent}
                      onChange={(e) => { setCommentContent(e.target.value) }}
                    >
                    </textarea>)
                }

                <div id={styles.commentStylingBar}>
                  <button>
                    <b>B</b>
                  </button>
                  <button>
                    <i>i</i>
                  </button>
                  <button onClick={() => {
                  comment({ content: styleText(commentContent), id: props.articleData.id }, setCommenting, (newComments) => {
                    setCommentContent('')
                    setComments(newComments)
                  })
                }}>
                    <b>{'>'}</b>
                  </button>
                  <button id={styles.styleFiller}></button>
                </div>
              </>)}

            <div className={styles.comments}>
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
      <Footer />
    </>)
}