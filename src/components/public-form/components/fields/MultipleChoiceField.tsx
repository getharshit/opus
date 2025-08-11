"use client";

import React, { useState } from "react";
import { useController } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import { QuestionContainer } from "./QuestionContainer";
import { AnimatedErrorMessage } from "../../animation/components";
import { AlertCircle, Check, Plus } from "lucide-react";

interface MultipleChoiceFieldProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  className?: string;
}

export const MultipleChoiceField: React.FC<MultipleChoiceFieldProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
  className = "",
}) => {
  const { formMethods } = useFormContext();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");

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
  const hasOtherOption =
    field.options?.includes("Other") || field.options?.includes("other");

  const handleOptionSelect = (option: string) => {
    if (option.toLowerCase() === "other") {
      setShowOtherInput(true);
      if (otherValue) {
        controllerField.onChange(`Other: ${otherValue}`);
      }
    } else {
      setShowOtherInput(false);
      setOtherValue("");
      controllerField.onChange(option);
    }
  };

  const handleOtherInputChange = (value: string) => {
    setOtherValue(value);
    if (value.trim()) {
      controllerField.onChange(`Other: ${value}`);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    option: string,
    index: number
  ) => {
    const options = field.options || [];

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        const nextIndex = (index + 1) % options.length;
        const nextElement = document.querySelector(
          `[data-option-index="${nextIndex}"]`
        ) as HTMLElement;
        nextElement?.focus();
        break;

      case "ArrowUp":
        event.preventDefault();
        const prevIndex = index === 0 ? options.length - 1 : index - 1;
        const prevElement = document.querySelector(
          `[data-option-index="${prevIndex}"]`
        ) as HTMLElement;
        prevElement?.focus();
        break;

      case " ":
      case "Enter":
        event.preventDefault();
        handleOptionSelect(option);
        break;
    }
  };

  const isSelected = (option: string) => {
    if (option.toLowerCase() === "other") {
      return controllerField.value?.startsWith("Other:");
    }
    return controllerField.value === option;
  };

  return (
    <QuestionContainer
      field={field}
      questionNumber={questionNumber}
      showQuestionNumber={showQuestionNumber}
      className={className}
    >
      <div className="multiple-choice-field space-y-3">
        {/* Options */}
        <div
          className="options-container space-y-2"
          role="radiogroup"
          aria-labelledby={`question-${field.id}`}
          aria-describedby={hasError ? `error-${field.id}` : undefined}
        >
          {field.options?.map((option, index) => {
            const selected = isSelected(option);
            const isOtherOption = option.toLowerCase() === "other";

            return (
              <motion.div
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="option-wrapper"
              >
                <motion.label
                  className={`
                    relative flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer
                    transition-all duration-200 group
                    ${
                      selected
                        ? "border-blue-500 bg-blue-50"
                        : hasError
                        ? "border-red-300 hover:border-red-400"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }
                  `}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onKeyDown={(e) => handleKeyDown(e, option, index)}
                  tabIndex={0}
                  data-option-index={index}
                  role="radio"
                  aria-checked={selected}
                  aria-describedby={hasError ? `error-${field.id}` : undefined}
                >
                  {/* Custom Radio Button */}
                  <div className="relative flex-shrink-0">
                    <input
                      type="radio"
                      name={field.id}
                      value={option}
                      checked={selected}
                      onChange={() => handleOptionSelect(option)}
                      className="sr-only"
                      tabIndex={-1}
                    />

                    <motion.div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${
                          selected
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300 group-hover:border-blue-400"
                        }
                      `}
                      animate={{
                        borderColor: selected ? "#3B82F6" : "#D1D5DB",
                        backgroundColor: selected ? "#3B82F6" : "transparent",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatePresence>
                        {selected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Check className="w-3 h-3 text-gray-900 placeholder-gray-500" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Option Text */}
                  <span
                    className={`
                    flex-1 text-gray-700 font-medium
                    ${selected ? "text-blue-700" : ""}
                  `}
                  >
                    {isOtherOption ? (
                      <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Other
                      </span>
                    ) : (
                      option
                    )}
                  </span>

                  {/* Selection Indicator */}
                  <AnimatePresence>
                    {selected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-gray-900 placeholder-gray-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.label>

                {/* Other Input Field */}
                {isOtherOption && (
                  <AnimatePresence>
                    {showOtherInput && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 ml-8"
                      >
                        <input
                          type="text"
                          placeholder="Please specify..."
                          value={otherValue}
                          onChange={(e) =>
                            handleOtherInputChange(e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          autoFocus
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
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
