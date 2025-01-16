import { TypedObject } from "sanity";
import { Object3DEventMap, Sprite } from "three";

declare global {
  type ColourHexCode =
    `#${number}${number}${number}${number}${number}${number}`;
  type WindowServerType =
    | (Window & typeof globalThis)
    | { innerWidth?: number; location?: string };
  type PictureFloat = "Left" | "Right";

  type Footnote = {
    title: string;
    source: string;
  };

  type AppData = {
    setLinkClicked: Function;
  };

  type CommentData = {
    _id: string;
    content: string;
    _createdAt: string;
    post_id: string;
    user: UserData;
    byCurrentUser: boolean;
  };

  type ArticleData = {
    _id: string;
    title: string;
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
    videoHeader: string;
    date: SqlDateType;
    tags: string[];
    review: boolean;
    colors: {
      primary: {
        hex: ColourHexCode;
      };
      secondary: {
        hex: ColourHexCode;
      };
      space: {
        hex: ColourHexCode;
      };
      stars: {
        hex: ColourHexCode;
      };
    };
    content: TypedObject[];
    category: CategoryType;
    genre: GenreType;
    narration: string;
    description: string;
    formatteddate?: string;
    liked?: boolean;
    disliked?: boolean;
    likes?: number;
    dislikes?: number;
    comments?: PostCommentType[];
    footnotes?: Footnote[];
  };

  type UserData = {
    _id: string;
    name: string;
    avatar: number;
  };

  type SanityImage = {
    url: string;
    blur: string;
    width: number;
    height: number;
    alt: string;
  };

  type SanityColors = {
    primary: ColourHexCode;
    secondary: ColourHexCode;
    space: ColourHexCode;
    stars: ColourHexCode;
  };

  type SanityArticlesSearchResult = {
    title: string;
    slug: string;
    date: string;
    thumbnail: SanityImage;
    comments: number;
    likes: number;
    dislikes: number;
    tags: string[];
    colors: SanityColors;
    hidden?: boolean;
  };

  type SanityPostsResult = {
    _id: string;
    title: string;
    date: string;
    comments: number;
    index: number;
    hidden?: boolean;
    likes: number;
    dislikes: number;
  };

  type ThreeJSBackgroundAsteroids = {
    rotationSpeed: number;
    asteroid: Sprite<Object3DEventMap>;
  }[];

  type ThreeJSBackgroundStars = {
    scaleUp: boolean;
    scaleSpeed: number;
    star: Sprite<Object3DEventMap>;
  }[];

  type XYZCoordinates = {
    x?: number;
    y?: number;
    z?: number;
  };
}
