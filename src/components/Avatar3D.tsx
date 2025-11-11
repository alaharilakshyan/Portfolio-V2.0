// src/components/Avatar3D.tsx
"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// Placeholder model - replace with your actual 3D model
function AvatarModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh 
          ref={meshRef}
          castShadow
          receiveShadow
          scale={1.5}
        >
          <torusKnotGeometry args={[0.8, 0.25, 256, 32]} />
          <meshStandardMaterial 
            color="#ef4444" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#ef4444"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Avatar3D() {
  return (
    <div className="w-full h-full">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.5} />
        
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <AvatarModel />
          <Environment preset="city" />
          
          <OrbitControls 
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.5}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}