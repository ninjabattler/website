import { AnimTextItem, ArticleJson, ArticleList, ArticleListItem, CodeBlockItem, DialogueItem, ParagraphItem, PictureItem, QuoteItem, SpoilerItem, SubtitleCardItem, TitleCardItem } from '../types';

export const convertSpoilerItem = (spoilerItem: SpoilerItem): string => {
  const content = spoilerItem.content;
  const spoilerString = `<Spoiler text='${content}'/>`;

  return spoilerString;
}

export const convertAnimTextItem = (animTextItem: AnimTextItem): string => {
  const type = animTextItem.type;
  const content = animTextItem.content;
  const colour = animTextItem.colour ? `colour='${animTextItem.colour}'` : '';;
  const draedon = animTextItem.draedon ? 'draedon' : '';
  const yharim = animTextItem.yharim ? 'yharim' : '';
  const moonlord = animTextItem.moonlord ? 'moonlord' : '';
  const dog = animTextItem.dog ? 'dog' : '';

  const animTextString = `<${type} text='${content}' ${colour} ${draedon} ${yharim} ${moonlord} ${dog} />`;

  return animTextString;
}

export const convertParagraphItem = (paragraphItem: ParagraphItem): string => {
  let paragraphString = '';

  paragraphItem.content.forEach((contentItem) => {
    if (typeof contentItem === 'string') {
      paragraphString += contentItem;
    } else if (contentItem.type.includes('Text')) {
      paragraphString += convertAnimTextItem(contentItem as AnimTextItem);
    } else if (contentItem.type === 'Picture') {
      paragraphString += convertPictureItem(contentItem as PictureItem);
    } else if (contentItem.type === 'Spoiler') {
      paragraphString += convertSpoilerItem(contentItem as SpoilerItem);
    }
  })

  return `<Paragraph text="${paragraphString}" />`;
}

export const convertTitleCardItem = (titleCardItem: TitleCardItem): string => {
  const title = titleCardItem.title;
  const imageSrc = titleCardItem.imageSrc ? `imageSrc="${titleCardItem.imageSrc}"` : '';
  const pageColour = titleCardItem.pageColour || 'var(--article-colour)';
  const TitleCardString = `<TitleCard title="${title}" ${imageSrc} pageColour="${pageColour}" />`;

  return TitleCardString;
}

export const convertPictureItem = (pictureItem: PictureItem): string => {
  const imageSrc = pictureItem.imageSrc;
  const pageColour = pictureItem.pageColour || 'var(--article-colour)';
  const width =  pictureItem.width || false;
  const float =  pictureItem.float || false;
  const pictureString = `<Picture imageSrc='${imageSrc}' pageColour='${pageColour}' width='${width}' float='${float}' />`;

  return pictureString;
}

export const convertQuoteItem = (quoteItem: QuoteItem): string => {
  const quote = quoteItem.quote;
  const source = quoteItem.source;
  const quoteString = `<Quote quote="${quote}" source="${source}" />`;

  return quoteString;
}

export const convertList = (list: ArticleList): string => {
  let listString = '';

  list.items.forEach((listItem: ArticleListItem) => {
    const content = listItem.content;
    const imageSrc = listItem.imageSrc ? `imgSrc="${listItem.imageSrc}"` : '';
    const pageColour = listItem.pageColour || 'var(--article-colour)';

    listString += `<ListItem content="${content}" ${imageSrc} pageColour="${pageColour}" />`;
  })

  return `<ul>${listString}</ul>`;
}

export const convertCodeBlockItem = (codeBlockItem: CodeBlockItem): string => {
  const code = codeBlockItem.code;
  const language = codeBlockItem.language;
  const title = codeBlockItem.title ? `title="${codeBlockItem.title}"` : '';
  const highlight = codeBlockItem.highlight ? `highlight="${codeBlockItem.highlight}"` : '';
  const codeBlockString = `<CodeBlock code="${code}" language="${language}" ${highlight} ${title} />`;

  return codeBlockString;
}

export const convertSubtitleCardItem = (subtitleCardItem: SubtitleCardItem): string => {
  const title = subtitleCardItem.title;
  const imageSrc = subtitleCardItem.imageSrc ? `imageSrc="${subtitleCardItem.imageSrc}"` : '';
  const pageColour = subtitleCardItem.pageColour || 'var(--article-colour)';
  const lower = subtitleCardItem.lower ? 'lower' : '';
  const higher = subtitleCardItem.higher ? 'higher' : '';
  const smaller = subtitleCardItem.smaller ? 'smaller' : '';
  const extraSmaller = subtitleCardItem.extraSmaller ? 'extraSmaller' : '';
  const subtitleCardString = `<SubtitleCard title="${title}" ${imageSrc} pageColour="${pageColour}" ${lower} ${higher} ${smaller} ${extraSmaller} />`;

  return subtitleCardString;
}

export const convertDialogueItem = (dialogueItem: DialogueItem): string => {
  const speaker = dialogueItem.speaker;
  const content = dialogueItem.content;
  const imageSrc = dialogueItem.imageSrc ? `imageSrc="${dialogueItem.imageSrc}"` : '';
  const pageColour = dialogueItem.pageColour || 'var(--article-colour)';
  const dialogueString = `<Dialogue speaker="${speaker}" text="${content}" ${imageSrc} pageColour="${pageColour}" />`;

  return dialogueString;
}

export const parseJsonArticle = (articleJson: ArticleJson): string => {
  let articleString = '';

  articleJson.forEach((articleItem) => {
    switch (articleItem.type) {
      case 'Paragraph':
        articleString += convertParagraphItem(articleItem as ParagraphItem);
        break;

      case 'TitleCard':
        articleString += convertTitleCardItem(articleItem as TitleCardItem);
        break;

      case 'Picture':
        articleString += convertPictureItem(articleItem as PictureItem);
        break;

      case 'Quote':
        articleString += convertQuoteItem(articleItem as QuoteItem);
        break;

      case 'List':
        articleString += convertList(articleItem as ArticleList);
        break;

      case 'CodeBlock':
        articleString += convertCodeBlockItem(articleItem as CodeBlockItem);
        break;

      case 'SubtitleCard':
        articleString += convertSubtitleCardItem(articleItem as SubtitleCardItem);
        break;

      case 'Dialogue':
        articleString += convertDialogueItem(articleItem as DialogueItem);
        break;

      case 'Underline':
        articleString += '<Underline />';
        break;
    }
  });

  return articleString;
};