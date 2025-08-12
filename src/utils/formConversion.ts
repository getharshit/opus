import { 
    Form, 
    FormField, 
    LegacyFormField, 
    FormTheme, 
    FormCustomization, 
    FormLayoutConfig, 
    FormSettings,
    FieldType,
    ExtendedFieldType,
    LegacyFieldType
  } from '@/types/form';
  
  // ============================================================================
  // FIELD CONVERSION UTILITIES
  // ============================================================================
  
  /**
   * Mapping from legacy field types to new field types
   */
  const LEGACY_TO_NEW_TYPE_MAP: Record<LegacyFieldType, ExtendedFieldType> = {
    'text': 'shortText',
    'multipleChoice': 'multipleChoice',
    'dropdown': 'dropdown',
    'rating': 'numberRating',
    'date': 'shortText' // Date inputs handled as shortText with date validation
  };
  
  /**
   * Convert a legacy field to the new enhanced format
   */
  export function convertLegacyField(legacyField: LegacyFormField): FormField {
    const newType = LEGACY_TO_NEW_TYPE_MAP[legacyField.type] || 'shortText';
    
    const convertedField: FormField = {
      id: legacyField.id,
      type: newType,
      label: legacyField.label,
      required: legacyField.required,
      placeholder: legacyField.placeholder,
      options: legacyField.options,
      maxRating: legacyField.maxRating,
      
      // Add default enhanced properties
      description: undefined,
      helpText: undefined,
      validationRules: getDefaultValidationRules(legacyField.type),
      displayOptions: getDefaultDisplayOptions(newType),
      conditionalLogic: undefined
    };
    
    return convertedField;
  }
  
  /**
   * Get default validation rules based on legacy field type
   */
  function getDefaultValidationRules(legacyType: LegacyFieldType) {
    switch (legacyType) {
      case 'date':
        return {
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          customMessage: 'Please enter a valid date (YYYY-MM-DD)'
        };
      case 'rating':
        return {
          min: 1,
          max: 5,
          customMessage: 'Please select a rating between 1 and 5'
        };
      default:
        return undefined;
    }
  }
  
  /**
   * Get default display options based on field type
   */
  function getDefaultDisplayOptions(fieldType: ExtendedFieldType) {
    const baseOptions = {
      width: 'full' as const,
      showLabel: true,
      showDescription: true
    };
    
    switch (fieldType) {
      case 'yesNo':
        return { ...baseOptions, inline: true };
      case 'multipleChoice':
        return { ...baseOptions, inline: false };
      case 'statement':
        return { 
          ...baseOptions, 
          variant: 'default' as const,
          showLabel: false 
        };
      default:
        return baseOptions;
    }
  }
  
  // ============================================================================
  // THEME CONVERSION UTILITIES
  // ============================================================================
  
  /**
   * Convert legacy theme to enhanced theme with default values
   */
  export function enhanceTheme(legacyTheme: Partial<FormTheme>): FormTheme {
    return {
      // Legacy properties (preserved)
      primaryColor: legacyTheme.primaryColor || '#3B82F6',
      fontFamily: legacyTheme.fontFamily || 'Inter, system-ui, sans-serif',
      logoUrl: legacyTheme.logoUrl,
      
      // Enhanced properties with defaults
      secondaryColor: legacyTheme.secondaryColor || '#6B7280',
      tertiaryColor: legacyTheme.tertiaryColor || '#F3F4F6',
      backgroundColor: legacyTheme.backgroundColor || '#FFFFFF',
      textColor: legacyTheme.textColor || '#111827',
      borderColor: legacyTheme.borderColor || '#D1D5DB',
      
      fontSize: legacyTheme.fontSize || {
        title: 24,
        question: 16,
        input: 16,
        small: 14
      },
      
      fontWeight: legacyTheme.fontWeight || {
        normal: 400,
        medium: 500,
        bold: 700
      },
      
      borderRadius: legacyTheme.borderRadius || 8,
      spacing: legacyTheme.spacing || 16,
      buttonStyle: legacyTheme.buttonStyle || 'rounded',
      inputStyle: legacyTheme.inputStyle || 'outlined',
      shadowLevel: legacyTheme.shadowLevel || 'sm'
    };
  }
  
  /**
   * Create default customization object
   */
  export function createDefaultCustomization(): FormCustomization {
    return {
      colors: {
        primary: '#3B82F6',
        secondary: '#6B7280',
        accent: '#10B981',
        background: '#FFFFFF',
        surface: '#F9FAFB',
        text: '#111827',
        textSecondary: '#6B7280',
        border: '#D1D5DB',
        error: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B'
      },
      typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: {
          xs: 12,
          sm: 14,
          base: 16,
          lg: 18,
          xl: 20,
          '2xl': 24,
          '3xl': 30
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700
        },
        lineHeight: {
          tight: 1.25,
          normal: 1.5,
          relaxed: 1.75
        }
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32
      },
      borders: {
        radius: 8,
        width: 1
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }
    };
  }
  
  /**
   * Create default layout configuration
   */
  export function createDefaultLayout(): FormLayoutConfig {
    return {
      type: 'singleColumn',
      options: {
        maxWidth: 600,
        padding: 24,
        backgroundColor: '#FFFFFF',
        singleColumn: {
          showQuestionNumbers: true,
          questionSpacing: 24,
          submitButtonPosition: 'center'
        }
      }
    };
  }
  
  /**
   * Create default form settings
   */
  export function createDefaultSettings(): FormSettings {
    return {
      allowMultipleSubmissions: false,
      showProgressBar: true,
      requireAllFields: false,
      shuffleQuestions: false,
      collectIPAddress: true,
      collectUserAgent: true,
      enableSaveAndContinue: false,
      submitButtonText: 'Submit',
      showResetButton: false,
      confirmBeforeSubmit: false,
      showPrivacyNotice: false,
      gdprCompliant: false
    };
  }
  
  // ============================================================================
  // FORM CONVERSION UTILITIES
  // ============================================================================
  

/**
 * Convert any form data to the enhanced format
 */
export function convertToEnhancedForm(formData: any): Form {
  // Handle case where form is already in new format
  if (isEnhancedForm(formData)) {
    console.log('✅ Form already in enhanced format');
    return formData;
  }
  
  console.log('🔄 Converting form to enhanced format...', {
    originalTitle: formData.title,
    originalFieldCount: formData.fields?.length,
    originalFieldTypes: formData.fields?.map((f: any) => f.type)
  });
  
  // Convert legacy form to new format
  const enhancedFields = formData.fields.map((field: any) => {
    if (isLegacyField(field)) {
      console.log(`🔄 Converting legacy field: ${field.type} → enhanced`);
      return convertLegacyField(field);
    }
    
    // Ensure all enhanced fields have proper structure
    return ensureFieldProperties(field);
  });
  
  const convertedForm: Form = {
    id: formData.id,
    title: formData.title,
    description: formData.description || '',
    prompt: formData.prompt || '',
    fields: enhancedFields,
    fieldGroups: formData.fieldGroups || undefined,
    theme: enhanceTheme(formData.theme || {}),
    customization: formData.customization || createDefaultCustomization(),
    layout: formData.layout || createDefaultLayout(),
    settings: formData.settings || createDefaultSettings(),
    createdAt: new Date(formData.createdAt),
    updatedAt: new Date(formData.updatedAt)
  };

  // Add conversion logging for debugging
  console.log('✅ Form Conversion Complete:', {
    formId: convertedForm.id,
    title: convertedForm.title,
    originalFieldCount: formData.fields?.length,
    convertedFieldCount: convertedForm.fields.length,
    fieldTypes: convertedForm.fields.map(f => `${f.type}${f.required ? '*' : ''}`),
    hasCustomization: !!convertedForm.customization,
    hasLayout: !!convertedForm.layout,
    hasSettings: !!convertedForm.settings,
    hasFieldGroups: !!convertedForm.fieldGroups,
    layoutType: convertedForm.layout?.type
  });

  return convertedForm;
}
  
/**
 * Ensure field has all required properties for PublicFormRenderer
 */
function ensureFieldProperties(field: any): FormField {
  const baseField: FormField = {
    id: field.id,
    type: field.type,
    label: field.label,
    description: field.description || undefined,
    required: field.required || false,
    placeholder: field.placeholder || undefined,
    options: field.options || undefined,
    maxRating: field.maxRating || undefined,
    minRating: field.minRating || undefined,
    maxLength: field.maxLength || undefined,
    minLength: field.minLength || undefined,
    acceptedFileTypes: field.acceptedFileTypes || undefined,
    maxFileSize: field.maxFileSize || undefined,
    defaultValue: field.defaultValue || undefined,
    helpText: field.helpText || undefined,
    validationRules: field.validationRules || undefined,
    displayOptions: field.displayOptions || getDefaultDisplayOptions(field.type),
    conditionalLogic: field.conditionalLogic || undefined
  };

  // Add field-specific defaults if missing
  switch (field.type) {
    case 'multipleChoice':
    case 'dropdown':
      if (!baseField.options || baseField.options.length === 0) {
        baseField.options = ['Option 1', 'Option 2', 'Option 3'];
      }
      break;
      
    case 'numberRating':
      if (!baseField.maxRating) baseField.maxRating = 5;
      if (!baseField.minRating) baseField.minRating = 1;
      break;
      
    case 'opinionScale':
      baseField.maxRating = 10;
      baseField.minRating = 1;
      break;
      
    case 'fileUpload':
      if (!baseField.acceptedFileTypes) {
        baseField.acceptedFileTypes = ['.pdf', '.jpg', '.png', '.doc', '.docx'];
      }
      if (!baseField.maxFileSize) {
        baseField.maxFileSize = 10; // 10MB default
      }
      break;
      
    case 'shortText':
      if (!baseField.maxLength) baseField.maxLength = 100;
      break;
      
    case 'longText':
      if (!baseField.maxLength) baseField.maxLength = 500;
      break;
  }

  return baseField;
}

  /**
   * Prepare form data for database storage
   */
  export function prepareFormForDatabase(form: Form) {
    return {
      id: form.id,
      title: form.title,
      description: form.description || null,
      prompt: form.prompt || null,
      fields: form.fields,
      fieldGroups: form.fieldGroups || null,
      theme: form.theme,
      customization: form.customization || {},
      layout: form.layout || {},
      settings: form.settings || {},
      createdAt: form.createdAt,
      updatedAt: form.updatedAt
    };
  }
  
  // ============================================================================
  // TYPE GUARDS AND VALIDATION
  // ============================================================================
  
  /**
   * Check if a field is in legacy format
   */
  export function isLegacyField(field: any): field is LegacyFormField {
    const legacyTypes = ['text', 'multipleChoice', 'dropdown', 'rating', 'date'];
    return (
      field &&
      typeof field.id === 'string' &&
      legacyTypes.includes(field.type) &&
      typeof field.label === 'string' &&
      typeof field.required === 'boolean'
    );
  }
  
  /**
   * Check if a form is in enhanced format
   */
  export function isEnhancedForm(form: any): form is Form {
    return (
      form &&
      typeof form.id === 'string' &&
      typeof form.title === 'string' &&
      Array.isArray(form.fields) &&
      form.theme &&
      form.createdAt &&
      form.updatedAt
    );
  }
  
  /**
   * Validate form field structure
   */
  export function validateFormField(field: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!field.id || typeof field.id !== 'string') {
      errors.push('Field must have a valid id');
    }
    
    if (!field.type || typeof field.type !== 'string') {
      errors.push('Field must have a valid type');
    }
    
    if (!field.label || typeof field.label !== 'string') {
      errors.push('Field must have a valid label');
    }
    
    if (typeof field.required !== 'boolean') {
      errors.push('Field must have a boolean required property');
    }
    
    // Type-specific validations
    if (field.type === 'multipleChoice' || field.type === 'dropdown') {
      if (!field.options || !Array.isArray(field.options) || field.options.length === 0) {
        errors.push('Choice fields must have at least one option');
      }
    }
    
    if (field.type === 'numberRating' || field.type === 'rating') {
      if (!field.maxRating || field.maxRating < 1) {
        errors.push('Rating fields must have a valid maxRating');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Validate complete form structure
   */
  export function validateForm(form: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!form.id || typeof form.id !== 'string') {
      errors.push('Form must have a valid id');
    }
    
    if (!form.title || typeof form.title !== 'string') {
      errors.push('Form must have a valid title');
    }
    
    if (!Array.isArray(form.fields)) {
      errors.push('Form must have a fields array');
    } else if (form.fields.length === 0) {
      errors.push('Form must have at least one field');
    } else {
      // Validate each field
      form.fields.forEach((field: any, index: number) => {
        const fieldValidation = validateFormField(field);
        if (!fieldValidation.isValid) {
          errors.push(`Field ${index + 1}: ${fieldValidation.errors.join(', ')}`);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  // ============================================================================
  // UTILITY EXPORTS
  // ============================================================================
  
  export const formConversionUtils = {
    convertLegacyField,
    convertToEnhancedForm,
    prepareFormForDatabase,
    enhanceTheme,
    createDefaultCustomization,
    createDefaultLayout,
    createDefaultSettings,
    validateForm,
    validateFormField,
    isLegacyField,
    isEnhancedForm
  };