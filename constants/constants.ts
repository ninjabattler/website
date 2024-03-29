import {
  FormatListBulleted,
  FormatListNumbered,
  FormatBold,
  FormatItalic,
  FormatQuote,
} from "@mui/icons-material";

export const COMMENT_STYLING_OPTIONS = [
  {
    prependMark: "**",
    appendMark: "**",
    svg: FormatBold,
    title: "Bold",
  },
  {
    prependMark: "_",
    appendMark: "_",
    svg: FormatItalic,
    title: "Italic",
  },
  {
    prependMark: ">",
    appendMark: "",
    svg: FormatQuote,
    title: "Blockquote",
  },
  {
    prependMark: "- ",
    appendMark: "",
    svg: FormatListBulleted,
    title: "Unordered List",
  },
  {
    prependMark: "1. ",
    appendMark: "",
    svg: FormatListNumbered,
    title: "Ordered List",
  },
];

export const DEFAULT_SLATE_VALUE = [
  {
    children: [
      {
        text: "",
      },
    ],
  },
];
