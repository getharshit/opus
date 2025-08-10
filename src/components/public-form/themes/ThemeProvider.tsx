// src/components/public-form/themes/ThemeProvider.tsx - Updated with Typography Integration

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
import { TypographyConfig } from "./typography/types";
import { fontLoader } from "./typography/fontLoader";
import { typographyCSSManager } from "./typography/cssGenerator";

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

// Enhanced theme provider props with typography support
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
  persistenceKey?: string;
  enablePersistence?: boolean;
  enablePreview?: boolean;
  enableTypographySystem?: boolean; // NEW
  onThemeChange?: (theme: Theme) => void;
  onTypographyChange?: (typography: TypographyConfig) => void; // NEW
  onError?: (error: string) => void;
}

// Enhanced theme provider component with typography integration
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
  persistenceKey = "form-theme",
  enablePersistence = true,
  enablePreview = true,
  enableTypographySystem = true,
  onThemeChange,
  onTypographyChange,
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

        // Apply typography CSS if advanced typography is enabled
        if (enableTypographySystem && activeTheme.advancedTypography) {
          typographyCSSManager.applyConfiguration(
            activeTheme.advancedTypography
          );
        }

        // Notify parent of theme change
        onThemeChange?.(activeTheme);
        if (activeTheme.advancedTypography) {
          onTypographyChange?.(activeTheme.advancedTypography);
        }
      } catch (error) {
        console.error("Failed to apply theme CSS:", error);
        onError?.("Failed to apply theme styles");
      }
    }
  }, [
    state.currentTheme,
    state.previewMode,
    state.previewTheme,
    enableTypographySystem,
    onThemeChange,
    onTypographyChange,
    onError,
  ]);

  // Handle font loading when typography changes
  useEffect(() => {
    if (!enableTypographySystem || !state.currentTheme.advancedTypography) {
      return;
    }

    const { primary, secondary, mono, performance } =
      state.currentTheme.advancedTypography;

    if (performance.preloadFonts) {
      const fontsToLoad = [primary, secondary, mono].filter(
        (font) => font.googleFont
      );

      if (fontsToLoad.length > 0) {
        dispatch(themeActions.setTypographyLoading(true));

        // Load fonts and track their states
        fontsToLoad.forEach(async (font) => {
          try {
            dispatch(themeActions.setFontLoadingState(font.family, "loading"));
            await fontLoader.loadFont(font);
            dispatch(themeActions.setFontLoadingState(font.family, "loaded"));
          } catch (error) {
            console.error(`Failed to load font ${font.family}:`, error);
            dispatch(themeActions.setFontLoadingState(font.family, "error"));
          }
        });

        // Wait for all fonts or timeout
        Promise.allSettled(
          fontsToLoad.map((font) => fontLoader.loadFont(font))
        ).finally(() => {
          dispatch(themeActions.setTypographyLoading(false));
        });
      }
    }
  }, [enableTypographySystem, state.currentTheme.advancedTypography]);

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

  // NEW: Typography management functions
  const updateTypography = useCallback(
    (updates: Partial<TypographyConfig>) => {
      if (!enableTypographySystem) {
        console.warn("Typography system is disabled");
        return;
      }

      const currentTypography = state.currentTheme.advancedTypography;
      if (!currentTypography) {
        console.warn("No advanced typography configuration found");
        return;
      }

      const updatedTypography = { ...currentTypography, ...updates };

      // Validate typography updates
      try {
        dispatch(themeActions.updateTypography(updatedTypography));
      } catch (error) {
        const errorMessage = `Failed to update typography: ${error}`;
        dispatch(themeActions.setError(errorMessage));
        onError?.(errorMessage);
      }
    },
    [enableTypographySystem, state.currentTheme.advancedTypography, onError]
  );

  const resetTypography = useCallback(() => {
    if (!enableTypographySystem) return;

    const defaultTypography = defaultTheme.advancedTypography;
    if (defaultTypography) {
      updateTypography(defaultTypography);
    }
  }, [enableTypographySystem, updateTypography]);

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

  // Enhanced context value with typography support
  const contextValue: ThemeContextValue = useMemo(
    () => ({
      // Current state
      state,

      // Theme management
      setTheme,
      updateTheme,
      resetTheme,

      // Typography management (NEW)
      updateTypography,
      resetTypography,

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
      updateTypography,
      resetTypography,
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
      // Cleanup typography CSS if enabled
      if (enableTypographySystem) {
        typographyCSSManager.reset();
      }
    };
  }, [enableTypographySystem]);

  return (
    <ThemeErrorBoundary>
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </ThemeErrorBoundary>
  );
};

// Enhanced higher-order component for theme injection with typography
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

// Enhanced hook for theme updates with validation
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

// NEW: Hook for typography management
export const useTypographyUpdates = () => {
  const { state, updateTypography } = useTheme();

  const currentTypography = state.currentTheme.advancedTypography;
  const isLoading = state.typographyLoading;
  const fontLoadingStates = state.fontLoadingStates;

  const updateTypographyWithValidation = useCallback(
    (updates: Partial<TypographyConfig>) => {
      try {
        updateTypography(updates);
        return { success: true, errors: [] };
      } catch (error) {
        return {
          success: false,
          errors: [
            {
              field: "typography",
              message: error instanceof Error ? error.message : "Unknown error",
            },
          ],
        };
      }
    },
    [updateTypography]
  );

  // Get font loading state for a specific font
  const getFontLoadingState = useCallback(
    (fontFamily: string) => {
      return fontLoadingStates.get(fontFamily) || "loaded";
    },
    [fontLoadingStates]
  );

  // Check if any fonts are currently loading
  const hasLoadingFonts = useMemo(() => {
    return Array.from(fontLoadingStates.values()).some(
      (state) => state === "loading"
    );
  }, [fontLoadingStates]);

  return {
    currentTypography,
    updateTypography: updateTypographyWithValidation,
    isLoading,
    fontLoadingStates,
    getFontLoadingState,
    hasLoadingFonts,
    hasUnsavedChanges: state.hasUnsavedChanges,
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

// Enhanced hook for responsive design with theme breakpoints
export const useThemeBreakpoints = () => {
  const theme = useCurrentTheme();

  return useMemo(
    () => ({
      breakpoints: theme.breakpoints,
      isMobile:
        typeof window !== "undefined"
          ? window.matchMedia(`(max-width: ${theme.breakpoints.sm})`).matches
          : false,
      isTablet:
        typeof window !== "undefined"
          ? window.matchMedia(
              `(min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.lg})`
            ).matches
          : false,
      isDesktop:
        typeof window !== "undefined"
          ? window.matchMedia(`(min-width: ${theme.breakpoints.lg})`).matches
          : false,
    }),
    [theme.breakpoints]
  );
};

// NEW: Hook for typography-specific utilities
export const useTypographyUtils = () => {
  const theme = useCurrentTheme();
  const { state } = useTheme();

  const getElementStyles = useCallback(
    (elementType: string) => {
      if (!theme.advancedTypography) return {};

      // Return CSS custom properties for the element type
      return {
        fontFamily: `var(--form-font-primary)`,
        fontSize: `var(--form-font-size-${elementType
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()})`,
        fontWeight: `var(--form-font-weight-${elementType
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()})`,
        lineHeight: `var(--form-line-height-${elementType
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()})`,
        letterSpacing: `var(--form-letter-spacing-${elementType
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()})`,
      };
    },
    [theme.advancedTypography]
  );

  const isTypographyLoaded = useMemo(() => {
    if (!theme.advancedTypography) return true;

    const fonts = [
      theme.advancedTypography.primary,
      theme.advancedTypography.secondary,
      theme.advancedTypography.mono,
    ].filter((font) => font.googleFont);

    if (fonts.length === 0) return true;

    return fonts.every(
      (font) => state.fontLoadingStates.get(font.family) === "loaded"
    );
  }, [theme.advancedTypography, state.fontLoadingStates]);

  return {
    getElementStyles,
    isTypographyLoaded,
    hasAdvancedTypography: !!theme.advancedTypography,
    currentScale: theme.advancedTypography?.scale || "medium",
  };
};

// Performance monitoring hook with typography metrics
export const useThemePerformance = () => {
  const performanceRef = useRef({
    themeChanges: 0,
    typographyChanges: 0,
    fontLoads: 0,
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

  // Track typography-specific changes
  useEffect(() => {
    performanceRef.current.typographyChanges++;
  }, [state.currentTheme.advancedTypography]);

  // Track font loading
  useEffect(() => {
    const loadedFonts = Array.from(state.fontLoadingStates.values()).filter(
      (state) => state === "loaded"
    ).length;
    performanceRef.current.fontLoads = loadedFonts;
  }, [state.fontLoadingStates]);

  return {
    themeChanges: performanceRef.current.themeChanges,
    typographyChanges: performanceRef.current.typographyChanges,
    fontLoads: performanceRef.current.fontLoads,
    averageChangeTime: performanceRef.current.averageChangeTime,
    getPerformanceMetrics: () => ({ ...performanceRef.current }),
  };
};
