import { motion } from "framer-motion";
// Reusable pink tap-friendly button
export default function Button({ children, onClick, disabled }) {
  return (
    <motion.button
      className="btn"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.04 }}
    >
      {children}
    </motion.button>
  );
}
