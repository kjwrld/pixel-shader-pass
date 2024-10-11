import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import React from "react";

const checkerTextureURL =
  "https://threejsfundamentals.org/threejs/resources/images/checker.png";

const boxData = [
  { size: 0.4, position: [0, 0.2, 0], rotation: [0, Math.PI / 4, 0] },
  { size: 0.2, position: [-0.4, 0.1, -0.15], rotation: [0, Math.PI / 4, 0] },
];

export const GeometryMeshes = () => {
  const planeMesh = useRef<THREE.Mesh>(null!);

  const texture = useLoader(TextureLoader, checkerTextureURL);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);

  const boxTexture = useMemo(() => {
    const newTexture = texture.clone();
    newTexture.repeat.set(1.5, 1.5);
    return newTexture;
  }, [texture]);

  const planeGeometry = new THREE.PlaneGeometry(2, 2);
  const planeMaterial = new THREE.MeshPhongMaterial({
    map: texture,
  });

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
          <meshPhongMaterial
            attach="material"
            map={boxTexture}
            shininess={100}
          />
        </mesh>
      )),
    [boxTexture]
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
