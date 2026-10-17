import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, MapPin, Radio, Compass, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { Article, Region, LanguageCode } from '../types/news';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollGlobeSceneProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  currentRegion: Region;
  onSelectRegion: (region: Region) => void;
  languageMode?: LanguageCode;
}

interface GeoPoint {
  name: string;
  lat: number;
  lng: number;
  articleId?: string;
  category: string;
  headline: string;
  isIndia: boolean;
}

const GEO_POINTS: GeoPoint[] = [
  {
    name: 'New Delhi',
    lat: 28.6139,
    lng: 77.2090,
    category: 'Judiciary & Policy',
    headline: 'Supreme Court 9-Judge Bench Mineral Cess Verdict',
    isIndia: true,
  },
  {
    name: 'Sriharikota',
    lat: 13.7199,
    lng: 80.2305,
    category: 'Space & S&T',
    headline: 'ISRO Gaganyaan CE-20 Cryogenic Validation',
    isIndia: true,
  },
  {
    name: 'Dholera',
    lat: 22.2472,
    lng: 72.1932,
    category: 'Hardware & AI',
    headline: 'First Commercial 28nm Wafer Fab Commences Pilot Run',
    isIndia: true,
  },
  {
    name: 'Thar Complex',
    lat: 27.0238,
    lng: 71.9056,
    category: 'Renewables & Grid',
    headline: '10GW Solar-Wind BESS Corridor Energized',
    isIndia: true,
  },
  {
    name: 'Shambhu / Punjab',
    lat: 30.2922,
    lng: 76.7329,
    category: 'Protests & Movements',
    headline: 'Kisan Mahapanchayat for Statutory MSP Framework',
    isIndia: true,
  },
  {
    name: 'Geneva / UN',
    lat: 46.2044,
    lng: 6.1432,
    category: 'Global Governance',
    headline: 'UN Multilateral Loss & Damage Fund Modalities Finalized',
    isIndia: false,
  },
  {
    name: 'Washington D.C.',
    lat: 38.9072,
    lng: -77.0369,
    category: 'International Relations',
    headline: 'IMEC Multimodal Trade Customs Protocols Ratified',
    isIndia: false,
  },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const ScrollGlobeScene: React.FC<ScrollGlobeSceneProps> = ({
  articles,
  onSelectArticle,
  currentRegion,
  onSelectRegion,
  languageMode = 'en',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedPin, setSelectedPin] = useState<GeoPoint>(GEO_POINTS[0]);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);

  const indiaStories = articles.filter((a) => a.region === 'india').slice(0, 3);
  const worldStories = articles.filter((a) => a.region === 'world').slice(0, 3);

  useEffect(() => {
    const canvasContainer = canvasRef.current;
    if (!canvasContainer) return;

    const width = canvasContainer.clientWidth || 500;
    const height = canvasContainer.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Initial orientation: Center India (approx lat 20.59, lng 78.96)
    const initialPhi = (90 - 22) * (Math.PI / 180);
    const initialTheta = (78 + 180) * (Math.PI / 180);
    globeGroup.rotation.y = -initialTheta + Math.PI / 2;
    globeGroup.rotation.x = initialPhi - Math.PI / 2;

    // 1. Dark celestial sphere
    const sphereGeo = new THREE.SphereGeometry(75, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x0a101d,
      transparent: true,
      opacity: 0.9,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphere);

    // 2. Wireframe / Graticule mesh
    const wireframeGeo = new THREE.SphereGeometry(75.5, 24, 16);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x223554,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeMesh);

    // 3. Dot particle points on globe surface
    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 76;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 1.5,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particles);

    // 4. News Beacon Pins
    GEO_POINTS.forEach((pt) => {
      const pos = latLngToVector3(pt.lat, pt.lng, 76.5);
      const beaconGeo = new THREE.SphereGeometry(pt.isIndia ? 2.2 : 1.8, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: pt.isIndia ? 0xef4444 : 0x38bdf8,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      globeGroup.add(beacon);

      // Radar pulse ring
      const ringGeo = new THREE.RingGeometry(2.5, 3.8, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: pt.isIndia ? 0xef4444 : 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);
    });

    let animationFrameId: number;
    let autoRotate = true;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (autoRotate) {
        globeGroup.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
    };
    animate();

    // GSAP ScrollTrigger for Scroll-Driven Globe Rotation
    let trigger: ScrollTrigger | null = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && containerRef.current) {
      trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.5,
        onUpdate: (self) => {
          // As user scrolls through the section, rotate globe dynamically
          globeGroup.rotation.y = -initialTheta + Math.PI / 2 + self.progress * Math.PI * 1.5;
        },
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (trigger) trigger.kill();
      renderer.dispose();
      canvasContainer.innerHTML = '';
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#0B0E14] text-[#FAF6EE] py-16 transition-colors border-y border-white/10 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Masthead (Scene Three) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
                SCENE THREE // GEOSPATIAL INTELLIGENCE RADAR
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-headline uppercase text-white tracking-tight">
              India First. World In Focus.
            </h2>
            <p className="text-xs sm:text-sm font-editorial text-stone-300 mt-1">
              Interactive 3D planetary wireframe mapping verified ground dispatches across Indian capitals and international corridors.
            </p>
          </div>

          {/* Region Switcher */}
          <div className="flex items-center gap-2 border border-white/20 rounded p-1 bg-white/5 text-xs font-mono self-start md:self-auto">
            <button
              onClick={() => onSelectRegion('india')}
              className={`px-3 py-1 font-bold rounded transition-colors ${
                currentRegion === 'india'
                  ? 'bg-rose-600 text-white'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              INDIA PRIORITY DESK
            </button>
            <button
              onClick={() => onSelectRegion('world')}
              className={`px-3 py-1 font-bold rounded transition-colors ${
                currentRegion === 'world'
                  ? 'bg-indigo-600 text-white'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              WORLD AFFAIRS
            </button>
          </div>
        </div>

        {/* 2-Column Split: 3D Globe Radar & Real Geographic Telemetry Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
          
          {/* LEFT: 3D THREE.JS WIREFRAME GLOBE (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div
              ref={canvasRef}
              className="w-full h-[380px] sm:h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            />

            {/* Radar Coordinates HUD Badge */}
            <div className="absolute bottom-4 left-4 bg-stone-950/80 border border-white/20 p-2.5 rounded text-[10px] font-mono backdrop-blur-md">
              <div className="text-rose-400 font-bold uppercase">
                TARGET FOCUS: INDIA CORE // BHARAT
              </div>
              <div className="text-stone-400 mt-0.5">
                ACTIVE TELEMETRY BEACONS: 7 LOCATIONS
              </div>
            </div>

            {/* Selected Pin Callout */}
            {selectedPin && (
              <div className="absolute top-4 right-4 max-w-xs bg-stone-950/90 border border-white/20 p-3 rounded text-left backdrop-blur-md shadow-xl">
                <span className="text-[9px] font-mono uppercase text-indigo-400 font-bold block">
                  {selectedPin.category}
                </span>
                <span className="text-xs font-bold font-headline text-white block mt-0.5">
                  {selectedPin.name}: {selectedPin.headline}
                </span>
              </div>
            )}
          </div>

          {/* RIGHT: REAL TELEMETRY DISPATCHES FLANKING GLOBE (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border-b border-white/10 pb-2 flex items-center justify-between text-xs font-mono">
              <span className="text-stone-300 font-bold uppercase tracking-wider">
                {currentRegion === 'india' ? 'NATIONAL TELEMETRY FEED' : 'TRANS-OCEANIC TELEMETRY'}
              </span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                OFFICIAL FEEDS
              </span>
            </div>

            {/* Dispatches List */}
            <div className="space-y-3">
              {(currentRegion === 'india' ? indiaStories : worldStories).map((story, idx) => (
                <div
                  key={story.id}
                  onClick={() => onSelectArticle(story)}
                  className="p-4 border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 rounded-xs cursor-pointer transition-all group shadow-sm"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-1">
                    <span className="text-rose-400 font-bold uppercase">
                      BEACON #{idx + 1} // {story.category}
                    </span>
                    <span>{new Date(story.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold font-headline text-white group-hover:text-rose-300 transition-colors leading-snug">
                    {languageMode === 'hi' && story.hindiTitle ? story.hindiTitle : story.title}
                  </h4>

                  <p className="text-xs font-editorial text-stone-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {languageMode === 'hi' && story.hindiSummary ? story.hindiSummary : story.summary}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-stone-400 pt-2 border-t border-white/10">
                    <span className="truncate max-w-[180px]">{story.publisher}</span>
                    <span className="text-white font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      FULL INTELLIGENCE →
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
