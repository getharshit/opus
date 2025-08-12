"use client";

import React from "react";

interface ColorsPanelProps {
  colors: any;
  onUpdate: (updates: any) => void;
}

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

// Color utility functions
const hexToHsl = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToHex = (h: number, s: number, l: number) => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const generateColorHarmony = (primaryColor: string) => {
  // Handle invalid or missing color
  if (!primaryColor || !primaryColor.startsWith("#")) {
    primaryColor = "#3B82F6";
  }

  try {
    const baseHue = hexToHsl(primaryColor).h;

    return [
      { name: "Complementary", hex: hslToHex((baseHue + 180) % 360, 60, 50) },
      { name: "Triadic 1", hex: hslToHex((baseHue + 120) % 360, 60, 50) },
      { name: "Triadic 2", hex: hslToHex((baseHue + 240) % 360, 60, 50) },
      { name: "Analogous 1", hex: hslToHex((baseHue + 30) % 360, 60, 50) },
      {
        name: "Analogous 2",
        hex: hslToHex((baseHue - 30 + 360) % 360, 60, 50),
      },
    ];
  } catch (error) {
    // Fallback colors if conversion fails
    return [
      { name: "Blue", hex: "#3B82F6" },
      { name: "Green", hex: "#10B981" },
      { name: "Purple", hex: "#7C3AED" },
      { name: "Orange", hex: "#F97316" },
      { name: "Pink", hex: "#EC4899" },
    ];
  }
};

const backgroundPatterns = [
  {
    id: "dots",
    name: "Dots",
    css: "radial-gradient(circle, #00000010 1px, transparent 1px)",
  },
  {
    id: "grid",
    name: "Grid",
    css: "linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)",
  },
  {
    id: "diagonal",
    name: "Diagonal",
    css: "repeating-linear-gradient(45deg, transparent, transparent 10px, #00000005 10px, #00000005 20px)",
  },
  {
    id: "waves",
    name: "Waves",
    css: "repeating-linear-gradient(90deg, transparent, transparent 20px, #00000008 20px, #00000008 40px)",
  },
];

export const ColorsPanel: React.FC<ColorsPanelProps> = ({
  colors,
  onUpdate,
}) => {
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
                value={colors.primary || "#3B82F6"}
                onChange={(e) => onUpdate({ primary: e.target.value })}
                className="w-12 h-10 rounded-md border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={colors.primary || "#3B82F6"}
                onChange={(e) => onUpdate({ primary: e.target.value })}
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
                value={colors.secondary || "#6B7280"}
                onChange={(e) => onUpdate({ secondary: e.target.value })}
                className="w-12 h-10 rounded-md border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={colors.secondary || "#6B7280"}
                onChange={(e) => onUpdate({ secondary: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#6B7280"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Used for secondary elements and text
            </p>
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.background || "#FFFFFF"}
                onChange={(e) => onUpdate({ background: e.target.value })}
                className="w-12 h-10 rounded-md border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={colors.background || "#FFFFFF"}
                onChange={(e) => onUpdate({ background: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#FFFFFF"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Form background color</p>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.text || "#1F2937"}
                onChange={(e) => onUpdate({ text: e.target.value })}
                className="w-12 h-10 rounded-md border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={colors.text || "#1F2937"}
                onChange={(e) => onUpdate({ text: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#1F2937"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Primary text color</p>
          </div>
        </div>
      </div>
      {/* Additional Colors */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Status Colors
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {/* Error Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Error
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.error || "#EF4444"}
                onChange={(e) => onUpdate({ error: e.target.value })}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={colors.error || "#EF4444"}
                onChange={(e) => onUpdate({ error: e.target.value })}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                placeholder="#EF4444"
              />
            </div>
          </div>

          {/* Success Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Success
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.success || "#10B981"}
                onChange={(e) => onUpdate({ success: e.target.value })}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={colors.success || "#10B981"}
                onChange={(e) => onUpdate({ success: e.target.value })}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                placeholder="#10B981"
              />
            </div>
          </div>

          {/* Border Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.border || "#D1D5DB"}
                onChange={(e) => onUpdate({ border: e.target.value })}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={colors.border || "#D1D5DB"}
                onChange={(e) => onUpdate({ border: e.target.value })}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                placeholder="#D1D5DB"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Color Harmony for Secondary */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Color Harmony
        </h4>
        <p className="text-xs text-gray-500 mb-3">
          Suggested secondary colors that work well with your primary color
        </p>
        <div className="grid grid-cols-5 gap-2">
          {generateColorHarmony(colors.primary || "#3B82F6").map(
            (color, index) => (
              <button
                key={index}
                onClick={() => onUpdate({ secondary: color.hex })}
                className={`
          w-12 h-12 rounded-lg border-2 transition-all
          ${
            colors.secondary === color.hex
              ? "border-gray-800 scale-110"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
                style={{ backgroundColor: color.hex }}
                title={`${color.name} - ${color.hex}`}
              />
            )
          )}
        </div>
      </div>
      {/* Background Options */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Background</h4>

        {/* Solid Colors */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Type
          </label>
          <div className="flex gap-2 mb-3">
            {["solid", "gradient", "pattern"].map((type) => (
              <button
                key={type}
                onClick={() => onUpdate({ backgroundType: type })}
                className={`
            px-3 py-1 text-xs rounded border transition-colors capitalize
            ${
              (colors.backgroundType || "solid") === type
                ? "bg-blue-100 border-blue-300 text-blue-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }
          `}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Background Patterns (if pattern is selected) */}
        {(colors.backgroundType || "solid") === "pattern" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pattern
            </label>
            <div className="grid grid-cols-4 gap-2">
              {backgroundPatterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => onUpdate({ backgroundPattern: pattern.id })}
                  className={`
              h-12 rounded border-2 transition-all
              ${
                colors.backgroundPattern === pattern.id
                  ? "border-blue-500"
                  : "border-gray-300 hover:border-gray-400"
              }
            `}
                  style={{
                    background: pattern.css,
                    backgroundSize: "20px 20px",
                  }}
                  title={pattern.name}
                />
              ))}
            </div>
          </div>
        )}
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
                  primary: preset.primary,
                  secondary: preset.secondary,
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
