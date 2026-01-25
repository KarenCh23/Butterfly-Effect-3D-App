import { useEffect, useRef } from "react";

/* ---------------- ANIMATED TEXT WITH FADE (MOBILE / TABLETS) ---------------- */

export default function FadeMobile({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="fade-mobile">
      {children}
    </div>
  );
}
