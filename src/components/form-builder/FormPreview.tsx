import { GeneratedForm } from "@/lib/ai/form-generator";
import { Eye, Star } from "lucide-react";

interface FormPreviewProps {
  form: GeneratedForm;
}

export default function FormPreview({ form }: FormPreviewProps) {
  const renderField = (field: any, index: number) => {
    const baseClasses =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    switch (field.type) {
      case "text":
        return (
          <input
            key={field.id}
            type="text"
            placeholder={
              field.placeholder || `Enter ${field.label.toLowerCase()}`
            }
            className={baseClasses}
            disabled
          />
        );

      case "multipleChoice":
        return (
          <div key={field.id} className="space-y-2">
            {field.options?.map((option: string, optIndex: number) => (
              <label key={optIndex} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.id}
                  className="text-blue-600"
                  disabled
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "dropdown":
        return (
          <select key={field.id} className={baseClasses} disabled>
            <option>Select an option...</option>
            {field.options?.map((option: string, optIndex: number) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "rating":
        return (
          <div key={field.id} className="flex gap-1">
            {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer"
              />
            ))}
          </div>
        );

      case "date":
        return (
          <input key={field.id} type="date" className={baseClasses} disabled />
        );

      default:
        return (
          <input key={field.id} type="text" className={baseClasses} disabled />
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Preview Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b bg-gray-50">
        <Eye className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Form Preview</span>
      </div>

      {/* Form Preview */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          {/* Form Header */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {form.title}
            </h3>
            {form.description && (
              <p className="text-gray-600 text-sm">{form.description}</p>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {form.fields.map((field, index) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {renderField(field, index)}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            className="w-full mt-8 bg-blue-600 text-white py-3 px-4 rounded-md font-medium"
            disabled
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
