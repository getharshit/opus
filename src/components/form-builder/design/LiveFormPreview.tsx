"use client";

import React from "react";
import { Form } from "@/types/form";

interface LiveFormPreviewProps {
  form: Form;
  localColors: any;
  localTypography: any;
  localLayout?: any;
  localAnimations?: any; // Add this prop
}

export const LiveFormPreview: React.FC<LiveFormPreviewProps> = ({
  form,
  localColors,
  localTypography,
  localLayout,
  localAnimations, // Add this parameter
}) => {
  const getShadowStyle = (level: string) => {
    switch (level) {
      case "none":
        return "none";
      case "sm":
        return "0 1px 2px 0 rgb(0 0 0 / 0.05)";
      case "md":
        return "0 4px 6px -1px rgb(0 0 0 / 0.1)";
      case "lg":
        return "0 10px 15px -3px rgb(0 0 0 / 0.1)";
      default:
        return "0 1px 2px 0 rgb(0 0 0 / 0.05)";
    }
  };

  // Get animation style based on settings
  const getAnimationStyle = () => {
    if (
      !localAnimations?.enableAnimations ||
      localAnimations?.intensity === "none"
    ) {
      return { transition: "none" };
    }

    const durations = {
      subtle: "150ms",
      moderate: "300ms",
      playful: "500ms",
    } as const;

    const intensity = (localAnimations?.intensity ||
      "moderate") as keyof typeof durations;

    const easing =
      intensity === "playful"
        ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        : "ease-in-out";

    return {
      transition: `all ${durations[intensity]} ${easing}`,
    };
  };

  return (
    <div
      className="border rounded-lg min-h-96"
      style={{
        backgroundColor: localColors.background,
        fontFamily: localTypography.fontFamily,
        padding: `${localLayout?.spacing?.md || 16}px`,
        borderRadius: `${localLayout?.borders?.radius || 8}px`,
        boxShadow: getShadowStyle(localLayout?.shadows?.level || "sm"),
        maxWidth: `${localLayout?.maxWidth || 600}px`,
        margin:
          localLayout?.alignment === "center"
            ? "0 auto"
            : localLayout?.alignment === "right"
            ? "0 0 0 auto"
            : "0",
        ...getAnimationStyle(),
      }}
    >
      {/* Form Title */}
      <div style={{ marginBottom: `${localLayout?.spacing?.lg || 24}px` }}>
        <h3
          style={{
            color: localColors.text,
            fontSize: `${localTypography.fontSize?.title || 24}px`,
            fontWeight: localTypography.fontWeight?.bold || 700,
            fontFamily: localTypography.fontFamily,
            marginBottom: `${localLayout?.spacing?.sm || 12}px`,
            ...getAnimationStyle(),
          }}
        >
          {form.title || "Sample Form Title"}
        </h3>
        <p
          style={{
            color: localColors.secondary,
            fontSize: `${localTypography.fontSize?.small || 14}px`,
            fontFamily: localTypography.fontFamily,
          }}
        >
          This is how your form will look with the current styling
        </p>
      </div>

      {/* Sample Question */}
      <div style={{ marginBottom: `${localLayout?.spacing?.lg || 24}px` }}>
        <label
          className="block"
          style={{
            color: localColors.text,
            fontSize: `${localTypography.fontSize?.question || 16}px`,
            fontWeight: localTypography.fontWeight?.medium || 500,
            fontFamily: localTypography.fontFamily,
            marginBottom: `${localLayout?.spacing?.sm || 12}px`,
          }}
        >
          Sample Question
        </label>
        <input
          type="text"
          placeholder="Sample input field..."
          className="w-full"
          style={{
            borderColor: localColors.border,
            backgroundColor: "#FFFFFF",
            color: localColors.text,
            fontSize: `${localTypography.fontSize?.input || 16}px`,
            fontFamily: localTypography.fontFamily,
            border: `${localLayout?.borders?.width || 1}px solid ${
              localColors.border
            }`,
            borderRadius: `${localLayout?.borders?.radius || 8}px`,
            padding: `${localLayout?.spacing?.sm || 12}px`,
            ...getAnimationStyle(),
          }}
          readOnly
        />
        <p
          style={{
            color: localColors.secondary,
            fontSize: `${localTypography.fontSize?.small || 14}px`,
            fontFamily: localTypography.fontFamily,
            marginTop: `${localLayout?.spacing?.xs || 6}px`,
          }}
        >
          This is help text that appears below the field
        </p>
      </div>

      {/* Sample Button */}
      <div style={{ marginBottom: `${localLayout?.spacing?.lg || 24}px` }}>
        <button
          className="text-white font-medium"
          style={{
            backgroundColor:
              localLayout?.buttonStyle === "outlined"
                ? "transparent"
                : localColors.primary,
            color:
              localLayout?.buttonStyle === "outlined"
                ? localColors.primary
                : "white",
            border:
              localLayout?.buttonStyle === "outlined"
                ? `1px solid ${localColors.primary}`
                : "none",
            fontSize: `${localTypography.fontSize?.input || 16}px`,
            fontFamily: localTypography.fontFamily,
            fontWeight: localTypography.fontWeight?.medium || 500,
            padding:
              localLayout?.buttonSize === "sm"
                ? "8px 12px"
                : localLayout?.buttonSize === "lg"
                ? "16px 24px"
                : `${localLayout?.spacing?.sm || 12}px ${
                    localLayout?.spacing?.md || 16
                  }px`,
            borderRadius: `${
              localLayout?.borders?.buttonRadius ||
              localLayout?.borders?.radius ||
              8
            }px`,
            ...getAnimationStyle(),
          }}
        >
          Sample Button
        </button>
      </div>

      {/* Sample Multiple Choice */}
      <div style={{ marginBottom: `${localLayout?.spacing?.lg || 24}px` }}>
        <label
          className="block"
          style={{
            color: localColors.text,
            fontSize: `${localTypography.fontSize?.question || 16}px`,
            fontWeight: localTypography.fontWeight?.medium || 500,
            fontFamily: localTypography.fontFamily,
            marginBottom: `${localLayout?.spacing?.sm || 12}px`,
          }}
        >
          Sample Multiple Choice
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${localLayout?.spacing?.xs || 6}px`,
          }}
        >
          {["Option 1", "Option 2", "Option 3"].map((option, index) => (
            <label
              key={index}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="radio"
                name="sample"
                style={{
                  accentColor: localColors.primary,
                  marginRight: `${localLayout?.spacing?.xs || 6}px`,
                }}
              />
              <span
                style={{
                  color: localColors.text,
                  fontSize: `${localTypography.fontSize?.input || 16}px`,
                  fontFamily: localTypography.fontFamily,
                }}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sample Error Message */}
      <div style={{ marginBottom: `${localLayout?.spacing?.md || 16}px` }}>
        <div
          style={{
            backgroundColor: `${localColors.error}20`,
            color: localColors.error,
            border: `1px solid ${localColors.error}40`,
            fontSize: `${localTypography.fontSize?.small || 14}px`,
            fontFamily: localTypography.fontFamily,
            padding: `${localLayout?.spacing?.xs || 6}px ${
              localLayout?.spacing?.sm || 12
            }px`,
            borderRadius: `${localLayout?.borders?.radius || 8}px`,
            ...getAnimationStyle(),
          }}
        >
          Sample error message
        </div>
      </div>

      {/* Sample Success Message */}
      <div>
        <div
          style={{
            backgroundColor: `${localColors.success}20`,
            color: localColors.success,
            border: `1px solid ${localColors.success}40`,
            fontSize: `${localTypography.fontSize?.small || 14}px`,
            fontFamily: localTypography.fontFamily,
            padding: `${localLayout?.spacing?.xs || 6}px ${
              localLayout?.spacing?.sm || 12
            }px`,
            borderRadius: `${localLayout?.borders?.radius || 8}px`,
            ...getAnimationStyle(),
          }}
        >
          Sample success message
        </div>
      </div>
    </div>
  );
};
