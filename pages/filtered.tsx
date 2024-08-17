import React, { useState, useMemo } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Discover from "../components/Discover";

// Définition des catégories pour les filtres avec les couleurs et le texte
const categories = [
  {
    name: "Email Marketing",
    bgcolor: "bg-blue-100",
    textColor: "blue-800",
  },
  {
    name: "Newsletter",
    bgcolor: "bg-gray-300",
    textColor: "gray-800",
  },

  {
    name: "Product Email",
    bgcolor: "bg-red-100",
    textColor: "red-800",
  },
  {
    name: "Welcome Email",
    bgcolor: "bg-green-100",
    textColor: "green-800",
  },
  {
    name: "Promotion Email",
    bgcolor: "bg-yellow-100",
    textColor: "yellow-800",
  },
  {
    name: "Event Invitation",
    bgcolor: "bg-indigo-100",
    textColor: "indigo-800",
  },
];

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

const Blog: React.FC<Props> = ({ feed }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fonction pour gérer la sélection des catégories
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filtrer les posts en fonction des catégories sélectionnées
  const filteredPosts = useMemo(() => {
    if (selectedCategories.length === 0) return feed;
    return feed.filter(
      (post) => selectedCategories.some((cat) => cat === post.type) // Assure que post.type correspond à l'une des catégories sélectionnées
    );
  }, [selectedCategories, feed]);

  return (
    <Layout>
      <div className="py- sm:px-6  bg-white">
        <Discover />

        {/* Filter Chips */}
        <div className="mt-8">
          <p className="text-lg font-normal flex justify-center  pt-6 text-gray-500  lg:text-xl dark:text-gray-400">
            Trending searches
          </p>
          <div className="flex flex-wrap gap-2 m-6 px-96 mb-4 justify-evenly">
            {" "}
            {/* Augmenter l'espace entre les boutons */}
            {categories.map(({ name, bgcolor, textColor }) => (
              <button
                key={name}
                onClick={() => toggleCategory(name)}
                className={`text-base shadow-sm hover:shadow-md border-opacity-25 font-medium px-4 py-2 rounded ${bgcolor} text-${textColor} border-${textColor} ${
                  selectedCategories.includes(name)
                    ? `border-2 border-${textColor} bg-opacity-75`
                    : "bg-opacity-50"
                }`}
                style={{ minWidth: "160px" }} // Assurer une largeur minimale pour éviter le glissement
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Post Grid */}
        <main className="grid grid-cols-1 pt-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="">
                <Post post={post} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found</p>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
