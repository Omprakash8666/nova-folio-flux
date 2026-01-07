import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with seamless payments, inventory management, and personalized recommendations.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Growww",
    description: "A growth-focused platform designed to help users track and achieve their personal and professional goals.",
    techStack: ["React", "Python", "Firebase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Weather API",
    description: "A weather application that fetches real-time weather data using external APIs, displaying forecasts and current conditions.",
    techStack: ["React", "REST API", "JavaScript"],
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "API Based Spam Message Detector",
    description: "An intelligent spam detection system that uses API-based machine learning to classify and filter spam messages.",
    techStack: ["Python", "API", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    github: "#",
    demo: "#",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ 
          scale: 1.02,
          rotateY: 5,
          rotateX: -5,
        }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        className="glass-card overflow-hidden cursor-pointer group"
        onClick={() => setIsExpanded(true)}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        </div>
      </motion.div>

      {/* Expanded Modal */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-2 rounded-full glass-card hover:bg-primary/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold font-display mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-6">{project.description}</p>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full glass-card text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.github && (
                  <Button variant="glow" onClick={() => window.open(project.github, '_blank')}>
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                )}
                {project.demo && (
                  <Button variant="hero" onClick={() => window.open(project.demo, '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      {/* Background elements */}
      <div className="blur-shape w-[500px] h-[500px] bg-primary -left-64 top-1/2 opacity-10" />
      
      <div ref={ref} className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-3 mb-4">
            Featured
            <span className="gradient-text"> Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my expertise in building modern, 
            scalable, and visually stunning applications.
          </p>
          <div className="neon-line max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
