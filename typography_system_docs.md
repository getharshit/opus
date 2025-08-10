# Typography System Documentation - Public Forms v2.0

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Font Management System](#font-management-system)
4. [Typography Scales](#typography-scales)
5. [CSS Generation System](#css-generation-system)
6. [Accessibility Features](#accessibility-features)
7. [Performance Optimization](#performance-optimization)
8. [Integration with Theme System](#integration-with-theme-system)
9. [API Reference](#api-reference)
10. [Usage Examples](#usage-examples)
11. [Migration Guide](#migration-guide)
12. [Best Practices](#best-practices)

---

## Overview

The Typography System is an advanced font and text management solution that integrates seamlessly with the Public Forms theme system. It provides sophisticated control over typography through mathematical scaling, Google Fonts integration, accessibility compliance, and performance optimization.

### Key Features

- **Advanced Typography Configuration**: Complete control over font families, sizes, weights, and spacing
- **Mathematical Scaling Systems**: Three predefined scales (small, medium, large) with custom scale generation
- **Google Fonts Integration**: Automatic font loading with fallback management
- **Accessibility Compliance**: WCAG 2.1 AA compliance with minimum size enforcement
- **Performance Optimization**: Smart font preloading, display strategies, and load timeouts
- **CSS Custom Properties**: Real-time CSS generation for seamless theme integration
- **Element-Specific Mapping**: 12 distinct form element types with individual typography controls

### Typography vs Basic Text Styling

The Typography System goes beyond basic font styling by providing:

- **Semantic Typography**: Element-specific font configurations (form titles, input text, error messages, etc.)
- **Mathematical Relationships**: Font sizes that maintain visual hierarchy through scaling ratios
- **Accessibility Integration**: Automatic minimum size enforcement and contrast validation
- **Performance Management**: Intelligent font loading with timeout handling
- **Responsive Behavior**: Automatic scaling across different screen sizes

---

## Architecture

The Typography System consists of several interconnected components:

```
Typography System
├── Font Management
│   ├── FontLoader - Google Fonts & system font loading
│   ├── FontPresets - Curated font collections
│   └── FontFallbackManager - Fallback font stacks
├── Typography Scales
│   ├── TypographyScaleGenerator - Mathematical scale generation
│   ├── ResponsiveTypography - Screen size adaptations
│   └── TypographyValidator - Accessibility validation
├── CSS Generation
│   ├── TypographyCSSGenerator - CSS custom properties
│   ├── TypographyCSSManager - Real-time CSS injection
│   └── defaultFormTypographyMapping - Element mappings
├── Integration Layer
│   ├── TypographyProvider - React context provider
│   ├── ThemeProvider integration - Seamless theme system integration
│   └── TypographyThemeUtils - Theme creation utilities
└── Configuration
    ├── TypographyConfig - Complete configuration interface
    ├── FormTypographyMapping - Element-specific settings
    └── Accessibility & Performance settings
```

### Component Responsibilities

**FontLoader**: Manages Google Fonts loading, system font detection, and loading state tracking
**TypographyScaleGenerator**: Creates mathematical typography scales with consistent ratios
**TypographyCSSGenerator**: Converts typography configurations to CSS custom properties
**TypographyProvider**: React context provider for typography state management
**ThemeProvider**: Enhanced theme provider with typography integration

---

## Font Management System

### Font Family Configuration

The system supports both system fonts and Google Fonts with comprehensive configuration:

```typescript
interface FontFamilyConfig {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  family: string;                // CSS font-family name
  fallbacks: string[];           // Fallback font stack
  weights: FontWeight[];         // Available weights
  googleFont?: {                 // Google Fonts configuration
    family: string;
    weights: FontWeight[];
    subsets: string[];
    display: FontDisplay;
  };
  preview: {
    text: string;                // Preview text
    size: number;                // Preview size
  };
}
```

### Font Categories

**System Fonts**: Native fonts that load instantly without network requests
- System UI, Georgia, Helvetica, Times New Roman, Courier New

**Google Fonts**: Web fonts loaded from Google Fonts API
- Sans Serif: Inter, Roboto, Open Sans, Lato, Nunito, Poppins, Montserrat
- Serif: Playfair Display, Merriweather, Lora
- Monospace: Fira Code, Source Code Pro

### Font Loading Strategies

**Preload Strategy**: Fonts are preloaded for better performance
```typescript
// Automatic preloading with performance settings
performance: {
  preloadFonts: true,
  fontDisplay: 'swap',      // CSS font-display value
  loadTimeout: 3000         // Maximum load time
}
```

**Fallback Management**: Comprehensive fallback system
```typescript
// Automatic fallback stack generation
const fontStack = FontFallbackManager.buildFontStack(
  'Inter', 
  'sansSerif'  // Category for appropriate fallbacks
);
// Results: 'Inter, Arial, Helvetica Neue, Helvetica, sans-serif'
```

**Loading State Tracking**: Real-time font loading status
```typescript
interface FontLoadingState {
  family: string;
  status: 'loading' | 'loaded' | 'error' | 'timeout';
  error?: string;
  loadTime?: number;
}
```

---

## Typography Scales

### Mathematical Scaling System

Typography scales create visual hierarchy through mathematical relationships:

```typescript
interface TypographyScale {
  id: string;
  name: string;
  baseSize: number;      // Base font size in pixels
  ratio: number;         // Scaling ratio (e.g., 1.25)
  sizes: {               // Generated font sizes
    xs: number;          // baseSize / ratio²
    sm: number;          // baseSize / ratio
    base: number;        // baseSize
    lg: number;          // baseSize * ratio
    xl: number;          // baseSize * ratio²
    '2xl': number;       // baseSize * ratio³
    '3xl': number;       // baseSize * ratio⁴
    '4xl': number;       // baseSize * ratio⁵
    '5xl': number;       // baseSize * ratio⁶
    '6xl': number;       // baseSize * ratio⁷
  };
  lineHeights: { /* calculated line heights */ };
  letterSpacing: { /* calculated letter spacing */ };
}
```

### Predefined Scales

**Small Scale** (14px base, 1.2 ratio): Conservative, compact typography
**Medium Scale** (16px base, 1.25 ratio): Balanced, versatile typography  
**Large Scale** (18px base, 1.333 ratio): Bold, accessible typography

### Custom Scale Generation

```typescript
// Generate custom typography scale
const customScale = TypographyScaleGenerator.generateScale(
  16,    // Base size in pixels
  1.414, // Augmented fourth ratio
  'custom-scale',
  'Custom Scale'
);
```

### Responsive Typography

Automatic scaling based on screen size:

```typescript
responsive: {
  enableScaling: true,
  breakpoints: {
    sm: 0.875,  // 87.5% on small screens
    md: 1.0,    // 100% on medium screens  
    lg: 1.125,  // 112.5% on large screens
  }
}
```

---

## CSS Generation System

### CSS Custom Properties Generation

The system generates comprehensive CSS custom properties for all typography values:

```typescript
// Generated CSS custom properties
:root {
  /* Font families */
  --form-font-primary: 'Inter, system-ui, sans-serif';
  --form-font-secondary: 'Inter, system-ui, sans-serif';
  --form-font-mono: 'Fira Code, Monaco, monospace';
  
  /* Element-specific font sizes */
  --form-font-size-form-title: 30px;
  --form-font-size-question-label: 16px;
  --form-font-size-input-text: 16px;
  --form-font-size-help-text: 12px;
  
  /* Line heights */
  --form-line-height-form-title: 1.3;
  --form-line-height-question-label: 1.5;
  
  /* Letter spacing */
  --form-letter-spacing-form-title: 0.005em;
  --form-letter-spacing-question-label: 0.015em;
  
  /* Font weights */
  --form-font-weight-form-title: 700;
  --form-font-weight-question-label: 500;
}
```

### Form Element Typography Mapping

The system provides element-specific typography configuration for 12 form elements:

1. **formTitle**: Main form heading
2. **formDescription**: Form description text
3. **sectionTitle**: Section headings
4. **questionLabel**: Question labels
5. **questionDescription**: Question help text
6. **inputText**: Input field text
7. **inputPlaceholder**: Placeholder text
8. **buttonText**: Button labels
9. **helpText**: Help/hint text
10. **errorText**: Error messages
11. **successText**: Success messages
12. **caption**: Small descriptive text
13. **legal**: Legal/terms text

### Real-time CSS Updates

```typescript
// CSS manager for real-time updates
const typographyCSSManager = TypographyCSSManager.getInstance();

// Apply new configuration
typographyCSSManager.applyConfiguration(typographyConfig);

// Generated utility classes
.form-text-question-label {
  font-family: var(--form-font-primary);
  font-size: var(--form-font-size-question-label);
  font-weight: var(--form-font-weight-question-label);
  line-height: var(--form-line-height-question-label);
  letter-spacing: var(--form-letter-spacing-question-label);
}
```

---

## Accessibility Features

### WCAG 2.1 AA Compliance

The typography system enforces accessibility standards:

```typescript
accessibility: {
  enforceMinSize: true,      // Enforce minimum font sizes
  minBodySize: 16,           // Minimum body text size (px)
  maxLineLength: 75,         // Maximum characters per line
  contrastRatio: 4.5         // Minimum contrast ratio
}
```

### Automatic Size Enforcement

```css
/* Generated accessibility CSS */
.form-text-input,
.form-text-question-label {
  font-size: max(var(--form-font-size-input-text), 16px);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .form-text-question-label {
    font-weight: var(--form-font-weight-question-label);
  }
}
```

### Typography Validation

```typescript
// Accessibility validation
const validation = TypographyValidator.validateScale(typographyScale);

interface TypographyValidationResult {
  isValid: boolean;
  errors: string[];         // WCAG violations
  warnings: string[];       // UX recommendations
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .form-text-animated {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Performance Optimization

### Font Loading Optimization

**Preload Strategy**: Critical fonts are preloaded for instant rendering
```html
<link rel="preload" href="fonts.googleapis.com/css2?family=Inter..." as="style">
```

**Font Display Strategy**: CSS font-display for optimal loading
```css
font-display: swap; /* Show fallback until custom font loads */
```

**Load Timeout Handling**: Configurable timeout for font loading
```typescript
performance: {
  loadTimeout: 3000,  // 3 seconds max load time
  fontDisplay: 'swap'
}
```

### CSS Optimization

**Debounced Updates**: CSS changes are batched to prevent layout thrashing
```typescript
const debouncedManager = new DebouncedCSSManager(16); // 60fps updates
```

**Selective Updates**: Only changed properties are updated
```typescript
// Update only typography-related properties
cssManager.updateProperties(typographyOnlyProps);
```

### Memory Management

**Font Cache Management**: Loaded fonts are cached to prevent re-loading
```typescript
// Clear font cache when needed
fontLoader.clearCache();
```

**Cleanup on Unmount**: Proper cleanup of CSS and event listeners
```typescript
useEffect(() => {
  return () => {
    typographyCSSManager.reset();
  };
}, []);
```

---

## Integration with Theme System

### Enhanced ThemeProvider

The ThemeProvider has been enhanced to support typography:

```typescript
<ThemeProvider 
  enableTypographySystem={true}
  onTypographyChange={(typography) => console.log('Typography updated')}
>
  <FormComponents />
</ThemeProvider>
```

### Typography State Management

Typography state is integrated into the theme reducer:

```typescript
interface ThemeState {
  currentTheme: Theme;
  // Typography-specific state
  typographyLoading: boolean;
  fontLoadingStates: Map<string, FontLoadingState>;
}

// Typography actions
type ThemeAction = 
  | { type: 'UPDATE_TYPOGRAPHY'; payload: Partial<TypographyConfig> }
  | { type: 'SET_FONT_LOADING_STATE'; payload: { fontFamily: string; state: FontLoadingState } }
  | { type: 'SET_TYPOGRAPHY_LOADING'; payload: boolean }
```

### Enhanced Theme Interface

```typescript
interface Theme {
  // Existing theme properties...
  typography: ThemeTypography;              // Basic typography (backward compatibility)
  advancedTypography?: TypographyConfig;    // Advanced typography configuration
}
```

---

## API Reference

### Core Hooks

#### useTypography()
Access typography configuration and management functions:

```typescript
const {
  config,                    // Current typography configuration
  fontLoadingStates,         // Font loading states
  updateConfig,              // Update typography configuration
  updateFontFamily,          // Update specific font family
  updateScale,               // Update typography scale
  validateConfig,            // Validate current configuration
  resetToDefaults            // Reset to default configuration
} = useTypography();
```

#### useTypographyUpdates()
Enhanced typography updates with validation:

```typescript
const {
  currentTypography,         // Current typography config
  updateTypography,          // Update with validation
  isLoading,                 // Loading state
  fontLoadingStates,         // Font loading map
  hasLoadingFonts,           // Any fonts currently loading
  hasUnsavedChanges          // Unsaved changes indicator
} = useTypographyUpdates();
```

#### useFontLoader()
Font loading management:

```typescript
const {
  loadFont,                  // Load specific font
  preloadFonts,              // Preload font array
  fontLoadingStates,         // All loading states
  isFontLoaded,              // Check if font is loaded
  getFontState               // Get specific font state
} = useFontLoader();
```

#### useTypographyScale()
Typography scale management:

```typescript
const {
  currentScale,              // Current scale configuration
  scaleType,                 // 'small' | 'medium' | 'large'
  updateScale,               // Update scale type
  availableScales            // Available scale options
} = useTypographyScale();
```

### Utility Functions

#### Font Management Utilities

```typescript
// Get all available fonts
const allFonts = FontPresetManager.getAllFonts();

// Search fonts by name
const searchResults = FontPresetManager.searchFonts('Inter');

// Get fonts by category
const serifFonts = FontPresetManager.getFontsByCategory('serif');

// Validate font availability
const isAvailable = await FontPresetManager.validateFontAvailability(fontConfig);
```

#### Typography Theme Utilities

```typescript
// Create typography-optimized theme
const formTheme = TypographyThemeUtils.createTypographyTheme({
  scale: 'medium',
  fonts: {
    primary: interFont,
    secondary: openSansFont
  },
  accessibility: {
    minBodySize: 16,
    contrastRatio: 4.5
  }
});

// Apply font combination
const themedFont = TypographyThemeUtils.applyFontCombination(theme, 'modern-clean');

// Validate accessibility
const validation = TypographyThemeUtils.validateTypographyAccessibility(theme);
```

#### Scale Generation

```typescript
// Generate custom scale
const customScale = TypographyScaleGenerator.generateScale(
  16,      // Base size
  1.414,   // Ratio (augmented fourth)
  'custom',
  'Custom Scale'
);

// Get recommended ratios
const ratios = TypographyScaleGenerator.getRecommendedRatios();
// { minorSecond: 1.067, majorThird: 1.25, goldenRatio: 1.618, ... }
```

### Configuration Interfaces

#### TypographyConfig
Complete typography configuration:

```typescript
interface TypographyConfig {
  scale: 'small' | 'medium' | 'large';
  customScale?: TypographyScale;
  primary: FontFamilyConfig;
  secondary: FontFamilyConfig;
  mono: FontFamilyConfig;
  mapping: FormTypographyMapping;
  responsive: {
    enableScaling: boolean;
    breakpoints: { sm: number; md: number; lg: number; };
  };
  accessibility: {
    enforceMinSize: boolean;
    minBodySize: number;
    maxLineLength: number;
    contrastRatio: number;
  };
  performance: {
    preloadFonts: boolean;
    fontDisplay: FontDisplay;
    loadTimeout: number;
  };
}
```

#### FormTypographyMapping
Element-specific typography configuration:

```typescript
interface FormTypographyMapping {
  formTitle: {
    fontSize: keyof TypographyScale['sizes'];
    lineHeight: keyof TypographyScale['lineHeights'];
    letterSpacing: keyof TypographyScale['letterSpacing'];
    fontWeight: FontWeight;
    fontFamily: 'primary' | 'secondary' | 'mono';
  };
  // ... configurations for all 12 form elements
}
```

---

## Usage Examples

### Basic Typography Setup

```typescript
import { ThemeProvider, TypographyProvider } from '@/components/public-form/themes';

function App() {
  return (
    <ThemeProvider enableTypographySystem={true}>
      <TypographyProvider>
        <FormComponents />
      </TypographyProvider>
    </ThemeProvider>
  );
}
```

### Custom Font Configuration

```typescript
import { useTypography } from '@/components/public-form/themes';

function FontSelector() {
  const { updateFontFamily } = useTypography();
  
  const handleFontChange = (fontId: string) => {
    const font = FontPresetManager.getFontById(fontId);
    if (font) {
      updateFontFamily('primary', font);
    }
  };
  
  return (
    <select onChange={(e) => handleFontChange(e.target.value)}>
      {FontPresetManager.getAllFonts().map(font => (
        <option key={font.id} value={font.id}>{font.name}</option>
      ))}
    </select>
  );
}
```

### Typography Scale Adjustment

```typescript
function ScaleSelector() {
  const { updateScale, scaleType } = useTypographyScale();
  
  return (
    <div>
      {(['small', 'medium', 'large'] as const).map(scale => (
        <button
          key={scale}
          onClick={() => updateScale(scale)}
          className={scaleType === scale ? 'active' : ''}
        >
          {scale.charAt(0).toUpperCase() + scale.slice(1)} Scale
        </button>
      ))}
    </div>
  );
}
```

### Accessibility Validation

```typescript
function AccessibilityChecker() {
  const { validateConfig } = useTypography();
  const [validation, setValidation] = useState(null);
  
  useEffect(() => {
    const result = validateConfig();
    setValidation(result);
  }, [validateConfig]);
  
  if (!validation) return <div>Validating...</div>;
  
  return (
    <div>
      <h3>Accessibility Status: {validation.isValid ? '✅ Compliant' : '⚠️ Issues Found'}</h3>
      {validation.errors.map(error => (
        <div key={error.field} className="error">
          {error.message}
        </div>
      ))}
      {validation.warnings.map(warning => (
        <div key={warning.field} className="warning">
          {warning.message}
        </div>
      ))}
    </div>
  );
}
```

### Font Loading State Display

```typescript
function FontLoadingIndicator() {
  const { fontLoadingStates, isLoadingFonts } = useFontLoader();
  
  if (!isLoadingFonts) return null;
  
  return (
    <div className="font-loading">
      <h4>Loading Fonts...</h4>
      {fontLoadingStates.map(state => (
        <div key={state.family} className={`font-status font-${state.status}`}>
          {state.family}: {state.status}
          {state.error && <span className="error"> - {state.error}</span>}
        </div>
      ))}
    </div>
  );
}
```

### Custom Typography Component

```typescript
function TypographyPreview() {
  const { config } = useTypography();
  const { getElementStyles } = useTypographyUtils();
  
  return (
    <div className="typography-preview">
      <h1 style={getElementStyles('formTitle')}>
        Form Title Preview
      </h1>
      <p style={getElementStyles('formDescription')}>
        This is how form descriptions will appear with current typography settings.
      </p>
      <label style={getElementStyles('questionLabel')}>
        Question Label Example
      </label>
      <input 
        style={getElementStyles('inputText')} 
        placeholder="Input text example"
      />
      <div style={getElementStyles('helpText')}>
        This is help text that appears below form fields.
      </div>
    </div>
  );
}
```

---

## Migration Guide

### Upgrading from Basic Typography

If your theme currently uses basic typography, you can upgrade to advanced typography:

```typescript
import { migrationHelpers } from '@/components/public-form/themes';

// Upgrade existing theme
const upgradedTheme = migrationHelpers.upgradeToAdvancedTypography(currentTheme);

// Check if migration is needed
const needsMigration = migrationHelpers.needsMigration(currentTheme);

// Get migration recommendations
const recommendations = migrationHelpers.getMigrationRecommendations(currentTheme);
```

### Breaking Changes

1. **Font Family Format**: Font families now use `FontFamilyConfig` objects instead of strings
2. **CSS Custom Properties**: New CSS custom properties for element-specific typography
3. **Scale Configuration**: Typography scales are now objects with mathematical relationships
4. **Theme Interface**: `advancedTypography` property is optional and separate from basic typography

### Backward Compatibility

The system maintains backward compatibility with basic typography:

```typescript
// Old approach (still works)
theme.typography.fontFamily = 'Inter, sans-serif';

// New approach (recommended)
theme.advancedTypography.primary = {
  id: 'inter',
  family: 'Inter',
  fallbacks: ['system-ui', 'sans-serif'],
  // ... additional configuration
};
```

---

## Best Practices

### Font Selection

1. **Performance First**: Use system fonts for maximum performance when possible
2. **Fallback Strategy**: Always provide comprehensive fallback stacks
3. **Google Fonts**: Limit to 2-3 font families to avoid performance impact
4. **Weight Loading**: Only load font weights you actually use

```typescript
// Good: Minimal weight loading
googleFont: {
  family: 'Inter',
  weights: [400, 600],  // Only regular and semibold
  subsets: ['latin'],
  display: 'swap'
}

// Avoid: Loading all weights
googleFont: {
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], // Too many
}
```

### Typography Scales

1. **Consistent Ratios**: Use established ratios (1.2, 1.25, 1.333) for proven visual hierarchy
2. **Base Size**: Start with 16px base size for accessibility
3. **Scale Validation**: Always validate scales for accessibility compliance

```typescript
// Recommended scale ratios
const ratios = {
  conservative: 1.2,    // Minor third - subtle differences
  balanced: 1.25,       // Major third - good all-around choice  
  bold: 1.333,          // Perfect fourth - strong hierarchy
  dramatic: 1.5         // Perfect fifth - very bold
};
```

### Accessibility

1. **Minimum Sizes**: Enforce 16px minimum for body text
2. **Contrast Ratios**: Maintain 4.5:1 minimum contrast ratio
3. **Line Length**: Keep lines under 75 characters for readability
4. **Testing**: Test with screen readers and keyboard navigation

```typescript
// Accessibility-first configuration
accessibility: {
  enforceMinSize: true,
  minBodySize: 16,        // WCAG AA minimum
  maxLineLength: 75,      // Optimal reading length
  contrastRatio: 4.5      // WCAG AA standard
}
```

### Performance

1. **Font Preloading**: Enable for critical fonts only
2. **Font Display**: Use 'swap' for better perceived performance
3. **Timeout Handling**: Set reasonable timeouts (3-5 seconds)
4. **Cleanup**: Properly cleanup fonts and CSS on component unmount

```typescript
// Performance-optimized configuration
performance: {
  preloadFonts: true,     // Only for critical fonts
  fontDisplay: 'swap',    // Better UX during loading
  loadTimeout: 3000       // 3 second timeout
}
```

### Development Workflow

1. **Start with Presets**: Use predefined font combinations and scales
2. **Validate Early**: Run accessibility validation during development
3. **Preview Testing**: Test typography across different screen sizes
4. **Performance Monitoring**: Monitor font loading performance

```typescript
// Development helper functions
if (process.env.NODE_ENV === 'development') {
  // Log typography performance
  const { getPerformanceMetrics } = useThemePerformance();
  console.log('Typography Performance:', getPerformanceMetrics());
  
  // Validate accessibility
  const validation = useTypographyValidation();
  if (!validation.isValid) {
    console.warn('Typography Accessibility Issues:', validation.errors);
  }
}
```

---

## Advanced Topics

### Custom Element Mapping

Create custom typography mappings for specialized form types:

```typescript
const customMapping: FormTypographyMapping = {
  ...defaultFormTypographyMapping,
  formTitle: {
    fontSize: '4xl',      // Larger than default
    lineHeight: '4xl',
    letterSpacing: '4xl',
    fontWeight: 800,      // Extra bold
    fontFamily: 'primary'
  }
};
```

### Dynamic Font Loading

Implement conditional font loading based on user preferences:

```typescript
const loadFontsConditionally = async () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connectionSpeed = (navigator as any).connection?.effectiveType;
  
  if (prefersReducedMotion || connectionSpeed === 'slow-2g') {
    // Use system fonts only
    return systemFonts;
  } else {
    // Load custom fonts
    return googleFonts;
  }
};
```

### Typography Analytics

Track typography performance and user experience:

```typescript
const trackTypographyMetrics = () => {
  const { fontLoadingStates } = useFontLoader();
  
  // Track font loading performance
  fontLoadingStates.forEach(state => {
    if (state.status === 'loaded' && state.loadTime) {
      analytics.track('font_loaded', {
        family: state.family,
        loadTime: state.loadTime
      });
    }
  });
};
```

---

## Troubleshooting

### Common Issues

#### Fonts Not Loading
```typescript
// Debug font loading issues
const debugFontLoading = async (font: FontFamilyConfig) => {
  console.log('Loading font:', font.family);
  
  try {
    const state = await fontLoader.loadFont(font);
    console.log('Font loaded successfully:', state);
  } catch (error) {
    console.error('Font loading failed:', error);
    
    // Check if it's a network issue
    const isOnline = navigator.onLine;
    console.log('Network status:', isOnline ? 'online' : 'offline');
    
    // Fallback to system font
    return systemFonts.find(f => f.family === 'system-ui');
  }
};
```

#### CSS Properties Not Applying
```typescript
// Debug CSS property generation
const debugCSSProperties = (config: TypographyConfig) => {
  const properties = TypographyCSSGenerator.generateCSSProperties(config);
  console.log('Generated CSS Properties:', properties);
  
  // Check if properties are in DOM
  const computedValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--form-font-primary');
  console.log('Applied CSS Property:', computedValue);
};
```

#### Performance Issues
```typescript
// Monitor typography performance
const monitorPerformance = () => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes('font')) {
        console.log('Font Performance:', entry);
      }
    }
  });
  
  observer.observe({ entryTypes: ['resource'] });
};
```

---

This documentation provides comprehensive coverage of the Typography System implementation. The system offers professional-grade typography control while maintaining accessibility standards and optimal performance. It seamlessly integrates with the existing theme system to provide a complete design solution for form applications.

For additional support or questions about the Typography System, refer to the main Public Forms documentation or contact the development team.