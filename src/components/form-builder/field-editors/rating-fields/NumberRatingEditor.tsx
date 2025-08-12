import { FormField } from "@/types/form";
import BaseFieldEditor from "../BaseFieldEditor";

interface NumberRatingEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
}

export default function NumberRatingEditor({
  field,
  onUpdate,
}: NumberRatingEditorProps) {
  const preview = (
    <div className="flex gap-1 items-center">
      {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
        <div
          key={i}
          className="w-6 h-6 border border-gray-300 rounded text-xs flex items-center justify-center"
        >
          {i + 1}
        </div>
      ))}
      <span className="ml-2 text-sm text-gray-500">
        {field.minRating || 1} to {field.maxRating || 5}
      </span>
    </div>
  );

  const basicSettings = (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Min Rating
          </label>
          <input
            type="number"
            value={field.minRating || 1}
            onChange={(e) =>
              onUpdate("minRating", parseInt(e.target.value) || 1)
            }
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
            min="1"
            max="10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Max Rating
          </label>
          <input
            type="number"
            value={field.maxRating || 5}
            onChange={(e) =>
              onUpdate("maxRating", parseInt(e.target.value) || 5)
            }
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
            min="2"
            max="10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Default Rating
        </label>
        <select
          value={field.defaultValue || ""}
          onChange={(e) =>
            onUpdate(
              "defaultValue",
              e.target.value ? parseInt(e.target.value) : undefined
            )
          }
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="">No default rating</option>
          {Array.from({
            length: (field.maxRating || 5) - (field.minRating || 1) + 1,
          }).map((_, i) => {
            const rating = (field.minRating || 1) + i;
            return (
              <option key={rating} value={rating}>
                {rating}
              </option>
            );
          })}
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
