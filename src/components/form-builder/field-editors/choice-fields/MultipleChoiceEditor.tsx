import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";
import OptionManager from "../../shared/OptionManager";

interface MultipleChoiceEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function MultipleChoiceEditor({
  field,
  onUpdate,
}: MultipleChoiceEditorProps) {
  const displayOptions = field.displayOptions || {};

  const preview = (
    <div className="space-y-2">
      {field.options?.map((option, index) => (
        <div key={index} className="flex items-center gap-3">
          <input type="radio" disabled className="text-blue-600" />
          <span className="text-gray-700">{option}</span>
        </div>
      ))}
    </div>
  );

  const updateDisplayOption = (key: string, value: any) => {
    onUpdate("displayOptions", {
      ...displayOptions,
      [key]: value,
    });
  };

  const basicSettings = (
    <div className="space-y-4">
      <OptionManager
        options={field.options || ["Option 1"]}
        onOptionsChange={(options) => onUpdate("options", options)}
        label="Choice Options"
        placeholder="Enter choice option"
      />

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={displayOptions.inline || false}
            onChange={(e) => updateDisplayOption("inline", e.target.checked)}
            className="text-blue-600"
          />
          <span className="text-gray-700">
            Display options horizontally (inline)
          </span>
        </label>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Default Value
        </label>
        <select
          value={field.defaultValue || ""}
          onChange={(e) => onUpdate("defaultValue", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="">No default selection</option>
          {field.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
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
    />
  );
}
