"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useReducedMotion, Variants } from "framer-motion";
import {
  AnimationConfig,
  AnimationContextValue,
  AnimationIntensity,
  AnimationPreset,
  IntensitySettings,
  AnimationVariants,
} from "./types";
import {
  createAnimationVariants,
  createAnimationTransitions,
  getVariantsByPreset,
  createTransition,
  adjustAnimationIntensity,
  intensityConfigurations,
  createButtonVariants,
  createShakeVariants,
  optimizeVariantsForPerformance,
} from "./presets";

// Create default animation configuration with intensity system
const createDefaultAnimationConfig = (): AnimationConfig => ({
  enabled: true,
  respectReducedMotion: true,
  intensity: "moderate",

  // Intensity configurations
  intensitySettings: intensityConfigurations,

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
    preset: "shake",
    timing: { duration: 0.5, delay: 0, stagger: 0 },
    shake: {
      intensity: 10,
      duration: 0.5,
    },
  },

  success: {
    preset: "bounce",
    timing: { duration: 0.6, delay: 0, stagger: 0 },
    bounce: {
      stiffness: 400,
      damping: 10,
    },
  },

  // Performance settings
  performance: {
    enableGPU: true,
    enableWillChange: true,
    cleanupOnUnmount: true,
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

  // Track previous intensity for cleanup
  const previousIntensity = useRef<AnimationIntensity>(config.intensity);

  // Determine if animations should be disabled
  const isReducedMotion = Boolean(
    config.respectReducedMotion && prefersReducedMotion
  );
  const effectiveIntensity: AnimationIntensity = isReducedMotion
    ? "none"
    : config.intensity;
  const animationsEnabled = config.enabled && !isReducedMotion;

  // Create variants and transitions with proper typing
  const variants = useMemo(() => {
    const baseVariants = createAnimationVariants();
    return baseVariants;
  }, []);

  const transitions = useMemo(() => createAnimationTransitions(), []);

  // Get current intensity settings
  const getCurrentIntensitySettings = useCallback((): IntensitySettings => {
    return config.intensitySettings[effectiveIntensity];
  }, [config.intensitySettings, effectiveIntensity]);

  // Update configuration with immediate application
  const updateConfig = useCallback((updates: Partial<AnimationConfig>) => {
    setConfig((prev) => {
      const newConfig = { ...prev, ...updates };

      // If intensity changed, update the ref
      if (updates.intensity && updates.intensity !== prev.intensity) {
        previousIntensity.current = prev.intensity;
      }

      return newConfig;
    });
  }, []);

  // Update intensity with immediate effect
  const updateIntensity = useCallback(
    (intensity: AnimationIntensity) => {
      updateConfig({ intensity });
    },
    [updateConfig]
  );

  // Apply reduced motion preference changes
  useEffect(() => {
    if (isReducedMotion && config.intensity !== "none") {
      console.log("Reduced motion detected, animations disabled");
    }
  }, [isReducedMotion, config.intensity]);

  // Get field variants with intensity adjustment - returns Framer Motion Variants
  const getFieldVariants = useCallback(
    (preset: AnimationPreset): Variants => {
      if (!animationsEnabled || effectiveIntensity === "none") {
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
          exit: { opacity: 1 },
        };
      }

      return getVariantsByPreset(preset, variants, effectiveIntensity);
    },
    [animationsEnabled, effectiveIntensity, variants]
  );

  // Get transition with intensity
  const getTransition = useCallback(
    (timing: any, easing: any) => {
      if (!animationsEnabled || effectiveIntensity === "none") {
        return { duration: 0 };
      }

      return createTransition(timing, easing, effectiveIntensity);
    },
    [animationsEnabled, effectiveIntensity]
  );

  // Cleanup effect with proper ref handling
  useEffect(() => {
    // Store current cleanup setting in effect scope
    const shouldCleanup = config.performance.cleanupOnUnmount;

    return () => {
      if (shouldCleanup) {
        // Reset willChange on all animated elements
        const animatedElements = document.querySelectorAll(
          '[data-animated="true"]'
        );
        animatedElements.forEach((el) => {
          const element = el as HTMLElement;
          element.style.willChange = "auto";
          element.removeAttribute("data-animated");
        });
      }
    };
  }, [config.performance.cleanupOnUnmount]);

  // Context value with memoization for performance
  const contextValue: AnimationContextValue = useMemo(
    () => ({
      config,
      variants,
      transitions,
      updateConfig,
      updateIntensity,
      isReducedMotion,
      getFieldVariants,
      getTransition,
      getIntensitySettings: getCurrentIntensitySettings,
    }),
    [
      config,
      variants,
      transitions,
      updateConfig,
      updateIntensity,
      isReducedMotion,
      getFieldVariants,
      getTransition,
      getCurrentIntensitySettings,
    ]
  );

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

// Hook for accessing animation settings from form customization
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

// Hook for intensity-specific button animations
export const useButtonAnimation = (): Variants => {
  const { config, isReducedMotion } = useAnimation();
  const effectiveIntensity = isReducedMotion ? "none" : config.intensity;

  return useMemo(() => {
    return createButtonVariants(effectiveIntensity);
  }, [effectiveIntensity]);
};

// Hook for error animations with intensity
export const useErrorAnimation = (): Variants => {
  const { config, isReducedMotion } = useAnimation();
  const effectiveIntensity = isReducedMotion ? "none" : config.intensity;

  return useMemo(() => {
    return createShakeVariants(effectiveIntensity);
  }, [effectiveIntensity]);
};

// Hook for form-specific animations
export const useFormAnimations = () => {
  const { getFieldVariants, getTransition, config } = useAnimation();

  return useMemo(
    () => ({
      // Field entrance animation
      fieldEntrance: getFieldVariants(config.fieldEntrance.preset),
      // Field exit animation
      fieldExit: getFieldVariants(config.fieldExit.preset),
      // Success animation
      success: getFieldVariants(config.success.preset),
      // Error animation
      error: getFieldVariants(config.error.preset),
      // Get transition for timing
      getFieldTransition: (preset: AnimationPreset) =>
        getTransition(config.fieldEntrance.timing, config.fieldEntrance.easing),
    }),
    [getFieldVariants, getTransition, config]
  );
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
  };
};

// Map string intensity to type
const mapIntensity = (intensity?: string): AnimationIntensity => {
  switch (intensity) {
    case "none":
      return "none";
    case "subtle":
      return "subtle";
    case "moderate":
      return "moderate";
    case "playful":
      return "playful";
    default:
      return "moderate";
  }
};

// Animation performance utilities
export const useAnimationPerformance = () => {
  const { config } = useAnimation();

  return useMemo(
    () => ({
      // Enable GPU acceleration for an element
      enableGPU: (element: HTMLElement) => {
        if (config.performance.enableGPU) {
          element.style.transform = "translate3d(0, 0, 0)";
          element.setAttribute("data-animated", "true");
        }
      },

      // Clean up animations for an element
      cleanup: (element: HTMLElement) => {
        if (config.performance.cleanupOnUnmount) {
          element.style.willChange = "auto";
          element.style.transform = "";
          element.removeAttribute("data-animated");
        }
      },

      // Check if animations should be enabled
      shouldAnimate: config.enabled && config.intensity !== "none",
    }),
    [config]
  );
};
