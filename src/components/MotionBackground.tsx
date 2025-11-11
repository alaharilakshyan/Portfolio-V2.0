// src/components/MotionBackground.tsx
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const MotionBackground = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance',
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create a gradient background
    const gradientTexture = new THREE.TextureLoader().load(
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTExODI3O3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZGllbnQpIiAvPjwvc3ZnPg=='
    );
    scene.background = gradientTexture;

    // Particles
    const particlesCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    
    // Create a more interesting particle distribution
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a more spherical distribution
      const radius = Math.random() * 5 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Store scale for animation
      scaleArray[i / 3] = Math.random() * 0.5 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

    // Create a custom shader material for more interesting particles
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xef4444) }, // Red
        color2: { value: new THREE.Color(0x3b82f6) }, // Blue
      },
      vertexShader: `
        uniform float time;
        attribute float scale;
        varying vec3 vColor;
        
        void main() {
          vec3 pos = position;
          // Add some subtle movement
          pos.x += sin(time * 0.3 + position.y * 0.5) * 0.2;
          pos.y += cos(time * 0.2 + position.x * 0.5) * 0.2;
          
          // Calculate color based on position
          float colorFactor = (sin(position.x * 0.5 + time * 0.2) + 1.0) * 0.5;
          vColor = mix(color1, color2, colorFactor).rgb;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = scale * 2.0 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create a circular point
          float distanceToCenter = length(gl_PointCoord - 0.5);
          float alpha = smoothstep(0.5, 0.0, distanceToCenter);
          
          // Add a glow effect
          float glow = smoothstep(0.8, 0.0, distanceToCenter);
          alpha += glow * 0.5;
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesRef.current = particlesMesh;

    // Camera position
    camera.position.z = 8;

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    // Initialize clock
    clockRef.current = new THREE.Clock();
    
    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (!clockRef.current) return;
      
      const elapsedTime = clockRef.current.getElapsedTime();
      
      // Update particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.1;
        particlesRef.current.rotation.x = elapsedTime * 0.05;
        
        // Update shader uniform
        const material = particlesRef.current.material as THREE.ShaderMaterial;
        material.uniforms.time.value = elapsedTime;
      }
      
      renderer.render(scene, camera);
    };
    
    // Start animation loop
    animate();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 opacity-10" />;
};

export default MotionBackground;