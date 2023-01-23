import React, { useState, useRef, MutableRefObject, ReactElement } from 'react';
import styles from './Post.module.scss';
import FireText from '../animatedText/FireText/FireText';
import IceText from '../animatedText/IceText/IceText';
import ThunderText from '../animatedText/ThunderText/ThunderText';
import EarthText from '../animatedText/EarthText/EarthText';
import RegexText from '../animatedText/RegexText/RegexText';
import MetalHeadText from '../animatedText/MetalHeadText/MetalHeadText';
import JsxParser from 'react-jsx-parser';
import Comment from '../Comment/Comment';
import CommentArea from '../feedbackAndShare/CommentArea/CommentArea';
import { ArticleJson, IpType, PostIdType, TitleType, UserIdType } from '../../types';
import { parseJsonPost } from '../../helpers/parseJsonPost';
import moment from 'moment';

type PostProps = {
  title: TitleType;
  date: string;
  comments: Array<any>;
  content: ArticleJson;
  id: PostIdType;
  userId: UserIdType;
  ip: IpType;
}

export default function Post({ title, date, comments, content, id, userId }: PostProps): ReactElement {
  const [closed, setClosed] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Array<any>>(comments || []);
  const [commenting, setCommenting] = useState<boolean>(false);
  const [viewComment, setViewComment] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>('');
  const commentRef: MutableRefObject<undefined> = useRef();

  return (
    <article
      key={title}
      className={`${closed === 0 ? styles.post : closed === 1 ? styles.expanded : `${styles.post} ${styles.closed}`}`}
      style={{ backgroundImage: '/Ninja placeholder.png' }}
      onClick={() => {
        setClosed(closed === 0 || closed === 2 ? 1 : 2)
        setTimeout(() => {
          setShowContent(!showContent)
        }, 700)
      }}>
      <style>
        {`
            :root {
              --article-colour: #aaaa44;
            }
          `}
      </style>

      {!showContent && <img src={'/Ninja placeholder.png'} />}
      <h1>{title}</h1>
      {!showContent && <h2>{moment(date).fromNow(true)}</h2>}

      {
        showContent &&
        (
          <div className={`${styles.postContent} ${styles.shrunk}`} onClick={(e) => {
            e.stopPropagation()
          }}>
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
                      date={com.date}
                      content={com.content}
                      avatar={com.avatar} />)
                  }
                })}
              </div>
            </aside>

            {/* Content */}
            {/* @ts-ignore - JsxParser has an error with how it exports, works perfectly fine though */}
            <JsxParser
              components={{ FireText, IceText, ThunderText, EarthText, MetalHeadText, RegexText } as {}}
              jsx={parseJsonPost(content)}
            />

          </div>
        )
      }
    </article>)
}