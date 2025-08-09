"use client";

import React, { useState, useRef, useEffect } from "react";
import { useController } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import { QuestionContainer } from "./QuestionContainer";
import { AnimatedErrorMessage } from "../../animation/components";
import {
  AlertCircle,
  Check,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface LegalFieldProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  className?: string;
}

export const LegalField: React.FC<LegalFieldProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
  className = "",
}) => {
  const { formMethods } = useFormContext();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);

  const {
    field: controllerField,
    fieldState: { error, isTouched },
  } = useController({
    name: field.id,
    control: formMethods.control,
    rules: {
      required: field.required
        ? field.validationRules?.customMessage ||
          "You must accept the terms to continue"
        : false,
      validate: (value) => {
        if (field.required && !value) {
          return "You must read and accept the terms and conditions";
        }
        return true;
      },
    },
  });

  const hasError = !!error && isTouched;
  const isAccepted = controllerField.value === true;

  // Check if user has scrolled to bottom of terms
  const handleTermsScroll = () => {
    const element = termsRef.current;
    if (element) {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5; // 5px tolerance
      setHasScrolledToBottom(isAtBottom);
    }
  };

  // Auto-scroll detection for expanded terms
  useEffect(() => {
    if (isTermsExpanded && termsRef.current) {
      const element = termsRef.current;
      element.addEventListener("scroll", handleTermsScroll);
      handleTermsScroll(); // Check initial state

      return () => element.removeEventListener("scroll", handleTermsScroll);
    }
  }, [isTermsExpanded]);

  const handleAcceptance = (accepted: boolean) => {
    controllerField.onChange(accepted);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleAcceptance(!isAccepted);
    }
  };

  const requiresScrollToAccept =
    field.validationRules?.requireScrollToAccept ?? true;

  return (
    <QuestionContainer
      field={field}
      questionNumber={questionNumber}
      showQuestionNumber={showQuestionNumber}
      className={className}
    >
      <div className="legal-field space-y-4">
        {/* Terms and Conditions Container */}
        <div className="terms-container bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
          {/* Terms Header */}
          <div className="terms-header bg-gray-50 px-4 py-3 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setIsTermsExpanded(!isTermsExpanded)}
              className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">
                  {field.displayOptions?.termsTitle || "Terms and Conditions"}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isTermsExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </motion.div>
            </button>
          </div>

          {/* Terms Content */}
          <AnimatePresence>
            {isTermsExpanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div
                  ref={termsRef}
                  className="terms-content max-h-64 overflow-y-auto p-4 text-sm text-gray-700 leading-relaxed"
                  role="region"
                  aria-label="Terms and conditions content"
                  tabIndex={0}
                >
                  {field.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: field.description }}
                    />
                  ) : (
                    <div className="space-y-4">
                      <p>
                        Please read the following terms and conditions
                        carefully.
                      </p>
                      <p>
                        By checking the box below, you acknowledge that you have
                        read, understood, and agree to be bound by these terms.
                      </p>
                    </div>
                  )}

                  {/* External Links */}
                  {field.displayOptions?.externalLinks && (
                    <div className="mt-4 space-y-2">
                      {field.displayOptions.externalLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 underline"
                        >
                          {link.text}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Scroll Indicator */}
                {requiresScrollToAccept && !hasScrolledToBottom && (
                  <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-2">
                    <div className="flex items-center gap-2 text-yellow-700 text-xs">
                      <ChevronDown className="w-3 h-3 animate-bounce" />
                      <span>Please scroll to the bottom to continue</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Acceptance Checkbox */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.label
            className={`
              flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200 group
              ${
                isAccepted
                  ? "border-green-500 bg-green-50"
                  : hasError
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }
              ${
                !requiresScrollToAccept ||
                hasScrolledToBottom ||
                !isTermsExpanded
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }
            `}
            whileHover={{
              scale:
                !requiresScrollToAccept ||
                hasScrolledToBottom ||
                !isTermsExpanded
                  ? 1.01
                  : 1,
            }}
            whileTap={{
              scale:
                !requiresScrollToAccept ||
                hasScrolledToBottom ||
                !isTermsExpanded
                  ? 0.99
                  : 1,
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="checkbox"
            aria-checked={isAccepted}
            aria-describedby={hasError ? `error-${field.id}` : undefined}
            aria-disabled={
              requiresScrollToAccept && !hasScrolledToBottom && isTermsExpanded
            }
          >
            {/* Custom Checkbox */}
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={isAccepted}
                onChange={(e) => {
                  if (
                    !requiresScrollToAccept ||
                    hasScrolledToBottom ||
                    !isTermsExpanded
                  ) {
                    handleAcceptance(e.target.checked);
                  }
                }}
                className="sr-only"
                tabIndex={-1}
              />

              <motion.div
                className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  ${
                    isAccepted
                      ? "border-green-500 bg-green-500"
                      : hasError
                      ? "border-red-500"
                      : "border-gray-300 group-hover:border-gray-400"
                  }
                `}
                animate={{
                  borderColor: isAccepted
                    ? "#10B981"
                    : hasError
                    ? "#EF4444"
                    : "#D1D5DB",
                  backgroundColor: isAccepted ? "#10B981" : "transparent",
                }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence>
                  {isAccepted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Acceptance Text */}
            <div className="flex-1">
              <span
                className={`
                text-sm leading-relaxed
                ${isAccepted ? "text-green-700" : "text-gray-700"}
              `}
              >
                {field.label ||
                  "I have read and agree to the terms and conditions"}
              </span>

              {field.required && (
                <span className="text-red-500 ml-1" aria-label="Required">
                  *
                </span>
              )}

              {field.helpText && (
                <div className="mt-1 text-xs text-gray-500">
                  {field.helpText}
                </div>
              )}
            </div>
          </motion.label>
        </motion.div>

        {/* Warning for scroll requirement */}
        {requiresScrollToAccept && !hasScrolledToBottom && isTermsExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-amber-50 border border-amber-200 rounded-lg p-3"
          >
            <div className="flex items-center gap-2 text-amber-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                Please read the complete terms by scrolling to the bottom before
                accepting.
              </span>
            </div>
          </motion.div>
        )}

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
