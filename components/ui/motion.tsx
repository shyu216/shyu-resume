// Handle the animation of main content display

"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay: number;
  className?: string;
};

export default function Motion({ children, delay, className }: Props) {
  const fadeInUpwards = React.useMemo(
    () => ({
      initial: { opacity: 0, y: 32 },
      animate: { opacity: 1, y: 0 },
      transition: {
        type: "spring" as const,
        damping: 22,
        stiffness: 92,
        duration: 0.42,
      },
    }),
    []
  );

  return (
    <motion.div
      className={className}
      variants={fadeInUpwards}
      initial="initial"
      animate="animate"
      transition={{ ...fadeInUpwards.transition, delay: delay * 1.1 }}
    >
      {children}
    </motion.div>
  );
}
