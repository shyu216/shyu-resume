// Handle the animation of main content display

"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBgStyle } from "@/app/bg-styles/bg-style-provider";

type Props = {
  children: React.ReactNode;
  delay: number;
  className?: string;
};

export default function Motion({ children, delay, className }: Props) {
  const { motion: motionPreset } = useBgStyle();

  const fadeInUpwards = React.useMemo(
    () => ({
      initial: { opacity: 0, y: motionPreset.yOffset },
      animate: { opacity: 1, y: 0 },
      transition: {
        type: "spring" as const,
        damping: motionPreset.damping,
        stiffness: motionPreset.stiffness,
        duration: motionPreset.duration,
      },
    }),
    [motionPreset]
  );

  return (
    <motion.div
      className={className}
      variants={fadeInUpwards}
      initial="initial"
      animate="animate"
      transition={{ ...fadeInUpwards.transition, delay: delay * motionPreset.delayMultiplier }}
    >
      {children}
    </motion.div>
  );
}
