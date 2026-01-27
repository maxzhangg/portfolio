import React, { useEffect, useState } from "react";

const fallbackData = {
  profile: {
    name: "Max Zhang",
    title: "Web3 product designer / builder",
    tagline:
      "A calm home for on-chain experiments, shipping notes, and product launches.",
  },
  nav: ["About", "Projects", "Blog", "Research", "Contact"],
  sections: {},
  socials: ["Newsletter", "Farcaster", "GitHub"],
};

const Web3PageMobile = ({ section }) => {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}web3/web3-data.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json) => setData(json))
      .catch(() => setData(fallbackData));
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

              <section className="space-y-4">
                {(sectionData.items || []).map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-700/40 bg-slate-950/50 p-5"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                      <span>{item.meta}</span>
                      <span className="font-mono">{item.read}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                  </div>
                ))}
              </section>
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
