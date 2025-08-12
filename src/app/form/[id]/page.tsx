"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Form } from "@/types/form";
import { PublicFormRenderer } from "@/components/public-form";
import { AnimationProvider } from "@/components/public-form/animation";
import { convertToEnhancedForm } from "@/utils/formConversion";

export default function PublicFormPage() {
  const params = useParams();
  const formId = params.id as string;

  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    loadForm();
  }, [formId]);

  const loadForm = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/forms/${formId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Form not found");
        }
        throw new Error("Failed to load form");
      }

      const formData = await response.json();

      // Convert to enhanced format for PublicFormRenderer
      const enhancedForm = convertToEnhancedForm(formData);
      setForm(enhancedForm);
    } catch (error) {
      console.error("Failed to load form:", error);
      setError(error instanceof Error ? error.message : "Failed to load form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const response = await fetch(`/api/forms/${formId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      setIsSubmitted(true);
      return await response.json();
    } catch (error) {
      console.error("Submit error:", error);
      throw error; // Let PublicFormRenderer handle the error display
    }
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    // Optional: Add field change tracking
    console.log("Field changed:", fieldId, value);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {error === "Form not found"
              ? "Form Not Found"
              : "Something Went Wrong"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error === "Form not found"
              ? "The form you're looking for doesn't exist or has been removed."
              : "We couldn't load the form. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Success state (after submission)
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

  // Main form rendering with PublicFormRenderer
  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Form not available
          </h2>
          <p className="text-gray-600">Unable to load the form data.</p>
        </div>
      </div>
    );
  }

  return (
    <AnimationProvider>
      <div className="min-h-screen bg-gray-50">
        <PublicFormRenderer
          form={form}
          onSubmit={handleSubmit}
          onFieldChange={handleFieldChange}
          showValidation={true}
        />
      </div>
    </AnimationProvider>
  );
}
