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
  projects: [
    {
      title: "ProofKit",
      type: "ZK Protocol",
      summary:
        "Privacy-preserving proofs for on-chain identity flows with a clean, auditable API surface.",
      read: "Case study",
    },
  ],
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
  const [projects, setProjects] = useState(fallbackData.projects || []);
  const [posts, setPosts] = useState(fallbackData.posts || []);
  const [experienceItems, setExperienceItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}web3/web3-data.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json) => setData(json))
      .catch(() => setData(fallbackData));
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}web3/projects.json`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(() => fallbackData.projects || []),
      fetch(`${import.meta.env.BASE_URL}web3/blog.json`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(() => fallbackData.posts || []),
      fetch(`${import.meta.env.BASE_URL}web3/experience.json`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(() => []),
    ]).then(([projectsData, postsData, experienceData]) => {
      setProjects(projectsData);
      setPosts(postsData);
      setExperienceItems(experienceData);
    });
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
      ? projects
      : section === "blog"
      ? posts
      : sectionData?.items || [];

  const monthMap = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    sept: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };

  const parseTimelinePoint = (value = "") => {
    if (!value) return 0;
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}$/.test(trimmed)) {
      const [y, m] = trimmed.split("-");
      return Number(y) * 12 + Number(m);
    }
    if (/^\d{4}$/.test(trimmed)) {
      return Number(trimmed) * 12;
    }
    const monthMatch = trimmed.match(/([A-Za-z]+)\s+(\d{4})/);
    if (monthMatch) {
      const month = monthMap[monthMatch[1].toLowerCase()] || 1;
      const year = Number(monthMatch[2]) || 0;
      return year * 12 + month;
    }
    const yearMatch = trimmed.match(/(\d{4})/);
    if (yearMatch) {
      return Number(yearMatch[1]) * 12;
    }
    return 0;
  };

  const formatTimelinePoint = (value = "") => {
    if (!value) return "";
    if (/^\d{4}-\d{2}$/.test(value)) {
      const [y, m] = value.split("-");
      const monthName = Object.keys(monthMap).find((key) => monthMap[key] === Number(m));
      if (!monthName) return `${y}-${m}`;
      return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${y}`;
    }
    return value;
  };

  const formatTimelineRange = (start, end, fallback) => {
    if (start || end) {
      const startLabel = formatTimelinePoint(start);
      const endLabel = formatTimelinePoint(end);
      return endLabel ? `${startLabel} - ${endLabel}` : startLabel;
    }
    return fallback || "";
  };

  const sortedExperience = [...(experienceItems || [])].sort((a, b) => {
    const aEnd = parseTimelinePoint(a.end || a.date);
    const bEnd = parseTimelinePoint(b.end || b.date);
    if (bEnd !== aEnd) return bEnd - aEnd;
    const aStart = parseTimelinePoint(a.start || a.date);
    const bStart = parseTimelinePoint(b.start || b.date);
    return bStart - aStart;
  });

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
              <section className="rounded-3xl border border-slate-700/40 bg-slate-950/50 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-200">
                  {sectionData.badge}
                </p>
                <h1 className="mt-3 text-2xl font-semibold">{sectionData.title}</h1>
                <p className="mt-3 text-sm text-[var(--muted)]">{sectionData.summary}</p>
              </section>

              {section === "experience" ? (
                <section className="space-y-4">
                  {sortedExperience.map((item, index) => {
                    const dateLabel = formatTimelineRange(item.start, item.end, item.date);
                    return (
                    <div
                      key={`${item.title}-${index}`}
                      className="rounded-2xl border border-slate-700/40 bg-slate-950/50 p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                        {dateLabel}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-[var(--muted)]">{item.org}</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                    </div>
                    );
                  })}
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
                      <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                      {section === "blog" && item.content ? (
                        <div className="mt-3 text-sm text-[var(--muted)]">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                          >
                            {item.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          {item.body || item.summary}
                        </p>
                      )}
                    </div>
                  ))}
                </section>
              )}
            </>
          )}

          <section className="rounded-3xl border border-slate-700/40 bg-slate-950/50 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Stay connected</p>
            <div className="mt-4 space-y-2 text-sm">
              {(data.socials || []).map((item) => (
                <a key={item} className="block text-slate-200" href="#">
                  {item}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Web3PageMobile;
