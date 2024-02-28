import { SchemaTypeDefinition } from "sanity";
import { TagsIcon } from "@sanity/icons";

const tag: SchemaTypeDefinition = {
  name: "tags",
  type: "document",
  title: "Tags",
  icon: TagsIcon,
  description: "desc",
  fields: [
    {
      name: "tag",
      type: "string",
      title: "Tag",
    },
  ],
};

export default tag;
