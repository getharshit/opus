import { GeneratedForm } from "@/lib/ai/form-generator";
import { Eye, Star, Upload, Info } from "lucide-react";

interface FormPreviewProps {
  form: GeneratedForm;
}
export default function FormPreview({ form }: FormPreviewProps) {
  const renderField = (field: any, index: number) => {
    const baseClasses =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    switch (field.type) {
      // Text Input Fields
      case "shortText":
        return (
          <input
            key={field.id}
            type="text"
            placeholder={field.placeholder || "Short text answer"}
            className={baseClasses}
            disabled
          />
        );

      case "longText":
        return (
          <textarea
            key={field.id}
            placeholder={field.placeholder || "Long text answer"}
            className={`${baseClasses} resize-none`}
            rows={3}
            disabled
          />
        );

      case "email":
        return (
          <input
            key={field.id}
            type="email"
            placeholder={field.placeholder || "name@example.com"}
            className={baseClasses}
            disabled
          />
        );

      case "website":
        return (
          <input
            key={field.id}
            type="url"
            placeholder={field.placeholder || "https://example.com"}
            className={baseClasses}
            disabled
          />
        );

      case "phoneNumber":
        return (
          <input
            key={field.id}
            type="tel"
            placeholder={field.placeholder || "(555) 123-4567"}
            className={baseClasses}
            disabled
          />
        );

      // Choice Fields
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

      case "yesNo":
        return (
          <div key={field.id} className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name={field.id} disabled />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name={field.id} disabled />
              <span>No</span>
            </label>
          </div>
        );

      case "numberRating":
        return (
          <div key={field.id} className="flex gap-1">
            {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer"
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({field.minRating || 1} to {field.maxRating || 5})
            </span>
          </div>
        );

      case "opinionScale":
        return (
          <div key={field.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <button
                  key={i}
                  className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50"
                  disabled
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        );

      // Special Fields
      case "statement":
        return (
          <div
            key={field.id}
            className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded"
          >
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-blue-800 text-sm">
                {field.description ||
                  "Statement content will be displayed here"}
              </div>
            </div>
          </div>
        );

      case "legal":
        return (
          <div key={field.id} className="space-y-2">
            <div className="border border-gray-300 rounded p-2 bg-gray-50 text-xs text-gray-600 max-h-20 overflow-y-auto">
              Terms and Conditions content...
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" disabled />
              <span className="text-sm">I agree to the terms</span>
            </label>
          </div>
        );

      case "fileUpload":
        return (
          <div
            key={field.id}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
          >
            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Click to upload file</div>
            {field.acceptedFileTypes && (
              <div className="text-xs text-gray-500 mt-1">
                Accepted: {field.acceptedFileTypes.join(", ")}
              </div>
            )}
          </div>
        );

      // Form Structure Fields
      case "pageBreak":
        return (
          <div
            key={field.id}
            className="border-t border-gray-300 py-2 text-center"
          >
            <span className="text-xs text-gray-500">— Page Break —</span>
          </div>
        );

      case "startingPage":
        return (
          <div
            key={field.id}
            className="bg-blue-600 text-white p-4 rounded-lg text-center"
          >
            <h3 className="font-semibold">{field.label}</h3>
            <p className="text-blue-100 text-sm mt-1">Welcome screen</p>
          </div>
        );

      case "postSubmission":
        return (
          <div
            key={field.id}
            className="bg-green-100 border border-green-300 p-4 rounded-lg text-center"
          >
            <div className="text-green-600 text-lg">✅</div>
            <h3 className="text-green-800 font-semibold">{field.label}</h3>
            <p className="text-green-600 text-sm">Thank you page</p>
          </div>
        );

      // Legacy field types (for backward compatibility)
      case "text":
        return (
          <input
            key={field.id}
            type="text"
            placeholder={field.placeholder || "Your answer"}
            className={baseClasses}
            disabled
          />
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
          <div key={field.id} className="text-gray-500 italic text-sm">
            Preview not available for {field.type}
          </div>
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
