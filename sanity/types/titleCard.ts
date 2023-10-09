import { defineType } from "sanity";

/**
 * Sanity type for the **Title Card** component used in articles
 * @author ninjabattler
 */
export const titleCard = defineType({
  title: "Title Card",
  name: "titleCard",
  type: "object",
  description: "A large banner that optionally includes an image to display above the title, used mainly to denote a new section in an article",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "The title displayed on the title card"
    },
    {
      name: "banner",
      type: "image",
      title: "Banner",
      description: "The image that is displayed above the title on the card",
      options: [
        {
          name: "lowerImage",
          type: "boolean",
          title: "Lower Image",
          description: "Will lower the image to appear behind the title but not below the card itself"
        }
      ]
    },
  ]
});