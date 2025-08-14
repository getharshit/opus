"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { FormField } from "@/types/form";

interface FormBuilderFocusContextType {
  focusedFieldId: string | null;
  focusField: (fieldId: string) => void;
  blurField: () => void;
  isFocused: (fieldId: string) => boolean;
  focusedFieldData: FormField | null;
  setFields: (fields: FormField[]) => void; // To track field data
}

const FormBuilderFocusContext = createContext<
  FormBuilderFocusContextType | undefined
>(undefined);

const FOCUS_STORAGE_KEY = "form-builder-focused-field";

interface FormBuilderFocusProviderProps {
  children: React.ReactNode;
  formId?: string; // Optional form ID for scoped storage
}

export function FormBuilderFocusProvider({
  children,
  formId,
}: FormBuilderFocusProviderProps) {
  const [focusedFieldId, setFocusedFieldId] = useState<string | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);

  // Storage key with optional form scoping
  const storageKey = formId
    ? `${FOCUS_STORAGE_KEY}-${formId}`
    : FOCUS_STORAGE_KEY;

  // Load focus state from localStorage on mount
  useEffect(() => {
    try {
      const savedFocus = localStorage.getItem(storageKey);
      if (savedFocus) {
        setFocusedFieldId(savedFocus);
      }
    } catch (error) {
      console.warn("Failed to load focus state from localStorage:", error);
    }
  }, [storageKey]);

  // Auto-focus first field when fields load and no focus is set
  useEffect(() => {
    if (!focusedFieldId && fields.length > 0) {
      const firstFieldId = fields[0].id;
      setFocusedFieldId(firstFieldId);
      try {
        localStorage.setItem(storageKey, firstFieldId);
      } catch (error) {
        console.warn("Failed to save focus state to localStorage:", error);
      }
    }
  }, [fields, focusedFieldId, storageKey]);

  // Clear focus if focused field is deleted
  useEffect(() => {
    if (
      focusedFieldId &&
      !fields.some((field) => field.id === focusedFieldId)
    ) {
      setFocusedFieldId(null);
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.warn("Failed to remove focus state from localStorage:", error);
      }
    }
  }, [fields, focusedFieldId, storageKey]);

  // Focus a specific field
  const focusField = useCallback(
    (fieldId: string) => {
      setFocusedFieldId(fieldId);
      try {
        localStorage.setItem(storageKey, fieldId);
      } catch (error) {
        console.warn("Failed to save focus state to localStorage:", error);
      }
    },
    [storageKey]
  );

  // Clear focus
  const blurField = useCallback(() => {
    setFocusedFieldId(null);
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn("Failed to remove focus state from localStorage:", error);
    }
  }, [storageKey]);

  // Check if a field is focused
  const isFocused = useCallback(
    (fieldId: string) => {
      return focusedFieldId === fieldId;
    },
    [focusedFieldId]
  );

  // Get focused field data
  const focusedFieldData = focusedFieldId
    ? fields.find((field) => field.id === focusedFieldId) || null
    : null;

  // Update fields (to be called by parent components)
  const setFieldsData = useCallback((newFields: FormField[]) => {
    setFields(newFields);
  }, []);

  const contextValue: FormBuilderFocusContextType = {
    focusedFieldId,
    focusField,
    blurField,
    isFocused,
    focusedFieldData,
    setFields: setFieldsData,
  };

  return (
    <FormBuilderFocusContext.Provider value={contextValue}>
      {children}
    </FormBuilderFocusContext.Provider>
  );
}

// Custom hook to use the focus context
export function useFormBuilderFocus() {
  const context = useContext(FormBuilderFocusContext);
  if (context === undefined) {
    throw new Error(
      "useFormBuilderFocus must be used within a FormBuilderFocusProvider"
    );
  }
  return context;
}

// Export context for advanced usage
export { FormBuilderFocusContext };
