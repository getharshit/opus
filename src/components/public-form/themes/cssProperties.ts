// src/components/public-form/themes/cssProperties.ts - Updated with Typography Integration

import { Theme, CSSCustomProperties } from './types';
import { TypographyCSSGenerator } from './typography/cssGenerator';

/**
 * Enhanced CSS properties generator with typography integration
 */
export const themeToCSSProperties = (theme: Theme): CSSCustomProperties => {
  // Generate basic theme properties
  const basicProperties = {
    // Colors
    '--form-color-primary': theme.colors.primary,
    '--form-color-primary-hover': theme.colors.primaryHover,
    '--form-color-primary-active': theme.colors.primaryActive,
    '--form-color-primary-disabled': theme.colors.primaryDisabled,
    '--form-color-secondary': theme.colors.secondary,
    '--form-color-secondary-hover': theme.colors.secondaryHover,
    '--form-color-secondary-active': theme.colors.secondaryActive,
    '--form-color-background': theme.colors.background,
    '--form-color-surface': theme.colors.surface,
    '--form-color-surface-elevated': theme.colors.surfaceElevated,
    '--form-color-overlay': theme.colors.overlay,
    '--form-color-text-primary': theme.colors.textPrimary,
    '--form-color-text-secondary': theme.colors.textSecondary,
    '--form-color-text-muted': theme.colors.textMuted,
    '--form-color-text-inverse': theme.colors.textInverse,
    '--form-color-border': theme.colors.border,
    '--form-color-border-hover': theme.colors.borderHover,
    '--form-color-border-focus': theme.colors.borderFocus,
    '--form-color-border-error': theme.colors.borderError,
    '--form-color-border-success': theme.colors.borderSuccess,
    '--form-color-error': theme.colors.error,
    '--form-color-error-hover': theme.colors.errorHover,
    '--form-color-success': theme.colors.success,
    '--form-color-success-hover': theme.colors.successHover,
    '--form-color-warning': theme.colors.warning,
    '--form-color-warning-hover': theme.colors.warningHover,
    '--form-color-info': theme.colors.info,
    '--form-color-info-hover': theme.colors.infoHover,
    
    // Basic Typography (for backward compatibility)
    '--form-font-family': theme.typography.fontFamily,
    '--form-font-family-mono': theme.typography.fontFamilyMono,
    '--form-font-size-xs': `${theme.typography.fontSizeXs}rem`,
    '--form-font-size-sm': `${theme.typography.fontSizeSm}rem`,
    '--form-font-size-base': `${theme.typography.fontSizeBase}rem`,
    '--form-font-size-lg': `${theme.typography.fontSizeLg}rem`,
    '--form-font-size-xl': `${theme.typography.fontSizeXl}rem`,
    '--form-font-size-2xl': `${theme.typography.fontSize2xl}rem`,
    '--form-font-size-3xl': `${theme.typography.fontSize3xl}rem`,
    '--form-font-size-4xl': `${theme.typography.fontSize4xl}rem`,
    '--form-font-weight-light': theme.typography.fontWeightLight.toString(),
    '--form-font-weight-normal': theme.typography.fontWeightNormal.toString(),
    '--form-font-weight-medium': theme.typography.fontWeightMedium.toString(),
    '--form-font-weight-semibold': theme.typography.fontWeightSemibold.toString(),
    '--form-font-weight-bold': theme.typography.fontWeightBold.toString(),
    '--form-line-height-tight': theme.typography.lineHeightTight.toString(),
    '--form-line-height-normal': theme.typography.lineHeightNormal.toString(),
    '--form-line-height-relaxed': theme.typography.lineHeightRelaxed.toString(),
    '--form-line-height-loose': theme.typography.lineHeightLoose.toString(),
    '--form-letter-spacing-tighter': `${theme.typography.letterSpacingTighter}em`,
    '--form-letter-spacing-tight': `${theme.typography.letterSpacingTight}em`,
    '--form-letter-spacing-normal': `${theme.typography.letterSpacingNormal}em`,
    '--form-letter-spacing-wide': `${theme.typography.letterSpacingWide}em`,
    '--form-letter-spacing-wider': `${theme.typography.letterSpacingWider}em`,
    
    // Spacing
    '--form-spacing-unit': `${theme.spacing.unit}rem`,
    '--form-spacing-xs': `${theme.spacing.xs}rem`,
    '--form-spacing-sm': `${theme.spacing.sm}rem`,
    '--form-spacing-md': `${theme.spacing.md}rem`,
    '--form-spacing-lg': `${theme.spacing.lg}rem`,
    '--form-spacing-xl': `${theme.spacing.xl}rem`,
    '--form-spacing-2xl': `${theme.spacing['2xl']}rem`,
    '--form-spacing-3xl': `${theme.spacing['3xl']}rem`,
    '--form-spacing-4xl': `${theme.spacing['4xl']}rem`,
    '--form-spacing-5xl': `${theme.spacing['5xl']}rem`,
    '--form-spacing-6xl': `${theme.spacing['6xl']}rem`,
    
    // Border radius
    '--form-border-radius-none': `${theme.borderRadius.none}px`,
    '--form-border-radius-sm': `${theme.borderRadius.sm}rem`,
    '--form-border-radius-md': `${theme.borderRadius.md}rem`,
    '--form-border-radius-lg': `${theme.borderRadius.lg}rem`,
    '--form-border-radius-xl': `${theme.borderRadius.xl}rem`,
    '--form-border-radius-full': `${theme.borderRadius.full}px`,
    
    // Shadows
    '--form-shadow-none': theme.shadows.none,
    '--form-shadow-sm': theme.shadows.sm,
    '--form-shadow-md': theme.shadows.md,
    '--form-shadow-lg': theme.shadows.lg,
    '--form-shadow-xl': theme.shadows.xl,
    '--form-shadow-2xl': theme.shadows['2xl'],
    '--form-shadow-inner': theme.shadows.inner,
    
    // Transitions
    '--form-transition-duration-fast': `${theme.transitions.durationFast}ms`,
    '--form-transition-duration-normal': `${theme.transitions.durationNormal}ms`,
    '--form-transition-duration-slow': `${theme.transitions.durationSlow}ms`,
    '--form-transition-easing-linear': theme.transitions.easingLinear,
    '--form-transition-easing-ease-in': theme.transitions.easingEaseIn,
    '--form-transition-easing-ease-out': theme.transitions.easingEaseOut,
    '--form-transition-easing-ease-in-out': theme.transitions.easingEaseInOut,
    '--form-transition-easing-bounce': theme.transitions.easingBounce,
    '--form-transition-easing-elastic': theme.transitions.easingElastic,
    
    // Z-index
    '--form-z-index-auto': theme.zIndex.auto,
    '--form-z-index-base': theme.zIndex.base.toString(),
    '--form-z-index-dropdown': theme.zIndex.dropdown.toString(),
    '--form-z-index-modal': theme.zIndex.modal.toString(),
    '--form-z-index-popover': theme.zIndex.popover.toString(),
    '--form-z-index-tooltip': theme.zIndex.tooltip.toString(),
    '--form-z-index-toast': theme.zIndex.toast.toString(),
    '--form-z-index-overlay': theme.zIndex.overlay.toString(),
  };

  // Generate advanced typography properties if available
  let advancedTypographyProperties = {};
  if (theme.advancedTypography) {
    try {
      const typographyProps = TypographyCSSGenerator.generateCSSProperties(theme.advancedTypography);
      advancedTypographyProperties = {
        // Map typography properties to our CSS custom property interface
        '--form-font-primary': typographyProps['--form-font-primary'],
        '--form-font-secondary': typographyProps['--form-font-secondary'],
        '--form-font-mono-advanced': typographyProps['--form-font-mono'],
        
        // Element-specific typography
        '--form-font-size-form-title': typographyProps['--form-font-size-form-title'],
        '--form-font-size-form-description': typographyProps['--form-font-size-form-description'],
        '--form-font-size-section-title': typographyProps['--form-font-size-section-title'],
        '--form-font-size-question-label': typographyProps['--form-font-size-question-label'],
        '--form-font-size-question-description': typographyProps['--form-font-size-question-description'],
        '--form-font-size-input-text': typographyProps['--form-font-size-input-text'],
        '--form-font-size-input-placeholder': typographyProps['--form-font-size-input-placeholder'],
        '--form-font-size-button-text': typographyProps['--form-font-size-button-text'],
        '--form-font-size-help-text': typographyProps['--form-font-size-help-text'],
        '--form-font-size-error-text': typographyProps['--form-font-size-error-text'],
        '--form-font-size-success-text': typographyProps['--form-font-size-success-text'],
        '--form-font-size-caption': typographyProps['--form-font-size-caption'],
        '--form-font-size-legal': typographyProps['--form-font-size-legal'],
        
        // Line heights
        '--form-line-height-form-title': typographyProps['--form-line-height-form-title'],
        '--form-line-height-form-description': typographyProps['--form-line-height-form-description'],
        '--form-line-height-section-title': typographyProps['--form-line-height-section-title'],
        '--form-line-height-question-label': typographyProps['--form-line-height-question-label'],
        '--form-line-height-question-description': typographyProps['--form-line-height-question-description'],
        '--form-line-height-input-text': typographyProps['--form-line-height-input-text'],
        '--form-line-height-button-text': typographyProps['--form-line-height-button-text'],
        '--form-line-height-help-text': typographyProps['--form-line-height-help-text'],
        '--form-line-height-error-text': typographyProps['--form-line-height-error-text'],
        '--form-line-height-success-text': typographyProps['--form-line-height-success-text'],
        '--form-line-height-caption': typographyProps['--form-line-height-caption'],
        '--form-line-height-legal': typographyProps['--form-line-height-legal'],
        
        // Letter spacing
        '--form-letter-spacing-form-title': typographyProps['--form-letter-spacing-form-title'],
        '--form-letter-spacing-form-description': typographyProps['--form-letter-spacing-form-description'],
        '--form-letter-spacing-section-title': typographyProps['--form-letter-spacing-section-title'],
        '--form-letter-spacing-question-label': typographyProps['--form-letter-spacing-question-label'],
        '--form-letter-spacing-question-description': typographyProps['--form-letter-spacing-question-description'],
        '--form-letter-spacing-input-text': typographyProps['--form-letter-spacing-input-text'],
        '--form-letter-spacing-button-text': typographyProps['--form-letter-spacing-button-text'],
        '--form-letter-spacing-help-text': typographyProps['--form-letter-spacing-help-text'],
        '--form-letter-spacing-error-text': typographyProps['--form-letter-spacing-error-text'],
        '--form-letter-spacing-success-text': typographyProps['--form-letter-spacing-success-text'],
        '--form-letter-spacing-caption': typographyProps['--form-letter-spacing-caption'],
        '--form-letter-spacing-legal': typographyProps['--form-letter-spacing-legal'],
        
        // Font weights
        '--form-font-weight-form-title': typographyProps['--form-font-weight-form-title'],
        '--form-font-weight-form-description': typographyProps['--form-font-weight-form-description'],
        '--form-font-weight-section-title': typographyProps['--form-font-weight-section-title'],
        '--form-font-weight-question-label': typographyProps['--form-font-weight-question-label'],
        '--form-font-weight-question-description': typographyProps['--form-font-weight-question-description'],
        '--form-font-weight-input-text': typographyProps['--form-font-weight-input-text'],
        '--form-font-weight-button-text': typographyProps['--form-font-weight-button-text'],
        '--form-font-weight-help-text': typographyProps['--form-font-weight-help-text'],
        '--form-font-weight-error-text': typographyProps['--form-font-weight-error-text'],
        '--form-font-weight-success-text': typographyProps['--form-font-weight-success-text'],
        '--form-font-weight-caption': typographyProps['--form-font-weight-caption'],
        '--form-font-weight-legal': typographyProps['--form-font-weight-legal'],
        
        // Responsive modifiers
        '--form-font-scale-sm': typographyProps['--form-font-scale-sm'],
        '--form-font-scale-md': typographyProps['--form-font-scale-md'],
        '--form-font-scale-lg': typographyProps['--form-font-scale-lg'],
      };
    } catch (error) {
      console.warn('Failed to generate advanced typography properties:', error);
    }
  }

  // Merge all properties
  return {
    ...basicProperties,
    ...advancedTypographyProperties
  } as CSSCustomProperties;
};

/**
 * Enhanced CSS Properties injection system with typography support
 */
export class CSSPropertiesManager {
  private static instance: CSSPropertiesManager;
  private styleElement: HTMLStyleElement | null = null;
  private currentProperties: CSSCustomProperties | null = null;

  static getInstance(): CSSPropertiesManager {
    if (!CSSPropertiesManager.instance) {
      CSSPropertiesManager.instance = new CSSPropertiesManager();
    }
    return CSSPropertiesManager.instance;
  }

  private constructor() {
    this.initializeStyleElement();
  }

  /**
   * Initialize the style element for CSS custom properties
   */
  private initializeStyleElement(): void {
    if (typeof document === 'undefined') return;

    // Check if style element already exists
    let existingElement = document.getElementById('form-theme-css-properties') as HTMLStyleElement;
    
    if (!existingElement) {
      existingElement = document.createElement('style');
      existingElement.id = 'form-theme-css-properties';
      existingElement.type = 'text/css';
      document.head.appendChild(existingElement);
    }

    this.styleElement = existingElement;
  }

  /**
   * Apply CSS custom properties to the document
   */
  applyProperties(properties: CSSCustomProperties): void {
    if (!this.styleElement) {
      this.initializeStyleElement();
    }

    if (!this.styleElement) return;

    // Generate CSS rule
    const cssRule = this.generateCSSRule(properties);
    
    // Apply CSS with error handling
    try {
      this.styleElement.textContent = cssRule;
      this.currentProperties = properties;
    } catch (error) {
      console.error('Failed to apply CSS properties:', error);
    }
  }

  /**
   * Update specific CSS properties without replacing all
   */
  updateProperties(partialProperties: Partial<CSSCustomProperties>): void {
    if (!this.currentProperties) {
      console.warn('No current properties to update. Use applyProperties first.');
      return;
    }

    const updatedProperties = {
      ...this.currentProperties,
      ...partialProperties,
    };

    this.applyProperties(updatedProperties);
  }

  /**
   * Generate CSS rule string from properties
   */
  private generateCSSRule(properties: CSSCustomProperties): string {
    const cssDeclarations = Object.entries(properties)
      .map(([property, value]) => `  ${property}: ${value};`)
      .join('\n');

    return `:root {\n${cssDeclarations}\n}`;
  }

  /**
   * Get current applied properties
   */
  getCurrentProperties(): CSSCustomProperties | null {
    return this.currentProperties;
  }

  /**
   * Reset all properties
   */
  reset(): void {
    if (this.styleElement) {
      this.styleElement.textContent = '';
    }
    this.currentProperties = null;
  }

  /**
   * Check if properties are currently applied
   */
  hasProperties(): boolean {
    return this.currentProperties !== null;
  }

  /**
   * Get CSS property value from computed styles
   */
  getComputedProperty(propertyName: keyof CSSCustomProperties): string {
    if (typeof document === 'undefined') return '';
    
    return getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();
  }

  /**
   * Validate CSS property values
   */
  validateProperties(properties: CSSCustomProperties): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate color values
    const colorProperties = Object.entries(properties)
      .filter(([key]) => key.includes('color'))
      .forEach(([key, value]) => {
        if (!this.isValidColor(value)) {
          errors.push(`Invalid color value for ${key}: ${value}`);
        }
      });

    // Validate size values
    const sizeProperties = Object.entries(properties)
      .filter(([key]) => key.includes('size') || key.includes('spacing') || key.includes('radius'))
      .forEach(([key, value]) => {
        if (!this.isValidSize(value)) {
          errors.push(`Invalid size value for ${key}: ${value}`);
        }
      });

    // Validate font family values
    const fontProperties = Object.entries(properties)
      .filter(([key]) => key.includes('font-family') || key.includes('font-primary') || key.includes('font-secondary') || key.includes('font-mono'))
      .forEach(([key, value]) => {
        if (!this.isValidFontFamily(value)) {
          errors.push(`Invalid font family value for ${key}: ${value}`);
        }
      });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate color value
   */
  private isValidColor(color: string): boolean {
    // Create a temporary div to test color validity
    if (typeof document === 'undefined') return true;
    
    const div = document.createElement('div');
    div.style.color = color;
    return div.style.color !== '';
  }

  /**
   * Validate size value
   */
  private isValidSize(size: string): boolean {
    // Check for valid CSS size units
    const sizeRegex = /^(\d*\.?\d+)(px|em|rem|%|vh|vw|vmin|vmax|ex|ch|cm|mm|in|pt|pc)?$/;
    return sizeRegex.test(size) || size === '0' || size === 'auto';
  }

  /**
   * Validate font family value
   */
  private isValidFontFamily(fontFamily: string): boolean {
    // Basic validation for font family strings
    return typeof fontFamily === 'string' && fontFamily.length > 0;
  }
}

/**
 * Debounced CSS property application with typography support
 */
export class DebouncedCSSManager {
  private manager: CSSPropertiesManager;
  private debounceTimer: NodeJS.Timeout | null = null;
  private pendingProperties: Partial<CSSCustomProperties> = {};

  constructor(private debounceMs: number = 16) {
    this.manager = CSSPropertiesManager.getInstance();
  }

  /**
   * Apply properties with debouncing
   */
  applyProperties(properties: CSSCustomProperties): void {
    this.clearPendingUpdates();
    this.manager.applyProperties(properties);
  }

  /**
   * Update properties with debouncing
   */
  updateProperties(partialProperties: Partial<CSSCustomProperties>): void {
    // Merge with pending updates
    this.pendingProperties = {
      ...this.pendingProperties,
      ...partialProperties,
    };

    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new timer
    this.debounceTimer = setTimeout(() => {
      this.manager.updateProperties(this.pendingProperties);
      this.pendingProperties = {};
      this.debounceTimer = null;
    }, this.debounceMs);
  }

  /**
   * Clear pending updates
   */
  private clearPendingUpdates(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.pendingProperties = {};
  }

  /**
   * Force apply pending updates immediately
   */
  flush(): void {
    if (Object.keys(this.pendingProperties).length > 0) {
      this.manager.updateProperties(this.pendingProperties);
      this.clearPendingUpdates();
    }
  }
}

/**
 * Enhanced utility functions for CSS properties with typography support
 */
export const cssPropertyUtils = {
  /**
   * Convert theme to CSS properties (with typography support)
   */
  themeToCSS: themeToCSSProperties,

  /**
   * Get CSS manager instance
   */
  getManager: () => CSSPropertiesManager.getInstance(),

  /**
   * Create debounced manager
   */
  createDebouncedManager: (debounceMs?: number) => new DebouncedCSSManager(debounceMs),

  /**
   * Apply theme immediately (with typography support)
   */
  applyTheme: (theme: Theme) => {
    const properties = themeToCSSProperties(theme);
    CSSPropertiesManager.getInstance().applyProperties(properties);
  },

  /**
   * Reset theme properties
   */
  resetTheme: () => {
    CSSPropertiesManager.getInstance().reset();
  },

  /**
   * Check if theme is applied
   */
  hasTheme: () => {
    return CSSPropertiesManager.getInstance().hasProperties();
  },

  /**
   * Validate theme properties (with typography support)
   */
  validateTheme: (theme: Theme) => {
    const properties = themeToCSSProperties(theme);
    return CSSPropertiesManager.getInstance().validateProperties(properties);
  },

  /**
   * Update only typography properties
   */
  updateTypographyProperties: (theme: Theme) => {
    if (!theme.advancedTypography) return;
    
    try {
      const typographyProps = TypographyCSSGenerator.generateCSSProperties(theme.advancedTypography);
      const manager = CSSPropertiesManager.getInstance();
      
      // Extract only typography-related properties
      const typographyOnlyProps: Partial<CSSCustomProperties> = {};
      
      Object.entries(typographyProps).forEach(([key, value]) => {
        if (key.includes('font') || key.includes('line-height') || key.includes('letter-spacing')) {
          (typographyOnlyProps as any)[key] = value;
        }
      });
      
      manager.updateProperties(typographyOnlyProps);
    } catch (error) {
      console.error('Failed to update typography properties:', error);
    }
  },
};