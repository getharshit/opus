"use client";

import { useState, useEffect } from "react";
import { FormListItem } from "@/types/form";
import {
  Plus,
  Edit3,
  BarChart3,
  Trash2,
  Users,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function Home() {
  const [forms, setForms] = useState<FormListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [editingForm, setEditingForm] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch("/api/forms");
      if (response.ok) {
        const data = await response.json();
        setForms(data);
      }
    } catch (error) {
      console.error("Failed to fetch forms:", error);
      showToast({
        type: "error",
        title: "Failed to load forms",
        message: "Please refresh the page to try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (formId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this form? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setForms(forms.filter((form) => form.id !== formId));
        showToast({
          type: "success",
          title: "Form deleted",
          message: "The form has been permanently removed",
        });
      } else {
        showToast({
          type: "error",
          title: "Failed to delete form",
          message: "Please try again later",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast({
        type: "error",
        title: "Failed to delete form",
        message: "Please check your connection and try again",
      });
    }
  };

  const handleRename = (formId: string, currentTitle: string) => {
    setEditingForm(formId);
    setEditingTitle(currentTitle);
  };

  const saveRename = async (formId: string) => {
    if (!editingTitle.trim()) {
      showToast({
        type: "error",
        title: "Invalid title",
        message: "Form title cannot be empty",
      });
      return;
    }

    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editingTitle.trim() }),
      });

      if (response.ok) {
        setForms(
          forms.map((form) =>
            form.id === formId ? { ...form, title: editingTitle.trim() } : form
          )
        );
        showToast({
          type: "success",
          title: "Form renamed",
          message: `Form renamed to "${editingTitle.trim()}"`,
        });
        cancelRename();
      } else {
        showToast({
          type: "error",
          title: "Failed to rename form",
          message: "Please try again later",
        });
      }
    } catch (error) {
      console.error("Rename error:", error);
      showToast({
        type: "error",
        title: "Failed to rename form",
        message: "Please check your connection and try again",
      });
    }
  };

  const cancelRename = () => {
    setEditingForm(null);
    setEditingTitle("");
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your forms...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Forms</h1>
            <p className="text-gray-600">
              Create, manage, and analyze your forms
            </p>
          </div>

          {/* Create Form Button */}
          <div className="relative">
            <button
              onClick={() => setShowCreateOptions(!showCreateOptions)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Plus size={20} />
              Create Form
            </button>

            {/* Create Options Dropdown */}
            {showCreateOptions && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-2">
                  <a
                    href="/create"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                    onClick={() => setShowCreateOptions(false)}
                  >
                    <div className="font-medium">✨ Create with AI</div>
                    <div className="text-sm text-gray-500">
                      Describe your form and let AI build it
                    </div>
                  </a>
                  <a
                    href="/builder/new"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowCreateOptions(false)}
                  >
                    <div className="font-medium">📝 Start from scratch</div>
                    <div className="text-sm text-gray-500">
                      Build your form manually
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Forms Grid */}
        {forms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div
                key={form.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                {/* Form Header */}
                <div className="mb-4">
                  {editingForm === form.id ? (
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1 text-lg font-semibold text-gray-900 border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveRename(form.id);
                          if (e.key === "Escape") cancelRename();
                        }}
                      />
                      <button
                        onClick={() => saveRename(form.id)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelRename}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group mb-1">
                      <h3 className="flex-1 text-lg font-semibold text-gray-900 line-clamp-2">
                        {form.title}
                      </h3>
                      <button
                        onClick={() => handleRename(form.id, form.title)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                        title="Rename"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  )}
                  {form.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {form.description}
                    </p>
                  )}
                </div>

                {/* Form Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{form.responseCount} responses</span>
                  </div>
                  <div>Created {formatDate(form.createdAt)}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href={`/builder/${form.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit3 size={16} />
                    Edit
                  </a>

                  <a
                    href={`/dashboard/${form.id}`}
                    className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <BarChart3 size={16} />
                    Responses
                  </a>

                  <button
                    onClick={() => handleDelete(form.id)}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm font-medium hover:bg-red-200 transition-colors flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                No forms yet
              </h2>
              <p className="text-gray-600 mb-6">
                Create your first form to get started
              </p>
              <div className="space-y-3">
                <a
                  href="/create"
                  className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  ✨ Create with AI
                </a>
                <a
                  href="/builder/new"
                  className="block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  📝 Start from scratch
                </a>
              </div>
            </div>
          </div>
        )}

        {/* System Status (keeping for now) */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">✅ System Status</h2>
          <div className="text-left space-y-2 text-sm">
            <p>🗄️ Database: Connected</p>
            <p>🤖 AI: Ollama Ready</p>
            <p>🎨 UI: Form Builder Active</p>
            <p>📊 Total Forms: {forms.length}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
