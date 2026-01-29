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
  stats: [
    { label: "Chains", value: "6 live" },
    { label: "Experiments", value: "18 shipped" },
    { label: "Collaborations", value: "9 teams" },
  ],
  posts: [
    {
      title: "Designing trust layers for wallet-first onboarding",
      date: "Jan 12, 2026",
      read: "6 min read",
      link: "#",
    },
  ],
  newsletter: {
    title: "Start a conversation",
    body:
      "Weekly notes on product strategy, on-chain UX, and the quiet work behind strong crypto brands.",
    cta: "Subscribe",
    hint: "No spam. One email per week, always useful.",
  },
  socials: ["Newsletter", "Farcaster", "GitHub"],
};

const Web3PageDesktop = ({ section, slug }) => {
  const [data, setData] = useState(fallbackData);
  const [projectContent, setProjectContent] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [expandedAll, setExpandedAll] = useState(false);
  const [posts, setPosts] = useState(fallbackData.posts);
  const [experienceItems, setExperienceItems] = useState([]);
  const [activeBlogIndex, setActiveBlogIndex] = useState(-1);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}web3/web3-data.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json) => setData(json))
      .catch(() => {
        setData(fallbackData);
      });
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}web3/blog.json`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(() => fallbackData.posts),
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

      const contribIndex = lines.findIndex((l) =>
        l.toLowerCase().startsWith("**key contributions:**")
      );
      const imagesLine = lines.find((l) =>
        l.toLowerCase().startsWith("**images:**")
      );
      const images = imagesLine
        ? imagesLine
            .replace(/\*\*Images:\*\*\s*/i, "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      let contributions = "";
      if (contribIndex !== -1) {
        contributions = lines.slice(contribIndex + 1).join("\n").trim();
      }

      return {
        id: index,
        title,
        link,
        date,
        type,
        tags,
        read,
        description,
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

  useEffect(() => {
    if (!Array.isArray(posts) || posts.length === 0) return;
    setActiveBlogIndex(-1);
  }, [posts]);

  useEffect(() => {
    if (section === "blog" && !slug) {
      setActiveBlogIndex(-1);
    }
  }, [section, slug]);

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

  const handleNavClick = (item) => {
    const label = (item?.label || "").toLowerCase();
    const href = item?.href || "";
    const isBlog =
      label === "blog" || href.includes("/blog") || href.includes("web3/blog");
    if (isBlog) {
      setActiveBlogIndex(-1);
    }
  };

  const sectionData = data.sections?.[section];
  const isSection = Boolean(sectionData);
  const sectionItems =
    section === "projects"
      ? projectList
      : section === "blog"
      ? posts
      : sectionData?.items || [];
  const featuredProjects = projectList.slice(0, 3);

  useEffect(() => {
    if (section !== "blog" || !slug) return;
    const matchIndex = (posts || []).findIndex((post) => post.slug === slug);
    setActiveBlogIndex(matchIndex >= 0 ? matchIndex : -1);
  }, [section, slug, posts]);

  const now = new Date();
  const nowVal = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);

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
    .sort((a, b) => parseDateIndex(a.startDate) - parseDateIndex(b.startDate))
    .map((item) => {
      const startVal = parseDateIndex(item.startDate);
      const endVal = item.endDate ? parseDateIndex(item.endDate) : nowVal;
      return {
        ...item,
        startVal,
        endVal: Math.max(endVal, startVal),
        dateLabel: formatRange(item.startDate, item.endDate),
      };
    });

  const earliestStart = Math.min(...timelineItems.map((item) => item.startVal), nowVal);
  const timelineMin = earliestStart;
  const timelineMax = nowVal;
  const unitPerDay = 2.4; //改时间轴长度
  const timelineHeight = Math.max(800, (timelineMax - timelineMin) * unitPerDay + 120);
  const timelineUnit = unitPerDay;
  const estimateBlockHeight = (item) => {
    const base = 84;
    const titleLen = (item.title || "").length;
    const descLen = (item.description || "").length;
    const charsPerLine = 36;
    const lines = Math.ceil((titleLen + descLen) / charsPerLine);
    return base + lines * 18;
  };

  const markdownComponents = {
    h1: ({ node, ...props }) => (
      <h1 className="text-2xl font-semibold text-white mt-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-semibold text-white mt-4" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-lg font-semibold text-white mt-3" {...props} />
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
        <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-700/40 bg-slate-950/60 p-4 text-sm text-slate-100">
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
          --accent: #80b7ff;
          --accent-2: #7ef0d8;
          --font-sans: "Space Grotesk", "Segoe UI", sans-serif;
          --font-mono: "IBM Plex Mono", "Consolas", monospace;
          font-family: var(--font-sans);
          background: var(--bg);
        }

        .web3-grid {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(63, 129, 255, 0.18), transparent 45%),
            radial-gradient(circle at 80% 0%, rgba(126, 240, 216, 0.12), transparent 40%),
            linear-gradient(180deg, rgba(7, 10, 18, 0.8) 0%, rgba(9, 12, 20, 1) 100%);
        }

        .web3-card {
          background: var(--panel);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(6, 12, 26, 0.6);
          backdrop-filter: blur(12px);
        }

        .web3-chip {
          border: 1px solid rgba(128, 183, 255, 0.3);
          color: var(--accent);
          background: rgba(128, 183, 255, 0.08);
        }

        .web3-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.4), transparent);
        }

        .reveal {
          opacity: 0;
          transform: translateY(18px);
          animation: rise 700ms ease forwards;
        }

        @keyframes rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="web3-grid relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-24 left-12 h-48 w-48 rounded-full bg-blue-400 blur-[120px]" />
          <div className="absolute bottom-0 right-16 h-56 w-56 rounded-full bg-emerald-300 blur-[140px]" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-16 pt-12 lg:flex-row lg:items-start lg:gap-10 lg:px-10">
          <aside
            className="web3-card reveal flex-none w-full rounded-3xl p-8 lg:sticky lg:top-8 lg:h-fit lg:w-[320px] lg:max-w-[320px]"
            style={{ animationDelay: "120ms" }}
          >
            <a
              href={`${resolvedBase}#/web3`}
              className="flex items-center gap-4 rounded-2xl transition hover:bg-white/5"
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white text-slate-900 shadow-lg">
                <img
                  src={`${import.meta.env.BASE_URL}head_web3.png`}
                  alt={`${data.profile?.name || "Web3"} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-2xl font-semibold">{data.profile?.name}</p>
                <p className="text-sm text-[var(--muted)]">{data.profile?.title}</p>
              </div>
            </a>

            <div className="mt-6 rounded-2xl border border-slate-700/40 bg-slate-950/40 p-4 text-sm text-[var(--muted)]">
              {data.profile?.tagline}
            </div>

            <div className="web3-divider my-6" />

            <nav className="space-y-4 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={resolveHref(item.href)}
                  onClick={() => handleNavClick(item)}
                  className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-slate-200 transition hover:border-slate-600/60 hover:bg-white/5"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[var(--muted)]">View</span>
                </a>
              ))}
            </nav>

            <div className="web3-divider my-6" />

            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Stay connected
              </p>
              {(data.socials || []).map((item) => {
                const label = typeof item === "string" ? item : item.label;
                const href = typeof item === "string" ? "#" : item.href || "#";
                return (
                  <a
                    key={label}
                    className="block text-slate-200 hover:text-white"
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </aside>

          <main className="flex-1 min-w-0 space-y-8">
            {!isSection && (
              <>
                <section
                  className="web3-card reveal rounded-3xl p-8"
                  style={{ animationDelay: "200ms" }}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
                      Web3 garden
                    </span>
                    <span className="rounded-full border border-blue-300/30 bg-blue-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-blue-200">
                      2026 drop
                    </span>
                  </div>
                  <h1 className="mt-5 text-4xl font-semibold leading-tight lg:text-5xl">
                    {data.profile?.tagline}
                  </h1>
                  <p className="mt-4 text-lg text-[var(--muted)]">
                    I build interfaces that make Web3 feel human: quiet dashboards, clear proof flows,
                    and narratives that explain the technology without the noise.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                    <button className="rounded-full bg-white px-5 py-2 font-medium text-slate-900 shadow-lg shadow-white/10">
                      View projects
                    </button>
                    <button className="rounded-full border border-slate-700/70 px-5 py-2 text-slate-200 hover:border-slate-500">
                      Read the blog
                    </button>
                  </div>
                </section>

                <section
                  className="web3-card reveal rounded-3xl p-8"
                  style={{ animationDelay: "360ms" }}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Featured projects</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Lab notebook
                    </span>
                  </div>
                  <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {featuredProjects.map((project) => (
                      <a
                        key={project.id ?? project.title}
                        href={project.link}
                        className="group rounded-2xl border border-slate-700/40 bg-slate-950/40 p-5 transition hover:border-blue-400/50 hover:bg-white/5"
                      >
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                          <span>{project.type || project.date || "Project"}</span>
                          {project.link && project.link !== "#" && (
                            <span className="font-mono">Open</span>
                          )}
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                        {(project.summary || project.description) && (
                          <p className="mt-2 text-sm text-[var(--muted)]">
                            {project.summary || project.description}
                          </p>
                        )}
                        {project.tags?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                            {project.tags.map((tag) => (
                              <span key={tag} className="web3-chip rounded-full px-3 py-1">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                </section>

                <section
                  className="web3-card reveal rounded-3xl p-8"
                  style={{ animationDelay: "430ms" }}
                >
                  <h2 className="text-2xl font-semibold">Latest writing</h2>
                  <div className="mt-6 space-y-4">
                    {(posts || []).map((post) => (
                      <a
                        key={post.title}
                        href={resolveHref(post.link)}
                        className="flex flex-col gap-2 rounded-2xl border border-slate-700/40 bg-slate-950/40 p-4 transition hover:border-emerald-300/40 hover:bg-white/5"
                      >
                        <p className="text-lg font-medium">{post.title}</p>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                          <span>{post.date}</span>
                          <span className="h-1 w-1 rounded-full bg-slate-600" />
                          <span>{post.read}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              </>
            )}

            {isSection && (
              <>
                <section
                  className="web3-card reveal rounded-3xl p-8"
                  style={{ animationDelay: "200ms" }}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="rounded-full border border-blue-300/30 bg-blue-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-blue-200">
                      {sectionData.badge || "Web3 entry"}
                    </span>
                  </div>
                  <h1 className="mt-5 text-4xl font-semibold leading-tight lg:text-5xl">
                    {sectionData.title}
                  </h1>
                  <p className="mt-4 text-lg text-[var(--muted)]">{sectionData.summary}</p>
                </section>

                {section === "blog" ? (
                  <section
                    className="web3-card reveal rounded-3xl p-8"
                    style={{ animationDelay: "260ms" }}
                  >
                    <div
                      className={`grid gap-6 ${
                        activeBlogIndex === -1
                          ? "lg:grid-cols-1"
                          : "lg:grid-cols-[0.6fr_1.6fr]"
                      }`}
                    >
                      <div
                        className={`space-y-4 ${
                          activeBlogIndex === -1
                            ? ""
                            : "max-h-[520px] overflow-y-auto pr-2"
                        }`}
                      >
                        {(sectionItems || []).map((item, index) => (
                          <button
                            key={item.title}
                            onClick={() => setActiveBlogIndex(index)}
                            className={`w-full text-left rounded-2xl border px-5 py-4 transition ${
                              activeBlogIndex === index
                                ? "border-emerald-300/60 bg-emerald-300/10"
                                : "border-slate-700/40 bg-slate-950/40 hover:border-slate-500/60"
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                              <span>{item.date}</span>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-white">
                              {activeBlogIndex === -1 ? item.title : item.titleLeft || item.title}
                            </h3>
                            {activeBlogIndex === -1 && (
                              <p className="mt-2 text-sm text-[var(--muted)]">{item.summary}</p>
                            )}
                          </button>
                        ))}
                      </div>

                      {sectionItems?.[activeBlogIndex] && (
                        <div className="rounded-2xl border border-slate-700/40 bg-slate-950/40 p-6">
                          <>
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                              <span>{sectionItems[activeBlogIndex].date}</span>
                            </div>
                            <div className="mt-4 text-sm text-[var(--muted)]">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={markdownComponents}
                              >
                                {sectionItems[activeBlogIndex].content ||
                                  sectionItems[activeBlogIndex].summary}
                              </ReactMarkdown>
                            </div>
                          </>
                        </div>
                      )}
                    </div>
                  </section>
                ) : section === "projects" ? (
                  <section
                    className="web3-card reveal rounded-3xl p-8"
                    style={{ animationDelay: "260ms" }}
                  >
                    <div className="flex items-center justify-end">
                      <button
                        onClick={toggleProjectAll}
                        className="text-xs uppercase tracking-[0.18em] text-emerald-200 underline"
                      >
                        {expandedAll ? "Hide all" : "Show all"}
                      </button>
                    </div>

                    <div className="mt-6 space-y-4">
                      {projectList.map((proj) => (
                        <div
                          key={proj.id}
                          className="rounded-2xl border border-slate-700/40 bg-slate-950/40 p-5 transition hover:border-slate-500/60"
                          onClick={() => toggleProjectExpand(proj.id)}
                        >
                          {proj.link !== "#" ? (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-lg font-semibold text-white underline hover:text-emerald-100"
                            >
                              {proj.title}
                            </a>
                          ) : (
                            <h3 className="text-lg font-semibold text-white">{proj.title}</h3>
                          )}

                          {proj.date && (
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                              {proj.date}
                            </p>
                          )}
                          {proj.description && (
                            <p className="mt-3 text-sm text-[var(--muted)]">{proj.description}</p>
                          )}

                          {proj.expanded && (
                            <div className="mt-4 border-t border-slate-700/40 pt-4 text-sm text-[var(--muted)] space-y-4">
                              {proj.contributions && (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {proj.contributions}
                                </ReactMarkdown>
                              )}

                              {proj.images.length > 0 && (
                                <div className="grid gap-3 md:grid-cols-2">
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
                      {projectList.length === 0 && (
                        <p className="text-sm text-[var(--muted)]">
                          No projects found in projects.md.
                        </p>
                      )}
                    </div>
                  </section>
                ) : section === "experience" ? (
                  <section
                    className="web3-card reveal rounded-3xl p-8"
                    style={{ animationDelay: "260ms" }}
                  >
                    <div className="relative">
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
                          const barWidth = 50;
                          const barLeft = isStudy
                            ? `calc(50% - ${barWidth}px - 18px)`
                            : `calc(50% + 18px)`;
                          const lineLeft = isStudy ? "calc(50% - 18px)" : "calc(50% + 18px)";
                          const textWidth = 280;
                          const lineLength = 320;
                          const barCenter = isStudy
                            ? `calc(50% - 18px - ${barWidth / 2}px)`
                            : `calc(50% + 18px + ${barWidth / 2}px)`;
                          const lineEnd = isStudy
                            ? `calc(${barCenter} - ${lineLength}px)`
                            : `calc(${barCenter} + ${lineLength}px)`;
                          const textLeft = isStudy
                            ? lineEnd
                            : `calc(${lineEnd} - ${textWidth}px)`;

                          return (
                            <div
                              key={`${item.title}-${index}`}
                              className="absolute left-0 right-0"
                              style={{ top: `${barTop}px`, height: `${duration}px` }}
                            >
                              <div
                                className={`absolute ${barColor} rounded-xl`}
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
                                className="absolute h-2 w-2 rounded-full bg-emerald-300"
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
                                  top: "12px",
                                  width: `${textWidth}px`,
                                }}
                              >
                                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                                  {item.dateLabel}
                                </p>
                                {item.type === "study" ? (
                                  item.link ? (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mt-2 block text-sm font-semibold text-emerald-200 underline hover:text-emerald-100"
                                    >
                                      {item.organization}
                                    </a>
                                  ) : (
                                    <p className="mt-2 text-sm font-semibold text-white">
                                      {item.organization}
                                    </p>
                                  )
                                ) : (
                                  <p className="mt-2 text-sm font-semibold text-white">{item.title}</p>
                                )}
                                {item.type !== "study" && item.organization && (
                                  item.link ? (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mt-1 block text-xs text-emerald-200 underline hover:text-emerald-100"
                                    >
                                      {item.organization}
                                    </a>
                                  ) : (
                                    <p className="mt-1 text-xs text-slate-300">{item.organization}</p>
                                  )
                                )}
                                <p className="mt-2 text-xs text-[var(--muted)] whitespace-pre-line">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                ) : (
                  <section
                    className="web3-card reveal rounded-3xl p-8"
                    style={{ animationDelay: "260ms" }}
                  >
                    <div className="space-y-4">
                      {(sectionItems || []).map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-slate-700/40 bg-slate-950/40 p-5"
                        >
                          <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                            <span>{item.meta || item.type || item.date}</span>
                            <span className="font-mono">{item.read}</span>
                          </div>
                          <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                          <p className="mt-2 text-sm text-[var(--muted)]">
                            {item.body || item.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Web3PageDesktop;
