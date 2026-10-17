import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GlobeHero3DProps {
  region: 'india' | 'world' | 'all';
  onSelectHub?: (name: string) => void;
  className?: string;
}

interface HubPoint {
  name: string;
  lat: number;
  lng: number;
  isIndia?: boolean;
  category?: string;
}

const HUBS: HubPoint[] = [
  { name: 'New Delhi (Parliament & SC)', lat: 28.6139, lng: 77.2090, isIndia: true, category: 'Governance' },
  { name: 'Bengaluru (ISRO & Tech)', lat: 12.9716, lng: 77.5946, isIndia: true, category: 'Space & AI' },
  { name: 'Sriharikota (SDSC Launchpad)', lat: 13.7199, lng: 80.2305, isIndia: true, category: 'Gaganyaan' },
  { name: 'Dholera (Semiconductor Fab)', lat: 22.2472, lng: 72.1932, isIndia: true, category: 'Hardware' },
  { name: 'Thar Complex (Renewables)', lat: 27.0238, lng: 71.9056, isIndia: true, category: 'Clean Grid' },
  { name: 'Mumbai (RBI & Financial Capital)', lat: 19.0760, lng: 72.8777, isIndia: true, category: 'Economy' },
  { name: 'Geneva (UN Climate & Trade)', lat: 46.2044, lng: 6.1432, isIndia: false, category: 'Multilateral' },
  { name: 'Tokyo (Semiconductor Alliances)', lat: 35.6762, lng: 139.6503, isIndia: false, category: 'Global Tech' },
  { name: 'London (Financial Hub)', lat: 51.5074, lng: -0.1278, isIndia: false, category: 'Global Finance' },
  { name: 'Washington D.C. (Strategic Dialogue)', lat: 38.9072, lng: -77.0369, isIndia: false, category: 'Diplomacy' },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const GlobeHero3D: React.FC<GlobeHero3DProps> = ({ region, onSelectHub, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHub, setActiveHub] = useState<HubPoint | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Globe group for rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Core Sphere (translucent charcoal/dark slate with subtle rim)
    const sphereGeo = new THREE.SphereGeometry(75, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.85,
      wireframe: false,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphere);

    // 2. Elegant Graticule / Latitude & Longitude wireframe rings
    const wireframeGeo = new THREE.SphereGeometry(75.5, 24, 16);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x334155,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeMesh);

    // 3. Indian Subcontinent Highlight Arc / Equator Ring
    const equatorGeo = new THREE.RingGeometry(75.8, 76.2, 64);
    const equatorMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const equator = new THREE.Mesh(equatorGeo, equatorMat);
    equator.rotation.x = Math.PI / 2;
    globeGroup.add(equator);

    // 4. Dot lattice on the sphere
    const dotCount = 800;
    const dotPositions: number[] = [];
    const dotColors: number[] = [];

    for (let i = 0; i < dotCount; i++) {
      const lat = (Math.random() - 0.5) * 160;
      const lng = (Math.random() - 0.5) * 360;
      const v = latLngToVector3(lat, lng, 76);
      dotPositions.push(v.x, v.y, v.z);

      // Give higher intensity dots near Indian subcontinent coords
      const isNearIndia = lat > 8 && lat < 36 && lng > 68 && lng < 96;
      if (isNearIndia) {
        dotColors.push(0.95, 0.45, 0.2); // Saffron / Warm Amber
      } else {
        dotColors.push(0.4, 0.5, 0.7); // Subtle Slate Blue
      }
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });
    const pointsMesh = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(pointsMesh);

    // 5. Hub Beacon Markers
    const hubMarkers: THREE.Mesh[] = [];
    HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, 76.5);
      const markerGeo = new THREE.SphereGeometry(hub.isIndia ? 2.2 : 1.4, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({
        color: hub.isIndia ? 0xf97316 : 0x38bdf8,
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.copy(pos);
      marker.userData = { hub };
      globeGroup.add(marker);
      hubMarkers.push(marker);

      // Radar ring for Indian hubs
      if (hub.isIndia) {
        const ringGeo = new THREE.RingGeometry(2.6, 3.4, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xfb923c,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        globeGroup.add(ring);
      }
    });

    // Default angle: Centered on India (~lat 20, lng 78)
    const indiaTargetRotY = -((78.9 + 90) * (Math.PI / 180));
    const indiaTargetRotX = 0.35;
    globeGroup.rotation.y = indiaTargetRotY;
    globeGroup.rotation.x = indiaTargetRotX;

    // Interaction & Animation state
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let animationFrameId: number;
    let isVisible = true;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Handle document visibility to pause animation
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (!isDragging) {
        if (region === 'india') {
          // Gently oscillate around Indian subcontinent
          const targetY = indiaTargetRotY + Math.sin(Date.now() * 0.0006) * 0.15;
          globeGroup.rotation.y += (targetY - globeGroup.rotation.y) * 0.03;
          globeGroup.rotation.x += (indiaTargetRotX - globeGroup.rotation.x) * 0.03;
        } else {
          // Slow continuous planetary spin
          globeGroup.rotation.y += 0.0018;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 400;
      const newH = container.clientHeight || 350;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [region]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {webglSupported ? (
        <div ref={containerRef} className="w-full h-full min-h-[320px] cursor-grab active:cursor-grabbing" />
      ) : (
        <div className="w-full h-full min-h-[320px] flex items-center justify-center p-8 bg-slate-900 text-slate-300 text-center">
          <div>
            <div className="text-sm font-semibold tracking-wide uppercase text-indigo-400">Geospatial Intelligence Map</div>
            <div className="text-xs text-slate-400 mt-1">20.5937° N, 78.9629° E · India Subcontinent Focus</div>
          </div>
        </div>
      )}

      {/* Floating telemetry overlay card */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex items-center justify-between text-xs">
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-slate-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="font-tabular">
            {region === 'india' ? 'Focus: India & Regional Nodes (78.9° E)' : 'Focus: Global Strategic Corridors'}
          </span>
        </div>
        <div className="hidden sm:flex bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-slate-400 font-tabular">
          Drag to rotate globe
        </div>
      </div>
    </div>
  );
};
