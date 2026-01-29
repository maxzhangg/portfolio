import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const fallbackData = {
  profile: {
    name: "Max Zhang",
    title: "Web3 product designer / builder",
    tagline:
      "A calm home for on-chain experiments, shipping notes, and product launches.",
  },
  nav: ["About", "Projects", "Blog", "Research", "Contact"],
  posts: [
    {
      title: "Designing trust layers for wallet-first onboarding",
      date: "Jan 12, 2026",
      read: "6 min",
      summary: "How to reduce friction and increase confidence during wallet connects.",
    },
  ],
  sections: {},
  socials: ["Newsletter", "Farcaster", "GitHub"],
};

const Web3PageMobile = ({ section }) => {
  const [data, setData] = useState(fallbackData);
  const [projectContent, setProjectContent] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [expandedAll, setExpandedAll] = useState(false);
  const [posts, setPosts] = useState(fallbackData.posts || []);
  const [experienceItems, setExperienceItems] = useState([]);
  const [activeBlogIndex, setActiveBlogIndex] = useState(-1);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}web3/web3-data.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json) => setData(json))
      .catch(() => setData(fallbackData));
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}web3/blog.json`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(() => fallbackData.posts || []),
      fetch(`${import.meta.env.BASE_URL}web3/experience.json`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(() => []),
    ]).then(([postsData, experienceData]) => {
      setPosts(postsData);
      setExperienceItems(experienceData);
    });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}web3/projects.md`)
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .then((text) => setProjectContent(text))
      .catch(() => setProjectContent(""));
  }, []);

  useEffect(() => {
    if (!Array.isArray(posts) || posts.length === 0) return;
    if (!posts.some((post) => post?.md && !post.content)) return;
    Promise.all(
      posts.map((post) => {
        if (!post?.md || post.content) return Promise.resolve({ ...post });
        return fetch(`${import.meta.env.BASE_URL}${post.md}`)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
          .then((content) => ({ ...post, content }))
          .catch(() => ({ ...post }));
      })
    ).then((withContent) => {
      setPosts(withContent);
    });
  }, [posts]);

  useEffect(() => {
    if (!projectContent) {
      setProjectList([]);
      return;
    }
    const sections = projectContent.split("## Projects");
    const projectsSection = sections[1] || projectContent;
    const rawItems = projectsSection.split(/^### /gm).filter((block) => block.trim());
    const parsedProjects = rawItems.map((block, index) => {
      const lines = block.trim().split("\n");
      const titleLine = lines[0];
      const titleMatch = titleLine.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const title = titleMatch ? titleMatch[1] : titleLine.trim();
      const link = titleMatch ? titleMatch[2] : "#";

      const dateLine = lines.find((l) => l.toLowerCase().startsWith("**date:**"));
      const typeLine = lines.find((l) => l.toLowerCase().startsWith("**type:**"));
      const tagsLine = lines.find((l) => l.toLowerCase().startsWith("**tags:**"));
      const readLine = lines.find((l) => l.toLowerCase().startsWith("**read:**"));
      const descriptionLine = lines.find((l) =>
        l.toLowerCase().startsWith("**description:**")
      );
      const contribIndex = lines.findIndex((l) =>
        l.toLowerCase().startsWith("**key contributions:**")
      );
      const imagesIndex = lines.findIndex((l) =>
        l.toLowerCase().startsWith("**images:**")
      );
      const imagesLine = imagesIndex !== -1 ? lines[imagesIndex] : "";

      const date = dateLine ? dateLine.replace(/\*\*Date:\*\*\s*/i, "").trim() : "";
      const type = typeLine ? typeLine.replace(/\*\*Type:\*\*\s*/i, "").trim() : "";
      const tags = tagsLine
        ? tagsLine
            .replace(/\*\*Tags:\*\*\s*/i, "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      const read = readLine ? readLine.replace(/\*\*Read:\*\*\s*/i, "").trim() : "";
      const description = descriptionLine
        ? descriptionLine.replace(/\*\*Description:\*\*\s*/i, "").trim()
        : "";
      const images = imagesLine
        ? imagesLine
            .replace(/\*\*Images:\*\*\s*/i, "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      let contributions = "";
      if (contribIndex !== -1) {
        const nextMetaIndex = lines.findIndex(
          (line, idx) => idx > contribIndex && /^\*\*.+\*\*:/.test(line)
        );
        const endIndexCandidates = [imagesIndex, nextMetaIndex].filter((i) => i > contribIndex);
        const endIndex =
          endIndexCandidates.length > 0 ? Math.min(...endIndexCandidates) : lines.length;
        contributions = lines.slice(contribIndex + 1, endIndex).join("\n").trim();
      }

      return {
        id: index,
        title,
        link,
        date,
        type,
        tags,
        read,
        summary: description,
        contributions,
        images,
        expanded: false,
      };
    });
    setProjectList(parsedProjects);
  }, [projectContent]);

  const toggleProjectExpand = (id) => {
    setProjectList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, expanded: !p.expanded } : p))
    );
  };

  const toggleProjectAll = () => {
    const shouldExpand = !expandedAll;
    setProjectList((prev) => prev.map((p) => ({ ...p, expanded: shouldExpand })));
    setExpandedAll(shouldExpand);
  };

  const navItems = (data.nav || []).map((item) =>
    typeof item === "string" ? { label: item, href: "#" } : item
  );

  const baseUrl = import.meta.env.BASE_URL || "/";
  const resolvedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const resolveHref = (href) => {
    if (!href || href === "#") return "#";
    if (href.startsWith("http")) return href;
    if (href.startsWith("#")) return href;
    const path = href.startsWith("/") ? href : `/${href}`;
    return `${resolvedBase}#${path}`;
  };

  const sectionData = data.sections?.[section];
  const isSection = Boolean(sectionData);
  const sectionItems =
    section === "projects"
      ? projectList
      : section === "blog"
      ? posts
      : sectionData?.items || [];

  const now = new Date();
  const nowVal = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000
  );

  const parseDateIndex = (value) => {
    if (!value) return 0;
    const normalized = value.trim();
    if (/^present$/i.test(normalized) || /^now$/i.test(normalized)) {
      return nowVal;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
      const [y, m, d] = normalized.split("-");
      return Math.floor(Date.UTC(Number(y), Number(m) - 1, Number(d)) / 86400000);
    }
    if (/^\d{4}-\d{2}$/.test(normalized)) {
      const [y, m] = normalized.split("-");
      return Math.floor(Date.UTC(Number(y), Number(m) - 1, 1) / 86400000);
    }
    if (/^\d{4}$/.test(normalized)) {
      return Math.floor(Date.UTC(Number(normalized), 0, 1) / 86400000);
    }
    return 0;
  };

  const formatMonth = (value) => {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-");
      const date = new Date(Number(y), Number(m) - 1, Number(d));
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }
    if (/^\d{4}-\d{2}$/.test(value)) {
      const [y, m] = value.split("-");
      const date = new Date(Number(y), Number(m) - 1, 1);
      return date.toLocaleString("en-US", { month: "short", year: "numeric" });
    }
    return value;
  };

  const formatRange = (start, end) => {
    const startLabel = formatMonth(start);
    const endLabel = end ? formatMonth(end) : "Present";
    return `${startLabel} - ${endLabel}`;
  };

  const timelineItems = [...(experienceItems || [])]
    .filter((item) => item?.startDate)
    .map((item) => {
      const startVal = parseDateIndex(item.startDate);
      const endVal = item.endDate ? parseDateIndex(item.endDate) : nowVal;
      return {
        ...item,
        startVal,
        endVal: Math.max(endVal, startVal),
        dateLabel: formatRange(item.startDate, item.endDate),
      };
    })
    .sort((a, b) => b.endVal - a.endVal);

  const earliestStart = Math.min(...timelineItems.map((item) => item.startVal), nowVal);
  const timelineMin = earliestStart;
  const timelineMax = nowVal;
  const unitPerDay = 0.9;
  const timelineHeight = Math.max(420, (timelineMax - timelineMin) * unitPerDay + 64);
  const timelineUnit = unitPerDay;

  const markdownComponents = {
    h1: ({ node, ...props }) => (
      <h1 className="text-xl font-semibold text-white mt-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-lg font-semibold text-white mt-4" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-base font-semibold text-white mt-3" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="text-emerald-200 underline hover:text-emerald-100" {...props} />
    ),
    code: ({ inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code className="rounded bg-slate-900/70 px-1 py-0.5 text-emerald-200" {...props}>
            {children}
          </code>
        );
      }
      return (
        <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-700/40 bg-slate-950/60 p-3 text-sm text-slate-100">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    },
    img: ({ node, ...props }) => (
      <img className="mt-3 w-full rounded-xl border border-slate-700/40" {...props} />
    ),
    ul: ({ node, ...props }) => <ul className="mt-3 list-disc pl-5" {...props} />,
    ol: ({ node, ...props }) => <ol className="mt-3 list-decimal pl-5" {...props} />,
    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
    p: ({ node, ...props }) => <p className="mt-3 leading-relaxed" {...props} />,
  };


  return (
    <div className="web3-shell -m-4 min-h-screen text-slate-100">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

        .web3-shell {
          --bg: #0b0f19;
          --panel: rgba(15, 20, 34, 0.78);
          --border: rgba(148, 163, 184, 0.16);
          --muted: #a1a8bd;
          font-family: "Space Grotesk", "Segoe UI", sans-serif;
          background: var(--bg);
        }
      `}</style>

      <div className="relative overflow-hidden px-5 pb-12 pt-10">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-20 left-6 h-40 w-40 rounded-full bg-blue-400 blur-[110px]" />
          <div className="absolute bottom-0 right-6 h-48 w-48 rounded-full bg-emerald-300 blur-[130px]" />
        </div>

        <div className="relative space-y-6">
          <section className="rounded-3xl border border-slate-700/40 bg-slate-950/50 p-6 shadow-[0_24px_50px_rgba(6,12,26,0.5)]">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white">
                <img
                  src={`${import.meta.env.BASE_URL}head_web3.png`}
                  alt={`${data.profile?.name || "Web3"} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xl font-semibold">{data.profile?.name}</p>
                <p className="text-sm text-[var(--muted)]">{data.profile?.title}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-[var(--muted)]">{data.profile?.tagline}</p>

            <div className="mt-6 overflow-x-auto pb-2">
              <div className="flex min-w-max gap-3 text-sm">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={resolveHref(item.href)}
                    className="rounded-full border border-slate-700/50 bg-slate-950/60 px-4 py-2 text-slate-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {!isSection && (
            <section className="rounded-3xl border border-slate-700/40 bg-slate-950/50 p-6">
              <h1 className="text-2xl font-semibold text-white">Welcome to my Web3 garden</h1>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Essays, experiments, and product launches tailored for chain-native teams.
              </p>
            </section>
          )}

          {isSection && (
            <>
              {section === "experience" ? (
                <section className="relative">
                  <div
                    className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-slate-700/60"
                    style={{ height: `${timelineHeight}px` }}
                  />
                  <div className="relative" style={{ height: `${timelineHeight}px` }}>
                    {timelineItems.map((item, index) => {
                      const isStudy = item.type === "study";
                      const barColor = isStudy ? "bg-emerald-400/70" : "bg-blue-400/70";
                      const lineColor = barColor;
                      const clamp = (value) =>
                        Math.min(timelineHeight, Math.max(0, value));
                      const startOffset = clamp(
                        (timelineMax - item.startVal) * timelineUnit
                      );
                      const endOffset = clamp(
                        (timelineMax - item.endVal) * timelineUnit
                      );
                      const duration = Math.max(12, startOffset - endOffset);
                      const barTop = endOffset;
                      const barWidth = 36;
                      const barLeft = isStudy
                        ? `calc(50% - ${barWidth}px - 14px)`
                        : `calc(50% + 14px)`;
                      const textWidth = 120;
                      const lineLength = 140;
                      const barCenter = isStudy
                        ? `calc(50% - 14px - ${barWidth / 2}px)`
                        : `calc(50% + 14px + ${barWidth / 2}px)`;
                      const lineEnd = isStudy
                        ? `calc(${barCenter} - ${lineLength}px)`
                        : `calc(${barCenter} + ${lineLength}px)`;
                      const textLeft = isStudy
                        ? lineEnd
                        : `calc(${lineEnd} - ${textWidth}px)`;

                      return (
                        <div
                          key={`${item.title || item.organization}-${index}`}
                          className="absolute left-0 right-0"
                          style={{ top: `${barTop}px`, height: `${duration}px` }}
                        >
                          <div
                            className={`absolute ${barColor} rounded-lg`}
                            style={{
                              height: `${duration}px`,
                              width: `${barWidth}px`,
                              left: barLeft,
                            }}
                          />
                          <div
                            className={`absolute h-px ${lineColor}`}
                            style={{
                              top: 0,
                              left: isStudy ? lineEnd : barCenter,
                              width: isStudy
                                ? `calc(${barCenter} - ${lineEnd})`
                                : `calc(${lineEnd} - ${barCenter})`,
                            }}
                          />
                          <div
                            className={`absolute h-2 w-2 rounded-full ${
                              isStudy ? "bg-emerald-300" : "bg-blue-400"
                            }`}
                            style={{
                              top: "-3px",
                              left: isStudy
                                ? `calc(${textLeft} - 4px)`
                                : `calc(${textLeft} + ${textWidth}px - 4px)`,
                            }}
                          />
                          <div
                            className="absolute text-xs text-[var(--muted)]"
                            style={{
                              left: textLeft,
                              top: "10px",
                              width: `${textWidth}px`,
                            }}
                          >
                            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                              {item.dateLabel}
                            </p>
                            {item.type === "study" ? (
                              item.link ? (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-2 block text-xs font-semibold text-emerald-200 underline hover:text-emerald-100"
                                >
                                  {item.organization}
                                </a>
                              ) : (
                                <p className="mt-2 text-xs font-semibold text-white">
                                  {item.organization}
                                </p>
                              )
                            ) : (
                              <p className="mt-2 text-xs font-semibold text-white">
                                {item.title}
                              </p>
                            )}
                            {item.type !== "study" && item.organization && (
                              item.link ? (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-1 block text-[11px] text-emerald-200 underline hover:text-emerald-100"
                                >
                                  {item.organization}
                                </a>
                              ) : (
                                <p className="mt-1 text-[11px] text-slate-300">
                                  {item.organization}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : section === "blog" ? (
                <section className="space-y-4">
                  {(sectionItems || []).map((item, index) => {
                    const isActive = activeBlogIndex === index;
                    return (
                      <button
                        key={item.title}
                        onClick={() => setActiveBlogIndex(isActive ? -1 : index)}
                        className="w-full text-left rounded-2xl border border-slate-700/40 bg-slate-950/50 p-5"
                      >
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                          <span>{item.date}</span>
                          <span className="font-mono">{item.read}</span>
                        </div>
                        {!isActive && (
                          <h3 className="mt-3 text-lg font-semibold text-white">
                            {item.title}
                          </h3>
                        )}
                        {isActive && (item.content || item.summary) ? (
                          <div className="mt-3 text-sm text-[var(--muted)]">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={markdownComponents}
                            >
                              {item.content || item.summary}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-[var(--muted)]">{item.summary}</p>
                        )}
                      </button>
                    );
                  })}
                </section>
              ) : section === "projects" ? (
                <section className="space-y-4">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={toggleProjectAll}
                      className="text-xs uppercase tracking-[0.18em] text-emerald-200 underline"
                    >
                      {expandedAll ? "Hide all" : "Show all"}
                    </button>
                  </div>
                  {projectList.map((proj) => (
                    <div
                      key={proj.id}
                      className="rounded-2xl border border-slate-700/40 bg-slate-950/50 p-5"
                      onClick={() => toggleProjectExpand(proj.id)}
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                        <span>{proj.type || proj.date}</span>
                        <span className="font-mono">{proj.read}</span>
                      </div>
                      {proj.link !== "#" ? (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 block text-lg font-semibold text-white underline hover:text-emerald-100"
                        >
                          {proj.title}
                        </a>
                      ) : (
                        <h3 className="mt-3 text-lg font-semibold text-white">{proj.title}</h3>
                      )}
                      <p className="mt-2 text-sm text-[var(--muted)]">{proj.summary}</p>

                      {proj.expanded && (
                        <div className="mt-3 border-t border-slate-700/40 pt-3 text-sm text-[var(--muted)] space-y-3">
                          {proj.contributions && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {proj.contributions}
                            </ReactMarkdown>
                          )}
                          {proj.images.length > 0 && (
                            <div className="grid gap-3">
                              {proj.images.map((img, idx) => {
                                const src = `${import.meta.env.BASE_URL}${img}`;
                                return (
                                  <a
                                    key={`${proj.id}-${idx}`}
                                    href={src}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="block"
                                  >
                                    <img
                                      src={src}
                                      alt={`${proj.title} ${idx + 1}`}
                                      className="w-full rounded-xl border border-slate-700/40 bg-slate-950/40"
                                      loading="lazy"
                                    />
                                  </a>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </section>
              ) : (
                <section className="space-y-4">
                  {(sectionItems || []).map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-700/40 bg-slate-950/50 p-5"
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                        <span>{item.meta || item.type || item.date}</span>
                        <span className="font-mono">{item.read}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {item.body || item.summary}
                      </p>
                    </div>
                  ))}
                </section>
              )}
            </>
          )}

          <section className="rounded-3xl border border-slate-700/40 bg-slate-950/50 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Stay connected</p>
            <div className="mt-4 space-y-2 text-sm">
              {(data.socials || []).map((item) => {
                const label = typeof item === "string" ? item : item.label;
                const href = typeof item === "string" ? "#" : item.href || "#";
                return (
                  <a
                    key={label}
                    className="block text-slate-200"
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Web3PageMobile;
