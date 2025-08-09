"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../AnimationProvider";
import { AnimatedComponentProps } from "../types";

interface AnimatedProgressIndicatorProps extends AnimatedComponentProps {
  progress: number; // 0-100
  type?: "bar" | "circle" | "steps";
  steps?: number;
  currentStep?: number;
  showPercentage?: boolean;
  className?: string;
}

export const AnimatedProgressIndicator: React.FC<
  AnimatedProgressIndicatorProps
> = ({
  progress,
  type = "bar",
  steps = 1,
  currentStep = 0,
  showPercentage = false,
  className = "",
  customVariants,
  customTransition,
  ...motionProps
}) => {
  const { config, getTransition } = useAnimation();

  // Get transition for progress animations - Fixed to include all required properties
  const transition =
    customTransition ||
    getTransition(
      {
        duration: config.progress.bar.duration,
        delay: 0,
        stagger: 0,
      },
      config.progress.bar.easing
    );

  const stepsTransition = getTransition(
    {
      duration: config.progress.steps.duration,
      delay: 0,
      stagger: config.progress.steps.stagger,
    },
    { type: "easeOut" }
  );

  // If animations are disabled
  if (!config.enabled) {
    return renderStaticProgress();
  }

  function renderStaticProgress() {
    switch (type) {
      case "bar":
        return (
          <div className={`w-full ${className}`}>
            {showPercentage && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(progress)}%
                </span>
              </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );

      case "circle":
        return (
          <div className={`flex justify-center ${className}`}>
            <div className="relative w-16 h-16">
              <svg
                className="w-16 h-16 transform -rotate-90"
                viewBox="0 0 64 64"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={175.9}
                  strokeDashoffset={175.9 * (1 - progress / 100)}
                  className="text-blue-600"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        );

      case "steps":
        return (
          <div
            className={`flex items-center justify-center space-x-4 ${className}`}
          >
            {Array.from({ length: steps }).map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps - 1 && (
                  <div
                    className={`w-8 h-1 mx-2 ${
                      index < currentStep ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  switch (type) {
    case "bar":
      return (
        <div className={`w-full ${className}`}>
          {showPercentage && (
            <motion.div
              className="flex justify-between items-center mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm text-gray-600">Progress</span>
              <motion.span
                className="text-sm font-medium text-gray-900"
                key={progress}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Math.round(progress)}%
              </motion.span>
            </motion.div>
          )}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={transition}
              {...motionProps}
            />
          </div>
        </div>
      );

    case "circle":
      const circumference = 175.9; // 2 * Math.PI * 28
      const strokeDashoffset = circumference * (1 - progress / 100);

      return (
        <div className={`flex justify-center ${className}`}>
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-200"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-blue-600"
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={transition}
                {...motionProps}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-sm font-medium text-gray-900"
                key={progress}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>
          </div>
        </div>
      );

    case "steps":
      return (
        <div
          className={`flex items-center justify-center space-x-4 ${className}`}
        >
          {Array.from({ length: steps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  backgroundColor: index <= currentStep ? "#2563EB" : "#E5E7EB",
                }}
                transition={{
                  ...stepsTransition,
                  delay: index * config.progress.steps.stagger,
                }}
                whileHover={{ scale: 1.1 }}
                {...motionProps}
              >
                {index + 1}
              </motion.div>
              {index < steps - 1 && (
                <motion.div
                  className={`w-8 h-1 mx-2 ${
                    index < currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    backgroundColor:
                      index < currentStep ? "#2563EB" : "#E5E7EB",
                  }}
                  transition={{
                    ...stepsTransition,
                    delay: (index + 0.5) * config.progress.steps.stagger,
                  }}
                  style={{ originX: 0 }}
                />
              )}
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};
