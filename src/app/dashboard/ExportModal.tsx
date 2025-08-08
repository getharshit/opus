import { useState } from "react";
import { FormResponse } from "@/types/form";
import { X, Download, FileText, Calendar } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  formTitle: string;
  responses: FormResponse[];
}

export default function ExportModal({
  isOpen,
  onClose,
  formId,
  formTitle,
  responses,
}: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "json">("csv");
  const [dateRange, setDateRange] = useState<"all" | "week" | "month">("all");

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const params = new URLSearchParams({
        format: exportFormat,
        dateRange,
      });

      const response = await fetch(`/api/forms/${formId}/export?${params}`);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${formTitle}-responses-${
          new Date().toISOString().split("T")[0]
        }.${exportFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        onClose();
      } else {
        alert("Failed to export data. Please try again.");
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const getFilteredCount = () => {
    if (dateRange === "all") return responses.length;

    const now = new Date();
    const cutoff = new Date();

    if (dateRange === "week") {
      cutoff.setDate(now.getDate() - 7);
    } else if (dateRange === "month") {
      cutoff.setMonth(now.getMonth() - 1);
    }

    return responses.filter((r) => new Date(r.submittedAt) >= cutoff).length;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Export Responses
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="csv"
                  checked={exportFormat === "csv"}
                  onChange={(e) => setExportFormat(e.target.value as "csv")}
                  className="text-blue-600"
                />
                <div className="ml-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-900">
                    CSV (Excel compatible)
                  </span>
                </div>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="json"
                  checked={exportFormat === "json"}
                  onChange={(e) => setExportFormat(e.target.value as "json")}
                  className="text-blue-600"
                />
                <div className="ml-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-900">JSON (Raw data)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Date Range
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="all"
                    checked={dateRange === "all"}
                    onChange={(e) => setDateRange(e.target.value as "all")}
                    className="text-blue-600"
                  />
                  <span className="ml-3 text-sm text-gray-900">All time</span>
                </div>
                <span className="text-sm text-gray-500">
                  {responses.length} responses
                </span>
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="month"
                    checked={dateRange === "month"}
                    onChange={(e) => setDateRange(e.target.value as "month")}
                    className="text-blue-600"
                  />
                  <span className="ml-3 text-sm text-gray-900">
                    Last 30 days
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {
                    responses.filter((r) => {
                      const cutoff = new Date();
                      cutoff.setMonth(cutoff.getMonth() - 1);
                      return new Date(r.submittedAt) >= cutoff;
                    }).length
                  }{" "}
                  responses
                </span>
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="week"
                    checked={dateRange === "week"}
                    onChange={(e) => setDateRange(e.target.value as "week")}
                    className="text-blue-600"
                  />
                  <span className="ml-3 text-sm text-gray-900">
                    Last 7 days
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {
                    responses.filter((r) => {
                      const cutoff = new Date();
                      cutoff.setDate(cutoff.getDate() - 7);
                      return new Date(r.submittedAt) >= cutoff;
                    }).length
                  }{" "}
                  responses
                </span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                Ready to export {getFilteredCount()} responses as{" "}
                {exportFormat.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || getFilteredCount() === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export {exportFormat.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
