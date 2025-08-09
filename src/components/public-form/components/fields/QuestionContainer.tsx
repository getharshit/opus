"use client";

import React from "react";
import { ExtendedFormField } from "../../types";
import { AnimatedFieldContainer } from "../../animation/components";

interface QuestionContainerProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const QuestionContainer: React.FC<QuestionContainerProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
  children,
  className = "",
}) => {
  const questionId = `question-${field.id}`;
  const descriptionId = field.description
    ? `description-${field.id}`
    : undefined;

  return (
    <AnimatedFieldContainer
      fieldId={field.id}
      className={`question-container ${className}`}
      animationPreset="slideUp"
    >
      <div className="question-wrapper">
        {/* Question Header */}
        <div className="question-header mb-4">
          <div className="flex items-start gap-3">
            {/* Question Number */}
            {showQuestionNumber && questionNumber && (
              <div className="question-number flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium mt-1">
                {questionNumber}
              </div>
            )}

            {/* Question Content */}
            <div className="question-content flex-1">
              {/* Question Title */}
              <label
                htmlFor={field.id}
                id={questionId}
                className="block text-base font-medium text-gray-900 mb-2"
              >
                <span dangerouslySetInnerHTML={{ __html: field.label }} />
                {field.required && (
                  <span
                    className="text-red-500 ml-1"
                    aria-label="Required field"
                    title="This field is required"
                  >
                    *
                  </span>
                )}
              </label>

              {/* Question Description */}
              {field.description && (
                <div id={descriptionId} className="text-sm text-gray-600 mb-3">
                  <div
                    dangerouslySetInnerHTML={{ __html: field.description }}
                  />
                </div>
              )}

              {/* Image Placeholder */}
              {/* TODO: Implement image display */}
              {/* {field.imageUrl && (
                <div className="question-image mb-3">
                  <img 
                    src={field.imageUrl} 
                    alt={field.imageAlt || ''} 
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Field Input */}
        <div
          className="question-input"
          role="group"
          aria-labelledby={questionId}
          aria-describedby={descriptionId}
        >
          {children}
        </div>

        {/* Help Text */}
        {field.helpText && (
          <div className="question-help mt-2 text-xs text-gray-500">
            {field.helpText}
          </div>
        )}
      </div>
    </AnimatedFieldContainer>
  );
};
