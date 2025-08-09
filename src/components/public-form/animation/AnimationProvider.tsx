"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useReducedMotion } from "framer-motion";
import {
  AnimationConfig,
  AnimationContextValue,
  AnimationIntensity,
  AnimationPreset,
} from "./types";
import {
  createAnimationVariants,
  createAnimationTransitions,
  getVariantsByPreset,
  createTransition,
  adjustAnimationIntensity,
} from "./presets";

// Default animation configuration
const createDefaultAnimationConfig = (): AnimationConfig => ({
  enabled: true,
  respectReducedMotion: true,
  intensity: "normal",

  fieldEntrance: {
    preset: "slideUp",
    timing: { duration: 0.3, delay: 0, stagger: 0.1 },
    easing: { type: "easeOut" },
  },

  fieldExit: {
    preset: "fade",
    timing: { duration: 0.2, delay: 0, stagger: 0 },
    easing: { type: "easeIn" },
  },

  stepTransition: {
    preset: "slideLeft",
    timing: { duration: 0.4, delay: 0, stagger: 0 },
    easing: { type: "easeInOut" },
    direction: "auto",
  },

  button: {
    hover: {
      scale: 1.02,
      duration: 0.2,
      easing: { type: "easeOut" },
    },
    tap: {
      scale: 0.98,
      duration: 0.1,
    },
    disabled: {
      opacity: 0.5,
      duration: 0.2,
    },
  },

  error: {
    preset: "shake", // This should now work with updated AnimationPreset type
    timing: { duration: 0.5, delay: 0, stagger: 0 },
    shake: {
      intensity: 10,
      duration: 0.5,
    },
  },

  success: {
    preset: "bounce",
    timing: { duration: 0.6, delay: 0, stagger: 0 },
    confetti: true,
  },

  progress: {
    bar: {
      duration: 0.3,
      easing: { type: "easeOut" },
    },
    steps: {
      duration: 0.2,
      stagger: 0.1,
    },
  },
});

const AnimationContext = createContext<AnimationContextValue | null>(null);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};

interface AnimationProviderProps {
  initialConfig?: Partial<AnimationConfig>;
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  initialConfig = {},
  children,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [config, setConfig] = useState<AnimationConfig>(() => ({
    ...createDefaultAnimationConfig(),
    ...initialConfig,
  }));

  // Determine if animations should be disabled - Fixed type handling
  const isReducedMotion =
    config.respectReducedMotion && (prefersReducedMotion ?? false);
  const animationsEnabled = config.enabled && !isReducedMotion;

  // Create variants and transitions
  const variants = useMemo(() => createAnimationVariants(), []);
  const transitions = useMemo(() => createAnimationTransitions(), []);

  // Adjust config based on reduced motion preference
  useEffect(() => {
    if (isReducedMotion) {
      setConfig((prev) => ({
        ...prev,
        intensity: "none",
        fieldEntrance: {
          ...prev.fieldEntrance,
          preset: "fade",
          timing: { ...prev.fieldEntrance.timing, duration: 0.1 },
        },
        fieldExit: {
          ...prev.fieldExit,
          timing: { ...prev.fieldExit.timing, duration: 0.1 },
        },
        stepTransition: {
          ...prev.stepTransition,
          preset: "fade",
          timing: { ...prev.stepTransition.timing, duration: 0.1 },
        },
      }));
    }
  }, [isReducedMotion]);

  const updateConfig = (updates: Partial<AnimationConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const getFieldVariants = (preset: AnimationPreset) => {
    if (!animationsEnabled) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
        exit: { opacity: 1 },
      };
    }

    const baseVariants = getVariantsByPreset(preset, variants);
    return adjustAnimationIntensity(baseVariants, config.intensity);
  };

  const getTransition = (timing: any, easing: any) => {
    if (!animationsEnabled) {
      return { duration: 0 };
    }

    return createTransition(timing, easing);
  };

  const contextValue: AnimationContextValue = {
    config,
    variants,
    transitions,
    updateConfig,
    isReducedMotion, // Now properly typed as boolean
    getFieldVariants,
    getTransition,
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

// Hook for accessing animation settings from customization
export const useAnimationFromCustomization = (customization?: any) => {
  const animation = useAnimation();

  useEffect(() => {
    if (customization?.animations) {
      const animationConfig = convertCustomizationToAnimationConfig(
        customization.animations
      );
      animation.updateConfig(animationConfig);
    }
  }, [customization, animation]);

  return animation;
};

// Convert form customization to animation config
const convertCustomizationToAnimationConfig = (
  animationCustomization: any
): Partial<AnimationConfig> => {
  return {
    enabled: animationCustomization.enableAnimations ?? true,
    intensity: mapIntensity(animationCustomization.intensity),
    fieldEntrance: {
      preset: animationCustomization.questionEntrance?.type || "slideUp",
      timing: {
        duration:
          (animationCustomization.questionEntrance?.duration || 300) / 1000,
        delay: (animationCustomization.questionEntrance?.delay || 0) / 1000,
        stagger: 0.1,
      },
      easing: { type: "easeOut" },
    },
    button: {
      hover: {
        scale: animationCustomization.buttonHover?.scale || 1.02,
        duration: (animationCustomization.buttonHover?.duration || 200) / 1000,
        easing: { type: "easeOut" },
      },
      tap: {
        scale: 0.98,
        duration: 0.1,
      },
      disabled: {
        opacity: 0.5,
        duration: 0.2,
      },
    },
    progress: {
      bar: {
        duration: (animationCustomization.transitions?.duration || 300) / 1000,
        easing: { type: "easeOut" },
      },
      steps: {
        duration: 0.2,
        stagger: 0.1,
      },
    },
  };
};

const mapIntensity = (intensity?: string): AnimationIntensity => {
  switch (intensity) {
    case "none":
      return "none";
    case "subtle":
      return "subtle";
    case "normal":
      return "normal";
    case "dynamic":
      return "dynamic";
    default:
      return "normal";
  }
};
