import { useState } from "react";
import { Form } from "@/types/form";
import { Settings, Palette } from "lucide-react";

interface FormSettingsProps {
  form: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

export default function FormSettings({ form, onUpdate }: FormSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="p-4 border-t border-gray-200 space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Palette className="w-4 h-4" />
              Theme Color
            </label>
            <div className="flex gap-2">
              {["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() =>
                      onUpdate({
                        theme: { ...form.theme, primaryColor: color },
                      })
                    }
                    className="w-8 h-8 rounded-md border-2 border-white shadow-sm"
                    style={{
                      backgroundColor: color,
                      borderColor:
                        form.theme.primaryColor === color
                          ? "#374151"
                          : "#ffffff",
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
