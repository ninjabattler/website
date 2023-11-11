import { defineType } from "sanity";

/**
 * Sanity type for the **Code Block** component used in articles
 * @author ninjabattler
 */
export const codeBlock = defineType({
  title: "Code Block",
  name: "codeBlock",
  type: "object",
  description: "A block used to display and style a bunch of code",
  fields: [
    {
      name: "code",
      type: "string",
      title: "Code",
      description: "The code..."
    },
    {
      name: "language",
      type: "string",
      title: "Language",
      description: "The language used to display the code's format"
    },
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "An optional title to display on the code block"
    }
  ]
});