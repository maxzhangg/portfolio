import React from "react";
import SiteNav from "../components/SiteNav";
import { productProjects } from "../data/productWork";
import { usePageReveal } from "../utils/usePageReveal";

const profileLinks = [
  { href: "mailto:maxzhangggg@gmail.com", label: "Email" },
  { href: "https://github.com/maxzhangg", label: "GitHub" },
  { href: "https://www.linkedin.com/in/maxzhang0/", label: "LinkedIn" },
];

const experiences = [
  {
    role: "QA Tester",
    org: "Weex Global",
    location: "Remote",
    time: "Mar 2026 - Present",
    points: [
      "Owned end-to-end quality testing for a production web dashboard, covering UI workflows, data correctness, edge cases, regression risks, and release readiness.",
      "Designed and executed test strategies covering manual and automated testing, including UI workflows, data validation, and edge cases",
      "Developed Playwright-based automation (Python) to simulate user actions (filter, search, export) and enable automated UI testing and data extraction",
      "Built data reconciliation workflows by comparing exported UI data with backend SQL queries, ensuring cross-source consistency",
      "Performed root cause analysis on data discrepancies (e.g., 100.65 USDT mismatch) by tracing transaction-level logic and validating risk processing",
      "Identified 40+ defects, reported risks early, and collaborated with product and engineering in a fast-paced Agile environment",
    ],
  },
  {
    role: "Service Router Test Platform Dev Student",
    org: "Nokia",
    location: "Ottawa",
    time: "Apr 2024 - Dec 2024",
    points: [
      "Assist Ethernet and Optical teams to validate new hardware and software in a Linux-based regression environment.",
      "Developed and executed 3 test cases for Optical Transceivers and Media Dependent Adapters.",
      "Conducted 1,078 regression tests on QSFP28 - 4x25G/100G PSM4 Optical Transceiver, ensuring reliability and compliance.",
      "Identified and reported 7 critical embedded software bugs, enhancing system stability.",
      "Verified 8 bug fixes across 3 embedded software images.",
      "Optimized GASH code by fixing bugs and improving functionality, streamlining testing workflows.",
      "Worked extensively with CI/CD pipelines for automated testing and deployment.",
    ],
  },
];

const practice = [
  {
    title: "Workflow QA",
    body: "I test full user paths instead of isolated screens, including empty states, retries, exports, search, filtering, and handoff states.",
  },
  {
    title: "Data reconciliation",
    body: "I compare UI output with backend records and transaction-level logic when the product depends on numerical or operational accuracy.",
  },
  {
    title: "Prototype thinking",
    body: "I can turn a product idea into flows, screens, state labels, and a working front-end demo that can be reviewed and tested.",
  },
];

const skillGroups = [
  {
    title: "Testing",
    items: "PyTest, JUnit, Selenium, Appium, Playwright, Postman, JIRA, regression testing",
  },
  {
    title: "Frontend",
    items: "React, Vite, Tailwind CSS, responsive UI, markdown/JSON-driven content, GitHub Pages",
  },
  {
    title: "Programming",
    items: "Python, JavaScript, TypeScript, Java, TCL, Bash, SQL, MATLAB",
  },
  {
    title: "Systems",
    items: "Linux test environments, optical networks, Ethernet, TCP/IP, CI/CD, lab instrumentation",
  },
];

const ResumePage = () => {
  const scope = usePageReveal();
  const base = import.meta.env.BASE_URL;
  const evidence = productProjects.slice(0, 4);

  return (
    <div ref={scope} className="min-h-screen bg-white text-[#111111]">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 border-b border-[#dedbd4] pb-10 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="hero-reveal lg:sticky lg:top-24 lg:self-start">
            <img
              src={`${base}head_resume.png`}
              alt="Max Zhang"
              className="aspect-square w-40 border border-[#dedbd4] object-cover"
            />
            <div className="mt-6">
              <p className="studio-label">Professional Profile</p>
              <h1 className="mt-3 text-5xl font-semibold">
                Max Zhang
              </h1>
              <p className="mt-4 text-lg leading-8 text-[#56514a]">
                Product-minded QA tester and software builder.
              </p>
            </div>
            <div className="mt-6 grid gap-2 border-y border-[#dedbd4] py-4">
              {profileLinks.map((item) => (
                <a key={item.label} href={item.href} className="studio-text-link">
                  {item.label}
                </a>
              ))}
            </div>
          </aside>

          <div className="hero-reveal max-w-4xl lg:pt-8">
            <h2 className="text-4xl font-semibold leading-tight sm:text-6xl">
              I turn rough ideas into reliable, testable, user-facing products.
            </h2>
            <p className="mt-6 text-xl leading-9 text-[#4f4a43]">
              My strongest overlap is quality engineering plus product execution:
              I can test production workflows, trace data mismatches, and build
              prototypes that make product decisions visible.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="border border-[#dedbd4] p-4">
                <p className="studio-label">Current focus</p>
                <p className="mt-3 text-lg font-semibold">
                  QA + product reliability
                </p>
              </div>
              <div className="border border-[#dedbd4] p-4">
                <p className="studio-label">Builder side</p>
                <p className="mt-3 text-lg font-semibold">
                  AI tools and prototypes
                </p>
              </div>
              <div className="border border-[#dedbd4] p-4">
                <p className="studio-label">Visual side</p>
                <p className="mt-3 text-lg font-semibold">
                  Photography practice
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#dedbd4] py-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="scroll-reveal">
            <p className="studio-label">Experience</p>
            <h2 className="mt-3 text-4xl font-semibold">
              Experience
            </h2>
          </div>

          <div className="grid gap-8">
            {experiences.map((item) => (
              <article key={`${item.org}-${item.role}`} className="scroll-reveal border-t border-[#dedbd4] pt-6">
                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-lg text-[#0f5e4f]">
                      {item.org}, {item.location}
                    </p>
                  </div>
                  <p className="text-sm uppercase text-[#66615b] md:text-right">
                    {item.time}
                  </p>
                </div>
                <ul className="mt-5 grid gap-3 text-sm leading-7 text-[#56514a]">
                  {item.points.map((point) => (
                    <li key={point} className="border-l border-[#0f5e4f] pl-4">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#dedbd4] py-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="scroll-reveal">
            <p className="studio-label">Quality practice</p>
            <h2 className="mt-3 text-4xl font-semibold">
              How I think.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {practice.map((item) => (
              <article key={item.title} className="scroll-reveal border border-[#dedbd4] p-5">
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#56514a]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#dedbd4] py-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="scroll-reveal">
            <p className="studio-label">Selected evidence</p>
            <h2 className="mt-3 text-4xl font-semibold">
              Product work I can discuss.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {evidence.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="scroll-reveal group border border-[#dedbd4] transition hover:border-[#0f5e4f]"
              >
                <img
                  src={`${base}${project.images[0]}`}
                  alt={project.title}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <p className="studio-label">{project.type}</p>
                  <h3 className="mt-3 text-2xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#56514a]">
                    {project.quality}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="scroll-reveal">
            <p className="studio-label">Capabilities</p>
            <h2 className="mt-3 text-4xl font-semibold">
              Skills grouped by use.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {skillGroups.map((group) => (
              <article key={group.title} className="scroll-reveal border-t border-[#dedbd4] py-5">
                <h3 className="text-lg font-semibold">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#56514a]">{group.items}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResumePage;
