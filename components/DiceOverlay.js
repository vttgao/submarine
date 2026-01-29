import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect } from "react";

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
    size * 0.5,
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
    shadowRef.current.scale.set(15, 15, 1);
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

function screenToWorld(px, py, camera) {
  const ndc = new THREE.Vector3(
    (px / window.innerWidth) * 2 - 1,
    -(py / window.innerHeight) * 2 + 1,
    0.5,
  );
  ndc.unproject(camera);
  const dir = ndc.sub(camera.position).normalize();
  const dist = -camera.position.z / dir.z;
  return camera.position.clone().add(dir.multiplyScalar(dist));
}

function DiceModel({ diceRef, drag, cameraRef }) {
  const { scene } = useGLTF("/models/dice.glb");
  const { camera } = useThree();
  cameraRef.current = camera;

  const vel = useRef({ x: 0, y: 0 });
  const rotVel = useRef({ x: 0.015, z: 0.01 });
  const pos = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  useFrame(() => {
    if (!diceRef.current) return;

    const halfW = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const BOUND_X = halfW - 12;
    const BOUND_Y = halfH - 12;

    if (!initialized.current) {
      initialized.current = true;
      pos.current.x = -BOUND_X * 0.4;
      pos.current.y = 0;
    }

    if (drag.current.active) {
      const wp = screenToWorld(drag.current.x, drag.current.y, camera);
      pos.current.x = wp.x;
      pos.current.y = wp.y;

      rotVel.current.x = 0.08;
      rotVel.current.z = 0.06;
    } else {
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      vel.current.x *= 0.985;
      vel.current.y *= 0.985;

      if (pos.current.x > BOUND_X) {
        pos.current.x = BOUND_X;
        vel.current.x *= -0.7;
      } else if (pos.current.x < -BOUND_X) {
        pos.current.x = -BOUND_X;
        vel.current.x *= -0.7;
      }
      if (pos.current.y > BOUND_Y) {
        pos.current.y = BOUND_Y;
        vel.current.y *= -0.7;
      } else if (pos.current.y < -BOUND_Y) {
        pos.current.y = -BOUND_Y;
        vel.current.y *= -0.7;
      }

      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      rotVel.current.x = 0.015 + speed * 0.06;
      rotVel.current.z = 0.01 + speed * 0.04;
    }

    if (drag.current.justReleased) {
      drag.current.justReleased = false;
      vel.current.x = drag.current.flingVx;
      vel.current.y = drag.current.flingVy;
    }

    diceRef.current.position.set(pos.current.x, pos.current.y, 0);
    diceRef.current.rotation.x += rotVel.current.x;
    diceRef.current.rotation.z += rotVel.current.z;
  });

  return (
    <primitive ref={diceRef} object={scene} scale={700} />
  );
}

export default function DiceOverlay() {
  const diceRef = useRef(null);
  const cameraRef = useRef(null);
  const raycaster = useRef(new THREE.Raycaster());
  const drag = useRef({
    active: false,
    x: 0,
    y: 0,
    history: [],
    justReleased: false,
    flingVx: 0,
    flingVy: 0,
  });

  useEffect(() => {
    const hitTest = (e) => {
      if (!cameraRef.current || !diceRef.current) return false;
      const ndc = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
      raycaster.current.set(cameraRef.current.position, new THREE.Vector3(ndc.x, ndc.y, 0.5).unproject(cameraRef.current).sub(cameraRef.current.position).normalize());
      const hits = raycaster.current.intersectObject(diceRef.current, true);
      return hits.length > 0;
    };

    const onDown = (e) => {
      if (!hitTest(e)) return;
      e.preventDefault();
      drag.current.active = true;
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;
      drag.current.history = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
    };

    const onMove = (e) => {
      if (!drag.current.active) return;
      e.preventDefault();
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;

      const now = performance.now();
      drag.current.history.push({ x: e.clientX, y: e.clientY, t: now });
      drag.current.history = drag.current.history.filter((p) => now - p.t < 80);
    };

    const onUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;

      const h = drag.current.history;
      if (h.length >= 2) {
        const first = h[0];
        const last = h[h.length - 1];
        const dt = Math.max(last.t - first.t, 1);
        drag.current.flingVx = ((last.x - first.x) / dt) * 1.8;
        drag.current.flingVy = -((last.y - first.y) / dt) * 1.8;
      } else {
        drag.current.flingVx = 0;
        drag.current.flingVy = 0;
      }
      drag.current.justReleased = true;
    };

    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className="dice-overlay">
      <Canvas
        camera={{
          position: [0, 0, 900],
          fov: 18,
          near: 0.1,
          far: 5000,
        }}
        dpr={[1, 1]}
        gl={{ antialias: true }}
        resize={{ scroll: false, offsetSize: false }}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <ambientLight intensity={5} />
        <hemisphereLight args={[0xffffff, 0x444444, 1.2]} />
        <directionalLight position={[5, 5, 5]} intensity={3} />

        <Shadow targetRef={diceRef} />
        <DiceModel diceRef={diceRef} drag={drag} cameraRef={cameraRef} />
      </Canvas>

      <style jsx>{`
        .dice-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 99;
        }
      `}</style>
    </div>
  );
}
