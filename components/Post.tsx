import React from "react";
import Router from "next/router";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  type: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
      className="post-container"
    >
      <a href="#" className="content-wrapper">
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="dangerous-html-render"
        ></div>

        <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
          {post.title}
        </h3>

        <p className="mt-2 max-w-xs text-gray-700">
          By {post?.author?.name || "Unknown author"}.
        </p>
      </a>

      <style jsx>{`
        .post-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-sizing: border-box;
        }

        .content-wrapper {
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
          position: relative;
          flex-grow: 1; /* Utilisation de tout l'espace disponible */
        }

        .dangerous-html-render {
          transform: scale(0.7);
          transform-origin: top left;
          width: calc(100% / 0.7);
          height: auto;
          overflow: hidden;
          margin: 0;
          padding: 0;
          display: block;
        }

        h3,
        p {
          margin: 0;
          padding: 0.5rem 0;
          text-align: center;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Post;
