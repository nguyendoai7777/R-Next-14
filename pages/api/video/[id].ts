import { NextApiRequest, NextApiResponse } from "next";

export default async function handler({query, method}: NextApiRequest, res: NextApiResponse) {
  console.log(`/api/video/${query.id} with method = ${method}`);
  return res.status(200).json({
    title: 'Phim Hài Mới Nhất 2022 | PHÚ ÔNG LĂNG NHĂNG | Hài Dân Gian 2022 Hay Nhất',
    data: true,
    status: 'ok'
  })

}
 