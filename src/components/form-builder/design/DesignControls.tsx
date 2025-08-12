"use client";

import React, { useState } from "react";
import { Form } from "@/types/form";
import { Palette, Type, Layout, Eye } from "lucide-react";

interface DesignStepProps {
  form: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

type DesignTab = "colors" | "typography" | "layout" | "preview";

interface TabConfig {
  id: DesignTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const tabs: TabConfig[] = [
  {
    id: "colors",
    label: "Colors",
    icon: Palette,
    description: "Customize your form colors and branding",
  },
  {
    id: "typography",
    label: "Typography",
    icon: Type,
    description: "Choose fonts and text styling",
  },
  {
    id: "layout",
    label: "Layout",
    icon: Layout,
    description: "Adjust spacing and layout options",
  },
  {
    id: "preview",
    label: "Preview",
    icon: Eye,
    description: "Preview your form across devices",
  },
];

export const DesignStep: React.FC<DesignStepProps> = ({ form, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<DesignTab>("colors");

  // Get current theme from form, with fallback defaults
  const currentTheme = form.theme || {
    primaryColor: "#3B82F6",
    fontFamily: "Inter",
    logoUrl: "",
  };

  // Update theme in form
  const updateTheme = (themeUpdates: any) => {
    const updatedTheme = {
      ...currentTheme,
      ...themeUpdates,
    };

    onUpdate({
      theme: updatedTheme,
      // Also update customization for advanced theming
      customization: {
        ...form.customization,
        colors: {
          ...form.customization?.colors,
          ...themeUpdates,
        },
      },
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "colors":
        return <ColorsPanel theme={currentTheme} onUpdate={updateTheme} />;
      case "typography":
        return <TypographyPanel theme={currentTheme} onUpdate={updateTheme} />;
      case "layout":
        return <LayoutPanel theme={currentTheme} onUpdate={updateTheme} />;
      case "preview":
        return <PreviewPanel form={form} />;
      default:
        return <ColorsPanel theme={currentTheme} onUpdate={updateTheme} />;
    }
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            🎨 Design Customization
          </h2>
          <p className="text-gray-600">
            Customize your form's appearance, colors, and typography
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Design Controls */}
          <div className="col-span-7">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                          ${
                            isActive
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    {tabs.find((tab) => tab.id === activeTab)?.description}
                  </p>
                </div>

                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200 px-4 py-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Live Preview
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    See your changes in real-time
                  </p>
                </div>

                <div className="p-4">
                  <LiveFormPreview form={form} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Colors Panel Component (implement first)
const ColorsPanel: React.FC<{
  theme: any;
  onUpdate: (updates: any) => void;
}> = ({ theme, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Colors</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Primary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primaryColor || "#3B82F6"}
                onChange={(e) => onUpdate({ primaryColor: e.target.value })}
                className="w-12 h-10 rounded-md border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={theme.primaryColor || "#3B82F6"}
                onChange={(e) => onUpdate({ primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#3B82F6"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Used for buttons, links, and accents
            </p>
          </div>

          {/* Secondary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.secondaryColor || "#6B7280"}
                onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
                className="w-12 h-10 rounded-md border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={theme.secondaryColor || "#6B7280"}
                onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#6B7280"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Used for secondary elements and text
            </p>
          </div>
        </div>
      </div>

      {/* Color Presets */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Color Presets
        </h4>
        <div className="grid grid-cols-4 gap-3">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() =>
                onUpdate({
                  primaryColor: preset.primary,
                  secondaryColor: preset.secondary,
                })
              }
              className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex gap-1 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: preset.primary }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: preset.secondary }}
                />
              </div>
              <span className="text-xs text-gray-600">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Typography Panel (placeholder for now)
const TypographyPanel: React.FC<{
  theme: any;
  onUpdate: (updates: any) => void;
}> = ({ theme, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Type className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Typography Controls
        </h3>
        <p className="text-gray-500">
          Font selection and typography controls coming next!
        </p>
      </div>
    </div>
  );
};

// Layout Panel (placeholder for now)
const LayoutPanel: React.FC<{
  theme: any;
  onUpdate: (updates: any) => void;
}> = ({ theme, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Layout Options
        </h3>
        <p className="text-gray-500">
          Spacing and layout controls coming soon!
        </p>
      </div>
    </div>
  );
};

// Preview Panel (placeholder for now)
const PreviewPanel: React.FC<{ form: Form }> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Device Preview
        </h3>
        <p className="text-gray-500">Multi-device preview coming soon!</p>
      </div>
    </div>
  );
};

// Live Form Preview Component
const LiveFormPreview: React.FC<{ form: Form }> = ({ form }) => {
  // We'll implement this to use PublicFormRenderer
  return (
    <div className="border rounded-lg p-4 bg-gray-50 min-h-96">
      <div className="text-center py-8">
        <div className="text-sm text-gray-500">
          Form preview will appear here
        </div>
        <div className="mt-4 text-xs text-gray-400">
          Using PublicFormRenderer with current theme
        </div>
      </div>
    </div>
  );
};

// Color presets data
const colorPresets = [
  { name: "Blue", primary: "#3B82F6", secondary: "#6B7280" },
  { name: "Green", primary: "#10B981", secondary: "#6B7280" },
  { name: "Purple", primary: "#7C3AED", secondary: "#6B7280" },
  { name: "Red", primary: "#EF4444", secondary: "#6B7280" },
  { name: "Orange", primary: "#F97316", secondary: "#78716C" },
  { name: "Pink", primary: "#EC4899", secondary: "#6B7280" },
  { name: "Indigo", primary: "#6366F1", secondary: "#6B7280" },
  { name: "Gray", primary: "#374151", secondary: "#9CA3AF" },
];
