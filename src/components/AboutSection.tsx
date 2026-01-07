import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Technologies Mastered", value: "20+" },
    { label: "Happy Clients", value: "30+" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Background elements */}
      <div className="blur-shape w-[400px] h-[400px] bg-secondary top-20 right-0 opacity-10" />
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="section-container"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-3 mb-4">
            Passionate About Creating
            <span className="gradient-text block">Digital Excellence</span>
          </h2>
          <div className="neon-line max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a creative developer with a passion for building immersive digital 
              experiences that push the boundaries of what's possible on the web. 
              With expertise in modern frontend technologies and a keen eye for design, 
              I transform complex ideas into elegant, user-friendly applications.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in tech has taken me through startups, agencies, and enterprise 
              environments, where I've honed my skills in creating scalable, performant, 
              and visually stunning solutions. I believe in the power of code to create 
              meaningful experiences that resonate with users.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {["React", "Three.js", "TypeScript", "Node.js", "AWS"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full glass-card text-sm text-primary font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-500"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
