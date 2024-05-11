import { SchemaTypeDefinition } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

const post: SchemaTypeDefinition = {
  name: "post",
  type: "document",
  title: "Posts",
  icon: DocumentTextIcon,
  description: "desc",
  preview: {
    select: {
      title: "title",
    },
  },
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "date",
      type: "date",
      title: "Date",
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
          of: [
            {
              name: "picture",
              type: "picture",
              title: "Inline Picture",
            },
            {
              name: "spoiler",
              type: "spoiler",
            },
            {
              name: "footnoteLink",
              type: "footnoteLink",
              title: "Footnote Link",
            },
          ],
        },
        {
          type: "titleCard",
        },
        {
          type: "picture",
        },
        {
          type: "quote",
        },
        {
          type: "underline",
        },
        {
          type: "dialogue",
        },
        {
          type: "subtitleCard",
        },
        {
          type: "listItem",
        },
        {
          type: "codeBlock",
        },
      ],
    },
  ],
};

export default post;
