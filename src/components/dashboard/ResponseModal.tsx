import { Form, FormResponse, FormField } from "@/types/form";
import { X, Calendar, MapPin, Star } from "lucide-react";

interface ResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: Form;
  response: FormResponse;
}

export default function ResponseModal({
  isOpen,
  onClose,
  form,
  response,
}: ResponseModalProps) {
  if (!isOpen) return null;

  const renderFieldValue = (field: FormField, value: any) => {
    if (!value && value !== 0) {
      return <span className="text-gray-400 italic">No answer</span>;
    }

    switch (field.type) {
      case "text":
        return (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-900 whitespace-pre-wrap">{value}</p>
          </div>
        );

      case "multipleChoice":
      case "dropdown":
        return (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-900 font-medium">{value}</p>
          </div>
        );

      case "rating":
        return (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < value ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({value}/{field.maxRating || 5})
            </span>
          </div>
        );

      case "date":
        return (
          <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="text-purple-900">
              {new Date(value).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        );

      default:
        return <p className="text-gray-900">{String(value)}</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Response Details
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Submitted on{" "}
              {new Date(response.submittedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Response Metadata */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(response.submittedAt).toLocaleDateString()}</span>
            </div>
            {response.ipAddress && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{response.ipAddress}</span>
              </div>
            )}
            <div className="ml-auto">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                Response #{response.id.slice(-8)}
              </span>
            </div>
          </div>
        </div>

        {/* Response Data */}
        <div className="p-6">
          <div className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.id}>
                <div className="mb-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-500 capitalize">
                    {field.type.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </p>
                </div>
                <div>{renderFieldValue(field, response.data[field.id])}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
