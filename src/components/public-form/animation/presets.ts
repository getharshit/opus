import { Variants, Transition } from 'framer-motion';
import { AnimationPreset, AnimationTiming, AnimationEasing, AnimationVariants, AnimationTransitions } from './types';

// Default animation variants
export const createAnimationVariants = (): AnimationVariants => ({
  field: {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    slideDown: {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 }
    },
    scaleDown: {
      hidden: { opacity: 0, scale: 1.1 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 }
    },
    bounce: {
      hidden: { opacity: 0, scale: 0.3 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      },
      exit: { opacity: 0, scale: 0.3 }
    },
    elastic: {
      hidden: { opacity: 0, scale: 0 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 600,
          damping: 20
        }
      },
      exit: { opacity: 0, scale: 0 }
    },
    spring: {
      hidden: { opacity: 0, y: 30, scale: 0.9 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      },
      exit: { opacity: 0, y: -30, scale: 0.9 }
    }
  },
  
  step: {
    slideForward: {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 }
    },
    slideBackward: {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 }
    }
  },
  
  error: {
    shake: {
      hidden: { x: 0 },
      visible: { 
        x: [0, -10, 10, -10, 10, 0],
        transition: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }
    },
    pulse: {
      hidden: { scale: 1 },
      visible: { 
        scale: [1, 1.05, 1],
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }
    },
    bounce: {
      hidden: { y: 0 },
      visible: { 
        y: [0, -10, 0],
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      }
    }
  },
  
  success: {
    scale: {
      hidden: { scale: 0, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 30
        }
      }
    },
    bounce: {
      hidden: { y: 20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }
    },
    checkmark: {
      hidden: { pathLength: 0, opacity: 0 },
      visible: { 
        pathLength: 1, 
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    }
  },
  
  button: {
    default: {
      idle: { scale: 1 },
      hover: { scale: 1.02 },
      tap: { scale: 0.98 },
      disabled: { opacity: 0.5 }
    },
    primary: {
      idle: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
      hover: { 
        scale: 1.02, 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      },
      tap: { scale: 0.98 },
      disabled: { opacity: 0.5, scale: 1 }
    },
    secondary: {
      idle: { scale: 1 },
      hover: { scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.05)" },
      tap: { scale: 0.98 },
      disabled: { opacity: 0.5 }
    }
  }
});

// Default animation transitions
export const createAnimationTransitions = (): AnimationTransitions => ({
  default: {
    duration: 0.3,
    ease: "easeInOut"
  },
  fast: {
    duration: 0.15,
    ease: "easeOut"
  },
  slow: {
    duration: 0.6,
    ease: "easeInOut"
  },
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 25
  },
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10
  },
  elastic: {
    type: "spring",
    stiffness: 600,
    damping: 20
  }
});

// Create transition from timing and easing config
export const createTransition = (timing: AnimationTiming, easing: AnimationEasing): Transition => {
  const baseTransition: Transition = {
    duration: timing.duration,
    delay: timing.delay
  };

  switch (easing.type) {
    case 'spring':
      return {
        ...baseTransition,
        type: "spring",
        stiffness: easing.stiffness || 300,
        damping: easing.damping || 25,
        mass: easing.mass || 1
      };
    case 'linear':
      return { ...baseTransition, ease: "linear" };
    case 'easeIn':
      return { ...baseTransition, ease: "easeIn" };
    case 'easeOut':
      return { ...baseTransition, ease: "easeOut" };
    case 'easeInOut':
      return { ...baseTransition, ease: "easeInOut" };
    case 'anticipate':
      return { ...baseTransition, ease: "anticipate" };
    default:
      return { ...baseTransition, ease: "easeInOut" };
  }
};

// Get variants by preset name - Updated to handle new presets
export const getVariantsByPreset = (preset: AnimationPreset, variants: AnimationVariants): Variants => {
  switch (preset) {
    case 'fade':
      return variants.field.fade;
    case 'slideUp':
      return variants.field.slideUp;
    case 'slideDown':
      return variants.field.slideDown;
    case 'slideLeft':
      return variants.field.slideLeft;
    case 'slideRight':
      return variants.field.slideRight;
    case 'scale':
      return variants.field.scale;
    case 'scaleUp':
      return variants.field.scaleUp;
    case 'scaleDown':
      return variants.field.scaleDown;
    case 'bounce':
      return variants.field.bounce;
    case 'elastic':
      return variants.field.elastic;
    case 'spring':
      return variants.field.spring;
    case 'shake':
      return variants.error.shake;
    case 'pulse':
      return variants.error.pulse;
    case 'checkmark':
      return variants.success.checkmark;
    default:
      return variants.field.fade;
  }
};

// Adjust animation intensity
export const adjustAnimationIntensity = (
  variants: Variants, 
  intensity: 'none' | 'subtle' | 'normal' | 'dynamic'
): Variants => {
  if (intensity === 'none') {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
      exit: { opacity: 1 }
    };
  }

  const multipliers = {
    subtle: 0.5,
    normal: 1,
    dynamic: 1.5
  };

  const multiplier = multipliers[intensity];
  
  const adjustedVariants: Variants = {};
  
  Object.keys(variants).forEach(key => {
    const variant = variants[key];
    if (typeof variant === 'object' && variant !== null) {
      adjustedVariants[key] = { ...variant };
      
      // Adjust transform values
      if ('x' in variant && typeof variant.x === 'number') {
        adjustedVariants[key].x = variant.x * multiplier;
      }
      if ('y' in variant && typeof variant.y === 'number') {
        adjustedVariants[key].y = variant.y * multiplier;
      }
      if ('scale' in variant && typeof variant.scale === 'number') {
        const scaleDiff = variant.scale - 1;
        adjustedVariants[key].scale = 1 + (scaleDiff * multiplier);
      }
    }
  });
  
  return adjustedVariants;
};