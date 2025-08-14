"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Form, FormField, ExtendedFieldType } from "@/types/form";
import FormBuilderSidebar from "@/components/form-builder/FormBuilderSidebar";
import QuestionEditor from "@/components/form-builder/QuestionEditor";
import FieldPropertiesSidebar from "@/components/form-builder/FieldPropertiesSidebar";
import { FormBuilderFocusProvider } from "@/components/form-builder/context/FormBuilderFocusContext";
import { LiveFormPreview } from "@/components/form-builder/design/LiveFormPreview";
import FormSettings from "@/components/form-builder/FormSettings";
import LoadingState from "@/components/ui/LoadingState";
import ShareModal from "@/components/sharing/ShareModal";
import FormBuilderStepper, {
  BuilderStep,
} from "@/components/form-builder/FormBuilderStepper";
import { DesignStep } from "@/components/form-builder/design/DesignStep";

export default function FormBuilderPage() {
  const params = useParams();
  const formId = params.id as string;

  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<BuilderStep>("build");

  useEffect(() => {
    loadForm();
  }, [formId]);

  const loadForm = async () => {
    try {
      const response = await fetch(`/api/forms/${formId}`);
      if (response.ok) {
        const formData = await response.json();
        setForm(formData);
      }
    } catch (error) {
      console.error("Failed to load form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = async (updates: Partial<Form>) => {
    if (!form) return;

    const updatedForm = { ...form, ...updates };
    setForm(updatedForm);

    // Auto-save
    try {
      await fetch(`/api/forms/${formId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.error("Failed to save form:", error);
    }
  };

  const addField = (type: ExtendedFieldType) => {
    if (!form) return;

    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: getDefaultLabel(type),
      required: false,

      // Add field-specific defaults
      ...(type === "multipleChoice" || type === "dropdown"
        ? { options: ["Option 1", "Option 2", "Option 3"] }
        : {}),
      ...(type === "numberRating" ? { minRating: 1, maxRating: 5 } : {}),
      ...(type === "opinionScale" ? { minRating: 1, maxRating: 10 } : {}),
      ...(type === "shortText" || type === "longText"
        ? { placeholder: "Type your answer here..." }
        : {}),
      ...(type === "email" ? { placeholder: "name@example.com" } : {}),
      ...(type === "website" ? { placeholder: "https://example.com" } : {}),
      ...(type === "phoneNumber" ? { placeholder: "(555) 123-4567" } : {}),
      ...(type === "fileUpload"
        ? { acceptedFileTypes: [".pdf", ".jpg", ".png"], maxFileSize: 10 }
        : {}),
      ...(type === "longText" ? { maxLength: 500 } : {}),
      ...(type === "shortText" ? { maxLength: 100 } : {}),
    };
    console.log(`Creating new field: ${type}`, newField);
    updateForm({
      fields: [...form.fields, newField],
    });
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    if (!form) return;

    const updatedFields = form.fields.map((field) =>
      field.id === fieldId ? { ...field, ...updates } : field
    );

    updateForm({ fields: updatedFields });
  };

  const deleteField = (fieldId: string) => {
    if (!form) return;

    updateForm({
      fields: form.fields.filter((field) => field.id !== fieldId),
    });
  };

  const reorderFields = (startIndex: number, endIndex: number) => {
    if (!form) return;

    const result = Array.from(form.fields);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    updateForm({ fields: result });
  };

  const handleStepChange = (step: BuilderStep) => {
    setCurrentStep(step);
    // Auto-open share modal when user clicks on Share step
    if (step === "share") {
      setShowShareModal(true);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "build":
        return (
          <FormBuilderFocusProvider formId={formId}>
            <div className="grid grid-cols-12 gap-6">
              {/* Left Sidebar - Field Palette */}
              <div className="col-span-2">
                <FormBuilderSidebar onAddField={addField} />
              </div>

              {/* Main Editor */}
              <div className={`${showPreview ? "col-span-5" : "col-span-7"}`}>
                <div className="space-y-4">
                  {form && (
                    <>
                      <FormSettings form={form} onUpdate={updateForm} />

                      <QuestionEditor
                        fields={form.fields}
                        onFieldUpdate={updateField}
                        onFieldDelete={deleteField}
                        onReorder={reorderFields}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Right Sidebar - Field Properties */}
              <div className="col-span-3">
                <div className="sticky top-24">
                  <FieldPropertiesSidebar onFieldUpdate={updateField} />
                </div>
              </div>
            </div>
          </FormBuilderFocusProvider>
        );

      case "design":
        return form ? <DesignStep form={form} onUpdate={updateForm} /> : null;

      case "integrate":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  🔗 Integrations
                </h2>
                <p className="text-gray-600 mb-6">
                  Connect your form with external platforms and services.
                </p>
                <div className="text-sm text-blue-600 bg-blue-50 p-4 rounded-lg">
                  Coming soon: Zapier, Slack, Email notifications, Webhooks, CRM
                  integrations!
                </div>
              </div>
            </div>
          </div>
        );

      case "share":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  📤 Share Your Form
                </h2>
                <p className="text-gray-600 mb-6">
                  Your form is ready! Share it with your audience.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Open Share Options
                  </button>
                  <div className="text-sm text-gray-500">
                    Get shareable links, QR codes, and embed options
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Form not found
          </h2>
          <p className="text-gray-600">
            The form you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <h1 className="text-lg font-medium text-gray-900">
                {form.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => (window.location.href = `/dashboard/${formId}`)}
                className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
              >
                View Responses
              </button>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>

              <button
                onClick={() => window.open(`/form/${formId}`, "_blank")}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                View Live Form
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <FormBuilderStepper
        currentStep={currentStep}
        onStepChange={handleStepChange}
      />

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 py-6">{renderStepContent()}</div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => {
            setShowShareModal(false);
            // If user was on share step, keep them there
            if (currentStep === "share") {
              // Don't change step
            }
          }}
          formId={formId}
          formTitle={form.title}
        />
      )}
    </div>
  );
}

function getDefaultLabel(type: ExtendedFieldType): string {
  switch (type) {
    // Text Input Fields
    case "shortText":
      return "Short Text Question";
    case "longText":
      return "Long Text Question";
    case "email":
      return "Email Address";
    case "website":
      return "Website URL";
    case "phoneNumber":
      return "Phone Number";

    // Choice Fields
    case "multipleChoice":
      return "Multiple Choice Question";
    case "dropdown":
      return "Dropdown Question";
    case "yesNo":
      return "Yes/No Question";
    case "numberRating":
      return "Rating Question";
    case "opinionScale":
      return "Opinion Scale Question";

    // Special Fields
    case "statement":
      return "Statement";
    case "legal":
      return "Terms and Conditions";
    case "fileUpload":
      return "File Upload";

    // Form Structure
    case "pageBreak":
      return "Page Break";
    case "startingPage":
      return "Welcome to our form";
    case "postSubmission":
      return "Thank you for your submission";

    default:
      return "Question";
  }
}
