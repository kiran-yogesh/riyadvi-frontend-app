import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshWobbleMaterial, Float } from '@react-three/drei';

function InteractiveModel({ modelType }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  return (
    <Float speed={2} floatIntensity={1}>
      <mesh ref={meshRef}>
        {modelType === 'perfume-bottle' ? (
          <cylinderGeometry args={[0.5, 0.7, 2, 32]} />
        ) : modelType === 'astro-sphere' ? (
          <icosahedronGeometry args={[1.2, 4]} />
        ) : modelType === 'house-model' ? (
          <boxGeometry args={[1.5, 1.2, 1.5]} />
        ) : (
          <torusGeometry args={[0.9, 0.35, 16, 100]} />
        )}
        <MeshWobbleMaterial 
          color="#D4AF37" 
          emissive="#AA7C11" 
          emissiveIntensity={0.5} 
          metalness={0.9} 
          roughness={0.1}
          factor={0.2}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeDViewerModal({ isOpen, onClose, title, modelType }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl w-full max-w-3xl p-6 relative shadow-gold-glow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gold-400 font-heading">{title} — 3D Interactive Showcase</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold px-3 py-1 rounded-lg hover:bg-white/10 transition-all"
          >
            &times;
          </button>
        </div>

        <div className="w-full h-80 md:h-[400px] bg-black/50 rounded-xl overflow-hidden relative">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} color="#F3E5AB" />
            <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.5} />
            <InteractiveModel modelType={modelType} />
          </Canvas>
          <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-full text-xs text-gold-400 border border-gold-500/30">
            🖱️ Drag to rotate 3D model | Scroll to zoom
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gold-500 text-black font-semibold px-6 py-2 rounded-xl hover:bg-gold-400 transition-all"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
