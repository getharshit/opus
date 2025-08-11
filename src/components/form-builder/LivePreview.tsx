import { Form } from "@/types/form";
import { Eye } from "lucide-react";

interface LivePreviewProps {
  form: Form;
}

export default function LivePreview({ form }: LivePreviewProps) {
  const renderField = (field: any) => {
    switch (field.type) {
      // Text Input Fields
      case "shortText":
        return (
          <input
            type="text"
            placeholder={field.placeholder || "Your answer"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case "longText":
        return (
          <textarea
            placeholder={field.placeholder || "Your detailed answer"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        );

      case "email":
        return (
          <input
            type="email"
            placeholder={field.placeholder || "name@example.com"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case "website":
        return (
          <input
            type="url"
            placeholder={field.placeholder || "https://example.com"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case "phoneNumber":
        return (
          <input
            type="tel"
            placeholder={field.placeholder || "(555) 123-4567"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      // Choice Fields
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

      case "yesNo":
        return (
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={field.id}
                className="text-blue-600"
                style={{ accentColor: form.theme.primaryColor }}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={field.id}
                className="text-blue-600"
                style={{ accentColor: form.theme.primaryColor }}
              />
              <span>No</span>
            </label>
          </div>
        );

      case "numberRating":
        return (
          <div className="flex gap-1 items-center">
            {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
              <button
                key={i}
                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                style={{ borderColor: form.theme.primaryColor }}
              >
                {i + 1}
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({field.minRating || 1} to {field.maxRating || 5})
            </span>
          </div>
        );

      case "opinionScale":
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <button
                  key={i}
                  className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 text-xs"
                  style={{ borderColor: form.theme.primaryColor }}
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
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <div className="text-blue-800">
              {field.description || "Statement content will be displayed here."}
            </div>
          </div>
        );

      case "legal":
        return (
          <div className="space-y-3">
            <div className="border border-gray-300 rounded p-3 bg-gray-50 max-h-32 overflow-y-auto">
              <div className="text-sm text-gray-700">
                Terms and Conditions content...
              </div>
            </div>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span className="text-sm">{field.label}</span>
            </label>
          </div>
        );

      case "fileUpload":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="text-gray-600">
              <div className="text-2xl mb-2">📎</div>
              <div>Click to upload or drag and drop</div>
              {field.acceptedFileTypes && (
                <div className="text-xs text-gray-500 mt-1">
                  Accepted: {field.acceptedFileTypes.join(", ")}
                </div>
              )}
            </div>
          </div>
        );

      // Form Structure Fields
      case "pageBreak":
        return (
          <div className="border-t-2 border-gray-300 py-4 text-center">
            <div className="text-gray-500 text-sm">— Page Break —</div>
          </div>
        );

      case "startingPage":
        return (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">{field.label}</h3>
            <p className="text-blue-100">Welcome screen content</p>
          </div>
        );

      case "postSubmission":
        return (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
            <div className="text-green-600 text-2xl mb-2">✅</div>
            <h3 className="text-lg font-semibold text-green-800">
              {field.label}
            </h3>
            <p className="text-green-600 text-sm">
              Form completed successfully
            </p>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 italic text-sm">
            Preview not available for {field.type}
          </div>
        );
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
