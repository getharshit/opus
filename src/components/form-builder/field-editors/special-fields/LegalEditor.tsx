import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface LegalEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function LegalEditor({ field, onUpdate }: LegalEditorProps) {
  const displayOptions = field.displayOptions || {};

  const preview = (
    <div className="border border-gray-300 rounded p-3 bg-gray-50">
      <div className="text-xs text-gray-600 mb-2">
        {displayOptions.termsTitle || "Terms and Conditions"}
      </div>
      <div className="border border-gray-200 rounded p-2 bg-white max-h-20 overflow-y-auto text-xs text-gray-600 mb-2">
        {field.description || "Legal terms content will appear here..."}
      </div>
      <label className="flex items-start gap-2">
        <input type="checkbox" className="mt-1" disabled />
        <span className="text-sm">{field.label}</span>
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
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Acceptance Text
        </label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdate("label", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="I agree to the Terms and Conditions"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Terms Title
        </label>
        <input
          type="text"
          value={displayOptions.termsTitle || ""}
          onChange={(e) => updateDisplayOption("termsTitle", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="Terms and Conditions"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Legal Content
        </label>
        <textarea
          value={field.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none resize-none"
          rows={6}
          placeholder="Enter your terms and conditions, privacy policy, or legal text here..."
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
