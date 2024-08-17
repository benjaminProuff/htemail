import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className=" py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl mb-12">
          Public Feed
        </h1>
        <main className="flex flex-col space-y-6 max-w-3xl mx-auto">
          {props.drafts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md ">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
