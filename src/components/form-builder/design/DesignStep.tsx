"use client";

import React, { useState, useCallback } from "react";
import { Form } from "@/types/form";
import { Palette, Type, Layout, Eye, Zap } from "lucide-react";
import { ColorsPanel } from "./ColorsPanel";
import { TypographyPanel } from "./TypographyPanel";
import { LayoutPanel } from "./LayoutPanel";
import { AnimationPanel } from "./AnimationPanel";
// REPLACE THIS IMPORT
import { PublicFormRenderer } from "../../public-form/components/PublicFormRenderer";

interface DesignStepProps {
  form: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

type DesignTab = "colors" | "typography" | "layout" | "animations";

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
    id: "animations",
    label: "Animations",
    icon: Zap,
    description: "Control form animations and interactions",
  },
];

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const DesignStep: React.FC<DesignStepProps> = ({ form, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<DesignTab>("colors");

  // Local state for immediate UI updates (before saving to DB)
  const [localColors, setLocalColors] = useState(() => {
    return (
      form.customization?.colors || {
        primary: "#3B82F6",
        secondary: "#6B7280",
        background: "#FFFFFF",
        text: "#1F2937",
        border: "#D1D5DB",
        error: "#EF4444",
        success: "#10B981",
        backgroundType: "solid" as const,
        backgroundValue: "#FFFFFF",
        backgroundPattern: "none",
        backgroundGradientDirection: "135deg",
        backgroundGradientColor1: "#3B82F6",
        backgroundGradientColor2: "#6B7280",
        backgroundPatternColor: "rgba(0, 0, 0, 0.05)",
        backgroundPatternSize: "20px",
      }
    );
  });

  // Local state for typography
  const [localTypography, setLocalTypography] = useState(() => {
    return (
      form.customization?.typography || {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: {
          title: 24,
          question: 16,
          input: 16,
          small: 14,
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          bold: 700,
        },
      }
    );
  });

  // Local state for layout
  const [localLayout, setLocalLayout] = useState(() => {
    return {
      spacing: form.customization?.spacing || {
        xs: 6,
        sm: 12,
        md: 16,
        lg: 24,
        xl: 32,
      },
      borders: form.customization?.borders || { radius: 8, width: 1 },
      shadows: form.customization?.shadows || {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      maxWidth: form.customization?.maxWidth || 600,
      alignment: form.customization?.alignment || "center",
      buttonStyle: form.customization?.buttonStyle || "filled",
      buttonSize: form.customization?.buttonSize || "md",
    };
  });

  const [localAnimations, setLocalAnimations] = useState(() => {
    const animations = form.customization?.animations;
    return {
      intensity: (animations?.intensity || "moderate") as
        | "none"
        | "subtle"
        | "moderate"
        | "playful",
      enableAnimations: animations?.enableAnimations ?? true,
      respectReducedMotion: animations?.respectReducedMotion ?? true,
    };
  });

  // Debounced update functions
  const debouncedUpdateColors = useCallback(
    debounce((colors: any) => {
      onUpdate({
        customization: {
          ...form.customization,
          colors: colors,
        },
      });
    }, 500),
    [form.customization, onUpdate]
  );

  const debouncedUpdateTypography = useCallback(
    debounce((typography: any) => {
      onUpdate({
        customization: {
          ...form.customization,
          typography: typography,
        },
      });
    }, 500),
    [form.customization, onUpdate]
  );

  const debouncedUpdateLayout = useCallback(
    debounce((layout: any) => {
      onUpdate({
        customization: {
          ...form.customization,
          spacing: layout.spacing,
          borders: layout.borders,
          shadows: layout.shadows,
          maxWidth: layout.maxWidth,
          alignment: layout.alignment,
          buttonStyle: layout.buttonStyle,
          buttonSize: layout.buttonSize,
        },
      });
    }, 500),
    [form.customization, onUpdate]
  );

  const debouncedUpdateAnimations = useCallback(
    debounce((animations: any) => {
      onUpdate({
        customization: {
          ...form.customization,
          animations: animations,
        },
      });
    }, 500),
    [form.customization, onUpdate]
  );

  // Update functions
  const updateColors = useCallback(
    (colorUpdates: any) => {
      const newColors = { ...localColors, ...colorUpdates };
      setLocalColors(newColors);
      debouncedUpdateColors(newColors);
    },
    [localColors, debouncedUpdateColors]
  );

  const updateTypography = useCallback(
    (typographyUpdates: any) => {
      const newTypography = { ...localTypography, ...typographyUpdates };
      setLocalTypography(newTypography);
      debouncedUpdateTypography(newTypography);
    },
    [localTypography, debouncedUpdateTypography]
  );

  const updateLayout = useCallback(
    (layoutUpdates: any) => {
      const newLayout = { ...localLayout, ...layoutUpdates };
      setLocalLayout(newLayout);
      debouncedUpdateLayout(newLayout);
    },
    [localLayout, debouncedUpdateLayout]
  );

  const updateAnimations = useCallback(
    (animationUpdates: any) => {
      const newAnimations = {
        ...localAnimations,
        ...animationUpdates,
      };
      console.log("Updating animations:", {
        current: localAnimations,
        updates: animationUpdates,
        new: newAnimations,
      });
      setLocalAnimations(newAnimations);
      debouncedUpdateAnimations(newAnimations);
    },
    [localAnimations, debouncedUpdateAnimations]
  );

  // Create customization object for panels
  const customizationWithLocalState = {
    ...form.customization,
    colors: localColors,
    typography: localTypography,
    spacing: localLayout.spacing,
    borders: localLayout.borders,
    shadows: localLayout.shadows,
    maxWidth: localLayout.maxWidth,
    alignment: localLayout.alignment,
    buttonStyle: localLayout.buttonStyle,
    buttonSize: localLayout.buttonSize,
    animations: localAnimations,
  };

  // CREATE FORM WITH LOCAL CUSTOMIZATION FOR PREVIEW
  const formWithLocalCustomization = {
    ...form,
    customization: customizationWithLocalState,
  };

  const resetToDefaults = () => {
    const defaults = {
      colors: {
        primary: "#3B82F6",
        secondary: "#6B7280",
        background: "#FFFFFF",
        text: "#1F2937",
        border: "#D1D5DB",
        error: "#EF4444",
        success: "#10B981",
        backgroundType: "solid" as const,
        backgroundValue: "#FFFFFF",
        backgroundPattern: "none",
        backgroundGradientDirection: "135deg",
        backgroundGradientColor1: "#3B82F6",
        backgroundGradientColor2: "#6B7280",
        backgroundPatternColor: "rgba(0, 0, 0, 0.05)",
        backgroundPatternSize: "20px",
      },
      typography: {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: { title: 24, question: 16, input: 16, small: 14 },
        fontWeight: { normal: 400, medium: 500, bold: 700 },
      },
      layout: {
        spacing: { xs: 6, sm: 12, md: 16, lg: 24, xl: 32 },
        borders: { radius: 8, width: 1 },
        shadows: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
        maxWidth: 600,
        alignment: "center" as const,
        buttonStyle: "filled" as const,
        buttonSize: "md" as const,
      },
      animations: {
        intensity: "moderate" as const,
        enableAnimations: true,
        respectReducedMotion: true,
      },
    };

    setLocalColors(defaults.colors);
    setLocalTypography(defaults.typography);
    setLocalLayout(defaults.layout);
    setLocalAnimations(defaults.animations);

    // Immediately save to database
    onUpdate({
      customization: {
        colors: defaults.colors,
        typography: defaults.typography,
        spacing: defaults.layout.spacing,
        borders: defaults.layout.borders,
        shadows: defaults.layout.shadows,
        maxWidth: defaults.layout.maxWidth,
        alignment: defaults.layout.alignment,
        buttonStyle: defaults.layout.buttonStyle,
        buttonSize: defaults.layout.buttonSize,
        animations: defaults.animations,
      },
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "colors":
        return <ColorsPanel colors={localColors} onUpdate={updateColors} />;
      case "typography":
        return (
          <TypographyPanel
            typography={localTypography}
            onUpdate={updateTypography}
          />
        );
      case "layout":
        return (
          <LayoutPanel
            customization={customizationWithLocalState}
            onUpdate={updateLayout}
          />
        );
      case "animations":
        return (
          <AnimationPanel
            customization={customizationWithLocalState}
            onUpdate={updateAnimations}
          />
        );

      default:
        return <ColorsPanel colors={localColors} onUpdate={updateColors} />;
    }
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                🎨 Design Customization
              </h2>
              <p className="text-gray-600">
                Customize your form's appearance, colors, typography, and
                animations
              </p>
            </div>

            <button
              onClick={resetToDefaults}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
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

          {/* UPDATED LIVE PREVIEW - Now uses actual PublicFormRenderer */}
          <div className="col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200 px-4 py-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Live Preview
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    See your changes in real-time (actual form preview)
                  </p>
                </div>

                <div className="p-4 max-h-[60vh] overflow-y-auto">
                  {/* Scale down the preview to fit in sidebar */}
                  <div className="transform scale-75 origin-top-left w-[133%]">
                    <PublicFormRenderer
                      form={formWithLocalCustomization}
                      onSubmit={async () => {
                        // Prevent actual submission in preview
                        console.log("Preview form submission (disabled)");
                      }}
                      readonly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
