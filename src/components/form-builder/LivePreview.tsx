import { Form } from "@/types/form";
import { Eye } from "lucide-react";

interface LivePreviewProps {
  form: Form;
}

export default function LivePreview({ form }: LivePreviewProps) {
  const renderField = (field: any) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={field.placeholder || "Your answer"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case "multipleChoice":
        return (
          <div className="space-y-2">
            {field.options?.map((option: string, index: number) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.id}
                  className="text-blue-600"
                  style={{ accentColor: form.theme.primaryColor }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case "dropdown":
        return (
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>Select an option...</option>
            {field.options?.map((option: string, index: number) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        );

      case "rating":
        return (
          <div className="flex gap-1">
            {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
              <button
                key={i}
                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                style={{ borderColor: form.theme.primaryColor }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        );

      case "date":
        return (
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
        <Eye className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Live Preview</span>
      </div>

      {/* Preview Content */}
      <div className="p-6">
        <div className="max-w-md">
          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {form.title}
            </h2>
            {form.description && (
              <p className="text-gray-600 text-sm">{form.description}</p>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {form.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            className="w-full mt-6 py-3 px-4 rounded-md text-white font-medium"
            style={{ backgroundColor: form.theme.primaryColor }}
            disabled
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
