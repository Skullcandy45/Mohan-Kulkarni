import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

const enamel = {
  color: '#F4F8FC',
  roughness: 0.22,
  metalness: 0.04,
  clearcoat: 1,
  clearcoatRoughness: 0.12,
  envMapIntensity: 0.85,
};

/** Procedural molar: lathe crown + twin root cones — no external assets */
function ProceduralTooth({ spin = true }) {
  const root = useRef(null);

  const crownGeometry = useMemo(() => {
    const profile = [
      new THREE.Vector2(0.0, 1.05),
      new THREE.Vector2(0.22, 1.08),
      new THREE.Vector2(0.48, 0.95),
      new THREE.Vector2(0.58, 0.72),
      new THREE.Vector2(0.62, 0.42),
      new THREE.Vector2(0.55, 0.18),
      new THREE.Vector2(0.42, 0.02),
      new THREE.Vector2(0.28, -0.05),
    ];
    const geo = new THREE.LatheGeometry(profile, 64);
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!spin || !root.current) return;
    root.current.rotation.y += delta * 0.55;
  });

  return (
    <group ref={root} position={[0, 0.05, 0]}>
      <mesh geometry={crownGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial {...enamel} />
      </mesh>

      <mesh position={[-0.14, -0.62, 0]} rotation={[0.08, 0, 0.12]} castShadow>
        <coneGeometry args={[0.16, 0.75, 32]} />
        <meshPhysicalMaterial {...enamel} color="#E8F0FA" />
      </mesh>
      <mesh position={[0.14, -0.62, 0]} rotation={[0.08, 0, -0.12]} castShadow>
        <coneGeometry args={[0.16, 0.75, 32]} />
        <meshPhysicalMaterial {...enamel} color="#E8F0FA" />
      </mesh>

      {/* Subtle enamel highlight strip */}
      <mesh position={[0.38, 0.55, 0.05]} rotation={[0, 0, -0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function Scene({ spin }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.35} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.45} color="#93C5FD" />
      <pointLight position={[0, 2, 3]} intensity={0.35} color="#EBF3FA" />
      <Environment preset="city" />
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.35} disabled={spin}>
        <ProceduralTooth spin={spin} />
      </Float>
    </>
  );
}

export default function ToothModel3D({ className = '', spin }) {
  const reduced = useReducedMotion();
  const shouldSpin = spin ?? !reduced;

  return (
    <div className={`relative ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0.05, 3.35], fov: 42, near: 0.1, far: 20 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene spin={shouldSpin} />
        </Suspense>
      </Canvas>
    </div>
  );
}
