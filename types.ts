import { TypedObject } from "sanity";

export type UserIdType = number;
export type PostIdType = string;
export type ColourType = string;
export type TitleType = string;
export type UrlType = string;
export type SqlDateType = string;
export type GenreType = string;
export type CategoryType = string;
export type ContentType = string;
export type CommentIdType = number;
export type WindowServerType =
  | (Window & typeof globalThis)
  | { innerWidth?: number; location?: string };
export type PostCommentType = CommentData;
export type IpType = string | null;
export type ArticleJsonItemType = string;
export type ArticleJsonItemContent = string;
export type ArticleJson = (
  | ParagraphItem
  | TitleCardItem
  | PictureItem
  | QuoteItem
  | ArticleList
  | CodeBlockItem
  | DialogueItem
  | SubtitleCardItem
  | HtmlItem
  | SpoilerItem
)[];
export type PictureFloat = "Left" | "Right";

export interface Footnote {
  title: TitleType;
  source: UrlType;
}

export interface SpoilerItem extends ArticleJsonItem {
  type: "Spoiler";
  content: ArticleJsonItemContent;
}

export interface ArticleJsonItem {
  type: ArticleJsonItemType;
}

export interface AnimTextItem {
  type:
    | "FireText"
    | "ThunderText"
    | "IceText"
    | "EarthText"
    | "MetalHeadText"
    | "RegexText"
    | "TerrariaText";
  content: ArticleJsonItemContent;
  colour?: ColourType;
  draedon?: boolean;
  yharim?: boolean;
  moonlord?: boolean;
  dog?: boolean;
  scal?: boolean;
}

export interface HtmlItem extends ArticleJsonItem {
  content: ArticleJsonItemContent;
}

export interface DialogueItem extends ArticleJsonItem {
  speaker: ArticleJsonItemContent;
  content: ArticleJsonItemContent;
  imageSrc?: UrlType;
  pageColour?: ColourType;
}

export interface SubtitleCardItem extends ArticleJsonItem {
  title: TitleType;
  imageSrc?: UrlType;
  pageColour?: ColourType;
  lower?: boolean;
  higher?: boolean;
  smaller?: boolean;
  extraSmaller?: boolean;
}

export interface CodeBlockItem extends ArticleJsonItem {
  code: string;
  language: string;
  highlight?: string;
  title?: string;
}

export interface ArticleList extends ArticleJsonItem {
  items: ArticleListItem[];
}

export interface ArticleListItem {
  imageSrc?: UrlType;
  content: ArticleJsonItemContent;
  pageColour?: ColourType;
}

export interface QuoteItem extends ArticleJsonItem {
  quote: ArticleJsonItemContent;
  source: ArticleJsonItemContent;
}

export interface PictureItem extends ArticleJsonItem {
  type: "Picture";
  imageSrc: UrlType;
  pageColour?: ColourType;
  width?: string;
  float?: "left" | "right";
}

export interface TitleCardItem extends ArticleJsonItem {
  title: TitleType;
  imageSrc?: UrlType;
  pageColour?: ColourType;
}

export interface ParagraphItem extends ArticleJsonItem {
  content: (
    | ArticleJsonItemContent
    | AnimTextItem
    | PictureItem
    | SpoilerItem
  )[];
}

export interface AppData {
  setLinkClicked: Function;
}

export interface CommentData {
  _id: CommentIdType;
  content: ContentType;
  _createdAt: string;
  post_id: PostIdType;
  user: UserData;
  byCurrentUser: boolean;
}

export interface ArticleData {
  id: PostIdType;
  _id: PostIdType;
  title: TitleType;
  slug: string;
  _updatedAt: string;
  isLiked: boolean;
  isDisliked: boolean;
  thumbnail: {
    url: string;
    width: number;
    height: number;
    blur: string;
    alt: string;
  };
  videoHeader: UrlType;
  date: SqlDateType;
  tags: string[];
  review: boolean;
  colors: {
    primary: {
      hex: ColourType;
    };
    secondary: {
      hex: ColourType;
    };
    space: {
      hex: ColourType;
    };
    stars: {
      hex: ColourType;
    };
  };
  content: TypedObject[];
  category: CategoryType;
  genre: GenreType;
  narration: UrlType;
  description: string;
  formatteddate?: string;
  liked?: boolean;
  disliked?: boolean;
  likes?: number;
  dislikes?: number;
  comments?: PostCommentType[];
  footnotes?: Footnote[];
}

export interface PostData extends ArticleData {
  _id: PostIdType;
  // comments: CommentData[];
}

export interface UserData {
  _id: string;
  name: string;
  avatar: number;
}

export interface SanityImage {
  url: string;
  blur: string;
  width: number;
  height: number;
  alt: string;
}

export type SanityColors = {
  primary: string;
  secondary: string;
  space: string;
  stars: string;
};

export type SanityArticlesSearchResult = {
  title: string;
  slug: string;
  date: string;
  thumbnail: SanityImage;
  comments: number;
  likes: number;
  dislikes: number;
  tags: string[];
  colors: SanityColors;
};

export type SanityPostsResult = {
  _id: PostIdType;
  title: TitleType;
  date: string;
  comments: number;
  index: number;
  hidden?: boolean;
  likes: number;
  dislikes: number;
};
