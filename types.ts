import { TypedObject } from "sanity";

export type UserIdType = number;
export type PostIdType = number;
export type ColourType = string;
export type TitleType = string;
export type UrlType = string;
export type SqlDateType = string;
export type GenreType = string;
export type CategoryType = string;
export type ContentType = string;
export type CommentIdType = number;
export type WindowServerType = (Window & typeof globalThis) | { innerWidth?: number; location?: string; };
export type PostCommentType = CommentData & UserData & { formatteddate?: string };
export type IpType = string | null;
export type ArticleJsonItemType = string;
export type ArticleJsonItemContent = string;
export type ArticleJson = (ParagraphItem | TitleCardItem | PictureItem | QuoteItem | ArticleList | CodeBlockItem | DialogueItem | SubtitleCardItem | HtmlItem | SpoilerItem)[];

export interface Footnote {
  title: TitleType;
  link: UrlType;
}

export interface SpoilerItem extends ArticleJsonItem {
  type: "Spoiler";
  content: ArticleJsonItemContent;
}

export interface ArticleJsonItem {
  type: ArticleJsonItemType;
}

export interface AnimTextItem {
  type: 'FireText' | 'ThunderText' | 'IceText' | 'EarthText' | 'MetalHeadText' | 'RegexText' | 'TerrariaText';
  content: ArticleJsonItemContent
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
  type: 'Picture';
  imageSrc: UrlType;
  pageColour?: ColourType;
  width?: string;
  float?: 'left' | 'right';
}

export interface TitleCardItem extends ArticleJsonItem {
  title: TitleType;
  imageSrc?: UrlType;
  pageColour?: ColourType;
}

export interface ParagraphItem extends ArticleJsonItem {
  content: (ArticleJsonItemContent | AnimTextItem | PictureItem | SpoilerItem)[];
}

export interface AppData {
  setLinkClicked: Function;
}

export interface CommentData {
  id: CommentIdType;
  content: ContentType;
  date: SqlDateType;
  post_id: PostIdType;
  user_id: UserIdType;
  comment_id: CommentIdType;
}

export interface ArticleData {
  id: PostIdType;
  title: TitleType;
  thumbnail: UrlType;
  videoHeader: UrlType;
  date: SqlDateType;
  review: boolean;
  colors: {
    primary: {
      hex: ColourType
    },
    secondary: {
      hex: ColourType
    }
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
  // comments: CommentData[];
}

export interface UserData {
  id: number;
  ip: string | null;
  username: string;
  avatar: number;
}

export interface SanityImage {
  url: string;
  blur: string;
  width: number;
  height: number;
  alt: string;
}