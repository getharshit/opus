"use client";

import { useFieldFocus } from "./hooks/useFieldFocus";
import { FormField } from "@/types/form";
import { Settings, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

// Import shared components for advanced settings
import ValidationEditor from "./shared/ValidationEditor";
import DisplayOptionsEditor from "./shared/DisplayOptionsEditor";

interface FieldPropertiesSidebarProps {
  onFieldUpdate: (fieldId: string, updates: Partial<FormField>) => void;
}

export default function FieldPropertiesSidebar({
  onFieldUpdate,
}: FieldPropertiesSidebarProps) {
  const { focusedFieldData, focusedFieldId } = useFieldFocus();
  const [expandedSections, setExpandedSections] = useState({
    validation: true,
    display: true,
    advanced: false,
  });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Update field properties helper
  const updateFieldProperty = (property: string, value: any) => {
    if (!focusedFieldId) return;
    onFieldUpdate(focusedFieldId, { [property]: value });
  };

  // Determine which settings to show based on field type
  const shouldShowValidation = (field: FormField): boolean => {
    const validationFieldTypes = [
      "shortText",
      "longText",
      "email",
      "website",
      "phoneNumber",
      "legal",
    ];
    return validationFieldTypes.includes(field.type);
  };

  const shouldShowDisplayOptions = (field: FormField): boolean => {
    const displayFieldTypes = [
      "shortText",
      "longText",
      "email",
      "website",
      "phoneNumber",
      "multipleChoice",
      "dropdown",
      "yesNo",
      "numberRating",
    ];
    return displayFieldTypes.includes(field.type);
  };

  // No field focused state
  if (!focusedFieldData || !focusedFieldId) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Settings className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Field Properties
        </h3>
        <p className="text-sm text-gray-500">
          Select a field to view and edit its advanced properties
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Field Properties</h3>
            <p className="text-xs text-gray-500 capitalize">
              {focusedFieldData.type.replace(/([A-Z])/g, " $1").trim()} Field
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Field Info */}
        <div className="p-4 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            {focusedFieldData.label || "Untitled Field"}
          </h4>
          {focusedFieldData.description && (
            <p className="text-xs text-gray-600">
              {focusedFieldData.description}
            </p>
          )}
        </div>

        {/* Validation Section */}
        {shouldShowValidation(focusedFieldData) && (
          <div className="border-b border-gray-100">
            <button
              onClick={() => toggleSection("validation")}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-900">
                Validation Rules
              </span>
              {expandedSections.validation ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedSections.validation && (
              <div className="px-4 pb-4">
                <ValidationEditor
                  field={focusedFieldData}
                  onUpdate={updateFieldProperty}
                />
              </div>
            )}
          </div>
        )}

        {/* Display Options Section */}
        {shouldShowDisplayOptions(focusedFieldData) && (
          <div className="border-b border-gray-100">
            <button
              onClick={() => toggleSection("display")}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-900">
                Display Options
              </span>
              {expandedSections.display ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedSections.display && (
              <div className="px-4 pb-4">
                <DisplayOptionsEditor
                  field={focusedFieldData}
                  onUpdate={updateFieldProperty}
                />
              </div>
            )}
          </div>
        )}

        {/* Advanced Section - For future field-specific options */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("advanced")}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
          >
            <span className="text-sm font-medium text-gray-900">Advanced</span>
            {expandedSections.advanced ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>
          {expandedSections.advanced && (
            <div className="px-4 pb-4">
              <div className="space-y-3">
                {/* Field ID (read-only) */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Field ID
                  </label>
                  <input
                    type="text"
                    value={focusedFieldData.id}
                    readOnly
                    className="w-full text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Used for API responses and integrations
                  </p>
                </div>

                {/* Field Type (read-only) */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Field Type
                  </label>
                  <input
                    type="text"
                    value={focusedFieldData.type}
                    readOnly
                    className="w-full text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-600"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Changes are saved automatically
        </p>
      </div>
    </div>
  );
}
