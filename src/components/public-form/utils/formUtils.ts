import { ExtendedForm, ExtendedFormField, FormSettings } from '../types';
import { Form as BaseForm, FormField as BaseFormField } from '@/types/form';

// Utility to convert existing forms to extended format
export const convertToExtendedForm = (baseForm: BaseForm): ExtendedForm => {
  const convertedFields: ExtendedFormField[] = baseForm.fields.map((field: BaseFormField) => {
    let convertedType: ExtendedFormField['type'];
    
    // Map old field types to new extended types
    switch (field.type) {
      case 'text':
        convertedType = 'shortText';
        break;
      case 'multipleChoice':
        convertedType = 'multipleChoice';
        break;
      case 'dropdown':
        convertedType = 'dropdown';
        break;
      case 'rating':
        convertedType = 'numberRating';
        break;
      case 'date':
        // For now, treat dates as short text since we need to implement date field
        convertedType = 'shortText';
        break;
      default:
        convertedType = 'shortText';
    }

    return {
      ...field,
      type: convertedType,
      description: undefined,
      maxLength: field.type === 'text' ? 255 : undefined,
      displayOptions: {
        width: 'full',
        showLabel: true,
        showDescription: true,
        inline: false
      }
    } as ExtendedFormField;
  });

  return {
    id: baseForm.id,
    title: baseForm.title,
    description: baseForm.description,
    fields: convertedFields,
    customization: {
      typography: {
        fontFamily: baseForm.theme.fontFamily || 'Inter, sans-serif',
        fontSize: {
          title: 24,
          question: 16,
          description: 14,
          input: 16,
          button: 16
        },
        fontWeight: {
          title: 'bold',
          question: 'medium',
          description: 'normal'
        },
        lineHeight: {
          title: 1.2,
          question: 1.4,
          description: 1.5
        }
      },
      colors: {
        primary: baseForm.theme.primaryColor || '#3B82F6',
        secondary: '#6B7280',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF',
          error: '#EF4444',
          success: '#10B981'
        },
        border: {
          default: '#D1D5DB',
          focus: baseForm.theme.primaryColor || '#3B82F6',
          error: '#EF4444',
          hover: '#9CA3AF'
        },
        button: {
          primary: {
            background: baseForm.theme.primaryColor || '#3B82F6',
            text: '#FFFFFF',
            border: baseForm.theme.primaryColor || '#3B82F6',
            hover: {
              background: '#2563EB',
              text: '#FFFFFF',
              border: '#2563EB'
            }
          },
          secondary: {
            background: '#F3F4F6',
            text: '#374151',
            border: '#D1D5DB',
            hover: {
              background: '#E5E7EB',
              text: '#374151',
              border: '#9CA3AF'
            }
          }
        }
      },
      spacing: {
        container: {
          padding: 32,
          maxWidth: 768
        },
        questions: {
          marginBottom: 24,
          padding: 0
        },
        inputs: {
          padding: 12,
          marginTop: 8
        },
        buttons: {
          padding: {
            x: 24,
            y: 12
          },
          marginTop: 24,
          gap: 16
        }
      },
      buttons: {
        borderRadius: 8,
        borderWidth: 1,
        size: 'medium',
        fullWidth: false
      },
      inputs: {
        borderRadius: 8,
        borderWidth: 1,
        focusRing: {
          width: 2,
          color: baseForm.theme.primaryColor || '#3B82F6',
          offset: 0
        },
        placeholder: {
          color: '#9CA3AF',
          opacity: 1
        }
      },
      layout: {
        questionAlignment: 'left',
        inputAlignment: 'left'
      },
      animations: {
        enableAnimations: true,
        transitions: {
          duration: 200,
          easing: 'ease-in-out'
        }
      },
      branding: {
        logo: baseForm.theme.logoUrl ? {
          url: baseForm.theme.logoUrl,
          width: 120,
          height: 40,
          position: 'top-center'
        } : undefined,
        watermark: {
          show: false,
          text: '',
          position: 'bottom-right'
        }
      }
    },
    layout: {
      type: 'singleColumn',
      options: {
        singleColumn: {
          maxWidth: 768,
          questionSpacing: 24,
          showAllQuestions: true
        }
      }
    },
    theme: {
      id: 'converted-theme',
      name: 'Converted Theme',
      customization: {} as any, // Will be filled by customization above
      isDefault: false,
      isCustom: true
    },
    settings: {
      allowMultipleSubmissions: true,
      showProgressBar: false,
      requireAllFields: false,
      collectIPAddress: false,
      collectUserAgent: false,
      enableSaveAndContinue: false
    } as FormSettings,
    createdAt: baseForm.createdAt,
    updatedAt: baseForm.updatedAt
  };
};

// Utility to check if form is multi-step
export const isMultiStepForm = (form: ExtendedForm): boolean => {
  return form.fieldGroups && form.fieldGroups.length > 1;
};

// Utility to get field by ID
export const getFieldById = (form: ExtendedForm, fieldId: string): ExtendedFormField | undefined => {
  return form.fields.find(field => field.id === fieldId);
};

// Utility to validate field visibility based on conditional logic
export const isFieldVisible = (
  field: ExtendedFormField, 
  formData: Record<string, any>
): boolean => {
  if (!field.conditionalLogic) return true;

  const { showWhen, hideWhen } = field.conditionalLogic;

  // Check show conditions
  if (showWhen && showWhen.length > 0) {
    const shouldShow = showWhen.some(condition => 
      evaluateCondition(condition, formData)
    );
    if (!shouldShow) return false;
  }

  // Check hide conditions
  if (hideWhen && hideWhen.length > 0) {
    const shouldHide = hideWhen.some(condition => 
      evaluateCondition(condition, formData)
    );
    if (shouldHide) return false;
  }

  return true;
};

// Helper function to evaluate conditions
const evaluateCondition = (
  condition: { fieldId: string; operator: string; value: any },
  formData: Record<string, any>
): boolean => {
  const fieldValue = formData[condition.fieldId];
  
  switch (condition.operator) {
    case 'equals':
      return fieldValue === condition.value;
    case 'notEquals':
      return fieldValue !== condition.value;
    case 'contains':
      return String(fieldValue).includes(String(condition.value));
    case 'greaterThan':
      return Number(fieldValue) > Number(condition.value);
    case 'lessThan':
      return Number(fieldValue) < Number(condition.value);
    default:
      return false;
  }
};