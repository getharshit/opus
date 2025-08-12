import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface YesNoEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function YesNoEditor({ field, onUpdate }: YesNoEditorProps) {
  const displayOptions = field.displayOptions || {};

  const preview = (
    <div
      className={`flex gap-4 ${
        displayOptions.inline ? "flex-row" : "flex-col"
      }`}
    >
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

  const updateDisplayOption = (key: string, value: any) => {
    onUpdate("displayOptions", {
      ...displayOptions,
      [key]: value,
    });
  };

  const basicSettings = (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={displayOptions.inline || false}
            onChange={(e) => updateDisplayOption("inline", e.target.checked)}
            className="text-blue-600"
          />
          <span className="text-gray-700">Display options horizontally</span>
        </label>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Default Value
        </label>
        <select
          value={field.defaultValue || ""}
          onChange={(e) => {
            const value = e.target.value;
            onUpdate(
              "defaultValue",
              value === "" ? undefined : value === "true"
            );
          }}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="">No default selection</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
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
    />
  );
}
