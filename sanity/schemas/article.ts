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
      name: "slug",
      type: "string",
      title: "Slug",
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
        }
      ]
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: 'block'
        },
        {
          type: 'titleCard'
        },
        {
          type: 'image'
        },
        {
          type: 'quote'
        },
        {
          type: 'underline'
        }
      ]
    }
  ]
};

export default article;
