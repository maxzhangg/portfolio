import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PROFILE_LINKS = [
  { href: "https://github.com/maxzhangg", label: "GitHub" },
  { href: "https://www.linkedin.com/in/maxzhang0/", label: "LinkedIn" },
];

const DESKTOP_ZOOM = 0.9;
const DESKTOP_PANEL_MAX_HEIGHT = `calc((100vh - 1.5rem) / ${DESKTOP_ZOOM})`;

const MAIN_SECTION_PRIORITY = ["Experience", "Education"];

const reorderMainSections = (markdown) => {
  const blocks = markdown
    .split(/^## /gm)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [title, ...bodyLines] = block.split("\n");

      return {
        title: title.trim(),
        body: bodyLines.join("\n").trim(),
      };
    });

  if (blocks.length === 0) {
    return markdown;
  }

  const remaining = [...blocks];
  const ordered = [];

  MAIN_SECTION_PRIORITY.forEach((priorityTitle) => {
    const index = remaining.findIndex(
      (block) => block.title.toLowerCase() === priorityTitle.toLowerCase()
    );

    if (index !== -1) {
      ordered.push(remaining[index]);
      remaining.splice(index, 1);
    }
  });

  return [...ordered, ...remaining]
    .map(({ title, body }) => `## ${title}\n\n${body}`.trim())
    .join("\n\n---\n\n");
};

const ResumePage = () => {
  const [content, setContent] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [isProjectPanelExpanded, setIsProjectPanelExpanded] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}resume.md`)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() => setContent(""));
  }, []);

  const sections = content.split("## Projects");
  const mainInfo = sections[0] || "";
  const projects = sections[1] || "";
  const technicalSkillsSections = mainInfo.split(
    /(?:\n---\s*\n)?## Technical Skills\s*\n/i
  );
  const hasTechnicalSkills = technicalSkillsSections.length > 1;
  const mainContent = hasTechnicalSkills
    ? technicalSkillsSections[0].trim()
    : mainInfo.trim();
  const technicalSkillsContent = hasTechnicalSkills
    ? technicalSkillsSections.slice(1).join("\n").trim()
    : "";
  const orderedMainContent = reorderMainSections(mainContent);

  useEffect(() => {
    if (!projects) {
      setProjectList([]);
      return;
    }

    const rawItems = projects
      .split(/^### /gm)
      .filter((block) => block.trim());

    const parsedProjects = rawItems.map((block, index) => {
      const lines = block.trim().split("\n");
      const titleLine = lines[0];
      const titleMatch = titleLine.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const title = titleMatch ? titleMatch[1] : titleLine.trim();
      const link = titleMatch ? titleMatch[2] : "#";

      const dateLine = lines.find((line) =>
        line.toLowerCase().startsWith("**date:**")
      );
      const descriptionLine = lines.find((line) =>
        line.toLowerCase().startsWith("**description:**")
      );
      const imagesLine = lines.find((line) =>
        line.toLowerCase().startsWith("**images:**")
      );
      const contributionsStart = lines.findIndex((line) =>
        line.toLowerCase().startsWith("**key contributions:**")
      );

      const date = dateLine
        ? dateLine.replace(/\*\*date:\*\*\s*/i, "").trim()
        : "";
      const description = descriptionLine
        ? descriptionLine.replace(/\*\*description:\*\*\s*/i, "").trim()
        : "";
      const images = imagesLine
        ? imagesLine
            .replace(/\*\*images:\*\*\s*/i, "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
      const contributions =
        contributionsStart === -1
          ? ""
          : lines
              .slice(contributionsStart + 1)
              .filter(
                (line) =>
                  !line.toLowerCase().startsWith("**key contributions:**")
              )
              .join("\n")
              .trim();

      return {
        id: index,
        title,
        link,
        date,
        description,
        contributions,
        images,
        expanded: false,
      };
    });

    setProjectList(parsedProjects);
  }, [projects]);

  const allExpanded =
    projectList.length > 0 && projectList.every((project) => project.expanded);

  const toggleExpand = (id) => {
    setProjectList((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, expanded: !project.expanded }
          : project
      )
    );
  };

  const toggleAll = () => {
    const shouldExpand = !allExpanded;
    setProjectList((prev) =>
      prev.map((project) => ({ ...project, expanded: shouldExpand }))
    );
  };

  const mainMarkdownComponents = {
    h2: ({ node, ...props }) => (
      <h2
        className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6d665d]"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="mt-4 mb-1 text-[0.96rem] font-semibold tracking-[-0.02em] text-[#1a1916]"
        {...props}
      />
    ),
    h4: ({ node, ...props }) => (
      <h4 className="mt-3 mb-1 text-[0.86rem] font-medium text-[#2d2924]" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p
        className="mb-2 text-[12.5px] leading-[1.3rem] text-[#3f3a34] last:mb-0"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className="mb-2 space-y-0.5 pl-4 text-[12.5px] leading-[1.3rem] text-[#3f3a34]"
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li className="pl-1 marker:text-[#a79e92]" {...props} />
    ),
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-[#1a1916]" {...props} />
    ),
    em: ({ node, ...props }) => (
      <em className="italic text-[#6d665d]" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a
        target="_blank"
        rel="noreferrer"
        className="underline decoration-[#cfc6ba] underline-offset-4 transition hover:text-[#0f5e4f]"
        {...props}
      />
    ),
    hr: () => <div className="my-4 border-t border-[#e3ddd4]" />,
  };

  const technicalSkillsComponents = {
    p: ({ node, ...props }) => (
      <p
        className="border-t border-[#e9e2d8] py-2 text-[11px] leading-[1.15rem] text-[#4d473f] first:border-t-0 first:pt-0 last:pb-0"
        {...props}
      />
    ),
    strong: ({ node, ...props }) => (
      <strong
        className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6d665d]"
        {...props}
      />
    ),
  };

  const projectMetaComponents = {
    p: ({ node, ...props }) => <span {...props} />,
    strong: ({ node, ...props }) => (
      <strong className="font-medium text-[#6d665d]" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a
        target="_blank"
        rel="noreferrer"
        className="underline decoration-[#cfc6ba] underline-offset-4 transition hover:text-[#0f5e4f]"
        {...props}
      />
    ),
  };

  const projectContentComponents = {
    p: ({ node, ...props }) => (
      <p
        className="mb-2 text-[12px] leading-[1.35rem] text-[#3f3a34] last:mb-0"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className="space-y-1 pl-4 text-[12px] leading-[1.35rem] text-[#3f3a34]"
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li className="pl-1 marker:text-[#a79e92]" {...props} />
    ),
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-[#1a1916]" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a
        target="_blank"
        rel="noreferrer"
        className="underline decoration-[#cfc6ba] underline-offset-4 transition hover:text-[#0f5e4f]"
        {...props}
      />
    ),
  };

  return (
    <div
      className="min-h-screen bg-[#f6f3ef] text-[#1a1916]"
      style={{ fontFamily: "Sora, 'Noto Sans SC', system-ui, sans-serif" }}
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap");
      `}</style>

      <div className="mx-auto max-w-[1560px] px-3 pb-3 pt-3 sm:px-4 lg:px-5 xl:px-6">
        <div className="lg:[zoom:0.9]">
          <div
            className={
              isProjectPanelExpanded
                ? "grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,3.4fr)_minmax(220px,1.6fr)]"
                : "grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_54px]"
            }
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(220px,1.3fr)_minmax(0,2.1fr)] xl:grid-cols-[minmax(220px,1.3fr)_minmax(0,2.1fr)]">
              <aside
              className="self-start space-y-3 lg:sticky lg:top-3 xl:overflow-y-auto"
              style={{ maxHeight: DESKTOP_PANEL_MAX_HEIGHT }}
            >
            <section className="overflow-hidden rounded-[22px] border border-[#e3ddd4] bg-white shadow-[0_16px_44px_-38px_rgba(26,25,22,0.42)]">
              <div className="flex items-start gap-3 p-3.5">
                <img
                  src={`${import.meta.env.BASE_URL}head_resume.png`}
                  alt="Max Zhang"
                  className="h-[86px] w-[86px] shrink-0 rounded-[16px] object-cover shadow-[0_14px_30px_-24px_rgba(0,0,0,0.45)]"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#6d665d]">
                    Resume
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                    <h1 className="text-[1.06rem] font-semibold tracking-[-0.04em] text-[#1a1916]">
                      Max Zhang
                    </h1>
                    <p className="text-[11px] text-[#6d665d]">she/her</p>
                  </div>
                  <p className="max-w-[13rem] text-[0.8rem] leading-[1.15rem] text-[#4d473f] italic">
                    Electrical & Computer Engineering
                  </p>
                  <a
                    href="mailto:maxzhangggg@gmail.com"
                    className="inline-flex max-w-full truncate text-[11px] text-[#1a1916] underline decoration-[#cfc6ba] underline-offset-4 transition hover:text-[#0f5e4f]"
                  >
                    maxzhangggg@gmail.com
                  </a>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-[#4d473f]">
                    {PROFILE_LINKS.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-[#2d2924] underline decoration-[#d8d0c4] underline-offset-4 transition hover:text-[#0f5e4f]"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {technicalSkillsContent && (
              <section className="rounded-[22px] border border-[#e3ddd4] bg-[#fcfaf7] p-3.5 shadow-[0_14px_36px_-34px_rgba(26,25,22,0.42)]">
                <div className="border-b border-[#e3ddd4] pb-2.5">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6d665d]">
                    Capabilities
                  </div>
                  <h2 className="mt-1 text-[0.95rem] font-semibold tracking-[-0.03em] text-[#1a1916]">
                    Technical Skills
                  </h2>
                </div>

                <div className="mt-2.5 text-sm">
                  <ReactMarkdown components={technicalSkillsComponents}>
                    {technicalSkillsContent}
                  </ReactMarkdown>
                </div>
              </section>
            )}
          </aside>

              <section
              className="min-w-0 rounded-[22px] border border-[#e3ddd4] bg-white px-4 py-3 shadow-[0_16px_44px_-40px_rgba(26,25,22,0.38)] xl:overflow-y-auto xl:px-4"
              style={{ maxHeight: DESKTOP_PANEL_MAX_HEIGHT }}
            >
            <div className="mb-3 border-b border-[#e3ddd4] pb-2.5">
              <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6d665d]">
                Overview
              </div>
              <h2 className="mt-0.5 text-[1.12rem] font-semibold tracking-[-0.04em] text-[#1a1916]">
                Experience & Education
              </h2>
            </div>

            <div className="min-w-0">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={mainMarkdownComponents}
              >
                {orderedMainContent}
              </ReactMarkdown>
            </div>
              </section>
            </div>

            <aside
              className={`min-w-0 rounded-[22px] border border-[#e3ddd4] bg-[#fcfaf7] px-3.5 pb-3.5 pt-0 shadow-[0_16px_40px_-40px_rgba(26,25,22,0.35)] xl:sticky xl:top-3 xl:overflow-y-auto ${
                isProjectPanelExpanded ? "" : "xl:hidden"
              }`}
              style={{ maxHeight: DESKTOP_PANEL_MAX_HEIGHT }}
            >
            <div className="sticky top-0 z-10 -mx-3.5 mb-3 border-b border-[#e3ddd4] bg-[#fcfaf7] px-3.5 pb-2.5 pt-3.5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6d665d]">
                    Portfolio
                  </div>
                  <h2 className="mt-1 text-[1.02rem] font-semibold tracking-[-0.03em] text-[#1a1916]">
                    Projects
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="shrink-0 rounded-full border border-[#d8d0c4] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#4d473f] transition hover:border-[#0f5e4f] hover:text-[#0f5e4f]"
                  >
                    {allExpanded ? "Collapse all" : "Expand all"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsProjectPanelExpanded(false)}
                    className="hidden shrink-0 rounded-full border border-[#d8d0c4] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#4d473f] transition hover:border-[#0f5e4f] hover:text-[#0f5e4f] xl:inline-flex"
                  >
                    Hide panel
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {projectList.map((project) => (
                <article
                  key={project.id}
                  className="rounded-[18px] border border-[#e3ddd4] bg-white p-3 transition duration-200 hover:border-[#c8beb1]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {project.link !== "#" ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-block"
                        >
                          <h3 className="text-[0.98rem] font-semibold tracking-[-0.02em] text-[#1a1916] transition group-hover:text-[#0f5e4f]">
                            {project.title}
                          </h3>
                        </a>
                      ) : (
                        <h3 className="text-[0.98rem] font-semibold tracking-[-0.02em] text-[#1a1916]">
                          {project.title}
                        </h3>
                      )}

                      {project.date && (
                        <div className="mt-1 text-[11px] leading-[1.2rem] text-[#6d665d]">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={projectMetaComponents}
                          >
                            {project.date}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      className="shrink-0 rounded-full border border-[#d8d0c4] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#4d473f] transition hover:border-[#0f5e4f] hover:text-[#0f5e4f]"
                    >
                      {project.expanded ? "Hide" : "Details"}
                    </button>
                  </div>

                  <p
                    className="mt-1.5 text-[12px] leading-[1.3rem] text-[#3f3a34]"
                    style={
                      project.expanded
                        ? undefined
                        : {
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            overflow: "hidden",
                          }
                    }
                  >
                    {project.description}
                  </p>

                  {project.expanded && (
                    <div className="mt-2.5 space-y-2.5 border-t border-[#e3ddd4] pt-2.5">
                      {project.contributions && (
                        <div className="text-sm">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={projectContentComponents}
                          >
                            {project.contributions}
                          </ReactMarkdown>
                        </div>
                      )}

                      {project.images.length > 0 && (
                        <div className="grid gap-2">
                          {project.images.map((image, index) => {
                            const src = `${import.meta.env.BASE_URL}${image}`;

                            return (
                              <a
                                key={`${project.id}-${index}`}
                                href={src}
                                target="_blank"
                                rel="noreferrer"
                                className="block overflow-hidden rounded-[14px] border border-[#e3ddd4] bg-white"
                              >
                                <img
                                  src={src}
                                  alt={`${project.title} ${index + 1}`}
                                  className="h-auto w-full object-contain"
                                  loading="lazy"
                                />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
            </aside>

            {!isProjectPanelExpanded && (
              <aside
                className="hidden rounded-[22px] border border-[#e3ddd4] bg-[#fcfaf7] shadow-[0_16px_40px_-40px_rgba(26,25,22,0.35)] xl:flex xl:sticky xl:top-3 xl:overflow-hidden"
                style={{ maxHeight: DESKTOP_PANEL_MAX_HEIGHT }}
              >
                <button
                  type="button"
                  onClick={() => setIsProjectPanelExpanded(true)}
                  className="flex h-full w-full flex-col items-center justify-between px-2 py-3 text-[#4d473f] transition hover:bg-[#f7f2eb]"
                >
                  <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#6d665d]">
                    Open
                  </span>
                  <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2d2924]">
                    Projects
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#6d665d]">
                    Panel
                  </span>
                </button>
              </aside>
            )}
        </div>
          </div>
      </div>
    </div>
  );
};

export default ResumePage;
