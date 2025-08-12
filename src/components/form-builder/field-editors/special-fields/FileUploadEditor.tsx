import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface FileUploadEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function FileUploadEditor({
  field,
  onUpdate,
}: FileUploadEditorProps) {
  const preview = (
    <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
      <div className="text-sm text-gray-600">
        📎 Drop files here or click to upload
      </div>
      {field.acceptedFileTypes && field.acceptedFileTypes.length > 0 && (
        <div className="text-xs text-gray-500 mt-1">
          Accepted: {field.acceptedFileTypes.join(", ")}
        </div>
      )}
      {field.maxFileSize && (
        <div className="text-xs text-gray-500">
          Max size: {field.maxFileSize}MB
        </div>
      )}
    </div>
  );

  const basicSettings = (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Accepted File Types
        </label>
        <input
          type="text"
          value={field.acceptedFileTypes?.join(", ") || ""}
          onChange={(e) => {
            const types = e.target.value
              .split(",")
              .map((type) => type.trim())
              .filter(Boolean);
            onUpdate("acceptedFileTypes", types.length > 0 ? types : undefined);
          }}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder=".pdf, .jpg, .png, .doc, .docx"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="text-xs text-gray-500 mt-1">
          Separate file extensions with commas (e.g., .pdf, .jpg, .png)
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Maximum File Size (MB)
        </label>
        <input
          type="number"
          value={field.maxFileSize || ""}
          onChange={(e) =>
            onUpdate("maxFileSize", parseInt(e.target.value) || undefined)
          }
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          min="1"
          max="100"
          placeholder="10"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Upload Instructions
        </label>
        <textarea
          value={field.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none resize-none"
          rows={2}
          placeholder="Upload your document here..."
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
    />
  );
}
