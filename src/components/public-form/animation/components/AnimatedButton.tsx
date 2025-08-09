"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../AnimationProvider";
import { AnimatedComponentProps } from "../types";

interface AnimatedButtonProps extends AnimatedComponentProps {
  variant?: "default" | "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = "default",
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  customVariants,
  customTransition,
  ...motionProps
}) => {
  const { config, variants } = useAnimation();

  // Get button variants
  const buttonVariants = customVariants || variants.button[variant];

  // Create transition for hover/tap
  const transition = customTransition || {
    duration: config.button.hover.duration,
    ease: "easeOut",
  };

  // If animations are disabled
  if (!config.enabled) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      variants={buttonVariants}
      initial="idle"
      animate={disabled ? "disabled" : "idle"}
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      transition={transition}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};
