import axios from 'axios';

export const like = async (like, postId, userId, cb) => {
  await axios({
    method: 'post',
    url: `/api/likes/newLike/`,
    params: { like, postId, userId },
    headers: { 'Content-Type': 'application/json' }
  })

  cb()
}

export const comment = async (params, userId, comments, setCommenting, cb) => {
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

export const addMarkdownToSelection = (commentRef, openingTag, closingTag, setCommentContent) => {
  if (commentRef.current) {
    const text = commentRef.current.innerText
    const selection = window.getSelection()
    const startText = text.slice(0, selection.anchorOffset);
    const endText = text.slice(selection.focusOffset, text.length);
    const markdown = `${openingTag}${text.slice(selection.anchorOffset, selection.focusOffset)}${closingTag}`

    setCommentContent(startText + markdown + endText);
  }
}

export const styleText = (text) => {
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