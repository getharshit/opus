import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface PostSubmissionEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function PostSubmissionEditor({
  field,
  onUpdate,
}: PostSubmissionEditorProps) {
  const displayOptions = field.displayOptions || {};

  const preview = (
    <div className="bg-purple-50 border border-purple-200 rounded p-4 text-center">
      <div className="text-lg font-medium text-purple-800 mb-2">
        ✨ {field.label || "Thank You!"}
      </div>
      {field.description && (
        <div className="text-sm text-purple-700 mb-3">{field.description}</div>
      )}
      <div className="flex flex-wrap gap-2 justify-center text-xs">
        {displayOptions.showDownload && (
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
            📥 Download Receipt
          </span>
        )}
        {displayOptions.showShare && (
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
            📤 Share Form
          </span>
        )}
        {displayOptions.redirectUrl && (
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
            🔗 Redirect to: {displayOptions.redirectUrl}
          </span>
        )}
      </div>
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
          Thank You Title
        </label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdate("label", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="Thank You!"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Completion Message
        </label>
        <textarea
          value={field.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none resize-none"
          rows={3}
          placeholder="Your response has been recorded successfully..."
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Redirect URL (optional)
        </label>
        <input
          type="url"
          value={displayOptions.redirectUrl || ""}
          onChange={(e) => updateDisplayOption("redirectUrl", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          placeholder="https://example.com/thank-you"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {displayOptions.redirectUrl && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Redirect Delay (seconds)
          </label>
          <input
            type="number"
            value={displayOptions.redirectDelay || 3}
            onChange={(e) =>
              updateDisplayOption(
                "redirectDelay",
                parseInt(e.target.value) || 3
              )
            }
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
            min="0"
            max="60"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={displayOptions.showDownload || false}
            onChange={(e) =>
              updateDisplayOption("showDownload", e.target.checked)
            }
            className="text-blue-600"
          />
          <span className="text-gray-700">Show download receipt option</span>
        </label>

        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={displayOptions.showShare || false}
            onChange={(e) => updateDisplayOption("showShare", e.target.checked)}
            className="text-blue-600"
          />
          <span className="text-gray-700">Show social sharing options</span>
        </label>

        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={displayOptions.showFeedback || false}
            onChange={(e) =>
              updateDisplayOption("showFeedback", e.target.checked)
            }
            className="text-blue-600"
          />
          <span className="text-gray-700">Show feedback option</span>
        </label>
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
