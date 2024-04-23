import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('request at server: ');
  return res.status(200).json({
    title: 'Login OK',
    data: true,
    status: 'ok'
  })

}
