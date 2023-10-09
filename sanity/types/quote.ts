import { defineType } from "sanity";

/**
 * Sanity type for the **Quote** component used in articles
 * @author ninjabattler
 */
export const quote = defineType({
  title: "Quote",
  name: "quote",
  type: "object",
  description: "A small banner, mainly used below images, to quote something or someone related to the article",
  fields: [
    {
      name: "quote",
      type: "string",
      title: "Quote"
    },
    {
      name: "source",
      type: "string",
      title: "Source",
      description: "The source that the quote originates from"
    }
  ]
});