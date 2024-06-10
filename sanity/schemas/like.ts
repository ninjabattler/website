import { SchemaTypeDefinition } from "sanity";
import { AddCircleIcon } from "@sanity/icons";

const like: SchemaTypeDefinition = {
  name: "like",
  type: "document",
  title: "Likes / Dislikes",
  icon: AddCircleIcon,
  description: "desc",
  fields: [
    {
      name: "userId",
      type: "reference",
      title: "User Id",
      to: [{ type: "user" }],
    },
    {
      name: "postId",
      type: "reference",
      title: "Post Id",
      to: [{ type: "post" }],
    },
    {
      name: "articleId",
      type: "reference",
      title: "Article Id",
      to: [{ type: "article" }],
    },
    {
      name: "isLike",
      type: "boolean",
      title: "Is Like",
    },
  ],
};

export default like;
