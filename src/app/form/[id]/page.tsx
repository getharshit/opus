"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Form, FormField } from "@/types/form";
import { Star, Calendar, ChevronDown, AlertCircle } from "lucide-react";
import {
  validateFormData,
  validateFormField,
  ValidationError,
} from "@/lib/utils/validation";

export default function PublicFormPage() {
  const params = useParams();
  const formId = params.id as string;

  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadForm();
  }, [formId]);

  const loadForm = async () => {
    try {
      const response = await fetch(`/api/forms/${formId}`);
      if (response.ok) {
        const formData = await response.json();
        setForm(formData);
      } else {
        console.error("Form not found");
      }
    } catch (error) {
      console.error("Failed to load form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (fieldId: string) => {
    return validationErrors.find((error) => error.fieldId === fieldId);
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    // Real-time validation if field has been touched
    if (fieldTouched[fieldId] && form) {
      const field = form.fields.find((f) => f.id === fieldId);
      if (field) {
        const error = validateFormField(field, value);
        setValidationErrors((prev) =>
          prev.filter((e) => e.fieldId !== fieldId).concat(error ? [error] : [])
        );
      }
    }
  };

  const handleFieldBlur = (fieldId: string) => {
    setFieldTouched((prev) => ({ ...prev, [fieldId]: true }));

    if (form) {
      const field = form.fields.find((f) => f.id === fieldId);
      if (field) {
        const error = validateFormField(field, formData[fieldId]);
        setValidationErrors((prev) =>
          prev.filter((e) => e.fieldId !== fieldId).concat(error ? [error] : [])
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;

    // Mark all fields as touched
    const allFieldsTouched = form.fields.reduce((acc, field) => {
      acc[field.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setFieldTouched(allFieldsTouched);

    // Validate all fields
    const errors = validateFormData(form.fields, formData);
    setValidationErrors(errors);

    if (errors.length > 0) {
      // Focus on first error field
      const firstErrorField = document.querySelector(
        `[data-field-id="${errors[0].fieldId}"]`
      ) as HTMLElement;
      firstErrorField?.focus();

      // Scroll to first error
      firstErrorField?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/forms/${formId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Form Not Found
          </h2>
          <p className="text-gray-600">
            The form you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600">
            Your response has been submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Form Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {form.title}
            </h1>
            {form.description && (
              <p className="text-gray-600">{form.description}</p>
            )}
          </div>

          {/* Validation Summary (if errors exist) */}
          {validationErrors.length > 0 && (
            <div className="px-8 py-4 bg-red-50 border-b border-red-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    Please fix the following errors:
                  </h3>
                  <ul className="mt-2 text-sm text-red-700">
                    {validationErrors.map((error, index) => (
                      <li key={index} className="list-disc list-inside">
                        {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-8 py-6">
            <div className="space-y-6">
              {form.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>

                  {renderField(field)}

                  {getFieldError(field.id) && (
                    <div className="flex items-start gap-2 mt-2">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">
                        {getFieldError(field.id)?.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isSubmitting
                    ? "#94a3b8"
                    : form.theme.primaryColor,
                  color: "white",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  function renderField(field: FormField) {
    const fieldError = getFieldError(field.id);
    const baseInputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
      fieldError
        ? "border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:ring-blue-500"
    }`;

    switch (field.type) {
      case "text":
        return (
          <div className="relative">
            <input
              type="text"
              data-field-id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              placeholder={field.placeholder || "Your answer"}
              className={baseInputClasses}
              maxLength={500}
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData[field.id]?.length || 0}/500 characters
            </div>
          </div>
        );

      case "multipleChoice":
        return (
          <div className="space-y-3" data-field-id={field.id}>
            {field.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  onBlur={() => handleFieldBlur(field.id)}
                  className="text-blue-600"
                  style={{ accentColor: form?.theme.primaryColor }}
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "dropdown":
        return (
          <div className="relative">
            <select
              data-field-id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              className={`${baseInputClasses} appearance-none bg-white`}
            >
              <option value="">Select an option...</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        );

      case "rating":
        return (
          <div data-field-id={field.id}>
            <div className="flex gap-2">
              {Array.from({ length: field.maxRating || 5 }).map((_, index) => {
                const rating = index + 1;
                const isSelected = formData[field.id] >= rating;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleFieldChange(field.id, rating)}
                    onBlur={() => handleFieldBlur(field.id)}
                    className="p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        isSelected
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {formData[field.id] && (
              <span className="ml-2 text-sm text-gray-600">
                {formData[field.id]} out of {field.maxRating || 5}
              </span>
            )}
          </div>
        );

      case "date":
        return (
          <div className="relative">
            <input
              type="date"
              data-field-id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              className={baseInputClasses}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        );

      default:
        return null;
    }
  }
}
