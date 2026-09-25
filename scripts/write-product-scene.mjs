import { writeFileSync } from 'fs';

const code = `"use client";

/**
 * ProductScene.tsx — IRON 9 GYM
 * ─────────────────────────────────────────────────────────────────────
 * Crash-proof rotating 3-D whey-protein tub (Whey only — bar removed).
 *
 * Fixes vs previous version:
 *  • Removed Environment preset="city" (caused network fetch + crash)
 *  • Removed ContactShadows (GPU-heavy, caused crash on weak GPUs)
 *  • Added React ErrorBoundary — page never white-screens on WebGL error
 *  • failIfMajorPerformanceCaveat: false — renders on integrated GPUs
 *  • powerPreference: "default" — more compatible than "low-power"
 *  • No type prop needed — single product only
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════════
   LABEL TEXTURE — drawn on a 2D canvas, mapped onto the cylinder
   ═══════════════════════════════════════════════════════════════════ */
function makeTubTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const ctx = c.getContext("2d")!;

  // background
  const bg = ctx.createLinearGradient(0, 0, 0, 1024);
  bg.addColorStop(0, "#1c1d21");
  bg.addColorStop(1, "#0e0f11");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 1024);

  // red header
  const hg = ctx.createLinearGradient(0, 0, 1024, 0);
  hg.addColorStop(0, "#c80500");
  hg.addColorStop(0.5, "#e10600");
  hg.addColorStop(1, "#c80500");
  ctx.fillStyle = hg;
  ctx.fillRect(0, 0, 1024, 165);

  // IRON text
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "bold 90px Arial Black, Arial";
  ctx.fillText("IRON", 512, 122);

  // chrome 9
  const sg = ctx.createLinearGradient(0, 170, 0, 385);
  sg.addColorStop(0, "#ffffff");
  sg.addColorStop(0.4, "#c5c7cc");
  sg.addColorStop(1, "#7a7c80");
  ctx.fillStyle = sg;
  ctx.font = "bold 215px Arial Black, Arial";
  ctx.fillText("9", 512, 380);

  // GYM
  ctx.fillStyle = "#e10600";
  ctx.font = "bold 62px Arial Black, Arial";
  ctx.fillText("GYM", 512, 450);

  // divider
  ctx.strokeStyle = "rgba(225,6,0,0.55)";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(80, 478); ctx.lineTo(944, 478); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(80, 486); ctx.lineTo(944, 486); ctx.stroke();

  // WHEY PROTEIN
  ctx.fillStyle = "#f0f0f2";
  ctx.font = "bold 66px Arial Black, Arial";
  ctx.fillText("WHEY PROTEIN", 512, 578);

  // tagline
  ctx.fillStyle = "#c5c7cc";
  ctx.font = "27px Arial";
  ctx.fillText("BUILD YOUR BEST  —  Iron 9 Gym", 512, 633);

  // nutrition strip
  ctx.fillStyle = "rgba(225,6,0,0.12)";
  ctx.fillRect(60, 685, 904, 92);
  ctx.strokeStyle = "rgba(225,6,0,0.45)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(60, 685, 904, 92);

  [["25g","PROTEIN"],["150","CALORIES"],["30","SERVINGS"],["5g","BCAA"]].forEach(([v,l],i) => {
    const x = 60 + 904 * ((i + 0.5) / 4);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 36px Arial"; ctx.fillText(v, x, 735);
    ctx.fillStyle = "#9a9ba0"; ctx.font = "18px Arial"; ctx.fillText(l, x, 760);
  });

  // footer text
  ctx.fillStyle = "#444";
  ctx.font = "19px Arial";
  ctx.fillText("PREMIUM PERFORMANCE NUTRITION", 512, 865);
  ctx.fillStyle = "rgba(225,6,0,0.5)";
  ctx.font = "italic 18px Arial";
  ctx.fillText("Aqaba, Jordan", 512, 914);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/* ═══════════════════════════════════════════════════════════════════
   TUB MESH
   ═══════════════════════════════════════════════════════════════════ */
function Tub() {
  const texture = useMemo(() => makeTubTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <group>
      {/* body */}
      <mesh>
        <cylinderGeometry args={[0.88, 0.88, 1.95, 48, 1, true]} />
        <meshStandardMaterial map={texture} side={THREE.FrontSide} metalness={0.25} roughness={0.38} />
      </mesh>
      {/* top fill disc */}
      <mesh position={[0, 0.975, 0]}>
        <circleGeometry args={[0.88, 48]} />
        <meshStandardMaterial color="#1c1d21" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* bottom disc */}
      <mesh position={[0, -0.975, 0]} rotation={[Math.PI, 0, 0]}>
        <circleGeometry args={[0.88, 48]} />
        <meshStandardMaterial color="#111214" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* lid */}
      <mesh position={[0, 1.07, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.22, 48]} />
        <meshStandardMaterial color="#2e3035" metalness={0.75} roughness={0.2} />
      </mesh>
      {/* lid top */}
      <mesh position={[0, 1.185, 0]}>
        <circleGeometry args={[0.92, 48]} />
        <meshStandardMaterial color="#38393e" metalness={0.6} roughness={0.25} />
      </mesh>
      {/* red nub */}
      <mesh position={[0, 1.225, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.07, 32]} />
        <meshStandardMaterial color="#e10600" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* floor shadow disc */}
      <mesh position={[0, -1.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.15, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION
   ═══════════════════════════════════════════════════════════════════ */
function AnimatedTub() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = t * 0.28;
    group.current.position.y = Math.sin(t * 0.9) * 0.07;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.14}>
      <group ref={group}><Tub /></group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FALLBACK (shown before WebGL loads or if it fails)
   ═══════════════════════════════════════════════════════════════════ */
function Fallback() {
  return (
    <div className="product-fallback" aria-label="Iron 9 Whey Protein tub">
      <div className="fallback-pack">IRON 9<br />WHEY</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ERROR BOUNDARY — catches any WebGL / R3F crash
   ═══════════════════════════════════════════════════════════════════ */
class CanvasErrorBoundary extends Component<
  { children: React.ReactNode },
  { crashed: boolean }
> {
  state = { crashed: false };
  static getDerivedStateFromError() { return { crashed: true }; }
  componentDidCatch(e: Error) { console.warn("[Iron9] WebGL error:", e); }
  render() { return this.state.crashed ? <Fallback /> : this.props.children; }
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════ */
export default function ProductScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "120px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="h-full w-full">
      {visible ? (
        <CanvasErrorBoundary>
          <Canvas
            dpr={[1, 1.5]}
            frameloop="always"
            camera={{ position: [0, 0.2, 4.8], fov: 40 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
            }}
          >
            <color attach="background" args={["transparent"]} />

            {/* Manual lighting — no Environment HDR needed */}
            <ambientLight intensity={1.2} />
            <hemisphereLight args={["#e8eaf0", "#1a1b1f", 1.6]} />
            <directionalLight position={[-2.5, 4, 4]} intensity={2.8} />
            <directionalLight position={[3, -1, -3]} intensity={0.6} />
            <pointLight position={[2.5, 1.5, 2]} color="#e10600" intensity={18} distance={7} />
            <pointLight position={[-3, 0, -2]} color="#c5d0e8" intensity={6} distance={6} />
            <pointLight position={[0, 3.5, -2]} color="#ffffff" intensity={4} distance={7} />

            <Suspense fallback={null}>
              <AnimatedTub />
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2.8}
              maxPolarAngle={Math.PI / 1.6}
              rotateSpeed={0.6}
            />
          </Canvas>
        </CanvasErrorBoundary>
      ) : (
        <Fallback />
      )}
    </div>
  );
}
`;

writeFileSync('components/ProductScene.tsx', code, 'utf8');
console.log('ProductScene.tsx written successfully — ' + code.length + ' chars');
