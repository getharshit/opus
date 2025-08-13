"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExtendedForm, FormState, NavigationConfig } from "../types";
import { useFormContext } from "../providers/FormProvider";
import { FormQuestion } from "../components/FormQuestion";
import {
  AnimatedButton,
  AnimatedProgressIndicator,
} from "../animation/components";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Save,
  ArrowUp,
  ArrowDown,
  Keyboard,
} from "lucide-react";

interface SingleColumnLayoutProps {
  form: ExtendedForm;
  state: FormState;
  children?: React.ReactNode;
}

export const SingleColumnLayout: React.FC<SingleColumnLayoutProps> = ({
  form,
  state,
  children,
}) => {
  const {
    currentStepFields,
    formState,
    validateCurrentStep,
    nextStep,
    previousStep,
    submitForm,
    getFieldError,
    formMethods,
  } = useFormContext();

  // Local state for single-column navigation
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isValidating, setIsValidating] = useState(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [progressSaved, setProgressSaved] = useState(false);

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalQuestions = currentStepFields.length;
  const currentField = currentStepFields[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Auto-save progress
  useEffect(() => {
    const saveProgress = () => {
      const formData = formMethods.getValues();
      localStorage.setItem(
        `form-progress-${form.id}`,
        JSON.stringify({
          currentQuestionIndex,
          formData,
          timestamp: Date.now(),
        })
      );
      setProgressSaved(true);
      setTimeout(() => setProgressSaved(false), 2000);
    };

    const timer = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, formMethods, form.id]);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`form-progress-${form.id}`);
    if (savedProgress) {
      try {
        const { currentQuestionIndex: savedIndex, formData } =
          JSON.parse(savedProgress);
        if (savedIndex && savedIndex < totalQuestions) {
          setCurrentQuestionIndex(savedIndex);
          // Restore form data
          Object.keys(formData).forEach((key) => {
            formMethods.setValue(key, formData[key]);
          });
        }
      } catch (error) {
        console.error("Failed to load saved progress:", error);
      }
    }
  }, [form.id, formMethods, totalQuestions]);

  // Smooth scroll to current question
  const scrollToQuestion = useCallback((index: number) => {
    const questionElement = questionRefs.current[index];
    if (questionElement && containerRef.current) {
      const container = containerRef.current;
      const offsetTop = questionElement.offsetTop - container.offsetTop - 100;

      container.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  // Navigation handlers
  const handleNextQuestion = async () => {
    if (!currentField) return;

    setIsValidating(true);

    // Validate current field
    const fieldId = currentField.id;
    const isValid = await formMethods.trigger(fieldId);

    setIsValidating(false);

    if (!isValid) {
      // Focus on the field with error
      const fieldElement = document.querySelector(
        `[data-field-id="${fieldId}"]`
      );
      if (fieldElement) {
        (fieldElement as HTMLElement).focus();
      }
      return;
    }

    if (isLastQuestion) {
      // Submit form
      await submitForm();
    } else {
      // Move to next question
      setDirection("forward");
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (!isFirstQuestion) {
      setDirection("backward");
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setDirection(index > currentQuestionIndex ? "forward" : "backward");
      setCurrentQuestionIndex(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't interfere if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
        case "Enter":
          event.preventDefault();
          handleNextQuestion();
          break;
        case "ArrowUp":
          event.preventDefault();
          handlePreviousQuestion();
          break;
        case "?":
          event.preventDefault();
          setShowKeyboardShortcuts(!showKeyboardShortcuts);
          break;
        case "Escape":
          setShowKeyboardShortcuts(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestionIndex, showKeyboardShortcuts]);

  // Auto-advance for certain field types
  useEffect(() => {
    if (!autoAdvanceEnabled || !currentField) return;

    const autoAdvanceTypes = ["yesNo", "multipleChoice"];
    if (autoAdvanceTypes.includes(currentField.type)) {
      const fieldValue = formMethods.getValues(currentField.id);
      if (fieldValue && !isLastQuestion) {
        const timer = setTimeout(() => {
          handleNextQuestion();
        }, 800); // Small delay for better UX

        return () => clearTimeout(timer);
      }
    }
  }, [
    formMethods.watch(currentField?.id),
    autoAdvanceEnabled,
    currentField,
    isLastQuestion,
  ]);

  // Scroll to question when index changes
  useEffect(() => {
    scrollToQuestion(currentQuestionIndex);
  }, [currentQuestionIndex, scrollToQuestion]);

  const questionVariants = {
    enter: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? -100 : 100,
      opacity: 0,
    }),
  };

  if (!currentField) {
    return <div>No questions available</div>;
  }

  return (
    <div
      className="single-column-layout min-h-screen"
      style={{
        background:
          "var(--form-background-value, var(--form-color-background, #f9fafb))",
        backgroundImage: "var(--form-background-pattern, none)",
      }}
    >
      {/* Progress Header */}
      <div
        className="sticky top-0 z-40 shadow-sm"
        style={{
          backgroundColor: "var(--form-color-surface, #ffffff)",
          borderBottom: `1px solid var(--form-color-border, #e5e7eb)`,
          boxShadow: "var(--form-shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05))",
          zIndex: "var(--form-z-index-dropdown, 40)",
        }}
      >
        <div
          className="max-w-2xl mx-auto px-4 py-4"
          style={{
            padding: "var(--form-spacing-md, 1rem)",
            maxWidth: "42rem",
          }}
        >
          {/* Quesion Counter */}
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: "var(--form-spacing-md, 1rem)" }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--form-color-text-secondary, #6b7280)",
                }}
              >
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>

            {/* Progress Save Indicator */}
            <div
              className="flex items-center"
              style={{ gap: "var(--form-spacing-xs, 0.5rem)" }}
            >
              {progressSaved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center text-xs"
                  style={{
                    gap: "var(--form-spacing-xs, 0.25rem)",
                    color: "var(--form-color-success, #10b981)",
                    fontSize:
                      "var(--form-font-size-caption, var(--form-font-size-xs, 0.75rem))",
                  }}
                >
                  <Save className="w-3 h-3" />
                  Saved
                </motion.div>
              )}

              <button
                type="button"
                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                className="p-2 transition-colors"
                style={{
                  color: "var(--form-color-text-muted, #9ca3af)",
                  padding: "var(--form-spacing-xs, 0.5rem)",
                  transitionDuration:
                    "var(--form-transition-duration-normal, 200ms)",
                }}
                title="Keyboard shortcuts"
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color =
                    "var(--form-color-text-secondary, #6b7280)";
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = "var(--form-color-text-muted, #9ca3af)";
                }}
              >
                <Keyboard className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <AnimatedProgressIndicator
            progress={progressPercentage}
            type="bar"
            showPercentage={false}
            className="mb-2"
            style={{ marginBottom: "var(--form-spacing-xs, 0.5rem )" }}
          />
        </div>
      </div>

      {/* Keyboard Shortcuts Overlay */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backgroundColor: "var(--form-color-overlay, rgba(0, 0, 0, 0.5))",
              zIndex: "var(--form-z-index-modal, 1000)",
              padding: "var(--form-spacing-md, 1rem)",
            }}
            onClick={() => setShowKeyboardShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-sm w-full"
              style={{
                backgroundColor: "var(--form-color-surface, #ffffff)",
                borderRadius: "var(--form-border-radius-lg, 0.75rem)",
                padding: "var(--form-spacing-lg, 1.5rem)",
                maxWidth: "24rem",
                width: "100%",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="font-medium mb-4"
                style={{
                  fontSize: "var(--form-font-size-base, 1rem)",
                  fontWeight: "var(--form-font-weight-medium, 500)",
                  color: "var(--form-color-text-primary, #111827)",
                  marginBottom: "var(--form-spacing-md, 1rem)",
                }}
              >
                Keyboard Shortcuts
              </h3>
              <div
                className="space-y-2 text-sm"
                style={{
                  fontSize: "var(--form-font-size-sm, 0.875rem)",
                  gap: "var(--form-spacing-xs, 0.5rem)",
                }}
              >
                <div className="flex justify-between">
                  <span
                    style={{
                      color: "var(--form-color-text-secondary, #6b7280)",
                    }}
                  >
                    Next question
                  </span>
                  <span
                    className="font-mono px-2 py-1 rounded"
                    style={{
                      fontFamily: "var(--form-font-family-mono, monospace)",
                      backgroundColor: "var(--form-color-secondary, #f3f4f6)",
                      padding:
                        "var(--form-spacing-xs, 0.25rem) var(--form-spacing-xs, 0.5rem)",
                      borderRadius: "var(--form-border-radius-sm, 0.25rem)",
                    }}
                  >
                    ↓ or Enter
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    style={{
                      color: "var(--form-color-text-secondary, #6b7280)",
                    }}
                  >
                    Previous question
                  </span>
                  <span
                    className="font-mono px-2 py-1 rounded"
                    style={{
                      fontFamily: "var(--form-font-family-mono, monospace)",
                      backgroundColor: "var(--form-color-secondary, #f3f4f6)",
                      padding:
                        "var(--form-spacing-xs, 0.25rem) var(--form-spacing-xs, 0.5rem)",
                      borderRadius: "var(--form-border-radius-sm, 0.25rem)",
                    }}
                  >
                    ↑
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    style={{
                      color: "var(--form-color-text-secondary, #6b7280)",
                    }}
                  >
                    Toggle shortcuts
                  </span>
                  <span
                    className="font-mono px-2 py-1 rounded"
                    style={{
                      fontFamily: "var(--form-font-family-mono, monospace)",
                      backgroundColor: "var(--form-color-secondary, #f3f4f6)",
                      padding:
                        "var(--form-spacing-xs, 0.25rem) var(--form-spacing-xs, 0.5rem)",
                      borderRadius: "var(--form-border-radius-sm, 0.25rem)",
                    }}
                  >
                    ?
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    style={{
                      color: "var(--form-color-text-secondary, #6b7280)",
                    }}
                  >
                    Close
                  </span>
                  <span
                    className="font-mono px-2 py-1 rounded"
                    style={{
                      fontFamily: "var(--form-font-family-mono, monospace)",
                      backgroundColor: "var(--form-color-secondary, #f3f4f6)",
                      padding:
                        "var(--form-spacing-xs, 0.25rem) var(--form-spacing-xs, 0.5rem)",
                      borderRadius: "var(--form-border-radius-sm, 0.25rem)",
                    }}
                  >
                    Esc
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        ref={containerRef}
        className="max-w-2xl mx-auto px-4 py-8 min-h-screen"
        style={{
          padding: "var(--form-spacing-2xl, 2rem) var(--form-spacing-md, 1rem)",
          maxWidth: "42rem",
          minHeight: "100vh",
        }}
      >
        {/* Question Container */}
        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestionIndex}
              custom={direction}
              variants={questionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <div
                ref={(el) => {
                  questionRefs.current[currentQuestionIndex] = el;
                }}
                className="shadow-sm p-8"
                style={{
                  backgroundColor: "var(--form-color-surface, #ffffff)",
                  borderRadius: "var(--form-border-radius-xl, 1rem)",
                  border: `1px solid var(--form-color-border, #e5e7eb)`,
                  boxShadow:
                    "var(--form-shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05))",
                  padding: "var(--form-spacing-2xl, 2rem)",
                }}
              >
                <FormQuestion
                  field={currentField}
                  questionNumber={currentQuestionIndex + 1}
                  showQuestionNumber={true}
                  showValidation={true}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between"
          style={{ marginTop: "var(--form-spacing-2xl, 2rem)" }}
        >
          {/* Back Button */}
          <div className="flex-1">
            {!isFirstQuestion && (
              <AnimatedButton
                variant="secondary"
                onClick={handlePreviousQuestion}
                disabled={isValidating}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg disabled:opacity-50"
                style={{
                  color: "var(--form-color-text-primary, #374151)",
                  backgroundColor: "var(--form-color-surface, #ffffff)",
                  border: `1px solid var(--form-color-border, #d1d5db)`,
                  borderRadius: "var(--form-border-radius-lg, 0.75rem)",
                  padding:
                    "var(--form-spacing-sm, 0.75rem) var(--form-spacing-lg, 1.5rem)",
                  gap: "var(--form-spacing-xs, 0.5rem)",
                  fontSize:
                    "var(--form-font-size-button-text, var(--form-font-size-sm, 0.875rem))",
                  fontWeight:
                    "var(--form-font-weight-button-text, var(--form-font-weight-medium, 500))",
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </AnimatedButton>
            )}
          </div>

          {/* Auto-advance Toggle */}
          <div
            className="flex items-center"
            style={{ gap: "var(--form-spacing-md, 1rem)" }}
          >
            <label
              className="flex items-center text-sm"
              style={{
                gap: "var(--form-spacing-xs, 0.5rem)",
                fontSize: "var(--form-font-size-sm, 0.875rem)",
                color: "var(--form-color-text-secondary, #6b7280)",
              }}
            >
              <input
                type="checkbox"
                checked={autoAdvanceEnabled}
                onChange={(e) => setAutoAdvanceEnabled(e.target.checked)}
                className="rounded focus:ring-2"
                style={{
                  borderColor: "var(--form-color-border, #d1d5db)",
                  accentColor: "var(--form-color-primary, #3b82f6)",
                }}
              />
              Auto-advance
            </label>
          </div>

          {/* Next/Submit Button */}
          <div className="flex-1 flex justify-end">
            <AnimatedButton
              variant="primary"
              onClick={handleNextQuestion}
              disabled={isValidating}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium disabled:opacity-50`}
              style={{
                color: "var(--form-color-text-inverse, #ffffff)",
                backgroundColor: isLastQuestion
                  ? "var(--form-color-success, #10b981)"
                  : "var(--form-color-primary, #3b82f6)",
                border: "none",
                borderRadius: "var(--form-border-radius-lg, 0.75rem)",
                padding:
                  "var(--form-spacing-sm, 0.75rem) var(--form-spacing-lg, 1.5rem)",
                gap: "var(--form-spacing-xs, 0.5rem)",
                fontSize:
                  "var(--form-font-size-button-text, var(--form-font-size-sm, 0.875rem))",
                fontWeight:
                  "var(--form-font-weight-button-text, var(--form-font-weight-medium, 500))",
              }}
            >
              {isValidating ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                    style={{
                      borderColor: "var(--form-color-text-inverse, #ffffff)",
                      borderTopColor: "transparent",
                    }}
                  />
                  Validating...
                </>
              ) : isLastQuestion ? (
                <>
                  <Check className="w-4 h-4" />
                  Submit
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Navigation Hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center text-xs"
          style={{
            marginTop: "var(--form-spacing-lg, 1.5rem)",
            gap: "var(--form-spacing-lg, 1.5rem)",
            fontSize:
              "var(--form-font-size-caption, var(--form-font-size-xs, 0.75rem))",
            color: "var(--form-color-text-muted, #9ca3af)",
          }}
        >
          <div
            className="flex items-center"
            style={{ gap: "var(--form-spacing-xs, 0.25rem)" }}
          >
            <ArrowUp className="w-3 h-3" />
            <span>Previous</span>
          </div>
          <div
            className="flex items-center"
            style={{ gap: "var(--form-spacing-xs, 0.25rem)" }}
          >
            <ArrowDown className="w-3 h-3" />
            <span>Next</span>
          </div>
          <div
            className="flex items-center"
            style={{ gap: "var(--form-spacing-xs, 0.25rem)" }}
          >
            <Keyboard className="w-3 h-3" />
            <span>Press ? for shortcuts</span>
          </div>
        </motion.div>

        {/* Mobile Bottom Navigation */}
        <div
          className="fixed bottom-0 left-0 right-0 p-4 md:hidden"
          style={{
            backgroundColor: "var(--form-color-surface, #ffffff)",
            borderTop: `1px solid var(--form-color-border, #e5e7eb)`,
            padding: "var(--form-spacing-md, 1rem)",
          }}
        >
          <div
            className="max-w-2xl mx-auto flex items-center justify-between"
            style={{ gap: "var(--form-spacing-sm, 0.75rem)" }}
          >
            <AnimatedButton
              variant="secondary"
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion || isValidating}
              className="flex items-center gap-2 px-4 py-2 text-sm"
              style={{
                color: "var(--form-color-text-primary, #374151)",
                backgroundColor: "var(--form-color-surface, #ffffff)",
                border: `1px solid var(--form-color-border, #d1d5db)`,
                borderRadius: "var(--form-border-radius-md, 0.5rem)",
                padding:
                  "var(--form-spacing-xs, 0.5rem) var(--form-spacing-md, 1rem)",
                gap: "var(--form-spacing-xs, 0.5rem)",
                fontSize:
                  "var(--form-font-size-button-text, var(--form-font-size-sm, 0.875rem))",
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </AnimatedButton>

            <div
              className="text-sm"
              style={{
                fontSize:
                  "var(--form-font-size-caption, var(--form-font-size-sm, 0.875rem))",
                color: "var(--form-color-text-secondary, #6b7280)",
              }}
            >
              {currentQuestionIndex + 1} / {totalQuestions}
            </div>

            <AnimatedButton
              variant="primary"
              onClick={handleNextQuestion}
              disabled={isValidating}
              className={`flex items-center gap-2 px-4 py-2 text-sm`}
              style={{
                color: "var(--form-color-text-inverse, #ffffff)",
                backgroundColor: isLastQuestion
                  ? "var(--form-color-success, #10b981)"
                  : "var(--form-color-primary, #3b82f6)",
                border: "none",
                borderRadius: "var(--form-border-radius-md, 0.5rem)",
                padding:
                  "var(--form-spacing-xs, 0.5rem) var(--form-spacing-md, 1rem)",
                gap: "var(--form-spacing-xs, 0.5rem)",
                fontSize:
                  "var(--form-font-size-button-text, var(--form-font-size-sm, 0.875rem))",
              }}
            >
              {isLastQuestion ? (
                <>
                  Submit
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};
