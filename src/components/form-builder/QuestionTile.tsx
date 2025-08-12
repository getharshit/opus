import { useState } from "react";
import { FormField, ExtendedFieldType } from "@/types/form";
import { GripVertical, Trash2, Settings } from "lucide-react";

// Import field editors
import {
  ShortTextEditor,
  LongTextEditor,
  EmailEditor,
  WebsiteEditor,
  PhoneNumberEditor,
  MultipleChoiceEditor,
  DropdownEditor,
  YesNoEditor,
  OpinionScaleEditor,
  NumberRatingEditor,
  StatementEditor,
  LegalEditor,
  FileUploadEditor,
  PageBreakEditor,
  StartingPageEditor,
  PostSubmissionEditor,
} from "./field-editors";

// Import shared components
import ValidationEditor from "./shared/ValidationEditor";
import DisplayOptionsEditor from "./shared/DisplayOptionsEditor";

interface QuestionTileProps {
  field: FormField;
  isActive: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
  dragHandleProps?: any;
}

export default function QuestionTile({
  field,
  isActive,
  onSelect,
  onUpdate,
  onDelete,
  dragHandleProps,
}: QuestionTileProps) {
  const [localLabel, setLocalLabel] = useState(field.label);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const handleLabelBlur = () => {
    if (localLabel !== field.label) {
      onUpdate({ label: localLabel });
    }
  };

  // Update field properties helper
  const updateFieldProperty = (property: string, value: any) => {
    onUpdate({ [property]: value });
  };

  // Helper functions to determine what settings to show
  const shouldShowAdvancedSettings = (): boolean => {
    const advancedFieldTypes = [
      "shortText",
      "longText",
      "email",
      "website",
      "phoneNumber",
      "multipleChoice",
      "dropdown",
      "yesNo",
      "numberRating",
      "legal",
      "statement",
      "fileUpload",
      "startingPage",
      "postSubmission",
    ];
    return advancedFieldTypes.includes(field.type);
  };

  const shouldShowValidation = (): boolean => {
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

  const shouldShowDisplayOptions = (): boolean => {
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

  // Render field editor based on type
  const renderFieldEditor = () => {
    const editorProps = {
      field,
      onUpdate: updateFieldProperty,
    };

    switch (field.type) {
      // Text fields
      case "shortText":
        return <ShortTextEditor {...editorProps} />;
      case "longText":
        return <LongTextEditor {...editorProps} />;
      case "email":
        return <EmailEditor {...editorProps} />;
      case "website":
        return <WebsiteEditor {...editorProps} />;
      case "phoneNumber":
        return <PhoneNumberEditor {...editorProps} />;

      // Choice fields
      case "multipleChoice":
        return <MultipleChoiceEditor {...editorProps} />;
      case "dropdown":
        return <DropdownEditor {...editorProps} />;
      case "yesNo":
        return <YesNoEditor {...editorProps} />;
      case "opinionScale":
        return <OpinionScaleEditor {...editorProps} />;

      // Rating fields
      case "numberRating":
        return <NumberRatingEditor {...editorProps} />;

      // Special fields
      case "statement":
        return <StatementEditor {...editorProps} />;
      case "legal":
        return <LegalEditor {...editorProps} />;
      case "fileUpload":
        return <FileUploadEditor {...editorProps} />;

      // Structure fields
      case "pageBreak":
        return <PageBreakEditor {...editorProps} />;
      case "startingPage":
        return <StartingPageEditor {...editorProps} />;
      case "postSubmission":
        return <PostSubmissionEditor {...editorProps} />;

      // Fallback for any unknown field types
      default:
        return (
          <div className="text-sm text-gray-500 italic">
            Preview not available for {field.type}
          </div>
        );
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-lg border-2 transition-all cursor-pointer ${
        isActive
          ? "border-blue-500 shadow-md"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Question Header */}
      <div className="p-4 flex items-start gap-3">
        <div
          {...dragHandleProps}
          className="mt-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        <div className="flex-1 space-y-3">
          {/* Question Label */}
          <input
            type="text"
            value={localLabel}
            onChange={(e) => setLocalLabel(e.target.value)}
            onBlur={handleLabelBlur}
            className="w-full text-base font-medium text-gray-900 border-none outline-none bg-transparent focus:ring-0"
            placeholder="Question"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Question Description (if exists or active) */}
          {(isActive || field.description) && (
            <div className="space-y-2">
              <textarea
                value={field.description || ""}
                onChange={(e) =>
                  updateFieldProperty("description", e.target.value)
                }
                placeholder="Add a description (optional)"
                className="w-full text-sm text-gray-600 border border-gray-200 rounded px-3 py-2 resize-none focus:border-blue-500 outline-none"
                rows={2}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Field Content - Always use the field editor */}
          <div className="mt-3">{renderFieldEditor()}</div>

          {/* Help Text (if exists or active) */}
          {(isActive || field.helpText) && (
            <div className="space-y-2">
              <input
                type="text"
                value={field.helpText || ""}
                onChange={(e) =>
                  updateFieldProperty("helpText", e.target.value)
                }
                placeholder="Add help text (optional)"
                className="w-full text-xs text-gray-500 border border-gray-200 rounded px-2 py-1 focus:border-blue-500 outline-none"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-400 hover:text-red-500 p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Question Settings Panel */}
      {isActive && (
        <div className="border-t border-gray-100">
          {/* Basic Settings Row */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => onUpdate({ required: e.target.checked })}
                  className="text-blue-600"
                />
                <span className="text-gray-700">Required</span>
              </label>

              {/* Only show advanced settings for field types that support validation/display options */}
              {shouldShowAdvancedSettings() && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAdvancedSettings(!showAdvancedSettings);
                  }}
                  className={`flex items-center gap-2 text-sm px-2 py-1 rounded transition-colors ${
                    showAdvancedSettings
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  {showAdvancedSettings ? "Hide Settings" : "More Settings"}
                </button>
              )}
            </div>

            <select
              value={field.type}
              onChange={(e) =>
                onUpdate({ type: e.target.value as ExtendedFieldType })
              }
              className="text-sm border border-gray-300 rounded px-2 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <optgroup label="Text Fields">
                <option value="shortText">Short Text</option>
                <option value="longText">Long Text</option>
                <option value="email">Email</option>
                <option value="website">Website</option>
                <option value="phoneNumber">Phone Number</option>
              </optgroup>

              <optgroup label="Choice Fields">
                <option value="multipleChoice">Multiple Choice</option>
                <option value="dropdown">Dropdown</option>
                <option value="yesNo">Yes/No</option>
                <option value="numberRating">Number Rating</option>
                <option value="opinionScale">Opinion Scale</option>
              </optgroup>

              <optgroup label="Special Fields">
                <option value="statement">Statement</option>
                <option value="legal">Legal</option>
                <option value="fileUpload">File Upload</option>
              </optgroup>

              <optgroup label="Form Structure">
                <option value="pageBreak">Page Break</option>
                <option value="startingPage">Welcome Screen</option>
                <option value="postSubmission">Thank You Page</option>
              </optgroup>
            </select>
          </div>

          {/* Advanced Settings Panel */}
          {showAdvancedSettings && shouldShowAdvancedSettings() && (
            <div className="border-t border-gray-100 bg-gray-50">
              {/* Simple Validation and Display Options */}
              <div className="px-4 py-3 space-y-4">
                {shouldShowValidation() && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Validation
                    </h4>
                    <ValidationEditor
                      field={field}
                      onUpdate={updateFieldProperty}
                    />
                  </div>
                )}

                {shouldShowDisplayOptions() && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Display Options
                    </h4>
                    <DisplayOptionsEditor
                      field={field}
                      onUpdate={updateFieldProperty}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
