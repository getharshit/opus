// src/components/TypographyTest.tsx - Minimal Test Component

"use client";

import React, { useEffect, useState } from "react";

// Test the imports first
import {
  themeUtils,
  fontUtils,
  ThemeProvider,
  useTheme,
  themeCollections,
} from "@/components/public-form/themes";

// Simple test component that uses the theme
const ThemeTestContent: React.FC = () => {
  const { state } = useTheme();
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    const runTests = () => {
      const results: string[] = [];

      try {
        // Test 1: Basic theme creation
        const lightTheme = themeUtils.createLightTheme();
        results.push(`✅ Light theme created: ${lightTheme.name}`);
      } catch (error) {
        results.push(`❌ Light theme creation failed: ${error}`);
      }

      try {
        // Test 2: Dark theme creation
        const darkTheme = themeUtils.createDarkTheme();
        results.push(`✅ Dark theme created: ${darkTheme.name}`);
      } catch (error) {
        results.push(`❌ Dark theme creation failed: ${error}`);
      }

      try {
        // Test 3: Typography utilities
        const fontCombinations = fontUtils.getFontCombinations();
        results.push(
          `✅ Font combinations loaded: ${fontCombinations.length} combinations`
        );
      } catch (error) {
        results.push(`❌ Font combinations failed: ${error}`);
      }

      try {
        // Test 4: Theme collections
        const collections = themeCollections.basic;
        results.push(
          `✅ Theme collections loaded: ${
            Object.keys(collections).length
          } themes`
        );
      } catch (error) {
        results.push(`❌ Theme collections failed: ${error}`);
      }

      try {
        // Test 5: CSS generation
        const cssProps = themeUtils.generateCSS(state.currentTheme);
        const hasTypographyProps = Object.keys(cssProps).some((key) =>
          key.includes("font")
        );
        results.push(
          `✅ CSS generation works: ${
            hasTypographyProps ? "with typography" : "basic only"
          }`
        );
      } catch (error) {
        results.push(`❌ CSS generation failed: ${error}`);
      }

      try {
        // Test 6: Typography theme creation
        const formTheme = fontUtils.createFormTheme();
        results.push(`✅ Form theme created: ${formTheme.name}`);
      } catch (error) {
        results.push(`❌ Form theme creation failed: ${error}`);
      }

      setTestResults(results);
    };

    runTests();
  }, [state.currentTheme]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Typography Theme System Test</h1>

      {/* Current Theme Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Current Theme</h2>
        <div className="space-y-1 text-sm">
          <p>
            <strong>Name:</strong> {state.currentTheme.name}
          </p>
          <p>
            <strong>ID:</strong> {state.currentTheme.id}
          </p>
          <p>
            <strong>Dark Mode:</strong>{" "}
            {state.currentTheme.isDark ? "Yes" : "No"}
          </p>
          <p>
            <strong>Advanced Typography:</strong>{" "}
            {state.currentTheme.advancedTypography ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {/* Test Results */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Test Results</h2>
        <div className="space-y-1">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`text-sm p-2 rounded ${
                result.startsWith("✅")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {result}
            </div>
          ))}
        </div>
      </div>

      {/* Typography Demo */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Typography Demo</h2>
        <div className="space-y-3 p-4 border rounded-lg">
          <h1
            style={{
              fontFamily: "var(--form-font-family, system-ui)",
              fontSize: "var(--form-font-size-3xl, 1.875rem)",
              fontWeight: "var(--form-font-weight-bold, 700)",
            }}
          >
            Form Title (using CSS variables)
          </h1>

          <p
            style={{
              fontFamily: "var(--form-font-family, system-ui)",
              fontSize: "var(--form-font-size-base, 1rem)",
              color: "var(--form-color-text-secondary, #6B7280)",
            }}
          >
            Form description text using theme typography variables
          </p>

          <label
            style={{
              fontFamily: "var(--form-font-family, system-ui)",
              fontSize: "var(--form-font-size-sm, 0.875rem)",
              fontWeight: "var(--form-font-weight-medium, 500)",
            }}
          >
            Question Label
          </label>

          <input
            placeholder="Input field with theme styling"
            style={{
              fontFamily: "var(--form-font-family, system-ui)",
              fontSize: "var(--form-font-size-base, 1rem)",
              padding: "var(--form-spacing-sm, 0.75rem)",
              border: "1px solid var(--form-color-border, #E5E7EB)",
              borderRadius: "var(--form-border-radius-md, 0.375rem)",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            onClick={() => {
              try {
                const newTheme = themeUtils.createDarkTheme();
                console.log("Dark theme created:", newTheme);
              } catch (error) {
                console.error("Failed to create dark theme:", error);
              }
            }}
          >
            Test Dark Theme
          </button>

          <button
            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
            onClick={() => {
              try {
                const accessibleTheme = fontUtils.createAccessibilityTheme();
                console.log("Accessibility theme created:", accessibleTheme);
              } catch (error) {
                console.error("Failed to create accessibility theme:", error);
              }
            }}
          >
            Test Accessibility Theme
          </button>

          <button
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
            onClick={() => {
              try {
                const validation = themeUtils.validateTheme(state.currentTheme);
                console.log("Theme validation:", validation);
              } catch (error) {
                console.error("Failed to validate theme:", error);
              }
            }}
          >
            Test Validation
          </button>
        </div>
      </div>
    </div>
  );
};

// Main test component with ThemeProvider
const TypographyTest: React.FC = () => {
  return (
    <ThemeProvider
      enableTypographySystem={true}
      onThemeChange={(theme) => console.log("Theme changed:", theme.name)}
      onError={(error) => console.error("Theme error:", error)}
    >
      <ThemeTestContent />
    </ThemeProvider>
  );
};

export default TypographyTest;
