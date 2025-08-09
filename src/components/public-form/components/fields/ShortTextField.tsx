"use client";

import React from "react";
import { useController } from "react-hook-form";
import { motion } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import { QuestionContainer } from "./QuestionContainer";
import { AnimatedErrorMessage } from "../../animation/components";
import { AlertCircle } from "lucide-react";

interface ShortTextFieldProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  className?: string;
}

export const ShortTextField: React.FC<ShortTextFieldProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
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
      maxLength: {
        value: field.maxLength || 255,
        message: `Maximum ${field.maxLength || 255} characters allowed`,
      },
      minLength: field.minLength
        ? {
            value: field.minLength,
            message: `Minimum ${field.minLength} characters required`,
          }
        : undefined,
      pattern: field.validationRules?.pattern
        ? {
            value: new RegExp(field.validationRules.pattern),
            message: field.validationRules.customMessage || "Invalid format",
          }
        : undefined,
    },
  });

  const hasError = !!error && isTouched;
  const currentLength = controllerField.value?.length || 0;
  const maxLength = field.maxLength || 255;

  return (
    <QuestionContainer
      field={field}
      questionNumber={questionNumber}
      showQuestionNumber={showQuestionNumber}
      className={className}
    >
      <div className="short-text-field space-y-2">
        {/* Input */}
        <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          <input
            {...controllerField}
            id={field.id}
            type="text"
            placeholder={field.placeholder || "Type your answer here..."}
            maxLength={maxLength}
            className={`
              w-full px-4 py-3 text-base border rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-colors duration-200
              ${
                hasError
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }
              disabled:bg-gray-100 disabled:cursor-not-allowed
            `}
            aria-invalid={hasError}
            aria-describedby={hasError ? `error-${field.id}` : undefined}
          />
        </motion.div>

        {/* Character Counter */}
        <div className="flex justify-between items-center text-xs">
          <div className="flex-1">{/* Error will be displayed here */}</div>
          <div
            className={`character-counter ${
              currentLength > maxLength * 0.9
                ? "text-orange-600"
                : "text-gray-500"
            }`}
          >
            {currentLength}/{maxLength}
          </div>
        </div>

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
