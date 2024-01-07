import {
  AnimTextItem,
  ArticleJson,
  ArticleList,
  ArticleListItem,
  CodeBlockItem,
  DialogueItem,
  ParagraphItem,
  PictureItem,
  QuoteItem,
  SpoilerItem,
  SubtitleCardItem,
  TitleCardItem,
} from "../types";

export const convertParagraphItem = (paragraphItem: ParagraphItem): string => {
  let paragraphString = "";

  paragraphItem.content.forEach((contentItem) => {
    if (typeof contentItem === "string") {
      paragraphString += contentItem
        .replace(/\<\w*\>/g, "")
        .replace(/\<\/\w*\>/g, "");
    } else if (
      contentItem.type.includes("Text") &&
      contentItem.type !== "Picture"
    ) {
      paragraphString += contentItem.content;
    } else if (contentItem.type === "Spoiler") {
      paragraphString += contentItem.content;
    }
  });

  return `${paragraphString}\n\n`;
};

export const convertTitleCardItem = (
  titleCardItem: TitleCardItem | SubtitleCardItem,
): string => {
  const title = titleCardItem.title;

  return `${title}\n\n`;
};

export const convertList = (list: ArticleList): string => {
  let listString = "";

  list.items.forEach((listItem: ArticleListItem) => {
    const content = listItem.content;
    listString += `${content}\n\n`;
  });

  return listString;
};

export const convertDialogueItem = (dialogueItem: DialogueItem): string => {
  const content = dialogueItem.content;

  return `Quote, ${content} Unquote.\n\n`;
};

export const articleToNarration = (articleJson: ArticleJson): string => {
  let narrationString = "";

  articleJson.forEach((articleItem) => {
    switch (articleItem.type) {
      case "Paragraph":
        narrationString += convertParagraphItem(articleItem as ParagraphItem);
        break;

      case "TitleCard":
        narrationString += convertTitleCardItem(articleItem as TitleCardItem);
        break;

      case "List":
        narrationString += convertList(articleItem as ArticleList);
        break;

      case "SubtitleCard":
        narrationString += convertTitleCardItem(
          articleItem as SubtitleCardItem,
        );
        break;

      case "Dialogue":
        narrationString += convertDialogueItem(articleItem as DialogueItem);
        break;
    }
  });

  return narrationString;
};
