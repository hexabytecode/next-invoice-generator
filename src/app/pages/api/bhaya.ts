import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Your AWS Lambda-like logic here
  const data = { message: "Hello from Lambda-like function!" };

  res.status(200).json(data);
}
