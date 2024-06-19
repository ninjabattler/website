import React, {
  FC,
  CSSProperties,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import styles from "./Comment.module.scss";
import { styleText } from "../../utils/articlePageHelpers";
import moment from "moment";
import { PersonSharp } from "@mui/icons-material";

export type CommentProps = {
  username: string;
  content: string;
  style?: CSSProperties;
  avatar: number;
  date?: string;
  byCurrentUser: boolean;
};

/**
 * A component used to display a comment on Articles and Posts
 * @author Ninjabattler
 * @param username The username of the commenter
 * @param content The markdown of the comment
 * @param style An optional style object
 * @param avatar The avatar to display on the comment
 * @param date The date of the comment
 */
const Comment: FC<CommentProps> = ({
  username,
  content,
  style,
  byCurrentUser = false,
  date,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [contentOverflowed, setContentOverflowed] = useState<boolean>(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const clickShowMore = () => {
    setShowMore(!showMore);
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
      className={`${styles.comment} ${byCurrentUser ? styles.byCurrentUser : ""}`}
      style={style}
    >
      <div className={styles.header}>
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
