import React, { useEffect, useState } from "react";

const TABS = ["Featured", "Gallery", "About"];
const SUBTABS = {
  Models: "model",
  Girls: "girls",
  Sapphic: "lesbian"
};

const PhotographerPage = () => {
  const [tab, setTab] = useState("Featured");
  const [subTab, setSubTab] = useState("Models");
  const [galleryMap, setGalleryMap] = useState({});

  const featuredList = galleryMap["featured"] || [];
  const galleryList = galleryMap[SUBTABS[subTab]] || [];

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}photo/PhotoName.json`)
      .then((res) => res.json())
      .then((data) => setGalleryMap(data))
      .catch((err) => {
        console.error("加载 PhotoName.json 失败", err);
        setGalleryMap({});
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-16">
      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center px-4 py-2 gap-2">
          <div className="font-bold text-lg">Max Zhang</div>
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                className={`px-3 py-1 rounded text-sm ${
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

      {/* 页面内容 */}
      <div className="max-w-5xl mx-auto p-4">
        {tab === "Featured" && (
          <div className="space-y-8">
            <section className="text-center mt-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Max Zhang</h1>
              <p className="text-gray-600 mt-2 text-base md:text-lg">
                Not just portraits—fragments of intimacy, tension, and truth.
              </p>
            </section>

            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredList.map((filename, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.BASE_URL}photo/featured/${filename}`}
                    alt={`Featured ${i + 1}`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === "Gallery" && (
          <div className="space-y-8 mt-6">
            {/* 子分类按钮 */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
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

            {/* 瀑布流图片展示区 */}
            <div className="px-4">
              <div
                className={`${
                  subTab === "Sapphic" ? "columns-2" : "columns-2 sm:columns-3"
                } gap-4`}
              >
                {galleryList.map((filename, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.BASE_URL}photo/${SUBTABS[subTab]}/${filename}`}
                    alt={`${subTab} ${i + 1}`}
                    className="mb-4 w-full break-inside-avoid rounded-lg shadow"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

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
                📧{" "}
                <a href="mailto:maxzhangggg@gmail.com" className="underline">
                  maxzhangggg@gmail.com
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographerPage;
