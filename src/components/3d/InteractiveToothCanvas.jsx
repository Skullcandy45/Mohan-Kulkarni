import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Shield,
  Eye,
  Sun,
  Maximize2,
  CheckCircle2,
  Info,
} from 'lucide-react';

// Shade guide definitions with authentic dental laboratory optical properties
const SHADES = {
  BL1: {
    name: 'Bleach 1 (Hollywood Bright)',
    desc: 'High-value, crystalline monolithic ceramic with radiant aesthetic luminance.',
    color: 0xffffff,
    emissive: 0x0a1414,
    roughness: 0.10,
    metalness: 0.02,
    transmission: 0.32,
    thickness: 1.3,
  },
  A1: {
    name: 'Natural Pearl A1',
    desc: 'Youthful vitality shade with warm opalescent enamel translucency.',
    color: 0xf8f7f2,
    emissive: 0x0f1614,
    roughness: 0.14,
    metalness: 0.02,
    transmission: 0.28,
    thickness: 1.25,
  },
  A2: {
    name: 'Classic Natural A2',
    desc: 'Gold-standard anatomical balance replicating authentic Indian dentition tone.',
    color: 0xf2ece0,
    emissive: 0x141812,
    roughness: 0.17,
    metalness: 0.02,
    transmission: 0.24,
    thickness: 1.2,
  },
  B1: {
    name: 'Warm Ivory B1',
    desc: 'Warm aesthetic tone preferred for natural smile makeovers.',
    color: 0xfbf8ec,
    emissive: 0x121810,
    roughness: 0.13,
    metalness: 0.02,
    transmission: 0.30,
    thickness: 1.28,
  },
};

/**
 * Creates an anatomically realistic molar crown with 4 distinct cusps,
 * developmental occlusal grooves, and gentle convex cervical curvature.
 */
function createAnatomicalCrownGeometry() {
  const radialSegments = 64;
  const heightSegments = 36;
  const geom = new THREE.CylinderGeometry(1.22, 1.05, 1.42, radialSegments, heightSegments, false);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    // Height ratio: 0 at base, 1 at top
    const u = (y + 0.71) / 1.42;

    // Organic bell-shaped molar waist
    const bulge = Math.sin(u * Math.PI) * 0.16;
    const r = Math.sqrt(x * x + z * z);
    if (r > 0.001) {
      x *= 1 + bulge;
      z *= 1 + bulge * 0.88; // slight mesio-distal elongation
    }

    // Occlusal table sculpting: 4 anatomical cusps
    if (u > 0.48) {
      const weight = Math.pow((u - 0.48) / 0.52, 1.7);
      const angle = Math.atan2(z, x);
      const rad = Math.sqrt(x * x + z * z);
      const normRad = rad / 1.22;

      // 4 quadrant cusps (peaks at ~45°, 135°, 225°, 315°)
      const cuspWave = Math.sin(angle * 2 + 0.35) * 0.18 * weight;

      // Smooth central developmental fossa (not a harsh slit)
      const centralFossa = (1 - Math.min(1, normRad * 2.1)) * -0.13 * weight;

      // Anatomical marginal ridge rim
      const marginalRidge = Math.exp(-Math.pow(normRad - 0.78, 2) * 16) * 0.15 * weight;

      y += cuspWave + centralFossa + marginalRidge;
    }

    // Cervical line (CEJ) gentle scalloping
    if (u < 0.22) {
      const cejAngle = Math.atan2(z, x);
      const cejWave = Math.sin(cejAngle * 2) * 0.035 * (1 - u / 0.22);
      y += cejWave;
    }

    pos.setXYZ(i, x, y, z);
  }

  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates smooth, anatomically curved roots using CatmullRom splines
 * with natural flare and rounded apical tips (no pointy cones).
 */
function createAnatomicalRootsGroup() {
  const rootGroup = new THREE.Group();

  const rootMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf0e6d2,
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 0.25,
    clearcoatRoughness: 0.2,
  });

  // Root 1 (Mesial) — curves slightly laterally then hooks gently inwards
  const curve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.35, 0.0, 0.0),
    new THREE.Vector3(-0.48, -0.6, 0.05),
    new THREE.Vector3(-0.52, -1.3, 0.02),
    new THREE.Vector3(-0.44, -1.95, -0.04),
    new THREE.Vector3(-0.38, -2.25, -0.06),
  ]);

  const rootGeo1 = new THREE.TubeGeometry(curve1, 32, 0.36, 24, false);
  const rootMesh1 = new THREE.Mesh(rootGeo1, rootMaterial);
  rootGroup.add(rootMesh1);

  // Rounded apex tip for Root 1
  const apex1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 16, 16),
    rootMaterial
  );
  apex1.position.set(-0.38, -2.25, -0.06);
  rootGroup.add(apex1);

  // Root 2 (Distal) — slightly straighter with gentle taper
  const curve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.35, 0.0, 0.0),
    new THREE.Vector3(0.48, -0.6, -0.04),
    new THREE.Vector3(0.50, -1.3, -0.02),
    new THREE.Vector3(0.42, -1.95, 0.03),
    new THREE.Vector3(0.36, -2.22, 0.05),
  ]);

  const rootGeo2 = new THREE.TubeGeometry(curve2, 32, 0.34, 24, false);
  const rootMesh2 = new THREE.Mesh(rootGeo2, rootMaterial);
  rootGroup.add(rootMesh2);

  // Rounded apex tip for Root 2
  const apex2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 16, 16),
    rootMaterial
  );
  apex2.position.set(0.36, -2.22, 0.05);
  rootGroup.add(apex2);

  // Furcation bridge connecting roots to crown
  const furcationGeo = new THREE.CylinderGeometry(0.85, 0.72, 0.45, 32);
  const furcationMesh = new THREE.Mesh(furcationGeo, rootMaterial);
  furcationMesh.position.y = -0.15;
  rootGroup.add(furcationMesh);

  return rootGroup;
}

/**
 * Creates an ultra-precision Swiss Grade-5 Titanium Implant with
 * gold anodized transmucosal abutment collar and micro-machined spiral threads.
 */
function createTitaniumImplantGroup() {
  const group = new THREE.Group();

  const tiMaterial = new THREE.MeshStandardMaterial({
    color: 0x7a8a9a,
    metalness: 0.94,
    roughness: 0.22,
  });

  const goldAbutmentMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.92,
    roughness: 0.18,
  });

  // 1. Gold Anodized Abutment Collar
  const abutmentGeo = new THREE.CylinderGeometry(0.88, 0.76, 0.5, 36);
  const abutmentMesh = new THREE.Mesh(abutmentGeo, goldAbutmentMat);
  abutmentMesh.position.y = -0.22;
  group.add(abutmentMesh);

  // Hex connection interface
  const hexGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.15, 6);
  const hexMesh = new THREE.Mesh(hexGeo, goldAbutmentMat);
  hexMesh.position.y = 0.08;
  group.add(hexMesh);

  // 2. Titanium Tapered Screw Body
  const screwBodyGeo = new THREE.CylinderGeometry(0.72, 0.34, 2.3, 36);
  const screwBody = new THREE.Mesh(screwBodyGeo, tiMaterial);
  screwBody.position.y = -1.55;
  group.add(screwBody);

  // 3. Precision Micro-machined Thread Rings
  for (let i = 0; i < 9; i++) {
    const threadRadius = 0.74 - i * 0.042;
    const ringGeo = new THREE.TorusGeometry(threadRadius, 0.055, 12, 36);
    ringGeo.rotateX(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, tiMaterial);
    ringMesh.position.y = -0.65 - i * 0.21;
    group.add(ringMesh);
  }

  // 4. Rounded Apex with Self-Tapping Geometry
  const apexGeo = new THREE.SphereGeometry(0.33, 24, 16);
  const apexMesh = new THREE.Mesh(apexGeo, tiMaterial);
  apexMesh.position.y = -2.7;
  group.add(apexMesh);

  return group;
}

export default function InteractiveToothCanvas({ className = '', height = '460px' }) {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState('enamel'); // 'enamel', 'implant', 'veneer', 'xray', 'aligner'
  const [activeShade, setActiveShade] = useState('BL1');
  const [lightingMode, setLightingMode] = useState('studio'); // 'studio', 'surgical', 'warm'
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const toothGroupRef = useRef(null);
  const crownMeshRef = useRef(null);
  const rootsGroupRef = useRef(null);
  const implantGroupRef = useRef(null);
  const alignerMeshRef = useRef(null);
  const pulpGroupRef = useRef(null);
  const lightsRef = useRef({});
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const rotVelocityRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  // 1. Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const heightPx = container.clientHeight || 460;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.1, 100);
    camera.position.set(0, 0.08, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting (Executive 3-Point Studio + Warm Amber Accent)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x75d0c5, 1.4);
    fillLight.position.set(-4, 0, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.4);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    lightsRef.current = { ambientLight, keyLight, fillLight, rimLight };

    // Tooth Group — vertically centered
    const toothGroup = new THREE.Group();
    toothGroup.position.set(0, 0.10, 0);
    scene.add(toothGroup);
    toothGroupRef.current = toothGroup;

    // 1. Anatomical Crown Mesh
    const crownGeo = createAnatomicalCrownGeometry();
    const shadeProps = SHADES.BL1;
    const crownMat = new THREE.MeshPhysicalMaterial({
      color: shadeProps.color,
      roughness: shadeProps.roughness,
      metalness: shadeProps.metalness,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transmission: shadeProps.transmission,
      thickness: shadeProps.thickness,
      ior: 1.54,
      reflectivity: 0.92,
      emissive: shadeProps.emissive,
      emissiveIntensity: 0.35,
    });
    const crownMesh = new THREE.Mesh(crownGeo, crownMat);
    crownMesh.position.y = 0.55;
    toothGroup.add(crownMesh);
    crownMeshRef.current = crownMesh;

    // 2. Anatomical Roots Group
    const rootsGroup = createAnatomicalRootsGroup();
    rootsGroup.position.y = -0.15;
    toothGroup.add(rootsGroup);
    rootsGroupRef.current = rootsGroup;

    // 3. Swiss Titanium Implant Group
    const implantGroup = createTitaniumImplantGroup();
    implantGroup.position.y = -0.15;
    implantGroup.visible = false;
    toothGroup.add(implantGroup);
    implantGroupRef.current = implantGroup;

    // 4. Internal Vascular Pulp Chamber (for X-Ray mode)
    const pulpGroup = new THREE.Group();
    const pulpCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.45, 0),
      new THREE.Vector3(0, 0.05, 0),
      new THREE.Vector3(-0.25, -0.9, 0),
      new THREE.Vector3(-0.35, -1.9, 0),
    ]);
    const pulpGeo = new THREE.TubeGeometry(pulpCurve, 24, 0.1, 16, false);
    const pulpMat = new THREE.MeshStandardMaterial({
      color: 0xff3b5c,
      emissive: 0xff1e46,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });
    const pulpMesh = new THREE.Mesh(pulpGeo, pulpMat);
    pulpGroup.add(pulpMesh);

    // Second branch
    const pulpCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.25, 0),
      new THREE.Vector3(0.25, -0.9, 0),
      new THREE.Vector3(0.32, -1.9, 0),
    ]);
    const pulpGeo2 = new THREE.TubeGeometry(pulpCurve2, 24, 0.09, 16, false);
    const pulpMesh2 = new THREE.Mesh(pulpGeo2, pulpMat);
    pulpGroup.add(pulpMesh2);

    pulpGroup.visible = false;
    toothGroup.add(pulpGroup);
    pulpGroupRef.current = pulpGroup;

    // 5. Clear Aligner Shield
    const alignerGeo = new THREE.CylinderGeometry(1.36, 1.15, 1.6, 36, 8);
    const alignerMat = new THREE.MeshPhysicalMaterial({
      color: 0xa5f3fc,
      transparent: true,
      opacity: 0,
      roughness: 0.03,
      transmission: 0.95,
      ior: 1.48,
      reflectivity: 0.95,
    });
    const alignerMesh = new THREE.Mesh(alignerGeo, alignerMat);
    alignerMesh.position.y = 0.55;
    toothGroup.add(alignerMesh);
    alignerMeshRef.current = alignerMesh;

    // Animation Loop
    let lastTime = performance.now();
    const animate = (time) => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Auto rotation
      if (autoRotate && !isDraggingRef.current && toothGroupRef.current) {
        toothGroupRef.current.rotation.y += delta * 0.18;
      }

      // Inertia drag damping
      if (!isDraggingRef.current && toothGroupRef.current) {
        toothGroupRef.current.rotation.y += rotVelocityRef.current.x;
        toothGroupRef.current.rotation.x += rotVelocityRef.current.y;
        rotVelocityRef.current.x *= 0.88;
        rotVelocityRef.current.y *= 0.88;

        // Clamp x rotation to avoid flipping upside down
        toothGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, toothGroupRef.current.rotation.x));
      }

      renderer.render(scene, camera);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Responsive resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 2. Handle Drag to Rotate
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !toothGroupRef.current) return;
    const dx = e.clientX - prevMousePosRef.current.x;
    const dy = e.clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };

    toothGroupRef.current.rotation.y += dx * 0.008;
    toothGroupRef.current.rotation.x += dy * 0.008;
    rotVelocityRef.current = { x: dx * 0.004, y: dy * 0.004 };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !toothGroupRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - prevMousePosRef.current.x;
    const dy = e.touches[0].clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    toothGroupRef.current.rotation.y += dx * 0.008;
    toothGroupRef.current.rotation.x += dy * 0.008;
    rotVelocityRef.current = { x: dx * 0.004, y: dy * 0.004 };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // 3. Update Shade Properties
  useEffect(() => {
    if (!crownMeshRef.current) return;
    const s = SHADES[activeShade] || SHADES.BL1;
    const mat = crownMeshRef.current.material;

    if (activeMode === 'xray') {
      mat.transparent = true;
      mat.opacity = 0.35;
      mat.roughness = 0.08;
      mat.transmission = 0.7;
    } else if (activeMode === 'veneer') {
      mat.color.setHex(s.color);
      mat.emissive.setHex(0x1a2622);
      mat.roughness = 0.08;
      mat.transmission = 0.42;
      mat.transparent = false;
      mat.opacity = 1.0;
    } else {
      mat.color.setHex(s.color);
      mat.emissive.setHex(s.emissive);
      mat.roughness = s.roughness;
      mat.transmission = s.transmission;
      mat.transparent = false;
      mat.opacity = 1.0;
    }
  }, [activeShade, activeMode]);

  // 4. Update Treatment Layer Mode
  useEffect(() => {
    if (!crownMeshRef.current) return;

    const roots = rootsGroupRef.current;
    const implant = implantGroupRef.current;
    const aligner = alignerMeshRef.current;
    const pulp = pulpGroupRef.current;

    // Reset components visibility
    if (activeMode === 'implant') {
      if (roots) roots.visible = false;
      if (implant) implant.visible = true;
      if (aligner) aligner.material.opacity = 0;
      if (pulp) pulp.visible = false;
    } else if (activeMode === 'xray') {
      if (roots) roots.visible = true;
      if (implant) implant.visible = false;
      if (aligner) aligner.material.opacity = 0;
      if (pulp) pulp.visible = true;
    } else if (activeMode === 'aligner') {
      if (roots) roots.visible = true;
      if (implant) implant.visible = false;
      if (aligner) aligner.material.opacity = 0.75;
      if (pulp) pulp.visible = false;
    } else {
      // 'enamel' or 'veneer'
      if (roots) roots.visible = true;
      if (implant) implant.visible = false;
      if (aligner) aligner.material.opacity = 0;
      if (pulp) pulp.visible = false;
    }
  }, [activeMode]);

  // 5. Update Lighting Mode
  useEffect(() => {
    const { keyLight, fillLight, rimLight } = lightsRef.current;
    if (!keyLight) return;

    if (lightingMode === 'surgical') {
      keyLight.intensity = 3.2;
      keyLight.color.setHex(0xffffff);
      fillLight.intensity = 1.8;
      fillLight.color.setHex(0xe0f2fe);
      rimLight.intensity = 1.6;
      rimLight.color.setHex(0xffffff);
    } else if (lightingMode === 'warm') {
      keyLight.intensity = 2.4;
      keyLight.color.setHex(0xfffaed);
      fillLight.intensity = 1.2;
      fillLight.color.setHex(0xfef3c7);
      rimLight.intensity = 2.8;
      rimLight.color.setHex(0xf59e0b);
    } else {
      // 'studio'
      keyLight.intensity = 2.6;
      keyLight.color.setHex(0xffffff);
      fillLight.intensity = 1.3;
      fillLight.color.setHex(0x75d0c5);
      rimLight.intensity = 2.2;
      rimLight.color.setHex(0xd4af37);
    }
  }, [lightingMode]);

  const resetOrientation = useCallback(() => {
    if (toothGroupRef.current) {
      toothGroupRef.current.rotation.set(0, 0, 0);
      rotVelocityRef.current = { x: 0, y: 0 };
    }
  }, []);

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-2xl border border-white/70 shadow-[0_24px_70px_-20px_rgba(10,35,35,0.12)] flex flex-col ${className}`}>
      {/* Top Clinical Header Ribbon inside 3D Card */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#0B3A3E]/8 via-[#0B3A3E]/4 to-transparent border-b border-[#0B3A3E]/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-[#0B3A3E] tracking-wide uppercase">
            3D Anatomical Visualizer
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#C5A880]/20 text-[#8C6D37] border border-[#C5A880]/40">
            Micro-Precision Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-[#0F172A]/60 bg-white/70 px-2.5 py-1 rounded-full border border-black/5 shadow-xs">
            <RotateCcw size={11} className={autoRotate ? 'animate-spin-slow text-[#0B3A3E]' : 'text-[#0F172A]/40'} />
            Drag to Inspect 360°
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div
        ref={mountRef}
        style={{ height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full relative cursor-grab active:cursor-grabbing select-none overflow-hidden bg-gradient-to-b from-white/40 via-[#F4F9F9]/60 to-[#EBF4F4]/80"
      >
        {/* Ambient background surgical glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#0B3A3E]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-[#C5A880]/10 blur-2xl pointer-events-none" />

        {/* Hotspot triggers overlay */}
        <div className="absolute inset-x-4 top-4 flex justify-between pointer-events-none z-10">
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 'occlusal' ? null : 'occlusal')}
            className="pointer-events-auto group inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#0B3A3E] text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm border border-[#0B3A3E]/15 transition-all hover:scale-105"
          >
            <Sparkles size={12} className="text-[#C5A880]" />
            <span>Biomimetic Occlusion</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 'root' ? null : 'root')}
            className="pointer-events-auto group inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#0B3A3E] text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm border border-[#0B3A3E]/15 transition-all hover:scale-105"
          >
            <Shield size={12} className="text-[#0B3A3E]" />
            <span>Osseointegration Zone</span>
          </button>
        </div>

        {/* Active Hotspot Info Card */}
        {activeHotspot && (
          <div className="absolute inset-x-4 bottom-4 z-20 mx-auto max-w-sm bg-[#082427]/95 text-white backdrop-blur-xl p-4 rounded-2xl border border-white/15 shadow-2xl animate-fade-in">
            <div className="flex items-start justify-between mb-1.5">
              <h4 className="text-xs font-bold text-[#D4AF37] tracking-wide uppercase">
                {activeHotspot === 'occlusal' ? 'Natural Biomimetic Occlusion' : 'Swiss Grade-5 Titanium Implant'}
              </h4>
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="text-white/60 hover:text-white text-xs p-1"
                aria-label="Close information"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-white/80 leading-relaxed font-sans">
              {activeHotspot === 'occlusal'
                ? 'Sculpted with monolithic multi-translucent zirconia reproducing natural enamel hardness (380 HV) and light scattering.'
                : 'Sandblasted, acid-etched titanium screw promoting rapid bone integration within 21 days for permanent chewing stability.'}
            </p>
          </div>
        )}
      </div>

      {/* Control Panel Dock */}
      <div className="p-4 sm:p-5 bg-white/95 border-t border-[#0B3A3E]/10 flex flex-col gap-3.5">
        {/* Layer 1: 3D Treatment Visualization Layers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3A3E]/70 flex items-center gap-1.5">
            <Layers size={13} className="text-[#0B3A3E]" /> 3D Treatment Layer:
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'enamel', label: 'Natural Enamel' },
              { id: 'implant', label: 'Swiss Implant' },
              { id: 'veneer', label: 'E.max Veneer' },
              { id: 'xray', label: 'Internal Anatomy' },
              { id: 'aligner', label: 'Clear Aligner' },
            ].map((m) => {
              const active = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveMode(m.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                    active
                      ? 'bg-[#0B3A3E] text-white shadow-sm ring-1 ring-[#C5A880]/50'
                      : 'bg-[#F4F8F8] text-[#0F172A]/75 hover:bg-[#E8F1F1] hover:text-[#0B3A3E]'
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Layer 2: Shade Guide & Stage Controls */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-slate-100">
          {/* Shade Guide */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#0F172A]/70">Shade Guide:</span>
            <div className="flex items-center gap-1">
              {['BL1', 'A1', 'A2', 'B1'].map((code) => {
                const isSelected = activeShade === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setActiveShade(code)}
                    title={SHADES[code].name}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border font-bold transition-all ${
                      isSelected
                        ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#8A6728] shadow-xs'
                        : 'border-slate-200 bg-white text-[#0F172A]/70 hover:border-slate-300'
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Lighting & Rotation Controls */}
          <div className="flex items-center gap-2">
            {/* Lighting Toggle */}
            <div className="flex items-center bg-[#F1F6F6] p-0.5 rounded-lg border border-slate-200/60">
              <button
                type="button"
                onClick={() => setLightingMode('studio')}
                title="Studio Softbox"
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  lightingMode === 'studio' ? 'bg-white shadow-xs text-[#0B3A3E]' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Sun size={12} />
              </button>
              <button
                type="button"
                onClick={() => setLightingMode('surgical')}
                title="Surgical Operatory LED"
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  lightingMode === 'surgical' ? 'bg-white shadow-xs text-[#0B3A3E]' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Eye size={12} />
              </button>
            </div>

            {/* Auto Rotate Toggle */}
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                autoRotate
                  ? 'border-[#0B3A3E]/30 bg-[#0B3A3E]/5 text-[#0B3A3E] font-medium'
                  : 'border-slate-200 bg-white text-slate-500 hover:text-slate-700'
              }`}
            >
              <RotateCcw size={11} className={autoRotate ? 'animate-spin-slow' : ''} />
              <span className="hidden sm:inline">{autoRotate ? 'Pause Rotation' : 'Spin 360°'}</span>
            </button>

            {/* Reset Camera Button */}
            <button
              type="button"
              onClick={resetOrientation}
              title="Reset View Orientation"
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-[#0B3A3E] hover:border-[#0B3A3E]/30 transition-colors"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
