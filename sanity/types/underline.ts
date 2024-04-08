import { defineType } from "sanity";
import { UnderlineIcon } from "@sanity/icons";

/**
 * Sanity type for the **Underline** component used in articles
 * @author ninjabattler
 */
export const underline = defineType({
  title: "Underline",
  name: "underline",
  type: "object",
  icon: UnderlineIcon,
  description:
    "A large line used to seperate text into subsections without using a title or subtitle card",
  fields: [
    {
      title: "Content",
      name: "content",
      type: "string",
    },
  ],
});
