import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteNav from "../components/SiteNav";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const categories = [
  { label: "Models", value: "model" },
  { label: "Girls", value: "girls" },
  { label: "Sapphic", value: "lesbian" },
];

const getPhotoSrc = (base, folder, filename) => `${base}photo/${folder}/${filename}`;
const formatIndex = (index) => String(index + 1).padStart(2, "0");

const PhotographerPage = () => {
  const page = useRef(null);
  const base = import.meta.env.BASE_URL;
  const [galleryMap, setGalleryMap] = useState({});
  const [category, setCategory] = useState(categories[0]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch(`${base}photo/PhotoName.json`)
      .then((res) => res.json())
      .then(setGalleryMap)
      .catch(() => setGalleryMap({}));
  }, [base]);

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflowX;
    const previousBodyOverflow = document.body.style.overflowX;
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    window.scrollTo({ left: 0, top: window.scrollY });

    return () => {
      document.documentElement.style.overflowX = previousHtmlOverflow;
      document.body.style.overflowX = previousBodyOverflow;
    };
  }, []);

  const featured = galleryMap.featured || [];
  const gallery = galleryMap[category.value] || [];
  const editorial = useMemo(() => featured.slice(1, 9), [featured]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(".photo-kicker", { autoAlpha: 0, y: 14, duration: 0.6 })
          .from(".photo-title-line", { yPercent: 115, duration: 1.15, stagger: 0.09 }, "-=0.25")
          .from(".photo-hero-image", { clipPath: "inset(0 0 100% 0)", scale: 1.06, duration: 1.35 }, "-=0.9")
          .from(".photo-hero-meta", { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.08 }, "-=0.55");

        gsap.to(".photo-hero-image img", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: ".photo-hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });

        gsap.utils.toArray(".editorial-frame").forEach((frame) => {
          const image = frame.querySelector("img");
          const caption = frame.querySelector(".frame-caption");
          gsap.fromTo(
            frame,
            { autoAlpha: 0, y: 70 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: frame, start: "top 88%", once: true },
            },
          );
          gsap.from(image, {
            scale: 1.08,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: { trigger: frame, start: "top 88%", once: true },
          });
          gsap.from(caption, {
            autoAlpha: 0,
            x: -12,
            duration: 0.7,
            delay: 0.18,
            scrollTrigger: { trigger: frame, start: "top 88%", once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: page, dependencies: [featured.length], revertOnUpdate: true },
  );

  const openPhoto = (src, label) => setLightbox({ src, label });

  return (
    <div ref={page} className="photo-exhibition min-h-screen overflow-x-hidden bg-[#eee9df] text-[#171713]">
      <SiteNav />

      <main>
        <section className="photo-hero relative min-h-[calc(100svh-57px)] overflow-hidden px-4 pb-5 pt-7 sm:px-6 lg:px-10 lg:pb-8">
          <div className="photo-kicker flex items-center justify-between border-t border-[#171713] pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            <span>Max Zhang / Image practice</span>
            <span>Ottawa · 2024—26</span>
          </div>

          <div className="relative mt-4 grid min-h-[calc(100svh-125px)] grid-cols-12 grid-rows-[auto_1fr_auto] gap-x-3 lg:gap-x-6">
            <h1 className="relative z-20 col-span-12 row-start-1 max-w-full font-serif text-[20vw] font-medium leading-[0.84] tracking-[-0.045em] sm:text-[16vw] lg:text-[12.2vw]">
              <span className="block overflow-visible px-[0.08em] py-[0.08em]"><span className="photo-title-line block">After</span></span>
              <span className="block overflow-visible pb-[0.18em] pl-[12vw] pt-[0.08em] pr-[0.08em] sm:pl-[16vw]"><span className="photo-title-line block italic">Light</span></span>
            </h1>

            {featured[0] && (
              <button
                type="button"
                onClick={() => openPhoto(getPhotoSrc(base, "featured", featured[0]), "After Light — 01")}
                className="photo-hero-image group relative z-10 col-span-8 col-start-3 row-start-2 -mt-[4vw] min-h-[42vh] overflow-hidden bg-[#d6d0c5] outline-none focus-visible:ring-2 focus-visible:ring-[#171713] sm:col-span-6 sm:col-start-4 lg:col-span-5 lg:col-start-5 lg:min-h-[50vh]"
              >
                <img
                  src={getPhotoSrc(base, "featured", featured[0])}
                  alt="Featured portrait"
                  className="absolute inset-[-8%_0] h-[116%] w-full object-cover grayscale-[12%] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0"
                />
              </button>
            )}

            <p className="photo-hero-meta col-span-3 col-start-1 row-start-2 self-end pb-6 text-xs leading-5 sm:col-span-2 lg:text-sm">
              Portraits of the interval between performance and presence.
            </p>
            <p className="photo-hero-meta col-span-3 col-start-10 row-start-2 self-center text-right font-serif text-lg italic sm:col-span-2 sm:col-start-11 lg:text-2xl">
              Vol. 01
            </p>
            <div className="photo-hero-meta col-span-12 row-start-3 flex items-end justify-between border-b border-[#171713] pb-2 pt-4 text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-xs">
              <span>Scroll to enter the exhibition</span><span>↓</span>
            </div>
          </div>
        </section>

        <section className="bg-[#171713] px-4 py-20 text-[#eee9df] sm:px-6 lg:px-10 lg:py-32">
          <div className="mb-20 grid grid-cols-12 gap-3 border-t border-white/35 pt-3 lg:mb-32 lg:gap-6">
            <p className="col-span-4 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">Selected works / 01—08</p>
            <p className="col-span-8 max-w-4xl font-serif text-4xl leading-[0.96] tracking-[-0.025em] sm:text-6xl lg:text-8xl">
              The camera remembers what the pose forgets.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-x-3 gap-y-24 sm:gap-y-32 lg:gap-x-6 lg:gap-y-48">
            {editorial.map((filename, index) => {
              const src = getPhotoSrc(base, "featured", filename);
              const layouts = [
                "col-span-10 col-start-2 sm:col-span-7 sm:col-start-1 lg:col-span-6",
                "col-span-9 col-start-4 sm:col-span-5 sm:col-start-8",
                "col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-7 lg:col-start-4",
                "col-span-9 sm:col-span-5 sm:col-start-2",
              ];
              return (
                <figure key={filename} className={`editorial-frame ${layouts[index % layouts.length]}`}>
                  <button
                    type="button"
                    onClick={() => openPhoto(src, `Selected work ${formatIndex(index)}`)}
                    className="group block w-full overflow-hidden bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-[#eee9df]"
                  >
                    <img src={src} alt={`Selected portrait ${formatIndex(index)}`} className="block max-h-[84vh] w-full object-cover transition duration-700 group-hover:scale-[1.015]" loading="lazy" />
                  </button>
                  <figcaption className="frame-caption mt-3 flex justify-between border-t border-white/30 pt-2 text-[10px] uppercase tracking-[0.15em] text-white/65 sm:text-xs">
                    <span>Untitled, Ottawa</span><span>{formatIndex(index)} / 08</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
          <div className="border-t border-[#171713] pt-3">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] sm:mb-6 sm:text-xs">Archive / Browse by feeling</p>
            <div className="min-w-0">
              <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-[#a7a196] pb-4 font-serif text-4xl sm:text-5xl lg:gap-x-5 lg:text-7xl">
                {categories.map((item) => (
                  <button key={item.value} type="button" onClick={() => setCategory(item)} className={`transition ${category.value === item.value ? "italic text-[#171713]" : "text-[#9a9489] hover:text-[#171713]"}`}>
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:mt-10 lg:columns-3">
                {gallery.map((filename, index) => {
                  const src = getPhotoSrc(base, category.value, filename);
                  return (
                    <button key={filename} type="button" onClick={() => openPhoto(src, `${category.label} ${formatIndex(index)}`)} className="group mb-8 block w-full break-inside-avoid text-left outline-none focus-visible:ring-2 focus-visible:ring-[#171713]">
                      <img src={src} alt={`${category.label} portrait ${formatIndex(index)}`} className="block h-auto w-full transition duration-500 group-hover:brightness-75" loading="lazy" />
                      <span className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6f6a61]"><span>{category.label}</span><span>{formatIndex(index)}</span></span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="grid min-h-[70vh] grid-cols-1 bg-[#c8c0b3] lg:grid-cols-2">
          <div className="flex min-h-[55vh] items-center justify-center p-8 sm:p-12 lg:min-h-full lg:p-16">
            <img src={`${base}head_photographer.jpg`} alt="Max Zhang" className="aspect-square w-full max-w-[560px] rounded-full object-cover" loading="lazy" />
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">Artist note / About</p>
            <div className="my-16">
              <p className="font-serif text-5xl leading-[0.95] sm:text-7xl">A small practice<br />of staying.</p>
              <p className="mt-10 max-w-xl text-lg leading-8 text-[#403c36]">I photograph the suspended moment: a face turning toward light, a room becoming quiet, the thin distance between performing and being seen.</p>
            </div>
            <a href="mailto:maxzhangggg@gmail.com" className="border-t border-[#171713] pt-3 text-sm font-semibold uppercase tracking-[0.12em]">Commission / Conversation ↗</a>
          </div>
        </section>
      </main>

      {lightbox && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0d0d0b]/95 p-4" role="dialog" aria-modal="true" aria-label={lightbox.label} onClick={() => setLightbox(null)}>
          <p className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.18em] text-white/60">{lightbox.label}</p>
          <button type="button" className="absolute right-4 top-4 border-b border-white pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-white" onClick={() => setLightbox(null)}>Close</button>
          <img src={lightbox.src} alt={lightbox.label} className="max-h-[88vh] max-w-[92vw] object-contain" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default PhotographerPage;
