import { defineType } from "sanity";
import { UlistIcon } from "@sanity/icons";

/**
 * Sanity type for the **List Item** component used in articles
 * @author ninjabattler
 */
export const listItem = defineType({
  title: "List Item",
  name: "listItem",
  type: "object",
  icon: UlistIcon,
  description:
    "A item for use in unordered lists with an option to add a custom image",
  fields: [
    {
      name: "text",
      type: "string",
      title: "Text",
      description: "The content of the list item",
    },
    {
      name: "icon",
      type: "image",
      title: "Icon",
      description: "An optional icon to overide the default icon",
    },
  ],
});
