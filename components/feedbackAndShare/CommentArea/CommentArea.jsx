import React from 'react';
import styles from "./CommentArea.module.css";
import JsxParser from 'react-jsx-parser';
import FireText from '../../animatedText/FireText/FireText';
import ThunderText from '../../animatedText/ThunderText/ThunderText';
import IceText from '../../animatedText/IceText/IceText';
import EarthText from '../../animatedText/EarthText/EarthText';
import RegexText from '../../animatedText/RegexText/RegexText';
import MetalHeadText from '../../animatedText/MetalHeadText/MetalHeadText';
import { addMarkdownToSelection, comment, styleText } from '../../../helpers/articlePageHelpers';

export default function CommentArea({ commentRef, comments, setComments, postId, userId, commenting, setCommenting, viewComment, setViewComment, setCommentContent, commentContent, noAnim }) {
  return (
    <>
      {commenting === true ?
        (<>
          <p id={styles.commentLoading}>
            <img src={'/Ninja placeholder.png'} />
          </p>
        </>) :
        (<>
          <div id={styles.commentViewBar} className={noAnim && styles.noAnim}>
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
            (<div id={styles.commentAreaView} className={noAnim && styles.noAnim}>
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
              className={noAnim && styles.noAnim}
              placeholder='Leave a comment'
              contentEditable
              ref={commentRef}
              dangerouslySetInnerHTML={{ __html: commentContent }}
            >
            </div>)
          }

          <div id={styles.commentStylingBar} className={noAnim && styles.noAnim}>
            <button onClick={() => { addMarkdownToSelection(commentRef, '**', '**', setCommentContent) }}>
              <b>B</b>
            </button>
            <button onClick={() => { addMarkdownToSelection(commentRef, '_', '_', setCommentContent) }}>
              <i>i</i>
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

            <button id={styles.styleFiller}></button>
            <button id={styles.postComment} onClick={() => {
              const content = styleText(commentRef.current.innerText);

              comment({ content: content, id: postId }, userId, comments, setCommenting, (newComments) => {
                setCommentContent('')
                setComments(newComments)
              })
            }}>
              <b>Post</b>
            </button>
          </div>
        </>)}
    </>
  )
}