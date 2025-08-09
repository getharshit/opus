// src/app/test-forms/page.tsx
"use client";

import React, { useState } from "react";
import { PublicFormRenderer } from "@/components/public-form";
import { ExtendedForm } from "@/components/public-form/types";
import { testForms } from "./test-data";

export default function TestFormsPage() {
  const [selectedForm, setSelectedForm] = useState<string>("single-column");
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentForm = testForms[selectedForm];

  const handleSubmit = async (data: Record<string, any>) => {
    setIsSubmitting(true);
    console.log("Form submitted:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmissionResult({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
    setIsSubmitting(false);
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    console.log("Field changed:", fieldId, value);
  };

  const handleStepChange = (step: number) => {
    console.log("Step changed:", step);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Test Controls */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Public Form System Tests
          </h1>

          {/* Form Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(testForms).map((formKey) => (
              <button
                key={formKey}
                onClick={() => {
                  setSelectedForm(formKey);
                  setSubmissionResult(null);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedForm === formKey
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {testForms[formKey].title}
              </button>
            ))}
          </div>

          {/* Current Form Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">
              Testing: {currentForm.title}
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              {currentForm.description}
            </p>
            <div className="flex gap-4 text-xs text-blue-600">
              <span>Layout: {currentForm.layout.type}</span>
              <span>Fields: {currentForm.fields.length}</span>
              {currentForm.fieldGroups && (
                <span>Steps: {currentForm.fieldGroups.length}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Renderer */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <PublicFormRenderer
              form={currentForm}
              onSubmit={handleSubmit}
              onFieldChange={handleFieldChange}
              onStepChange={handleStepChange}
              showValidation={true}
            />
          </div>

          {/* Debug Panel */}
          <div className="space-y-4">
            {/* Submission Result */}
            {submissionResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">
                  ✅ Form Submitted Successfully
                </h4>
                <pre className="text-xs text-green-700 bg-green-100 p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(submissionResult, null, 2)}
                </pre>
              </div>
            )}

            {/* Form Structure */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Form Structure</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span>{" "}
                  <span className="font-mono">{currentForm.layout.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Fields:</span>{" "}
                  <span className="font-mono">{currentForm.fields.length}</span>
                </div>
                {currentForm.fieldGroups && (
                  <div>
                    <span className="text-gray-500">Groups:</span>{" "}
                    <span className="font-mono">
                      {currentForm.fieldGroups.length}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Field Types */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Field Types</h4>
              <div className="space-y-1 text-xs">
                {Array.from(new Set(currentForm.fields.map((f) => f.type))).map(
                  (type) => (
                    <div key={type} className="font-mono text-gray-600">
                      {type}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Testing Checklist */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Testing Checklist
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>All fields render correctly</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>Validation works</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>Navigation functions</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>Animations smooth</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>Mobile responsive</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>Form submits successfully</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
