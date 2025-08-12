import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface OpinionScaleEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function OpinionScaleEditor({
  field,
  onUpdate,
}: OpinionScaleEditorProps) {
  const preview = (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">1</span>
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-4 h-4 border border-gray-300 rounded-sm" />
        ))}
      </div>
      <span className="text-xs text-gray-500">10</span>
    </div>
  );

  const basicSettings = (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Scale Description
        </label>
        <input
          type="text"
          value={field.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="Rate from 1 (strongly disagree) to 10 (strongly agree)"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Default Rating
        </label>
        <select
          value={field.defaultValue || ""}
          onChange={(e) =>
            onUpdate(
              "defaultValue",
              e.target.value ? parseInt(e.target.value) : undefined
            )
          }
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="">No default rating</option>
          {Array.from({ length: 10 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <BaseFieldEditor
      field={field}
      onUpdate={onUpdate}
      preview={preview}
      basicSettings={basicSettings}
      showValidation={false} // Opinion scale has fixed validation
    />
  );
}
