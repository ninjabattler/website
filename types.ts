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
  video_header: UrlType;
  date: SqlDateType;
  review: boolean;
  colour: ColourType;
  content: ContentType;
  category: CategoryType;
  genre: GenreType;
  narration: UrlType;
  description: string;
}

export interface PostData extends ArticleData {
  comments: CommentData[];
}