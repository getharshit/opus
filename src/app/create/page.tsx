"use client";

import { useState } from "react";
import { GeneratedForm } from "@/lib/ai/form-generator";
import PromptInput from "@/components/form-builder/PromptInput";
import FormPreview from "@/components/form-builder/FormPreview";
import LoadingState from "@/components/ui/LoadingState";

export default function CreateFormPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<GeneratedForm | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleGenerateForm = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate form");
      }

      const form = await response.json();
      setGeneratedForm(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveForm = async () => {
    if (!generatedForm) return;

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: generatedForm.title,
          description: generatedForm.description,
          fields: generatedForm.fields,
          theme: {
            primaryColor: "#3b82f6",
            fontFamily: "Inter",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save form");
      }

      const savedForm = await response.json();
      // Redirect to form builder
      window.location.href = `/builder/${savedForm.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save form");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Form with AI
            </h1>
            <button
              onClick={() => (window.location.href = "/")}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Prompt Input */}
          <div className="space-y-6">
            <PromptInput
              onGenerate={handleGenerateForm}
              isLoading={isGenerating}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div>
            {isGenerating && <LoadingState />}

            {generatedForm && !isGenerating && (
              <div className="space-y-4">
                <FormPreview form={generatedForm} />

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveForm}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Save & Continue Editing
                  </button>

                  <button
                    onClick={() => setGeneratedForm(null)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Generate New
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
