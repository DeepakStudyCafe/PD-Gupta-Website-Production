"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.98,
  },
};

const transition = {
  duration: 0.6,
  ease: [0.25, 0.8, 0.25, 1],
};

export default function TransitionProvider({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
