import { defineType } from "sanity";

/**
 * Sanity type for the **Underline** component used in articles
 * @author ninjabattler
 */
export const underline = defineType({
  title: "Underline",
  name: "underline",
  type: "object",
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
