import { FormField } from "@/types/form";

export interface ValidationError {
  fieldId: string;
  message: string;
}

export const validateFormField = (field: FormField, value: any): ValidationError | null => {
  // Required field validation
  if (field.required && (!value || value.toString().trim() === '')) {
    return {
      fieldId: field.id,
      message: `${field.label} is required`
    };
  }

  // Skip further validation if field is empty and not required
  if (!value || value.toString().trim() === '') {
    return null;
  }

  // Field type specific validation
  switch (field.type) {
    case 'text':
      if (value.length > 500) {
        return {
          fieldId: field.id,
          message: 'Response is too long (maximum 500 characters)'
        };
      }
      break;
    
    case 'date':
      if (!isValidDate(value)) {
        return {
          fieldId: field.id,
          message: 'Please enter a valid date'
        };
      }
      break;
      
    case 'rating':
      const maxRating = field.maxRating || 5;
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 1 || numValue > maxRating) {
        return {
          fieldId: field.id,
          message: `Please select a rating between 1 and ${maxRating}`
        };
      }
      break;

    case 'multipleChoice':
      if (!field.options?.includes(value)) {
        return {
          fieldId: field.id,
          message: 'Please select a valid option'
        };
      }
      break;

    case 'dropdown':
      if (!field.options?.includes(value)) {
        return {
          fieldId: field.id,
          message: 'Please select a valid option'
        };
      }
      break;
  }

  return null;
};

export const validateFormData = (fields: FormField[], formData: Record<string, any>): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  fields.forEach(field => {
    const error = validateFormField(field, formData[field.id]);
    if (error) {
      errors.push(error);
    }
  });
  
  return errors;
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime()) && dateString.match(/^\d{4}-\d{2}-\d{2}$/);
};