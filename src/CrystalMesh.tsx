import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React from "react";

export const CrystalMesh = () => {
  const crystalMesh = useRef<THREE.Mesh>(null!);

  const geometry = new THREE.IcosahedronGeometry(0.2);
  const material = new THREE.MeshPhongMaterial({
    color: 0x2379cf,
    emissive: 0x143542,
    shininess: 100,
    specular: 0xffffff,
  });

  // Animate the emissive intensity and the y-position
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mat = crystalMesh.current.material as THREE.MeshPhongMaterial;

    // light shine
    mat.emissiveIntensity = Math.sin(t * 3) * 0.5 + 0.5;

    // up - down
    crystalMesh.current.position.y = 0.7 + Math.sin(t * 2) * 0.05;

    // rotation
    crystalMesh.current.rotation.y = t * Math.PI * 0.5; // Rotate at 0.5 * PI per second
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
