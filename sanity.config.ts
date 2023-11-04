/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/pages/studio/[[...index]].tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'
import { colorInput } from '@sanity/color-input'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    deskTool(),
    colorInput(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    productionUrl: async (prev, context) => {
      // context includes the client and other details
      const { getClient, dataset, document } = context;
      const client = getClient({ apiVersion: "2023-05-31" });

      if (document._type === "article") {
        const slug = await client.fetch(
          `*[_type == 'article' && _id == $projectId][0].slug`,
          { projectId: document._id },
        );

        const params = new URLSearchParams();
        params.set("preview", "true");
        params.set("dataset", dataset);

        return `/api/preview?url=${process.env.NEXT_PUBLIC_HOST}/articles/${slug}`;
      }

      return prev;
    },
  },
})
