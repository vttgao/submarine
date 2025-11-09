"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = 400;
    const height = 400;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    // render
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);

    // fixed camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    // lighting
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemi);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const rim = new THREE.DirectionalLight(0x79909f, 3);
    rim.position.set(-4, -1, -3); // from back-left side
    scene.add(rim);

    // load
    const loader = new GLTFLoader();
    let model = null;

    loader.load(
      "/models/submarine.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(0.62, 0.62, 0.62);
        model.position.y = -0.5;

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.flatShading = false;
            child.material.needsUpdate = true;
          }
        });

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // animation loop
    let swimAngle = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      if (model) {
        swimAngle += 0.02;
        model.position.x = Math.sin(swimAngle) * 0.5;
        model.position.y = Math.sin(swimAngle * 2) * 0.2;
        model.rotation.z = Math.sin(swimAngle) * 0.1;
        model.rotation.y += 0.01;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // cleanup
    return () => {
      controls.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: 400, height: 400 }} />;
}
