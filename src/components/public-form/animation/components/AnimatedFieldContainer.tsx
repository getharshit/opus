"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../AnimationProvider";
import { AnimatedComponentProps } from "../types";

interface AnimatedFieldContainerProps extends AnimatedComponentProps {
  fieldId: string;
  isVisible?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedFieldContainer: React.FC<AnimatedFieldContainerProps> = ({
  fieldId,
  isVisible = true,
  children,
  className = "",
  animationPreset,
  intensity,
  disabled = false,
  customVariants,
  customTransition,
  ...motionProps
}) => {
  const { config, getFieldVariants, getTransition } = useAnimation();

  // Determine animation preset
  const preset = animationPreset || config.fieldEntrance.preset;

  // Get variants (custom or from preset)
  const variants = customVariants || getFieldVariants(preset);

  // Get transition
  const transition =
    customTransition ||
    getTransition(config.fieldEntrance.timing, config.fieldEntrance.easing);

  // If animations are disabled or component is disabled
  if (!config.enabled || disabled) {
    return (
      <div className={className} data-field-id={fieldId}>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={fieldId}
          className={className}
          data-field-id={fieldId}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transition}
          {...motionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
