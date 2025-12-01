// components/DiceOverlay.js
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function makeShadowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;

  const ctx = canvas.getContext("2d");

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.1,
    size / 2,
    size / 2,
    size * 0.5
  );

  grad.addColorStop(0, "rgba(0, 0, 0, 0.28)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

function Shadow({ targetRef }) {
  const shadowRef = useRef();
  const textureRef = useRef(makeShadowTexture());

  useFrame(() => {
    if (!targetRef.current) return;
    const pos = targetRef.current.position;

    shadowRef.current.position.set(pos.x, pos.y, pos.z - 8);
    shadowRef.current.rotation.set(0, 0, 0);
    shadowRef.current.scale.set(30, 30, 1);
  });

  return (
    <mesh ref={shadowRef}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={textureRef.current}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function DiceModel({ spinBoost, diceRef }) {
  const { scene } = useGLTF("/models/dice.glb");

  const idleVel = useRef({ x: 0, z: 0 });
  const lastIdleTime = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const BASE_X = 0.015;
    const BASE_Z = 0.01;

    let baseX = BASE_X;
    let baseZ = BASE_Z;

    /* boost on interaction */
    if (spinBoost.current > 0) {
      baseX *= spinBoost.current;
      baseZ *= spinBoost.current;
      spinBoost.current *= 0.92;

      idleVel.current.x *= 0.7;
      idleVel.current.z *= 0.7;
    } else {
      /* idle */
      if (t - lastIdleTime.current > 0.5) {
        lastIdleTime.current = t;
        idleVel.current.x += (Math.random() - 0.5) * 0.0025;
        idleVel.current.z += (Math.random() - 0.5) * 0.0025;
      }

      idleVel.current.x *= 0.97;
      idleVel.current.z *= 0.97;

      baseX += idleVel.current.x;
      baseZ += idleVel.current.z;
    }

    /* clamp base speed */
    baseX = Math.max(baseX, BASE_X);
    baseZ = Math.max(baseZ, BASE_Z);

    /* rotation */
    diceRef.current.rotation.x += baseX;
    diceRef.current.rotation.z += baseZ;

    /* path */
    diceRef.current.position.x = Math.sin(t * 0.45) * 30;
    diceRef.current.position.y = Math.cos(t * 0.35) * 23 - 10;
    diceRef.current.position.z = 0;
  });

  return (
    <primitive
      ref={diceRef}
      object={scene}
      scale={2000}
      onPointerDown={(e) => {
        spinBoost.current = 12;
        e.stopPropagation();
      }}
    />
  );
}

export default function DiceOverlay() {
  const spinBoost = useRef(0);
  const diceRef = useRef(null);

  return (
    <div className="dice-overlay">
      <div className="dice-canvas-wrapper">
        <Canvas
          camera={{
            position: [0, 0, 900],
            fov: 18,
            near: 0.1,
            far: 5000,
          }}
          dpr={[1, 1]} // lock resolution
          gl={{ antialias: true }}
          resize={{ scroll: false, offsetSize: false }} // prevent auto-resize
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "auto",
          }}
        >
          <ambientLight intensity={5} />
          <hemisphereLight args={[0xffffff, 0x444444, 1.2]} />
          <directionalLight position={[5, 5, 5]} intensity={3} />

          <Shadow targetRef={diceRef} />
          <DiceModel spinBoost={spinBoost} diceRef={diceRef} />
        </Canvas>
      </div>

      <style jsx>{`
        .dice-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 99;
        }

        .dice-canvas-wrapper {
          position: fixed;
          width: 700px;
          height: 350px;
          top: 50%;
          left: 20%;
          transform: translate(-50%, -50%);
          pointer-events: auto;
          z-index: 100;
          overflow: visible;
        }
      `}</style>
    </div>
  );
}
