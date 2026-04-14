import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PROFILE_LINKS = [
  { href: "https://github.com/maxzhangg", label: "GitHub" },
  { href: "https://www.linkedin.com/in/maxzhang0/", label: "LinkedIn" },
];

const ResumePage = () => {
  const [content, setContent] = useState("");
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}resume.md`)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() => setContent(""));
  }, []);

  const sections = content.split("## Projects");
  const mainInfo = sections[0] || "";
  const projects = sections[1] || "";

  const mainMarkdownComponents = {
    h2: ({ node, ...props }) => (
      <h2
        className="mb-3 mt-7 border-b border-[#e5ddd2] pb-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#6d665d] first:mt-0"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="mb-1 mt-4 text-[1rem] font-semibold leading-[1.35rem] tracking-[-0.02em] text-[#1d1b17]"
        {...props}
      />
    ),
    h4: ({ node, ...props }) => (
      <h4
        className="mb-1 mt-3 text-[0.86rem] font-medium text-[#2f2a24]"
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p
        className="mb-2.5 text-[13px] leading-[1.55rem] text-[#433d36] last:mb-0"
        {...props}
      />
    ),
    a: ({ node, ...props }) => (
      <a
        target="_blank"
        rel="noreferrer"
        className="underline decoration-[#cfc5b8] underline-offset-4 transition hover:text-[#0f5e4f]"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className="mb-2.5 list-disc space-y-1.5 pl-4 text-[13px] leading-[1.5rem] text-[#433d36]"
        {...props}
      />
    ),
    li: ({ node, ...props }) => <li className="pl-1" {...props} />,
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-[#1d1b17]" {...props} />
    ),
    em: ({ node, ...props }) => (
      <em className="italic text-[#6d665d]" {...props} />
    ),
    hr: () => <div className="my-5 border-t border-[#e5ddd2]" />,
  };

  const projectMetaComponents = {
    p: ({ node, ...props }) => <span {...props} />,
    a: ({ node, ...props }) => (
      <a
        target="_blank"
        rel="noreferrer"
        className="underline decoration-[#d3c9bd] underline-offset-4 transition hover:text-[#0f5e4f]"
        {...props}
      />
    ),
  };

  const detailMarkdownComponents = {
    p: ({ node, ...props }) => (
      <p
        className="mb-2 text-[12px] leading-[1.45rem] text-[#4d473f] last:mb-0"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className="list-disc space-y-1.5 pl-4 text-[12px] leading-[1.45rem] text-[#4d473f]"
        {...props}
      />
    ),
    li: ({ node, ...props }) => <li className="pl-1" {...props} />,
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-[#1d1b17]" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a
        target="_blank"
        rel="noreferrer"
        className="underline decoration-[#d3c9bd] underline-offset-4 transition hover:text-[#0f5e4f]"
        {...props}
      />
    ),
  };

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
      const contribIndex = lines.findIndex((line) =>
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

      return {
        id: index,
        title,
        link,
        date,
        description,
        contributions:
          contribIndex === -1 ? "" : lines.slice(contribIndex + 1).join("\n").trim(),
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

  return (
    <div
      className="min-h-screen bg-[#f6f3ef] text-[#1d1b17]"
      style={{ fontFamily: "Sora, 'Noto Sans SC', system-ui, sans-serif" }}
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap");
      `}</style>

      <div className="mx-auto max-w-3xl px-3 pb-8 pt-4 sm:px-4">
        <div className="space-y-5">
          <section className="rounded-[28px] border border-[#e3ddd4] bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1e8_100%)] px-4 py-5 shadow-[0_18px_44px_-40px_rgba(26,25,22,0.45)]">
            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src={`${import.meta.env.BASE_URL}head_resume.png`}
                alt="Max Zhang"
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-[0_18px_34px_-24px_rgba(0,0,0,0.42)]"
              />

              <div className="space-y-1">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6d665d]">
                  Resume
                </div>
                <div className="text-[1.38rem] font-semibold tracking-[-0.04em] text-[#1d1b17]">
                  Max Zhang
                </div>
                <div className="text-[0.82rem] text-[#6d665d]">she/her</div>
                <div className="mx-auto max-w-[15rem] text-[0.83rem] leading-[1.3rem] italic text-[#4d473f]">
                  Electrical & Computer Engineering
                </div>
              </div>

              <div className="w-full max-w-[18rem] space-y-2 border-t border-[#e8e0d4] pt-3">
                <a
                  href="mailto:maxzhangggg@gmail.com"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#ddd3c6] bg-white/85 px-3 py-2 text-[12px] text-[#1d1b17] shadow-[0_12px_20px_-18px_rgba(26,25,22,0.4)] transition hover:border-[#0f5e4f] hover:text-[#0f5e4f]"
                >
                  maxzhangggg@gmail.com
                </a>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {PROFILE_LINKS.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-[#ddd3c6] bg-white/85 px-3 py-1.5 text-[11px] font-medium text-[#2f2a24] shadow-[0_12px_20px_-18px_rgba(26,25,22,0.4)] transition hover:border-[#0f5e4f] hover:text-[#0f5e4f]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[26px] border border-[#e3ddd4] bg-white px-4 py-4 shadow-[0_16px_40px_-38px_rgba(26,25,22,0.38)]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={mainMarkdownComponents}
            >
              {mainInfo.trim()}
            </ReactMarkdown>
          </section>

          <section className="rounded-[26px] border border-[#e3ddd4] bg-[#fcfaf7] px-4 py-4 shadow-[0_16px_40px_-38px_rgba(26,25,22,0.35)]">
            <div className="mb-3 flex items-end justify-between gap-3 border-b border-[#e5ddd2] pb-2.5">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6d665d]">
                  Portfolio
                </div>
                <h2 className="mt-1 text-[1.05rem] font-semibold tracking-[-0.03em] text-[#1d1b17]">
                  Projects
                </h2>
              </div>

              <button
                type="button"
                onClick={toggleAll}
                className="rounded-full border border-[#d9cfbf] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#4d473f] transition hover:border-[#0f5e4f] hover:text-[#0f5e4f]"
              >
                {allExpanded ? "Hide all" : "Show all"}
              </button>
            </div>

            <div className="space-y-3">
              {projectList.map((project) => (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-[20px] border border-[#e4dbcf] bg-white shadow-[0_14px_30px_-28px_rgba(26,25,22,0.35)] transition active:scale-[0.995]"
                  onClick={() => toggleExpand(project.id)}
                >
                  <div className="px-3.5 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        {project.link !== "#" ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="group inline-block"
                          >
                            <h3 className="text-[0.98rem] font-semibold leading-[1.35rem] tracking-[-0.02em] text-[#1d1b17] transition group-hover:text-[#0f5e4f]">
                              {project.title}
                            </h3>
                          </a>
                        ) : (
                          <h3 className="text-[0.98rem] font-semibold leading-[1.35rem] tracking-[-0.02em] text-[#1d1b17]">
                            {project.title}
                          </h3>
                        )}

                        {project.date && (
                          <p className="mt-1 text-[11px] leading-[1.25rem] text-[#756d63]">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={projectMetaComponents}
                            >
                              {project.date}
                            </ReactMarkdown>
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 rounded-full border border-[#ddd3c6] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#4d473f]">
                        {project.expanded ? "Hide" : "Details"}
                      </span>
                    </div>

                    <p className="mt-2 text-[12.5px] leading-[1.45rem] text-[#433d36]">
                      {project.description}
                    </p>
                  </div>

                  {project.expanded && (
                    <div className="border-t border-[#ece4d8] bg-[#fcfaf8] px-3.5 py-3">
                      <div className="space-y-3">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={detailMarkdownComponents}
                        >
                          {project.contributions}
                        </ReactMarkdown>

                        {Array.isArray(project.images) &&
                          project.images.length > 0 && (
                            <div className="space-y-3 border-t border-[#ece4d8] pt-3">
                              {project.images.map((image, index) => {
                                const src = `${import.meta.env.BASE_URL}${image}`;

                                return (
                                  <a
                                    key={`${project.id}-${index}`}
                                    href={src}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(event) => event.stopPropagation()}
                                    className="block overflow-hidden rounded-[16px] border border-[#e4dbcf] bg-white shadow-[0_12px_24px_-22px_rgba(26,25,22,0.3)]"
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
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
