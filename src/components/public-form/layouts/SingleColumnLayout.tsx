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
    <div className="single-column-layout min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Form Title */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{form.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>

            {/* Progress Save Indicator */}
            <div className="flex items-center gap-2">
              {progressSaved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 text-xs text-green-600"
                >
                  <Save className="w-3 h-3" />
                  Saved
                </motion.div>
              )}

              <button
                type="button"
                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Keyboard shortcuts"
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
          />

          {/* Question Progress Dots */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => goToQuestion(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentQuestionIndex
                    ? "bg-blue-600 scale-125"
                    : index < currentQuestionIndex
                    ? "bg-green-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                disabled={isValidating}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Overlay */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowKeyboardShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-medium text-gray-900 mb-4">
                Keyboard Shortcuts
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Next question</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    ↓ or Enter
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Previous question</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    ↑
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Toggle shortcuts</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    ?
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Close</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
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
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
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
          className="mt-8 flex items-center justify-between"
        >
          {/* Back Button */}
          <div className="flex-1">
            {!isFirstQuestion && (
              <AnimatedButton
                variant="secondary"
                onClick={handlePreviousQuestion}
                disabled={isValidating}
                className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </AnimatedButton>
            )}
          </div>

          {/* Auto-advance Toggle */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoAdvanceEnabled}
                onChange={(e) => setAutoAdvanceEnabled(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
              className={`inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium disabled:opacity-50 ${
                isLastQuestion
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isValidating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
          className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500"
        >
          <div className="flex items-center gap-1">
            <ArrowUp className="w-3 h-3" />
            <span>Previous</span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowDown className="w-3 h-3" />
            <span>Next</span>
          </div>
          <div className="flex items-center gap-1">
            <Keyboard className="w-3 h-3" />
            <span>Press ? for shortcuts</span>
          </div>
        </motion.div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <AnimatedButton
              variant="secondary"
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion || isValidating}
              className="flex items-center gap-2 px-4 py-2 text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </AnimatedButton>

            <div className="text-sm text-gray-600">
              {currentQuestionIndex + 1} / {totalQuestions}
            </div>

            <AnimatedButton
              variant="primary"
              onClick={handleNextQuestion}
              disabled={isValidating}
              className={`flex items-center gap-2 px-4 py-2 text-sm ${
                isLastQuestion ? "bg-green-600" : "bg-blue-600"
              }`}
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
