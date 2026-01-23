// import "./App.css";
// import { Suspense, useEffect, useState, useRef } from "react";
// import {
//   ScrollControls,
//   Scroll,
//   Environment,
//   Float,
//   Html,
//   useProgress,
//   useScroll,
// } from "@react-three/drei";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { Butterfly } from "./models/Butterfly";
// import {
//   EffectComposer,
//   Bloom,
//   Vignette,
//   SMAA,
// } from "@react-three/postprocessing";
// import * as THREE from "three";
// import { useFrame, useThree } from "@react-three/fiber";

// /* ---------------- LOADER ---------------- */

// function Loader() {
//   return (
//     <Html center zIndexRange={[100, 0]}>
//       <div
//         className="scroll-text"
//         style={{
//           fontSize: "3rem",
//           letterSpacing: "0.08em",
//           opacity: 0.9,
//           animation: "fadeIn 1.2s ease forwards",
//         }}
//       >
//         Loading…
//       </div>
//     </Html>
//   );
// }

// /* ---------------- ANIMATED TEXT WITH FADE ---------------- */

// function FadeText({ children, scrollRange = [0, 0.15], noFade = false }) {
//   const scroll = useScroll();
//   const ref = useRef();

//   useFrame(() => {
//     if (noFade) return;

//     const scrollOffset = scroll.offset;
//     const [start, end] = scrollRange;

//     let p = 0;
//     if (scrollOffset < start) p = 0;
//     else if (scrollOffset <= end) {
//       p = (scrollOffset - start) / (end - start);
//     } else p = 1;

//     if (ref.current) {
//       ref.current.style.opacity = p;
//       ref.current.style.transform = `translateY(${(1 - p) * 20}px)`;
//     }
//   });

//   return (
//     <div
//       ref={ref}
//       style={
//         noFade
//           ? { transform: "translateY(0)", opacity: 1 }
//           : {
//               opacity: 0,
//               transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
//               willChange: "opacity, transform",
//             }
//       }
//     >
//       {children}
//     </div>
//   );
// }

// /* ---------------- BUTTERFLY WITH BLUR EFFECT ---------------- */
// function BlurredButterfly({ ...props }) {
//   const butterflyRef = useRef();

//   useEffect(() => {
//     if (butterflyRef.current) {
//       butterflyRef.current.traverse((child) => {
//         if (child.isMesh && child.material) {
//           // Clone le matériau pour ne pas affecter les autres instances
//           const mat = child.material.clone();

//           // Ajoute de la transparence légère pour le flou sur les contours
//           mat.transparent = true;
//           mat.opacity = 1;
//           mat.alphaTest = 0.02;
//           mat.depthWrite = true;

//           // Active le dithering pour un effet de flou naturel sur les bords
//           mat.dithering = true;

//           // Préserve les couleurs originales - pas d'émissif qui blanchit
//           // On garde juste un tout petit peu si le matériau en avait déjà
//           if (mat.emissive && mat.emissiveIntensity) {
//             mat.emissiveIntensity = Math.min(mat.emissiveIntensity, 0.01);
//           }

//           child.material = mat;
//         }
//       });
//     }
//   }, []);

//   return (
//     <group ref={butterflyRef}>
//       <Butterfly {...props} />
//     </group>
//   );
// }

// /* ---------------- GET THE APP BUTTON ANIMATION ---------------- */
// function AnimatedCTA() {
//   const scroll = useScroll();
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const unsubscribe = scroll.el.addEventListener("scroll", () => {
//       if (scroll.offset > 0.9) {
//         setVisible(true);
//       }
//     });

//     return () => {
//       scroll.el.removeEventListener("scroll", unsubscribe);
//     };
//   }, [scroll]);

//   return (
//     <Button
//       variant="outline-light"
//       size="lg"
//       className={`get-app-btn ${visible ? "visible" : ""}`}
//     >
//       Get the App
//     </Button>
//   );
// }

// /* ---------------- APP / SCENE ---------------- */

// export default function App() {
//   const [effectsReady, setEffectsReady] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setEffectsReady(true), 800);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <Suspense fallback={<Loader />}>
//       {/* LIGHTS */}
//       <ambientLight intensity={0.2} />
//       <directionalLight
//         position={[5, 10, 5]}
//         intensity={0.3}
//         castShadow={false}
//       />

//       {/* Lumières d'appoint très subtiles pour ne pas blanchir */}
//       <pointLight
//         position={[0, -10, 3]}
//         intensity={0.1}
//         color="#ffffff"
//         distance={15}
//       />
//       <pointLight
//         position={[0, -25, 3]}
//         intensity={0.1}
//         color="#e6f2ff"
//         distance={20}
//       />

//       {/* ENV + FX AFTER LOAD */}
//       {effectsReady && <Environment preset="warehouse" />}

//       {effectsReady && (
//         <EffectComposer multisampling={0}>
//           <SMAA />

//           {/* Bloom très léger pour juste un peu de glow sur les bords */}
//           <Bloom
//             intensity={0.3}
//             luminanceThreshold={0.4}
//             luminanceSmoothing={0.9}
//             mipmapBlur={true}
//           />

//           {/* <Vignette offset={0.15} darkness={1.5} /> Ancien réglage */}
//           <Vignette offset={0.2} darkness={1} />
//         </EffectComposer>
//       )}

//       <ScrollControls pages={5.5} damping={0.4}>
//         {/* 3D BUTTERFLIES AVEC EFFET FLOU */}
//         <Scroll>
//           <Float speed={1} rotationIntensity={2} floatIntensity={0.2}>
//             {/* Top Butterflies */}
//             <BlurredButterfly scale={0.05} position={[-10, -3, -6]} />
//             <BlurredButterfly scale={0.01} position={[0, -2.5, 0]} />
//             <BlurredButterfly scale={0.03} position={[10, -4, -10]} />
//           </Float>
//           {/* Middle Butterflies */}
//           <Float
//             speed={3.5}
//             rotationIntensity={0.5}
//             floatIntensity={0.2}
//             floatingRange={[1, 1]}
//           >
//             <BlurredButterfly
//               key={"butterfly_4"}
//               scale={0.05}
//               position={[-1, -12.5, 0]}
//             />
//             <BlurredButterfly
//               key={"butterfly_5"}
//               scale={0.05}
//               position={[12, -14, -10]}
//             />
//           </Float>

//           {/* Bottom Butterflies 1 */}
//           <Float
//             speed={3}
//             rotationIntensity={0.5}
//             floatIntensity={0.2}
//             floatingRange={[2, 2]}
//           >
//             <BlurredButterfly
//               key={"butterfly_6"}
//               scale={0.03}
//               position={[-3, -19.5, 2]}
//             />
//             <BlurredButterfly
//               key={"butterfly_7"}
//               scale={0.03}
//               position={[8, -23, -10]}
//             />
//             <BlurredButterfly
//               key={"butterfly_8"}
//               scale={0.03}
//               position={[4, -24, 2]}
//             />
//           </Float>
//           {/* Bottom Butterflies 2 */}
//           <Float
//             speed={3}
//             rotationIntensity={0.5}
//             floatIntensity={0.1}
//             floatingRange={[2, 2]}
//           >
//             <BlurredButterfly
//               key={"butterfly_9"}
//               scale={0.04}
//               position={[15, -30, -40]}
//             />
//             <BlurredButterfly
//               key={"butterfly_10"}
//               scale={0.1}
//               position={[-10, -55, -40]}
//             />
//           </Float>
//         </Scroll>

//         {/* HTML – TEXTE */}
//         <Scroll html style={{ width: "100%" }}>
//           <Container style={{ height: "100px", position: "relative" }}>
//             <Row
//               className="text-center align-items-center justify-content-center"
//               style={{ position: "absolute", width: "100%", height: "100vh" }}
//             >
//               <Col xs={12} md={6}>
//                 <div
//                   style={{
//                     animation: "fadeIn 1.5s ease-in forwards",
//                     opacity: 0,
//                   }}
//                 >
//                   <h1 className="scroll-text">Life isn’t always easy</h1>
//                 </div>
//               </Col>
//             </Row>

//             <Row
//               className="text-center align-items-center justify-content-center"
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 height: "70vh",
//                 top: "100vh",
//               }}
//             >
//               <Col xs={12} md={6}>
//                 <FadeText scrollRange={[0.15, 0.25]} noFade>
//                   <h1 className="scroll-text force-white">
//                     Sometimes you can feel
//                   </h1>
//                 </FadeText>
//               </Col>
//             </Row>

//             <Row
//               className="text-center align-items-center justify-content-center"
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 height: "80vh",
//                 top: "190vh",
//               }}
//             >
//               <Col xs={12} md={6}>
//                 <FadeText scrollRange={[0.3, 0.4]}>
//                   <h1 className="scroll-text">Lost</h1>
//                   <h1 className="scroll-text">Overwhelmed</h1>
//                   <h1 className="scroll-text">Empty inside</h1>
//                 </FadeText>
//               </Col>
//             </Row>

//             <Row
//               className="text-center align-items-center justify-content-center"
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 height: "70vh",
//                 top: "300vh",
//               }}
//             >
//               <Col xs={12} md={6}>
//                 <FadeText scrollRange={[0.48, 0.58]}>
//                   <h1 className="scroll-text">
//                     Do you know the <br /> Butterfly effect ?
//                   </h1>
//                 </FadeText>
//               </Col>
//             </Row>

//             <Row
//               className="text-center align-items-center justify-content-center"
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 height: "70vh",
//                 top: "400vh",
//               }}
//             >
//               <Col xs={12} md={8}>
//                 <FadeText scrollRange={[0.65, 0.75]}>
//                   <h1 className="scroll-text">
//                     One little step can <br /> change everything
//                   </h1>
//                 </FadeText>
//               </Col>
//             </Row>

//             <Row
//               className="text-center align-items-center justify-content-center"
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 height: "80vh",
//                 top: "460vh",
//               }}
//             >
//               <Col xs={12} md={6}>
//                 <FadeText scrollRange={[0.82, 0.92]}>
//                   <h1 className="scroll-text">
//                     It's time to get <br /> the support you need
//                   </h1>
//                 </FadeText>
//                 <AnimatedCTA />
//               </Col>
//             </Row>
//           </Container>
//         </Scroll>
//       </ScrollControls>
//     </Suspense>
//   );
// }



/* TEST ICI ----------------------------------*/ 

import "./App.css";
import { Suspense, useEffect, useState, useRef } from "react";
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
  Vignette,
  SMAA,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

/* ---------------- HOOK POUR DETECTER MOBILE ---------------- */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

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

/* ---------------- ANIMATED TEXT WITH FADE ---------------- */

function FadeText({ children, scrollRange = [0, 0.15], noFade = false }) {
  const scroll = useScroll();
  const ref = useRef();

  useFrame(() => {
    if (noFade) return;

    const scrollOffset = scroll.offset;
    const [start, end] = scrollRange;

    let p = 0;
    if (scrollOffset < start) p = 0;
    else if (scrollOffset <= end) {
      p = (scrollOffset - start) / (end - start);
    } else p = 1;

    if (ref.current) {
      ref.current.style.opacity = p;
      ref.current.style.transform = `translateY(${(1 - p) * 20}px)`;
    }
  });

  return (
    <div
      ref={ref}
      style={
        noFade
          ? { transform: "translateY(0)", opacity: 1 }
          : {
              opacity: 0,
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              willChange: "opacity, transform",
            }
      }
    >
      {children}
    </div>
  );
}

/* ---------------- BUTTERFLY WITH BLUR EFFECT ---------------- */
function BlurredButterfly({ ...props }) {
  const butterflyRef = useRef();

  useEffect(() => {
    if (butterflyRef.current) {
      butterflyRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          // Clone le matériau pour ne pas affecter les autres instances
          const mat = child.material.clone();

          // Ajoute de la transparence légère pour le flou sur les contours
          mat.transparent = true;
          mat.opacity = 1;
          mat.alphaTest = 0.02;
          mat.depthWrite = true;

          // Active le dithering pour un effet de flou naturel sur les bords
          mat.dithering = true;

          // Préserve les couleurs originales - pas d'émissif qui blanchit
          // On garde juste un tout petit peu si le matériau en avait déjà 
          if (mat.emissive && mat.emissiveIntensity) {
            mat.emissiveIntensity = Math.min(mat.emissiveIntensity, 0.01);
          }

          child.material = mat;
        }
      });
    }
  }, []);

  return (
    <group ref={butterflyRef}>
      <Butterfly {...props} />
    </group>
  );
}

/* ---------------- GET THE APP BUTTON ANIMATION ---------------- */
function AnimatedCTA() {
  const scroll = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scroll.el.addEventListener("scroll", () => {
      if (scroll.offset > 0.8) {
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
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setEffectsReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Positions adaptatives selon mobile/desktop
  const positions = isMobile ? {
    // pages: 4.5,
    // row2: "80vh",
    // row3: "150vh",
    // row4: "230vh",
    // row5: "300vh",
    // row6: "360vh",

 pages: 4.0,
    row2: "75vh",
    row3: "140vh",
    row4: "210vh",
    row5: "275vh",
    row6: "330vh",







  } : {
    pages: 5.5,
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

      <ScrollControls pages={positions.pages} damping={0.4}>
        {/* 3D BUTTERFLIES AVEC EFFET FLOU */}
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
          <Container style={{ height: "100px", position: "relative" }}>
            <Row
              className="text-center align-items-center justify-content-center"
              style={{ position: "absolute", width: "100%", height: "100vh" }}
            >
              <Col xs={12} md={6}>
                <div
                  style={{
                    animation: "fadeIn 1.5s ease-in forwards",
                    opacity: 0,
                  }}
                >
                  <h1 className="scroll-text">Life isn't always easy</h1>
                </div>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "70vh",
                top: positions.row2,
              }}
            >
              <Col xs={12} md={6}>
                <FadeText scrollRange={[0.15, 0.25]} noFade>
                  <h1 className="scroll-text force-white">
                    Sometimes you can feel
                  </h1>
                </FadeText>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "80vh",
                top: positions.row3,
              }}
            >
              <Col xs={12} md={6}>
                <FadeText scrollRange={[0.3, 0.4]}>
                  <h1 className="scroll-text">Lost</h1>
                  <h1 className="scroll-text">Overwhelmed</h1>
                  <h1 className="scroll-text">Empty inside</h1>
                </FadeText>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "70vh",
                top: positions.row4,
              }}
            >
              <Col xs={12} md={6}>
                <FadeText scrollRange={[0.48, 0.58]}>
                  <h1 className="scroll-text">
                    Do you know the <br /> Butterfly effect ?
                  </h1>
                </FadeText>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "70vh",
                top: positions.row5,
              }}
            >
              <Col xs={12} md={8}>
                <FadeText scrollRange={[0.65, 0.75]}>
                  <h1 className="scroll-text">
                    One little step can <br /> change everything
                  </h1>
                </FadeText>
              </Col>
            </Row>

            <Row
              className="text-center align-items-center justify-content-center"
              style={{
                position: "absolute",
                width: "100%",
                height: "80vh",
                top: positions.row6,
              }}
            >
              <Col xs={12} md={6}>
                <FadeText scrollRange={[0.82, 0.92]}>
                  <h1 className="scroll-text">
                    It's time to get <br /> the support you need
                  </h1>
                </FadeText>
                <AnimatedCTA />
              </Col>
            </Row>
          </Container>
        </Scroll>
      </ScrollControls>
    </Suspense>
  );
}