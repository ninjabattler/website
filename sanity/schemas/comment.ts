import { SchemaTypeDefinition } from "sanity";
import { CommentIcon } from "@sanity/icons";

const comment: SchemaTypeDefinition = {
  name: "comment",
  type: "document",
  title: "Comments",
  icon: CommentIcon,
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
      name: "content",
      type: "string",
      title: "Content",
    },
    {
      name: "deleted",
      type: "boolean",
      title: "Deleted",
      initialValue: false,
    },
  ],
};

export default comment;
