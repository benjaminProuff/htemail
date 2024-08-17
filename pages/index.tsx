import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

import prisma from "../lib/prisma";
import Discover from "../components/Discover";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className=" py-3 sm:px-6 lg:px-8 bg-white">
        <Discover />

        <main className="flex flex-col  justify-center max-w-lg mx-auto  ">
          {props.feed.map((post) => (
            <div
              key={post.id}
              className="shadow dark:bg-gray-800 dark:border-gray-700 m-6  flex"
            >
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
