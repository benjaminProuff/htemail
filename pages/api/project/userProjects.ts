// pages/api/userPosts.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const getUserPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.query;

  if (!user || typeof user !== "string") {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const postCount = await prisma.post.count({
      where: {
        author: {
          email: user,
        },
        published: true, // Assuming your post model has a `status` field to denote active posts
      },
    });

    return res.status(200).json({ postCount });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getUserPosts;
