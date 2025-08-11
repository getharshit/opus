"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  useForm,
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExtendedForm,
  FormState,
  ExtendedValidationError,
  FieldGroup,
} from "../types";
import { useFormValidation } from "../hooks/useFormValidation";

interface FormContextValue {
  // Form configuration
  form: ExtendedForm;

  // React Hook Form instance
  formMethods: UseFormReturn<any>;

  // Multi-step management
  currentStep: number;
  totalSteps: number;
  currentStepFields: any[];

  // State management
  formState: FormState;

  // Actions
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  validateCurrentStep: () => Promise<boolean>;
  submitForm: () => Promise<void>;

  // Validation
  validateField: (
    fieldId: string,
    value: any
  ) => ExtendedValidationError | null;

  // Utilities
  getFieldValue: (fieldId: string) => any;
  setFieldValue: (fieldId: string, value: any) => void;
  isFieldTouched: (fieldId: string) => boolean;
  getFieldError: (fieldId: string) => string | undefined;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

// Helper function to get default values based on field type
const getFieldDefaultValue = (field: any) => {
  switch (field.type) {
    case "shortText":
    case "longText":
    case "email":
    case "website":
    case "phoneNumber":
    case "text":
      return "";
    case "multipleChoice":
    case "dropdown":
      return "";
    case "yesNo":
      return false;
    case "numberRating":
    case "rating":
    case "opinionScale":
      return null;
    case "date":
      return "";
    case "legal":
      return false;
    case "fileUpload":
      return null;
    default:
      return "";
  }
};

interface FormProviderProps {
  form: ExtendedForm;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onFieldChange?: (fieldId: string, value: any) => void;
  onStepChange?: (step: number) => void;
  initialData?: Record<string, any>;
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  form,
  onSubmit,
  onFieldChange,
  onStepChange,
  initialData = {},
  children,
}) => {
  // Validation setup
  const { validationSchema, validateField, validateAll } = useFormValidation(
    form.fields
  );

  // React Hook Form setup
  // Create default values for all fields to prevent controlled/uncontrolled switch
  const defaultValues = useMemo(() => {
    const defaults: Record<string, any> = {};

    // Add defaults for all fields in the form
    form.fields.forEach((field) => {
      defaults[field.id] = initialData[field.id] ?? getFieldDefaultValue(field);
    });

    return defaults;
  }, [form.fields, initialData]);

  // React Hook Form setup
  const formMethods = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: "onBlur", // Validate on blur for better UX
  });

  const {
    watch,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: rhfFormState,
  } = formMethods;

  // Multi-step logic
  const { fieldGroups, fields } = form;
  const isMultiStep = fieldGroups && fieldGroups.length > 0;

  const [currentStep, setCurrentStep] = React.useState(0);

  const totalSteps = useMemo(() => {
    if (isMultiStep) {
      return fieldGroups!.length;
    }
    return 1;
  }, [isMultiStep, fieldGroups]);

  const currentStepFields = useMemo(() => {
    if (isMultiStep) {
      return fieldGroups![currentStep]?.fields || [];
    }
    return fields;
  }, [isMultiStep, fieldGroups, currentStep, fields]);

  // Form state
  const [formState, setFormState] = React.useState<FormState>({
    currentStep,
    totalSteps,
    formData: getValues(),
    errors: [],
    isSubmitting: false,
    isValid: rhfFormState.isValid,
    touchedFields: new Set(),
    visitedSteps: new Set([0]),
  });

  // Track previous form data for change detection
  const previousFormDataRef = useRef<Record<string, any>>({});

  // Watch for form data changes
  const watchedData = watch();

  useEffect(() => {
    // Get the previous form data from the ref
    const previousFormData = previousFormDataRef.current;

    setFormState((prevState) => ({
      ...prevState,
      formData: watchedData,
      isValid: rhfFormState.isValid,
      errors: validateAll(watchedData),
    }));

    // Notify parent of field changes
    if (onFieldChange) {
      Object.keys(watchedData).forEach((fieldId) => {
        // Compare with previous data to detect changes
        if (previousFormData[fieldId] !== watchedData[fieldId]) {
          onFieldChange(fieldId, watchedData[fieldId]);
        }
      });
    }

    // Update the ref with current data for next comparison
    previousFormDataRef.current = watchedData;
  }, [rhfFormState.isValid]); // Remove watchedData and validateAll from dependencies

  // Step navigation functions
  const nextStep = async () => {
    const isStepValid = await validateCurrentStep();

    if (isStepValid && currentStep < totalSteps - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      setFormState((prev) => ({
        ...prev,
        currentStep: newStep,
        visitedSteps: new Set([...prev.visitedSteps, newStep]),
      }));
      onStepChange?.(newStep);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      setFormState((prev) => ({
        ...prev,
        currentStep: newStep,
      }));
      onStepChange?.(newStep);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
      setFormState((prev) => ({
        ...prev,
        currentStep: step,
        visitedSteps: new Set([...prev.visitedSteps, step]),
      }));
      onStepChange?.(step);
    }
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = currentStepFields.map((field) => field.id);
    const result = await trigger(fieldsToValidate);

    // Update touched fields
    setFormState((prev) => ({
      ...prev,
      touchedFields: new Set([...prev.touchedFields, ...fieldsToValidate]),
    }));

    return result;
  };

  const submitForm = async () => {
    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      // Validate entire form
      const isValid = await trigger();

      if (isValid) {
        const formData = getValues();
        await onSubmit(formData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // Utility functions
  const getFieldValue = (fieldId: string) => getValues(fieldId);

  const setFieldValue = (fieldId: string, value: any) => {
    setValue(fieldId, value, { shouldValidate: true, shouldTouch: true });
  };

  const isFieldTouched = (fieldId: string) => {
    return (
      formState.touchedFields.has(fieldId) ||
      !!rhfFormState.touchedFields[fieldId]
    );
  };

  const getFieldError = (fieldId: string) => {
    return rhfFormState.errors[fieldId]?.message as string | undefined;
  };

  const contextValue: FormContextValue = {
    form,
    formMethods,
    currentStep,
    totalSteps,
    currentStepFields,
    formState,
    nextStep,
    previousStep,
    goToStep,
    validateCurrentStep,
    submitForm,
    validateField,
    getFieldValue,
    setFieldValue,
    isFieldTouched,
    getFieldError,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <RHFFormProvider {...formMethods}>
        <form onSubmit={handleSubmit(submitForm)} noValidate>
          {children}
        </form>
      </RHFFormProvider>
    </FormContext.Provider>
  );
};
