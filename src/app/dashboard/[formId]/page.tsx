"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Form, FormResponse } from "@/types/form";
import {
  BarChart3,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";
import ResponsesTable from "@/components/dashboard/ResponsesTable";
import AnalyticsCards from "@/components/dashboard/AnalyticsCards";
import ResponseModal from "@/components/dashboard/ResponseModal";
import ExportModal from "@/components/dashboard/ExportModal";

interface AnalyticsData {
  totalResponses: number;
  completionRate: number;
  averageTimeToComplete: number;
  responsesToday: number;
  responsesTrend: "up" | "down" | "stable";
}

export default function ResponsesDashboard() {
  const params = useParams();
  const formId = params.formId as string;

  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResponse, setSelectedResponse] = useState<FormResponse | null>(
    null
  );
  const [showExportModal, setShowExportModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFormAndResponses();
    // Set up polling for real-time updates
    const interval = setInterval(loadResponses, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [formId]);

  const loadFormAndResponses = async () => {
    setIsLoading(true);
    try {
      await Promise.all([loadForm(), loadResponses(), loadAnalytics()]);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadForm = async () => {
    const response = await fetch(`/api/forms/${formId}`);
    if (response.ok) {
      const formData = await response.json();
      setForm(formData);
    }
  };

  const loadResponses = async () => {
    const response = await fetch(`/api/forms/${formId}/responses`);
    if (response.ok) {
      const responsesData = await response.json();
      setResponses(responsesData);
    }
  };

  const loadAnalytics = async () => {
    const response = await fetch(`/api/forms/${formId}/analytics`);
    if (response.ok) {
      const analyticsData = await response.json();
      setAnalytics(analyticsData);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadResponses();
    await loadAnalytics();
    setRefreshing(false);
  };

  const handleDeleteResponse = async (responseId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this response? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/forms/${formId}/responses/${responseId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setResponses((prev) => prev.filter((r) => r.id !== responseId));
        await loadAnalytics(); // Refresh analytics
      } else {
        alert("Failed to delete response. Please try again.");
      }
    } catch (error) {
      console.error("Delete response error:", error);
      alert("Failed to delete response. Please try again.");
    }
  };

  const filteredResponses = responses.filter((response) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const responseText = JSON.stringify(response.data).toLowerCase();
    const responseDate = new Date(response.submittedAt)
      .toLocaleDateString()
      .toLowerCase();

    return (
      responseText.includes(searchLower) || responseDate.includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Form not found
          </h2>
          <p className="text-gray-600">
            The form you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => (window.location.href = `/builder/${formId}`)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Form Builder
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <BarChart3 className="w-5 h-5 text-gray-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 mt-1">
                {form.title} - Responses
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
              </button>

              <button
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>

              <button
                onClick={() => window.open(`/form/${formId}`, "_blank")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View Form
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Analytics Cards */}
        {analytics && (
          <div className="mb-6">
            <AnalyticsCards analytics={analytics} />
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Responses ({filteredResponses.length})
              </h2>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search responses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Responses Table */}
          <ResponsesTable
            form={form}
            responses={filteredResponses}
            onViewResponse={setSelectedResponse}
            onDeleteResponse={handleDeleteResponse}
          />
        </div>
      </div>

      {/* Modals */}
      {selectedResponse && (
        <ResponseModal
          isOpen={!!selectedResponse}
          onClose={() => setSelectedResponse(null)}
          form={form}
          response={selectedResponse}
        />
      )}

      {showExportModal && (
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          formId={formId}
          formTitle={form.title}
          responses={responses}
        />
      )}
    </div>
  );
}
