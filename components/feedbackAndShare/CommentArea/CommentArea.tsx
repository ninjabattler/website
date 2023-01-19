import React, { ReactElement, RefObject } from 'react';
import styles from "./CommentArea.module.scss";
import JsxParser from 'react-jsx-parser';
import FireText from '../../animatedText/FireText/FireText';
import ThunderText from '../../animatedText/ThunderText/ThunderText';
import IceText from '../../animatedText/IceText/IceText';
import EarthText from '../../animatedText/EarthText/EarthText';
import RegexText from '../../animatedText/RegexText/RegexText';
import MetalHeadText from '../../animatedText/MetalHeadText/MetalHeadText';
import { addMarkdownToSelection, comment, styleText } from '../../../helpers/articlePageHelpers';
import { PostIdType, UserIdType } from '../../../types';

interface CommentAreaProps {
  commentRef: RefObject<any>;
  comments: Array<any>;
  setComments: Function;
  postId: PostIdType;
  userId: UserIdType;
  commenting: boolean;
  setCommenting: Function;
  viewComment: boolean;
  setViewComment: Function;
  setCommentContent: Function;
  commentContent: string;
  noAnim: boolean;
}

export default function CommentArea({
  commentRef,
  comments,
  setComments,
  postId,
  userId,
  commenting,
  setCommenting,
  viewComment,
  setViewComment,
  setCommentContent,
  commentContent,
  noAnim }: CommentAreaProps): ReactElement {

  return (
    <>
      {commenting === true ?
        (<>
          <p id={styles.commentLoading}>
            <img src={'/Ninja placeholder.png'} />
          </p>
        </>) :
        (<>
          <div contentEditable ref={commentRef} id={styles.commentAreaView} className={noAnim && styles.noAnim}>
            {/* @ts-ignore - JsxParser has an error with how it exports, works perfectly fine though */}
            <JsxParser
              components={{ FireText, EarthText, IceText, ThunderText, RegexText, MetalHeadText } as {}}
              jsx={styleText(commentContent)}
            />
          </div>
          

          <div id={styles.commentStylingBar} className={noAnim && styles.noAnim}>
            <button onClick={() => { addMarkdownToSelection(commentRef, '**', '**', setCommentContent) }}>
              <b>B</b>
            </button>
            <button onClick={() => { addMarkdownToSelection(commentRef, '_', '_', setCommentContent) }}>
              <i>I</i>
            </button>
            <button onClick={() => { addMarkdownToSelection(commentRef, '> ', '', setCommentContent) }}>
              <b>{'>'}</b>
            </button>
            <div id={styles.animTextDropdown}>
              <p>Anim Text</p>
              <div>
                <button onClick={() => { addMarkdownToSelection(commentRef, '{Fire}[', ']', setCommentContent) }}>
                  <FireText text='Anim Text' />
                </button>
                <button onClick={() => { addMarkdownToSelection(commentRef, '{Ice}[', ']', setCommentContent) }}>
                  <IceText text='Anim Text' />
                </button>
                <button onClick={() => { addMarkdownToSelection(commentRef, '{Thunder}[', ']', setCommentContent) }}>
                  <ThunderText text='Anim Text' />
                </button>
                <button onClick={() => { addMarkdownToSelection(commentRef, '{Earth}[', ']', setCommentContent) }}>
                  <EarthText text='Anim Text' />
                </button>
                <button onClick={() => { addMarkdownToSelection(commentRef, '{Regex}[', ']', setCommentContent) }}>
                  <RegexText text='Anim Text' />
                </button>
                <button onClick={() => { addMarkdownToSelection(commentRef, '{MetalHead}[', ']', setCommentContent) }}>
                  <MetalHeadText text='Anim Text' />
                </button>
              </div>
            </div>

            <button id={styles.postComment} onClick={() => {
              const content = styleText(commentContent);

              comment({ content: content, id: postId }, userId, comments, setCommenting, (newComments) => {
                setCommentContent('')
                setComments(newComments)
              })
            }}>
              <b>Comment</b>
            </button>
          </div>
        </>)}
    </>
  )
}