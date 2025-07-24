import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const pages = [
    {
      id: "resume",
      title: "📄 Resume",
      description: "View my education background, projects, and technical skills.",
    },
    {
      id: "web3",
      title: "🪙 Web3",
      description: "Explore blockchain-based front-end projects and prototypes.",
    },
    {
      id: "photographer",
      title: "📷 Photography",
      description: "Browse my photography works and visual storytelling.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Max Zhang</h1>
          <p className="text-gray-600 mt-2 text-lg">Welcome to my personal website</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => navigate(`/${page.id}`)}
              className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 text-left hover:shadow-lg hover:border-gray-300 transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{page.title}</h2>
              <p className="text-gray-600 text-sm">{page.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
