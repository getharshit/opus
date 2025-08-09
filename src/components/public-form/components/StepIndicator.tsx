"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Lock, AlertCircle } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
  isAccessible: boolean;
  hasError: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  variant?: "horizontal" | "vertical" | "dots";
  showLabels?: boolean;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  variant = "horizontal",
  showLabels = true,
  className = "",
}) => {
  const renderHorizontalSteps = () => (
    <div className={`flex items-center justify-between w-full ${className}`}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          {/* Step Circle */}
          <motion.button
            type="button"
            onClick={() => step.isAccessible && onStepClick(index)}
            disabled={!step.isAccessible}
            className={`
              relative w-10 h-10 rounded-full border-2 flex items-center justify-center
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${
                step.isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : step.isActive
                  ? "bg-blue-600 border-blue-600 text-white"
                  : step.hasError
                  ? "bg-red-500 border-red-500 text-white"
                  : step.isAccessible
                  ? "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                  : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
            whileHover={step.isAccessible ? { scale: 1.05 } : {}}
            whileTap={step.isAccessible ? { scale: 0.95 } : {}}
          >
            {step.isCompleted ? (
              <Check className="w-5 h-5" />
            ) : step.hasError ? (
              <AlertCircle className="w-5 h-5" />
            ) : !step.isAccessible ? (
              <Lock className="w-4 h-4" />
            ) : (
              <span className="text-sm font-medium">{index + 1}</span>
            )}

            {/* Active indicator */}
            {step.isActive && (
              <motion.div
                className="absolute -inset-1 border-2 border-blue-300 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* Step Label */}
          {showLabels && (
            <div className="ml-3 flex-1 min-w-0">
              <div
                className={`text-sm font-medium truncate ${
                  step.isActive
                    ? "text-blue-600"
                    : step.isCompleted
                    ? "text-green-600"
                    : step.hasError
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="text-xs text-gray-500 truncate">
                  {step.description}
                </div>
              )}
            </div>
          )}

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="flex-1 mx-4">
              <div
                className={`h-0.5 transition-colors duration-300 ${
                  step.isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderVerticalSteps = () => (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start">
          {/* Step Circle */}
          <motion.button
            type="button"
            onClick={() => step.isAccessible && onStepClick(index)}
            disabled={!step.isAccessible}
            className={`
              relative w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                step.isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : step.isActive
                  ? "bg-blue-600 border-blue-600 text-white"
                  : step.hasError
                  ? "bg-red-500 border-red-500 text-white"
                  : step.isAccessible
                  ? "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                  : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
            whileHover={step.isAccessible ? { scale: 1.05 } : {}}
            whileTap={step.isAccessible ? { scale: 0.95 } : {}}
          >
            {step.isCompleted ? (
              <Check className="w-4 h-4" />
            ) : step.hasError ? (
              <AlertCircle className="w-4 h-4" />
            ) : !step.isAccessible ? (
              <Lock className="w-3 h-3" />
            ) : (
              <span className="text-xs font-medium">{index + 1}</span>
            )}
          </motion.button>

          {/* Step Content */}
          {showLabels && (
            <div className="ml-3 flex-1">
              <div
                className={`text-sm font-medium ${
                  step.isActive
                    ? "text-blue-600"
                    : step.isCompleted
                    ? "text-green-600"
                    : step.hasError
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="text-xs text-gray-500 mt-1">
                  {step.description}
                </div>
              )}
            </div>
          )}

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-8 w-0.5 h-4 bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  );

  const renderDotSteps = () => (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {steps.map((step, index) => (
        <motion.button
          key={step.id}
          type="button"
          onClick={() => step.isAccessible && onStepClick(index)}
          disabled={!step.isAccessible}
          className={`
            w-3 h-3 rounded-full transition-all duration-200
            ${
              step.isCompleted
                ? "bg-green-500"
                : step.isActive
                ? "bg-blue-600 scale-125"
                : step.hasError
                ? "bg-red-500"
                : step.isAccessible
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-200 cursor-not-allowed"
            }
          `}
          whileHover={step.isAccessible ? { scale: 1.2 } : {}}
          whileTap={step.isAccessible ? { scale: 0.9 } : {}}
          title={step.title}
        />
      ))}
    </div>
  );

  switch (variant) {
    case "vertical":
      return renderVerticalSteps();
    case "dots":
      return renderDotSteps();
    default:
      return renderHorizontalSteps();
  }
};
