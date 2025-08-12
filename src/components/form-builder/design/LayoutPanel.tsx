"use client";

import React from "react";
import { Layout, Upload } from "lucide-react"; // Add Upload import

interface LayoutPanelProps {
  customization: any;
  onUpdate: (updates: any) => void;
}

const buttonVariants = [
  {
    id: "filled",
    name: "Filled",
    description: "Solid background",
    previewClass: "bg-blue-600 text-white",
    previewStyle: {},
  },
  {
    id: "outlined",
    name: "Outlined",
    description: "Border only",
    previewClass: "bg-transparent text-blue-600 border border-blue-600",
    previewStyle: {},
  },
  {
    id: "ghost",
    name: "Ghost",
    description: "Minimal style",
    previewClass: "bg-transparent text-blue-600 hover:bg-blue-50",
    previewStyle: {},
  },
];

const layoutPresets = [
  {
    name: "Compact",
    description: "Tight spacing, minimal padding",
    settings: {
      spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
      borders: { radius: 4 },
      shadows: { sm: "none" },
      maxWidth: 500,
      alignment: "center",
    },
  },
  {
    name: "Comfortable",
    description: "Balanced spacing and padding",
    settings: {
      spacing: { xs: 6, sm: 12, md: 16, lg: 24, xl: 32 },
      borders: { radius: 8 },
      shadows: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
      maxWidth: 600,
      alignment: "center",
    },
  },
  {
    name: "Spacious",
    description: "Generous spacing and padding",
    settings: {
      spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 48 },
      borders: { radius: 12 },
      shadows: { md: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
      maxWidth: 700,
      alignment: "center",
    },
  },
  {
    name: "Minimal",
    description: "Clean, borderless design",
    settings: {
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
      borders: { radius: 0 },
      shadows: { sm: "none" },
      maxWidth: 600,
      alignment: "center",
    },
  },
];

export const LayoutPanel: React.FC<LayoutPanelProps> = ({
  customization,
  onUpdate,
}) => {
  // Extract current values from the flattened structure
  const currentSpacing = customization.spacing || {
    xs: 6,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  };
  const currentBorders = customization.borders || { radius: 8, width: 1 };
  const currentShadows = customization.shadows || {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  };
  const currentMaxWidth = customization.maxWidth || 600;
  const currentAlignment = customization.alignment || "center";
  const currentButtonStyle = customization.buttonStyle || "filled";
  const currentButtonSize = customization.buttonSize || "md";
  const currentLogoPosition = customization.logoPosition || "top-left";
  const currentLogoSize = customization.logoSize || 48;

  // Helper function to update spacing
  const updateSpacing = (spacingUpdates: any) => {
    onUpdate({
      spacing: {
        ...currentSpacing,
        ...spacingUpdates,
      },
    });
  };

  // Helper function to update borders
  const updateBorders = (borderUpdates: any) => {
    onUpdate({
      borders: {
        ...currentBorders,
        ...borderUpdates,
      },
    });
  };

  // Helper function to update shadows
  const updateShadows = (shadowUpdates: any) => {
    onUpdate({
      shadows: {
        ...currentShadows,
        ...shadowUpdates,
      },
    });
  };

  // Helper function to get current shadow level
  const getCurrentShadowLevel = () => {
    if (currentShadows.sm === "none" || !currentShadows.sm) return "none";
    if (currentShadows.sm) return "sm";
    if (currentShadows.md) return "md";
    if (currentShadows.lg) return "lg";
    return "sm";
  };

  return (
    <div className="space-y-6">
      {/* Spacing Controls */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Spacing</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Form Padding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Padding
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="8"
                max="48"
                value={currentSpacing.md || 16}
                onChange={(e) =>
                  updateSpacing({ md: parseInt(e.target.value) })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {currentSpacing.md || 16}px
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Internal padding within form sections
            </p>
          </div>

          {/* Question Spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Spacing
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="12"
                max="48"
                value={currentSpacing.lg || 24}
                onChange={(e) =>
                  updateSpacing({ lg: parseInt(e.target.value) })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {currentSpacing.lg || 24}px
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Space between form questions
            </p>
          </div>

          {/* Input Spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input Padding
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="8"
                max="20"
                value={currentSpacing.sm || 12}
                onChange={(e) =>
                  updateSpacing({ sm: parseInt(e.target.value) })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {currentSpacing.sm || 12}px
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Padding inside input fields
            </p>
          </div>

          {/* Section Spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Spacing
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="16"
                max="64"
                value={currentSpacing.xl || 32}
                onChange={(e) =>
                  updateSpacing({ xl: parseInt(e.target.value) })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {currentSpacing.xl || 32}px
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Space between major sections
            </p>
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Border Radius
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Input Border Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input Fields
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="16"
                value={currentBorders.radius || 8}
                onChange={(e) =>
                  updateBorders({ radius: parseInt(e.target.value) })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {currentBorders.radius || 8}px
              </span>
            </div>

            {/* Preview Box */}
            <div className="mt-2">
              <div
                className="w-full h-10 border border-gray-300 bg-white"
                style={{
                  borderRadius: `${currentBorders.radius || 8}px`,
                }}
              />
            </div>
          </div>

          {/* Button Border Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buttons
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="20"
                value={
                  currentBorders.buttonRadius || currentBorders.radius || 8
                }
                onChange={(e) =>
                  updateBorders({ buttonRadius: parseInt(e.target.value) })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">
                {currentBorders.buttonRadius || currentBorders.radius || 8}px
              </span>
            </div>

            {/* Preview Button */}
            <div className="mt-2">
              <div
                className="h-10 px-4 bg-blue-600 text-white flex items-center justify-center text-sm font-medium"
                style={{
                  borderRadius: `${
                    currentBorders.buttonRadius || currentBorders.radius || 8
                  }px`,
                }}
              >
                Sample Button
              </div>
            </div>
          </div>
        </div>

        {/* Border Radius Presets */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Quick Options
          </h4>
          <div className="flex gap-2">
            {[
              { label: "None", value: 0 },
              { label: "Small", value: 4 },
              { label: "Medium", value: 8 },
              { label: "Large", value: 12 },
              { label: "Pill", value: 24 },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() =>
                  updateBorders({
                    radius: preset.value,
                    buttonRadius: preset.value,
                  })
                }
                className={`px-3 py-1 text-xs rounded border transition-colors ${
                  (currentBorders.radius || 8) === preset.value
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Button Styles */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Button Styles
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {/* Button Variant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Style
            </label>
            <div className="grid grid-cols-3 gap-3">
              {buttonVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => onUpdate({ buttonStyle: variant.id })}
                  className={`
                    p-3 rounded-lg border transition-all text-center
                    ${
                      currentButtonStyle === variant.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }
                  `}
                >
                  <div className="mb-2">
                    <div
                      className={`
                        w-full h-8 rounded flex items-center justify-center text-xs font-medium
                        ${variant.previewClass}
                      `}
                      style={{
                        borderRadius: `${currentBorders.radius || 8}px`,
                        ...variant.previewStyle,
                      }}
                    >
                      Sample
                    </div>
                  </div>
                  <div className="text-xs font-medium text-gray-900">
                    {variant.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {variant.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Button Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Size
            </label>
            <div className="flex gap-2">
              {["sm", "md", "lg"].map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdate({ buttonSize: size })}
                  className={`
                    px-3 py-1 text-xs rounded border transition-colors uppercase
                    ${
                      currentButtonSize === size
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Width & Alignment */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Form Layout</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Max Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Width
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="400"
                max="1000"
                step="50"
                value={currentMaxWidth}
                onChange={(e) =>
                  onUpdate({ maxWidth: parseInt(e.target.value) })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12">
                {currentMaxWidth}px
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum form width on desktop
            </p>
          </div>

          {/* Alignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Alignment
            </label>
            <select
              value={currentAlignment}
              onChange={(e) => onUpdate({ alignment: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              How the form is positioned on the page
            </p>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Logo & Branding
        </h3>

        <div className="space-y-4">
          {/* Logo Upload Placeholder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <div className="text-gray-400 mb-2">
                <Upload className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-sm text-gray-600 mb-1">
                Logo upload coming soon
              </div>
              <div className="text-xs text-gray-500">PNG, JPG up to 2MB</div>
            </div>
          </div>

          {/* Logo Position (for future) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Position
            </label>
            <select
              value={currentLogoPosition}
              onChange={(e) => onUpdate({ logoPosition: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              disabled
            >
              <option value="top-left">Top Left</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Available when logo upload is ready
            </p>
          </div>

          {/* Logo Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Size
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="24"
                max="120"
                value={currentLogoSize}
                onChange={(e) =>
                  onUpdate({ logoSize: parseInt(e.target.value) })
                }
                className="flex-1"
                disabled
              />
              <span className="text-sm text-gray-600 w-12">
                {currentLogoSize}px
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Logo height in pixels</p>
          </div>
        </div>
      </div>

      {/* Shadow Options */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shadows</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Form Shadow
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "None", value: "none", shadow: "none" },
              {
                label: "Small",
                value: "sm",
                shadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              },
              {
                label: "Medium",
                value: "md",
                shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              },
              {
                label: "Large",
                value: "lg",
                shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  if (preset.value === "none") {
                    updateShadows({ sm: "none", md: undefined, lg: undefined });
                  } else {
                    updateShadows({
                      sm: preset.value === "sm" ? preset.shadow : undefined,
                      md: preset.value === "md" ? preset.shadow : undefined,
                      lg: preset.value === "lg" ? preset.shadow : undefined,
                    });
                  }
                }}
                className={`p-3 text-xs rounded border transition-colors ${
                  getCurrentShadowLevel() === preset.value
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div
                  className="w-full h-8 bg-white rounded border mb-1"
                  style={{ boxShadow: preset.shadow }}
                />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Layout Presets */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Layout Presets
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {layoutPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onUpdate(preset.settings)}
              className="flex flex-col items-start p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors text-left"
            >
              <div className="mb-2">
                <div className="flex gap-1">
                  <div
                    className="w-4 h-3 bg-blue-200 rounded"
                    style={{
                      borderRadius: `${preset.settings.borders.radius}px`,
                      boxShadow:
                        preset.settings.shadows.sm === "none"
                          ? "none"
                          : preset.settings.shadows.sm ||
                            preset.settings.shadows.md ||
                            "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    }}
                  />
                  <div
                    className="w-4 h-3 bg-gray-200 rounded"
                    style={{
                      borderRadius: `${preset.settings.borders.radius}px`,
                      marginLeft: `${Math.max(
                        preset.settings.spacing.sm / 4,
                        2
                      )}px`,
                    }}
                  />
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
