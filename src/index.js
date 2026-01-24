import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import logo from "./butterfly_logo.png";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

function Root() {
  const [fadeOut, setFadeOut] = useState(false);
  const isMobile = window.innerWidth <= 1024;

  useEffect(() => {
    const t = setTimeout(() => setFadeOut(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* LOGO */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      {/* FADE CINÉMATIQUE */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#000",
          zIndex: 10,
          pointerEvents: "none",
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 1.2s ease-in-out",
        }}
      />

      {/* CANVAS UNIQUE */}
      <Canvas
        style={{ background: "#000000" }}
        camera={{
          position: isMobile ? [1.8, 0, 7] : [0, 0, 10],
          fov: isMobile ? 105 : 45,
        }}
      >
        <App />
      </Canvas>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);




