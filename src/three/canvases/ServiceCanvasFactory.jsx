import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, PresentationControls } from '@react-three/drei';

function BrowserScene() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[2.2, 1.4, 0.1]} />
      <meshStandardMaterial color="#0A0A0C" emissive="#D4AF37" emissiveIntensity={0.3} metalness={0.8} />
    </mesh>
  );
}

function PhoneScene() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.0, 2.0, 0.12]} />
      <meshStandardMaterial color="#121216" emissive="#E6CA65" emissiveIntensity={0.4} metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

function GrowthScene() {
  return (
    <group>
      <mesh position={[-0.6, -0.4, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#AA7C11" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 1.4, 0.3]} />
        <meshStandardMaterial color="#D4AF37" />
      </mesh>
      <mesh position={[0.6, 0.4, 0]}>
        <boxGeometry args={[0.3, 2.0, 0.3]} />
        <meshStandardMaterial color="#F3E5AB" emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function ArVrScene() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    }
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.8, 0.25, 64, 16]} />
      <MeshWobbleMaterial color="#D4AF37" factor={0.6} speed={2} wireframe />
    </mesh>
  );
}

function Object3DScene() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.8;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.4;
    }
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
    </mesh>
  );
}

function FloatingUiScene() {
  return (
    <group>
      <Float speed={2} floatIntensity={1.5}>
        <mesh position={[-0.4, 0.3, 0]}>
          <planeGeometry args={[1.2, 0.7]} />
          <meshStandardMaterial color="#D4AF37" transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={3} floatIntensity={1}>
        <mesh position={[0.4, -0.3, 0.2]}>
          <planeGeometry args={[1.0, 0.6]} />
          <meshStandardMaterial color="#1C1C24" transparent opacity={0.9} />
        </mesh>
      </Float>
    </group>
  );
}

export default function ServiceCanvasFactory({ sceneType }) {
  return (
    <div className="w-full h-44 relative rounded-xl overflow-hidden glass-panel mb-4">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} color="#F3E5AB" />
        <PresentationControls global polar={[-0.4, 0.4]} azimuth={[-0.4, 0.4]}>
          {sceneType === 'browser' && <BrowserScene />}
          {sceneType === 'phone' && <PhoneScene />}
          {sceneType === 'growth' && <GrowthScene />}
          {sceneType === 'ar-vr' && <ArVrScene />}
          {sceneType === 'object3d' && <Object3DScene />}
          {sceneType === 'floating-ui' && <FloatingUiScene />}
        </PresentationControls>
      </Canvas>
    </div>
  );
}
