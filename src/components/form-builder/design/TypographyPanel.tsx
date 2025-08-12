"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface TypographyPanelProps {
  typography: any;
  onUpdate: (updates: any) => void;
}

const typographyPresets = [
  {
    name: "Modern",
    description: "Clean and contemporary",
    settings: {
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: { title: 28, question: 16, input: 16, small: 14 },
      fontWeight: { normal: 400, medium: 500, bold: 700 },
    },
  },
  {
    name: "Classic",
    description: "Traditional and readable",
    settings: {
      fontFamily: "Georgia, serif",
      fontSize: { title: 26, question: 16, input: 16, small: 14 },
      fontWeight: { normal: 400, medium: 500, bold: 700 },
    },
  },
  {
    name: "Friendly",
    description: "Approachable and warm",
    settings: {
      fontFamily: "Nunito, system-ui, sans-serif",
      fontSize: { title: 24, question: 16, input: 16, small: 14 },
      fontWeight: { normal: 400, medium: 600, bold: 700 },
    },
  },
  {
    name: "Professional",
    description: "Corporate and trustworthy",
    settings: {
      fontFamily: "Roboto, system-ui, sans-serif",
      fontSize: { title: 24, question: 15, input: 15, small: 13 },
      fontWeight: { normal: 400, medium: 500, bold: 600 },
    },
  },
];

export const TypographyPanel: React.FC<TypographyPanelProps> = ({
  typography,
  onUpdate,
}) => {
  return (
    <div className="space-y-6">
      {/* Font Family */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Font Family</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Font
            </label>
            <div className="relative">
              <select
                value={typography.fontFamily}
                onChange={(e) => onUpdate({ fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white pr-8"
              >
                <optgroup label="System Fonts">
                  <option value="system-ui, -apple-system, sans-serif">
                    System UI
                  </option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Helvetica, sans-serif">Helvetica</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Times New Roman, serif">
                    Times New Roman
                  </option>
                </optgroup>
                <optgroup label="Google Fonts">
                  <option value="Inter, system-ui, sans-serif">Inter</option>
                  <option value="Roboto, system-ui, sans-serif">Roboto</option>
                  <option value="Open Sans, system-ui, sans-serif">
                    Open Sans
                  </option>
                  <option value="Lato, system-ui, sans-serif">Lato</option>
                  <option value="Montserrat, system-ui, sans-serif">
                    Montserrat
                  </option>
                  <option value="Poppins, system-ui, sans-serif">
                    Poppins
                  </option>
                  <option value="Nunito, system-ui, sans-serif">Nunito</option>
                  <option value="Playfair Display, Georgia, serif">
                    Playfair Display
                  </option>
                  <option value="Merriweather, Georgia, serif">
                    Merriweather
                  </option>
                  <option value="Lora, Georgia, serif">Lora</option>
                </optgroup>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Font used throughout the form
            </p>
          </div>

          {/* Font Preview */}
          <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <div
              className="text-lg font-medium mb-2"
              style={{ fontFamily: typography.fontFamily }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
            <div
              className="text-sm text-gray-600"
              style={{ fontFamily: typography.fontFamily }}
            >
              This is how your selected font will appear in the form
            </div>
          </div>
        </div>
      </div>

      {/* Font Sizes */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Font Sizes</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Title Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Title
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="18"
                max="36"
                value={typography.fontSize?.title || 24}
                onChange={(e) =>
                  onUpdate({
                    fontSize: {
                      ...typography.fontSize,
                      title: parseInt(e.target.value),
                    },
                  })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {typography.fontSize?.title || 24}px
              </span>
            </div>
            <div
              className="text-sm mt-2 font-medium"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: `${typography.fontSize?.title || 24}px`,
              }}
            >
              Sample Title
            </div>
          </div>

          {/* Question Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Questions
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="12"
                max="20"
                value={typography.fontSize?.question || 16}
                onChange={(e) =>
                  onUpdate({
                    fontSize: {
                      ...typography.fontSize,
                      question: parseInt(e.target.value),
                    },
                  })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {typography.fontSize?.question || 16}px
              </span>
            </div>
            <div
              className="text-sm mt-2"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: `${typography.fontSize?.question || 16}px`,
              }}
            >
              Sample Question
            </div>
          </div>

          {/* Input Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input Text
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="12"
                max="18"
                value={typography.fontSize?.input || 16}
                onChange={(e) =>
                  onUpdate({
                    fontSize: {
                      ...typography.fontSize,
                      input: parseInt(e.target.value),
                    },
                  })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {typography.fontSize?.input || 16}px
              </span>
            </div>
            <div
              className="text-sm mt-2"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: `${typography.fontSize?.input || 16}px`,
              }}
            >
              Sample Input
            </div>
          </div>

          {/* Small Text Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Help Text
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="10"
                max="16"
                value={typography.fontSize?.small || 14}
                onChange={(e) =>
                  onUpdate({
                    fontSize: {
                      ...typography.fontSize,
                      small: parseInt(e.target.value),
                    },
                  })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {typography.fontSize?.small || 14}px
              </span>
            </div>
            <div
              className="text-sm mt-2 text-gray-600"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: `${typography.fontSize?.small || 14}px`,
              }}
            >
              Sample help text
            </div>
          </div>
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Font Weights</h3>

        <div className="grid grid-cols-3 gap-4">
          {/* Normal Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Normal Text
            </label>
            <select
              value={typography.fontWeight?.normal || 400}
              onChange={(e) =>
                onUpdate({
                  fontWeight: {
                    ...typography.fontWeight,
                    normal: parseInt(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value={300}>Light (300)</option>
              <option value={400}>Normal (400)</option>
              <option value={500}>Medium (500)</option>
            </select>
            <div
              className="text-sm mt-2"
              style={{
                fontFamily: typography.fontFamily,
                fontWeight: typography.fontWeight?.normal || 400,
              }}
            >
              Sample Text
            </div>
          </div>

          {/* Medium Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Questions
            </label>
            <select
              value={typography.fontWeight?.medium || 500}
              onChange={(e) =>
                onUpdate({
                  fontWeight: {
                    ...typography.fontWeight,
                    medium: parseInt(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value={400}>Normal (400)</option>
              <option value={500}>Medium (500)</option>
              <option value={600}>Semibold (600)</option>
            </select>
            <div
              className="text-sm mt-2"
              style={{
                fontFamily: typography.fontFamily,
                fontWeight: typography.fontWeight?.medium || 500,
              }}
            >
              Sample Question
            </div>
          </div>

          {/* Bold Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Headings
            </label>
            <select
              value={typography.fontWeight?.bold || 700}
              onChange={(e) =>
                onUpdate({
                  fontWeight: {
                    ...typography.fontWeight,
                    bold: parseInt(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value={600}>Semibold (600)</option>
              <option value={700}>Bold (700)</option>
              <option value={800}>Extra Bold (800)</option>
            </select>
            <div
              className="text-sm mt-2"
              style={{
                fontFamily: typography.fontFamily,
                fontWeight: typography.fontWeight?.bold || 700,
              }}
            >
              Sample Heading
            </div>
          </div>
        </div>
      </div>

      {/* Typography Presets */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Typography Presets
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {typographyPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onUpdate(preset.settings)}
              className="flex flex-col items-start p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors text-left"
            >
              <div className="mb-2">
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: preset.settings.fontFamily }}
                >
                  Aa
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {preset.name}
                </div>
                <div className="text-xs text-gray-500">
                  {preset.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
