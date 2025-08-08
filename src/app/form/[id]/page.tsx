"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Form, FormField } from "@/types/form";
import { Star, Calendar, ChevronDown } from "lucide-react";

export default function PublicFormPage() {
  const params = useParams();
  const formId = params.id as string;

  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    form?.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

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

  const updateFormData = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
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

                  {errors[field.id] && (
                    <p className="text-sm text-red-600">{errors[field.id]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
                style={{ backgroundColor: form.theme.primaryColor }}
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
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={formData[field.id] || ""}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={field.placeholder || "Your answer"}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ focusRingColor: form?.theme.primaryColor }}
          />
        );

      case "multipleChoice":
        return (
          <div className="space-y-3">
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
                  onChange={(e) => updateFormData(field.id, e.target.value)}
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
              value={formData[field.id] || ""}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
          <div className="flex gap-2">
            {Array.from({ length: field.maxRating || 5 }).map((_, index) => {
              const rating = index + 1;
              const isSelected = formData[field.id] >= rating;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => updateFormData(field.id, rating)}
                  className="p-2 transition-colors"
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
              value={formData[field.id] || ""}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        );

      default:
        return null;
    }
  }
}
