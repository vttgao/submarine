"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function FishyScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const w = mountRef.current.clientWidth;
    const h = 250;

    const scene = new THREE.Scene();

    const camSize = 5;
    const camera = new THREE.OrthographicCamera(
      -camSize,
      camSize,
      camSize,
      -camSize,
      0.1,
      100
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(3, 4, 5);
    scene.add(dir);

    const loader = new GLTFLoader();
    const fishes = [];

    loader.load("/models/fishy.glb", (gltf) => {
      for (let i = 0; i < 3; i++) {
        const m = gltf.scene.clone();
        m.scale.set(1.5, 1.5, 1.5);
        m.position.set(-6, -3 + i * 0.6, 0);
        fishes.push(m);
        scene.add(m);
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);

      fishes.forEach((f, i) => {
        f.position.x += 0.035;
        f.position.y += 0.018;

        if (f.position.x > 6) {
          f.position.x = -6;
          f.position.y = -3 + i * 0.6;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (renderer) renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "250px",
        position: "absolute",
        top: "160px",
        left: "0",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}
