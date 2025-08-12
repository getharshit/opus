import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";
import OptionManager from "../../shared/OptionManager";

interface DropdownEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function DropdownEditor({
  field,
  onUpdate,
}: DropdownEditorProps) {
  const preview = (
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
      disabled
    >
      <option>{field.placeholder || "Choose..."}</option>
      {field.options?.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );

  const basicSettings = (
    <div className="space-y-4">
      <OptionManager
        options={field.options || ["Option 1"]}
        onOptionsChange={(options) => onUpdate("options", options)}
        label="Dropdown Options"
        placeholder="Enter dropdown option"
      />

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Placeholder Text
        </label>
        <input
          type="text"
          value={field.placeholder || ""}
          onChange={(e) => onUpdate("placeholder", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="Choose..."
          onClick={(e) => e.stopPropagation()}
        />
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
