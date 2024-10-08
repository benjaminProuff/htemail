import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content, type } = req.body;
  delete req.body;
  const session = await getSession({ req });

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
      type: type,
    },
  });
  res.json(result);
  console.log(res.json(result));
}
