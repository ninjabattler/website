import React, { useState, useRef, MutableRefObject, ReactElement } from "react";
import styles from "./Post.module.scss";
import FireText from "../animatedText/FireText/FireText";
import IceText from "../animatedText/IceText/IceText";
import ThunderText from "../animatedText/ThunderText/ThunderText";
import EarthText from "../animatedText/EarthText/EarthText";
import RegexText from "../animatedText/RegexText/RegexText";
import MetalHeadText from "../animatedText/MetalHeadText/MetalHeadText";
import TerrariaText from "../animatedText/TerrariaText/TerrariaText";
import Comment from "../Comment/Comment";
import {
  ArticleJson,
  HtmlItem,
  IpType,
  ParagraphItem,
  PictureItem,
  PostIdType,
  TitleType,
  UserIdType,
} from "../../types";
import moment from "moment";
import dynamic from "next/dynamic";
import { TypedObject } from "sanity";
const CommentArea = dynamic(
  () => import("../feedbackAndShare/CommentArea/CommentArea"),
  { loading: () => <></> },
);

type PostProps = {
  title: TitleType;
  date: string;
  comments: Array<any>;
  content: ArticleJson | TypedObject[];
  id: PostIdType;
  userId: UserIdType;
  ip: IpType;
};

export default function Post({
  title,
  date,
  comments,
  content,
  id,
  userId,
}: PostProps): ReactElement {
  const [closed, setClosed] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Array<any>>(comments || []);
  const [commenting, setCommenting] = useState<boolean>(false);
  const [viewComment, setViewComment] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const commentRef: MutableRefObject<undefined> = useRef();

  return (
    <article
      key={title}
      className={`${
        closed === 0
          ? styles.post
          : closed === 1
            ? styles.expanded
            : `${styles.post} ${styles.closed}`
      }`}
      style={{ backgroundImage: "/Ninja placeholder.png" }}
      onClick={() => {
        setClosed(closed === 0 || closed === 2 ? 1 : 2);
        setTimeout(() => {
          setShowContent(!showContent);
        }, 700);
      }}
    >
      <style>
        {`
            :root {
              --article-colour: #aaaa44;
            }
          `}
      </style>

      {!showContent && <img src={"/Ninja placeholder.png"} alt="logo" />}
      <h1>{title}</h1>
      {!showContent && <h2>{moment(date).fromNow(true)}</h2>}

      {showContent && (
        <div
          className={`${styles.postContent} ${styles.shrunk}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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
                  return (
                    <Comment
                      key={com.id}
                      pageColour={
                        com.user_id === userId ? "#aaaa44" : "transparent"
                      }
                      username={com.username.slice(0, 10)}
                      date={com.date}
                      content={com.content}
                      avatar={com.avatar}
                    />
                  );
                }
              })}
            </div>
          </aside>

          <div>
            {content.map((item) => {
              switch (item.type) {
                case "Paragraph":
                  const paragraphItem: ParagraphItem = item as ParagraphItem;
                  return (
                    <p>
                      {paragraphItem.content.map((item2) => {
                        if (typeof item2 === "string") {
                          return item2;
                        } else {
                          switch (item2.type) {
                            case "FireText":
                              return <FireText text={item2.content} />;

                            case "EarthText":
                              return <EarthText text={item2.content} />;

                            case "ThunderText":
                              return <ThunderText text={item2.content} />;

                            case "IceText":
                              return <IceText text={item2.content} />;

                            case "MetalHeadText":
                              return <MetalHeadText text={item2.content} />;

                            case "RegexText":
                              return <RegexText text={item2.content} />;

                            case "TerrariaText":
                              return (
                                <TerrariaText
                                  text={item2.content}
                                  colour={item2.colour}
                                  dog={item2.dog}
                                  draedon={item2.draedon}
                                  moonlord={item2.moonlord}
                                  scal={item2.scal}
                                  yharim={item2.yharim}
                                />
                              );
                          }
                        }
                      })}
                    </p>
                  );
                case "Picture":
                  const pictureItem: PictureItem = item as PictureItem;
                  return <img src={pictureItem.imageSrc} alt="img" />;
                case "Html":
                  const htmlItem: HtmlItem = item as HtmlItem;
                  return (
                    <span
                      dangerouslySetInnerHTML={{ __html: htmlItem.content }}
                    ></span>
                  );
                default:
                  return <></>;
              }
            })}
          </div>
        </div>
      )}
    </article>
  );
}
