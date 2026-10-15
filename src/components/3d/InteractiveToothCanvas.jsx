import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Sparkles, Layers, Shield, Eye, ZoomIn, ZoomOut, Sun } from 'lucide-react';

export default function InteractiveToothCanvas({ className = '', height = '500px', initialMode = 'enamel' }) {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState(initialMode); // 'enamel', 'implant', 'veneer', 'xray', 'aligner'
  const [activeShade, setActiveShade] = useState('BL1'); // 'BL1', 'A1', 'A2', 'B1'
  const [lightingMode, setLightingMode] = useState('studio'); // 'studio', 'surgical', 'warm'
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const toothGroupRef = useRef(null);
  const crownMeshRef = useRef(null);
  const rootMeshRef = useRef(null);
  const implantScrewRef = useRef(null);
  const alignerMeshRef = useRef(null);
  const pulpMeshRef = useRef(null);
  const keyLightRef = useRef(null);
  const fillLightRef = useRef(null);
  const rimLightRef = useRef(null);
  const particlesRef = useRef(null);

  // Shade color definitions
  const shades = {
    BL1: { color: 0xFDFEFE, emissive: 0x051010, roughness: 0.12, metalness: 0.05 },
    A1: { color: 0xF7F8F4, emissive: 0x0A1210, roughness: 0.18, metalness: 0.03 },
    A2: { color: 0xF0EFE6, emissive: 0x121510, roughness: 0.22, metalness: 0.02 },
    B1: { color: 0xF9F9F0, emissive: 0x0F140D, roughness: 0.16, metalness: 0.04 },
  };

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Dimensions
    const width = currentMount.clientWidth || 500;
    const heightPx = currentMount.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(0, 0.5, 6.2);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0x75CEC5, 1.6);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.DirectionalLight(0xC59A5A, 2.4);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // 5. Build Procedural 3D Tooth Model
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);
    toothGroupRef.current = toothGroup;

    // --- Crown Geometry (Molar with cusps) ---
    // Create an organic crown using a Lathe/Cylinder with vertex displacement
    const crownGeo = new THREE.CylinderGeometry(1.2, 1.05, 1.4, 48, 24);
    const pos = crownGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Cusp sculpting
      if (y > 0.3) {
        const cuspFactor = Math.cos(x * 2.8) * Math.sin(z * 2.8) * 0.22;
        const pit = (Math.abs(x) < 0.3 && Math.abs(z) < 0.3) ? -0.15 : 0;
        pos.setY(i, y + cuspFactor + pit);
      }
      // Rounded side contour
      const r = Math.sqrt(x * x + z * z);
      const bulge = Math.sin((y + 0.7) / 1.4 * Math.PI) * 0.15;
      if (r > 0.01) {
        pos.setX(i, x * (1 + bulge));
        pos.setZ(i, z * (1 + bulge));
      }
    }
    crownGeo.computeVertexNormals();

    const currentShadeProps = shades[activeShade] || shades.BL1;
    const crownMat = new THREE.MeshPhysicalMaterial({
      color: currentShadeProps.color,
      roughness: currentShadeProps.roughness,
      metalness: currentShadeProps.metalness,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
      transmission: 0.35,
      ior: 1.54,
      reflectivity: 0.9,
      thickness: 1.2,
      emissive: currentShadeProps.emissive,
      emissiveIntensity: 0.4,
    });
    const crownMesh = new THREE.Mesh(crownGeo, crownMat);
    crownMesh.position.y = 0.5;
    toothGroup.add(crownMesh);
    crownMeshRef.current = crownMesh;

    // --- Anatomical Double Root (Buccal & Lingual) ---
    const rootGroup = new THREE.Group();
    
    // Root 1
    const rootGeo1 = new THREE.ConeGeometry(0.55, 2.2, 32, 16);
    rootGeo1.translate(0, -1.1, 0);
    const rootMat = new THREE.MeshStandardMaterial({
      color: 0xF3E5CB,
      roughness: 0.45,
      metalness: 0.05,
    });
    const rootMesh1 = new THREE.Mesh(rootGeo1, rootMat);
    rootMesh1.position.set(-0.45, -0.2, 0);
    rootMesh1.rotation.z = 0.12;
    rootGroup.add(rootMesh1);

    // Root 2
    const rootGeo2 = rootGeo1.clone();
    const rootMesh2 = new THREE.Mesh(rootGeo2, rootMat);
    rootMesh2.position.set(0.45, -0.2, 0);
    rootMesh2.rotation.z = -0.12;
    rootGroup.add(rootMesh2);

    toothGroup.add(rootGroup);
    rootMeshRef.current = rootGroup;

    // --- Internal Pulp Chamber (Nerve Vascularity) ---
    const pulpGeo = new THREE.CylinderGeometry(0.25, 0.1, 1.8, 16);
    const pulpMat = new THREE.MeshBasicMaterial({
      color: 0xFF2D55,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const pulpMesh = new THREE.Mesh(pulpGeo, pulpMat);
    pulpMesh.position.y = -0.2;
    toothGroup.add(pulpMesh);
    pulpMeshRef.current = pulpMesh;

    // --- Titanium Implant Screw & Gold Abutment ---
    const implantGroup = new THREE.Group();
    implantGroup.visible = false;

    // Abutment (Gold collar)
    const abutmentGeo = new THREE.CylinderGeometry(0.85, 0.75, 0.45, 32);
    const abutmentMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.9,
      roughness: 0.2,
    });
    const abutmentMesh = new THREE.Mesh(abutmentGeo, abutmentMat);
    abutmentMesh.position.y = -0.25;
    implantGroup.add(abutmentMesh);

    // Titanium Threaded Screw Body
    const screwGeo = new THREE.CylinderGeometry(0.7, 0.35, 2.4, 32);
    const screwMat = new THREE.MeshStandardMaterial({
      color: 0x6E7B8B,
      metalness: 0.95,
      roughness: 0.25,
    });
    const screwMesh = new THREE.Mesh(screwGeo, screwMat);
    screwMesh.position.y = -1.6;
    implantGroup.add(screwMesh);

    // Screw Ribs / Threads
    for (let i = 0; i < 7; i++) {
      const ringR = 0.72 - i * 0.045;
      const ringGeo = new THREE.TorusGeometry(ringR, 0.06, 12, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, screwMat);
      ringMesh.position.y = -0.7 - i * 0.25;
      implantGroup.add(ringMesh);
    }
    toothGroup.add(implantGroup);
    implantScrewRef.current = implantGroup;

    // --- Invisalign Clear Aligner Shield ---
    const alignerGeo = new THREE.CylinderGeometry(1.35, 1.18, 1.6, 32, 8);
    const alignerMat = new THREE.MeshPhysicalMaterial({
      color: 0xA5F3FC,
      transparent: true,
      opacity: 0,
      roughness: 0.05,
      transmission: 0.9,
      ior: 1.45,
      reflectivity: 0.9,
    });
    const alignerMesh = new THREE.Mesh(alignerGeo, alignerMat);
    alignerMesh.position.y = 0.5;
    toothGroup.add(alignerMesh);
    alignerMeshRef.current = alignerMesh;

    // --- Floating Enamel Sparkle Particles ---
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x75CEC5,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // --- Mouse & Touch Drag Interaction ---
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDragging || !toothGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      toothGroupRef.current.rotation.y += deltaX * 0.008;
      toothGroupRef.current.rotation.x += deltaY * 0.008;
      // Clamp vertical tilt
      toothGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, toothGroupRef.current.rotation.x));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (autoRotate && !isDragging && toothGroupRef.current) {
        toothGroupRef.current.rotation.y += 0.006;
      }

      // Gently hover tooth up and down
      if (toothGroupRef.current) {
        toothGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      // Rotate particles slowly
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handling ---
    const handleResize = () => {
      if (!currentMount || !renderer || !camera) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Visual State according to activeMode
  useEffect(() => {
    if (!crownMeshRef.current || !rootMeshRef.current || !implantScrewRef.current || !pulpMeshRef.current || !alignerMeshRef.current) return;

    const crownMat = crownMeshRef.current.material;
    const rootGroup = rootMeshRef.current;
    const implantGroup = implantScrewRef.current;
    const pulpMat = pulpMeshRef.current.material;
    const alignerMat = alignerMeshRef.current.material;

    // Reset Defaults
    rootGroup.visible = true;
    implantGroup.visible = false;
    pulpMat.opacity = 0;
    alignerMat.opacity = 0;
    crownMat.opacity = 1.0;
    crownMat.transparent = false;
    crownMat.wireframe = false;

    if (activeMode === 'enamel') {
      crownMat.transmission = 0.35;
      crownMat.roughness = 0.12;
      crownMat.clearcoat = 0.9;
    } else if (activeMode === 'implant') {
      rootGroup.visible = false;
      implantGroup.visible = true;
      crownMat.transmission = 0.15;
      crownMat.roughness = 0.18;
    } else if (activeMode === 'veneer') {
      crownMat.transmission = 0.55;
      crownMat.roughness = 0.08;
      crownMat.clearcoat = 1.0;
    } else if (activeMode === 'xray') {
      crownMat.transparent = true;
      crownMat.opacity = 0.28;
      crownMat.transmission = 0.85;
      pulpMat.opacity = 0.85;
    } else if (activeMode === 'aligner') {
      alignerMat.opacity = 0.5;
    }
  }, [activeMode]);

  // Update Shade
  useEffect(() => {
    if (!crownMeshRef.current) return;
    const s = shades[activeShade] || shades.BL1;
    crownMeshRef.current.material.color.setHex(s.color);
    crownMeshRef.current.material.roughness = s.roughness;
    crownMeshRef.current.material.metalness = s.metalness;
  }, [activeShade]);

  // Update Lighting
  useEffect(() => {
    if (!keyLightRef.current || !fillLightRef.current || !rimLightRef.current) return;
    if (lightingMode === 'studio') {
      keyLightRef.current.color.setHex(0xffffff);
      keyLightRef.current.intensity = 2.8;
      fillLightRef.current.color.setHex(0x75CEC5);
      rimLightRef.current.color.setHex(0xC59A5A);
    } else if (lightingMode === 'surgical') {
      keyLightRef.current.color.setHex(0xF0FDFA);
      keyLightRef.current.intensity = 3.6;
      fillLightRef.current.color.setHex(0x2DD4BF);
      rimLightRef.current.color.setHex(0xE2E8F0);
    } else if (lightingMode === 'warm') {
      keyLightRef.current.color.setHex(0xFFFBEB);
      keyLightRef.current.intensity = 2.5;
      fillLightRef.current.color.setHex(0xFDE68A);
      rimLightRef.current.color.setHex(0xB45309);
    }
  }, [lightingMode]);

  const resetCamera = () => {
    if (toothGroupRef.current) {
      toothGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden glass-panel border border-dent-500/20 shadow-2xl flex flex-col ${className}`}>
      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        style={{ height }}
        className="w-full relative cursor-grab active:cursor-grabbing flex items-center justify-center bg-gradient-to-b from-[#0B2523]/5 to-[#0F766E]/10"
      >
        {/* Floating Interactive Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-dent-500/15 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-dent-900 tracking-wide">Live 3D Anatomical Engine</span>
        </div>

        {/* Orbit Hint */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 bg-dent-950/70 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium border border-white/10">
          <RotateCcw size={12} className="animate-spin-slow" /> Drag to inspect 360°
        </div>

        {/* Floating Hotspots Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <button
              onClick={() => setActiveHotspot(activeHotspot === 'crown' ? null : 'crown')}
              className="pointer-events-auto bg-white/90 hover:bg-white text-dent-900 text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg border border-dent-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Sparkles size={13} className="text-gold-500" />
              <span>Cuspal Anatomy</span>
            </button>
            <button
              onClick={() => setActiveHotspot(activeHotspot === 'implant' ? null : 'implant')}
              className="pointer-events-auto bg-white/90 hover:bg-white text-dent-900 text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg border border-dent-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Shield size={13} className="text-dent-600" />
              <span>Osseointegration Zone</span>
            </button>
          </div>

          {/* Active Hotspot Info Card */}
          {activeHotspot && (
            <div className="pointer-events-auto mx-auto max-w-sm bg-dent-950/90 text-white backdrop-blur-xl p-4 rounded-2xl border border-dent-400/30 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-dent-300">
                  {activeHotspot === 'crown' ? 'Natural Biomimetic Occlusion' : 'Swiss Grade-4 Titanium Root'}
                </h4>
                <button onClick={() => setActiveHotspot(null)} className="text-gray-400 hover:text-white text-xs">✕</button>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {activeHotspot === 'crown' 
                  ? 'Crafted with multi-layered monolithic E.max zirconia to replicate light refraction and tooth enamel hardness of 380 HV.'
                  : 'SLAactive surface promotes osteoblast attachment within 21 days for immediate chewing stability and lifetime bone retention.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3D Control Center Dock */}
      <div className="p-4 sm:p-5 bg-white/90 backdrop-blur-xl border-t border-dent-500/15 flex flex-col gap-3.5">
        {/* Row 1: Treatment Visualization Modes */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-dent-900/60 flex items-center gap-1.5">
            <Layers size={13} className="text-dent-600" /> 3D Treatment Layer:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'enamel', label: 'Natural Enamel' },
              { id: 'implant', label: 'Swiss Implant' },
              { id: 'veneer', label: 'E.max Veneer' },
              { id: 'xray', label: 'Pulp & Nerve (X-Ray)' },
              { id: 'aligner', label: 'Clear Aligner' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  activeMode === mode.id
                    ? 'bg-dent-600 text-white shadow-md shadow-dent-600/25 scale-[1.02]'
                    : 'bg-dent-50 text-dent-900/80 hover:bg-dent-100'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Shade Selector & Environmental Controls */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-dent-100">
          {/* Shade Picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-dent-900/70">Shade Guide:</span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'BL1', name: 'Bleach 1 (Hollywood)' },
                { id: 'A1', name: 'Natural Pearl A1' },
                { id: 'A2', name: 'Standard Ivory A2' },
                { id: 'B1', name: 'Bright Warm B1' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveShade(s.id)}
                  title={s.name}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-md border font-semibold transition-all ${
                    activeShade === s.id
                      ? 'border-gold-500 bg-gold-50 text-gold-800 shadow-sm'
                      : 'border-dent-200 bg-white text-dent-900/70 hover:border-dent-400'
                  }`}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Camera & Lighting Controls */}
          <div className="flex items-center gap-2">
            {/* Lighting Mode */}
            <div className="flex items-center gap-1 bg-dent-50 p-1 rounded-lg border border-dent-200/60">
              <button
                onClick={() => setLightingMode('studio')}
                title="Studio Softbox Lighting"
                className={`p-1.5 rounded text-xs transition-colors ${lightingMode === 'studio' ? 'bg-white shadow-xs text-dent-700' : 'text-dent-500 hover:text-dent-900'}`}
              >
                <Sun size={13} />
              </button>
              <button
                onClick={() => setLightingMode('surgical')}
                title="Surgical Operatory LED Ring"
                className={`p-1.5 rounded text-xs transition-colors ${lightingMode === 'surgical' ? 'bg-white shadow-xs text-dent-700' : 'text-dent-500 hover:text-dent-900'}`}
              >
                <Eye size={13} />
              </button>
            </div>

            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                autoRotate
                  ? 'border-dent-500/30 bg-dent-50 text-dent-700'
                  : 'border-gray-200 bg-white text-gray-500 hover:text-gray-700'
              }`}
            >
              <RotateCcw size={12} className={autoRotate ? 'animate-spin-slow' : ''} />
              <span className="hidden sm:inline">{autoRotate ? 'Pause Rotation' : 'Spin 360°'}</span>
            </button>

            {/* Reset Camera Button */}
            <button
              onClick={resetCamera}
              title="Reset View Orientation"
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-dent-700 hover:border-dent-300 transition-colors"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
