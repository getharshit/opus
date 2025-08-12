"use client";

import React from "react";
import { Zap, ZapOff, Play } from "lucide-react";

interface AnimationPanelProps {
  customization: any;
  onUpdate: (updates: any) => void;
}

type AnimationIntensity = "none" | "subtle" | "moderate" | "playful";

const animationIntensities: Array<{
  id: AnimationIntensity;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  example: string;
}> = [
  {
    id: "none",
    name: "None",
    description: "No animations, accessibility-first",
    icon: ZapOff,
    duration: "0ms",
    example: "Instant transitions",
  },
  {
    id: "subtle",
    name: "Subtle",
    description: "Gentle, professional animations",
    icon: Zap,
    duration: "150ms",
    example: "Smooth fades",
  },
  {
    id: "moderate",
    name: "Moderate",
    description: "Balanced, engaging animations",
    icon: Play,
    duration: "300ms",
    example: "Smooth slides and scales",
  },
  {
    id: "playful",
    name: "Playful",
    description: "Dynamic, bouncy animations",
    icon: Zap,
    duration: "500ms",
    example: "Spring effects and bounces",
  },
];

export const AnimationPanel: React.FC<AnimationPanelProps> = ({
  customization,
  onUpdate,
}) => {
  const currentAnimations = customization.animations || {
    intensity: "moderate",
    enableAnimations: true,
    respectReducedMotion: true,
  };

  const updateAnimations = (animationUpdates: any) => {
    console.log("AnimationPanel updateAnimations called:", {
      current: currentAnimations,
      updates: animationUpdates,
    });
    onUpdate(animationUpdates); // This should call the updateAnimations from DesignStep
  };

  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const effectiveIntensity =
    prefersReducedMotion && currentAnimations.respectReducedMotion
      ? "none"
      : currentAnimations.intensity;

  console.log("AnimationPanel render:", {
    currentAnimations,
    effectiveIntensity,
  });

  return (
    <div className="space-y-6">
      {/* Animation Intensity */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Animation Intensity
        </h3>

        {prefersReducedMotion && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <ZapOff className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                Reduced motion detected - animations will be disabled for
                accessibility
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {animationIntensities.map((intensity) => {
            const Icon = intensity.icon;
            const isActive = currentAnimations.intensity === intensity.id;
            const isEffective = effectiveIntensity === intensity.id;

            return (
              <button
                key={intensity.id}
                onClick={() => {
                  console.log("Animation intensity clicked:", intensity.id);
                  updateAnimations({ intensity: intensity.id });
                }}
                className={`
                    flex items-start gap-4 p-4 rounded-lg border transition-all text-left
                    ${
                      isActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }
                    ${isEffective ? "ring-2 ring-blue-200" : ""}
                  `}
              >
                <div
                  className={`
                    flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {intensity.name}
                    </h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {intensity.duration}
                    </span>
                    {isEffective && (
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {intensity.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Example: {intensity.example}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rest of the component remains the same */}

      {/* Animation Settings */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Animation Settings
        </h4>

        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={currentAnimations.enableAnimations}
              onChange={(e) =>
                updateAnimations({ enableAnimations: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">
                Enable animations
              </div>
              <div className="text-xs text-gray-500">
                Turn off to disable all form animations
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={currentAnimations.respectReducedMotion}
              onChange={(e) =>
                updateAnimations({ respectReducedMotion: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">
                Respect reduced motion
              </div>
              <div className="text-xs text-gray-500">
                Disable animations for users who prefer reduced motion
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Animation Preview */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Animation Preview
        </h4>

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <AnimationPreview
            intensity={effectiveIntensity}
            enabled={currentAnimations.enableAnimations}
          />
        </div>
      </div>
    </div>
  );
};

// Animation Preview Component
const AnimationPreview: React.FC<{
  intensity: AnimationIntensity;
  enabled: boolean;
}> = ({ intensity, enabled }) => {
  const [triggerAnimation, setTriggerAnimation] = React.useState(0);

  const getAnimationStyle = (type: "button" | "field" | "message") => {
    if (!enabled || intensity === "none") {
      return { transition: "none" };
    }

    const durations = {
      subtle: "150ms",
      moderate: "300ms",
      playful: "500ms",
    };

    const easings = {
      subtle: "ease-out",
      moderate: "ease-in-out",
      playful: "cubic-bezier(0.68, -0.55, 0.265, 1.55)", // Bouncy
    };

    return {
      transition: `all ${durations[intensity]} ${easings[intensity]}`,
      transform: triggerAnimation % 2 === 1 ? "scale(1.05)" : "scale(1)",
    };
  };

  React.useEffect(() => {
    if (enabled && intensity !== "none") {
      const interval = setInterval(() => {
        setTriggerAnimation((prev) => prev + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [enabled, intensity]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h5 className="text-sm font-medium text-gray-900 mb-2">
          Preview: {intensity} intensity
        </h5>
        {!enabled && (
          <p className="text-xs text-gray-500 mb-4">Animations disabled</p>
        )}
      </div>

      <div className="space-y-3">
        {/* Button Preview */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Button Animation
          </label>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
            style={getAnimationStyle("button")}
            onMouseEnter={() =>
              enabled && setTriggerAnimation((prev) => prev + 1)
            }
          >
            Sample Button
          </button>
        </div>

        {/* Field Preview */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Field Animation
          </label>
          <div
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
            style={getAnimationStyle("field")}
          >
            Sample input field
          </div>
        </div>

        {/* Message Preview */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Message Animation
          </label>
          <div
            className="px-3 py-2 bg-green-50 border border-green-200 rounded-md text-sm text-green-800"
            style={getAnimationStyle("message")}
          >
            Sample success message
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={() => setTriggerAnimation((prev) => prev + 1)}
          className="text-xs text-blue-600 hover:text-blue-700"
          disabled={!enabled}
        >
          Trigger animation preview
        </button>
      </div>
    </div>
  );
};
