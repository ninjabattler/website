import { SchemaTypeDefinition } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

const article: SchemaTypeDefinition = {
  name: "article",
  type: "document",
  title: "Articles",
  icon: DocumentTextIcon,
  description: "desc",
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
      name: "slug",
      type: "string",
      title: "Slug",
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [
        {
          type: "reference",
          to: [{ type: "tags" }],
        },
      ],
    },
    {
      name: "videoHeader",
      type: "string",
      title: "Video Header",
    },
    {
      name: "thumbnail",
      type: "image",
      title: "Thumbnail",
    },
    {
      name: "colors",
      type: "object",
      title: "Colors",
      fields: [
        {
          name: "primary",
          type: "color",
          title: "Primary",
        },
        {
          name: "secondary",
          type: "color",
          title: "Secondary",
        },
        {
          name: "space",
          type: "color",
          title: "Space",
        },
        {
          name: "stars",
          type: "color",
          title: "Stars",
        },
      ],
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

export default article;
