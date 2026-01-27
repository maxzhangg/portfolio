import React, { useEffect, useState } from "react";

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
  projects: [
    {
      title: "ProofKit",
      type: "ZK Protocol",
      summary:
        "Privacy-preserving proofs for on-chain identity flows with a clean, auditable API surface.",
      tags: ["ZK", "Circom", "Rust"],
      link: "#",
    },
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

const Web3PageDesktop = ({ section }) => {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}web3/web3-data.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json) => setData(json))
      .catch(() => {
        setData(fallbackData);
      });
  }, []);

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

        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-16 pt-12 lg:flex-row lg:gap-10 lg:px-10">
          <aside
            className={`web3-card reveal w-full max-w-xl rounded-3xl p-8 ${
              isSection ? "lg:relative lg:top-0 lg:w-[260px]" : "lg:sticky lg:top-8 lg:h-fit lg:w-[320px]"
            }`}
            style={{ animationDelay: "120ms" }}
          >
            <div className="flex items-center gap-4">
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
            </div>

            <div className="mt-6 rounded-2xl border border-slate-700/40 bg-slate-950/40 p-4 text-sm text-[var(--muted)]">
              {data.profile?.tagline}
            </div>

            <div className="web3-divider my-6" />

            <nav className="space-y-4 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={resolveHref(item.href)}
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
              {(data.socials || []).map((item) => (
                <a key={item} className="block text-slate-200 hover:text-white" href="#">
                  {item}
                </a>
              ))}
            </div>
          </aside>

          <main className="flex-1 space-y-8">
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

                <section className="grid gap-4 md:grid-cols-3">
                  {(data.stats || []).map((item, index) => (
                    <div
                      key={item.label}
                      className="web3-card reveal rounded-2xl px-5 py-4 text-sm"
                      style={{ animationDelay: `${260 + index * 60}ms` }}
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                        {item.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                    </div>
                  ))}
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
                    {(data.projects || []).map((project) => (
                      <a
                        key={project.title}
                        href={project.link}
                        className="group rounded-2xl border border-slate-700/40 bg-slate-950/40 p-5 transition hover:border-blue-400/50 hover:bg-white/5"
                      >
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                          <span>{project.type}</span>
                          <span className="font-mono">Open</span>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                        <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                          {(project.tags || []).map((tag) => (
                            <span key={tag} className="web3-chip rounded-full px-3 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </a>
                    ))}
                  </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div
                    className="web3-card reveal rounded-3xl p-8"
                    style={{ animationDelay: "430ms" }}
                  >
                    <h2 className="text-2xl font-semibold">Latest writing</h2>
                    <div className="mt-6 space-y-4">
                      {(data.posts || []).map((post) => (
                        <a
                          key={post.title}
                          href={post.link}
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
                  </div>

                  <div
                    className="web3-card reveal rounded-3xl p-8"
                    style={{ animationDelay: "480ms" }}
                  >
                    <h2 className="text-2xl font-semibold">{data.newsletter?.title}</h2>
                    <p className="mt-3 text-sm text-[var(--muted)]">{data.newsletter?.body}</p>
                    <div className="mt-6 space-y-3">
                      <input
                        className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                        placeholder="Email address"
                      />
                      <button className="w-full rounded-2xl bg-gradient-to-r from-blue-400 to-emerald-300 px-4 py-3 text-sm font-semibold text-slate-900">
                        {data.newsletter?.cta}
                      </button>
                      <p className="text-xs text-[var(--muted)]">{data.newsletter?.hint}</p>
                    </div>
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

                <section className="web3-card reveal rounded-3xl p-8" style={{ animationDelay: "260ms" }}>
                  <div className="space-y-4">
                    {(sectionData.items || []).map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-slate-700/40 bg-slate-950/40 p-5"
                      >
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                          <span>{item.meta}</span>
                          <span className="font-mono">{item.read}</span>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Web3PageDesktop;
