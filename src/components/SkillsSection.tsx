import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Three.js / WebGL", level: 85, category: "Frontend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Python", level: 80, category: "Backend" },
  { name: "PostgreSQL", level: 85, category: "Backend" },
  { name: "AWS / Cloud", level: 82, category: "DevOps" },
  { name: "Docker", level: 78, category: "DevOps" },
];

const SkillIcon = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

const SkillsVisualization = () => {
  const colors = ["#00d4ff", "#a855f7", "#06b6d4", "#8b5cf6"];
  const positions: [number, number, number][] = [
    [-2, 1, 0],
    [2, 1, 0],
    [-1, -1, 0.5],
    [1, -1, 0.5],
  ];

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="h-full w-full">
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        
        {positions.map((pos, i) => (
          <SkillIcon key={i} position={pos} color={colors[i % colors.length]} />
        ))}
      </Suspense>
    </Canvas>
  );
};

const SkillBar = ({ skill, index, isInView }: { skill: Skill; index: number; isInView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          style={{
            boxShadow: "0 0 10px hsl(187 100% 50% / 0.5)",
          }}
        />
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      {/* Background elements */}
      <div className="blur-shape w-[400px] h-[400px] bg-secondary right-0 bottom-20 opacity-10" />

      <div ref={ref} className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-3 mb-4">
            Skills &
            <span className="gradient-text"> Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience 
            with modern technologies.
          </p>
          <div className="neon-line max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Skills bars */}
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-primary mb-4">{category}</h3>
                <div className="space-y-4">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} isInView={isInView} />
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-[400px] glass-card hidden lg:block"
          >
            <SkillsVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
