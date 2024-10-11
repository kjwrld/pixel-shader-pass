import React from "react";
import { CrystalMesh } from "./CrystalMesh.tsx";

export const CanvasScene = () => {
  return (
    <>
      <ambientLight intensity={1.5} color={0x2d3645} />
      <directionalLight intensity={1} position={[100, 100, 100]} castShadow />
      <CrystalMesh />
    </>
  );
};
