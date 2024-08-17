// Discover.js
import React from "react";

const Discover = () => {
  return (
    <div className="container  mx-auto px-16 py-16 text-center mb-3">
      <h1 className="mb-4 leading-9 text-3xl font-extrabold  tracking-normal text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Discover the world's{" "}
        <span className="text-blue-600 dark:text-blue-500 ">
          top designers & creatives
        </span>{" "}
        HTML Templates
      </h1>
      <p className="text-lg font-normal px-96 pt-6 text-gray-500 lg:text-xl dark:text-gray-400">
        Dribbble is the leading destination to find & showcase creative work and
        home to the world's best design professionals.
      </p>

      <form className="max-w-md mx-auto pt-6">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
        </div>
      </form>
      <div className="mt-8">
        <p className="text-lg font-normal px-96 pt-6 text-gray-500 lg:text-xl dark:text-gray-400">
          Trending searches
        </p>

        <div className="flex justify-center space-x-2 pt-3">
          <span className="bg-blue-100 text-blue-800 cursor-pointer text-base font-medium me-2 px-3.5 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300">
            Marketing
          </span>
          <span className="bg-gray-300 text-gray-800 cursor-pointer text-base font-medium me-2 px-3.5 py-1.5 rounded dark:bg-white dark:text-gray-300">
            Product review
          </span>
          <span className="bg-red-100 text-red-800 cursor-pointer text-base font-medium me-2 px-3.5 py-1.5 rounded dark:bg-red-900 dark:text-red-300">
            News Letter
          </span>
          <span className="bg-green-100 text-green-800 cursor-pointer text-base font-medium me-2 px-3.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300">
            Promotion
          </span>
          <span className="bg-yellow-100 text-yellow-800 cursor-pointer text-base font-medium me-2 px-3.5 py-1.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            Welcome Rewards
          </span>
          <span className="bg-indigo-100 text-indigo-800 cursor-pointer text-base font-medium me-2 px-3.5 py-1.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
            Communication
          </span>
          <span className="bg-purple-100 text-purple-800 cursor-pointer text-base font-medium me-2 px-3.5 py-1.5 rounded dark:bg-purple-900 dark:text-purple-300">
            Blog
          </span>
          <span className="bg-pink-100 text-pink-800 cursor-pointer text-base font-medium me-2 px-3.5 py-1.5 rounded dark:bg-pink-900 dark:text-pink-300">
            FAQ
          </span>
        </div>
      </div>
    </div>
  );
};

export default Discover;
