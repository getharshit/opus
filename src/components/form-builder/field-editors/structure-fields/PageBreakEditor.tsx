import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface PageBreakEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function PageBreakEditor({
  field,
  onUpdate,
}: PageBreakEditorProps) {
  const preview = (
    <div className="border-t-2 border-gray-400 py-4 text-center">
      <div className="text-sm text-gray-600 font-medium">
        {field.label || "--- Page Break ---"}
      </div>
      {field.description && (
        <div className="text-xs text-gray-500 mt-1">{field.description}</div>
      )}
    </div>
  );

  const basicSettings = (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Section Title (optional)
        </label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdate("label", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="End of Section 1"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Section Description (optional)
        </label>
        <textarea
          value={field.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none resize-none"
          rows={2}
          placeholder="You've completed the first section. Click continue for the next part."
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
      showValidation={false}
      showDisplay={false}
    />
  );
}
