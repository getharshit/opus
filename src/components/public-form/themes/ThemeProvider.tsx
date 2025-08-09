// src/components/public-form/themes/ThemeProvider.tsx

"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  Theme,
  ThemeState,
  ThemeContextValue,
  ThemeValidationResult,
  CSSCustomProperties,
} from "./types";
import {
  themeReducer,
  initialThemeState,
  themeValidation,
  themePersistence,
  themeActions,
} from "./themeReducer";
import { cssPropertyUtils, DebouncedCSSManager } from "./cssProperties";
import { defaultTheme } from "./defaultTheme";

// Theme context
const ThemeContext = createContext<ThemeContextValue | null>(null);

// Custom hook to use theme context
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Error boundary for theme-related errors
interface ThemeErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ThemeErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ThemeErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ThemeErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Theme system error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="theme-error-boundary p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-medium mb-2">Theme System Error</h3>
          <p className="text-red-600 text-sm mb-3">
            The theme system encountered an error. Using default theme.
          </p>
          <button
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Reset Theme
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
  persistenceKey?: string;
  enablePersistence?: boolean;
  enablePreview?: boolean;
  onThemeChange?: (theme: Theme) => void;
  onError?: (error: string) => void;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
  persistenceKey = "form-theme",
  enablePersistence = true,
  enablePreview = true,
  onThemeChange,
  onError,
}) => {
  // State management
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);

  // CSS manager with debouncing
  const cssManager = useRef<DebouncedCSSManager>();
  const isInitialized = useRef(false);

  // Initialize CSS manager
  useEffect(() => {
    cssManager.current = new DebouncedCSSManager(16); // 60fps updates
  }, []);

  // Load persisted theme on mount
  useEffect(() => {
    if (!isInitialized.current && enablePersistence) {
      try {
        const persistedTheme = themePersistence.loadTheme(persistenceKey);
        if (persistedTheme) {
          dispatch(themeActions.setTheme(persistedTheme));
        } else if (initialTheme) {
          dispatch(themeActions.setTheme(initialTheme));
        }
      } catch (error) {
        console.error("Failed to load persisted theme:", error);
        onError?.("Failed to load saved theme");
        if (initialTheme) {
          dispatch(themeActions.setTheme(initialTheme));
        }
      }
      isInitialized.current = true;
    }
  }, [enablePersistence, persistenceKey, initialTheme, onError]);

  // Apply CSS properties when theme changes
  useEffect(() => {
    const activeTheme =
      state.previewMode && state.previewTheme
        ? state.previewTheme
        : state.currentTheme;

    if (cssManager.current && activeTheme) {
      try {
        const cssProperties = cssPropertyUtils.themeToCSS(activeTheme);
        cssManager.current.applyProperties(cssProperties);

        // Notify parent of theme change
        onThemeChange?.(activeTheme);
      } catch (error) {
        console.error("Failed to apply theme CSS:", error);
        onError?.("Failed to apply theme styles");
      }
    }
  }, [
    state.currentTheme,
    state.previewMode,
    state.previewTheme,
    onThemeChange,
    onError,
  ]);

  // Save theme when it changes (debounced)
  const saveThemeToStorage = useCallback(
    (theme: Theme) => {
      if (!enablePersistence) return;

      try {
        themePersistence.saveTheme(theme, persistenceKey);
      } catch (error) {
        console.error("Failed to save theme:", error);
        onError?.("Failed to save theme");
      }
    },
    [enablePersistence, persistenceKey, onError]
  );

  // Debounced save effect
  useEffect(() => {
    if (state.hasUnsavedChanges && !state.previewMode) {
      const timeoutId = setTimeout(() => {
        saveThemeToStorage(state.currentTheme);
        dispatch(themeActions.saveTheme());
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [
    state.hasUnsavedChanges,
    state.previewMode,
    state.currentTheme,
    saveThemeToStorage,
  ]);

  // Theme management functions
  const setTheme = useCallback(
    (theme: Theme) => {
      const validation = themeValidation.validateTheme(theme);
      if (!validation.isValid) {
        const errorMessage = `Invalid theme: ${validation.errors
          .map((e) => e.message)
          .join(", ")}`;
        dispatch(themeActions.setError(errorMessage));
        onError?.(errorMessage);
        return;
      }

      dispatch(themeActions.setTheme(theme));
    },
    [onError]
  );

  const updateTheme = useCallback(
    (updates: Partial<Theme>) => {
      const updatedTheme = { ...state.currentTheme, ...updates };
      const validation = themeValidation.validateTheme(updatedTheme);

      if (!validation.isValid) {
        const errorMessage = `Invalid theme update: ${validation.errors
          .map((e) => e.message)
          .join(", ")}`;
        dispatch(themeActions.setError(errorMessage));
        onError?.(errorMessage);
        return;
      }

      dispatch(themeActions.updateTheme(updates));
    },
    [state.currentTheme, onError]
  );

  const resetTheme = useCallback(() => {
    dispatch(themeActions.resetTheme());
    if (enablePersistence) {
      themePersistence.removeTheme(persistenceKey);
    }
  }, [enablePersistence, persistenceKey]);

  // Preview mode functions
  const enablePreviewMode = useCallback(
    (theme: Theme) => {
      if (!enablePreview) return;

      const validation = themeValidation.validateTheme(theme);
      if (!validation.isValid) {
        const errorMessage = `Invalid preview theme: ${validation.errors
          .map((e) => e.message)
          .join(", ")}`;
        onError?.(errorMessage);
        return;
      }

      dispatch(themeActions.setPreviewTheme(theme));
      dispatch(themeActions.setPreviewMode(true));
    },
    [enablePreview, onError]
  );

  const disablePreviewMode = useCallback(() => {
    dispatch(themeActions.setPreviewMode(false));
    dispatch(themeActions.setPreviewTheme(null));
  }, []);

  const commitPreview = useCallback(() => {
    if (state.previewTheme) {
      dispatch(themeActions.setTheme(state.previewTheme));
      dispatch(themeActions.setPreviewMode(false));
      dispatch(themeActions.setPreviewTheme(null));
    }
  }, [state.previewTheme]);

  // Persistence functions
  const saveTheme = useCallback(async () => {
    if (!enablePersistence) return;

    dispatch(themeActions.setLoading(true));
    try {
      saveThemeToStorage(state.currentTheme);
      dispatch(themeActions.saveTheme());
    } catch (error) {
      const errorMessage = "Failed to save theme";
      dispatch(themeActions.setError(errorMessage));
      onError?.(errorMessage);
    } finally {
      dispatch(themeActions.setLoading(false));
    }
  }, [enablePersistence, state.currentTheme, saveThemeToStorage, onError]);

  const loadTheme = useCallback(
    async (themeId: string) => {
      if (!enablePersistence) return;

      dispatch(themeActions.setLoading(true));
      try {
        const theme = themePersistence.loadThemeById(themeId);
        if (theme) {
          dispatch(themeActions.setTheme(theme));
        } else {
          throw new Error(`Theme with ID "${themeId}" not found`);
        }
      } catch (error) {
        const errorMessage = `Failed to load theme: ${error}`;
        dispatch(themeActions.setError(errorMessage));
        onError?.(errorMessage);
      } finally {
        dispatch(themeActions.setLoading(false));
      }
    },
    [enablePersistence, onError]
  );

  // Utility functions
  const validateTheme = useCallback(
    (theme: Partial<Theme>): ThemeValidationResult => {
      return themeValidation.validateTheme(theme);
    },
    []
  );

  const generateCSSProperties = useCallback(
    (theme: Theme): CSSCustomProperties => {
      return cssPropertyUtils.themeToCSS(theme);
    },
    []
  );

  const clearError = useCallback(() => {
    dispatch(themeActions.setError(null));
  }, []);

  // Context value
  const contextValue: ThemeContextValue = useMemo(
    () => ({
      // Current state
      state,

      // Theme management
      setTheme,
      updateTheme,
      resetTheme,

      // Preview mode
      enablePreviewMode,
      disablePreviewMode,
      commitPreview,

      // Persistence
      saveTheme,
      loadTheme,

      // Utilities
      validateTheme,
      generateCSSProperties,

      // Error handling
      clearError,
    }),
    [
      state,
      setTheme,
      updateTheme,
      resetTheme,
      enablePreviewMode,
      disablePreviewMode,
      commitPreview,
      saveTheme,
      loadTheme,
      validateTheme,
      generateCSSProperties,
      clearError,
    ]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cssManager.current) {
        cssManager.current.flush();
      }
    };
  }, []);

  return (
    <ThemeErrorBoundary>
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </ThemeErrorBoundary>
  );
};

// Higher-order component for theme injection
export const withTheme = <P extends object>(
  Component: React.ComponentType<P & { theme: Theme }>
) => {
  const WithThemeComponent = (props: P) => {
    const { state } = useTheme();
    const activeTheme =
      state.previewMode && state.previewTheme
        ? state.previewTheme
        : state.currentTheme;

    return <Component {...props} theme={activeTheme} />;
  };

  WithThemeComponent.displayName = `withTheme(${
    Component.displayName || Component.name
  })`;
  return WithThemeComponent;
};

// Hook for accessing current theme
export const useCurrentTheme = (): Theme => {
  const { state } = useTheme();
  return state.previewMode && state.previewTheme
    ? state.previewTheme
    : state.currentTheme;
};

// Hook for theme updates with validation
export const useThemeUpdates = () => {
  const { updateTheme, validateTheme, state } = useTheme();

  const updateWithValidation = useCallback(
    (updates: Partial<Theme>) => {
      const mergedTheme = { ...state.currentTheme, ...updates };
      const validation = validateTheme(mergedTheme);

      if (validation.isValid) {
        updateTheme(updates);
        return { success: true, errors: [] };
      } else {
        return { success: false, errors: validation.errors };
      }
    },
    [updateTheme, validateTheme, state.currentTheme]
  );

  return {
    updateTheme: updateWithValidation,
    hasUnsavedChanges: state.hasUnsavedChanges,
    isLoading: state.isLoading,
    error: state.error,
  };
};

// Hook for preview mode
export const useThemePreview = () => {
  const { state, enablePreviewMode, disablePreviewMode, commitPreview } =
    useTheme();

  return {
    isPreviewMode: state.previewMode,
    previewTheme: state.previewTheme,
    enablePreview: enablePreviewMode,
    disablePreview: disablePreviewMode,
    commitPreview,
  };
};

// Hook for CSS properties
export const useCSSProperties = (): CSSCustomProperties => {
  const theme = useCurrentTheme();
  return useMemo(() => cssPropertyUtils.themeToCSS(theme), [theme]);
};

// Hook for responsive design with theme breakpoints
export const useThemeBreakpoints = () => {
  const theme = useCurrentTheme();

  return useMemo(
    () => ({
      breakpoints: theme.breakpoints,
      isMobile: window.matchMedia(`(max-width: ${theme.breakpoints.sm})`)
        .matches,
      isTablet: window.matchMedia(
        `(min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.lg})`
      ).matches,
      isDesktop: window.matchMedia(`(min-width: ${theme.breakpoints.lg})`)
        .matches,
    }),
    [theme.breakpoints]
  );
};

// Performance monitoring hook
export const useThemePerformance = () => {
  const performanceRef = useRef({
    themeChanges: 0,
    lastChangeTime: Date.now(),
    averageChangeTime: 0,
  });

  const { state } = useTheme();

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastChange = now - performanceRef.current.lastChangeTime;

    performanceRef.current.themeChanges++;
    performanceRef.current.averageChangeTime =
      (performanceRef.current.averageChangeTime + timeSinceLastChange) / 2;
    performanceRef.current.lastChangeTime = now;

    // Log performance warning if theme changes are too frequent
    if (timeSinceLastChange < 16) {
      // Less than one frame at 60fps
      console.warn(
        "Theme changes are happening too frequently, consider debouncing"
      );
    }
  }, [state.currentTheme, state.previewTheme]);

  return {
    themeChanges: performanceRef.current.themeChanges,
    averageChangeTime: performanceRef.current.averageChangeTime,
    getPerformanceMetrics: () => ({ ...performanceRef.current }),
  };
};
