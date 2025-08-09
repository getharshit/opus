"use client";

import React, { useState, useRef, useEffect } from "react";
import { useController } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import { QuestionContainer } from "./QuestionContainer";
import { AnimatedErrorMessage } from "../../animation/components";
import { AlertCircle, ChevronDown, Check, Search } from "lucide-react";

interface DropdownFieldProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  className?: string;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
  className = "",
}) => {
  const { formMethods } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
  const options = field.options || [];
  const isSearchable = options.length > 5; // Enable search for long lists

  // Filter options based on search term
  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isSearchable]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setFocusedIndex(-1);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleOptionSelect = (option: string) => {
    controllerField.onChange(option);
    setIsOpen(false);
    setSearchTerm("");
    setFocusedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;

      case "Enter":
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleOptionSelect(filteredOptions[focusedIndex]);
        } else if (!isOpen) {
          setIsOpen(true);
        }
        break;

      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        setFocusedIndex(-1);
        break;

      case " ":
        if (!isSearchable) {
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusedIndex >= 0) {
            handleOptionSelect(filteredOptions[focusedIndex]);
          }
        }
        break;
    }
  };

  const selectedOption = options.find(
    (option) => option === controllerField.value
  );

  return (
    <QuestionContainer
      field={field}
      questionNumber={questionNumber}
      showQuestionNumber={showQuestionNumber}
      className={className}
    >
      <div className="dropdown-field space-y-2">
        {/* Dropdown Container */}
        <div ref={dropdownRef} className="relative">
          {/* Dropdown Trigger */}
          <motion.button
            type="button"
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={`
              w-full px-4 py-3 text-left border-2 rounded-lg flex items-center justify-between
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-colors duration-200
              ${
                isOpen
                  ? "border-blue-500 bg-blue-50"
                  : hasError
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-gray-400 bg-white"
              }
            `}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={`question-${field.id}`}
            aria-describedby={hasError ? `error-${field.id}` : undefined}
          >
            <span
              className={`
              ${selectedOption ? "text-gray-900" : "text-gray-500"}
            `}
            >
              {selectedOption || field.placeholder || "Select an option..."}
            </span>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden"
              >
                {/* Search Input */}
                {isSearchable && (
                  <div className="p-3 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search options..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setFocusedIndex(-1);
                        }}
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Options List */}
                <div
                  className="overflow-y-auto max-h-48"
                  role="listbox"
                  aria-labelledby={`question-${field.id}`}
                >
                  {filteredOptions.length === 0 ? (
                    <div className="px-3 py-2 text-gray-500 text-sm">
                      No options found
                    </div>
                  ) : (
                    filteredOptions.map((option, index) => {
                      const isSelected = option === controllerField.value;
                      const isFocused = index === focusedIndex;

                      return (
                        <motion.button
                          key={option}
                          type="button"
                          onClick={() => handleOptionSelect(option)}
                          className={`
                            w-full px-3 py-2 text-left flex items-center justify-between
                            transition-colors duration-150
                            ${
                              isFocused
                                ? "bg-blue-50 text-blue-700"
                                : isSelected
                                ? "bg-blue-100 text-blue-800"
                                : "hover:bg-gray-50 text-gray-700"
                            }
                          `}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.1,
                            delay: index * 0.02,
                          }}
                          role="option"
                          aria-selected={isSelected}
                          onMouseEnter={() => setFocusedIndex(index)}
                        >
                          <span>{option}</span>

                          <AnimatePresence>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Check className="w-4 h-4 text-blue-600" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
