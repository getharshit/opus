"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExtendedForm, FormState, ProgressConfig } from "../types";
import { useFormContext } from "../providers/FormProvider";
import { FormQuestion } from "../components/FormQuestion";
import { StepIndicator } from "../components/StepIndicator";
import {
  AnimatedButton,
  AnimatedProgressIndicator,
} from "../animation/components";
import { useStepGrouping } from "../hooks/useStepGrouping";
import { useMultiStepProgress } from "../hooks/useMultiStepProgress";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  AlertTriangle,
  CheckCircle,
  Loader,
  Sparkles,
} from "lucide-react";

interface MultiStepLayoutProps {
  form: ExtendedForm;
  state: FormState;
  progressConfig?: ProgressConfig;
  children?: React.ReactNode;
}

export const MultiStepLayout: React.FC<MultiStepLayoutProps> = ({
  form,
  state,
  progressConfig,
}) => {
  const { formMethods, formState, submitForm, validateField } =
    useFormContext();

  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isValidating, setIsValidating] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showProgressRestored, setShowProgressRestored] = useState(false);

  // Get step grouping
  const { steps, totalSteps } = useStepGrouping({
    fields: form.fields,
    fieldGroups: form.fieldGroups,
    formData: formMethods.getValues(),
  });

  // Multi-step progress management
  const {
    currentStepIndex,
    completedSteps,
    visitedSteps,
    stepErrors,
    isLoading,
    completionPercentage,
    goToStep,
    nextStep,
    previousStep,
    markStepCompleted,
    setStepError,
    saveProgress,
    loadProgress,
    isStepCompleted,
    isStepVisited,
    hasStepError,
    getStepErrors,
    canAccessStep,
  } = useMultiStepProgress({
    formId: form.id,
    totalSteps,
    formMethods,
    onProgressChange: (progress) => {
      // Handle progress change if needed
    },
  });

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  // Check for restored progress on mount
  useEffect(() => {
    const restored = loadProgress();
    if (restored && restored.stepIndex > 0) {
      setShowProgressRestored(true);
      setTimeout(() => setShowProgressRestored(false), 5000);
    }
  }, [loadProgress]);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        completionPercentage > 10 &&
        completionPercentage < 100
      ) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [completionPercentage]);

  // Validate current step
  const validateCurrentStep = async (): Promise<{
    isValid: boolean;
    errors?: string[];
  }> => {
    if (!currentStep) return { isValid: false };

    setIsValidating(true);
    const errors: string[] = [];

    try {
      // Validate each field in the current step
      for (const field of currentStep.fields) {
        const isFieldValid = await formMethods.trigger(field.id);
        if (!isFieldValid) {
          const fieldError = formMethods.formState.errors[field.id];
          if (fieldError?.message) {
            errors.push(`${field.label}: ${fieldError.message}`);
          }
        }
      }

      const isValid = errors.length === 0;
      return { isValid, errors };
    } finally {
      setIsValidating(false);
    }
  };

  // Navigation handlers
  const handleNextStep = async () => {
    const validationResults = await validateCurrentStep();

    if (validationResults.isValid) {
      setDirection("forward");
      if (isLastStep) {
        await submitForm();
      } else {
        await nextStep(validationResults);
      }
    } else {
      setStepError(currentStepIndex, validationResults.errors || []);
    }
  };

  const handlePreviousStep = async () => {
    setDirection("backward");
    await previousStep();
  };

  const handleStepClick = async (stepIndex: number) => {
    if (!canAccessStep(stepIndex)) return;

    setDirection(stepIndex > currentStepIndex ? "forward" : "backward");
    await goToStep(stepIndex);
  };

  // Auto-save when step changes
  useEffect(() => {
    const timer = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timer);
  }, [currentStepIndex, saveProgress]);

  // Step transition variants
  const stepVariants = {
    enter: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? 300 : -300,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? -300 : 300,
      opacity: 0,
      scale: 0.98,
    }),
  };

  // Progress restored notification
  const ProgressRestoredNotification = () => (
    <AnimatePresence>
      {showProgressRestored && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              Progress restored from previous session
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Exit intent modal
  const ExitIntentModal = () => (
    <AnimatePresence>
      {showExitIntent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
          >
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Don't lose your progress!
              </h3>
              <p className="text-gray-600 mb-6">
                Your form is {Math.round(completionPercentage)}% complete. Your
                progress has been automatically saved.
              </p>

              <div className="flex gap-3">
                <motion.button
                  type="button"
                  onClick={() => setShowExitIntent(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Form
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    saveProgress();
                    setShowExitIntent(false);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save & Exit
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!currentStep) {
    return <div>No steps available</div>;
  }

  return (
    <div className="multi-step-layout min-h-screen bg-gray-50">
      {/* Progress Restored Notification */}
      <ProgressRestoredNotification />

      {/* Exit Intent Modal */}
      <ExitIntentModal />

      {/* Header with Progress */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Form Title and Step Info */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{form.title}</h1>
              {form.description && (
                <p className="text-gray-600 mt-1">{form.description}</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Save Progress Indicator */}
              <motion.div
                className="flex items-center gap-2 text-sm text-gray-500"
                animate={{ opacity: isLoading ? 1 : 0.7 }}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Auto-saved</span>
                  </>
                )}
              </motion.div>

              {/* Completion Percentage */}
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-lg font-semibold text-blue-600">
                  {Math.round(completionPercentage)}%
                </div>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <StepIndicator
            steps={steps.map((step, index) => ({
              id: step.id,
              title: step.title,
              description: step.description,
              isCompleted: isStepCompleted(index),
              isActive: index === currentStepIndex,
              isAccessible: canAccessStep(index),
              hasError: hasStepError(index),
            }))}
            currentStep={currentStepIndex}
            onStepClick={handleStepClick}
            variant={progressConfig?.type === "dots" ? "dots" : "horizontal"}
            showLabels={progressConfig?.showStepLabels !== false}
            className="mb-4"
          />

          {/* Overall Progress Bar */}
          <AnimatedProgressIndicator
            progress={completionPercentage}
            type="bar"
            showPercentage={false}
            className="h-2"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step Content */}
        <div className="relative">
          {/* Step Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentStep.title}
            </h2>
            {currentStep.description && (
              <p className="text-gray-600">{currentStep.description}</p>
            )}
            <div className="text-sm text-gray-500 mt-2">
              Step {currentStepIndex + 1} of {totalSteps}
            </div>
          </motion.div>

          {/* Step Errors */}
          {hasStepError(currentStepIndex) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800 mb-1">
                    Please fix the following errors:
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {getStepErrors(currentStepIndex).map((error, index) => (
                      <li key={index} className="list-disc list-inside">
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Animated Step Content */}
          <div className="relative overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStepIndex}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
              >
                <div className="space-y-8">
                  {currentStep.fields.map((field, fieldIndex) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: fieldIndex * 0.1,
                      }}
                    >
                      <FormQuestion
                        field={field}
                        questionNumber={
                          form.fields.findIndex((f) => f.id === field.id) + 1
                        }
                        showQuestionNumber={true}
                        showValidation={true}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200"
        >
          {/* Back Button */}
          <div className="flex-1">
            {!isFirstStep && (
              <AnimatedButton
                variant="secondary"
                onClick={handlePreviousStep}
                disabled={isLoading || isValidating}
                className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </AnimatedButton>
            )}
          </div>

          {/* Step Counter */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{currentStepIndex + 1}</span>
            <span>/</span>
            <span>{totalSteps}</span>
          </div>

          {/* Next/Submit Button */}
          <div className="flex-1 flex justify-end">
            <AnimatedButton
              variant="primary"
              onClick={handleNextStep}
              disabled={isLoading || isValidating}
              className={`inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium disabled:opacity-50 ${
                isLastStep
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isValidating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Validating...
                </>
              ) : isLastStep ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Complete Form
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Mobile Progress Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
          <div className="max-w-4xl mx-auto">
            {/* Mobile Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>
                  Step {currentStepIndex + 1} of {totalSteps}
                </span>
                <span>{Math.round(completionPercentage)}% complete</span>
              </div>
              <AnimatedProgressIndicator
                progress={completionPercentage}
                type="bar"
                showPercentage={false}
                className="h-1.5"
              />
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-between">
              <AnimatedButton
                variant="secondary"
                onClick={handlePreviousStep}
                disabled={isFirstStep || isLoading || isValidating}
                className="flex items-center gap-2 px-4 py-2 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </AnimatedButton>

              <AnimatedButton
                variant="primary"
                onClick={handleNextStep}
                disabled={isLoading || isValidating}
                className={`flex items-center gap-2 px-4 py-2 text-sm ${
                  isLastStep ? "bg-green-600" : "bg-blue-600"
                }`}
              >
                {isValidating ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Validating
                  </>
                ) : isLastStep ? (
                  <>
                    Complete
                    <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
