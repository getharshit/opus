import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface StartingPageEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function StartingPageEditor({
  field,
  onUpdate,
}: StartingPageEditorProps) {
  const displayOptions = field.displayOptions || {};

  const preview = (
    <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
      <div className="text-lg font-medium text-green-800 mb-2">
        🎉 {field.label || "Welcome to Our Form"}
      </div>
      {field.description && (
        <div className="text-sm text-green-700 mb-3">{field.description}</div>
      )}
      <div className="flex flex-wrap gap-2 justify-center text-xs">
        {displayOptions.estimatedTime && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
            ⏱️ {displayOptions.estimatedTime}
          </span>
        )}
        {displayOptions.participantCount && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
            👥 {displayOptions.participantCount} responses
          </span>
        )}
      </div>
      {displayOptions.features && displayOptions.features.length > 0 && (
        <div className="mt-2 text-xs text-green-600">
          Features: {displayOptions.features.join(", ")}
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
          Welcome Title
        </label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdate("label", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="Welcome to Our Survey"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Welcome Message
        </label>
        <textarea
          value={field.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none resize-none"
          rows={3}
          placeholder="Thank you for taking the time to complete our form..."
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Estimated Time
          </label>
          <input
            type="text"
            value={displayOptions.estimatedTime || ""}
            onChange={(e) =>
              updateDisplayOption("estimatedTime", e.target.value)
            }
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
            placeholder="5 minutes"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Participant Count
          </label>
          <input
            type="number"
            value={displayOptions.participantCount || ""}
            onChange={(e) =>
              updateDisplayOption(
                "participantCount",
                parseInt(e.target.value) || undefined
              )
            }
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
            placeholder="1250"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Features (comma separated)
        </label>
        <input
          type="text"
          value={displayOptions.features?.join(", ") || ""}
          onChange={(e) => {
            const features = e.target.value
              .split(",")
              .map((f) => f.trim())
              .filter(Boolean);
            updateDisplayOption(
              "features",
              features.length > 0 ? features : undefined
            );
          }}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="Anonymous, Secure, Mobile-friendly"
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
