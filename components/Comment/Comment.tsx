import React, {
  FC,
  CSSProperties,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./Comment.module.scss";
import { styleText } from "../../utils/articlePageHelpers";
import moment from "moment";
import { DeleteForeverSharp, PersonSharp } from "@mui/icons-material";
import axios from "axios";

export type CommentProps = {
  id: string;
  username: string;
  content: string;
  style?: CSSProperties;
  avatar: number;
  date: string;
  byCurrentUser: boolean;
  setComments: (commentId: string) => void;
  hide?: boolean;
};

/**
 * A component used to display a comment on Articles and Posts
 * @author Ninjabattler
 * @param id The id of the comment
 * @param username The username of the commenter
 * @param content The markdown of the comment
 * @param style An optional style object
 * @param avatar The avatar to display on the comment
 * @param date The date of the comment
 * @param setComments A function to set the comments on a post/article
 * @param hide A boolean to hide/show the component
 */
const Comment: FC<CommentProps> = ({
  id,
  username,
  content,
  style,
  byCurrentUser = false,
  date,
  setComments,
  hide,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [contentOverflowed, setContentOverflowed] = useState<boolean>(false);
  const [showDeleteOverlay, setShowDeleteOverlay] = useState<boolean>(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const clickShowMore = () => {
    setShowMore(!showMore);
  };

  const clickDelete = () => {
    setShowDeleteOverlay(!showDeleteOverlay);
  };

  const deleteComment = () => {
    axios({
      method: "post",
      url: `/api/comments/delete`,
      data: { commentId: id },
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setComments(id);
    });
  };

  useEffect(() => {
    if (
      contentRef.current &&
      contentRef.current.scrollHeight > contentRef.current.clientHeight
    ) {
      setContentOverflowed(true);
    }
  }, [contentRef]);

  return (
    <div
      className={`${styles.comment} ${byCurrentUser ? styles.byCurrentUser : ""} ${showDeleteOverlay ? styles.blurred : ""} ${hide ? styles.hide : ""}`}
      style={style}
    >
      {showDeleteOverlay && (
        <div className={styles.deleteOverlay}>
          <h3>Think about this, are you certain?</h3>
          <button onClick={deleteComment}>Yes</button>
          <button onClick={clickDelete}>No</button>
        </div>
      )}

      <div className={styles.header}>
        {byCurrentUser && (
          <div className={styles.userButtons}>
            <button onClick={clickDelete}>
              <DeleteForeverSharp />
            </button>
          </div>
        )}

        <PersonSharp className={styles.avatar} />
        <div className={styles.userInfo}>
          <b>{username}</b>
          <i>{moment(date).fromNow()}</i>
        </div>
      </div>

      <p
        ref={contentRef}
        className={`${styles.content} ${showMore ? styles.showMore : ""}`}
        dangerouslySetInnerHTML={{ __html: styleText(content) }}
      />

      {contentOverflowed && (
        <button className={styles.showMoreButton} onClick={clickShowMore}>
          Show {showMore ? "Less" : "More"}
        </button>
      )}
    </div>
  );
};

export default Comment;
