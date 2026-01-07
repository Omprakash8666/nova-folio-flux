import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const AnimatedSphere = ({ position, color, speed = 1, distort = 0.4 }: { 
  position: [number, number, number]; 
  color: string;
  speed?: number;
  distort?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={0.8}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const AnimatedTorus = ({ position, color }: { 
  position: [number, number, number]; 
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Torus ref={meshRef} args={[1, 0.3, 32, 64]} position={position} scale={0.6}>
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Torus>
    </Float>
  );
};

const AnimatedIcosahedron = ({ position, color }: { 
  position: [number, number, number]; 
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron ref={meshRef} args={[1]} position={position} scale={0.5}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.95}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
};

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 -z-5">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
          <pointLight position={[10, -10, 5]} intensity={0.5} color="#00d4ff" />
          
          <AnimatedSphere position={[-3, 1.5, -2]} color="#00d4ff" distort={0.5} />
          <AnimatedSphere position={[3.5, -1, -1]} color="#a855f7" speed={0.7} distort={0.3} />
          <AnimatedTorus position={[-2.5, -1.5, 0]} color="#06b6d4" />
          <AnimatedIcosahedron position={[2.5, 2, -1]} color="#00d4ff" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
