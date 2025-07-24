import React, { useState } from "react";

const TABS = ["Featured", "Gallery", "About"];

const PhotographerPage = () => {
  const [tab, setTab] = useState("Featured");
  const [subTab, setSubTab] = useState("Models");

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-16">
      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center px-4 py-2 gap-2">
          <div className="font-bold text-lg"></div>
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                className={`px-3 py-1 rounded text-sm ${
                  tab === t
                    ? "bg-black text-white"
                    : "text-gray-600 hover:underline"
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
                {[
                  "20240802_2.png",
                  "20240817_llj_1.png",
                  "20240904_zpf_1.png",
                  "20240904_zpf_3.png",
                  "Alex_1_7.jpg",
                  "Alex_1_8.jpg",
                  "Alex_2_4.jpg",
                  "Alex_3_3.jpg",
                  "20241208_fy_1.png",
                  "20241208_fy_2.jpg",
                  "20241208_fy_4.png"
                ].map((filename, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.BASE_URL}photo/featured/${filename}`}
                    alt={`精选 ${i + 1}`}
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
      {["Models", "Girls", "Sapphic"].map((label) => (
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
      {subTab === "Models" && (
        <div className="columns-2 sm:columns-3 gap-4">
          {[
            "Alex_1_1.jpg", "Alex_1_2.jpg", "Alex_1_3.jpg", "Alex_1_4.jpg",
            "Alex_1_5.jpg", "Alex_1_6.jpg", "Alex_1_7.jpg", "Alex_1_8.jpg",
            "Alex_2_1.jpg", "Alex_2_2.jpg", "Alex_2_3.jpg", "Alex_2_4.jpg",
            "Alex_2_5.jpg", "Alex_3_1.jpg", "Alex_3_2.jpg", "Alex_3_3.jpg",
            "Alex_3_4.jpg", "Alex_3_5.jpg", "Alex_3_6.jpg"
          ].map((filename, i) => (
            <img
              key={i}
              src={`${import.meta.env.BASE_URL}photo/model/${filename}`}
              alt={`模特 ${i + 1}`}
              className="mb-4 w-full break-inside-avoid rounded-lg shadow"
            />
          ))}
        </div>
      )}

      {subTab === "Girls" && (
        <div className="columns-2 sm:columns-3 gap-4">
          {[
            "20240802_1.png", "20240802_2.png",
            "20240816_fy_1.jpg", "20240816_fy_2.jpg", "20240816_fy_3.jpg",
            "20240816_fy_4.jpg", "20240816_fy_5.jpg", "20240816_fy_6.jpg",
            "20240817_llj_1.png", "20240817_llj_2.png",
            "20240904_zpf_1.png", "20240904_zpf_2.png", "20240904_zpf_3.png",
            "20241208_fy_1.png", "20241208_fy_2.jpg", "20241208_fy_3.png",
            "20241208_fy_4.png", "20241208_fy_5.png", "20241208_fy_6.png",
            "20241208_fy_7.png", "20241208_fy_8.png"
          ].map((filename, i) => (
            <img
              key={i}
              src={`${import.meta.env.BASE_URL}photo/girls/${filename}`}
              alt={`girl-${i + 1}`}
              className="mb-4 w-full break-inside-avoid rounded-lg shadow"
            />
          ))}
        </div>
      )}

      {subTab === "Sapphic" && (
        <div className="columns-2 gap-4">
          {["1.jpg", "2.jpg"].map((filename, i) => (
            <img
              key={i}
              src={`${import.meta.env.BASE_URL}photo/lesbian/${filename}`}
              alt={`叙事系 ${i + 1}`}
              className="mb-4 w-full break-inside-avoid rounded-lg shadow"
            />
          ))}
        </div>
      )}
    </div>
  </div>
)}


        {tab === "About" && (
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold">About Me</h2>
            <div className="text-gray-700 leading-relaxed space-y-4 text-sm sm:text-base">
              <p>
                Focus is placed on the quiet dynamics between women — gaze, distance, breath.
                Emotions unfold in stillness, without the need for dialogue.
              </p>
              <p>
                Natural light and muted tones dominate the palette. Cool colors, negative space, and a sense of damp stillness often shape the atmosphere. Settings are drawn from everyday life: worn sofas, bathrooms, narrow bedrooms, late-night corners. Nothing staged. Nothing loud.
              </p>
              <p>
                Subjects appear relaxed, yet never vacant — held in the space between intimacy and detachment.
                These are not portraits, but fragments of real connection.
              </p>
              <p>
                The lens stays respectful. The emotion lingers at the edge of the frame.
              </p>
            </div>
            <div className="text-gray-700 text-sm sm:text-base">
              <p>📍 Location: Ottawa, Canada</p>
              <p>📧 Contact: <a href="mailto:maxzhangggg@gmail.com" className="underline">maxzhangggg@gmail.com</a></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographerPage;
