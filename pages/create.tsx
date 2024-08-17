import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState(""); // État pour le type sélectionné

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content, type }; // Inclure le type dans les données envoyées
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropdownToggle = () => {
    const dropdown = document.getElementById("dropdownDivider");
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  };

  const handleSelectType = (selectedType: string) => {
    setType(selectedType);
    handleDropdownToggle(); // Fermer le menu après la sélection
  };

  return (
    <Layout>
      <div className="p-12 flex flex-col items-center bg-white">
        <form
          onSubmit={submitData}
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-6">New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Dropdown Button */}
          <button
            onClick={handleDropdownToggle}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4"
            type="button"
          >
            {type || "Select Type"}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div
            id="dropdownDivider"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownDividerButton"
            >
              <li>
                <a
                  href="#"
                  onClick={() => handleSelectType("Email Marketing")}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Email Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleSelectType("Newsletter")}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Newsletter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleSelectType("Product Email")}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Product Email
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleSelectType("Welcome Email")}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Welcome Email
                </a>
              </li>
            </ul>
          </div>

          <input
            disabled={!content || !title}
            type="submit"
            value="Create"
            className="bg-gray-200 border-0 p-3 rounded-md cursor-pointer hover:bg-gray-300"
          />
          <a
            className="text-blue-500 hover:underline ml-4 cursor-pointer"
            href="#"
            onClick={() => Router.push("/")}
          >
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
