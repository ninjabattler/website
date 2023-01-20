import axios from 'axios';
import { CommentProps } from '../components/Comment/Comment';
import { PostIdType, UserIdType } from '../types';

export const like = async (like: boolean, postId: PostIdType, userId: UserIdType, cb: Function): Promise<void> => {
  await axios({
    method: 'post',
    url: `/api/likes/newLike/`,
    params: { like, postId, userId },
    headers: { 'Content-Type': 'application/json' }
  })

  cb()
}

export const comment = async (params: { id: PostIdType; content: string }, userId: UserIdType, comments: CommentProps[], setCommenting: Function, cb: Function): Promise<void> => {
  try {
    setCommenting(true)
    const newComment = await axios({
      method: 'post',
      url: `/api/comments/newComment/`,
      params: { postId: params.id, content: params.content, userId: userId },
      headers: { 'Content-Type': 'application/json' }
    })

    const newCommentsList = [{ ...newComment.data, user_id: userId }, ...comments]

    setCommenting(false)
    cb(newCommentsList)
  }
  catch (err) {
    console.log(err);
  }
}

export const addMarkdownToSelection = (commentRef: any, openingTag: string, closingTag: string, setCommentContent: Function): void => {
  if (commentRef.current) {
    const text: string = commentRef.current.innerText
    const selection: Selection = window.getSelection()
    const startText: string = text.slice(0, selection.anchorOffset);
    const endText: string = text.slice(selection.focusOffset, text.length);
    const markdown: string = `${openingTag}${text.slice(selection.anchorOffset, selection.focusOffset)}${closingTag}`

    setCommentContent(startText + markdown + endText);
  }
}

export const styleText = (text: string): string => {
  const boldPattern: RegExp = new RegExp('(\\*{2}|_{2})([a-zA-Z0-9^\s]*)(\\*{2}|_{2})', 'g');
  const italicPattern: RegExp = new RegExp('(\\*|_)([a-zA-Z0-9^\s\"#\＄%&\'\(\)\*\+,-\./:;<=>\?@\[\\\]\^_`{\|}~]*)(\\*|_)', 'g');
  const listPattern: RegExp = new RegExp('^-(.*)$', 'gm');
  const numberedListPattern: RegExp = new RegExp('^([0-9]*\\.)(.*)$', 'gm');
  // const animatedTextPattern: RegExp = new RegExp('\\{(.*)\\}\\[(.*)\\]', 'g');
  const blockQuotePattern: RegExp = new RegExp('(^>)(.*)$', 'gm');

  let styledText: string = text.replace(/<\/?[a-zA-Z0-9]*>/g, '');
  styledText = styledText.replace(boldPattern, '<b>$2</b>');
  styledText = styledText.replace(italicPattern, '<i>$2</i>');
  styledText = styledText.replace(blockQuotePattern, '<p blockquote>$2</p>');
  styledText = styledText.replace(listPattern, '<li><b>•</b>$1</li>');
  styledText = styledText.replace(numberedListPattern, '<li><b>$1</b>$2</li>');
  // styledText = styledText.replace(animatedTextPattern, '<$1Text text="$2"/>');
  styledText = styledText.replace(/\n/g, '<br />');

  console.log(styledText)

  return `${styledText}`
}