import { Variants, Transition, MotionProps } from 'framer-motion';

// Animation intensity levels
export type AnimationIntensity = 'none' | 'subtle' | 'normal' | 'dynamic';

// Animation preset types - Updated to include all presets
export type AnimationPreset = 
  | 'fade'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'scaleUp'
  | 'scaleDown'
  | 'bounce'
  | 'elastic'
  | 'spring'
  | 'shake'      // Added missing presets
  | 'pulse'      // Added missing presets
  | 'checkmark'; // Added missing presets

// Animation timing configuration
export interface AnimationTiming {
  duration: number;
  delay: number;
  stagger: number; // For sequential animations
}

// Easing configuration
export interface AnimationEasing {
  type: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'spring' | 'anticipate';
  stiffness?: number; // For spring animations
  damping?: number;   // For spring animations
  mass?: number;      // For spring animations
}

// Complete animation configuration
export interface AnimationConfig {
  // Global settings
  enabled: boolean;
  respectReducedMotion: boolean;
  intensity: AnimationIntensity;
  
  // Field animations
  fieldEntrance: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    easing: AnimationEasing;
    customVariants?: Variants;
  };
  
  fieldExit: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    easing: AnimationEasing;
    customVariants?: Variants;
  };
  
  // Step transition animations
  stepTransition: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    easing: AnimationEasing;
    direction: 'forward' | 'backward' | 'auto';
  };
  
  // Button animations
  button: {
    hover: {
      scale: number;
      duration: number;
      easing: AnimationEasing;
    };
    tap: {
      scale: number;
      duration: number;
    };
    disabled: {
      opacity: number;
      duration: number;
    };
  };
  
  // Error animations
  error: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    shake?: {
      intensity: number;
      duration: number;
    };
  };
  
  // Success animations
  success: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    confetti?: boolean;
  };
  
  // Progress animations
  progress: {
    bar: {
      duration: number;
      easing: AnimationEasing;
    };
    steps: {
      duration: number;
      stagger: number;
    };
  };
}

// Animation context value - Fixed isReducedMotion type
export interface AnimationContextValue {
  config: AnimationConfig;
  variants: AnimationVariants;
  transitions: AnimationTransitions;
  updateConfig: (updates: Partial<AnimationConfig>) => void;
  isReducedMotion: boolean; // Changed from boolean | null to boolean
  getFieldVariants: (preset: AnimationPreset) => Variants;
  getTransition: (timing: AnimationTiming, easing: AnimationEasing) => Transition;
}

// Pre-built animation variants
export interface AnimationVariants {
  field: {
    fade: Variants;
    slideUp: Variants;
    slideDown: Variants;
    slideLeft: Variants;
    slideRight: Variants;
    scale: Variants;
    scaleUp: Variants;
    scaleDown: Variants;
    bounce: Variants;
    elastic: Variants;
    spring: Variants;
  };
  
  step: {
    slideForward: Variants;
    slideBackward: Variants;
    fade: Variants;
    scale: Variants;
  };
  
  error: {
    shake: Variants;
    pulse: Variants;
    bounce: Variants;
  };
  
  success: {
    scale: Variants;
    bounce: Variants;
    checkmark: Variants;
  };
  
  button: {
    default: Variants;
    primary: Variants;
    secondary: Variants;
  };
}

// Animation transitions
export interface AnimationTransitions {
  default: Transition;
  fast: Transition;
  slow: Transition;
  spring: Transition;
  bounce: Transition;
  elastic: Transition;
}

// Component animation props
export interface AnimatedComponentProps extends MotionProps {
  animationPreset?: AnimationPreset;
  intensity?: AnimationIntensity;
  disabled?: boolean;
  customVariants?: Variants;
  customTransition?: Transition;
}