"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Form, FormField } from "@/types/form";
import FormBuilderSidebar from "@/components/form-builder/FormBuilderSidebar";
import QuestionEditor from "@/components/form-builder/QuestionEditor";
import LivePreview from "@/components/form-builder/LivePreview";
import FormSettings from "@/components/form-builder/FormSettings";
import LoadingState from "@/components/ui/LoadingState";
import ShareModal from "@/components/sharing/ShareModal";

export default function FormBuilderPage() {
  const params = useParams();
  const formId = params.id as string;

  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

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

  const addField = (type: FormField["type"]) => {
    if (!form) return;

    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: getDefaultLabel(type),
      required: false,
      ...(type === "multipleChoice" || type === "dropdown"
        ? { options: ["Option 1"] }
        : {}),
      ...(type === "rating" ? { maxRating: 5 } : {}),
    };

    updateForm({
      fields: [...form.fields, newField],
    });

    setActiveField(newField.id);
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

    if (activeField === fieldId) {
      setActiveField(null);
    }
  };

  const reorderFields = (startIndex: number, endIndex: number) => {
    if (!form) return;

    const result = Array.from(form.fields);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    updateForm({ fields: result });
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
                onClick={() => setShowShareModal(true)}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
              >
                Share Form
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <FormBuilderSidebar onAddField={addField} />
          </div>

          {/* Main Editor */}
          <div className={`${showPreview ? "col-span-5" : "col-span-9"}`}>
            <div className="space-y-4">
              <FormSettings form={form} onUpdate={updateForm} />

              <QuestionEditor
                fields={form.fields}
                activeField={activeField}
                onFieldSelect={setActiveField}
                onFieldUpdate={updateField}
                onFieldDelete={deleteField}
                onReorder={reorderFields}
              />
            </div>
          </div>

          {/* Live Preview */}
          {showPreview && (
            <div className="col-span-4">
              <div className="sticky top-24">
                <LivePreview form={form} />
              </div>
            </div>
          )}
        </div>
      </div>
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          formId={formId}
          formTitle={form.title}
        />
      )}
    </div>
  );
}

function getDefaultLabel(type: FormField["type"]): string {
  switch (type) {
    case "text":
      return "Short Answer";
    case "multipleChoice":
      return "Multiple Choice Question";
    case "dropdown":
      return "Dropdown Question";
    case "rating":
      return "Rating Question";
    case "date":
      return "Date Question";
    default:
      return "Question";
  }
}
