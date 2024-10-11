import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useRef, useEffect } from "react";
import { EffectComposer } from "three-stdlib";
import RenderPixelatedPass from "./RenderPixelatedPass.ts";
import PostProcessing from "./PostProcessing.tsx";
import { useControls } from "leva";

extend({ EffectComposer, RenderPixelatedPass });

const CrystalMesh = () => {
  const crystalMesh = useRef<THREE.Mesh>(null!);

  const geometry = new THREE.IcosahedronGeometry(0.4);
  const material = new THREE.MeshPhongMaterial({
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
      <ambientLight intensity={1.5} color={0x2d3645} />
      <directionalLight intensity={0.5} position={[100, 100, 100]} castShadow />
      <CrystalMesh />
    </>
  );
};

const App = () => {
  const canvasStyle = {
    width: "100vw",
    height: "100vh",
    display: "block",
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 2], fov: 75 }}
      style={canvasStyle}
    >
      <Scene />
      <PostProcessing />
      <OrbitControls />
    </Canvas>
  );
};

export default App;
