import React from "react";
import { Link } from "react-router-dom";
import { ContactButton } from "../components/ContactDialog";
import SiteNav from "../components/SiteNav";
import { productProjects, productStrengths } from "../data/productWork";
import { usePageReveal } from "../utils/usePageReveal";

const previewPhotos = [
  "photo/featured/20240802_2.png",
  "photo/featured/20240904_zpf_1.png",
  "photo/featured/Alex_1_8.jpg",
  "photo/featured/EJ_1_4.jpg",
];

const HomePage = () => {
  const scope = usePageReveal();
  const base = import.meta.env.BASE_URL;
  const featuredProjects = productProjects.slice(0, 3);

  return (
    <div ref={scope} className="min-h-screen bg-white text-[#111111]">
      <SiteNav />

      <main>
        <section className="mx-auto grid min-h-[calc(100vh-56px)] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="hero-reveal mb-5 text-[11px] font-semibold uppercase text-[#66615b]">
              Build Studio / Image Studio
            </p>
            <h1 className="hero-reveal text-6xl font-semibold leading-[0.9] text-[#111111] sm:text-7xl lg:text-8xl xl:text-9xl">
              Max Zhang
            </h1>
            <div className="hero-reveal mt-8 max-w-2xl border-l border-[#0f5e4f] pl-5">
              <h2 className="text-2xl font-semibold leading-tight text-[#111111] sm:text-3xl">
                Product-minded QA tester and software builder with an
                image-maker's eye.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#56514a] sm:text-lg">
                I design, test, and build reliable web experiences, from early
                product ideas to usable prototypes.
              </p>
            </div>

            <div className="hero-reveal mt-8 flex flex-wrap gap-3">
              <Link to="/work" className="studio-button">
                View Product Work
              </Link>
              <Link to="/profile" className="studio-button-secondary">
                View Profile
              </Link>
            </div>
          </div>

          <div className="hero-reveal grid gap-3">
            <Link
              to="/work"
              className="group grid min-h-[250px] border border-[#dedbd4] bg-[#f7f7f4] p-5 transition duration-300 hover:border-[#0f5e4f]"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="studio-label">Build Studio</p>
                  <h3 className="mt-3 text-3xl font-semibold">
                    Product work, QA thinking, and shipped prototypes.
                  </h3>
                </div>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-[#0f5e4f] transition group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </div>

              <div className="mt-8 grid gap-2 sm:grid-cols-3">
                {featuredProjects.map((project) => (
                  <div key={project.id} className="min-w-0 border-t border-[#dedbd4] pt-3">
                    <p className="truncate text-sm font-semibold">{project.title}</p>
                    <p className="mt-1 text-xs leading-5 text-[#66615b]">{project.type}</p>
                  </div>
                ))}
              </div>
            </Link>

            <Link
              to="/photographer"
              className="group grid min-h-[250px] border border-[#dedbd4] bg-white p-5 transition duration-300 hover:border-[#111111]"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="studio-label">Image Studio</p>
                  <h3 className="mt-3 text-3xl font-semibold">
                    Portraits, light, and small honest moments.
                  </h3>
                </div>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-[#111111] transition group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-2">
                {previewPhotos.map((photo, index) => (
                  <img
                    key={photo}
                    src={`${base}${photo}`}
                    alt={`Image Studio preview ${index + 1}`}
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </Link>
          </div>
        </section>

        <section className="border-y border-[#dedbd4] bg-[#f7f7f4]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
            <div className="scroll-reveal">
              <p className="studio-label">Working model</p>
              <h2 className="mt-3 text-4xl font-semibold">
                I make rough product ideas testable.
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {productStrengths.map((item) => (
                <article key={item.title} className="scroll-reveal bg-white p-5">
                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#56514a]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="scroll-reveal flex flex-col justify-between gap-6 border-b border-[#dedbd4] pb-6 md:flex-row md:items-end">
            <div>
              <p className="studio-label">Selected work</p>
              <h2 className="mt-3 text-4xl font-semibold">
                Product cases with decision logic.
              </h2>
            </div>
            <Link to="/work" className="studio-text-link">
              Open Product Work
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/work?case=${project.id}`}
                className="scroll-reveal group border border-[#dedbd4] bg-white transition duration-300 hover:border-[#0f5e4f]"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#f7f7f4]">
                  <img
                    src={`${base}${project.images[0]}`}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <p className="studio-label">{project.type}</p>
                  <h3 className="mt-3 text-2xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#56514a]">
                    {project.decision}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-[#dedbd4] bg-[#111111] text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <p className="text-sm font-semibold">Max Zhang</p>
              <p className="mt-2 text-sm text-white/62">
                Product-minded QA tester, software builder, and image-maker.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link to="/web3" className="text-white/62 transition hover:text-[#72f0d1]">
                Web3 Lab
              </Link>
              <ContactButton className="text-white/62 transition hover:text-white">
                maxzhangggg@gmail.com
              </ContactButton>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
