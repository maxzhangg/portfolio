import React, { useState, useEffect } from "react";

const TABS = ["Featured", "Gallery", "About"];
const SUBTABS = {
  Models: "model",
  Girls: "girls",
  Sapphic: "lesbian",
};

const PhotographerPage = () => {
  const [tab, setTab] = useState("Featured");
  const [subTab, setSubTab] = useState("Models");

  const [galleryMap, setGalleryMap] = useState({});
  const featuredList = galleryMap["featured"] || [];
  const galleryList = galleryMap[SUBTABS[subTab]] || [];

  // 只加载一次 PhotoName.json
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}photo/PhotoName.json`)
      .then((res) => res.json())
      .then((data) => setGalleryMap(data))
      .catch((err) => {
        console.error("加载 PhotoName.json 失败：", err);
        setGalleryMap({});
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-16">
      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-2">
          <div className="font-bold text-lg">Max Zhang</div>
          <div className="space-x-4">
            {TABS.map((t) => (
              <button
                key={t}
                className={`px-3 py-1 rounded ${
                  tab === t ? "bg-black text-white" : "text-gray-600 hover:underline"
                }`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-4">
        {/* Featured Tab */}
        {tab === "Featured" && (
          <div className="space-y-8">
            <section className="text-center mt-8">
              <h1 className="text-4xl font-bold text-gray-900">Max Zhang</h1>
              <p className="text-gray-600 mt-2 text-lg">
                Not just portraits—fragments of intimacy, tension, and truth.
              </p>
            </section>
            <section>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {featuredList.map((filename, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.BASE_URL}photo/featured/${filename}`}
                    alt={`精选 ${i + 1}`}
                    className="w-full rounded-lg break-inside-avoid"
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Gallery Tab */}
        {tab === "Gallery" && (
          <div className="space-y-8 mt-6">
            <div className="flex justify-center gap-4 mt-4">
              {Object.keys(SUBTABS).map((label) => (
                <button
                  key={label}
                  onClick={() => setSubTab(label)}
                  className={`px-4 py-1 border rounded-full text-sm ${
                    subTab === label
                      ? "bg-black text-white"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <div className="columns-4 gap-4 space-y-4">
                {galleryList.map((filename, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.BASE_URL}photo/${SUBTABS[subTab]}/${filename}`}
                    alt={`${subTab} ${i + 1}`}
                    className="w-full rounded-lg break-inside-avoid"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* About Tab */}
        {tab === "About" && (
  <div className="mt-12 max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
    <img
      src={`${import.meta.env.BASE_URL}head_photographer.jpg`}
      alt="Portrait"
      className="w-52 h-52 rounded-full shadow-md object-cover"
    />

    <h2 className="text-2xl font-bold">Max Zhang</h2>
    <p className="text-gray-700 leading-relaxed">
      Freelance photographer specializing in portraiture, street photography, and visual storytelling.
    </p>

    <div className="text-gray-700 space-y-1">
      <p>📍 Ottawa, Canada</p>
      <p>
        📧 <a href="mailto:maxzhangggg@gmail.com" className="underline">maxzhangggg@gmail.com</a>
      </p>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default PhotographerPage;
