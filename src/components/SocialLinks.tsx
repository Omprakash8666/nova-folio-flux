import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube 
} from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  { name: "GitHub", icon: Github, href: "#", color: "#00d4ff" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "#0077b5" },
  { name: "Twitter", icon: Twitter, href: "#", color: "#1da1f2" },
  { name: "Instagram", icon: Instagram, href: "#", color: "#e4405f" },
  { name: "YouTube", icon: Youtube, href: "#", color: "#ff0000" },
];

const SocialLinks = () => {
  return (
    <section className="relative section-padding border-t border-border/30">
      <div className="section-container">
        <div className="flex flex-col items-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-display font-semibold mb-8"
          >
            Connect With Me
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  boxShadow: `0 0 30px ${social.color}40`,
                }}
                whileTap={{ scale: 0.95 }}
                className="glass-card p-4 rounded-xl group relative overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <social.icon 
                  className="h-6 w-6 relative z-10 transition-colors duration-300"
                  style={{
                    color: "hsl(var(--foreground))",
                  }}
                />
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${social.color}20, transparent 70%)`,
                  }}
                />
                
                {/* Border glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `inset 0 0 20px ${social.color}30`,
                  }}
                />

                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 group-hover:-bottom-8 transition-all duration-300 whitespace-nowrap">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
