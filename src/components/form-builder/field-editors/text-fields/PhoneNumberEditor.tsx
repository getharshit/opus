import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface PhoneNumberEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function PhoneNumberEditor({
  field,
  onUpdate,
}: PhoneNumberEditorProps) {
  const preview = (
    <input
      type="tel"
      placeholder={field.placeholder || "(555) 123-4567"}
      className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:border-blue-500 outline-none"
      disabled
    />
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
          placeholder="(555) 123-4567"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Default Value
        </label>
        <input
          type="tel"
          value={field.defaultValue || ""}
          onChange={(e) => onUpdate("defaultValue", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="+1 (555) 123-4567"
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
