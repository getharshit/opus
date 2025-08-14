import { useState } from "react";
import { Form } from "@/types/form";
import { Settings, Palette, Users, Shield, Info } from "lucide-react";

interface FormSettingsProps {
  form: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

export default function FormSettings({ form, onUpdate }: FormSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get current settings with defaults
  const currentSettings = {
    allowMultipleSubmissions: form.settings?.allowMultipleSubmissions ?? false,
    collectIPAddress: form.settings?.collectIPAddress ?? true,
    collectUserAgent: form.settings?.collectUserAgent ?? true,
    showPrivacyNotice: form.settings?.showPrivacyNotice ?? false,
    requireAllFields: form.settings?.requireAllFields ?? false,
    customSubmissionMessage: form.settings?.customSubmissionMessage ?? "",
    ...form.settings,
  };

  const updateSetting = (key: string, value: any) => {
    const updatedSettings = {
      ...currentSettings,
      [key]: value,
    };

    onUpdate({
      settings: updatedSettings,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              Form Settings
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {isExpanded ? "Collapse" : "Expand"}
          </span>
        </button>
      </div>

      {/* Form Title & Description */}
      <div className="p-4 space-y-4">
        <div>
          <input
            type="text"
            value={form.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full text-xl font-semibold text-gray-900 border-none outline-none bg-transparent placeholder-gray-400 focus:ring-0"
            placeholder="Untitled Form"
          />
        </div>
        <div>
          <textarea
            value={form.description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Add form description..."
            className="w-full text-sm text-gray-600 border-none outline-none bg-transparent placeholder-gray-400 resize-none focus:ring-0"
            rows={2}
          />
        </div>
      </div>

      {/* Extended Settings */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 space-y-6">
          {/* NEW: Submission Settings Section */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Users className="w-4 h-4" />
              Submission Settings
            </label>

            {/* Multiple Submissions Toggle */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    Allow Multiple Submissions
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    When enabled, users can submit responses multiple times
                  </p>
                  {/* Status indicator */}
                  <div
                    className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      currentSettings.allowMultipleSubmissions
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    <Info className="w-3 h-3" />
                    {currentSettings.allowMultipleSubmissions
                      ? "Multiple submissions allowed"
                      : "One submission per IP"}
                  </div>
                </div>

                {/* Custom Tailwind Toggle */}
                <label className="relative inline-flex items-center cursor-pointer ml-3">
                  <input
                    type="checkbox"
                    checked={currentSettings.allowMultipleSubmissions}
                    onChange={(e) =>
                      updateSetting(
                        "allowMultipleSubmissions",
                        e.target.checked
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
