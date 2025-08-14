import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface ShortTextEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
  previewOnly?: boolean; // New prop to control display mode
}

export default function ShortTextEditor({
  field,
  onUpdate,
  previewOnly = false,
}: ShortTextEditorProps) {
  const preview = (
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
      {field.minLength && (
        <div className="text-xs text-gray-500 mt-1">
          Min {field.minLength} characters
        </div>
      )}
    </div>
  );

  // If preview only, return just the preview
  if (previewOnly) {
    return preview;
  }

  // Otherwise, return full editor with settings
  const basicSettings = (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Placeholder Text
        </label>
        <input
          type="text"
          value={field.placeholder || ""}
          onChange={(e) => onUpdate("placeholder", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="Enter placeholder text..."
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Min Length
          </label>
          <input
            type="number"
            value={field.minLength || ""}
            onChange={(e) =>
              onUpdate("minLength", parseInt(e.target.value) || undefined)
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
            value={field.maxLength || ""}
            onChange={(e) =>
              onUpdate("maxLength", parseInt(e.target.value) || undefined)
            }
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
            min="1"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Default Value
        </label>
        <input
          type="text"
          value={field.defaultValue || ""}
          onChange={(e) => onUpdate("defaultValue", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="Default text value..."
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );

  return (
    <BaseFieldEditor
      field={field}
      onUpdate={onUpdate}
      preview={preview}
      basicSettings={basicSettings}
    />
  );
}
