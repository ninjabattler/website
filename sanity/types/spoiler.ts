import { defineType } from "sanity";
import { StopIcon } from "@sanity/icons";

/**
 * Sanity type for the **Spoiler** component used in articles
 * @author ninjabattler
 */
export const spoiler = defineType({
  title: "Spoiler",
  name: "spoiler",
  type: "object",
  icon: StopIcon,
  description: "A line of text that is hidden until the user clicks on it",
  fields: [
    {
      title: "Content",
      name: "content",
      type: "string",
    },
  ],
});
