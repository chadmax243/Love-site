import { motion } from "framer-motion";
// Fade + slide-up wrapper used for every page
export default function PageTransition({ children }) {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.main>
  );
}
