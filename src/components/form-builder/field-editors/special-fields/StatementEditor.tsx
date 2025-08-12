import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface StatementEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function StatementEditor({
  field,
  onUpdate,
}: StatementEditorProps) {
  const displayOptions = field.displayOptions || {};

  const preview = (
    <div
      className={`border rounded p-3 ${
        displayOptions.variant === "highlighted"
          ? "bg-blue-50 border-blue-200"
          : displayOptions.variant === "info"
          ? "bg-blue-50 border-blue-200"
          : displayOptions.variant === "warning"
          ? "bg-yellow-50 border-yellow-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div
        className={`text-sm ${
          displayOptions.variant === "highlighted"
            ? "text-blue-800"
            : displayOptions.variant === "info"
            ? "text-blue-800"
            : displayOptions.variant === "warning"
            ? "text-yellow-800"
            : "text-gray-700"
        }`}
      >
        {field.description || "📝 Statement content will be displayed here"}
      </div>
      {displayOptions.imageUrl && (
        <div className="mt-2 text-xs text-gray-500">
          🖼️ Image: {displayOptions.imageUrl}
        </div>
      )}
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
          Statement Content
        </label>
        <textarea
          value={field.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none resize-none"
          rows={4}
          placeholder="Enter your statement text here..."
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Display Style
        </label>
        <select
          value={displayOptions.variant || "default"}
          onChange={(e) => updateDisplayOption("variant", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="default">Default</option>
          <option value="highlighted">Highlighted</option>
          <option value="info">Info Box</option>
          <option value="warning">Warning Box</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Image URL (optional)
        </label>
        <input
          type="url"
          value={displayOptions.imageUrl || ""}
          onChange={(e) => updateDisplayOption("imageUrl", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="https://example.com/image.jpg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {displayOptions.imageUrl && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Image Alt Text
          </label>
          <input
            type="text"
            value={displayOptions.imageAlt || ""}
            onChange={(e) => updateDisplayOption("imageAlt", e.target.value)}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
            placeholder="Describe the image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );

  return (
    <BaseFieldEditor
      field={field}
      onUpdate={onUpdate}
      preview={preview}
      basicSettings={basicSettings}
      showValidation={false}
    />
  );
}
