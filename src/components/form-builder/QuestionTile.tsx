import { useState } from "react";
import { FormField } from "@/types/form";
import { GripVertical, Trash2, Plus, X } from "lucide-react";

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
                onUpdate({ type: e.target.value as FormField["type"] })
              }
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="text">Short Answer</option>
              <option value="multipleChoice">Multiple Choice</option>
              <option value="dropdown">Dropdown</option>
              <option value="rating">Rating</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );

  function renderFieldPreview() {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={field.placeholder || "Your answer"}
            className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:border-blue-500 outline-none"
            disabled
          />
        );

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

      case "rating":
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
          </div>
        );

      case "date":
        return (
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded"
            disabled
          />
        );

      default:
        return null;
    }
  }
}
