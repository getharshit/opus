// src/components/public-form/themes/index.ts - Clean Version

// Core exports
export * from './types';
export * from './defaultTheme';
export * from './cssProperties';
export * from './themeReducer';

// Typography system exports
export * from './typography/types';
export * from './typography/fontLoader';
export * from './typography/fontPresets';
export * from './typography/scales';
export * from './typography/cssGenerator';
export * from './typography/TypographyProvider';

// Typography integration utilities
export * from './typographyThemeUtils';

// Enhanced Theme Provider exports with typography
export {
  ThemeProvider,
  useTheme,
  useCurrentTheme,
  useThemeUpdates,
  useThemePreview,
  useCSSProperties,
  useThemeBreakpoints,
  useThemePerformance,
  useTypographyUpdates,
  useTypographyUtils,
  withTheme,
} from './ThemeProvider';

// Separate imports for utility creation
import { cssPropertyUtils } from './cssProperties';
import { themeValidation, themePersistence } from './themeReducer';
import { createDefaultTheme, createDarkTheme, themePresets } from './defaultTheme';
import { TypographyThemeUtils, typographyThemeHelpers } from './typographyThemeUtils';
import { fontCombinations, FontPresetManager } from './typography/fontPresets';
import { typographyScales, TypographyScaleGenerator } from './typography/scales';

// Enhanced utility functions with typography support
export const themeUtils = {
  // Quick theme application
  applyTheme: cssPropertyUtils.applyTheme,
  resetTheme: cssPropertyUtils.resetTheme,
  
  // Theme validation
  validateTheme: themeValidation.validateTheme,
  
  // Persistence helpers
  saveTheme: themePersistence.saveTheme,
  loadTheme: themePersistence.loadTheme,
  getAllThemes: themePersistence.getAllThemes,
  exportTheme: themePersistence.exportTheme,
  importTheme: themePersistence.importTheme,
  
  // CSS property generation
  generateCSS: cssPropertyUtils.themeToCSS,
  updateTypographyProperties: cssPropertyUtils.updateTypographyProperties,
  
  // Theme creation helpers
  createLightTheme: createDefaultTheme,
  createDarkTheme: createDarkTheme,
  getThemePresets: () => themePresets,

  // Typography utilities
  createTypographyTheme: TypographyThemeUtils.createTypographyTheme,
  applyFontCombination: TypographyThemeUtils.applyFontCombination,
  validateTypographyAccessibility: TypographyThemeUtils.validateTypographyAccessibility,
  getTypographyRecommendations: TypographyThemeUtils.getTypographyRecommendations,
  applyTypographyRecommendations: TypographyThemeUtils.applyTypographyRecommendations,
  optimizeThemePerformance: TypographyThemeUtils.optimizeThemePerformance,
  checkFontAvailability: TypographyThemeUtils.checkFontAvailability,
  preloadThemeFonts: TypographyThemeUtils.preloadThemeFonts,
  generateTypographyCSS: TypographyThemeUtils.generateTypographyCSS,
  exportThemeWithTypography: TypographyThemeUtils.exportThemeWithTypography,
  importThemeWithTypography: TypographyThemeUtils.importThemeWithTypography,
};

// Typography-specific utilities - renamed to avoid conflicts
export const fontUtils = {
  // Font management
  getFontById: FontPresetManager.getFontById,
  getFontsByCategory: FontPresetManager.getFontsByCategory,
  searchFonts: FontPresetManager.searchFonts,
  getRecommendedFonts: FontPresetManager.getRecommendedFonts,
  validateFontAvailability: FontPresetManager.validateFontAvailability,
  
  // Font combinations
  getFontCombinations: () => fontCombinations,
  getFontCombination: FontPresetManager.getFontCombination,
  
  // Typography scales
  getTypographyScales: () => typographyScales,
  generateCustomScale: TypographyScaleGenerator.generateScale,
  
  // Quick helpers
  ...typographyThemeHelpers,
};

// Pre-built theme collections for easy access
export const themeCollections = {
  // Basic themes
  basic: {
    light: themePresets.default,
    dark: themePresets.dark,
    highContrast: themePresets.highContrast(),
    performance: themePresets.performance(),
  },
  
  // Scale variants
  scales: {
    small: {
      light: themePresets.defaultSmall,
      dark: themePresets.darkSmall,
    },
    medium: {
      light: themePresets.default,
      dark: themePresets.dark,
    },
    large: {
      light: themePresets.defaultLarge,
      dark: themePresets.darkLarge,
    },
  },
  
  // Use case optimized themes
  useCase: {
    forms: typographyThemeHelpers.createFormTheme(),
    reading: typographyThemeHelpers.createReadingTheme(),
    accessibility: typographyThemeHelpers.createAccessibilityTheme(),
    performance: typographyThemeHelpers.createPerformanceTheme(),
  },
  
  // Font combination themes
  fonts: {
    modern: typographyThemeHelpers.applyModernFonts(themePresets.default),
    friendly: typographyThemeHelpers.applyFriendlyFonts(themePresets.default),
    elegant: typographyThemeHelpers.applyElegantFonts(themePresets.default),
  },
};

// Migration helpers for upgrading from basic to advanced typography
export const migrationHelpers = {
  /**
   * Upgrade theme from basic to advanced typography
   */
  upgradeToAdvancedTypography: (theme: import('./types').Theme): import('./types').Theme => {
    if (theme.advancedTypography) {
      return theme; // Already has advanced typography
    }

    const defaultAdvancedTypography = createDefaultTheme().advancedTypography!;
    
    return {
      ...theme,
      advancedTypography: {
        ...defaultAdvancedTypography,
        // Map basic typography to advanced where possible
        primary: {
          ...defaultAdvancedTypography.primary,
          family: theme.typography.fontFamily.split(',')[0].trim(),
        },
        mono: {
          ...defaultAdvancedTypography.mono,
          family: theme.typography.fontFamilyMono.split(',')[0].trim(),
        },
      },
      updatedAt: new Date(),
    };
  },

  /**
   * Downgrade theme from advanced to basic typography
   */
  downgradeToBasicTypography: (theme: import('./types').Theme): import('./types').Theme => {
    if (!theme.advancedTypography) {
      return theme; // Already basic
    }

    return {
      ...theme,
      typography: {
        ...theme.typography,
        fontFamily: [
          theme.advancedTypography.primary.family,
          ...theme.advancedTypography.primary.fallbacks
        ].join(', '),
        fontFamilyMono: [
          theme.advancedTypography.mono.family,
          ...theme.advancedTypography.mono.fallbacks
        ].join(', '),
      },
      advancedTypography: undefined,
      updatedAt: new Date(),
    };
  },

  /**
   * Check if theme needs migration
   */
  needsMigration: (theme: import('./types').Theme): boolean => {
    return !theme.advancedTypography;
  },

  /**
   * Get migration recommendations
   */
  getMigrationRecommendations: (theme: import('./types').Theme): string[] => {
    const recommendations: string[] = [];
    
    if (!theme.advancedTypography) {
      recommendations.push('Upgrade to advanced typography for better control and accessibility');
      recommendations.push('Consider adding font preloading for better performance');
      recommendations.push('Enable responsive typography scaling');
    }
    
    if (theme.advancedTypography && !theme.advancedTypography.performance.preloadFonts) {
      recommendations.push('Enable font preloading for better performance');
    }
    
    if (theme.advancedTypography && theme.advancedTypography.accessibility.contrastRatio < 4.5) {
      recommendations.push('Increase contrast ratio to meet WCAG AA standards');
    }

    return recommendations;
  },
};

// Development and debugging utilities
export const devUtils = {
  /**
   * Log theme information for debugging
   */
  inspectTheme: (theme: import('./types').Theme): void => {
    console.group(`🎨 Theme Inspection: ${theme.name}`);
    console.log('Theme ID:', theme.id);
    console.log('Is Dark:', theme.isDark);
    console.log('Is Custom:', theme.isCustom);
    console.log('Created:', theme.createdAt);
    console.log('Updated:', theme.updatedAt);
    
    if (theme.advancedTypography) {
      console.group('📝 Typography');
      console.log('Scale:', theme.advancedTypography.scale);
      console.log('Primary Font:', theme.advancedTypography.primary.family);
      console.log('Secondary Font:', theme.advancedTypography.secondary.family);
      console.log('Mono Font:', theme.advancedTypography.mono.family);
      console.log('Accessibility:', theme.advancedTypography.accessibility);
      console.log('Performance:', theme.advancedTypography.performance);
      console.groupEnd();
    } else {
      console.log('📝 Typography: Basic (consider upgrading)');
    }
    
    console.groupEnd();
  },

  /**
   * Compare two themes
   */
  compareThemes: (theme1: import('./types').Theme, theme2: import('./types').Theme): void => {
    console.group(`🔍 Theme Comparison: ${theme1.name} vs ${theme2.name}`);
    
    const differences: string[] = [];
    
    if (theme1.isDark !== theme2.isDark) {
      differences.push(`Dark mode: ${theme1.isDark} vs ${theme2.isDark}`);
    }
    
    if (theme1.colors.primary !== theme2.colors.primary) {
      differences.push(`Primary color: ${theme1.colors.primary} vs ${theme2.colors.primary}`);
    }
    
    // Compare typography
    if (theme1.advancedTypography && theme2.advancedTypography) {
      if (theme1.advancedTypography.scale !== theme2.advancedTypography.scale) {
        differences.push(`Typography scale: ${theme1.advancedTypography.scale} vs ${theme2.advancedTypography.scale}`);
      }
      
      if (theme1.advancedTypography.primary.family !== theme2.advancedTypography.primary.family) {
        differences.push(`Primary font: ${theme1.advancedTypography.primary.family} vs ${theme2.advancedTypography.primary.family}`);
      }
    } else if (theme1.advancedTypography !== theme2.advancedTypography) {
      differences.push(`Typography system: ${theme1.advancedTypography ? 'Advanced' : 'Basic'} vs ${theme2.advancedTypography ? 'Advanced' : 'Basic'}`);
    }
    
    if (differences.length === 0) {
      console.log('✅ Themes are identical');
    } else {
      console.log('📋 Differences found:');
      differences.forEach(diff => console.log(`  • ${diff}`));
    }
    
    console.groupEnd();
  },

  /**
   * Generate theme documentation
   */
  generateThemeDoc: (theme: import('./types').Theme): string => {
    let doc = `# ${theme.name}\n\n`;
    doc += `**ID:** ${theme.id}\n`;
    doc += `**Description:** ${theme.description || 'No description provided'}\n`;
    doc += `**Type:** ${theme.isDark ? 'Dark' : 'Light'} theme\n`;
    doc += `**Custom:** ${theme.isCustom ? 'Yes' : 'No'}\n\n`;
    
    doc += `## Colors\n\n`;
    doc += `- **Primary:** ${theme.colors.primary}\n`;
    doc += `- **Secondary:** ${theme.colors.secondary}\n`;
    doc += `- **Background:** ${theme.colors.background}\n`;
    doc += `- **Text:** ${theme.colors.textPrimary}\n\n`;
    
    if (theme.advancedTypography) {
      doc += `## Typography\n\n`;
      doc += `- **Scale:** ${theme.advancedTypography.scale}\n`;
      doc += `- **Primary Font:** ${theme.advancedTypography.primary.family}\n`;
      doc += `- **Secondary Font:** ${theme.advancedTypography.secondary.family}\n`;
      doc += `- **Monospace Font:** ${theme.advancedTypography.mono.family}\n`;
      doc += `- **Min Body Size:** ${theme.advancedTypography.accessibility.minBodySize}px\n`;
      doc += `- **Contrast Ratio:** ${theme.advancedTypography.accessibility.contrastRatio}\n\n`;
    }
    
    doc += `## Accessibility\n\n`;
    if (theme.advancedTypography) {
      const validation = TypographyThemeUtils.validateTypographyAccessibility(theme);
      doc += `- **Status:** ${validation.isValid ? '✅ Compliant' : '⚠️ Issues found'}\n`;
      if (validation.errors.length > 0) {
        doc += `- **Errors:** ${validation.errors.join(', ')}\n`;
      }
      if (validation.warnings.length > 0) {
        doc += `- **Warnings:** ${validation.warnings.join(', ')}\n`;
      }
    } else {
      doc += `- **Status:** ⚠️ Basic typography (limited accessibility features)\n`;
    }
    
    doc += `\n---\n`;
    doc += `*Generated on ${new Date().toLocaleDateString()}*\n`;
    
    return doc;
  },
};

// Re-export specific utilities for convenience
export { TypographyThemeUtils, typographyThemeHelpers };