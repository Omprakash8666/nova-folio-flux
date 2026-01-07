import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { label: "Degree", value: "CSE" },
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies Mastered", value: "5+" },
    { label: "Learning Journey", value: "Ongoing" },
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
            Hi, I'm <span className="gradient-text">Omprakash T</span>
          </h2>
          <p className="text-xl text-muted-foreground">Computer Science and Engineering</p>
          <div className="neon-line max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Computer Science and Engineering student with a keen interest 
              in building innovative digital solutions. With a strong foundation in programming 
              and web development, I strive to create impactful applications that solve real-world problems.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My academic journey has equipped me with skills in various programming languages 
              and frameworks. I'm constantly learning and exploring new technologies to enhance 
              my development capabilities and contribute to meaningful projects.
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
