// src/components/public-form/themes/themeReducer.ts - Clean Version

import { Theme, ThemeState, ThemeAction, ThemeValidationResult, ThemeValidationError } from './types';
import { TypographyConfig } from './typography/types';
import { defaultTheme } from './defaultTheme';

/**
 * Initial theme state with typography support
 */
export const initialThemeState: ThemeState = {
  currentTheme: defaultTheme,
  isLoading: false,
  error: null,
  previewMode: false,
  previewTheme: null,
  hasUnsavedChanges: false,
  // Typography-specific state
  typographyLoading: false,
  fontLoadingStates: new Map(),
};

/**
 * Enhanced theme state reducer with typography support
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

    case 'UPDATE_TYPOGRAPHY':
      if (!state.currentTheme.advancedTypography) {
        // If no advanced typography exists, we can't update it
        return {
          ...state,
          error: 'Cannot update typography: No advanced typography configuration found',
        };
      }
      
      return {
        ...state,
        currentTheme: {
          ...state.currentTheme,
          advancedTypography: {
            ...state.currentTheme.advancedTypography,
            ...action.payload,
          },
          // Update basic typography for backward compatibility if font changes
          typography: action.payload.primary ? {
            ...state.currentTheme.typography,
            fontFamily: [
              action.payload.primary.family,
              ...action.payload.primary.fallbacks
            ].join(', '),
            fontFamilyMono: action.payload.mono ? [
              action.payload.mono.family,
              ...action.payload.mono.fallbacks
            ].join(', ') : state.currentTheme.typography.fontFamilyMono,
          } : state.currentTheme.typography,
          updatedAt: new Date(),
        },
        hasUnsavedChanges: true,
        error: null,
      };

    case 'SET_FONT_LOADING_STATE':
      const newFontLoadingStates = new Map(state.fontLoadingStates);
      newFontLoadingStates.set(action.payload.fontFamily, action.payload.state);
      return {
        ...state,
        fontLoadingStates: newFontLoadingStates,
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

    case 'SET_TYPOGRAPHY_LOADING':
      return {
        ...state,
        typographyLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        typographyLoading: false,
      };

    case 'RESET_THEME':
      return {
        ...state,
        currentTheme: defaultTheme,
        hasUnsavedChanges: false,
        error: null,
        previewMode: false,
        previewTheme: null,
        fontLoadingStates: new Map(),
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
 * Enhanced theme validation utilities with typography support
 */
export const themeValidation = {
  /**
   * Validate complete theme object with typography
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
      const colorErrors = validateColors(theme.colors);
      errors.push(...colorErrors);
    }

    // Validate basic typography
    if (theme.typography) {
      const typographyErrors = validateBasicTypography(theme.typography);
      errors.push(...typographyErrors);
    }

    // Validate advanced typography
    if (theme.advancedTypography) {
      const advancedTypographyErrors = validateAdvancedTypography(theme.advancedTypography);
      errors.push(...advancedTypographyErrors);
    }

    // Validate spacing
    if (theme.spacing) {
      const spacingErrors = validateSpacing(theme.spacing);
      errors.push(...spacingErrors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

/**
 * Validate color values - standalone function
 */
function validateColors(colors: any): ThemeValidationError[] {
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
}

/**
 * Validate basic typography values - standalone function
 */
function validateBasicTypography(typography: any): ThemeValidationError[] {
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

  return errors;
}

/**
 * Validate advanced typography configuration - standalone function
 */
function validateAdvancedTypography(advancedTypography: TypographyConfig): ThemeValidationError[] {
  const errors: ThemeValidationError[] = [];

  // Validate font family configurations
  if (!advancedTypography.primary?.family) {
    errors.push({
      field: 'advancedTypography.primary.family',
      message: 'Primary font family is required',
    });
  }

  if (!advancedTypography.secondary?.family) {
    errors.push({
      field: 'advancedTypography.secondary.family',
      message: 'Secondary font family is required',
    });
  }

  if (!advancedTypography.mono?.family) {
    errors.push({
      field: 'advancedTypography.mono.family',
      message: 'Monospace font family is required',
    });
  }

  // Validate accessibility settings
  if (advancedTypography.accessibility) {
    if (advancedTypography.accessibility.minBodySize < 12) {
      errors.push({
        field: 'advancedTypography.accessibility.minBodySize',
        message: 'Minimum body size should be at least 12px',
        value: advancedTypography.accessibility.minBodySize,
      });
    }

    if (advancedTypography.accessibility.contrastRatio < 3.0) {
      errors.push({
        field: 'advancedTypography.accessibility.contrastRatio',
        message: 'Contrast ratio should be at least 3.0 for accessibility',
        value: advancedTypography.accessibility.contrastRatio,
      });
    }
  }

  return errors;
}

/**
 * Validate spacing values - standalone function
 */
function validateSpacing(spacing: any): ThemeValidationError[] {
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
};

/**
 * Enhanced theme persistence utilities with typography support
 */
export const themePersistence = {
  /**
   * Save theme to localStorage with typography data
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
   * Load theme from localStorage with typography data
   */
  loadTheme(key: string = 'form-theme'): Theme | null {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      
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

  /**
   * Export theme as JSON string
   */
  exportTheme(theme: Theme): string {
    return JSON.stringify({
      ...theme,
      createdAt: theme.createdAt.toISOString(),
      updatedAt: theme.updatedAt.toISOString(),
    }, null, 2);
  },

  /**
   * Import theme from JSON string
   */
  importTheme(themeJson: string): Theme | null {
    try {
      const parsed = JSON.parse(themeJson);
      const theme: Theme = {
        ...parsed,
        createdAt: new Date(parsed.createdAt),
        updatedAt: new Date(parsed.updatedAt),
      };

      // Validate imported theme
      const validation = themeValidation.validateTheme(theme);
      if (!validation.isValid) {
        console.error('Invalid theme import:', validation.errors);
        return null;
      }

      return theme;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return null;
    }
  },
};

/**
 * Enhanced theme action creators with typography support
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

  updateTypography: (updates: Partial<TypographyConfig>): ThemeAction => {
    // Validate that we have at least some valid typography data
    if (!updates || Object.keys(updates).length === 0) {
      throw new Error('Typography updates cannot be empty');
    }
    
    return {
      type: 'UPDATE_TYPOGRAPHY',
      payload: updates,
    };
  },

  setFontLoadingState: (fontFamily: string, state: 'loading' | 'loaded' | 'error'): ThemeAction => ({
    type: 'SET_FONT_LOADING_STATE',
    payload: { fontFamily, state },
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

  setTypographyLoading: (loading: boolean): ThemeAction => ({
    type: 'SET_TYPOGRAPHY_LOADING',
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