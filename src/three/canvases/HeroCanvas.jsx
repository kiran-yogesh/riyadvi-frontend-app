import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import HeroFallback from '../../components/common/HeroFallback';

function FloatingParticleField({ count = 120 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#D4AF37"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function ConnectedNodes({ count = 30, mousePos }) {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, [count]);

  const lines = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3.2) {
          pairs.push([nodes[i], nodes[j]]);
        }
      }
    }
    return pairs;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth mouse parallax interpolation
      const targetX = mousePos.current.x * 0.4;
      const targetY = mousePos.current.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.clock.getElapsedTime() * 0.05 + targetX,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1 + targetY,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={idx % 3 === 0 ? '#D4AF37' : '#FFFFFF'}
            emissive={idx % 3 === 0 ? '#D4AF37' : '#444444'}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {lines.map((pair, idx) => (
        <Line
          key={idx}
          points={[pair[0], pair[1]]}
          color="#D4AF37"
          lineWidth={0.6}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}

function CentralCore() {
  const coreRef = useRef();

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      coreRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
      <group>
        {/* Inner Crystalline Geometry */}
        <mesh ref={coreRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.4, 2]} />
          <MeshWobbleMaterial
            color="#D4AF37"
            emissive="#AA7C11"
            emissiveIntensity={0.4}
            wireframe
            factor={0.3}
            speed={1.5}
          />
        </mesh>

        {/* Outer Orbit Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroCanvas() {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (hasWebGLError) {
    return <HeroFallback />;
  }

  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none" data-cursor="3d">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: true }}
        onCreated={({ gl }) => {
          if (!gl.capabilities.isWebGL2) {
            console.warn('WebGL2 not detected, fallback enabled.');
          }
        }}
        onError={() => setHasWebGLError(true)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#F3E5AB" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#D4AF37" />

        <CentralCore />
        <ConnectedNodes count={35} mousePos={mousePos} />
        <FloatingParticleField count={100} />
      </Canvas>
    </div>
  );
}
