import "./App.css";
import { Suspense, useEffect, useState } from "react";
import {
  ScrollControls,
  Scroll,
  Environment,
  Float,
  Html,
  useProgress,
  useScroll,
} from "@react-three/drei";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Butterfly } from "./models/Butterfly";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";

/* ---------------- LOADER ---------------- */

function Loader() {
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

/* ---------------- GET THE APP BUTTON ANIMATION ---------------- */
function AnimatedCTA() {
  const scroll = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scroll.el.addEventListener("scroll", () => {
      if (scroll.offset > 0.9) {
        setVisible(true);
      }
    });

    return () => {
      scroll.el.removeEventListener("scroll", unsubscribe);
    };
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

/* ---------------- APP / SCENE ---------------- */

export default function App() {
  const [effectsReady, setEffectsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEffectsReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {/* LIGHTS */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow={false}
      />

      {/* ENV + FX AFTER LOAD */}
      {effectsReady && <Environment preset="warehouse" />}

      {effectsReady && (
        <EffectComposer>
          {/* <Bloom intensity={0.2} luminanceThreshold={0.1} /> */}
          <DepthOfField focalLength={0.02} bokehScale={2} height={300} />
          <Vignette offset={0.15} darkness={1.2} />
        </EffectComposer>
      )}

      <ScrollControls pages={6} damping={0.25}>
        {/* 3D BUTTERFLIES*/}
        <Scroll>
          <Float speed={1} rotationIntensity={2} floatIntensity={0.2}>
            {/* First Butterflies */}
            <Butterfly scale={0.05} position={[-10, -3, -6]} />
            <Butterfly scale={0.03} position={[0, -2.5, 0]} />
            <Butterfly scale={0.03} position={[10, -4, -10]} />
          </Float>

          {/* Middle Butterflies */}
          <Float
            speed={3.5}
            rotationIntensity={0.5}
            floatIntensity={0.2}
            floatingRange={[1, 1]}
          >
            <Butterfly
              key={"butterfly_4"}
              scale={0.05}
              position={[-1, -12.5, 0]}
            />
            <Butterfly
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
            <Butterfly
              key={"butterfly_6"}
              scale={0.03}
              position={[-3, -19.5, 2]}
            />
            <Butterfly
              key={"butterfly_7"}
              scale={0.03}
              position={[8, -23, -10]}
            />
            <Butterfly
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
            <Butterfly
              key={"butterfly_7"}
              scale={0.04}
              position={[15, -30, -40]}
            />
            <Butterfly
              key={"butterfly_8"}
              scale={0.2}
              position={[-10, -60, -40]}
            />
          </Float>
        </Scroll>

        {/* HTML — TEXTE STRICTEMENT INTACT */}
        <Scroll html style={{ width: "100%" }}>
          <Container style={{ height: "100px", position: "relative" }}>
            <Row
              className="text-center align-items-center justify-content-center"
              style={{ position: "absolute", width: "100%", height: "100vh" }}
            >
              <Col xs={12} md={6}>
                <h1 className="scroll-text">Life can be a struggle</h1>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                top: "100vh",
              }}
            >
              <Col xs={12} md={6}>
                <h1 className="scroll-text">Sometimes you can feel</h1>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                top: "200vh",
              }}
            >
              <Col xs={12} md={6}>
                <h1 className="scroll-text">Lost</h1>
                <h1 className="scroll-text">Overwhelmed</h1>
                <h1 className="scroll-text">Empty inside</h1>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                top: "300vh",
              }}
            >
              <Col xs={12} md={6}>
                <h1 className="scroll-text">
                  Do you know the <br /> Butterfly effect ?
                </h1>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                top: "400vh",
              }}
            >
              <Col xs={12} md={8}>
                <h1 className="scroll-text">
                  One little step can <br /> change everything
                </h1>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                top: "500vh",
              }}
            >
              <Col xs={12} md={6}>
                <h1 className="scroll-text">
                  It's time to get <br /> the support you need
                </h1>
                {/* <Button variant="outline-light" size="lg">
                  Get the App
                </Button> */}
                <AnimatedCTA />
              </Col>
            </Row>
          </Container>
        </Scroll>
      </ScrollControls>
    </Suspense>
  );
}
