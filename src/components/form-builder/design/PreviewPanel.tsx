"use client";

import React, { useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { Form } from "@/types/form";
import { PublicFormRenderer } from "@/components/public-form";

interface PreviewPanelProps {
  form: Form;
}

type DeviceType = "desktop" | "tablet" | "mobile";

interface DeviceConfig {
  id: DeviceType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  width: number;
  height: number;
  className: string;
}

const devices: DeviceConfig[] = [
  {
    id: "desktop",
    label: "Desktop",
    icon: Monitor,
    width: 1024,
    height: 768,
    className: "w-full max-w-4xl",
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: Tablet,
    width: 768,
    height: 1024,
    className: "w-96",
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    width: 375,
    height: 667,
    className: "w-80",
  },
];

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ form }) => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("desktop");
  const [previewData, setPreviewData] = useState<Record<string, any>>({});

  const currentDevice =
    devices.find((d) => d.id === activeDevice) || devices[0];

  const handlePreviewSubmit = async (data: Record<string, any>) => {
    console.log("Preview form submission:", data);
    // Don't actually submit in preview mode
    alert("This is preview mode - form not actually submitted!");
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setPreviewData((prev) => ({ ...prev, [fieldId]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Device Selector */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Device Preview
        </h3>

        <div className="flex gap-2 mb-6">
          {devices.map((device) => {
            const Icon = device.icon;
            const isActive = activeDevice === device.id;

            return (
              <button
                key={device.id}
                onClick={() => setActiveDevice(device.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md border transition-colors text-sm font-medium
                  ${
                    isActive
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {device.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-gray-100 rounded-lg p-8 flex justify-center">
        <div
          className={`${currentDevice.className} transition-all duration-300`}
        >
          {/* Device Frame */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Device Header (for tablet/mobile) */}
            {activeDevice !== "desktop" && (
              <div className="bg-gray-800 p-2 flex justify-center">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            )}

            {/* Form Preview */}
            <div
              className="overflow-auto"
              style={{
                height:
                  activeDevice === "desktop"
                    ? "auto"
                    : activeDevice === "tablet"
                    ? "600px"
                    : "500px",
              }}
            >
              <div className="p-4">
                <PreviewFormRenderer
                  form={form}
                  onSubmit={handlePreviewSubmit}
                  onFieldChange={handleFieldChange}
                  initialData={previewData}
                />
              </div>
            </div>
          </div>

          {/* Device Info */}
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600">
              {currentDevice.width} × {currentDevice.height}px
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Interactive preview - you can fill out the form
            </div>
          </div>
        </div>
      </div>

      {/* Preview Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Preview Controls
        </h4>

        <div className="flex gap-4">
          <button
            onClick={() => setPreviewData({})}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Clear Form Data
          </button>

          <button
            onClick={() => {
              const sampleData: Record<string, any> = {};
              form.fields.forEach((field) => {
                switch (field.type) {
                  case "shortText":
                    sampleData[field.id] = "Sample text response";
                    break;
                  case "email":
                    sampleData[field.id] = "sample@example.com";
                    break;
                  case "multipleChoice":
                    if (field.options && field.options.length > 0) {
                      sampleData[field.id] = field.options[0];
                    }
                    break;
                  case "numberRating":
                    sampleData[field.id] = Math.ceil(
                      (field.maxRating || 5) / 2
                    );
                    break;
                  case "yesNo":
                    sampleData[field.id] = true;
                    break;
                  // Add more field types as needed
                }
              });
              setPreviewData(sampleData);
            }}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Fill Sample Data
          </button>
        </div>
      </div>

      {/* Current Preview Data */}
      {Object.keys(previewData).length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Current Form Data
          </h4>
          <pre className="text-xs text-gray-600 overflow-auto max-h-32">
            {JSON.stringify(previewData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

// Preview Form Renderer Component
const PreviewFormRenderer: React.FC<{
  form: Form;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onFieldChange: (fieldId: string, value: any) => void;
  initialData: Record<string, any>;
}> = ({ form, onSubmit, onFieldChange, initialData }) => {
  try {
    return (
      <PublicFormRenderer
        form={form}
        onSubmit={onSubmit}
        onFieldChange={onFieldChange}
        initialData={initialData}
        showValidation={true}
      />
    );
  } catch (error) {
    // Fallback if PublicFormRenderer has issues
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">
          Preview temporarily unavailable
        </div>
        <div className="text-sm text-gray-400">
          {form.title || "Form Preview"}
        </div>
        <div className="mt-4 text-xs text-gray-400">
          {form.fields.length} fields configured
        </div>
      </div>
    );
  }
};
