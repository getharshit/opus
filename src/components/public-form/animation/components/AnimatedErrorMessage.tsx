"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../AnimationProvider";
import { AnimatedComponentProps } from "../types";

interface AnimatedErrorMessageProps extends AnimatedComponentProps {
  isVisible: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedErrorMessage: React.FC<AnimatedErrorMessageProps> = ({
  isVisible,
  children,
  className = "",
  customVariants,
  customTransition,
  ...motionProps
}) => {
  const { config, variants, getTransition } = useAnimation();

  // Get error variants
  const errorVariants = customVariants || variants.error.shake;

  // Get transition
  const transition =
    customTransition ||
    getTransition(config.error.timing, { type: "easeInOut" });

  // If animations are disabled
  if (!config.enabled) {
    return isVisible ? <div className={className}>{children}</div> : null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          variants={errorVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transition}
          {...motionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
