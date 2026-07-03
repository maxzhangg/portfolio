import React, { useEffect, useMemo, useState } from "react";
import SiteNav from "../components/SiteNav";
import { usePageReveal } from "../utils/usePageReveal";

const tabs = [
  { id: "Featured", label: "Featured", number: "01" },
  { id: "Gallery", label: "Gallery", number: "02" },
  { id: "About", label: "About", number: "03" },
];
const categories = [
  { label: "Models", value: "model" },
  { label: "Girls", value: "girls" },
  { label: "Sapphic", value: "lesbian" },
];

const getPhotoSrc = (base, folder, filename) => `${base}photo/${folder}/${filename}`;

const getTabLabel = (tabId) => tabs.find((item) => item.id === tabId)?.label || tabId;

const formatCount = (count) => `${String(count).padStart(2, "0")} frames`;

const PhotoFrame = ({ alt, className = "", imageClassName = "", label, onOpen, src }) => (
  <button
    type="button"
    onClick={() => onOpen(src, label)}
    className={`group block w-full break-inside-avoid text-left outline-none transition focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4 ${className}`}
  >
    <img
      src={src}
      alt={alt}
      className={`block h-auto w-full object-contain transition duration-300 group-hover:brightness-[0.94] ${imageClassName}`}
      loading="lazy"
      decoding="async"
    />
  </button>
);

const PhotographerPage = () => {
  const scope = usePageReveal();
  const base = import.meta.env.BASE_URL;
  const [tab, setTab] = useState("Featured");
  const [category, setCategory] = useState(categories[0].label);
  const [galleryMap, setGalleryMap] = useState({});
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch(`${base}photo/PhotoName.json`)
      .then((res) => res.json())
      .then((data) => setGalleryMap(data))
      .catch(() => setGalleryMap({}));
  }, [base]);

  const featured = galleryMap.featured || [];
  const activeCategory = categories.find((item) => item.label === category) || categories[0];
  const gallery = galleryMap[activeCategory.value] || [];
  const leadPhoto = featured[0];

  const featuredGrid = useMemo(() => featured.slice(1), [featured]);

  const openPhoto = (src, label) => {
    setLightbox({ src, label });
  };

  return (
    <div ref={scope} className="min-h-screen bg-white text-[#111111]">
      <SiteNav />

      <main>
        <section className="mx-auto grid max-w-[1500px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
          <aside className="hero-reveal flex flex-col justify-between gap-10 border-b border-[#dedbd4] pb-8 lg:sticky lg:top-6 lg:max-h-[calc(100vh-48px)] lg:self-start lg:border-b-0 lg:border-r lg:pr-8">
            <div>
              <p className="text-sm font-medium text-[#77716a]">
                Light, distance, and the almost-still
              </p>
              <h1 className="mt-5 font-serif text-6xl font-medium leading-[0.94] sm:text-7xl lg:text-8xl">
                Image Studio
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-9 text-[#4f4a43]">
                A quiet archive of faces, softened daylight, and the second
                before a pose becomes a person again.
              </p>
            </div>

            <div className="grid gap-8">
              <div className="grid gap-1">
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    aria-pressed={tab === item.id}
                    className={`grid grid-cols-[40px_1fr] border-b py-3 text-left text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 ${
                      tab === item.id
                        ? "border-[#111111] text-[#111111]"
                        : "border-[#dedbd4] text-[#77716a] hover:border-[#111111] hover:text-[#111111]"
                    }`}
                  >
                    <span className="font-serif text-lg leading-none">{item.number}</span>
                    <span className="font-semibold uppercase">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="grid gap-3 text-sm text-[#56514a]">
                <p>Ottawa, under available light</p>
                <a href="mailto:maxzhangggg@gmail.com" className="studio-text-link">
                  maxzhangggg@gmail.com
                </a>
              </div>
            </div>
          </aside>

          <div className="hero-reveal min-w-0">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#dedbd4] pb-4">
              <p className="font-serif text-2xl leading-none text-[#111111]">
                {tab === "Gallery" ? category : getTabLabel(tab)}
              </p>
              <p className="text-xs uppercase text-[#77716a]">
                {tab === "Featured"
                  ? formatCount(featured.length)
                  : tab === "Gallery"
                    ? formatCount(gallery.length)
                    : "A note on looking"}
              </p>
            </div>

            {tab === "Featured" && (
              <div className="mt-6">
                {leadPhoto && (
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        openPhoto(getPhotoSrc(base, "featured", leadPhoto), "Featured 01")
                      }
                      className="group flex min-h-[58vh] w-full items-center justify-center bg-[#f6f6f3] p-3 outline-none transition focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4 sm:min-h-[68vh] sm:p-6"
                    >
                      <img
                        src={getPhotoSrc(base, "featured", leadPhoto)}
                        alt="Featured photograph"
                        className="max-h-[76vh] max-w-full object-contain shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition duration-300 group-hover:brightness-[0.95]"
                        loading="eager"
                        decoding="async"
                      />
                    </button>
                  </div>
                )}

                <div className="mt-12 columns-1 gap-5 sm:columns-2 xl:columns-3">
                  {featuredGrid.map((filename, index) => {
                    const src = getPhotoSrc(base, "featured", filename);
                    return (
                      <PhotoFrame
                        key={filename}
                        src={src}
                        alt={`Featured ${index + 2}`}
                        label={`Featured ${String(index + 2).padStart(2, "0")}`}
                        onOpen={openPhoto}
                        className={`${index % 5 === 1 ? "sm:pt-10" : ""} mb-8`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {tab === "Gallery" && (
              <div className="mt-6">
                <div className="mb-8 flex flex-wrap gap-5 border-b border-[#dedbd4] pb-4">
                  {categories.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setCategory(item.label)}
                      aria-pressed={category === item.label}
                      className={`border-b pb-2 text-xs font-semibold uppercase outline-none transition focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 ${
                        category === item.label
                          ? "border-[#111111] text-[#111111]"
                          : "border-transparent text-[#77716a] hover:border-[#111111] hover:text-[#111111]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
                  {gallery.map((filename, index) => {
                    const src = getPhotoSrc(base, activeCategory.value, filename);
                    return (
                      <PhotoFrame
                        key={filename}
                        src={src}
                        alt={`${category} ${index + 1}`}
                        label={`${category} ${String(index + 1).padStart(2, "0")}`}
                        onOpen={openPhoto}
                        className={`${index % 7 === 3 ? "sm:pt-8" : ""} mb-8`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {tab === "About" && (
              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(220px,320px)_minmax(0,1fr)]">
                <img
                  src={`${base}head_photographer.jpg`}
                  alt="Max Zhang"
                  className="aspect-square w-64 rounded-full object-cover sm:w-72 lg:w-full"
                />
                <div className="max-w-2xl self-end border-t border-[#dedbd4] pt-6">
                  <h2 className="font-serif text-5xl font-medium">
                    A small practice of staying.
                  </h2>
                  <p className="mt-6 text-lg leading-9 text-[#4f4a43]">
                    I photograph the suspended moment: a face turning toward
                    light, a room becoming quiet, the thin distance between
                    performing and being seen.
                  </p>
                  <p className="mt-5 text-base leading-8 text-[#56514a]">
                    This studio is separate from my product work, but it keeps
                    the same discipline: look longer, compose with restraint,
                    and leave only what still carries feeling.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.label}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 border border-white/30 px-3 py-2 text-xs font-semibold uppercase text-white transition hover:bg-white hover:text-black"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.label}
            className="max-h-[88vh] max-w-[92vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PhotographerPage;
