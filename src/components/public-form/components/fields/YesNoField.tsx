"use client";

import React from "react";
import { useController } from "react-hook-form";
import { motion } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import { QuestionContainer } from "./QuestionContainer";
import { AnimatedErrorMessage } from "../../animation/components";
import { AlertCircle, Check, X } from "lucide-react";

interface YesNoFieldProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  variant?: "toggle" | "buttons";
  className?: string;
}

export const YesNoField: React.FC<YesNoFieldProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
  variant = "buttons",
  className = "",
}) => {
  const { formMethods } = useFormContext();

  const {
    field: controllerField,
    fieldState: { error, isTouched },
  } = useController({
    name: field.id,
    control: formMethods.control,
    rules: {
      required: field.required ? `${field.label} is required` : false,
    },
  });

  const hasError = !!error && isTouched;

  const handleSelection = (value: "yes" | "no") => {
    controllerField.onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent, value: "yes" | "no") => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleSelection(value);
    }
  };

  const renderToggleVariant = () => (
    <div className="toggle-container flex items-center justify-center">
      <div className="flex items-center gap-4">
        {/* No Label */}
        <span className="text-sm font-medium text-gray-700">No</span>

        {/* Toggle Switch */}
        <motion.button
          type="button"
          onClick={() =>
            handleSelection(controllerField.value === "yes" ? "no" : "yes")
          }
          className={`
            relative w-14 h-7 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-500
            ${
              controllerField.value === "yes"
                ? "bg-green-500 border-green-500"
                : "bg-gray-200 border-gray-300"
            }
          `}
          whileTap={{ scale: 0.95 }}
          aria-pressed={controllerField.value === "yes"}
          aria-labelledby={`question-${field.id}`}
        >
          <motion.div
            className={`
              absolute top-0.5 w-5 h-5 rounded-full shadow-md flex items-center justify-center
              ${controllerField.value === "yes" ? "bg-white" : "bg-white"}
            `}
            animate={{
              x: controllerField.value === "yes" ? 28 : 2,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            {controllerField.value === "yes" ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <X className="w-3 h-3 text-gray-400" />
            )}
          </motion.div>
        </motion.button>

        {/* Yes Label */}
        <span className="text-sm font-medium text-gray-700">Yes</span>
      </div>
    </div>
  );

  const renderButtonsVariant = () => (
    <div
      className="buttons-container flex gap-3"
      role="radiogroup"
      aria-labelledby={`question-${field.id}`}
    >
      {/* Yes Button */}
      <motion.button
        type="button"
        onClick={() => handleSelection("yes")}
        onKeyDown={(e) => handleKeyDown(e, "yes")}
        className={`
          flex-1 py-4 px-6 rounded-lg border-2 font-medium text-center
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
            controllerField.value === "yes"
              ? "border-green-500 bg-green-50 text-green-700 focus:ring-green-500"
              : hasError
              ? "border-red-300 text-red-600 hover:border-red-400 focus:ring-red-500"
              : "border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50 focus:ring-green-500"
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        role="radio"
        aria-checked={controllerField.value === "yes"}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${
                controllerField.value === "yes"
                  ? "border-green-500 bg-green-500"
                  : "border-gray-300"
              }
            `}
            animate={{
              borderColor:
                controllerField.value === "yes" ? "#10B981" : "#D1D5DB",
              backgroundColor:
                controllerField.value === "yes" ? "#10B981" : "transparent",
            }}
          >
            {controllerField.value === "yes" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
          <span>Yes</span>
        </div>
      </motion.button>

      {/* No Button */}
      <motion.button
        type="button"
        onClick={() => handleSelection("no")}
        onKeyDown={(e) => handleKeyDown(e, "no")}
        className={`
          flex-1 py-4 px-6 rounded-lg border-2 font-medium text-center
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
            controllerField.value === "no"
              ? "border-red-500 bg-red-50 text-red-700 focus:ring-red-500"
              : hasError
              ? "border-red-300 text-red-600 hover:border-red-400 focus:ring-red-500"
              : "border-gray-300 text-gray-700 hover:border-red-400 hover:bg-red-50 focus:ring-red-500"
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        role="radio"
        aria-checked={controllerField.value === "no"}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${
                controllerField.value === "no"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300"
              }
            `}
            animate={{
              borderColor:
                controllerField.value === "no" ? "#EF4444" : "#D1D5DB",
              backgroundColor:
                controllerField.value === "no" ? "#EF4444" : "transparent",
            }}
          >
            {controllerField.value === "no" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
          <span>No</span>
        </div>
      </motion.button>
    </div>
  );

  return (
    <QuestionContainer
      field={field}
      questionNumber={questionNumber}
      showQuestionNumber={showQuestionNumber}
      className={className}
    >
      <div className="yes-no-field space-y-4">
        {/* Render based on variant */}
        {variant === "toggle" ? renderToggleVariant() : renderButtonsVariant()}

        {/* Error Message */}
        <AnimatedErrorMessage isVisible={hasError}>
          <div
            id={`error-${field.id}`}
            className="flex items-start gap-2 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error?.message}</span>
          </div>
        </AnimatedErrorMessage>
      </div>
    </QuestionContainer>
  );
};
