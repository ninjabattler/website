import React, { useState, useRef, MutableRefObject, ReactElement } from 'react';
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
import { IpType, PostIdType, TitleType, UserIdType } from '../../types';

type PostProps = {
  title: TitleType;
  date: string;
  comments: Array<any>;
  content: string;
  id: PostIdType;
  userId: UserIdType;
  ip: IpType;
}

export default function Post({ title, date, comments, content, id, userId }: PostProps): ReactElement {

  const today: Date = new Date();

  const secondsSincePost: number = ((today.getTime() / 1000) - (new Date(date.replace(' ', 'T')).getTime() / 1000));
  let minutesSincePost: number;
  let hoursSincePost: number;
  let daysSincePost: number;
  let weeksSincePost: number;
  let monthsSincePost: number;
  let yearsSincePost: number;

  if (secondsSincePost > 60) {
    minutesSincePost = secondsSincePost / 60;
  }
  if (minutesSincePost > 60) {
    hoursSincePost = minutesSincePost / 60;
  }
  if (hoursSincePost > 24) {
    daysSincePost = hoursSincePost / 24;
  }
  if (daysSincePost > 7) {
    weeksSincePost = daysSincePost / 7;
  }
  if (weeksSincePost > 4) {
    monthsSincePost = weeksSincePost / 4;
  }
  if (monthsSincePost > 12) {
    yearsSincePost = monthsSincePost / 12;
  }

  const [closed, setClosed] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Array<any>>(comments || []);
  const [commenting, setCommenting] = useState<boolean>(false);
  const [viewComment, setViewComment] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>('');
  const commentRef: MutableRefObject<undefined> = useRef();

  return (
    <article
      key={title}
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

      <h1>{title}</h1>

      {/* Date */}
      {
        !showContent &&
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
                    comments={commentList}
                    setComments={setCommentList}
                    postId={id}
                    userId={userId}
                    commenting={commenting}
                    setCommentContent={setCommentContent}
                    setViewComment={setViewComment}
                    viewComment={viewComment}
                    setCommenting={setCommenting}
                    commentContent={commentContent}
                    noAnim={true}
                  />

                  <div className={styles.comments}>
                    {commentList.map((com) => {
                      if (com.username) {
                        return (<Comment
                          key={com.id}
                          pageColour={com.user_id === userId ? '#aaaa44' : 'transparent'}
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
            {/* @ts-ignore - JsxParser has an error with how it exports, works perfectly fine though */}
            <JsxParser
              components={{ FireText, IceText, ThunderText, EarthText, MetalHeadText, RegexText } as {}}
              jsx={content}
            />

          </div>)
          :
          (<></>)
      }
    </article>)
}