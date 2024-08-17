import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import Highlight from "react-highlight";
import DiscoverSearch from "../../components/DiscoverSearch";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  const [copied, setCopied] = useState(false);

  if (status === "loading") {
    return (
      <div className=" flex items-center justify-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-60 h-60 "
        >
          <circle
            fill="#FF4C51"
            stroke="#FF4C51"
            stroke-width="4"
            r="15"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="#FF4C51"
            stroke="#FF4C51"
            stroke-width="4"
            r="15"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="#FF4C51"
            stroke="#FF4C51"
            stroke-width="4"
            r="15"
            cx="160"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>
      </div>
    );
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(props.content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy content:", err); // Debugging line
      });
  };

  return (
    <Layout>
      <DiscoverSearch />
      <div className="p-6 bg-white">
        <div className="flex">
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-5">
            <div className="flex justify-between ">
              <div className="flex-col p-2">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {title}
                </h5>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
                  By {props?.author?.name || "Unknown author"}
                </h2>
              </div>
              {!props.published && userHasValidSession && postBelongsToUser && (
                <button
                  onClick={() => publishPost(props.id)}
                  className="focus:outline-none text-dark rounded-full bg-transparent  hover:text-green-600 focus:ring-4  font-sm  text-sm  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-send-horizontal"
                  >
                    <path d="m3 3 3 9-3 9 19-9Z" />
                    <path d="M6 12h16" />
                  </svg>
                </button>
              )}
              {userHasValidSession && postBelongsToUser && (
                <button
                  onClick={() => deletePost(props.id)}
                  className="focus:outline-none text-dark rounded-full bg-transparent  hover:text-red-600 focus:ring-4 focus:ring-red-300 font-sm  text-sm  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>
              )}
            </div>
            <address className="relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 not-italic">
              <div className="space-y-2 text-gray-500 dark:text-gray-400 leading-loose hidden sm:block">
                <Highlight className="p-6">{props.content}</Highlight>
              </div>

              {copied && (
                <div className="mb-2 text-sm text-green-600 dark:text-green-400">
                  Copied!
                </div>
              )}

              <button
                onClick={handleCopy}
                className="absolute end-2 top-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
              >
                <span id="default-icon-contact-details">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                </span>
                <span
                  id="success-icon-contact-details"
                  className={`hidden inline-flex items-center ${
                    copied ? "inline-flex" : "hidden"
                  }`}
                >
                  <svg
                    className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </span>
              </button>
            </address>
          </div>
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
              Preview your email
            </h2>
            <address className="relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 not-italic">
              <div className="space-y-2 text-gray-500 dark:text-gray-400 leading-loose hidden sm:block">
                {" "}
                <div
                  dangerouslySetInnerHTML={{ __html: props.content }}
                  className="dangerous-html-render"
                ></div>
              </div>

              {copied && (
                <div className="mb-2 text-sm text-green-600 dark:text-green-400">
                  Copied!
                </div>
              )}
            </address>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
