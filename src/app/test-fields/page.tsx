"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "@/components/public-form/providers/FormProvider";
import { useFormContext } from "@/components/public-form/providers/FormProvider";
import { FieldRenderer } from "@/components/public-form/components/FieldRenderer";
import {
  ExtendedFormField,
  ExtendedFieldType,
  ExtendedForm,
} from "@/components/public-form/types";
import { AnimationProvider } from "@/components/public-form/animation";
import { convertToEnhancedForm } from "@/utils/formConversion";

const testFields: ExtendedFormField[] = [
  {
    id: "shortText-test",
    type: "shortText",
    label: "Short Text Field",
    required: true,
    placeholder: "Enter short text",
    maxLength: 50,
  },
  {
    id: "email-test",
    type: "email",
    label: "Email Field",
    required: true,
    placeholder: "name@example.com",
  },
  {
    id: "phone-test",
    type: "phoneNumber",
    label: "Phone Number Field",
    required: false,
    placeholder: "(555) 123-4567",
  },
  {
    id: "website-test",
    type: "website",
    label: "Website Field",
    required: false,
    placeholder: "https://example.com",
  },
  {
    id: "longText-test",
    type: "longText",
    label: "Long Text Field",
    required: false,
    placeholder: "Enter detailed text...",
    maxLength: 200,
  },
  {
    id: "rating-test",
    type: "numberRating",
    label: "Rating Field",
    required: true,
    maxRating: 5,
    minRating: 1,
  },
  {
    id: "choice-test",
    type: "multipleChoice",
    label: "Multiple Choice Field",
    required: true,
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    id: "dropdown-test",
    type: "dropdown",
    label: "Dropdown Field",
    required: true,
    options: ["Choice A", "Choice B", "Choice C"],
  },
  {
    id: "yesno-test",
    type: "yesNo",
    label: "Yes/No Field",
    required: true,
  },
  {
    id: "opinion-test",
    type: "opinionScale",
    label: "Opinion Scale Field",
    required: true,
  },
  {
    id: "statement-test",
    type: "statement",
    label: "Statement Field",
    required: false,
    description:
      "<p>This is a <strong>statement field</strong> with HTML content. It can display rich text and images.</p>",
    displayOptions: {
      variant: "highlighted",
    },
  },
  {
    id: "legal-test",
    type: "legal",
    label: "I agree to the Terms and Conditions",
    required: true,
    description:
      "<div><h4>Terms and Conditions</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></div>",
  },
  {
    id: "pagebreak-test",
    type: "pageBreak",
    label: "Section Break",
    required: false,
    description: "This separates form sections",
  },
  {
    id: "unknown-test",
    type: "shortText", // Use valid type but we'll test unknown in renderer
    label: "Unknown Field Type (Testing Fallback)",
    required: false,
  },
];

// Mock form data for testing
const mockForm: ExtendedForm = {
  id: "test-form",
  title: "Field Renderer Test Form",
  description: "Testing all field types",
  fields: testFields,
  fieldGroups: undefined,
  customization: {} as any,
  layout: { type: "singleColumn", options: {} },
  theme: {} as any,
  settings: {} as any,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const SubmitButton: React.FC = () => {
  const { submitForm, formMethods } = useFormContext();

  return (
    <button
      type="button"
      onClick={() => {
        const formData = formMethods.getValues();
        console.log("Current form data:", formData);
        submitForm(); // This will call your onSubmit with the form data
      }}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
    >
      Test Submit (Check Console)
    </button>
  );
};

export default function TestFieldsPage() {
  const onSubmit = async (data: Record<string, any>) => {
    console.log("Form submitted with data:", data);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Field Renderer Testing
      </h1>
      <p className="text-gray-600 mb-8">
        Testing all 16+ field types including legacy and unknown types
      </p>

      <div className="max-w-3xl mx-auto">
        {/* Form Fields */}
        <div>
          <AnimationProvider>
            <FormProvider form={mockForm} onSubmit={onSubmit} initialData={{}}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Fields */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {testFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="border border-gray-200 p-4 rounded-lg bg-white"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-gray-500">
                            Field Type:{" "}
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {field.type}
                            </code>
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {field.id}
                          </div>
                        </div>

                        <FieldRenderer
                          field={field}
                          questionNumber={index + 1}
                          showQuestionNumber={true}
                          onSpecialAction={(action, data) => {
                            console.log("Special action:", action, data);
                            alert(`Special action: ${action}`);
                          }}
                        />
                      </div>
                    ))}

                    <div className="pt-6 border-t">
                      <div className="pt-6 border-t">
                        <SubmitButton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormProvider>
          </AnimationProvider>
        </div>
      </div>

      {/* Field Type Summary */}
      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          Field Types Testing Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          {testFields.map((field) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  ["text", "rating"].includes(field.type)
                    ? "bg-orange-400" // Legacy
                    : field.id === "unknown-test"
                    ? "bg-red-400" // Unknown
                    : "bg-green-400" // New
                }`}
              />
              <span className="text-blue-700">{field.type}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-blue-600">
          <span className="inline-flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            New field types
          </span>
          <span className="inline-flex items-center gap-1 ml-4">
            <div className="w-2 h-2 bg-orange-400 rounded-full" />
            Legacy field types
          </span>
          <span className="inline-flex items-center gap-1 ml-4">
            <div className="w-2 h-2 bg-red-400 rounded-full" />
            Unknown field types
          </span>
        </div>
      </div>
    </div>
  );
}
