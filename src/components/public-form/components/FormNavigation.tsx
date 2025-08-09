"use client";

import React from "react";
import { NavigationConfig } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedButton } from "../animation/components";

interface FormNavigationProps {
  config: NavigationConfig;
  currentStep: number;
  totalSteps: number;
  canGoBack: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  config,
  currentStep,
  totalSteps,
  canGoBack,
  canGoNext,
  onBack,
  onNext,
  onSubmit,
  isSubmitting = false,
}) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="form-navigation mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between">
        {/* Back button */}
        <div className="flex-1">
          {config.showBackButton && canGoBack && (
            <AnimatedButton
              variant="secondary"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              {config.buttonLabels.back}
            </AnimatedButton>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex-1 flex justify-center">
          {config.showProgressIndicator && (
            <div className="text-sm text-gray-500">
              {config.showQuestionCounter && (
                <span>
                  {currentStep} of {totalSteps}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Next/Submit button */}
        <div className="flex-1 flex justify-end">
          {isLastStep
            ? config.showSubmitButton && (
                <AnimatedButton
                  variant="primary"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : config.buttonLabels.submit}
                </AnimatedButton>
              )
            : config.showNextButton && (
                <AnimatedButton
                  variant="primary"
                  onClick={onNext}
                  disabled={!canGoNext}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {config.buttonLabels.next}
                  <ChevronRight className="w-4 h-4" />
                </AnimatedButton>
              )}
        </div>
      </div>
    </div>
  );
};
