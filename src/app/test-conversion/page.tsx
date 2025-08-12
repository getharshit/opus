"use client";

import { useState, useEffect } from "react";
import { PublicFormRenderer } from "@/components/public-form";
import { convertToExtendedForm } from "@/components/public-form/utils/formUtils";
import { Form, FormField } from "@/types/form";

// Sample legacy form that matches your exact Form interface
const sampleLegacyForm: Form = {
  id: "test-form-conversion-123",
  title: "Customer Feedback Survey",
  description: "Help us improve our service by sharing your experience",
  prompt: "Create a customer feedback form for a coffee shop",
  fields: [
    {
      id: "customer-name",
      type: "text", // Legacy type - will be converted to 'shortText'
      label: "Your Name",
      required: true,
      placeholder: "Enter your full name",
      helpText: "We use this to personalize your experience",
    },
    {
      id: "customer-email",
      type: "text", // Legacy type - should ideally be converted to 'email'
      label: "Email Address",
      required: true,
      placeholder: "name@example.com",
      helpText: "We'll send you updates about improvements",
    },
    {
      id: "visit-frequency",
      type: "multipleChoice",
      label: "How often do you visit us?",
      required: true,
      options: ["First time", "Weekly", "Monthly", "Rarely"],
      helpText: "This helps us understand our customer base",
    },
    {
      id: "service-rating",
      type: "rating", // Legacy type - will be converted to 'numberRating'
      label: "Rate our service quality",
      required: true,
      minRating: 1,
      maxRating: 5,
      helpText: "Rate from 1 (poor) to 5 (excellent)",
    },
    {
      id: "favorite-drink",
      type: "dropdown",
      label: "What's your favorite drink?",
      required: false,
      options: ["Coffee", "Tea", "Hot Chocolate", "Smoothie", "Other"],
      helpText: "Help us stock popular items",
    },
    {
      id: "additional-comments",
      type: "text", // Legacy type - should be converted to 'longText' for comments
      label: "Additional Comments",
      required: false,
      placeholder: "Share any additional thoughts...",
      maxLength: 500,
      helpText: "Your feedback is valuable to us",
    },
  ],
  theme: {
    primaryColor: "#10B981", // Green theme
    fontFamily: "Inter",
    logoUrl: undefined,
    backgroundColor: "#F9FAFB",
    textColor: "#111827",
    borderColor: "#D1D5DB",
    borderRadius: 8,
    spacing: 16,
    buttonStyle: "rounded",
    inputStyle: "outlined",
    shadowLevel: "sm",
  },
  customization: {
    colors: {
      primary: "#10B981",
      secondary: "#6B7280",
      background: "#F9FAFB",
      surface: "#FFFFFF",
      text: "#111827",
      textSecondary: "#6B7280",
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: {
        title: 24,
        question: 16,
        input: 16,
      },
    },
    spacing: {
      md: 16,
      lg: 24,
    },
  },
  layout: {
    type: "singleColumn",
    options: {
      maxWidth: 768,
      padding: 32,
    },
  },
  settings: {
    allowMultipleSubmissions: false,
    showProgressBar: true,
    collectIPAddress: true,
    collectUserAgent: true,
    submitButtonText: "Submit Feedback",
    showPrivacyNotice: true,
    privacyNoticeText:
      "Your responses are confidential and used only for improvement purposes.",
  },
  createdAt: new Date("2024-01-15T10:00:00Z"),
  updatedAt: new Date("2024-01-20T14:30:00Z"),
};

// Test data for form submission
const testSubmissionData = {
  "customer-name": "John Doe",
  "customer-email": "john.doe@example.com",
  "visit-frequency": "Weekly",
  "service-rating": 4,
  "favorite-drink": "Coffee",
  "additional-comments": "Great service and atmosphere!",
};

export default function TestConversionPage() {
  const [convertedForm, setConvertedForm] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [conversionLog, setConversionLog] = useState<string[]>([]);

  useEffect(() => {
    const log: string[] = [];

    try {
      log.push("🔄 Starting conversion process...");
      log.push(`📝 Original form has ${sampleLegacyForm.fields.length} fields`);

      // Log original field types
      sampleLegacyForm.fields.forEach((field) => {
        log.push(
          `   • ${field.id}: ${field.type} (${
            field.required ? "required" : "optional"
          })`
        );
      });

      console.log("🔍 Original legacy form:", sampleLegacyForm);

      const converted = convertToExtendedForm(sampleLegacyForm);

      log.push("✅ Conversion successful!");
      log.push(`🎯 Converted form has ${converted.fields.length} fields`);

      // Log converted field types
      converted.fields.forEach((field) => {
        log.push(`   • ${field.id}: ${field.type} (converted)`);
      });

      // Check required properties
      const hasCustomization = !!converted.customization;
      const hasLayout = !!converted.layout;
      const hasSettings = !!converted.settings;
      const hasTheme = !!converted.theme;

      log.push(`📊 Structure check:`);
      log.push(`   • Customization: ${hasCustomization ? "✅" : "❌"}`);
      log.push(`   • Layout: ${hasLayout ? "✅" : "❌"}`);
      log.push(`   • Settings: ${hasSettings ? "✅" : "❌"}`);
      log.push(`   • Theme: ${hasTheme ? "✅" : "❌"}`);

      console.log("🎉 Converted extended form:", converted);

      setConvertedForm(converted);
      setConversionLog(log);
    } catch (err: any) {
      console.error("💥 Conversion error:", err);
      log.push(`❌ Conversion failed: ${err.message}`);
      setError(err.message);
      setConversionLog(log);
    }
  }, []);

  const handleSubmit = async (data: Record<string, any>) => {
    console.log("📤 Form submitted with data:", data);
    setSubmissionData(data);
    alert("🎉 Form submitted successfully! Check console for details.");
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    console.log(`🔄 Field ${fieldId} changed to:`, value);
  };

  const fillWithTestData = () => {
    // This is a simulation - in a real scenario, you'd need to interact with the form inputs
    console.log("🧪 Test data that would be submitted:", testSubmissionData);
    setSubmissionData(testSubmissionData);
  };

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-red-900 mb-4">
            ❌ Conversion Failed
          </h1>
          <div className="bg-red-100 p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">
              Error Details
            </h2>
            <pre className="bg-red-200 p-4 rounded text-red-900 text-sm overflow-auto">
              {error}
            </pre>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Conversion Log</h2>
            <div className="space-y-1">
              {conversionLog.map((logEntry, index) => (
                <div key={index} className="text-sm font-mono">
                  {logEntry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!convertedForm) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">🔄 Converting Form...</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">
          🧪 Form Conversion Test
        </h1>

        {/* Success Message */}
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <h3 className="font-semibold">Conversion Successful!</h3>
              <p>
                Legacy form has been converted to extended format. Check console
                for detailed logs.
              </p>
            </div>
          </div>
        </div>

        {/* Conversion Log */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">📝 Conversion Log</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="space-y-1 font-mono text-sm">
              {conversionLog.map((logEntry, index) => (
                <div key={index} className="text-gray-800">
                  {logEntry}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Structure Analysis */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            🔍 Form Structure Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>ID:</strong> {convertedForm.id}
                </div>
                <div>
                  <strong>Title:</strong> {convertedForm.title}
                </div>
                <div>
                  <strong>Fields:</strong> {convertedForm.fields.length}
                </div>
                <div>
                  <strong>Created:</strong>{" "}
                  {new Date(convertedForm.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Structure Check */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Structure Validation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">
                    {convertedForm.customization ? "✅" : "❌"}
                  </span>
                  <strong>Customization:</strong>{" "}
                  {convertedForm.customization ? "Present" : "Missing"}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">
                    {convertedForm.layout ? "✅" : "❌"}
                  </span>
                  <strong>Layout:</strong>{" "}
                  {convertedForm.layout ? "Present" : "Missing"}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">
                    {convertedForm.settings ? "✅" : "❌"}
                  </span>
                  <strong>Settings:</strong>{" "}
                  {convertedForm.settings ? "Present" : "Missing"}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">
                    {convertedForm.theme ? "✅" : "❌"}
                  </span>
                  <strong>Theme:</strong>{" "}
                  {convertedForm.theme ? "Present" : "Missing"}
                </div>
              </div>
            </div>

            {/* Theme Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Theme Configuration</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <strong>Primary Color:</strong>
                  <span
                    className="inline-block w-4 h-4 ml-2 rounded border"
                    style={{
                      backgroundColor:
                        convertedForm.customization?.colors?.primary ||
                        "#3B82F6",
                    }}
                  ></span>
                  <span className="ml-2">
                    {convertedForm.customization?.colors?.primary || "#3B82F6"}
                  </span>
                </div>
                <div>
                  <strong>Font:</strong>{" "}
                  {convertedForm.customization?.typography?.fontFamily ||
                    "Default"}
                </div>
                <div>
                  <strong>Layout:</strong>{" "}
                  {convertedForm.layout?.type || "Unknown"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Field Conversion Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            🔄 Field Type Conversions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Field ID</th>
                  <th className="text-left py-2">Original Type</th>
                  <th className="text-left py-2">Converted Type</th>
                  <th className="text-left py-2">Required</th>
                  <th className="text-left py-2">Label</th>
                </tr>
              </thead>
              <tbody>
                {convertedForm.fields.map((field: any, index: number) => {
                  const originalField = sampleLegacyForm.fields[index];
                  return (
                    <tr key={field.id} className="border-b">
                      <td className="py-2 font-mono">{field.id}</td>
                      <td className="py-2">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          {originalField?.type || "unknown"}
                        </span>
                      </td>
                      <td className="py-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {field.type}
                        </span>
                      </td>
                      <td className="py-2">{field.required ? "✅" : "❌"}</td>
                      <td className="py-2">{field.label}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">🎮 Test Controls</h2>
          <div className="flex gap-4">
            <button
              onClick={fillWithTestData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              📝 Fill with Test Data
            </button>
            <button
              onClick={() => console.log("Full form structure:", convertedForm)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              🔍 Log Full Structure
            </button>
          </div>
        </div>

        {/* Rendered Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            🎨 Rendered Form Preview
          </h2>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <PublicFormRenderer
              form={convertedForm}
              onSubmit={handleSubmit}
              onFieldChange={handleFieldChange}
              showValidation={true}
            />
          </div>
        </div>

        {/* Submission Results */}
        {submissionData && (
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">
              📤 Submission Results
            </h2>
            <div className="bg-blue-100 p-4 rounded-lg">
              <pre className="text-sm text-blue-900 overflow-auto">
                {JSON.stringify(submissionData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
