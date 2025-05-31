'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = 400;
    const height = 400;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    // sensitivity
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.8; 
    controls.panSpeed = 0.7; 

    // lock vertical rotation (polar angle)
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let model = null;

    loader.load(
      '/models/submarine.glb',
      (gltf) => {
        model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.y = -0.5;
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

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

      controls.update(); // damping
      renderer.render(scene, camera);
    };

    animate();

    // clean-up function
    return () => {
      controls.dispose();
      renderer.dispose();
      // mountRef.current exists (?) before building child
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: 400, height: 400 }} />;
}