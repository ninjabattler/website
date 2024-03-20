import React, { FC } from "react";
import { PortableText } from "@portabletext/react";
import Paragraph from "../Paragraph/Paragraph";
import Picture from "../Picture/Picture";
import Quote from "../Quote/Quote";
import TitleCard from "../TitleCard/TitleCard";
import Underline from "../Underline/Underline";
import Dialogue from "../Dialogue/Dialogue";
import SubtitleCard from "../SubtitleCard/SubtitleCard";
import ListItem from "../ListItem/ListItem";
import dynamic from "next/dynamic";
const CodeBlock = dynamic(() => import("../CodeBlock/CodeBlock"), {
  loading: () => <></>,
});

type ArticleContentProps = {
  content: any[];
};

/**
 * The main content of the article, rendered using the PortableText component, and custom components for specific sanity blocks
 * @author Ninjabattler
 * @param content The article content retrieved from sanity
 */
const ArticleContent: FC<ArticleContentProps> = ({ content }) => {
  return (
    <div>
      <PortableText
        value={content}
        components={{
          types: {
            block: ({ value }) => {
              return <Paragraph content={value} />;
            },
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
            quote: ({ value, index }) => {
              const typeAbove = content[index - 1]._type;
              const mergeAbove = typeAbove === "titleCard";

              return (
                <Quote
                  quote={value.quote}
                  source={value.source}
                  mergeAbove={mergeAbove}
                />
              );
            },
            titleCard: ({ value, index }) => {
              const typeBelow = content[index + 1]._type;
              const coverBelow = typeBelow === "quote";

              return (
                <TitleCard
                  title={value.title}
                  image={value.banner}
                  coverBelow={coverBelow}
                />
              );
            },
            underline: () => {
              return <Underline />;
            },
            dialogue: ({ value }) => {
              return (
                <Dialogue
                  speaker={value.speaker}
                  text={value.dialogue}
                  image={value.portrait}
                  invert={value.invert}
                />
              );
            },
            subtitleCard: ({ value }) => {
              return <SubtitleCard title={value.title} image={value.banner} />;
            },
            listItem: ({ value }) => {
              return (
                <ListItem
                  content={value.text}
                  image={value.icon ? value.icon.url : ""}
                />
              );
            },
            codeBlock: ({ value }) => {
              return (
                <CodeBlock
                  code={value.code}
                  language={value.language}
                  title={value.title}
                />
              );
            },
          },
        }}
      />
    </div>
  );
};

export default ArticleContent;
