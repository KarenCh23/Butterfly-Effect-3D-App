import { useEffect, useRef } from "react";
import { Butterfly } from "../models/Butterfly";

/* ---------------- BUTTERFLY WITH BLUR EFFECT ---------------- */

export default function BlurredButterfly({ ...props }) {
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
