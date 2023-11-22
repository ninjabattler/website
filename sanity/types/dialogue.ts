import { defineType } from "sanity";

/**
 * Sanity type for the **Dialogue** component used in articles
 * @author ninjabattler
 */
export const dialogue = defineType({
  title: "Dialogue",
  name: "dialogue",
  type: "object",
  description: "A text box with a name/title and image, similar to text boxes in rpg's, used for longer quotes/disclaimers",
  fields: [
    {
      name: "dialogue",
      type: "text",
      title: "Dialogue",
      description: "The content of the box itself",
    },
    {
      name: "speaker",
      type: "string",
      title: "Speaker",
      description: "The title/speaker of the textbox",
    },
    {
      name: "portrait",
      type: "image",
      title: "Portrait",
      description: "The character portrait/img to display on the dialogue",
    },
    {
      name: "invert",
      type: "boolean",
      title: "Invert",
      initialValue: false,
      description: "Swaps the portrait/speaker to the right",
    }
  ]
});