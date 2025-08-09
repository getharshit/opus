// src/components/public-form/themes/index.ts

// Core exports
export * from './types';
export * from './defaultTheme';
export * from './ThemeProvider';
export * from './cssProperties';
export * from './themeReducer';

// Main theme system exports
export {
  ThemeProvider,
  useTheme,
  useCurrentTheme,
  useThemeUpdates,
  useThemePreview,
  useCSSProperties,
  useThemeBreakpoints,
  useThemePerformance,
  withTheme,
} from './ThemeProvider';

export {
  cssPropertyUtils,
  CSSPropertiesManager,
  DebouncedCSSManager,
  themeToCSSProperties,
} from './cssProperties';

export {
  defaultTheme,
  darkTheme,
  createDefaultTheme,
  createDarkTheme,
} from './defaultTheme';

export {
  themeValidation,
  themePersistence,
  themeActions,
  themeReducer,
  initialThemeState,
} from './themeReducer';

// Utility functions
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
  
  // CSS property generation
  generateCSS: cssPropertyUtils.themeToCSS,
  
  // Theme creation helpers
  createLightTheme: createDefaultTheme,
  createDarkTheme: createDarkTheme,
};