import { Html } from "@react-three/drei";

export default function Loader() {
  return (
    <Html center zIndexRange={[100, 0]}>
      <div
        className="scroll-text"
        style={{
          fontSize: "3rem",
          letterSpacing: "0.08em",
          opacity: 0.9,
          animation: "fadeIn 1.2s ease forwards",
        }}
      >
        Loading…
      </div>
    </Html>
  );
}
