import { useEffect, useState } from "react";
import { useScroll } from "@react-three/drei";
import Button from "react-bootstrap/Button";

/* ---------------- GET THE APP BUTTON ANIMATION ---------------- */

export default function AnimatedCTA() {
  const scroll = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerWidth < 768 ? 0.8 : 0.85;
      if (scroll.offset > threshold) setVisible(true);
    };

    scroll.el.addEventListener("scroll", onScroll);
    return () => scroll.el.removeEventListener("scroll", onScroll);
  }, [scroll]);

  return (
    <Button
      variant="outline-light"
      size="lg"
      className={`get-app-btn ${visible ? "visible" : ""}`}
    >
      Get the App
    </Button>
  );
}
