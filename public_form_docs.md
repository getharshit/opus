# Public Form System Documentation

A comprehensive, customizable form rendering system built with React Hook Form, Framer Motion, and TypeScript. This system provides a flexible foundation for creating interactive, accessible forms with advanced features like multi-step navigation, custom animations, and extensive validation.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Type System](#type-system)
4. [Animation System](#animation-system)
5. [Field Components](#field-components)
6. [Form Providers](#form-providers)
7. [Layout System](#layout-system)
8. [Usage Examples](#usage-examples)
9. [API Reference](#api-reference)
10. [Best Practices](#best-practices)
11. [Advanced Customization](#advanced-customization)

---

## Overview

The Public Form System is designed to render highly customizable forms with:

- **14+ Field Types**: From simple text inputs to complex rating scales
- **Multi-step Support**: Wizard-style forms with progress tracking
- **Advanced Animations**: Smooth micro-interactions powered by Framer Motion
- **Full Accessibility**: WCAG compliant with proper ARIA attributes
- **React Hook Form Integration**: Robust validation and state management
- **TypeScript First**: Complete type safety throughout the system

### Key Features

✅ **Comprehensive Field Types**: Text, email, phone, rating, choice fields, and more  
✅ **Animation System**: Customizable entrance, exit, and interaction animations  
✅ **Accessibility**: Screen reader support, keyboard navigation, focus management  
✅ **Validation**: Real-time validation with custom rules and error messages  
✅ **Responsive Design**: Mobile-first approach with clean, themeable styling  
✅ **Multi-step Forms**: Progress tracking, step navigation, conditional logic  

---

## Architecture

```
src/components/public-form/
├── types/                      # TypeScript definitions
│   ├── fields.ts              # Form field interfaces
│   ├── customization.ts       # Theme and styling types
│   ├── layout.ts              # Layout configuration types
│   ├── theme.ts               # Theme system types
│   └── index.ts               # Type exports
├── animation/                  # Animation system
│   ├── types.ts               # Animation configuration types
│   ├── presets.ts             # Pre-built animation variants
│   ├── AnimationProvider.tsx  # Animation context provider
│   └── components/            # Animated components
├── providers/                  # React context providers
│   └── FormProvider.tsx       # Form state management
├── components/                 # Form components
│   ├── fields/                # Individual field components
│   ├── base-fields/           # Base field implementations
│   ├── FormQuestion.tsx       # Question wrapper component
│   ├── FieldRenderer.tsx      # Field type dispatcher
│   ├── FormNavigation.tsx     # Navigation controls
│   └── PublicFormRenderer.tsx # Main form renderer
├── layouts/                    # Layout components
│   ├── SingleColumnLayout.tsx # Single column layout
│   └── MultiStepLayout.tsx    # Multi-step layout
├── utils/                      # Utility functions
│   └── formUtils.ts           # Form conversion utilities
└── index.ts                   # Main exports
```

---

## Type System

### Core Types

#### ExtendedFormField

The foundation of all form fields with comprehensive configuration options:

```typescript
interface ExtendedFormField {
  id: string;
  type: ExtendedFieldType;
  label: string;
  description?: string;
  required: boolean;
  
  // Field-specific properties
  placeholder?: string;
  options?: string[];
  maxRating?: number;
  minRating?: number;
  maxLength?: number;
  minLength?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  defaultValue?: any;
  helpText?: string;
  
  // Validation rules
  validationRules?: {
    pattern?: string;
    min?: number;
    max?: number;
    customMessage?: string;
  };
  
  // Display options
  displayOptions?: {
    width?: 'full' | 'half' | 'third';
    showLabel?: boolean;
    showDescription?: boolean;
    inline?: boolean;
  };
  
  // Conditional logic
  conditionalLogic?: {
    showWhen?: ConditionalRule[];
    hideWhen?: ConditionalRule[];
  };
}
```

#### ExtendedForm

Complete form configuration with customization and layout options:

```typescript
interface ExtendedForm {
  id: string;
  title: string;
  description?: string;
  fields: ExtendedFormField[];
  fieldGroups?: FieldGroup[];     // For multi-step forms
  customization: FormCustomization;
  layout: FormLayoutConfig;
  theme: FormTheme;
  settings: FormSettings;
  createdAt: Date;
  updatedAt: Date;
}
```

### Field Types

The system supports 14 field types:

```typescript
type ExtendedFieldType = 
  | 'shortText'       // Single line text input
  | 'longText'        // Multi-line textarea
  | 'multipleChoice'  // Radio buttons
  | 'statement'       // Display-only text/HTML
  | 'dropdown'        // Select dropdown
  | 'yesNo'          // Boolean yes/no choice
  | 'numberRating'    // Numeric rating scale
  | 'email'          // Email input with validation
  | 'opinionScale'    // 1-10 opinion rating
  | 'website'        // URL input with validation
  | 'legal'          // Checkbox for legal acceptance
  | 'phoneNumber'    // Phone number input
  | 'fileUpload'     // File upload field
  | 'pageBreak';     // Multi-step page separator
```

---

## Animation System

The animation system provides smooth, customizable interactions throughout the form experience.

### Animation Configuration

```typescript
interface AnimationConfig {
  enabled: boolean;
  respectReducedMotion: boolean;
  intensity: 'none' | 'subtle' | 'normal' | 'dynamic';
  
  fieldEntrance: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    easing: AnimationEasing;
  };
  
  fieldExit: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    easing: AnimationEasing;
  };
  
  stepTransition: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    easing: AnimationEasing;
    direction: 'forward' | 'backward' | 'auto';
  };
  
  button: {
    hover: { scale: number; duration: number; easing: AnimationEasing; };
    tap: { scale: number; duration: number; };
    disabled: { opacity: number; duration: number; };
  };
  
  error: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    shake?: { intensity: number; duration: number; };
  };
  
  success: {
    preset: AnimationPreset;
    timing: AnimationTiming;
    confetti?: boolean;
  };
}
```

### Animation Presets

Available animation presets for different interactions:

- **Field Animations**: `fade`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scale`, `scaleUp`, `scaleDown`, `bounce`, `elastic`, `spring`
- **Step Transitions**: `slideForward`, `slideBackward`, `fade`, `scale`
- **Error States**: `shake`, `pulse`, `bounce`
- **Success States**: `scale`, `bounce`, `checkmark`

### Animated Components

#### AnimatedFieldContainer

Wraps form fields with entrance/exit animations:

```typescript
<AnimatedFieldContainer
  fieldId="email"
  isVisible={true}
  animationPreset="slideUp"
  className="mb-6"
>
  <EmailField field={emailField} />
</AnimatedFieldContainer>
```

#### AnimatedButton

Provides interactive button animations:

```typescript
<AnimatedButton
  variant="primary"
  onClick={handleSubmit}
  disabled={isSubmitting}
  className="px-6 py-3 bg-blue-600 text-white rounded-lg"
>
  Submit Form
</AnimatedButton>
```

#### AnimatedErrorMessage

Handles error state animations:

```typescript
<AnimatedErrorMessage isVisible={hasError}>
  <div className="text-red-600 text-sm">
    {errorMessage}
  </div>
</AnimatedErrorMessage>
```

---

## Field Components

### Implemented Field Types

#### 1. ShortTextField

Single-line text input with character counting and validation:

```typescript
const shortTextField: ExtendedFormField = {
  id: 'firstName',
  type: 'shortText',
  label: 'First Name',
  required: true,
  placeholder: 'Enter your first name',
  maxLength: 50,
  validationRules: {
    pattern: '^[a-zA-Z\\s]+$',
    customMessage: 'Only letters and spaces allowed'
  }
};

<ShortTextField 
  field={shortTextField}
  questionNumber={1}
  showQuestionNumber={true}
/>
```

**Features:**
- Character counter with visual feedback
- Real-time validation
- Pattern matching support
- Accessibility attributes

#### 2. LongTextField

Multi-line textarea with auto-resize functionality:

```typescript
const longTextField: ExtendedFormField = {
  id: 'feedback',
  type: 'longText',
  label: 'Detailed Feedback',
  description: 'Please provide detailed feedback about your experience',
  required: true,
  placeholder: 'Type your detailed feedback here...',
  maxLength: 1000,
  helpText: 'Be as specific as possible'
};

<LongTextField 
  field={longTextField}
  questionNumber={2}
  showQuestionNumber={true}
/>
```

**Features:**
- Auto-resizing textarea (120px to 300px)
- Character counter
- Visual feedback for approaching limits
- Smooth focus animations

#### 3. EmailField

Email input with format validation and success indicators:

```typescript
const emailField: ExtendedFormField = {
  id: 'email',
  type: 'email',
  label: 'Email Address',
  required: true,
  placeholder: 'name@example.com',
  validationRules: {
    customMessage: 'Please enter a valid business email'
  }
};

<EmailField 
  field={emailField}
  questionNumber={3}
  showQuestionNumber={true}
/>
```

**Features:**
- Email format validation
- Visual success/error states
- Email icon indicator
- Autocomplete support

#### 4. WebsiteField

URL input with auto-formatting and link preview:

```typescript
const websiteField: ExtendedFormField = {
  id: 'website',
  type: 'website',
  label: 'Company Website',
  placeholder: 'https://example.com',
  required: false,
  helpText: 'Include http:// or https://'
};

<WebsiteField 
  field={websiteField}
  questionNumber={4}
  showQuestionNumber={true}
/>
```

**Features:**
- Auto-adds https:// if missing
- URL format validation
- External link preview
- Visual success indicators

#### 5. PhoneNumberField

Phone input with automatic formatting:

```typescript
const phoneField: ExtendedFormField = {
  id: 'phone',
  type: 'phoneNumber',
  label: 'Phone Number',
  required: true,
  placeholder: '(555) 123-4567',
  validationRules: {
    customMessage: 'Please enter a valid phone number'
  }
};

<PhoneNumberField 
  field={phoneField}
  questionNumber={5}
  showQuestionNumber={true}
/>
```

**Features:**
- Auto-formatting as user types
- International number support
- Format validation
- Visual feedback for valid numbers

#### 6. NumberRatingField

Interactive rating scale with hover effects:

```typescript
const ratingField: ExtendedFormField = {
  id: 'satisfaction',
  type: 'numberRating',
  label: 'How satisfied are you with our service?',
  required: true,
  minRating: 1,
  maxRating: 10,
  helpText: 'Select a number from 1 (very poor) to 10 (excellent)'
};

<NumberRatingField 
  field={ratingField}
  questionNumber={6}
  showQuestionNumber={true}
/>
```

**Features:**
- Customizable rating range (1-10, 1-5, etc.)
- Hover effects and visual feedback
- Accessible with keyboard navigation
- Dynamic labels based on scale

### QuestionContainer

Shared container component that provides consistent question structure:

```typescript
<QuestionContainer
  field={field}
  questionNumber={1}
  showQuestionNumber={true}
  className="mb-6"
>
  {/* Field input component */}
</QuestionContainer>
```

**Features:**
- Question numbering
- Title and description rendering
- Required field indicators
- ARIA attributes for accessibility
- Help text support
- Image placeholder (for future implementation)

---

## Form Providers

### FormProvider

Manages form state, validation, and multi-step navigation:

```typescript
interface FormProviderProps {
  form: ExtendedForm;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onFieldChange?: (fieldId: string, value: any) => void;
  onStepChange?: (step: number) => void;
  initialData?: Record<string, any>;
  children: React.ReactNode;
}

// Usage
<FormProvider
  form={extendedForm}
  onSubmit={handleFormSubmit}
  onFieldChange={handleFieldChange}
  initialData={existingData}
>
  <PublicFormRenderer />
</FormProvider>
```

**Provides:**
- Form state management
- Validation handling
- Multi-step navigation
- Field value tracking
- Error state management

### AnimationProvider

Manages animation configuration and accessibility preferences:

```typescript
<AnimationProvider initialConfig={animationConfig}>
  <FormProvider form={form} onSubmit={onSubmit}>
    <PublicFormRenderer />
  </FormProvider>
</AnimationProvider>
```

**Features:**
- Respects reduced motion preferences
- Customizable animation intensity
- Performance optimization
- Consistent timing and easing

---

## Layout System

### SingleColumnLayout

Standard single-column form layout:

```typescript
<SingleColumnLayout form={form} state={formState}>
  <div className="space-y-6">
    {questions.map(question => (
      <FormQuestion key={question.id} field={question} />
    ))}
  </div>
</SingleColumnLayout>
```

### MultiStepLayout

Multi-step form layout with progress tracking:

```typescript
<MultiStepLayout 
  form={form} 
  state={formState}
  progressConfig={{
    type: 'bar',
    position: 'top',
    showPercentage: true,
    showStepLabels: false,
    animated: true
  }}
>
  <AnimatedStepTransition 
    currentStep={currentStep}
    direction="forward"
  >
    {currentStepQuestions}
  </AnimatedStepTransition>
</MultiStepLayout>
```

**Features:**
- Progress indicators (bar, circle, steps, percentage)
- Step transitions with animations
- Navigation controls
- Step validation

---

## Usage Examples

### Basic Form Implementation

```typescript
import { PublicFormRenderer, ExtendedForm } from '@/components/public-form';

const simpleForm: ExtendedForm = {
  id: 'contact-form',
  title: 'Contact Us',
  description: 'We\'d love to hear from you!',
  fields: [
    {
      id: 'name',
      type: 'shortText',
      label: 'Full Name',
      required: true,
      placeholder: 'Enter your full name'
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'name@example.com'
    },
    {
      id: 'message',
      type: 'longText',
      label: 'Message',
      required: true,
      placeholder: 'Tell us how we can help...',
      maxLength: 500
    }
  ],
  customization: defaultCustomization,
  layout: { type: 'singleColumn', options: {} },
  theme: defaultTheme,
  settings: { allowMultipleSubmissions: true }
};

const handleSubmit = async (data: Record<string, any>) => {
  console.log('Form submitted:', data);
  // Process form submission
};

export default function ContactPage() {
  return (
    <PublicFormRenderer
      form={simpleForm}
      onSubmit={handleSubmit}
      showValidation={true}
    />
  );
}
```

### Multi-Step Form

```typescript
const multiStepForm: ExtendedForm = {
  id: 'onboarding-form',
  title: 'User Onboarding',
  description: 'Complete your profile setup',
  fields: [], // Fields will be in fieldGroups
  fieldGroups: [
    {
      id: 'personal-info',
      title: 'Personal Information',
      fields: [
        {
          id: 'firstName',
          type: 'shortText',
          label: 'First Name',
          required: true
        },
        {
          id: 'lastName',
          type: 'shortText',
          label: 'Last Name',
          required: true
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          required: true
        }
      ]
    },
    {
      id: 'company-info',
      title: 'Company Information',
      fields: [
        {
          id: 'company',
          type: 'shortText',
          label: 'Company Name',
          required: true
        },
        {
          id: 'website',
          type: 'website',
          label: 'Company Website',
          required: false
        },
        {
          id: 'phone',
          type: 'phoneNumber',
          label: 'Business Phone',
          required: true
        }
      ]
    },
    {
      id: 'feedback',
      title: 'Feedback',
      fields: [
        {
          id: 'satisfaction',
          type: 'numberRating',
          label: 'Rate your experience',
          required: true,
          minRating: 1,
          maxRating: 10
        }
      ]
    }
  ],
  layout: {
    type: 'multiStep',
    options: {
      multiStep: {
        showProgressBar: true,
        progressBarStyle: 'bar',
        allowBackNavigation: true,
        showStepTitles: true
      }
    }
  },
  // ... other configuration
};
```

### Custom Validation

```typescript
const fieldWithCustomValidation: ExtendedFormField = {
  id: 'username',
  type: 'shortText',
  label: 'Username',
  required: true,
  placeholder: 'Choose a unique username',
  validationRules: {
    pattern: '^[a-zA-Z0-9_]{3,20}$',
    customMessage: 'Username must be 3-20 characters and contain only letters, numbers, and underscores'
  },
  helpText: 'Your username will be visible to other users'
};
```

### Animation Customization

```typescript
const customAnimationConfig = {
  enabled: true,
  respectReducedMotion: true,
  intensity: 'dynamic',
  fieldEntrance: {
    preset: 'spring',
    timing: { duration: 0.4, delay: 0, stagger: 0.1 },
    easing: { type: 'spring', stiffness: 300, damping: 25 }
  },
  button: {
    hover: { scale: 1.05, duration: 0.2, easing: { type: 'easeOut' } },
    tap: { scale: 0.95, duration: 0.1 }
  }
};

<AnimationProvider initialConfig={customAnimationConfig}>
  <FormProvider form={form} onSubmit={onSubmit}>
    <PublicFormRenderer />
  </FormProvider>
</AnimationProvider>
```

### Converting Existing Forms

```typescript
import { convertToExtendedForm } from '@/components/public-form/utils/formUtils';

// Convert existing form format to extended format
const existingForm: Form = {
  id: 'old-form',
  title: 'Legacy Form',
  fields: [
    { id: 'name', type: 'text', label: 'Name', required: true },
    { id: 'rating', type: 'rating', label: 'Rating', required: false, maxRating: 5 }
  ],
  // ... other legacy properties
};

const extendedForm = convertToExtendedForm(existingForm);

// Now compatible with PublicFormRenderer
<PublicFormRenderer form={extendedForm} onSubmit={onSubmit} />
```

---

## API Reference

### PublicFormRenderer Props

```typescript
interface PublicFormRendererProps {
  form: ExtendedForm;                              // Form configuration
  onSubmit: (data: Record<string, any>) => Promise<void>; // Submission handler
  onFieldChange?: (fieldId: string, value: any) => void;  // Field change callback
  onStepChange?: (step: number) => void;           // Step change callback
  initialData?: Record<string, any>;              // Pre-filled form data
  readonly?: boolean;                             // Read-only mode
  showValidation?: boolean;                       // Show validation errors
}
```

### useFormContext Hook

```typescript
const {
  form,                    // Current form configuration
  formMethods,            // React Hook Form methods
  currentStep,            // Current step number (0-based)
  totalSteps,             // Total number of steps
  currentStepFields,      // Fields for current step
  formState,              // Form state object
  nextStep,               // Navigate to next step
  previousStep,           // Navigate to previous step
  goToStep,               // Navigate to specific step
  validateCurrentStep,    // Validate current step
  submitForm,             // Submit the form
  validateField,          // Validate specific field
  getFieldValue,          // Get field value
  setFieldValue,          // Set field value
  isFieldTouched,         // Check if field is touched
  getFieldError           // Get field error message
} = useFormContext();
```

### useAnimation Hook

```typescript
const {
  config,                 // Animation configuration
  variants,              // Animation variants
  transitions,           // Animation transitions
  updateConfig,          // Update configuration
  isReducedMotion,       // Reduced motion preference
  getFieldVariants,      // Get field animation variants
  getTransition          // Get animation transition
} = useAnimation();
```

---

## Best Practices

### Performance Optimization

1. **Lazy Load Field Components**
```typescript
const LazyTextField = lazy(() => import('./fields/ShortTextField'));

// Use Suspense for fallback
<Suspense fallback={<div>Loading...</div>}>
  <LazyTextField field={field} />
</Suspense>
```

2. **Memoize Complex Calculations**
```typescript
const memoizedValidation = useMemo(() => 
  buildValidationSchema(form.fields), 
  [form.fields]
);
```

3. **Optimize Re-renders**
```typescript
const MemoizedFormQuestion = memo(FormQuestion, (prev, next) => 
  prev.field.id === next.field.id && 
  prev.questionNumber === next.questionNumber
);
```

### Accessibility Guidelines

1. **Always Provide Labels**
```typescript
<label htmlFor={field.id} id={`question-${field.id}`}>
  {field.label}
  {field.required && <span aria-label="Required">*</span>}
</label>
```

2. **Use ARIA Attributes**
```typescript
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? `error-${field.id}` : undefined}
  aria-labelledby={`question-${field.id}`}
/>
```

3. **Provide Error Context**
```typescript
<div id={`error-${field.id}`} role="alert" aria-live="polite">
  {errorMessage}
</div>
```

### Validation Best Practices

1. **Use Appropriate Validation Timing**
```typescript
// Validate on blur for better UX
const formMethods = useForm({
  mode: 'onBlur',
  reValidateMode: 'onChange'
});
```

2. **Provide Clear Error Messages**
```typescript
{
  required: 'This field is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Please enter a valid email address'
  }
}
```

3. **Validate Progressively**
```typescript
// Validate current step before allowing navigation
const nextStep = async () => {
  const isValid = await validateCurrentStep();
  if (isValid) {
    proceedToNextStep();
  }
};
```

### Animation Guidelines

1. **Respect User Preferences**
```typescript
const prefersReducedMotion = useReducedMotion();
const animationConfig = {
  ...baseConfig,
  enabled: !prefersReducedMotion
};
```

2. **Use Appropriate Timing**
```typescript
// Quick interactions: 100-200ms
// Field animations: 200-400ms  
// Page transitions: 400-600ms
const timing = {
  fast: { duration: 0.15 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 }
};
```

3. **Provide Animation Intensity Options**
```typescript
const intensityMap = {
  none: 0,
  subtle: 0.5,
  normal: 1,
  dynamic: 1.5
};
```

---

## Advanced Customization

### Custom Field Types

To add a new field type:

1. **Extend the Type System**
```typescript
// Add to ExtendedFieldType
type ExtendedFieldType = 
  | 'shortText'
  | 'customFieldType'  // Add your new type
  | ...
```

2. **Create the Field Component**
```typescript
// components/fields/CustomField.tsx
export const CustomField: React.FC<CustomFieldProps> = ({ field }) => {
  return (
    <QuestionContainer field={field}>
      {/* Your custom field implementation */}
    </QuestionContainer>
  );
};
```

3. **Update FieldRenderer**
```typescript
// Add case to FieldRenderer.tsx
case 'customFieldType':
  return <CustomField field={field} />;
```

### Custom Animations

```typescript
// Define custom animation variants
const customVariants = {
  hidden: { opacity: 0, rotateX: -90 },
  visible: { 
    opacity: 1, 
    rotateX: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Use in components
<AnimatedFieldContainer 
  customVariants={customVariants}
  field={field}
>
  <YourComponent />
</AnimatedFieldContainer>
```

### Theme Integration

```typescript
// Apply theme colors to components
const getThemeClasses = (theme: FormTheme) => ({
  primary: `bg-[${theme.customization.colors.primary}]`,
  border: `border-[${theme.customization.colors.border.default}]`,
  text: `text-[${theme.customization.colors.text.primary}]`
});
```

---

## Installation and Setup

### Dependencies

```bash
npm install framer-motion react-hook-form @hookform/resolvers zod
npm install @types/react-hook-form --save-dev
```

### Quick Start

1. **Import the main components**
```typescript
import { PublicFormRenderer, ExtendedForm } from '@/components/public-form';
```

2. **Create your form configuration**
```typescript
const myForm: ExtendedForm = {
  // ... form configuration
};
```

3. **Render the form**
```typescript
<PublicFormRenderer
  form={myForm}
  onSubmit={handleSubmit}
/>
```

### Migration from Legacy Forms

Use the conversion utility to migrate existing forms:

```typescript
import { convertToExtendedForm } from '@/components/public-form/utils/formUtils';

const extendedForm = convertToExtendedForm(legacyForm);
```

---

## Troubleshooting

### Common Issues

1. **TypeScript Errors**
   - Ensure all required fields are provided in form configuration
   - Check that field types match ExtendedFieldType enum

2. **Animation Performance**
   - Use `intensity: 'subtle'` for lower-end devices
   - Respect `prefers-reduced-motion` user preference

3. **Validation Issues**
   - Verify validation rules are properly formatted
   - Check that required fields have appropriate validation

4. **Multi-step Navigation**
   - Ensure fieldGroups are properly configured
   - Validate current step before allowing navigation

### Debug Mode

Enable debug logging for development:

```typescript
const debugConfig = {
  ...formConfig,
  debug: process.env.NODE_ENV === 'development'
};
```

---

## Contributing

### Adding New Field Types

1. Create field component in `components/fields/`
2. Add TypeScript types to `types/fields.ts`
3. Update `FieldRenderer.tsx`
4. Add documentation and examples
5. Write tests

### Animation Contributions

1. Add new presets to `animation/presets.ts`
2. Update animation types
3. Test accessibility compliance
4. Document usage examples

---

## Support

For questions and support:

- Check the troubleshooting section
- Review the API reference
- Examine the usage examples
- Create an issue for bugs or feature requests

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**License**: MIT

This documentation provides a comprehensive guide to using and extending the Public Form System. The modular architecture allows for easy customization while maintaining consistency and accessibility throughout the form experience.