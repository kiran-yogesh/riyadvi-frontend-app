import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function MilestoneGlobe() {
  const globeRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <group ref={globeRef}>
        {/* Outer Globe Mesh */}
        <mesh>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshStandardMaterial 
            color="#0A0A0C" 
            emissive="#D4AF37" 
            emissiveIntensity={0.25} 
            wireframe 
          />
        </mesh>

        {/* Milestone Pin 1: 2021 Foundation */}
        <mesh position={[1.8, 0.5, 0.8]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1} />
        </mesh>

        {/* Milestone Pin 2: 2023 Enterprise Scaling */}
        <mesh position={[-1.5, 0.8, -1.0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#F3E5AB" emissive="#F3E5AB" emissiveIntensity={1} />
        </mesh>

        {/* Milestone Pin 3: 2026 AI & Spatial computing */}
        <mesh position={[0.2, -1.8, 0.9]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#E6CA65" emissive="#E6CA65" emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function TimelineGlobeCanvas() {
  return (
    <div className="w-full h-80 relative rounded-2xl overflow-hidden glass-panel">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#F3E5AB" />
        <MilestoneGlobe />
      </Canvas>
    </div>
  );
}
