"use client";

import React from "react";
import { useController } from "react-hook-form";
import { motion } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import { QuestionContainer } from "./QuestionContainer";
import { AnimatedErrorMessage } from "../../animation/components";
import { AlertCircle, Mail, Check } from "lucide-react";

interface EmailFieldProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  className?: string;
}

export const EmailField: React.FC<EmailFieldProps> = ({
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
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message:
          field.validationRules?.customMessage ||
          "Please enter a valid email address",
      },
      maxLength: {
        value: field.maxLength || 255,
        message: `Maximum ${field.maxLength || 255} characters allowed`,
      },
    },
  });

  const hasError = !!error && isTouched;
  const isValid = !error && isTouched && controllerField.value;

  return (
    <QuestionContainer
      field={field}
      questionNumber={questionNumber}
      showQuestionNumber={showQuestionNumber}
      className={className}
    >
      <div className="email-field space-y-2">
        {/* Input with Icon */}
        <motion.div
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail
              className={`w-5 h-5 ${
                hasError
                  ? "text-red-400"
                  : isValid
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            />
          </div>

          <input
            {...controllerField}
            id={field.id}
            type="email"
            placeholder={field.placeholder || "name@example.com"}
            maxLength={field.maxLength || 255}
            className={`
              w-full pl-10 pr-10 py-3 text-base border rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-colors duration-200
              ${
                hasError
                  ? "border-red-500 bg-red-50"
                  : isValid
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
              }
              disabled:bg-gray-100 disabled:cursor-not-allowed
            `}
            aria-invalid={hasError}
            aria-describedby={hasError ? `error-${field.id}` : undefined}
            autoComplete="email"
          />

          {/* Success Icon */}
          {isValid && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-5 h-5 text-green-500" />
              </motion.div>
            </div>
          )}
        </motion.div>

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

        {/* Success Message */}
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 text-sm text-green-600"
          >
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>Valid email address</span>
          </motion.div>
        )}
      </div>
    </QuestionContainer>
  );
};
