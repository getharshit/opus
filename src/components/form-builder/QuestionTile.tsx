import { useState } from "react";
import { FormField } from "@/types/form";
import { GripVertical, Trash2, Plus, X } from "lucide-react";
import { FormField, ExtendedFieldType } from "@/types/form";

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

  const handleLabelBlur = () => {
    if (localLabel !== field.label) {
      onUpdate({ label: localLabel });
    }
  };

  const addOption = () => {
    if (!field.options) return;
    const newOption = `Option ${field.options.length + 1}`;
    onUpdate({ options: [...field.options, newOption] });
  };

  const updateOption = (index: number, value: string) => {
    if (!field.options) return;
    const newOptions = [...field.options];
    newOptions[index] = value;
    onUpdate({ options: newOptions });
  };

  const removeOption = (index: number) => {
    if (!field.options || field.options.length <= 1) return;
    const newOptions = field.options.filter((_, i) => i !== index);
    onUpdate({ options: newOptions });
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

        <div className="flex-1">
          <input
            type="text"
            value={localLabel}
            onChange={(e) => setLocalLabel(e.target.value)}
            onBlur={handleLabelBlur}
            className="w-full text-base font-medium text-gray-900 border-none outline-none bg-transparent focus:ring-0"
            placeholder="Question"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="mt-3">{renderFieldPreview()}</div>
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

      {/* Question Settings */}
      {isActive && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => onUpdate({ required: e.target.checked })}
                className="text-blue-600"
              />
              <span className="text-gray-700">Required</span>
            </label>

            <select
              value={field.type}
              onChange={(e) =>
                onUpdate({ type: e.target.value as ExtendedFieldType })
              }
              className="text-sm border border-gray-300 rounded px-2 py-1"
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
        </div>
      )}
    </div>
  );

  function renderFieldPreview() {
    switch (field.type) {
      // Text Input Fields
      case "shortText":
        return (
          <div className="relative">
            <input
              type="text"
              placeholder={field.placeholder || "Short text answer"}
              className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:border-blue-500 outline-none"
              disabled
            />
            {field.maxLength && (
              <div className="text-xs text-gray-500 mt-1">
                Max {field.maxLength} characters
              </div>
            )}
          </div>
        );

      case "longText":
        return (
          <div className="relative">
            <textarea
              placeholder={field.placeholder || "Long text answer"}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-transparent focus:border-blue-500 outline-none resize-none"
              rows={3}
              disabled
            />
            {field.maxLength && (
              <div className="text-xs text-gray-500 mt-1">
                Max {field.maxLength} characters
              </div>
            )}
          </div>
        );

      case "email":
        return (
          <input
            type="email"
            placeholder={field.placeholder || "name@example.com"}
            className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:border-blue-500 outline-none"
            disabled
          />
        );

      case "website":
        return (
          <input
            type="url"
            placeholder={field.placeholder || "https://example.com"}
            className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:border-blue-500 outline-none"
            disabled
          />
        );

      case "phoneNumber":
        return (
          <input
            type="tel"
            placeholder={field.placeholder || "(555) 123-4567"}
            className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:border-blue-500 outline-none"
            disabled
          />
        );

      // Choice Fields
      case "multipleChoice":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <input type="radio" disabled className="text-blue-600" />
                {isActive ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                    {field.options && field.options.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(index);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-700">{option}</span>
                )}
              </div>
            ))}

            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addOption();
                }}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add option
              </button>
            )}
          </div>
        );

      case "dropdown":
        return (
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded"
            disabled
          >
            <option>Choose...</option>
            {field.options?.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        );

      case "yesNo":
        return (
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name={field.id} disabled />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name={field.id} disabled />
              <span>No</span>
            </label>
          </div>
        );

      case "numberRating":
        return (
          <div className="flex gap-1">
            {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 border border-gray-300 rounded text-xs flex items-center justify-center"
              >
                {i + 1}
              </div>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {field.minRating || 1} to {field.maxRating || 5}
            </span>
          </div>
        );

      case "opinionScale":
        return (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">1</span>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 border border-gray-300 rounded-sm"
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">10</span>
          </div>
        );

      // Special Fields
      case "statement":
        return (
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <div className="text-sm text-blue-800">
              📝 Statement content will be displayed here
            </div>
          </div>
        );

      case "legal":
        return (
          <div className="border border-gray-300 rounded p-3 bg-gray-50">
            <div className="text-xs text-gray-600 mb-2">
              Terms and Conditions
            </div>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" disabled />
              <span className="text-sm">I agree to the terms</span>
            </label>
          </div>
        );

      case "fileUpload":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
            <div className="text-sm text-gray-600">
              📎 Drop files here or click to upload
            </div>
            {field.acceptedFileTypes && (
              <div className="text-xs text-gray-500 mt-1">
                Accepted: {field.acceptedFileTypes.join(", ")}
              </div>
            )}
          </div>
        );

      // Form Structure
      case "pageBreak":
        return (
          <div className="border-t-2 border-gray-400 py-2 text-center">
            <div className="text-sm text-gray-600">--- Page Break ---</div>
          </div>
        );

      case "startingPage":
        return (
          <div className="bg-green-50 border border-green-200 rounded p-3 text-center">
            <div className="text-sm text-green-800">🎉 Welcome Screen</div>
          </div>
        );

      case "postSubmission":
        return (
          <div className="bg-purple-50 border border-purple-200 rounded p-3 text-center">
            <div className="text-sm text-purple-800">✨ Thank You Page</div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-gray-500 italic">
            Preview not available for {field.type}
          </div>
        );
    }
  }
}
