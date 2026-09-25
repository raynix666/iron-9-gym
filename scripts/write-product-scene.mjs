import { writeFileSync } from 'fs';

const code = `"use client";

/**
 * ProductScene.tsx — IRON 9 GYM
 * ─────────────────────────────────────────────────────────────────────
 * Realistic 3D Optimum Nutrition (ON) Gold Standard 100% Whey Tub
 *
 * Authentic Features:
 *  • Exact ON Gold Standard 100% Whey branding & iconic red/gold sweep
 *  • Real typography: "GOLD STANDARD", "100% WHEY", "24g PROTEIN", etc.
 *  • Authentic tub geometry: contoured shoulder, neck ring, ribbed cap
 *  • Ribbed grip texture on lid, satin black polymer finish
 *  • Crash-proof: no external HDR downloads, CanvasErrorBoundary, smooth WebGL
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
   LID RIBBED TEXTURE (for authentic grip ridges)
   ═══════════════════════════════════════════════════════════════════ */
function makeLidTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#1e1f23";
  ctx.fillRect(0, 0, 512, 64);

  // vertical ridges
  for (let x = 0; x < 512; x += 8) {
    ctx.fillStyle = "#2c2d33";
    ctx.fillRect(x, 0, 4, 64);
    ctx.fillStyle = "#111215";
    ctx.fillRect(x + 4, 0, 4, 64);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  return tex;
}

/* ═══════════════════════════════════════════════════════════════════
   LABEL TEXTURE — Optimum Nutrition Gold Standard 100% Whey
   2048 x 1024 high resolution canvas texture
   ═══════════════════════════════════════════════════════════════════ */
function makeTubTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 1024;
  const ctx = c.getContext("2d")!;

  // 1. Sleek satin charcoal-black base
  const bg = ctx.createLinearGradient(0, 0, 0, 1024);
  bg.addColorStop(0, "#16171a");
  bg.addColorStop(0.3, "#0e0f11");
  bg.addColorStop(0.7, "#141518");
  bg.addColorStop(1, "#0a0a0c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 2048, 1024);

  // Subtle carbon-fiber / hexagon dot pattern overlay on background
  ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
  for (let y = 0; y < 1024; y += 12) {
    for (let x = 0; x < 2048; x += 12) {
      ctx.fillRect(x, y, 2, 2);
    }
  }

  /* ─────────────────────────────────────────────────────────────
     CENTER FRONT PANEL (x ≈ 512 to 1536, center = 1024)
     ───────────────────────────────────────────────────────────── */
  const cx = 1024;

  // Dynamic diagonal red & gold sweep (Iconic ON design)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(350, 240);
  ctx.lineTo(1700, 120);
  ctx.lineTo(1700, 490);
  ctx.lineTo(350, 610);
  ctx.closePath();
  const redGrad = ctx.createLinearGradient(350, 200, 1700, 550);
  redGrad.addColorStop(0, "#8a0c10");
  redGrad.addColorStop(0.25, "#ba151b");
  redGrad.addColorStop(0.55, "#d91d24");
  redGrad.addColorStop(0.85, "#a80f14");
  redGrad.addColorStop(1, "#66070a");
  ctx.fillStyle = redGrad;
  ctx.fill();

  // Vibrant metallic gold trim stripe along top edge
  ctx.lineWidth = 14;
  const goldStripe = ctx.createLinearGradient(350, 0, 1700, 0);
  goldStripe.addColorStop(0, "#a67c1e");
  goldStripe.addColorStop(0.3, "#fbe282");
  goldStripe.addColorStop(0.5, "#fff4bd");
  goldStripe.addColorStop(0.7, "#e5b83b");
  goldStripe.addColorStop(1, "#946b10");
  ctx.strokeStyle = goldStripe;
  ctx.beginPath();
  ctx.moveTo(350, 240);
  ctx.lineTo(1700, 120);
  ctx.stroke();

  // Bottom gold trim stripe
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(350, 610);
  ctx.lineTo(1700, 490);
  ctx.stroke();
  ctx.restore();

  // OPTIMUM NUTRITION Badge / Header
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";

  // Brand Name
  ctx.font = "900 46px 'Arial Black', Arial, sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("OPTIMUM NUTRITION", cx, 110);

  ctx.font = "700 20px Arial, sans-serif";
  ctx.fillStyle = "#c5a045";
  ctx.letterSpacing = "3px";
  ctx.fillText("THE WORLD'S #1 WHEY PROTEIN", cx, 145);

  // Horizontal divider line in gold
  ctx.strokeStyle = "rgba(229, 184, 59, 0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 320, 165);
  ctx.lineTo(cx + 320, 165);
  ctx.stroke();

  // "GOLD STANDARD" in gleaming 3D gold gradient
  const goldText = ctx.createLinearGradient(0, 220, 0, 360);
  goldText.addColorStop(0, "#fff5cf");
  goldText.addColorStop(0.2, "#fedc75");
  goldText.addColorStop(0.5, "#d4a229");
  goldText.addColorStop(0.8, "#aa7a13");
  goldText.addColorStop(1, "#fde68a");

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 6;
  ctx.shadowBlur = 12;
  ctx.font = "900 132px 'Arial Black', Impact, sans-serif";
  ctx.fillStyle = goldText;
  ctx.letterSpacing = "4px";
  ctx.fillText("GOLD STANDARD", cx, 345);
  ctx.restore();

  // "100% WHEY" in massive crisp white bold
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  ctx.font = "900 152px 'Arial Black', Impact, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.letterSpacing = "2px";
  ctx.fillText("100% WHEY", cx, 475);
  ctx.restore();

  // Flavor Badge Pill
  ctx.save();
  const pillW = 680;
  const pillH = 52;
  const pillX = cx - pillW / 2;
  const pillY = 510;

  ctx.fillStyle = "rgba(16, 17, 20, 0.9)";
  ctx.strokeStyle = "#e5b83b";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 26);
  ctx.fill();
  ctx.stroke();

  ctx.font = "800 24px Arial, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.letterSpacing = "2px";
  ctx.fillText("DOUBLE RICH CHOCOLATE", cx, pillY + 35);
  ctx.restore();

  // Subtitle
  ctx.font = "700 24px Arial, sans-serif";
  ctx.fillStyle = "#e0e1e6";
  ctx.letterSpacing = "1px";
  ctx.fillText("PRIMARY SOURCE: WHEY PROTEIN ISOLATE", cx, 615);

  ctx.font = "italic 20px Arial, sans-serif";
  ctx.fillStyle = "#9da0a8";
  ctx.fillText("FOR MUSCLE SUPPORT & RECOVERY • 100% OF THE PROTEIN FROM WHEY", cx, 648);

  /* ─────────────────────────────────────────────────────────────
     3 ICONIC NUTRIENT CALLOUT CIRCLES
     [ 24g PROTEIN ]  [ 5.5g BCAAs ]  [ 4g GLUTAMINE ]
     ───────────────────────────────────────────────────────────── */
  const badges = [
    { value: "24g", label: "PROTEIN", sub: "HELPS BUILD & REPAIR" },
    { value: "5.5g", label: "BCAAs*", sub: "SUPPORTS ENDURANCE" },
    { value: "4g", label: "GLUTAMINE*", sub: "AIDS MUSCLE RECOVERY" },
  ];

  badges.forEach((b, i) => {
    const bx = cx - 340 + i * 340;
    const by = 750;
    const r = 68;

    // Outer glow ring
    ctx.save();
    ctx.strokeStyle = "rgba(229, 184, 59, 0.75)";
    ctx.lineWidth = 3.5;
    ctx.fillStyle = "rgba(18, 19, 23, 0.85)";
    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Value
    ctx.font = "900 48px 'Arial Black', Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.letterSpacing = "0px";
    ctx.fillText(b.value, bx, by + 10);

    // Label
    ctx.font = "800 17px Arial, sans-serif";
    ctx.fillStyle = "#e5b83b";
    ctx.letterSpacing = "1px";
    ctx.fillText(b.label, bx, by + 34);

    // Sub note under circle
    ctx.font = "600 13px Arial, sans-serif";
    ctx.fillStyle = "#8d9099";
    ctx.fillText(b.sub, bx, by + r + 24);
    ctx.restore();
  });

  /* ─────────────────────────────────────────────────────────────
     BOTTOM FOOTER BAR
     ───────────────────────────────────────────────────────────── */
  ctx.fillStyle = "rgba(22, 23, 27, 0.95)";
  ctx.fillRect(400, 895, 1248, 85);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(400, 895, 1248, 85);

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 24px Arial, sans-serif";
  ctx.letterSpacing = "1.5px";
  ctx.fillText("NET WT 5 LBS (2.27 KG)  •  74 SERVINGS", cx, 935);

  ctx.fillStyle = "#e5b83b";
  ctx.font = "700 15px Arial, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("INFORMED-CHOICE • TRUSTED BY SPORT • BANNED SUBSTANCE TESTED", cx, 962);

  /* ─────────────────────────────────────────────────────────────
     LEFT SIDE: AUTHENTIC NUTRITION FACTS PANEL (x ≈ 40 to 450)
     ───────────────────────────────────────────────────────────── */
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(70, 180, 360, 680);
  ctx.fillStyle = "#000000";
  ctx.textAlign = "left";

  ctx.font = "900 36px 'Arial Black', Arial";
  ctx.fillText("Nutrition Facts", 85, 225);
  ctx.font = "500 15px Arial";
  ctx.fillText("74 servings per container", 85, 250);
  ctx.font = "700 17px Arial";
  ctx.fillText("Serving size: 1 Scoop (30.4g)", 85, 272);

  ctx.fillRect(85, 282, 330, 8); // thick rule

  ctx.font = "700 15px Arial";
  ctx.fillText("Amount Per Serving", 85, 308);
  ctx.font = "900 34px 'Arial Black', Arial";
  ctx.fillText("Calories 120", 85, 345);

  ctx.fillRect(85, 355, 330, 4);

  const nutItems = [
    ["Total Fat 1.5g", "2%"],
    ["  Saturated Fat 1g", "5%"],
    ["Cholesterol 55mg", "18%"],
    ["Sodium 130mg", "6%"],
    ["Total Carbohydrate 3g", "1%"],
    ["  Total Sugars 1g", ""],
    ["Protein 24g", "48%"],
    ["Calcium 130mg", "10%"],
    ["Iron 0.7mg", "4%"],
    ["Potassium 210mg", "4%"],
  ];

  nutItems.forEach((row, idx) => {
    const ry = 380 + idx * 28;
    ctx.font = row[0].startsWith("  ") ? "400 14px Arial" : "700 15px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(row[0], 85, ry);
    if (row[1]) {
      ctx.textAlign = "right";
      ctx.fillText(row[1], 410, ry);
      ctx.textAlign = "left";
    }
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(85, ry + 6, 330, 1);
  });

  ctx.font = "italic 11px Arial";
  ctx.fillStyle = "#555555";
  ctx.fillText("* The % Daily Value tells you how much a nutrient in", 85, 680);
  ctx.fillText("a serving contributes to a daily diet.", 85, 696);

  // Quality Seal
  ctx.fillStyle = "#c80500";
  ctx.fillRect(85, 730, 330, 42);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 16px Arial";
  ctx.textAlign = "center";
  ctx.fillText("100% AUTHENTIC GUARANTEE", 250, 757);
  ctx.restore();

  /* ─────────────────────────────────────────────────────────────
     RIGHT SIDE: USAGE & AMINO ACID PROFILE (x ≈ 1600 to 1980)
     ───────────────────────────────────────────────────────────── */
  ctx.save();
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 24px Arial";
  ctx.fillText("TYPICAL AMINO ACID PROFILE", 1620, 220);

  ctx.font = "700 16px Arial";
  ctx.fillStyle = "#e5b83b";
  ctx.fillText("ESSENTIAL AMINO ACIDS (EAAs)", 1620, 260);

  const eaas = [
    "• Tryptophan ~405mg",
    "• Valine (BCAA) ~1,422mg",
    "• Threonine ~1,654mg",
    "• Isoleucine (BCAA) ~1,573mg",
    "• Leucine (BCAA) ~2,531mg",
    "• Lysine ~2,233mg",
  ];
  eaas.forEach((e, idx) => {
    ctx.font = "500 15px Arial";
    ctx.fillStyle = "#d0d2d8";
    ctx.fillText(e, 1620, 290 + idx * 26);
  });

  ctx.font = "700 16px Arial";
  ctx.fillStyle = "#e5b83b";
  ctx.fillText("SUGGESTED USE", 1620, 480);
  ctx.font = "400 14px Arial";
  ctx.fillStyle = "#b0b3bc";
  ctx.fillText("Mix about 1 scoop of powder into", 1620, 510);
  ctx.fillText("6 to 8 fluid ounces of cold water or milk.", 1620, 532);
  ctx.fillText("Stir, shake, or blend for 30 seconds.", 1620, 554);

  // Barcode mock
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(1620, 660, 280, 110);
  ctx.fillStyle = "#000000";
  for (let bx = 1640; bx < 1880; bx += 6) {
    if (Math.sin(bx * 0.4) > -0.2) {
      ctx.fillRect(bx, 675, Math.sin(bx) > 0 ? 3 : 2, 65);
    }
  }
  ctx.font = "12px monospace";
  ctx.fillText("7  48927  02866  8", 1670, 755);

  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/* ═══════════════════════════════════════════════════════════════════
   3D TUB GEOMETRY — Realistic 5lb Supplement Jug
   ═══════════════════════════════════════════════════════════════════ */
function Tub() {
  const labelTexture = useMemo(() => makeTubTexture(), []);
  const lidTexture = useMemo(() => makeLidTexture(), []);

  useEffect(() => {
    return () => {
      labelTexture.dispose();
      lidTexture.dispose();
    };
  }, [labelTexture, lidTexture]);

  return (
    <group position={[0, -0.05, 0]}>
      {/* ── 1. MAIN CYLINDER BODY (With authentic ON label) ────── */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.92, 0.90, 1.65, 64, 1, true]} />
        <meshStandardMaterial
          map={labelTexture}
          side={THREE.FrontSide}
          metalness={0.22}
          roughness={0.34}
        />
      </mesh>

      {/* ── 2. ROUNDED BOTTOM BASE CHAMFER ──────────────────────── */}
      <mesh position={[0, -1.02, 0]}>
        <cylinderGeometry args={[0.90, 0.82, 0.12, 64]} />
        <meshStandardMaterial color="#111215" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, -1.08, 0]} rotation={[Math.PI, 0, 0]}>
        <circleGeometry args={[0.82, 64]} />
        <meshStandardMaterial color="#0c0d0f" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* ── 3. CONTOURED SHOULDER (Curves inward toward neck) ──── */}
      <mesh position={[0, 0.80, 0]}>
        <cylinderGeometry args={[0.66, 0.92, 0.28, 64]} />
        <meshStandardMaterial
          color="#16171b"
          roughness={0.38}
          metalness={0.25}
        />
      </mesh>

      {/* ── 4. THREADED NECK RING ─────────────────────────────────── */}
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.64, 0.65, 0.10, 64]} />
        <meshStandardMaterial color="#1a1b1f" roughness={0.45} metalness={0.2} />
      </mesh>

      {/* ── 5. AUTHENTIC RIBBED SCREW LID ─────────────────────────── */}
      {/* Ribbed outer edge */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.22, 64]} />
        <meshStandardMaterial
          color="#222328"
          bumpMap={lidTexture}
          bumpScale={0.06}
          roughness={0.35}
          metalness={0.45}
        />
      </mesh>

      {/* Top bevel of lid */}
      <mesh position={[0, 1.24, 0]}>
        <cylinderGeometry args={[0.65, 0.68, 0.04, 64]} />
        <meshStandardMaterial color="#2c2d33" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Lid top plate */}
      <mesh position={[0, 1.265, 0]}>
        <circleGeometry args={[0.65, 64]} />
        <meshStandardMaterial color="#1c1d22" roughness={0.35} metalness={0.4} />
      </mesh>

      {/* Embossed concentric ring detail on lid */}
      <mesh position={[0, 1.267, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.46, 48]} />
        <meshStandardMaterial color="#d4a229" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ── 6. FLOOR CONTACT SOFT SHADOW ─────────────────────────── */}
      <mesh position={[0, -1.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.25, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION & INTERACTION
   ═══════════════════════════════════════════════════════════════════ */
function AnimatedTub() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    // Smooth continuous showcase spin
    group.current.rotation.y = t * 0.28;
    // Subtle breathing float
    group.current.position.y = Math.sin(t * 0.9) * 0.05;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.05} floatIntensity={0.12}>
      <group ref={group}>
        <Tub />
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FALLBACK
   ═══════════════════════════════════════════════════════════════════ */
function Fallback() {
  return (
    <div
      className="product-fallback"
      aria-label="Optimum Nutrition Gold Standard 100% Whey"
    >
      <div className="fallback-pack">
        OPTIMUM NUTRITION<br />
        GOLD STANDARD<br />
        100% WHEY
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ERROR BOUNDARY
   ═══════════════════════════════════════════════════════════════════ */
class CanvasErrorBoundary extends Component<
  { children: React.ReactNode },
  { crashed: boolean }
> {
  state = { crashed: false };
  static getDerivedStateFromError() {
    return { crashed: true };
  }
  componentDidCatch(e: Error) {
    console.warn("[Iron9] WebGL error:", e);
  }
  render() {
    return this.state.crashed ? <Fallback /> : this.props.children;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function ProductScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "140px" },
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
            camera={{ position: [0, 0.2, 4.6], fov: 40 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
            }}
          >
            <color attach="background" args={["transparent"]} />

            {/* Studio lighting tailored for the black & gold tub */}
            <ambientLight intensity={1.1} />
            <hemisphereLight args={["#ffffff", "#121316", 1.4]} />
            <directionalLight position={[-2.5, 3.5, 4]} intensity={2.6} />
            <directionalLight position={[3, 1, 2.5]} intensity={1.5} />
            {/* Dramatic rim lights (gold on right, gym red on left) */}
            <pointLight position={[2.8, 1.8, -1.5]} color="#fde047" intensity={12} distance={7} />
            <pointLight position={[-3, 1, -1.5]} color="#e10600" intensity={10} distance={7} />
            <pointLight position={[0, -2, 2.5]} color="#ffffff" intensity={3} distance={5} />

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
console.log('ProductScene.tsx written successfully!');
