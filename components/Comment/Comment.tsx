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
import {
  DeleteForeverSharp,
  ArrowDropDown,
  PersonSharp,
  CommentSharp,
  ThumbUpSharp,
  ThumbDownSharp,
} from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import gsap from "gsap";

export type CommentProps = {
  id: string;
  username: string;
  content: string;
  style?: CSSProperties;
  profilePic?: SanityImage;
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
 * @param profilePic The user image to display on the comment
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
  profilePic,
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
      contentRef.current.querySelectorAll("br").length > 3
    ) {
      setContentOverflowed(true);
    }
  }, [contentRef]);

  useEffect(() => {
    if (contentRef.current) {
      const hiddenHeight =
        Number(
          getComputedStyle(contentRef.current).fontSize.replace("px", ""),
        ) * 4.7;

      gsap.timeline().to(`#comment-${id}`, {
        maxHeight: showMore ? "1000em" : "4.7em",
        duration: 0,
        delay: showMore ? 0 : 1,
        ease: "sine",
      });

      gsap.timeline().to(`#comment-${id}`, {
        height: showMore
          ? contentRef.current.children[0].clientHeight
          : contentOverflowed
            ? hiddenHeight
            : "auto",
        duration: 0.25,
        delay: 0,
        ease: "sine",
      });
    }
  }, [showMore]);

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

        {profilePic ? (
          <Image
            className={styles.avatar}
            src={profilePic.url}
            width={profilePic.width}
            height={profilePic.height}
            loading="lazy"
            placeholder="blur"
            blurDataURL={profilePic.blur}
            alt="Profile Pic"
          />
        ) : (
          <PersonSharp className={styles.avatar} />
        )}
        <div className={styles.userInfo}>
          <b>{username}</b>
          <i>{moment(date).fromNow()}</i>
        </div>
      </div>

      <p
        ref={contentRef}
        id={`comment-${id}`}
        className={`${styles.content} ${showMore ? styles.showMore : ""}`}
        dangerouslySetInnerHTML={{ __html: `<div>${styleText(content)}</div>` }}
      />

      <div className={styles.bottomBar}>
        <button
          className={`${styles.showMoreButton} ${showMore ? styles.droppedDown : ""}`}
          onClick={clickShowMore}
          disabled={!contentOverflowed}
          title="Show More"
        >
          <ArrowDropDown />
        </button>

        <button className={styles.replies}>
          <CommentSharp />0
        </button>

        <div className={styles.likeBar}>
          <button>
            <ThumbUpSharp />0
          </button>
          <div />
          <button>
            0<ThumbDownSharp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
