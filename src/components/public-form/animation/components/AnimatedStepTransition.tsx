"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../AnimationProvider";
import { AnimatedComponentProps } from "../types";

interface AnimatedStepTransitionProps extends AnimatedComponentProps {
  currentStep: number;
  direction: "forward" | "backward";
  children: React.ReactNode;
  className?: string;
}

export const AnimatedStepTransition: React.FC<AnimatedStepTransitionProps> = ({
  currentStep,
  direction,
  children,
  className = "",
  customVariants,
  customTransition,
  ...motionProps
}) => {
  const { config, variants, getTransition } = useAnimation();

  // Determine variants based on direction
  const getStepVariants = () => {
    if (customVariants) return customVariants;

    switch (direction) {
      case "forward":
        return variants.step.slideForward;
      case "backward":
        return variants.step.slideBackward;
      default:
        return variants.step.fade;
    }
  };

  const stepVariants = getStepVariants();

  // Get transition
  const transition =
    customTransition ||
    getTransition(config.stepTransition.timing, config.stepTransition.easing);

  // If animations are disabled
  if (!config.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transition}
          {...motionProps}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
