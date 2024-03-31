import { defineType } from "sanity";

/**
 * Sanity type for the **FootnoteLink** component used in articles
 * @author ninjabattler
 */
export const footnoteLink = defineType({
  title: "Footnote Link",
  name: "footnoteLink",
  type: "object",
  description: "A link to a footnote on an article",
  fields: [
    {
      title: "Note Index",
      name: "noteIndex",
      type: "number",
    },
  ],
});
