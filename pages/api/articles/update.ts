import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  console.log(req.body)

  if (process.env.EDIT) {
    fs.writeFileSync(`./articles/${req.body.jsonLocation}`, JSON.stringify(req.body.data, null, 2));
    res.status(200).json({ res: 'GOOD' })
  } else {
    res.status(403).json({ res: 'BAD' })
  }
}