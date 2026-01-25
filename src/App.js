import "./App.css";
import { Suspense, useEffect, useState } from "react";
import { ScrollControls, Scroll, Environment, Float } from "@react-three/drei";

import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
} from "@react-three/postprocessing";

/* Hooks */
import useIsMobile from "./hooks/useIsMobile";

/* Components */
import Loader from "./components/Loader";
import BlurredButterfly from "./components/BlurredButterfly";

/* Layouts (HTML Scroll) */
import ScrollTextMobile from "./layouts/ScrollTextMobile";
import ScrollTextDesktop from "./layouts/ScrollTextDesktop";

/* ---------------- APP / SCENE ---------------- */

export default function App() {
  const [effectsReady, setEffectsReady] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setEffectsReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Positions adaptatives selon mobile/desktop
  const positions = isMobile
    ? {
        pages: 4,
        row2: "75vh",
        row3: "140vh",
        row4: "210vh",
        row5: "275vh",
        row6: "330vh",
      }
    : {
        pages: 6,
        row2: "100vh",
        row3: "190vh",
        row4: "300vh",
        row5: "400vh",
        row6: "460vh",
      };

  return (
    <Suspense fallback={<Loader />}>
      {/* LIGHTS */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.3}
        castShadow={false}
      />

      {/* Lumières d'appoint très subtiles pour ne pas blanchir */}
      <pointLight
        position={[0, -10, 3]}
        intensity={0.1}
        color="#ffffff"
        distance={15}
      />
      <pointLight
        position={[0, -25, 3]}
        intensity={0.1}
        color="#e6f2ff"
        distance={20}
      />

      {/* ENV + FX AFTER LOAD */}
      {effectsReady && <Environment preset="warehouse" />}

      {effectsReady && (
        <EffectComposer multisampling={0}>
          <SMAA />

          {/* Bloom très léger pour juste un peu de glow sur les bords */}
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            mipmapBlur={true}
          />

          {/* <Vignette offset={0.15} darkness={1.5} /> Ancien réglage */}
          <Vignette offset={0.2} darkness={1} />
        </EffectComposer>
      )}

      {/* 3D BUTTERFLIES AVEC EFFET FLOU */}
      <ScrollControls pages={positions.pages} damping={0.4}>
        <Scroll>
          <Float speed={1} rotationIntensity={2} floatIntensity={0.2}>
            {/* Top Butterflies */}
            <BlurredButterfly scale={0.05} position={[-10, -3, -6]} />
            <BlurredButterfly scale={0.01} position={[0, -2.5, 0]} />
            <BlurredButterfly scale={0.03} position={[10, -4, -10]} />
          </Float>
          {/* Middle Butterflies */}
          <Float
            speed={3.5}
            rotationIntensity={0.5}
            floatIntensity={0.2}
            floatingRange={[1, 1]}
          >
            <BlurredButterfly
              key={"butterfly_4"}
              scale={0.05}
              position={[-1, -12.5, 0]}
            />
            <BlurredButterfly
              key={"butterfly_5"}
              scale={0.05}
              position={[12, -14, -10]}
            />
          </Float>

          {/* Bottom Butterflies 1 */}
          <Float
            speed={3}
            rotationIntensity={0.5}
            floatIntensity={0.2}
            floatingRange={[2, 2]}
          >
            <BlurredButterfly
              key={"butterfly_6"}
              scale={0.03}
              position={[-3, -19.5, 2]}
            />
            <BlurredButterfly
              key={"butterfly_7"}
              scale={0.03}
              position={[8, -23, -10]}
            />
            <BlurredButterfly
              key={"butterfly_8"}
              scale={0.03}
              position={[4, -24, 2]}
            />
          </Float>
          {/* Bottom Butterflies 2 */}
          <Float
            speed={3}
            rotationIntensity={0.5}
            floatIntensity={0.1}
            floatingRange={[2, 2]}
          >
            <BlurredButterfly
              key={"butterfly_9"}
              scale={0.04}
              position={[15, -30, -40]}
            />
            <BlurredButterfly
              key={"butterfly_10"}
              scale={0.1}
              position={[-10, -55, -40]}
            />
          </Float>
        </Scroll>

        {/* HTML – TEXTE */}
        <Scroll html style={{ width: "100%" }}>
          {isMobile ? <ScrollTextMobile /> : <ScrollTextDesktop />}
        </Scroll>
      </ScrollControls>
    </Suspense>
  );
}
