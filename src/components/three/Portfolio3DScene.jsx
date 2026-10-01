import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshWobbleMaterial, Text, Float } from '@react-three/drei';

function CaseStudyMesh({ projectTitle = 'Riyadvi Solution', modelType = 'browser' }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.8}>
      <group ref={meshRef}>
        {modelType === 'browser' ? (
          <group>
            {/* Monitor Frame */}
            <mesh>
              <boxGeometry args={[3.2, 2.0, 0.12]} />
              <meshStandardMaterial color="#0D0D11" emissive="#D4AF37" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Screen Panel */}
            <mesh position={[0, 0, 0.07]}>
              <planeGeometry args={[3.0, 1.8]} />
              <meshStandardMaterial color="#14141C" emissive="#AA7C11" emissiveIntensity={0.2} />
            </mesh>
            {/* Project Title Text */}
            <Text
              position={[0, 0, 0.09]}
              fontSize={0.22}
              color="#D4AF37"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {projectTitle}
            </Text>
          </group>
        ) : modelType === 'sphere' ? (
          <mesh>
            <icosahedronGeometry args={[1.4, 3]} />
            <MeshWobbleMaterial color="#D4AF37" emissive="#AA7C11" emissiveIntensity={0.5} wireframe factor={0.3} speed={1.5} />
          </mesh>
        ) : (
          <mesh>
            <torusKnotGeometry args={[1.0, 0.3, 64, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.4} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default function Portfolio3DScene({ projectTitle, modelType = 'browser' }) {
  return (
    <div className="w-full h-72 md:h-96 relative rounded-2xl overflow-hidden glass-panel border border-gold-500/30">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#F3E5AB" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#D4AF37" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} />

        <CaseStudyMesh projectTitle={projectTitle} modelType={modelType} />
      </Canvas>

      <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-full text-[11px] text-gold-400 border border-gold-500/30 font-accent">
        🖱️ Interactive 3D Case Study Frame
      </div>
    </div>
  );
}
