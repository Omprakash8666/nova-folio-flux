import { motion } from "framer-motion";
import { Download, FolderOpen, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingShapes from "./FloatingShapes";
import ParticleBackground from "./ParticleBackground";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <ParticleBackground />
      
      {/* Gradient blur shapes */}
      <div className="blur-shape w-[600px] h-[600px] bg-primary -top-48 -left-48 animate-glow-pulse" />
      <div className="blur-shape w-[500px] h-[500px] bg-secondary -bottom-32 -right-32 animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* 3D Floating shapes */}
      <FloatingShapes />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 section-container text-center px-4"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium tracking-wide">
            ✨ Welcome to my universe
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-10 leading-tight"
        >
          <span className="gradient-text glow-text">Omprakash T</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            variant="hero"
            size="lg"
            className="group"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Download Resume
          </Button>
          
          <Button
            variant="heroOutline"
            size="lg"
            className="group"
            onClick={scrollToProjects}
          >
            <FolderOpen className="mr-2 h-5 w-5" />
            View Projects
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer text-muted-foreground hover:text-primary transition-colors"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
