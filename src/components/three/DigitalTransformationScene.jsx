import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MorphingMatrix({ activeStep }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * (0.2 + activeStep * 0.1);
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  // Dynamically change visual complexity and shape based on step
  const detail = Math.min(4, activeStep + 1);
  const color = activeStep >= 4 ? '#F3E5AB' : '#D4AF37';
  const emissive = activeStep >= 4 ? '#D4AF37' : '#AA7C11';

  return (
    <Float speed={2} floatIntensity={1}>
      <group ref={meshRef}>
        <mesh>
          <icosahedronGeometry args={[1.5, detail]} />
          <MeshWobbleMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.6}
            wireframe={activeStep < 3}
            factor={0.3}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Outer Halo Rings */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.2, 0.03, 16, 80]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

export default function DigitalTransformationScene({ activeStep = 0 }) {
  return (
    <div className="w-full h-72 md:h-96 relative rounded-2xl overflow-hidden glass-panel border border-gold-500/30">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#F3E5AB" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#D4AF37" />

        <MorphingMatrix activeStep={activeStep} />
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 bg-black/70 backdrop-blur-md rounded-xl border border-white/10 text-xs">
        <span className="font-accent text-gold-400 font-bold uppercase tracking-wider">
          Transformation Visualizer
        </span>
        <span className="text-gray-300 font-mono">
          Stage 0{activeStep + 1} / 06
        </span>
      </div>
    </div>
  );
}
