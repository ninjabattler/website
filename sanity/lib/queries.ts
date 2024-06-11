import { groq } from "next-sanity";

/**
 * Queries a single post from sanity, with and opional userId to return user specific data
 * @author Ninjabattler
 * @param postId The id of the post to fetch
 * @param userId The id of the user who's data relates to the post, comments, likes etc.
 */
export const getPostQuery = (postId: string, userId?: string): string => {
  return groq`*[_type == "post" && _id == "${postId}"] {
    _id,
    title,
    date,
    content[]{
      _type == "block" => {
        _type,
        style,
        _key,
        markDefs,
        children[]{
          _type,
          _type != "picture" => {
            marks,
            text,
            content,
          },
          _type == "picture" => {
            scale,
            float,
            source,
            sourceLink,
            image {
              "url": asset->url,
              "blur": asset->metadata.lqip,
              "width": asset->metadata.dimensions.width,
              "height": asset->metadata.dimensions.height,
            }
          },
          _type == "footnoteLink" => {
            noteIndex
          }
        }
      },
      _type == "image" => {
        _type,
        "url": asset->url,
        "blur": asset->metadata.lqip,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
      },
      _type == "picture" => {
        _type,
        scale,
        float,
        source,
        sourceLink,
        image {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      }
    },
    "comments": *[_type == "comment" && references(^._id)] | order(_createdAt desc) {
      _createdAt,
      content,
      "byCurrentUser": references("${userId}"),
      "user": *[_type == "userDetails" && references(^.userId._ref)] {
        name
      }[0]
    },
    "likes": count(*[_type == "like" && references(^._id) && isLike == true]),
    "dislikes": count(*[_type == "like" && references(^._id) && isLike == false]),
    "isLiked": count(*[_type == "like" && references(^._id) && references("${userId}") && isLike == true]) > 0,
    "isDisliked": count(*[_type == "like" && references(^._id) && references("${userId}") && isLike == false]) > 0
  }[0]`;
};

/**
 * Queries all posts, as well as their number of likes, dislikes and comments
 * @author Ninjabattler
 */
export const getAllPostsQuery = (): string => {
  return groq`*[_type == "post"] | order(date desc){
    _id,
    title,
    date,
    "comments":count( *[_type == "comment" && references(^._id)]),
    "likes": count(*[_type == "like" && references(^._id) && isLike == true]),
    "dislikes": count(*[_type == "like" && references(^._id) && isLike == false]),
  }`;
};

/**
 * Queries a single article from sanity
 * @author Ninjabattler
 * @param slug The url slug of the article to grab
 * @param userId The id of the user who's data relates to the article, comments, likes etc.
 */
export const getArticleQuery = (slug: string, userId?: string): string => {
  return groq`*[_type == "article" && slug == "${slug}"] | order(date.start asc){
    _id,
    title,
    date,
    narration,
    videoHeader,
    thumbnail {
      "url": asset->url,
      "blur": asset->metadata.lqip,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
    },
    colors,
    "tags": tags[] -> tag,
    footnotes[]{
        title,
        source
    },
    "comments": *[_type == "comment" && references(^._id)] | order(_createdAt desc) {
      _createdAt,
      content,
      "byCurrentUser": references("${userId}"),
      "user": *[_type == "userDetails" && references(^.userId._ref)] {
        name
      }[0]
    },
    "likes": count(*[_type == "like" && references(^._id) && isLike == true]),
    "dislikes": count(*[_type == "like" && references(^._id) && isLike == false]),
    "isLiked": count(*[_type == "like" && references(^._id) && references("${userId}") && isLike == true]) > 0,
    "isDisliked": count(*[_type == "like" && references(^._id) && references("${userId}") && isLike == false]) > 0,
    content[]{
      _type == "block" => {
        _type,
        style,
        _key,
        markDefs,
        children[]{
          _type,
          _type != "picture" => {
            marks,
            text,
            content,
          },
          _type == "picture" => {
            scale,
            float,
            source,
            sourceLink,
            image {
              "url": asset->url,
              "blur": asset->metadata.lqip,
              "width": asset->metadata.dimensions.width,
              "height": asset->metadata.dimensions.height,
            }
          },
          _type == "footnoteLink" => {
            noteIndex
          }
        }
      },
      _type == "titleCard" => {
        _type,
        title,
        banner {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      },
      _type == "image" => {
        _type,
        "url": asset->url,
        "blur": asset->metadata.lqip,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
      },
      _type == "quote" => {
        _type,
        quote,
        source
      },
      _type == "underline" => {
        _type
      },
      _type == "dialogue" => {
        _type,
        speaker,
        dialogue,
        invert,
        portrait {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      },
      _type == "subtitleCard" => {
        _type,
        title,
        banner {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      },
      _type == "listItem" => {
        _type,
        text,
        icon {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      },
      _type == "codeBlock" => {
        _type,
        code,
        language,
        title
      },
      _type == "picture" => {
        _type,
        scale,
        float,
        source,
        sourceLink,
        image {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      }
    }
  }[0]`;
};

/**
 * Queries the most recent posts posts, as well as their number of likes, dislikes and comments
 * @author Ninjabattler
 */
export const getMostRecentArticlesQuery = (): string => {
  return groq`*[_type == "article"] | order(date desc){
    _id,
    title,
    slug,
    date,
    colors,
    "tags": tags[] -> tag,
    thumbnail {
      "url": asset->url,
      "blur": asset->metadata.lqip,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
    },
    "comments":count( *[_type == "comment" && references(^._id)]),
    "likes": count(*[_type == "like" && references(^._id) && isLike == true]),
    "dislikes": count(*[_type == "like" && references(^._id) && isLike == false])
  }[0...5]`;
};

/**
 * Queries all articles with a search query for the titles and optionally tags
 * @author Ninjabattler
 * @param search The search query to perform on the article titles
 */
export const searchArticlesQuery = (
  search: string,
  tags?: string[],
): string => {
  let tagsFilter = "";

  if (tags)
    [
      (tagsFilter = tags
        .map((tag) => {
          return `"${tag}" in tags`;
        })
        .join(" && ")),
    ];

  return groq`*[_type == "article" ${search && `&& lower(title) match "*${search}*"`}] | order(date desc){
    _id,
    title,
    slug,
    date,
    colors,
    "tags": tags[] -> tag,
    thumbnail {
      "url": asset->url,
      "blur": asset->metadata.lqip,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
    },
    "comments":count( *[_type == "comment" && references(^._id)]),
    "likes": count(*[_type == "like" && references(^._id) && isLike == true]),
    "dislikes": count(*[_type == "like" && references(^._id) && isLike == false])
  }[${tagsFilter}]`;
};

/**
 * Queries all posts, as well as their number of likes, dislikes and comments
 * @author Ninjabattler
 */
export const getSitemapDataQuery = (): string => {
  return groq`*[_type == "article"] | order(date desc){
    _id,
    slug,
    _updatedAt
  }`;
};

/**
 * Grabs all a user's likes/dislikes on a post
 * @author Ninjabattler
 * @param postId The id of the post tht was liked/disliked
 * @param articleId The id of the article tht was liked/disliked
 * @param userId The id of the user who liked/disliked the post
 */
export const getPostLikesQuery = (
  postId: string,
  articleId: string,
  userId: string,
): string => {
  return groq`*[_type == 'like' && (references("${postId}") || references("${articleId}")) && references("${userId}")]`;
};

/**
 * Queries the most recent posts posts, as well as their number of likes, dislikes and comments
 * @author Ninjabattler
 */
export const getAllTags = (): string => {
  return groq`*[_type == "tags"] | order(tag desc){
    tag
  }`;
};
