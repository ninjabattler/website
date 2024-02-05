import React, { FC } from "react";
import styles from "./Paragraph.module.scss";
import Picture from "../Picture/Picture";
import Spoiler from "../Spoiler/Spoiler";
import { PortableText } from "@portabletext/react";

type ParagraphProps = {
  content: Array<any>;
};

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
        },
      }}
    />
  </div>
);

export default Paragraph;
