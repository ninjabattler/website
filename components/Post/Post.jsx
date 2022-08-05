import { React, useState, useRef } from 'react';
import styles from './Post.module.css';
import FireText from '../animatedText/FireText/FireText';
import IceText from '../animatedText/IceText/IceText';
import ThunderText from '../animatedText/ThunderText/ThunderText';
import EarthText from '../animatedText/EarthText/EarthText';
import RegexText from '../animatedText/RegexText/RegexText';
import MetalHeadText from '../animatedText/MetalHeadText/MetalHeadText';
import JsxParser from 'react-jsx-parser';
import Comment from '../Comment/Comment';
import { CommentTwoTone } from '@material-ui/icons'
import CommentArea from '../feedbackAndShare/CommentArea/CommentArea';

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
      {!showContent && <img src={'/Ninja placeholder.png'} />}

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

                  <CommentArea
                    commentRef={commentRef}
                    comments={comments}
                    setComments={setComments}
                    postId={props.id}
                    userId={props.userId[0].id}
                    commenting={commenting}
                    setCommentContent={setCommentContent}
                    setViewComment={setViewComment}
                    viewComment={viewComment}
                    setCommenting={setCommenting}
                    commentContent={commentContent}
                    noAnim={true}
                  />

                  <div className={styles.comments}>
                    {comments.map((com) => {
                      if (com.username) {
                        return (<Comment
                          postComment
                          key={com.id}
                          pageColour={com.user_id === props.userId[0].id ? '#aaaa44' : 'transparent'}
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
              components={{ FireText, IceText, ThunderText, EarthText, MetalHeadText, RegexText }}
              jsx={props.content}
            />

          </div>)
          :
          (<></>)
      }
    </article>)
}