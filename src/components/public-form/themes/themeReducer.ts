// src/components/public-form/themes/themeReducer.ts

import { Theme, ThemeState, ThemeAction, ThemeValidationResult, ThemeValidationError } from './types';
import { defaultTheme } from './defaultTheme';

/**
 * Initial theme state
 */
export const initialThemeState: ThemeState = {
  currentTheme: defaultTheme,
  isLoading: false,
  error: null,
  previewMode: false,
  previewTheme: null,
  hasUnsavedChanges: false,
};

/**
 * Theme state reducer
 */
export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        currentTheme: action.payload,
        hasUnsavedChanges: false,
        error: null,
      };

    case 'UPDATE_THEME':
      return {
        ...state,
        currentTheme: {
          ...state.currentTheme,
          ...action.payload,
          updatedAt: new Date(),
        },
        hasUnsavedChanges: true,
        error: null,
      };

    case 'SET_PREVIEW_MODE':
      return {
        ...state,
        previewMode: action.payload,
        previewTheme: action.payload ? state.previewTheme : null,
      };

    case 'SET_PREVIEW_THEME':
      return {
        ...state,
        previewTheme: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'RESET_THEME':
      return {
        ...state,
        currentTheme: defaultTheme,
        hasUnsavedChanges: false,
        error: null,
        previewMode: false,
        previewTheme: null,
      };

    case 'SAVE_THEME':
      return {
        ...state,
        hasUnsavedChanges: false,
        error: null,
      };

    default:
      return state;
  }
};

/**
 * Theme validation utilities
 */
export const themeValidation = {
  /**
   * Validate complete theme object
   */
  validateTheme(theme: Partial<Theme>): ThemeValidationResult {
    const errors: ThemeValidationError[] = [];

    // Required fields
    if (!theme.id) {
      errors.push({ field: 'id', message: 'Theme ID is required' });
    }

    if (!theme.name) {
      errors.push({ field: 'name', message: 'Theme name is required' });
    }

    // Validate colors
    if (theme.colors) {
      const colorErrors = this.validateColors(theme.colors);
      errors.push(...colorErrors);
    }

    // Validate typography
    if (theme.typography) {
      const typographyErrors = this.validateTypography(theme.typography);
      errors.push(...typographyErrors);
    }

    // Validate spacing
    if (theme.spacing) {
      const spacingErrors = this.validateSpacing(theme.spacing);
      errors.push(...spacingErrors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate color values
   */
  validateColors(colors: any): ThemeValidationError[] {
    const errors: ThemeValidationError[] = [];
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\([\d\s,./]+\)$|^hsla?\([\d\s,%/]+\)$/;

    const colorFields = [
      'primary', 'primaryHover', 'primaryActive', 'primaryDisabled',
      'secondary', 'secondaryHover', 'secondaryActive',
      'background', 'surface', 'surfaceElevated',
      'textPrimary', 'textSecondary', 'textMuted', 'textInverse',
      'border', 'borderHover', 'borderFocus', 'borderError', 'borderSuccess',
      'error', 'errorHover', 'success', 'successHover',
      'warning', 'warningHover', 'info', 'infoHover'
    ];

    colorFields.forEach(field => {
      const value = colors[field];
      if (value && !colorRegex.test(value) && !value.startsWith('rgba(') && !value.startsWith('hsla(')) {
        errors.push({
          field: `colors.${field}`,
          message: `Invalid color format: ${value}`,
          value,
        });
      }
    });

    return errors;
  },

  /**
   * Validate typography values
   */
  validateTypography(typography: any): ThemeValidationError[] {
    const errors: ThemeValidationError[] = [];

    // Validate font sizes (should be positive numbers)
    const fontSizeFields = [
      'fontSizeXs', 'fontSizeSm', 'fontSizeBase', 'fontSizeLg',
      'fontSizeXl', 'fontSize2xl', 'fontSize3xl', 'fontSize4xl'
    ];

    fontSizeFields.forEach(field => {
      const value = typography[field];
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
        errors.push({
          field: `typography.${field}`,
          message: `Font size must be a positive number: ${value}`,
          value,
        });
      }
    });

    // Validate font weights (should be 100-900)
    const fontWeightFields = [
      'fontWeightLight', 'fontWeightNormal', 'fontWeightMedium',
      'fontWeightSemibold', 'fontWeightBold'
    ];

    fontWeightFields.forEach(field => {
      const value = typography[field];
      if (value !== undefined && (typeof value !== 'number' || value < 100 || value > 900)) {
        errors.push({
          field: `typography.${field}`,
          message: `Font weight must be between 100-900: ${value}`,
          value,
        });
      }
    });

    // Validate line heights (should be positive numbers)
    const lineHeightFields = [
      'lineHeightTight', 'lineHeightNormal', 'lineHeightRelaxed', 'lineHeightLoose'
    ];

    lineHeightFields.forEach(field => {
      const value = typography[field];
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
        errors.push({
          field: `typography.${field}`,
          message: `Line height must be a positive number: ${value}`,
          value,
        });
      }
    });

    return errors;
  },

  /**
   * Validate spacing values
   */
  validateSpacing(spacing: any): ThemeValidationError[] {
    const errors: ThemeValidationError[] = [];

    const spacingFields = [
      'unit', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'
    ];

    spacingFields.forEach(field => {
      const value = spacing[field];
      if (value !== undefined && (typeof value !== 'number' || value < 0)) {
        errors.push({
          field: `spacing.${field}`,
          message: `Spacing must be a non-negative number: ${value}`,
          value,
        });
      }
    });

    return errors;
  },
};

/**
 * Theme persistence utilities
 */
export const themePersistence = {
  /**
   * Save theme to localStorage
   */
  saveTheme(theme: Theme, key: string = 'form-theme'): void {
    try {
      const serialized = JSON.stringify({
        ...theme,
        createdAt: theme.createdAt.toISOString(),
        updatedAt: theme.updatedAt.toISOString(),
      });
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
      throw new Error('Failed to save theme');
    }
  },

  /**
   * Load theme from localStorage
   */
  loadTheme(key: string = 'form-theme'): Theme | null {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      
      // Convert date strings back to Date objects
      return {
        ...parsed,
        createdAt: new Date(parsed.createdAt),
        updatedAt: new Date(parsed.updatedAt),
      };
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
      return null;
    }
  },

  /**
   * Remove theme from localStorage
   */
  removeTheme(key: string = 'form-theme'): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove theme from localStorage:', error);
    }
  },

  /**
   * Check if localStorage is available
   */
  isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Get all saved themes
   */
  getAllThemes(): Record<string, Theme> {
    const themes: Record<string, Theme> = {};
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('form-theme-')) {
          const theme = this.loadTheme(key);
          if (theme) {
            themes[theme.id] = theme;
          }
        }
      }
    } catch (error) {
      console.error('Failed to load themes from localStorage:', error);
    }
    
    return themes;
  },

  /**
   * Save theme with unique key
   */
  saveThemeWithId(theme: Theme): void {
    const key = `form-theme-${theme.id}`;
    this.saveTheme(theme, key);
  },

  /**
   * Load theme by ID
   */
  loadThemeById(themeId: string): Theme | null {
    const key = `form-theme-${themeId}`;
    return this.loadTheme(key);
  },

  /**
   * Delete theme by ID
   */
  deleteThemeById(themeId: string): void {
    const key = `form-theme-${themeId}`;
    this.removeTheme(key);
  },
};

/**
 * Theme action creators
 */
export const themeActions = {
  setTheme: (theme: Theme): ThemeAction => ({
    type: 'SET_THEME',
    payload: theme,
  }),

  updateTheme: (updates: Partial<Theme>): ThemeAction => ({
    type: 'UPDATE_THEME',
    payload: updates,
  }),

  setPreviewMode: (enabled: boolean): ThemeAction => ({
    type: 'SET_PREVIEW_MODE',
    payload: enabled,
  }),

  setPreviewTheme: (theme: Theme | null): ThemeAction => ({
    type: 'SET_PREVIEW_THEME',
    payload: theme,
  }),

  setLoading: (loading: boolean): ThemeAction => ({
    type: 'SET_LOADING',
    payload: loading,
  }),

  setError: (error: string | null): ThemeAction => ({
    type: 'SET_ERROR',
    payload: error,
  }),

  resetTheme: (): ThemeAction => ({
    type: 'RESET_THEME',
  }),

  saveTheme: (): ThemeAction => ({
    type: 'SAVE_THEME',
  }),
};