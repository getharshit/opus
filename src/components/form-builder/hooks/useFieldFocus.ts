"use client";

import { useCallback } from 'react';
import { useFormBuilderFocus } from '../context/FormBuilderFocusContext';
import { FormField } from '@/types/form';

export function useFieldFocus() {
  const context = useFormBuilderFocus();

  // Enhanced focus methods with simple visual feedback
  const focusFieldWithTransition = useCallback((fieldId: string) => {
    context.focusField(fieldId);
    
    // Simple focus transition - scroll field into view
    setTimeout(() => {
      const fieldElement = document.querySelector(`[data-field-id="${fieldId}"]`);
      if (fieldElement) {
        fieldElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  }, [context]);

  // Focus next field in sequence
  const focusNextField = useCallback((currentFields: FormField[]) => {
    if (!context.focusedFieldId || currentFields.length === 0) return;
    
    const currentIndex = currentFields.findIndex(field => field.id === context.focusedFieldId);
    const nextIndex = (currentIndex + 1) % currentFields.length;
    const nextFieldId = currentFields[nextIndex].id;
    
    focusFieldWithTransition(nextFieldId);
  }, [context.focusedFieldId, focusFieldWithTransition]);

  // Focus previous field in sequence
  const focusPreviousField = useCallback((currentFields: FormField[]) => {
    if (!context.focusedFieldId || currentFields.length === 0) return;
    
    const currentIndex = currentFields.findIndex(field => field.id === context.focusedFieldId);
    const prevIndex = currentIndex === 0 ? currentFields.length - 1 : currentIndex - 1;
    const prevFieldId = currentFields[prevIndex].id;
    
    focusFieldWithTransition(prevFieldId);
  }, [context.focusedFieldId, focusFieldWithTransition]);

  // Get CSS classes for focus state with simple transitions
  const getFocusClasses = useCallback((fieldId: string) => {
    const isFocused = context.isFocused(fieldId);
    return {
      container: `transition-all duration-200 ease-in-out ${
        isFocused 
          ? 'border-blue-500 shadow-md ring-1 ring-blue-200' 
          : 'border-gray-200 hover:border-gray-300'
      }`,
      content: `transition-opacity duration-150 ${
        isFocused ? 'opacity-100' : 'opacity-90'
      }`,
      indicator: isFocused ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    };
  }, [context]);

  // Check if any field is focused
  const hasAnyFocus = context.focusedFieldId !== null;

  // Get field index in array (useful for navigation)
  const getFocusedFieldIndex = useCallback((fields: FormField[]) => {
    if (!context.focusedFieldId) return -1;
    return fields.findIndex(field => field.id === context.focusedFieldId);
  }, [context.focusedFieldId]);

  return {
    // Core focus state
    focusedFieldId: context.focusedFieldId,
    focusedFieldData: context.focusedFieldData,
    hasAnyFocus,
    
    // Focus actions
    focusField: focusFieldWithTransition,
    blurField: context.blurField,
    isFocused: context.isFocused,
    
    // Navigation helpers
    focusNextField,
    focusPreviousField,
    getFocusedFieldIndex,
    
    // Visual helpers
    getFocusClasses,
    
    // Context method for updating fields
    setFields: context.setFields,
  };
}

// Type export for components that need to type the hook return
export type UseFieldFocusReturn = ReturnType<typeof useFieldFocus>;