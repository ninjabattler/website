import { React, useState, useEffect, useRef } from 'react';
import styles from '../styles/Post.module.css';
import FireText from './animatedText/FireText/FireText';
import IceText from './animatedText/IceText/IceText';
import ThunderText from './animatedText/ThunderText/ThunderText';
import EarthText from './animatedText/EarthText/EarthText';
import RegexText from './animatedText/RegexText/RegexText';
import MetalHeadText from './animatedText/MetalHeadText/MetalHeadText';
import JsxParser from 'react-jsx-parser';
import Comment from './Comment';
import { CommentTwoTone, ArrowForwardIosRounded } from '@material-ui/icons'
import axios from 'axios';

export default function Posts(props) {

  const today = new Date();

  const secondsSincePost = ((today.getTime() / 1000) - (new Date(props.date.replace(' ', 'T')).getTime() / 1000))
  let minutesSincePost
  let hoursSincePost
  let daysSincePost
  let weeksSincePost
  let monthsSincePost
  let yearsSincePost

  if (secondsSincePost > 60) {
    minutesSincePost = secondsSincePost / 60
  }
  if (minutesSincePost > 60) {
    hoursSincePost = minutesSincePost / 60
  }
  if (hoursSincePost > 24) {
    daysSincePost = hoursSincePost / 24
  }
  if (daysSincePost > 7) {
    weeksSincePost = daysSincePost / 7
  }
  if (weeksSincePost > 4) {
    monthsSincePost = weeksSincePost / 4
  }
  if (monthsSincePost > 12) {
    yearsSincePost = monthsSincePost / 12
  }

  const [closed, setClosed] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(props.comments || [])
  const [commenting, setCommenting] = useState(false)
  const [viewComment, setViewComment] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const commentRef = useRef();
  // let commentContent = '';

  const comment = async (params, setCommenting, cb) => {
    console.log(props)
    try {
      setCommenting(true)
      const newComment = await axios({
        method: 'post',
        url: `/api/comments/newComment/`,
        params: { postId: params.id, content: params.content, userId: props.userId[0].id },
        headers: { 'Content-Type': 'application/json' }
      })

      const newCommentsList = [newComment.data, ...comments]

      setCommenting(false)
      cb(newCommentsList)
    }
    catch (err) {
      console.log(err);
    }
  }

  const addMarkdownToSelection = (openingTag, closingTag) => {
    if (commentRef.current) {
      const text = commentRef.current.innerText
      const selection = window.getSelection()
      const startText = text.slice(0, selection.anchorOffset);
      const endText = text.slice(selection.focusOffset, text.length);
      const markdown = `${openingTag}${text.slice(selection.anchorOffset, selection.focusOffset)}${closingTag}`

      setCommentContent(startText + markdown + endText);
    }
  }

  const styleText = (text) => {
    const boldPattern = new RegExp('(\\*{2}|_{2})([a-zA-Z0-9^\s]*)(\\*{2}|_{2})', 'g');
    const italicPattern = new RegExp('(\\*|_)([a-zA-Z0-9^\s]*)(\\*|_)', 'g');
    const blockQuotePattern = new RegExp('^>(.*)$', 'gm');
    const animatedTextPattern = new RegExp('\\{(.*)\\}\\[(.*)\\]', 'g');

    let styledText = text.replace(/<\/?[a-zA-Z0-9]*>/g, '');
    styledText = styledText.replace(boldPattern, '<b>$2</b>');
    styledText = styledText.replace(italicPattern, '<i>$2</i>');
    styledText = styledText.replace(blockQuotePattern, '</p><blockquote>$1</blockquote><p>');
    styledText = styledText.replace(animatedTextPattern, '<$1Text text="$2"/>');

    return `<p>${styledText}</p>`
  }

  return (
    <article
      key={props.title}
      className={`${closed === 0 ? styles.post : closed === 1 ? styles.expanded : `${styles.post} ${styles.closed}`}`}
      style={{ backgroundImage: '/Ninja placeholder.png', height: closed === 1 && showComments && '85vh' }}
      onClick={() => {
        setClosed(closed === 0 || closed === 2 ? 1 : 2)
        setShowComments(false)
        setTimeout(() => {
          setShowContent(!showContent)
        }, 700)
      }}>
      {
        !showContent ?
          (<img src={'/Ninja placeholder.png'} />)
          :
          (<></>)
      }

      <h1>{props.title}</h1>

      {/* Date */}
      {
        !showContent ?
          (<>{
            yearsSincePost ?
              (<h2>{Math.round(yearsSincePost)} Years</h2>)
              :
              monthsSincePost ?
                (<h2>{Math.round(monthsSincePost)} Months</h2>)
                :
                weeksSincePost ?
                  (<h2>{Math.round(weeksSincePost)} Weeks</h2>)
                  :
                  daysSincePost ?
                    (<h2>{Math.round(daysSincePost)} Days</h2>)
                    :
                    hoursSincePost ?
                      (<h2>{Math.round(hoursSincePost)} Hours</h2>)
                      :
                      minutesSincePost ?
                        (<h2>{Math.round(minutesSincePost)} Minutes</h2>)
                        :
                        secondsSincePost ?
                          (<h2>{Math.round(secondsSincePost)} Seconds</h2>)
                          :
                          (<h2></h2>)

          }</>)
          :
          (<></>)
      }
      {
        showContent ?
          (<div className={`${styles.postContent} ${showComments ? styles.shrunk : ''}`} onClick={(e) => {
            e.stopPropagation()
          }}>

            {showComments ?
              (
                <aside className={styles.commentPanel}>
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
                        <button className={viewComment && styles.selected} onClick={() => {
                          if (commentRef.current) {
                            setCommentContent(commentRef.current.innerText);
                          };
                          setViewComment(true)
                        }}>
                          <b>
                            View
                          </b>
                        </button>
                      </div>

                      {
                        viewComment &&
                        (<div id={styles.commentAreaView}>
                          <JsxParser
                            components={{ FireText, EarthText, IceText, ThunderText, RegexText, MetalHeadText }}
                            jsx={styleText(commentContent)}
                          />
                        </div>)
                      }
                      {
                        !viewComment &&
                        (<div
                          id={styles.commentArea}
                          placeholder='Leave a comment'
                          contentEditable
                          ref={commentRef}
                          dangerouslySetInnerHTML={{ __html: commentContent }}
                        // value={commentContent}
                        // onChange={(e) => { setCommentContent(e.target.value) }}
                        >
                        </div>)
                      }

                      <div id={styles.commentStylingBar}>
                        <button onClick={() => { addMarkdownToSelection('**', '**') }}>
                          <b>B</b>
                        </button>
                        <button onClick={() => { addMarkdownToSelection('_', '_') }}>
                          <i>i</i>
                        </button>
                        <button onClick={() => { addMarkdownToSelection('> ', '') }}>
                          <b>{'>'}</b>
                        </button>
                        <div id={styles.animTextDropdown}>
                          <p>Anim Text</p>
                          <div>
                            <button onClick={() => { addMarkdownToSelection('{Fire}[', ']') }}>
                              <FireText text='Anim Text' />
                            </button>
                            <button onClick={() => { addMarkdownToSelection('{Ice}[', ']') }}>
                              <IceText text='Anim Text' />
                            </button>
                            <button onClick={() => { addMarkdownToSelection('{Thunder}[', ']') }}>
                              <ThunderText text='Anim Text' />
                            </button>
                            <button onClick={() => { addMarkdownToSelection('{Earth}[', ']') }}>
                              <EarthText text='Anim Text' />
                            </button>
                            <button onClick={() => { addMarkdownToSelection('{Regex}[', ']') }}>
                              <RegexText text='Anim Text' />
                            </button>
                            <button onClick={() => { addMarkdownToSelection('{MetalHead}[', ']') }}>
                              <MetalHeadText text='Anim Text' />
                            </button>
                          </div>
                        </div>

                        <button id={styles.styleFiller}></button>
                        <button id={styles.postComment} onClick={() => {
                          comment({ content: styleText(commentContent), id: props.id }, setCommenting, (newComments) => {
                            setCommentContent('')
                            setComments(newComments)
                          })
                        }}>
                          <b>Post</b>
                        </button>
                      </div>
                    </>)}

                  <div className={styles.comments}>
                    {comments.map((com) => {
                      if (com.username) {
                        return (<Comment
                          postComment
                          key={comment.id}
                          pageColour={com.user_id === props.userId[0].id ? '#000000' : 'transparent'}
                          username={com.username.slice(0, 10)}
                          date={com.formatteddate}
                          content={com.content}
                          avatar={com.avatar} />)
                      }
                    })}
                  </div>
                </aside>)
              :
              (
                <button className={styles.commentPanelButton} onClick={() => {
                  setShowComments(true)
                }}>
                  <CommentTwoTone style={{ transform: 'scale(2)' }} />
                </button>
              )
            }

            {/* Content */}
            <JsxParser
              components={{ FireText, IceText, ThunderText, EarthText }}
              jsx={props.content}
            />

          </div>)
          :
          (<></>)
      }
    </article>)
}