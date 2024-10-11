import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { EffectComposer } from "three-stdlib";
import RenderPixelatedPass from "./RenderPixelatedPass.ts";
import { useControls } from "leva";

const PostProcessing = () => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer>(null!);

  const { pixelSize, normalEdgeStrength, depthEdgeStrength } = useControls({
    pixelSize: { value: 8, min: 1, max: 20, step: 1 },
    normalEdgeStrength: { value: 2, min: 0, max: 2, step: 0.1 },
    depthEdgeStrength: { value: 0, min: 0, max: 1, step: 0.1 },
  });

  useEffect(() => {
    const pixelResolution = new THREE.Vector2(size.width, size.height)
      .divideScalar(pixelSize)
      .floor();

    composer.current = new EffectComposer(gl);

    const pixelPass = new RenderPixelatedPass(pixelResolution, scene, camera);

    pixelPass.fsQuad.material.uniforms.normalEdgeStrength.value =
      normalEdgeStrength;
    pixelPass.fsQuad.material.uniforms.depthEdgeStrength.value =
      depthEdgeStrength;

    composer.current.addPass(pixelPass);

    return () => composer.current?.dispose();
  }, [
    gl,
    scene,
    camera,
    size,
    pixelSize,
    normalEdgeStrength,
    depthEdgeStrength,
  ]);

  useFrame(() => composer.current?.render(), 1);

  return null;
};

export default PostProcessing;
