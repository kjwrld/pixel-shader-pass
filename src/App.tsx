import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { MeshPhongMaterial, IcosahedronGeometry } from "three";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import React from "react";

const CrystalMesh = () => {
  // Create a reference for the mesh
  const crystalMesh = useRef<THREE.Mesh>(null!);

  // Basic geometry and material for the crystal
  const geometry = new IcosahedronGeometry(0.4);
  const material = new MeshPhongMaterial({
    color: 0x2379cf,
    emissive: 0x143542,
    shininess: 100,
    specular: 0xffffff,
  });

  return (
    <mesh
      ref={crystalMesh}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
    />
  );
};

const Scene = () => {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={1.5} color={0x2d3645} />

      {/* Directional light */}
      <directionalLight intensity={0.5} position={[100, 100, 100]} castShadow />

      {/* The crystal mesh */}
      <CrystalMesh />
    </>
  );
};

const App = () => {
  // Inline styles to ensure the canvas takes up the full viewport
  const canvasStyle = {
    width: "100vw", // Viewport width
    height: "100vh", // Viewport height
    display: "block", // Remove default inline spacing for canvas
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 2], fov: 75 }}
      style={canvasStyle}
    >
      {/* Scene content */}
      <Scene />

      {/* Orbit controls to rotate around the scene */}
      <OrbitControls />
    </Canvas>
  );
};

export default App;
