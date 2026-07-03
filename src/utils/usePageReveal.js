import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const usePageReveal = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.set(".hero-reveal, .scroll-reveal", {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
            return undefined;
          }

          gsap.from(".hero-reveal", {
            autoAlpha: 0,
            y: 18,
            duration: 0.72,
            ease: "power3.out",
            stagger: 0.08,
          });

          gsap.utils.toArray(".scroll-reveal").forEach((element) => {
            gsap.from(element, {
              autoAlpha: 0,
              y: 24,
              duration: 0.68,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 84%",
                once: true,
              },
            });
          });

          return undefined;
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return scope;
};
