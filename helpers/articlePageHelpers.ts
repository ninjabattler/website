import axios from "axios";
import { CommentProps } from "../components/Comment/Comment";
import { PostIdType, UserIdType } from "../types";

export const like = async (
  like: boolean,
  postId: PostIdType,
  userId: UserIdType,
  cb: Function,
): Promise<void> => {
  await axios({
    method: "post",
    url: `/api/likes/newLike/`,
    params: { like, postId, userId },
    headers: { "Content-Type": "application/json" },
  });

  cb();
};

export const sendComment = async (
  params: { id: PostIdType; content: string },
  userId: UserIdType,
  comments: CommentProps[],
  setCommenting: Function,
  cb: Function,
): Promise<void> => {
  try {
    setCommenting(true);
    const newComment = await axios({
      method: "post",
      url: `/api/comments/newComment/`,
      params: { postId: params.id, content: params.content, userId: userId },
      headers: { "Content-Type": "application/json" },
    });

    const newCommentsList = [
      { ...newComment.data, user_id: userId },
      ...comments,
    ];

    setCommenting(false);
    cb(newCommentsList);
  } catch (err) {
    console.log(err);
  }
};

export const styleText = (text: string): string => {
  const boldPattern: RegExp = new RegExp("(\\*{2}|_{2})(.*)(\\*{2}|_{2})", "g");
  const italicPattern: RegExp = new RegExp("(\\*|_)(.*)(\\*|_)", "g");
  const listPattern: RegExp = new RegExp("^-(.*)$", "gm");
  const numberedListPattern: RegExp = new RegExp("^([0-9]*\\.)(.*)$", "gm");
  const blockQuotePattern: RegExp = new RegExp("(^>)(.*)$", "gm");

  let styledText: string = text.replace(/<\/?[a-zA-Z0-9]*>/g, "");
  styledText = styledText.replace(boldPattern, "<b>$2</b>");
  styledText = styledText.replace(italicPattern, "<i>$2</i>");
  styledText = styledText.replace(blockQuotePattern, "<p blockquote>$2</p>");
  styledText = styledText.replace(listPattern, "<li><b>•</b>$1</li>");
  styledText = styledText.replace(numberedListPattern, "<li><b>$1</b>$2</li>");
  styledText = styledText.replace(/\n/g, "<br />");

  return `${styledText}`;
};

export const getTokenLength = (
  token: string | { content: string | string[] },
): number => {
  if (typeof token === "string") {
    return token.length;
  } else if (typeof token.content === "string") {
    return token.content.length;
  } else {
    return token.content.reduce((l, t) => l + getTokenLength(t), 0);
  }
};
