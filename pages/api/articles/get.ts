import { NextApiRequest, NextApiResponse } from "next";
import { getCachedClient } from "../../../sanity/lib/getClient";
import { searchArticlesQuery } from "../../../sanity/lib/queries";
import { SanityArticlesSearchResult } from "../../../types";

/**
 * Searches all articles with a tag and search query and returns the results
 * @author Ninjabattler
 * @param searchQuery The query to search the article titles with
 * @param tagsQuery The query to search the article tags with
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const searchQuery: string | string[] | undefined = req.query.searchQuery;
      const tagsQuery: string | string[] | undefined = req.query.tagsQuery;

      // Check the input
      if (searchQuery === undefined) {
        return res.status(400).send("Missing searchQuery");
      }

      if (tagsQuery === undefined) {
        return res.status(400).send("Missing tagsQuery");
      }

      if (typeof searchQuery !== "string") {
        return res.status(400).send("Wrong type for searchQuery");
      }

      if (typeof tagsQuery !== "string") {
        return res.status(400).send("Wrong type for tagsQuery");
      }

      // Grab and send the articles
      const articles: SanityArticlesSearchResult = await getCachedClient()(
        searchArticlesQuery(
          searchQuery.toLowerCase(),
          tagsQuery ? tagsQuery.split(",") : [],
        ),
      );

      res.status(200).send(articles);
    } catch (err) {
      console.log(err);

      return res.status(500).send("Failed to get articles");
    }
  } else {
    return res.status(405).send("");
  }
}
