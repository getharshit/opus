import type { FormCustomization } from "@/types/form";

/**
 * Converts form customization to CSS custom properties
 */
export function convertCustomizationToCSS(customization?: FormCustomization): Record<string, string> {
  if (!customization) return {};

  const cssProperties: Record<string, string> = {};

  // Colors - using the simple structure from main types
  if (customization.colors) {
    const { colors } = customization;
    if (colors.primary) cssProperties['--form-color-primary'] = colors.primary;
    if (colors.secondary) cssProperties['--form-color-secondary'] = colors.secondary;
    if (colors.accent) cssProperties['--form-color-accent'] = colors.accent;
    if (colors.background) cssProperties['--form-color-background'] = colors.background;
    if (colors.surface) cssProperties['--form-color-surface'] = colors.surface;
    if (colors.text) cssProperties['--form-color-text'] = colors.text;
    if (colors.textSecondary) cssProperties['--form-color-text-secondary'] = colors.textSecondary;
    if (colors.border) cssProperties['--form-color-border'] = colors.border;
    if (colors.error) cssProperties['--form-color-error'] = colors.error;
    if (colors.success) cssProperties['--form-color-success'] = colors.success;
    if (colors.warning) cssProperties['--form-color-warning'] = colors.warning;
  }

  // Typography - using the Record<string, number> structure
  if (customization.typography) {
    const { typography } = customization;
    if (typography.fontFamily) cssProperties['--form-font-family'] = typography.fontFamily;
    
    // Font sizes (dynamic keys)
    if (typography.fontSize) {
      Object.entries(typography.fontSize).forEach(([key, value]) => {
        cssProperties[`--form-font-size-${key}`] = `${value}px`;
      });
    }

    // Font weights (dynamic keys)
    if (typography.fontWeight) {
      Object.entries(typography.fontWeight).forEach(([key, value]) => {
        cssProperties[`--form-font-weight-${key}`] = value.toString();
      });
    }

    // Line heights (dynamic keys)
    if (typography.lineHeight) {
      Object.entries(typography.lineHeight).forEach(([key, value]) => {
        cssProperties[`--form-line-height-${key}`] = value.toString();
      });
    }
  }

  // Spacing
  if (customization.spacing) {
    const { spacing } = customization;
    if (spacing.xs) cssProperties['--form-spacing-xs'] = `${spacing.xs}px`;
    if (spacing.sm) cssProperties['--form-spacing-sm'] = `${spacing.sm}px`;
    if (spacing.md) cssProperties['--form-spacing-md'] = `${spacing.md}px`;
    if (spacing.lg) cssProperties['--form-spacing-lg'] = `${spacing.lg}px`;
    if (spacing.xl) cssProperties['--form-spacing-xl'] = `${spacing.xl}px`;
  }

  // Borders
  if (customization.borders) {
    const { borders } = customization;
    if (borders.radius) cssProperties['--form-border-radius'] = `${borders.radius}px`;
    if (borders.width) cssProperties['--form-border-width'] = `${borders.width}px`;
  }

  // Shadows
  if (customization.shadows) {
    const { shadows } = customization;
    if (shadows.sm) cssProperties['--form-shadow-sm'] = shadows.sm;
    if (shadows.md) cssProperties['--form-shadow-md'] = shadows.md;
    if (shadows.lg) cssProperties['--form-shadow-lg'] = shadows.lg;
  }

  // Layout properties
  if (customization.maxWidth) {
    cssProperties['--form-max-width'] = `${customization.maxWidth}px`;
  }

  if (customization.alignment) {
    cssProperties['--form-alignment'] = customization.alignment;
  }

  // Button styling
  if (customization.buttonStyle) {
    cssProperties['--form-button-style'] = customization.buttonStyle;
  }

  if (customization.buttonSize) {
    cssProperties['--form-button-size'] = customization.buttonSize;
  }

  // Logo properties
  if (customization.logoPosition) {
    cssProperties['--form-logo-position'] = customization.logoPosition;
  }

  if (customization.logoSize) {
    cssProperties['--form-logo-size'] = `${customization.logoSize}px`;
  }

  return cssProperties;
}

/**
 * Generates React style object from customization
 */
export function generateThemeStyle(customization?: FormCustomization): React.CSSProperties {
  const cssProperties = convertCustomizationToCSS(customization);
  return cssProperties as React.CSSProperties;
}

/**
 * Creates a theme wrapper style object that includes background and container styling
 */
export function createThemeWrapperStyle(customization?: FormCustomization): React.CSSProperties {
  const baseStyle = generateThemeStyle(customization);
  
  return {
    ...baseStyle,
    backgroundColor: customization?.colors?.background || '#ffffff',
    color: customization?.colors?.text || '#1f2937',
    fontFamily: customization?.typography?.fontFamily || 'Inter, system-ui, sans-serif',
    minHeight: '100vh',
  };
}

/**
 * Gets animation configuration for components
 */
export function getAnimationConfig(customization?: FormCustomization) {
  const animations = customization?.animations;
  
  return {
    intensity: animations?.intensity || 'moderate',
    enableAnimations: animations?.enableAnimations ?? true,
    respectReducedMotion: animations?.respectReducedMotion ?? true,
  };
}

/**
 * Generates CSS classes based on button style
 */
export function getButtonClasses(customization?: FormCustomization): string {
  const buttonStyle = customization?.buttonStyle || 'filled';
  const buttonSize = customization?.buttonSize || 'md';
  
  const baseClasses = 'transition-all duration-200 font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Style classes using CSS custom properties
  const styleClasses = {
    filled: 'bg-[var(--form-color-primary)] text-white hover:opacity-90 focus:ring-[var(--form-color-primary)]',
    outlined: 'border-2 border-[var(--form-color-primary)] text-[var(--form-color-primary)] bg-transparent hover:bg-[var(--form-color-primary)] hover:text-white focus:ring-[var(--form-color-primary)]',
    ghost: 'text-[var(--form-color-primary)] bg-transparent hover:bg-[var(--form-color-primary)]/10 focus:ring-[var(--form-color-primary)]'
  };

  return `${baseClasses} ${sizeClasses[buttonSize]} ${styleClasses[buttonStyle]}`;
}

/**
 * Gets container alignment classes
 */
export function getContainerClasses(customization?: FormCustomization): string {
  const alignment = customization?.alignment || 'center';
  
  const alignmentClasses = {
    left: 'mx-0',
    center: 'mx-auto',
    right: 'ml-auto mr-0'
  };

  return `max-w-[var(--form-max-width,600px)] ${alignmentClasses[alignment]} px-4`;
}