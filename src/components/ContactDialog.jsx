import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const EMAIL = "maxzhangggg@gmail.com";
const MEETING_URL = "https://cal.com/maxzhang0/meeting-with-max";

const ContactContext = createContext(null);

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  if (!copied) throw new Error("Copy command failed");
};

const ContactDialog = ({ open, onClose }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    if (!open) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setCopyState("idle");
  }, [open]);

  const handleCopy = async () => {
    try {
      await copyText(EMAIL);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#111111]/55 p-0 backdrop-blur-[3px] sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        className="contact-dialog-enter max-h-[calc(100svh-1rem)] w-full max-w-3xl overflow-y-auto border border-[#dedbd4] bg-white text-[#111111] shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:max-h-[calc(100svh-3rem)]"
      >
        <div className="flex items-center justify-between border-b border-[#dedbd4] px-5 py-4 sm:px-7">
          <p className="studio-label">Contact / Max Zhang</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="text-xs font-semibold uppercase text-[#66615b] underline decoration-[#dedbd4] underline-offset-4 transition hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f5e4f]"
          >
            Close
          </button>
        </div>

        <div className="px-5 py-7 sm:px-7 sm:py-9">
          <h2
            id="contact-dialog-title"
            className="max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl"
          >
            Let&apos;s make something useful.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#56514a] sm:text-base">
            Send a note directly, or choose a time that works for you.
          </p>
        </div>

        <div className="grid border-t border-[#dedbd4] md:grid-cols-2">
          <div className="flex min-h-52 flex-col justify-between gap-8 p-5 sm:p-7">
            <div>
              <p className="studio-label">Email / Direct</p>
              <p className="mt-4 break-all text-xl font-semibold sm:text-2xl">
                {EMAIL}
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={handleCopy}
                className="studio-button w-full sm:w-auto"
              >
                {copyState === "copied" ? "Email copied ✓" : "Copy email"}
              </button>
              <p className="mt-3 min-h-5 text-xs text-[#66615b]" aria-live="polite">
                {copyState === "copied" && "Ready to paste into your email app."}
                {copyState === "error" && `Copy failed — select ${EMAIL} above.`}
              </p>
            </div>
          </div>

          <div className="flex min-h-52 flex-col justify-between gap-8 border-t border-[#0b4d42] bg-[#0f5e4f] p-5 text-white md:border-l md:border-t-0 sm:p-7">
            <div>
              <p className="text-[0.72rem] font-bold uppercase text-white/65">
                Calendar / Meeting
              </p>
              <p className="mt-4 text-2xl font-semibold">
                Pick a time to talk.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/72">
                Open my calendar and book the time that suits you.
              </p>
            </div>
            <a
              href={MEETING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center border border-white bg-white px-4 py-3 text-sm font-bold text-[#0f5e4f] transition hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-fit"
            >
              Book a meeting ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ContactProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ContactContext.Provider value={{ openContact: () => setOpen(true) }}>
      {children}
      <ContactDialog open={open} onClose={() => setOpen(false)} />
    </ContactContext.Provider>
  );
};

export const ContactButton = ({ children, className = "", ...props }) => {
  const contact = useContext(ContactContext);

  if (!contact) {
    throw new Error("ContactButton must be used inside ContactProvider");
  }

  return (
    <button
      type="button"
      onClick={contact.openContact}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};
