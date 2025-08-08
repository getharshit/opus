"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/types/form";
import LoadingState from "@/components/ui/LoadingState";

export default function NewFormPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasCreated = useRef(false); // Prevent multiple creation attempts

  useEffect(() => {
    if (!hasCreated.current) {
      hasCreated.current = true;
      createBlankForm();
    }
  }, []);

  const createBlankForm = async () => {
    console.log("Creating blank form...");

    try {
      // Create default form structure
      const defaultField: FormField = {
        id: `field_${Date.now()}`,
        type: "text",
        label: "Your question here",
        required: false,
        placeholder: "Type your answer here...",
      };

      const blankForm = {
        title: "Untitled Form",
        description: "",
        fields: [defaultField],
        theme: {
          primaryColor: "#3b82f6", // blue-500
          fontFamily: "Inter",
        },
        prompt: "", // Empty since it's manual creation
      };

      // Save the blank form
      console.log("Sending form data:", blankForm);

      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blankForm),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to create form");
      }

      const createdForm = await response.json();
      console.log("Created form:", createdForm);

      if (!createdForm.id) {
        throw new Error("No form ID returned from server");
      }

      console.log("Redirecting to:", `/builder/${createdForm.id}`);

      // Use replace instead of push to prevent back button issues
      router.replace(`/builder/${createdForm.id}`);
    } catch (error) {
      console.error("Failed to create blank form:", error);
      setError("Failed to create form. Please try again.");
      setIsCreating(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setError(null);
                setIsCreating(true);
                createBlankForm();
              }}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
            <a
              href="/"
              className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Go Back Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingState />
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Creating your form...
          </h2>
          <p className="text-gray-600">
            Setting up a blank form for you to customize
          </p>
        </div>
      </div>
    </div>
  );
}
