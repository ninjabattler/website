import React, { FC } from "react";
import styles from "./Paragraph.module.scss";
import Picture from "../Picture/Picture";
import Spoiler from "../Spoiler/Spoiler";
import { PortableText } from "@portabletext/react";
import FootnoteLink from "../FootnoteLink/FootnoteLink";

type ParagraphProps = {
  content: Array<any>;
};

/**
 * A paragraph that is rendered using sanity's portable text
 * @author Ninjabattler
 * @param text The text
 */
const Paragraph: FC<ParagraphProps> = ({ content }) => (
  <div className={styles.paragraph}>
    <PortableText
      value={content}
      components={{
        types: {
          picture: ({ value }) => {
            return (
              <Picture
                picture={value.image}
                width={value.scale}
                float={value.float}
                source={value.source}
                sourceLink={value.sourceLink}
              />
            );
          },
          spoiler: ({ value }) => {
            return <Spoiler text={value.content} />;
          },
          footnoteLink: ({ value }) => {
            return <FootnoteLink note={value.noteIndex} />;
          },
        },
      }}
    />
  </div>
);

export default Paragraph;
