import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const TECH_DETAILS = {
  'React': 'High-performance UI component architecture with concurrent rendering.',
  'Node.js': 'Event-driven, asynchronous I/O microservice backend stack.',
  'MongoDB': 'Scalable document database for complex data schemas.',
  'Three.js': 'WebGL 3D graphics library for browser-native spatial rendering.',
  'JavaScript': 'ES6+ modern engine logic powering full-stack web applications.',
  'Express': 'Lightweight REST API framework for robust HTTP routing.',
  'R3F': 'Declarative React wrapper for Three.js state and scene management.',
  'GSAP': 'Industry-standard timeline animation library for high-FPS triggers.',
  'Tailwind': 'Utility-first CSS engine for responsive, pixel-perfect interfaces.',
  'Docker': 'Containerized deployment infrastructure for microservice scaling.',
  'Python': 'Data analysis, AI pipeline processing, and backend automation.',
  'WebXR': 'Spatial browser standard for AR/VR immersive experiences.',
  'TypeScript': 'Strongly-typed JavaScript for enterprise codebase safety.'
};

const TECH_ITEMS = Object.keys(TECH_DETAILS);

function OrbitingTechSphere({ activeTech, setActiveTech }) {
  const groupRef = useRef();

  const items = useMemo(() => {
    const temp = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    const radius = 3.5;

    for (let i = 0; i < TECH_ITEMS.length; i++) {
      const y = 1 - (i / (TECH_ITEMS.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r * radius;
      const z = Math.sin(theta) * r * radius;

      temp.push({ name: TECH_ITEMS[i], position: [x, y * radius, z] });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.06) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#AA7C11"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Tech Badges */}
      {items.map((item, idx) => {
        const isSelected = activeTech === item.name;
        return (
          <Float key={idx} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group
              position={item.position}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTech(item.name);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
              }}
            >
              <mesh>
                <boxGeometry args={[1.5, 0.48, 0.12]} />
                <meshStandardMaterial
                  color={isSelected ? '#D4AF37' : '#0A0A0C'}
                  emissive={isSelected ? '#F3E5AB' : '#D4AF37'}
                  emissiveIntensity={isSelected ? 0.8 : 0.25}
                  metalness={0.8}
                  roughness={0.3}
                />
              </mesh>
              <Text
                position={[0, 0, 0.08]}
                fontSize={0.2}
                color={isSelected ? '#000000' : '#D4AF37'}
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
              >
                {item.name}
              </Text>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export default function TechEcosystemCanvas() {
  const [activeTech, setActiveTech] = useState('React');

  return (
    <div className="w-full h-80 md:h-[420px] relative rounded-2xl overflow-hidden glass-panel border border-gold-500/30">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#F3E5AB" />
        <OrbitingTechSphere activeTech={activeTech} setActiveTech={setActiveTech} />
      </Canvas>

      {/* Selected Tech Detail Overlay Overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-gold-500/40 shadow-gold-glow">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
          <h4 className="text-sm font-bold text-gold-400 font-heading">
            {activeTech} Engine
          </h4>
        </div>
        <p className="text-xs text-gray-300">
          {TECH_DETAILS[activeTech] || 'Core technology stack power.'}
        </p>
      </div>
    </div>
  );
}
