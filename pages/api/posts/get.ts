import { NextApiRequest, NextApiResponse } from "next";
import { getCachedClient } from "../../../sanity/lib/getClient";
import { groq } from "next-sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const id = req.query.id;

    const postQuery = await groq`*[_type == "post" && _id == "${id}"] {
      content[]{
        _type == "block" => {
          _type,
          style,
          _key,
          markDefs,
          children[]{
            _type,
            _type != "picture" => {
              marks,
              text,
              content,
            },
            _type == "picture" => {
              scale,
              float,
              source,
              sourceLink,
              image {
                "url": asset->url,
                "blur": asset->metadata.lqip,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height,
              }
            },
            _type == "footnoteLink" => {
              noteIndex
            }
          }
        },
        _type == "image" => {
          _type,
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        },
        _type == "picture" => {
          _type,
          scale,
          float,
          source,
          sourceLink,
          image {
            "url": asset->url,
            "blur": asset->metadata.lqip,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
          }
        }
      }
    }[0]`;

    const post = await getCachedClient()(postQuery);

    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error with preview or something");
  }
}
