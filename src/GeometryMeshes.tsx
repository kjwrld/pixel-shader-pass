import React, { useRef, useMemo } from "react";
import * as THREE from "three";

const boxData = [
  { size: 0.4, position: [0, 0.2, 0], rotation: [0, Math.PI / 4, 0] },
  { size: 0.2, position: [-0.4, 0.1, -0.15], rotation: [0, Math.PI / 4, 0] },
];

export const GeometryMeshes = () => {
  const planeMesh = useRef<THREE.Mesh>(null!);

  const planeGeometry = new THREE.PlaneGeometry(2, 2);
  const planeMaterial = new THREE.MeshPhongMaterial({});

  const boxes = useMemo(
    () =>
      boxData.map((box, index) => (
        <mesh
          key={index}
          position={
            new THREE.Vector3(box.position[0], box.position[1], box.position[2])
          }
          rotation={
            new THREE.Euler(box.rotation[0], box.rotation[1], box.rotation[2])
          }
          castShadow
          receiveShadow
        >
          <boxGeometry args={[box.size, box.size, box.size]} />
          <meshPhongMaterial attach="material" shininess={100} />
        </mesh>
      )),
    []
  );

  return (
    <>
      <mesh
        ref={planeMesh}
        geometry={planeGeometry}
        material={planeMaterial}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      />

      {boxes}
    </>
  );
};
