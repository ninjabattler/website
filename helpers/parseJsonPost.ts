import { AnimTextItem, ArticleJson, HtmlItem, ParagraphItem, PictureItem, } from '../types';

export const convertAnimTextItem = (animTextItem: AnimTextItem): string => {
  const type = animTextItem.type;
  const content = animTextItem.content;
  const colour = animTextItem.colour ? `colour='${animTextItem.colour}'` : '';;
  const draedon = animTextItem.draedon ? 'draedon' : '';
  const yharim = animTextItem.yharim ? 'yharim' : '';
  const moonlord = animTextItem.moonlord ? 'moonlord' : '';

  const animTextString = `<${type} text='${content}' ${colour} ${draedon} ${yharim} ${moonlord} />`;

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
    }
  })

  return `<p>${paragraphString}</p>`;
}

export const convertPictureItem = (pictureItem: PictureItem): string => {
  const imageSrc = pictureItem.imageSrc;
  const pictureString = `<img src='${imageSrc}' />`;

  return pictureString;
}

export const convertHtmlItem = (paragraphItem: HtmlItem): string => {
  return paragraphItem.content;
}

export const parseJsonPost = (postJson: ArticleJson): string => {
  let articleString = '';

  postJson.forEach((articleItem) => {
    switch (articleItem.type) {
      case 'Paragraph':
        articleString += convertParagraphItem(articleItem as ParagraphItem);
        break;

      case 'Html':
        articleString += convertHtmlItem(articleItem as HtmlItem);
        break;

      case 'Picture':
        articleString += convertPictureItem(articleItem as PictureItem);
        break;
    }
  });

  return articleString;
};