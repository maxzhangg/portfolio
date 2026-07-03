import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import { productProjects } from "../data/productWork";
import { usePageReveal } from "../utils/usePageReveal";

const getInitialProjectId = (search) => {
  const params = new URLSearchParams(search);
  const caseId = params.get("case");
  return productProjects.some((project) => project.id === caseId)
    ? caseId
    : productProjects[0].id;
};

const ProjectImage = ({ alt, className = "", src, priority = false }) => (
  <figure
    className={`flex items-start justify-center border border-[#dedbd4] bg-[#f7f7f4] p-2 ${className}`}
  >
    <img
      src={src}
      alt={alt}
      className="block h-auto w-full object-contain"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  </figure>
);

const ProductWorkPage = () => {
  const scope = usePageReveal();
  const location = useLocation();
  const [activeId, setActiveId] = useState(() => getInitialProjectId(location.search));
  const base = import.meta.env.BASE_URL;

  const activeProject = useMemo(
    () => productProjects.find((project) => project.id === activeId) || productProjects[0],
    [activeId]
  );

  const proofItems = [
    ["Problem", activeProject.problem],
    ["Product decision", activeProject.decision],
    ["Build", activeProject.build],
    ["Quality evidence", activeProject.quality],
    ["Outcome", activeProject.outcome],
  ];

  const [primaryImage, ...supportingImages] = activeProject.images;

  return (
    <div ref={scope} className="min-h-screen bg-white text-[#111111]">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 border-b border-[#dedbd4] pb-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="hero-reveal studio-label">Product Work</p>
            <h1 className="hero-reveal mt-4 text-5xl font-semibold leading-[0.98] sm:text-7xl">
              Product cases, not just project cards.
            </h1>
          </div>
          <div className="hero-reveal max-w-3xl lg:pt-9">
            <p className="text-xl leading-9 text-[#4f4a43]">
              This page shows how I frame a problem, make product decisions,
              build the prototype, and verify whether the experience is reliable
              enough to hand to someone else.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/profile" className="studio-button">
                View Profile
              </Link>
              <Link to="/web3" className="studio-button-secondary">
                Web3 Lab
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="scroll-reveal lg:sticky lg:top-24 lg:self-start">
            <p className="studio-label">Cases</p>
            <div className="mt-4 grid border-y border-[#dedbd4]">
              {productProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  className={`grid gap-1 border-b border-[#dedbd4] px-0 py-4 text-left transition last:border-b-0 ${
                    activeId === project.id ? "text-[#0f5e4f]" : "text-[#111111]"
                  }`}
                >
                  <span className="text-base font-semibold">
                    {project.title}
                  </span>
                  <span className="text-xs uppercase text-[#66615b]">
                    {project.type} / {project.year}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <article className="min-w-0">
            <div className="scroll-reveal grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)]">
              <div className="border border-[#dedbd4] p-6">
                <p className="studio-label">{activeProject.type}</p>
                <h2 className="mt-4 text-5xl font-semibold">
                  {activeProject.title}
                </h2>
                <p className="mt-3 text-xl leading-8 text-[#56514a]">
                  {activeProject.subtitle}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#dedbd4] px-2.5 py-1 text-xs uppercase text-[#66615b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="studio-text-link mt-8 inline-flex"
                >
                  Open project
                </a>
              </div>

              <div className="grid content-start gap-3">
                {primaryImage && (
                  <ProjectImage
                    src={`${base}${primaryImage}`}
                    alt={`${activeProject.title} primary screen`}
                    priority
                  />
                )}
                <div
                  className={`grid gap-3 ${
                    supportingImages.length === 1
                      ? "grid-cols-1"
                      : "sm:grid-cols-2"
                  }`}
                >
                  {supportingImages.slice(0, 2).map((image, index) => (
                    <ProjectImage
                      key={image}
                      src={`${base}${image}`}
                      alt={`${activeProject.title} supporting screen ${index + 2}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {proofItems.map(([label, body]) => (
                <section
                  key={label}
                  className="scroll-reveal grid gap-4 border-t border-[#dedbd4] py-6 md:grid-cols-[220px_minmax(0,1fr)]"
                >
                  <h3 className="text-sm font-semibold uppercase text-[#0f5e4f]">
                    {label}
                  </h3>
                  <p className="max-w-3xl text-lg leading-8 text-[#3d3934]">{body}</p>
                </section>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default ProductWorkPage;
