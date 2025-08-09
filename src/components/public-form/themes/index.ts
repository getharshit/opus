// src/components/public-form/themes/index.ts

// Core exports
export * from './types';
export * from './defaultTheme';
export * from './cssProperties';
export * from './themeReducer';

// Theme Provider exports
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

// Import for themeUtils only (not re-exporting to avoid conflicts)
import { cssPropertyUtils } from './cssProperties';
import { themeValidation, themePersistence } from './themeReducer';
import { createDefaultTheme, createDarkTheme } from './defaultTheme';

// Utility functions - this is a new export, not conflicting
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