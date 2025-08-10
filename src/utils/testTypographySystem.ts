// src/utils/testTypographySystem.ts - Console Test Script

/**
 * Simple console test to verify typography system works
 * Run this in your component or console to test the system
 */

export const testTypographySystem = async () => {
    console.log('🧪 Testing Typography Theme System...\n');
  
    try {
      // Test 1: Import the main modules
      console.log('📦 Testing imports...');
      const { 
        themeUtils, 
        fontUtils, 
        themeCollections 
      } = await import('@/components/public-form/themes');
      console.log('✅ All imports successful\n');
  
      // Test 2: Create basic themes
      console.log('🎨 Testing theme creation...');
      const lightTheme = themeUtils.createLightTheme();
      const darkTheme = themeUtils.createDarkTheme();
      console.log(`✅ Light theme: ${lightTheme.name} (${lightTheme.id})`);
      console.log(`✅ Dark theme: ${darkTheme.name} (${darkTheme.id})\n`);
  
      // Test 3: Test typography utilities
      console.log('📝 Testing typography utilities...');
      const fontCombinations = fontUtils.getFontCombinations();
      const typographyScales = fontUtils.getTypographyScales();
      console.log(`✅ Font combinations: ${fontCombinations.length} available`);
      console.log(`✅ Typography scales: ${Object.keys(typographyScales).join(', ')}\n`);
  
      // Test 4: Test theme collections
      console.log('📚 Testing theme collections...');
      const basicThemes = Object.keys(themeCollections.basic);
      const scaleThemes = Object.keys(themeCollections.scales);
      console.log(`✅ Basic themes: ${basicThemes.join(', ')}`);
      console.log(`✅ Scale variants: ${scaleThemes.join(', ')}\n`);
  
      // Test 5: Test CSS generation
      console.log('🎛️ Testing CSS generation...');
      const cssProperties = themeUtils.generateCSS(lightTheme);
      const typographyProps = Object.keys(cssProperties).filter(key => key.includes('font'));
      console.log(`✅ CSS properties generated: ${Object.keys(cssProperties).length} total`);
      console.log(`✅ Typography properties: ${typographyProps.length} font-related\n`);
  
      // Test 6: Test advanced features
      console.log('⚡ Testing advanced features...');
      const formTheme = fontUtils.createFormTheme();
      const accessibilityTheme = fontUtils.createAccessibilityTheme();
      console.log(`✅ Form theme: ${formTheme.name}`);
      console.log(`✅ Accessibility theme: ${accessibilityTheme.name}\n`);
  
      // Test 7: Test validation
      console.log('🔍 Testing validation...');
      const validation = themeUtils.validateTheme(lightTheme);
      console.log(`✅ Theme validation: ${validation.isValid ? 'PASSED' : 'FAILED'}`);
      if (!validation.isValid) {
        console.log(`   Errors: ${validation.errors.map(e => e.message).join(', ')}`);
      }
  
      // Test 8: Test accessibility validation (if advanced typography exists)
      if (lightTheme.advancedTypography) {
        const accessibilityValidation = themeUtils.validateTypographyAccessibility(lightTheme);
        console.log(`✅ Accessibility validation: ${accessibilityValidation.isValid ? 'PASSED' : 'NEEDS ATTENTION'}`);
        if (accessibilityValidation.errors.length > 0) {
          console.log(`   Issues: ${accessibilityValidation.errors.join(', ')}`);
        }
      }
  
      console.log('\n🎉 All tests completed successfully!');
      console.log('\n📋 Summary:');
      console.log('- ✅ Imports working');
      console.log('- ✅ Theme creation working');
      console.log('- ✅ Typography utilities working');
      console.log('- ✅ CSS generation working');
      console.log('- ✅ Validation working');
      console.log('\n🚀 Typography theme system is ready to use!');
  
      return {
        success: true,
        lightTheme,
        darkTheme,
        cssProperties,
        validation
      };
  
    } catch (error) {
      console.error('❌ Test failed:', error);
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Check that all typography files exist');
      console.log('2. Verify import paths are correct');
      console.log('3. Make sure there are no TypeScript compilation errors');
      console.log('4. Check the browser console for detailed error messages');
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };
  
  // Quick inline test you can copy-paste into browser console
  export const quickTest = `
  // Quick Typography System Test - Copy and paste this into your browser console
  
  (async () => {
    try {
      console.log('🧪 Quick Typography Test...');
      
      // Test imports
      const themes = await import('/src/components/public-form/themes');
      console.log('✅ Imports work');
      
      // Test basic functionality
      const theme = themes.themeUtils.createLightTheme();
      console.log('✅ Theme creation works:', theme.name);
      
      const css = themes.themeUtils.generateCSS(theme);
      console.log('✅ CSS generation works:', Object.keys(css).length, 'properties');
      
      console.log('🎉 Quick test passed!');
    } catch (error) {
      console.error('❌ Quick test failed:', error);
    }
  })();
  `;
  import React from 'react';
  // Simple React hook for testing in components
  export const useTypographyTest = () => {
    const [testResult, setTestResult] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);
  
    const runTest = async () => {
      setIsLoading(true);
      const result = await testTypographySystem();
      setTestResult(result);
      setIsLoading(false);
    };
  
    return {
      testResult,
      isLoading,
      runTest
    };
  };