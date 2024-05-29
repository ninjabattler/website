import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../sanity/lib/client";

/**
 * Creates a new public userDetails document in santiy for a new user
 * @author Ninjabattler
 * @param userId The id of the user who commented
 * @param username The public name of the new user
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === "POST") {
    try {
      const userId: string | undefined = req.body.userId;
      const username: string | undefined = req.body.username;

      // Check the inputs
      if (userId === undefined) {
        return res.status(400).send("Missing userId");
      }

      if (username === undefined) {
        return res.status(400).send("Missing username");
      }

      // Create and send the new user's details
      const newUserDetails = await client.create({
        _type: "userDetails",
        userId: { _ref: userId },
        username,
      });

      res.status(200).send(newUserDetails);
    } catch (err) {
      console.error(err);

      return res.status(500).send("Failed to create a new userDetails");
    }
  } else {
    return res.status(405).send("");
  }
}
