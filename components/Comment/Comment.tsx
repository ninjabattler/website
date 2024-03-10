import React, {
  FC,
  CSSProperties,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import styles from "./Comment.module.scss";
import { styleText } from "../../helpers/articlePageHelpers";
import moment from "moment";

const avatars = {
  avatar1: "/userAvatars/Mask 1.png",
  avatar2: "/userAvatars/Mask 2.png",
  avatar3: "/userAvatars/Mask 3.png",
  avatar4: "/userAvatars/Mask 4.png",
  avatar5: "/userAvatars/Mask 5.png",
};

export type CommentProps = {
  username: string;
  content: string;
  style?: CSSProperties;
  avatar: number;
  date?: string;
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
  avatar,
  date,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [contentOverflowed, setContentOverflowed] = useState<boolean>(false);
  const contentRef = useRef<HTMLParagraphElement>();

  const clickShowMore = useCallback(() => {
    setShowMore(!showMore);
  }, [showMore]);

  useEffect(() => {
    if (contentRef.current.scrollHeight > contentRef.current.clientHeight) {
      setContentOverflowed(true);
    }
  }, [contentRef]);

  return (
    <div className={styles.comment} style={style}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={avatars[`avatar${avatar}`]}
          alt="profile pic"
        />
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
