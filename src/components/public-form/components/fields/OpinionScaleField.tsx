"use client";

import React, { useState } from "react";
import { useController } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import { QuestionContainer } from "./QuestionContainer";
import { AnimatedErrorMessage } from "../../animation/components";
import { AlertCircle, Frown, Meh, Smile } from "lucide-react";

interface OpinionScaleFieldProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  className?: string;
}

export const OpinionScaleField: React.FC<OpinionScaleFieldProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
  className = "",
}) => {
  const { formMethods } = useFormContext();
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const {
    field: controllerField,
    fieldState: { error, isTouched },
  } = useController({
    name: field.id,
    control: formMethods.control,
    rules: {
      required: field.required ? `${field.label} is required` : false,
      min: {
        value: field.minRating || 1,
        message: `Please select a rating of at least ${field.minRating || 1}`,
      },
      max: {
        value: field.maxRating || 10,
        message: `Please select a rating no higher than ${
          field.maxRating || 10
        }`,
      },
    },
  });

  const hasError = !!error && isTouched;
  const minRating = field.minRating || 1;
  const maxRating = field.maxRating || 10;
  const currentValue = controllerField.value;
  const displayValue = hoveredValue ?? currentValue;

  // Generate scale values
  const scaleValues = Array.from(
    { length: maxRating - minRating + 1 },
    (_, i) => minRating + i
  );

  const handleRatingSelect = (value: number) => {
    controllerField.onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent, value: number) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        if (value > minRating) {
          handleRatingSelect(value - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (value < maxRating) {
          handleRatingSelect(value + 1);
        }
        break;
      case "Home":
        event.preventDefault();
        handleRatingSelect(minRating);
        break;
      case "End":
        event.preventDefault();
        handleRatingSelect(maxRating);
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        handleRatingSelect(value);
        break;
    }
  };

  const getScaleLabel = (value: number) => {
    const range = maxRating - minRating;
    const position = (value - minRating) / range;

    if (maxRating === 10) {
      if (position <= 0.3) return "Strongly Disagree";
      if (position <= 0.5) return "Disagree";
      if (position <= 0.7) return "Neutral";
      if (position <= 0.9) return "Agree";
      return "Strongly Agree";
    }

    if (maxRating === 5) {
      if (position <= 0.2) return "Strongly Disagree";
      if (position <= 0.4) return "Disagree";
      if (position <= 0.6) return "Neutral";
      if (position <= 0.8) return "Agree";
      return "Strongly Agree";
    }

    return "";
  };

  const getEmotionIcon = (value: number) => {
    const range = maxRating - minRating;
    const position = (value - minRating) / range;

    if (position <= 0.3) return <Frown className="w-4 h-4" />;
    if (position <= 0.7) return <Meh className="w-4 h-4" />;
    return <Smile className="w-4 h-4" />;
  };

  const getScaleColor = (value: number) => {
    const range = maxRating - minRating;
    const position = (value - minRating) / range;

    // Color gradient from red to yellow to green
    if (position <= 0.5) {
      // Red to yellow
      const r = 255;
      const g = Math.round(255 * (position * 2));
      const b = 0;
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Yellow to green
      const r = Math.round(255 * (2 - position * 2));
      const g = 255;
      const b = 0;
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  return (
    <QuestionContainer
      field={field}
      questionNumber={questionNumber}
      showQuestionNumber={showQuestionNumber}
      className={className}
    >
      <div className="opinion-scale-field space-y-6">
        {/* Scale Labels */}
        <div className="flex justify-between text-xs text-gray-500 px-2">
          <span className="flex items-center gap-1">
            <Frown className="w-3 h-3" />
            {minRating} - {getScaleLabel(minRating)}
          </span>
          <span className="flex items-center gap-1">
            <Smile className="w-3 h-3" />
            {maxRating} - {getScaleLabel(maxRating)}
          </span>
        </div>

        {/* Scale Container */}
        <div
          className="scale-container"
          role="radiogroup"
          aria-labelledby={`question-${field.id}`}
          aria-describedby={hasError ? `error-${field.id}` : undefined}
        >
          {/* Visual Scale Bar */}
          <div className="relative mb-6">
            {/* Background Bar */}
            <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
              {/* Progress Bar */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: displayValue
                    ? getScaleColor(displayValue)
                    : "#E5E7EB",
                }}
                animate={{
                  width: displayValue
                    ? `${
                        ((displayValue - minRating) / (maxRating - minRating)) *
                        100
                      }%`
                    : "0%",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Scale Markers */}
            <div className="absolute -top-1 left-0 right-0 flex justify-between">
              {scaleValues.map((value) => {
                const isSelected = currentValue === value;
                const isHovered = hoveredValue === value;
                const shouldHighlight = displayValue && value <= displayValue;

                return (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => handleRatingSelect(value)}
                    onMouseEnter={() => setHoveredValue(value)}
                    onMouseLeave={() => setHoveredValue(null)}
                    onFocus={() => setHoveredValue(value)}
                    onBlur={() => setHoveredValue(null)}
                    onKeyDown={(e) => handleKeyDown(e, value)}
                    className={`
                     w-4 h-4 rounded-full border-2 relative
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-all duration-200
                     ${
                       shouldHighlight
                         ? "border-white bg-white shadow-md scale-110"
                         : hasError
                         ? "border-red-300 bg-white hover:border-red-400"
                         : "border-gray-400 bg-white hover:border-gray-600"
                     }
                   `}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Rating ${value} out of ${maxRating} - ${getScaleLabel(
                      value
                    )}`}
                  >
                    {/* Selection Indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center"
                        >
                          <div className="w-1 h-1 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Numerical Scale */}
          <div className="flex justify-between mb-6">
            {scaleValues.map((value) => {
              const isSelected = currentValue === value;
              const isHovered = hoveredValue === value;

              return (
                <motion.button
                  key={value}
                  type="button"
                  onClick={() => handleRatingSelect(value)}
                  onMouseEnter={() => setHoveredValue(value)}
                  onMouseLeave={() => setHoveredValue(null)}
                  className={`
                   w-8 h-8 rounded-full text-sm font-medium
                   transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                   ${
                     isSelected || isHovered
                       ? "bg-blue-600 text-white scale-110"
                       : hasError
                       ? "bg-red-100 text-red-600 hover:bg-red-200"
                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                   }
                 `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  role="radio"
                  aria-checked={isSelected}
                >
                  {value}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Current Selection Display */}
        <AnimatePresence>
          {displayValue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                {getEmotionIcon(displayValue)}
                <span className="text-lg font-semibold text-gray-900">
                  {displayValue} out of {maxRating}
                </span>
              </div>
              {getScaleLabel(displayValue) && (
                <div className="text-sm text-gray-600">
                  {getScaleLabel(displayValue)}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
