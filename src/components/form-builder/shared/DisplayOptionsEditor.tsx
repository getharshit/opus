import { FormField } from "@/types/form";

interface DisplayOptionsEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function DisplayOptionsEditor({
  field,
  onUpdate,
}: DisplayOptionsEditorProps) {
  const updateDisplayOption = (key: string, value: any) => {
    const currentOptions = field.displayOptions || {};
    onUpdate("displayOptions", {
      ...currentOptions,
      [key]: value,
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Field Width
        </label>
        <select
          value={field.displayOptions?.width || "full"}
          onChange={(e) => updateDisplayOption("width", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="full">Full Width</option>
          <option value="half">Half Width</option>
          <option value="third">Third Width</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={field.displayOptions?.showLabel !== false}
            onChange={(e) => updateDisplayOption("showLabel", e.target.checked)}
            className="text-blue-600"
          />
          <span className="text-gray-700">Show Label</span>
        </label>

        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={field.displayOptions?.showDescription !== false}
            onChange={(e) =>
              updateDisplayOption("showDescription", e.target.checked)
            }
            className="text-blue-600"
          />
          <span className="text-gray-700">Show Description</span>
        </label>

        {(field.type === "yesNo" || field.type === "multipleChoice") && (
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={field.displayOptions?.inline || false}
              onChange={(e) => updateDisplayOption("inline", e.target.checked)}
              className="text-blue-600"
            />
            <span className="text-gray-700">Display inline (horizontal)</span>
          </label>
        )}
      </div>
    </div>
  );
}
