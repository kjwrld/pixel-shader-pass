import React, { useEffect, useRef } from "react";
import { CrystalMesh } from "./CrystalMesh.tsx";
import { GeometryMeshes } from "./GeometryMeshes.tsx";
import { OrthographicCamera } from "@react-three/drei";
import { useThree, Vector3 } from "@react-three/fiber";

export const CanvasScene = () => {
  const cameraRef = useRef(null);

  const { size } = useThree();

  const aspect = size.width / size.height;
  const cameraPosition: Vector3 = [0, 2 * Math.tan(Math.PI / 6), 2];

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.left = -aspect;
      cameraRef.current.right = aspect;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [aspect]);

  return (
    <>
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={cameraPosition}
        zoom={1}
        near={0.1}
        far={10}
        left={-aspect}
        right={aspect}
        top={1}
        bottom={-1}
      />
      <ambientLight intensity={2} color={0x2d3645} />
      <directionalLight intensity={2} position={[100, 100, 100]} castShadow />
      <spotLight
        position={[2, 2, 0]}
        angle={Math.PI / 16}
        penumbra={0.02}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <CrystalMesh />
      <GeometryMeshes />
    </>
  );
};
