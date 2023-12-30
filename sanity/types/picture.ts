import { defineType } from "sanity";

/**
 * Sanity type for the **Picture** component used in articles
 * @author ninjabattler
 */
export const picture = defineType({
  title: "Picture",
  name: "picture",
  type: "object",
  description: "A picture that can be positioned and scaled for an article",
  fields: [
    {
      name: "image",
      type: "image",
      title: "Image",
      description: ""
    },
    {
      name: "source",
      type: "string",
      title: "Source",
      description: "The name of the image's source"
    },
    {
      name: "sourceLink",
      type: "string",
      title: "Source Link",
      description: "A link to the image's source"
    },
    {
      name: "scale",
      type: "number",
      title: "Scale",
      description: "An optional percent scale to give to the image",
      initialValue: 100,
      validation: Rule => Rule.min(0).max(100)
    },
    {
      name: "float",
      type: "string",
      title: "Float",
      description: "How the image should float when it's shrunk",
      initialValue: 'Left',
      options: {
        list: [
          'Left',
          'Right'
        ],
        layout: 'radio'
      }
    },
  ]
});