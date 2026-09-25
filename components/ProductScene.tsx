"use client";

/**
 * ProductScene.tsx
 * ─────────────────────────────────────────────
 * Renders a procedural 3-D product (protein tub or protein bar) inside a
 * React Three Fiber <Canvas>.  The canvas is only mounted while the host
 * element is intersecting the viewport (IntersectionObserver), so off-screen
 * products burn no GPU cycles.  A static CSS fallback is shown while the
 * canvas hasn't been revealed yet, and is also wired to the Canvas `fallback`
 * prop for browsers without WebGL.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type ProductType = "tub" | "bar";

/* ── Label texture factory ─────────────────────────────────────────── */
function makeLabelTexture(type: ProductType): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // background
  ctx.fillStyle = "#17181b";
  ctx.fillRect(0, 0, 512, 512);

  // red header band
  ctx.fillStyle = "#e10600";
  ctx.fillRect(0, 0, 512, 88);

  // brand name on header
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.font = "bold 52px Arial";
  ctx.fillText(type === "bar" ? "GRENADE" : "IRON 9", 256, 60);

  // main product text
  ctx.fillStyle = "#e7e7e7";
  ctx.font = "bold 54px Arial";
  ctx.fillText(type === "bar" ? "PROTEIN" : "WHEY", 256, 220);

  ctx.font = "bold 25px Arial";
  ctx.fillText(
    type === "bar" ? "PROTEIN BAR" : "BUILD YOUR BEST",
    256,
    275,
  );

  // red separator
  ctx.fillStyle = "#e10600";
  ctx.fillRect(105, 315, 302, 7);

  // sub-copy
  ctx.fillStyle = "#c5c7cc";
  ctx.font = "20px Arial";
  ctx.fillText("PREMIUM PERFORMANCE", 256, 375);

  // optional serving size row
  ctx.fillStyle = "#888";
  ctx.font = "16px Arial";
  ctx.fillText(type === "bar" ? "60g · 20g PROTEIN" : "30 SERVINGS · 25g PROTEIN", 256, 430);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  return texture;
}

/* ── Protein tub model ─────────────────────────────────────────────── */
function Tub() {
  const texture = useMemo(() => makeLabelTexture("tub"), []);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <group>
      {/* main cylinder body with label */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.86, 0.86, 1.9, 32, 1, true]} />
        <meshPhysicalMaterial
          map={texture}
          metalness={0.3}
          roughness={0.34}
        />
      </mesh>
      {/* top cap / lid */}
      <mesh position={[0, 1.03, 0]} castShadow>
        <cylinderGeometry args={[0.89, 0.89, 0.27, 32]} />
        <meshStandardMaterial
          color="#383a40"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      {/* lid handle nub */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 20]} />
        <meshStandardMaterial color="#e10600" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* bottom cap */}
      <mesh position={[0, -0.96, 0]}>
        <cylinderGeometry args={[0.86, 0.86, 0.12, 32]} />
        <meshStandardMaterial color="#232429" metalness={0.55} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ── Protein bar model ─────────────────────────────────────────────── */
function Bar() {
  const texture = useMemo(() => makeLabelTexture("bar"), []);
  useEffect(() => () => texture.dispose(), [texture]);

  const materials = useMemo(() => {
    const wrapper = new THREE.MeshPhysicalMaterial({
      map: texture,
      metalness: 0.35,
      roughness: 0.32,
    });
    const ends = new THREE.MeshStandardMaterial({
      color: "#b9bbc1",
      metalness: 0.7,
      roughness: 0.3,
    });
    return [wrapper, wrapper, ends, ends, wrapper, wrapper];
  }, [texture]);

  return (
    <mesh castShadow rotation={[0, 0, -0.12]}>
      <boxGeometry args={[2.35, 0.72, 0.62]} />
      {materials.map((material, index) => (
        <primitive
          key={index}
          object={material}
          attach={`material-${index}`}
        />
      ))}
    </mesh>
  );
}

/* ── Animated product wrapper ──────────────────────────────────────── */
function Product({ type }: { type: ProductType }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    // gentle idle sway
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.24;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.1) * 0.06;
  });

  return (
    <Float speed={1.25} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={group} scale={type === "bar" ? 0.88 : 1}>
        {type === "bar" ? <Bar /> : <Tub />}
      </group>
    </Float>
  );
}

/* ── CSS static fallback ───────────────────────────────────────────── */
function StaticFallback({ type }: { type: ProductType }) {
  return (
    <div
      className="product-fallback"
      aria-label={
        type === "bar"
          ? "Grenade protein bar product preview"
          : "Iron 9 whey protein tub preview"
      }
    >
      {type === "bar" ? (
        <div className="fallback-bar">GRENADE · PROTEIN</div>
      ) : (
        <div className="fallback-pack">IRON 9 · WHEY</div>
      )}
    </div>
  );
}

/* ── Main exported component ───────────────────────────────────────── */
export default function ProductScene({ type }: { type: ProductType }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Only mount the Canvas while the card is (near) the viewport
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className="h-full w-full">
      {visible ? (
        <Canvas
          shadows
          dpr={[1, 1.4]}
          frameloop="always"
          camera={{ position: [0, 0, 5.2], fov: 38 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
          }}
          fallback={<StaticFallback type={type} />}
        >
          {/* transparent background so card gradient shows through */}
          <color attach="background" args={["transparent"]} />

          {/* Lighting rig */}
          <ambientLight intensity={1.5} />
          <hemisphereLight args={["#ffffff", "#25252a", 1.8]} />
          <directionalLight
            position={[-3, 4, 5]}
            intensity={3}
            castShadow
            shadow-mapSize={[512, 512]}
          />
          {/* red accent light — gives the product its glow */}
          <pointLight
            position={[3, 1, 2]}
            color="#e10600"
            intensity={25}
            distance={8}
          />
          {/* silver rim light */}
          <pointLight
            position={[-3, -1, -2]}
            color="#c5c7cc"
            intensity={8}
            distance={6}
          />

          <Suspense fallback={<StaticFallback type={type} />}>
            <Product type={type} />
            <ContactShadows
              position={[0, -1.25, 0]}
              opacity={0.4}
              scale={5}
              blur={2.4}
              resolution={256}
            />
            <Environment preset="city" />
          </Suspense>

          {/* Allow user to drag-rotate the product */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.7}
            rotateSpeed={0.65}
          />
        </Canvas>
      ) : (
        <StaticFallback type={type} />
      )}
    </div>
  );
}
