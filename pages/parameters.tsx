import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import InfoCard from "../components/InfoCard";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { user: null, postCount: 0 } };
  }

  const userEmail = session.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  const postCount = await prisma.post.count({
    where: {
      author: {
        email: userEmail,
      },
      published: true, // Assuming 'active' is the status field for active posts
    },
  });

  return {
    props: { user, postCount },
  };
};

type UserProps = {
  user: {
    name: string;
    email: string;
    image?: string;
  } | null;
  postCount: number;
};

const Parameters: React.FC<UserProps> = ({ user, postCount }) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Account Parameters</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <h1>Account Parameters</h1>
        <div>Unable to load user information.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl mb-12">
          Account Parameters
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              {user.image && (
                <div className="mt-4">
                  <img
                    src={user.image}
                    alt={`${user.name}'s profile picture`}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              )}
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </span>
              <div className="flex mt-4 md:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add friend
                </a>
                <a
                  href="#"
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Message
                </a>
              </div>
            </div>
          </div>
          <div>
            <InfoCard
              title={`You have ${postCount} active posts`}
              description="Manage your active posts and explore new opportunities:"
              link="/posts"
              linkText="View Posts"
            />
          </div>
          <div>
            <InfoCard
              title="Need help with a Claim?"
              description="Follow our step-by-step guideline on how to certify for your weekly benefits:"
              link="/guidelines"
              linkText="See our guideline"
            />
          </div>
          {/* Add more sections for user settings here */}
        </div>
      </div>
    </Layout>
  );
};

export default Parameters;
