import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface LongTextEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function LongTextEditor({
  field,
  onUpdate,
}: LongTextEditorProps) {
  const preview = (
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
