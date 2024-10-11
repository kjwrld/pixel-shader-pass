import React from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PostProcessing from "./PostProcessing.tsx";
import { CanvasScene } from "./CanvasScene.tsx";

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
      <CanvasScene />
      <PostProcessing />
      <OrbitControls />
    </Canvas>
  );
};

export default App;
