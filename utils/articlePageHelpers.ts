export const styleText = (text: string): string => {
  const boldPattern = new RegExp("(\\*{2}|_{2})(.*)(\\*{2}|_{2})", "g");
  const italicPattern = new RegExp("(\\*|_)(.*)(\\*|_)", "g");
  const listPattern = new RegExp("^-(.*)$", "gm");
  const numberedListPattern = new RegExp("^([0-9]*\\.)(.*)$", "gm");
  const blockQuotePattern = new RegExp("(^>)(.*)$", "gm");

  let styledText: string = text.replace(/<\/?[a-zA-Z0-9]*>/g, "");
  styledText = styledText.replace(boldPattern, "<b>$2</b>");
  styledText = styledText.replace(italicPattern, "<i>$2</i>");
  styledText = styledText.replace(blockQuotePattern, "<p blockquote>$2</p>");
  styledText = styledText.replace(listPattern, "<li><b>•</b>$1</li>");
  styledText = styledText.replace(numberedListPattern, "<li><b>$1</b>$2</li>");
  styledText = styledText.replace(/\n/g, "<br />");

  return `${styledText}`;
};

export const getTokenLength = (
  token: string | { content: string | string[] },
): number => {
  if (typeof token === "string") {
    return token.length;
  } else if (typeof token.content === "string") {
    return token.content.length;
  } else {
    return token.content.reduce((l, t) => l + getTokenLength(t), 0);
  }
};
