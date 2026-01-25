import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

/* ---------------- ANIMATED TEXT WITH FADE (DESKTOP) ---------------- */

export default function FadeText({ children, scrollRange = [0, 0.15], noFade = false }) {
  const scroll = useScroll();
  const ref = useRef();

  useFrame(() => {
    if (noFade) return;

    const [start, end] = scrollRange;
    const offset = scroll.offset;

    let p = 0;
    if (offset >= start && offset <= end) {
      p = (offset - start) / (end - start);
    } else if (offset > end) p = 1;

    if (ref.current) {
      ref.current.style.opacity = p;
      ref.current.style.transform = `translateY(${(1 - p) * 20}px)`;
    }
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: noFade ? 1 : 0,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
