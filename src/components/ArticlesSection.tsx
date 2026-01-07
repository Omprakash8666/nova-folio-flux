import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Calendar, Clock } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Building Immersive 3D Experiences with React Three Fiber",
    excerpt: "Learn how to create stunning 3D web experiences using React Three Fiber and modern WebGL techniques.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    link: "#",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
  },
  {
    id: 2,
    title: "The Future of Frontend: WebGPU and Beyond",
    excerpt: "Exploring the next generation of web graphics APIs and what they mean for frontend developers.",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    link: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: 3,
    title: "Mastering Framer Motion: Advanced Animation Patterns",
    excerpt: "Deep dive into advanced animation techniques that will take your React applications to the next level.",
    date: "Nov 10, 2024",
    readTime: "10 min read",
    link: "#",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
  },
];

const ArticleCard = ({ article, index }: { article: Article; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="glass-card overflow-hidden group cursor-pointer"
      onClick={() => window.open(article.link, '_blank')}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>

        <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
          Read Article
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      </div>
    </motion.article>
  );
};

const ArticlesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="articles" className="relative section-padding overflow-hidden">
      {/* Background elements */}
      <div className="blur-shape w-[400px] h-[400px] bg-primary left-1/2 top-0 opacity-10" />

      <div ref={ref} className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Insights
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-3 mb-4">
            Featured
            <span className="gradient-text"> Articles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts on development, design, and the intersection of technology and creativity.
          </p>
          <div className="neon-line max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
