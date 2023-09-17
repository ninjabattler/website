import { SchemaTypeDefinition } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

const Article: SchemaTypeDefinition = {
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
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: 'block'
        }
      ]
    }
  ]
};

export default Article;
