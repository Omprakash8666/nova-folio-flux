import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, User, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 20px hsl(187 100% 50% / 0.2)",
    },
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Background elements */}
      <div className="blur-shape w-[500px] h-[500px] bg-secondary -right-48 top-1/2 opacity-10" />
      <div className="blur-shape w-[400px] h-[400px] bg-primary -left-32 bottom-0 opacity-10" />

      <div ref={ref} className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-3 mb-4">
            Let's Create
            <span className="gradient-text"> Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your vision to life.
          </p>
          <div className="neon-line max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 md:p-10 space-y-6"
          >
            {/* Name field */}
            <motion.div whileFocus="focus" variants={inputVariants} className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Name
              </label>
              <Input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-muted/50 border-border/50 focus:border-primary/50 transition-all duration-300"
              />
            </motion.div>

            {/* Email field */}
            <motion.div whileFocus="focus" variants={inputVariants} className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-muted/50 border-border/50 focus:border-primary/50 transition-all duration-300"
              />
            </motion.div>

            {/* Message field */}
            <motion.div whileFocus="focus" variants={inputVariants} className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Message
              </label>
              <Textarea
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="bg-muted/50 border-border/50 focus:border-primary/50 transition-all duration-300 resize-none"
              />
            </motion.div>

            {/* Submit button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>

            {/* Direct email link */}
            <p className="text-center text-sm text-muted-foreground">
              Or email me directly at{" "}
              <a
                href="mailto:hello@example.com"
                className="text-primary hover:underline"
              >
                hello@example.com
              </a>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
