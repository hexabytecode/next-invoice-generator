import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const data = { message: "Hello from serverside function" };
  res.status(200).json(data);
}
