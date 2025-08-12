import { FormField } from "@/types/form";

interface ValidationEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function ValidationEditor({
  field,
  onUpdate,
}: ValidationEditorProps) {
  // EmailEditor can now use the proper validation interface
  const updateValidationRule = (key: string, value: any) => {
    const currentRules = field.validationRules || {};
    onUpdate("validationRules", {
      ...currentRules,
      [key]: value || undefined,
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Custom Validation Pattern (Regex)
        </label>
        <input
          type="text"
          value={field.validationRules?.pattern || ""}
          onChange={(e) => updateValidationRule("pattern", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="^[A-Za-z]+$"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="text-xs text-gray-500 mt-1">
          Use regex patterns for custom validation
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Custom Error Message
        </label>
        <input
          type="text"
          value={field.validationRules?.customMessage || ""}
          onChange={(e) =>
            updateValidationRule("customMessage", e.target.value)
          }
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="Please enter a valid value"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Field-specific validation options */}
      {(field.type === "shortText" || field.type === "longText") && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Min Length
            </label>
            <input
              type="number"
              value={field.validationRules?.min || ""}
              onChange={(e) =>
                updateValidationRule(
                  "min",
                  parseInt(e.target.value) || undefined
                )
              }
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
              min="0"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Max Length
            </label>
            <input
              type="number"
              value={field.validationRules?.max || ""}
              onChange={(e) =>
                updateValidationRule(
                  "max",
                  parseInt(e.target.value) || undefined
                )
              }
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
              min="1"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {field.type === "legal" && (
        <div>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={field.validationRules?.requireScrollToAccept || false}
              onChange={(e) =>
                updateValidationRule("requireScrollToAccept", e.target.checked)
              }
              className="text-blue-600"
            />
            <span className="text-gray-700">
              Require user to scroll to bottom before accepting
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
