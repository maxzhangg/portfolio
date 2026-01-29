import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#f6f3ef] text-[#1a1916]"
      style={{ fontFamily: "Sora, 'Noto Sans SC', system-ui, sans-serif" }}
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap");
        :root {
          --ink: #1a1916;
          --muted: #5a5650;
          --line: #e3ddd4;
          --paper: #f6f3ef;
          --accent: #0f5e4f;
          --accent-soft: rgba(15, 94, 79, 0.16);
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .glass-card {
          box-sizing: border-box;
          width: 100%;
          min-height: 150px;
          background: rgba(230, 230, 230, 0.55);
          border: 1px solid #ffffff;
          box-shadow: 8px 12px 32px rgba(0, 0, 0, 0.14);
          backdrop-filter: blur(6px);
          border-radius: 17px;
          text-align: center;
          cursor: pointer;
          transition: all 0.5s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
          font-weight: 600;
          color: #161512;
          padding: 18px 20px;
          gap: 8px;
        }
        .glass-card:hover {
          border: 1px solid #161512;
          transform: scale(1.02);
        }
        .glass-card:active {
          transform: scale(0.98) rotateZ(1deg);
        }
        .pill-button {
          all: unset;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          position: relative;
          border-radius: 100em;
          background-color: rgba(0, 0, 0, 0.7);
          box-shadow:
            -0.12em -0.12em 0.12em -0.06em rgba(5, 5, 5, 0.16),
            0.03em 0.03em 0.06em 0 rgba(5, 5, 5, 0.1);
          font-size: 14px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .pill-button::after {
          content: "";
          position: absolute;
          z-index: 0;
          width: calc(100% + 0.3em);
          height: calc(100% + 0.3em);
          top: -0.15em;
          left: -0.15em;
          border-radius: inherit;
          background: linear-gradient(
            -135deg,
            rgba(5, 5, 5, 0.3),
            transparent 20%,
            transparent 100%
          );
          filter: blur(0.0125em);
          opacity: 0.2;
          mix-blend-mode: multiply;
        }
        .pill-button .button-outer {
          position: relative;
          z-index: 1;
          border-radius: inherit;
          transition: box-shadow 300ms ease;
          will-change: box-shadow;
          box-shadow:
            0 0.04em 0.04em -0.01em rgba(5, 5, 5, 0.6),
            0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.3),
            0.12em 0.24em 0.09em -0.01em rgba(5, 5, 5, 0.14);
          display: block;
        }
        .pill-button:hover .button-outer {
          box-shadow:
            0 0 0 0 rgba(5, 5, 5, 0.6),
            0 0 0 0 rgba(5, 5, 5, 0.3),
            0 0 0 0 rgba(5, 5, 5, 0.14);
        }
        .button-inner {
          --inset: 0.035em;
          position: relative;
          z-index: 1;
          border-radius: inherit;
          padding: 0.85em 1.8em;
          background-image: linear-gradient(
            135deg,
            rgba(252, 252, 252, 1),
            rgba(210, 210, 210, 1)
          );
          transition:
            box-shadow 300ms ease,
            clip-path 250ms ease,
            background-image 250ms ease,
            transform 250ms ease;
          will-change: box-shadow, clip-path, background-image, transform;
          overflow: clip;
          clip-path: inset(0 0 0 0 round 100em);
          box-shadow:
            0 0 0 0 inset rgba(5, 5, 5, 0.06),
            -0.04em -0.04em 0.05em 0 inset rgba(5, 5, 5, 0.16),
            0 0 0 0 inset rgba(5, 5, 5, 0.06),
            0 0 0.05em 0.18em inset rgba(255, 255, 255, 0.26),
            0.02em 0.04em 0.09em 0 inset rgba(255, 255, 255, 0.9),
            0.1em 0.1em 0.1em inset rgba(255, 255, 255, 0.2),
            -0.06em -0.22em 0.22em 0.09em inset rgba(5, 5, 5, 0.16);
          display: block;
        }
        .pill-button:hover .button-inner {
          clip-path: inset(
            clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px)
              clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px) round 100em
          );
          box-shadow:
            0.09em 0.12em 0.05em 0 inset rgba(5, 5, 5, 0.45),
            -0.02em -0.025em 0.05em 0.02em inset rgba(5, 5, 5, 0.3),
            0.22em 0.22em 0.18em 0 inset rgba(5, 5, 5, 0.28),
            0 0 0.05em 0.45em inset rgba(255, 255, 255, 0.14),
            0 0 0 0 inset rgba(255, 255, 255, 1),
            0.1em 0.1em 0.1em inset rgba(255, 255, 255, 0.2),
            -0.06em -0.1em 0.18em 0.09em inset rgba(5, 5, 5, 0.2);
        }
        .pill-button .button-inner span {
          position: relative;
          z-index: 4;
          font-family: "Sora", "Noto Sans SC", system-ui, sans-serif;
          letter-spacing: 0.24em;
          font-weight: 600;
          color: rgba(0, 0, 0, 0);
          background-image: linear-gradient(
            135deg,
            rgba(20, 20, 20, 1),
            rgba(80, 80, 80, 1)
          );
          -webkit-background-clip: text;
          background-clip: text;
          transition: transform 250ms ease;
          display: block;
          will-change: transform;
          text-shadow: rgba(0, 0, 0, 0.1) 0 0 0.1em;
          user-select: none;
          text-transform: uppercase;
          font-size: 0.7rem;
        }
        .pill-button:hover .button-inner span {
          transform: scale(0.975);
        }
        .pill-button:active .button-inner {
          transform: scale(0.975);
        }
        .now-card {
          width: 100%;
          background: rgb(238, 238, 238);
          box-shadow:
            rgba(0, 0, 0, 0.2) 0px 2px 4px,
            rgba(0, 0, 0, 0.16) 0px 7px 13px -3px,
            rgba(0, 0, 0, 0.1) 0px -3px 0px inset;
          border-radius: 22px;
          padding: 22px;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-64 w-64 rounded-full bg-[#f6e3d2] blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 h-72 w-72 rounded-full bg-[#d9ede4] blur-3xl" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(17,16,14,0.12) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 pb-12 pt-16">
        <header className="flex flex-col gap-6" style={{ animation: "fadeUp 0.5s ease both" }}>
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#5f5b55]">
            <span className="rounded-full border border-[#e0d9ce] bg-[#f7f3ee] px-2.5 py-0.5">
              Engineer
            </span>
            <span className="rounded-full border border-[#e0d9ce] bg-[#f7f3ee] px-2.5 py-0.5">
              Web3 Learner
            </span>
            <span className="rounded-full border border-[#e0d9ce] bg-[#f7f3ee] px-2.5 py-0.5">
              Builder
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Max Zhang</h1>
            <p className="text-base leading-7 text-[var(--muted)]">
              I build small, real things while learning Web3 in public — prototypes, notes, and
              experiments that connect engineering habits with new networks.
            </p>
            <p className="text-xs text-[#6f6a63]">
              我是工程背景的实践者，专注 Web3 的学习与构建，记录过程，也留下影像。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate("/resume")} className="pill-button">
              <span className="button-outer">
                <span className="button-inner">
                  <span>Resume</span>
                </span>
              </span>
            </button>
            <button onClick={() => navigate("/web3")} className="pill-button">
              <span className="button-outer">
                <span className="button-inner">
                  <span>Projects</span>
                </span>
              </span>
            </button>
          </div>
        </header>

        <section
          className="mt-12 space-y-4 border-y border-[var(--line)] py-8"
          style={{ animation: "fadeUp 0.6s ease both", animationDelay: "0.08s" }}
        >
          <button onClick={() => navigate("/resume")} className="glass-card">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#3f3c36]">Resume</div>
            <h2 className="text-base font-semibold">Education, experience, skills.</h2>
            <p className="text-sm text-[#5b5852]">
              For hiring teams or collaborators who want the crisp version.
            </p>
          </button>
          <button onClick={() => navigate("/web3")} className="glass-card">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#3f3c36]">Web3</div>
            <h2 className="text-base font-semibold">Learning in public.</h2>
            <p className="text-sm text-[#5b5852]">
              Notes, experiments, and prototypes that show how I think.
            </p>
          </button>
          <button onClick={() => navigate("/photographer")} className="glass-card">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#3f3c36]">Photography</div>
            <h2 className="text-base font-semibold">A quieter dimension.</h2>
            <p className="text-sm text-[#5b5852]">
              A visual counterbalance to engineering — how I see and feel.
            </p>
          </button>
        </section>

        <section
          className="mt-10 space-y-4"
          style={{ animation: "fadeUp 0.7s ease both", animationDelay: "0.16s" }}
        >
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
            <span className="h-px w-8 bg-[var(--line)]" />
            What I'm doing now
          </div>
          <div className="now-card">
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>Exploring Web3 at my own pace, learning by building small projects.</li>
              <li>Experimenting with ideas that feel interesting and useful.</li>
              <li>Preparing for the next step in my technical career.</li>
            </ul>
          </div>
        </section>

        <footer
          className="mt-10 flex flex-col gap-3 border-t border-[var(--line)] pt-8 text-sm text-[var(--muted)]"
          style={{ animation: "fadeUp 0.8s ease both", animationDelay: "0.22s" }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => (window.location.href = "mailto:max@example.com")} className="pill-button">
              <span className="button-outer">
                <span className="button-inner">
                  <span>Email</span>
                </span>
              </span>
            </button>
            <span>Open to thoughtful conversations and builder collaborations.</span>
          </div>
          <p className="text-xs">
            Thanks for stopping by — if something here resonates, I’d love to hear from you.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
