# Public Form System - Complete Documentation v2.0

A comprehensive, production-ready form rendering system built with React Hook Form, Framer Motion, and TypeScript. This system provides a flexible foundation for creating interactive, accessible forms with advanced features like multi-step navigation, custom animations, and extensive field type support.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Field Types](#field-types)
4. [Animation System](#animation-system)
5. [Layout Systems](#layout-systems)
6. [Form Providers](#form-providers)
7. [Validation System](#validation-system)
8. [Usage Examples](#usage-examples)
9. [API Reference](#api-reference)
10. [Best Practices](#best-practices)
11. [Advanced Features](#advanced-features)

---

## Overview

The Public Form System has been completely rewritten to provide enterprise-grade form functionality with modern UX patterns. This version includes significant improvements in field types, layout systems, and user experience.

### Key Features ✅

- **16 Field Types**: Complete set of form inputs from basic text to complex rating scales
- **Dual Layout System**: Single-column conversational flow and multi-step wizard layouts
- **Advanced Animations**: Smooth micro-interactions with Framer Motion integration
- **Full Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Smart Validation**: Real-time validation with custom rules and error handling
- **Progress Management**: Auto-save, session restoration, and exit intent handling
- **Responsive Design**: Mobile-first approach with optimal touch targets
- **TypeScript First**: Complete type safety with comprehensive interfaces

### Recent Enhancements

- ✅ **Choice-based Fields**: Advanced radio, dropdown, and scale components
- ✅ **Specialized Fields**: Legal, statement, and page fields for complex forms
- ✅ **Layout Systems**: Both single-column and multi-step implementations
- ✅ **Navigation**: Smart keyboard navigation and progress tracking
- ✅ **Animation Framework**: Comprehensive animation system with performance optimization

---

## Architecture

```
src/components/public-form/
├── types/                      # TypeScript definitions
│   ├── fields.ts              # Form field interfaces (16 types)
│   ├── customization.ts       # Theme and styling types
│   ├── layout.ts              # Layout configuration types
│   ├── theme.ts               # Theme system types
│   └── index.ts               # Type exports
├── animation/                  # Animation system
│   ├── types.ts               # Animation configuration types
│   ├── presets.ts             # Pre-built animation variants
│   ├── AnimationProvider.tsx  # Animation context provider
│   └── components/            # Animated components
│       ├── AnimatedFieldContainer.tsx
│       ├── AnimatedButton.tsx
│       ├── AnimatedErrorMessage.tsx
│       ├── AnimatedProgressIndicator.tsx
│       └── AnimatedStepTransition.tsx
├── providers/                  # React context providers
│   └── FormProvider.tsx       # Form state management
├── components/                 # Form components
│   ├── fields/                # Individual field components (16 types)
│   │   ├── ShortTextField.tsx
│   │   ├── LongTextField.tsx
│   │   ├── EmailField.tsx
│   │   ├── WebsiteField.tsx
│   │   ├── PhoneNumberField.tsx
│   │   ├── NumberRatingField.tsx
│   │   ├── MultipleChoiceField.tsx
│   │   ├── DropdownField.tsx
│   │   ├── YesNoField.tsx
│   │   ├── OpinionScaleField.tsx
│   │   ├── StatementField.tsx
│   │   ├── LegalField.tsx
│   │   ├── StartingPageField.tsx
│   │   ├── PostSubmissionField.tsx
│   │   └── QuestionContainer.tsx
│   ├── base-fields/           # Base field implementations
│   ├── FormQuestion.tsx       # Question wrapper component
│   ├── FieldRenderer.tsx      # Field type dispatcher
│   ├── FormNavigation.tsx     # Navigation controls
│   ├── StepIndicator.tsx      # Multi-step progress
│   ├── CompletionCelebration.tsx
│   └── PublicFormRenderer.tsx # Main form renderer
├── layouts/                    # Layout components
│   ├── SingleColumnLayout.tsx # Conversational single-column layout
│   └── MultiStepLayout.tsx    # Multi-step wizard layout
├── hooks/                      # Custom React hooks
│   ├── useFormValidation.ts   # Validation logic
│   ├── useKeyboardNavigation.ts
│   ├── useMultiStepProgress.ts
│   ├── useProgressSaving.ts
│   └── useStepGrouping.ts
├── utils/                      # Utility functions
│   └── formUtils.ts           # Form conversion utilities
└── index.ts                   # Main exports
```

---

## Field Types

The system now supports 16 field types, each with specialized functionality and UX patterns.

### Text-Based Fields

#### 1. ShortTextField
Single-line text input with character counting and real-time validation.

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
```

**Features:**
- Character counter with visual feedback
- Pattern validation support
- Auto-focus management
- Smooth resize animations

#### 2. LongTextField
Multi-line textarea with auto-resize functionality.

```typescript
const longTextField: ExtendedFormField = {
  id: 'feedback',
  type: 'longText',
  label: 'Detailed Feedback',
  description: 'Please provide comprehensive feedback',
  required: true,
  maxLength: 1000,
  placeholder: 'Type your detailed feedback here...'
};
```

**Features:**
- Auto-resizing (120px to 300px)
- Character counter with warning states
- Rich text preview support
- Scroll optimization

#### 3. EmailField
Email input with format validation and success indicators.

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
```

**Features:**
- RFC 5322 compliant email validation
- Visual success/error states
- Autocomplete integration
- Domain validation support

#### 4. WebsiteField
URL input with auto-formatting and link validation.

```typescript
const websiteField: ExtendedFormField = {
  id: 'website',
  type: 'website',
  label: 'Company Website',
  placeholder: 'https://example.com',
  helpText: 'Include http:// or https://'
};
```

**Features:**
- Auto-adds https:// if missing
- Link preview functionality
- External link validation
- Protocol detection

#### 5. PhoneNumberField
Phone input with automatic formatting and international support.

```typescript
const phoneField: ExtendedFormField = {
  id: 'phone',
  type: 'phoneNumber',
  label: 'Phone Number',
  required: true,
  placeholder: '(555) 123-4567'
};
```

**Features:**
- Auto-formatting as user types
- International number support
- Format validation
- Country code detection

### Choice-Based Fields

#### 6. MultipleChoiceField
Advanced radio button implementation with custom styling.

```typescript
const choiceField: ExtendedFormField = {
  id: 'preference',
  type: 'multipleChoice',
  label: 'What is your preferred contact method?',
  required: true,
  options: ['Email', 'Phone', 'SMS', 'Other']
};
```

**Features:**
- Custom styled radio buttons
- "Other" option with text input
- Keyboard navigation (Arrow keys)
- Smooth selection animations
- Hover and focus states

#### 7. DropdownField
Enhanced select dropdown with search and keyboard navigation.

```typescript
const dropdownField: ExtendedFormField = {
  id: 'country',
  type: 'dropdown',
  label: 'Select Country',
  required: true,
  options: ['United States', 'Canada', 'United Kingdom', /* ... */]
};
```

**Features:**
- Custom styled dropdown (no browser default)
- Search functionality for long lists
- Keyboard navigation (Arrow keys, Enter, Escape)
- Loading states and error handling
- Option categorization support

#### 8. YesNoField
Boolean choice with toggle or button variants.

```typescript
const yesNoField: ExtendedFormField = {
  id: 'subscribe',
  type: 'yesNo',
  label: 'Would you like to receive updates?',
  required: true
};
```

**Features:**
- Toggle switch variant
- Button-based variant
- Clear visual feedback
- Accessibility compliant
- Smooth state transitions

#### 9. OpinionScaleField
Interactive 1-10 opinion scale with visual feedback.

```typescript
const opinionField: ExtendedFormField = {
  id: 'satisfaction',
  type: 'opinionScale',
  label: 'How satisfied are you with our service?',
  required: true,
  minRating: 1,
  maxRating: 10
};
```

**Features:**
- Visual scale with color gradients
- Hover effects and selection feedback
- Semantic labels (Strongly Disagree → Strongly Agree)
- Keyboard navigation
- Animated selection indicators

### Rating Fields

#### 10. NumberRatingField
Star-based or numeric rating with customizable scale.

```typescript
const ratingField: ExtendedFormField = {
  id: 'rating',
  type: 'numberRating',
  label: 'Rate your experience',
  required: true,
  minRating: 1,
  maxRating: 5
};
```

**Features:**
- Star or number display options
- Customizable rating range
- Hover preview effects
- Semantic feedback labels
- Half-star support (planned)

### Specialized Fields

#### 11. StatementField
Rich text display with formatting and media support.

```typescript
const statementField: ExtendedFormField = {
  id: 'terms',
  type: 'statement',
  label: 'Important Information',
  description: '<p>Please read the following <strong>carefully</strong>...</p>',
  displayOptions: {
    variant: 'highlighted',
    imageUrl: 'https://example.com/info.jpg',
    links: [
      { text: 'Learn More', url: 'https://help.example.com', external: true }
    ]
  }
};
```

**Features:**
- Rich HTML content support
- Image integration
- External link handling
- Expandable/collapsible content
- Multiple visual variants

#### 12. LegalField
Checkbox with scrollable terms and acceptance tracking.

```typescript
const legalField: ExtendedFormField = {
  id: 'terms',
  type: 'legal',
  label: 'I agree to the Terms and Conditions',
  description: '<div>...long terms content...</div>',
  required: true,
  validationRules: {
    requireScrollToAccept: true
  }
};
```

**Features:**
- Scrollable terms container
- Scroll-to-bottom requirement
- External terms link support
- Clear acceptance language
- Audit trail support

#### 13. StartingPageField
Welcome screen with form introduction and metadata.

```typescript
const startField: ExtendedFormField = {
  id: 'start',
  type: 'startingPage',
  label: 'Welcome to Our Survey',
  description: 'Help us improve by sharing your feedback',
  displayOptions: {
    estimatedTime: '5 minutes',
    participantCount: 1250,
    features: ['Anonymous', 'Secure', 'Mobile-friendly']
  }
};
```

**Features:**
- Full-screen welcome layout
- Estimated completion time
- Participant statistics
- Feature highlights
- Branded appearance

#### 14. PostSubmissionField
Thank you screen with custom actions and sharing.

```typescript
const thanksField: ExtendedFormField = {
  id: 'thanks',
  type: 'postSubmission',
  label: 'Thank You!',
  description: 'Your response has been recorded',
  displayOptions: {
    showDownload: true,
    showShare: true,
    customActions: [
      { type: 'redirect', label: 'Back to Home', icon: 'home' }
    ]
  }
};
```

**Features:**
- Celebration animations
- Download receipt option
- Social sharing integration
- Custom action buttons
- Redirect functionality

#### 15. FileUploadField
File upload with drag-and-drop and validation.

```typescript
const fileField: ExtendedFormField = {
  id: 'document',
  type: 'fileUpload',
  label: 'Upload Document',
  required: true,
  acceptedFileTypes: ['.pdf', '.doc', '.docx'],
  maxFileSize: 10 // MB
};
```

**Features:**
- Drag and drop interface
- File type validation
- Size limit enforcement
- Upload progress tracking
- Preview generation

#### 16. PageBreakField
Multi-step form separator with transition effects.

```typescript
const pageBreak: ExtendedFormField = {
  id: 'break1',
  type: 'pageBreak',
  label: 'Section Complete'
};
```

**Features:**
- Visual step separation
- Smooth page transitions
- Progress indication
- Section completion feedback

---

## Animation System

The animation system provides smooth, accessible micro-interactions throughout the form experience.

### Animation Configuration

```typescript
interface AnimationConfig {
  enabled: boolean;
  respectReducedMotion: boolean;
  intensity: 'none' | 'subtle' | 'normal' | 'dynamic';
  
  fieldEntrance: {
    preset: AnimationPreset;
    timing: { duration: number; delay: number; stagger: number };
    easing: { type: string; stiffness?: number; damping?: number };
  };
  
  stepTransition: {
    preset: AnimationPreset;
    direction: 'forward' | 'backward' | 'auto';
  };
  
  button: {
    hover: { scale: number; duration: number };
    tap: { scale: number; duration: number };
  };
}
```

### Animation Presets

- **Field Animations**: `fade`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scale`, `bounce`, `elastic`, `spring`
- **Step Transitions**: `slideForward`, `slideBackward`, `fade`, `scale`
- **Error States**: `shake`, `pulse`, `bounce`
- **Success States**: `scale`, `bounce`, `checkmark`

### Animated Components

#### AnimatedFieldContainer
Provides entrance/exit animations for form fields.

```typescript
<AnimatedFieldContainer
  fieldId="email"
  animationPreset="slideUp"
  intensity="normal"
>
  <EmailField field={emailField} />
</AnimatedFieldContainer>
```

#### AnimatedButton
Interactive button with hover and tap states.

```typescript
<AnimatedButton
  variant="primary"
  onClick={handleSubmit}
  disabled={isSubmitting}
>
  Submit Form
</AnimatedButton>
```

#### AnimatedProgressIndicator
Smooth progress animations with multiple styles.

```typescript
<AnimatedProgressIndicator
  progress={completionPercentage}
  type="bar"
  showPercentage={true}
  animated={true}
/>
```

---

## Layout Systems

The form system supports two distinct layout approaches for different use cases.

### SingleColumnLayout

Conversational, mobile-first layout that displays one question at a time.

```typescript
<SingleColumnLayout form={form} state={formState}>
  {/* Auto-managed question display */}
</SingleColumnLayout>
```

**Features:**
- ✅ One question per screen
- ✅ Smooth scrolling transitions
- ✅ Progress indication (Question X of Y)
- ✅ Keyboard navigation (Enter/Arrow keys)
- ✅ Auto-advance for simple fields
- ✅ Auto-save progress
- ✅ Mobile-optimized touch targets
- ✅ Exit intent detection

**Navigation:**
- **Keyboard**: Arrow keys, Enter to advance, Escape for shortcuts
- **Touch**: Back/Next buttons, swipe gestures (planned)
- **Auto-advance**: Optional for yes/no and multiple choice fields

### MultiStepLayout

Wizard-style layout that groups related questions into logical steps.

```typescript
<MultiStepLayout 
  form={form} 
  state={formState}
  progressConfig={{
    type: 'bar',
    position: 'top',
    showPercentage: true,
    showStepLabels: true,
    animated: true
  }}
>
  {/* Auto-managed step display */}
</MultiStepLayout>
```

**Features:**
- ✅ Smart step grouping based on field types
- ✅ Step validation before progression
- ✅ Clickable step indicators
- ✅ Progress persistence across sessions
- ✅ Exit intent handling
- ✅ Smooth step transitions
- ✅ Completion celebration
- ✅ Auto-save between steps

**Step Management:**
- **Grouping**: Automatic based on field types or manual via `fieldGroups`
- **Validation**: Step-level validation before allowing navigation
- **Navigation**: Breadcrumb-style step indicators
- **Persistence**: Session storage with expiration

---

## Form Providers

### FormProvider

Manages comprehensive form state, validation, and navigation.

```typescript
interface FormProviderProps {
  form: ExtendedForm;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onFieldChange?: (fieldId: string, value: any) => void;
  onStepChange?: (step: number) => void;
  initialData?: Record<string, any>;
  children: React.ReactNode;
}
```

**Provides:**
- React Hook Form integration
- Multi-step navigation logic
- Validation orchestration
- Progress tracking
- Auto-save functionality
- Error handling

### AnimationProvider

Manages animation configuration and performance.

```typescript
<AnimationProvider initialConfig={animationConfig}>
  <FormProvider form={form} onSubmit={onSubmit}>
    <PublicFormRenderer />
  </FormProvider>
</AnimationProvider>
```

**Features:**
- Respects `prefers-reduced-motion`
- Performance monitoring
- Dynamic intensity adjustment
- Memory optimization

---

## Validation System

Comprehensive validation using Zod with React Hook Form integration.

### Validation Rules

```typescript
interface ValidationRules {
  pattern?: string;                    // Regex pattern
  min?: number;                       // Min value/length
  max?: number;                       // Max value/length
  customMessage?: string;             // Custom error message
  requireScrollToAccept?: boolean;    // For legal fields
}
```

### Field-Specific Validation

```typescript
// Email validation
fieldSchema = z.string().email('Please enter a valid email address');

// Phone validation
fieldSchema = z.string().regex(
  /^[\+]?[1-9][\d]{0,15}$/,
  'Please enter a valid phone number'
);

// Rating validation
fieldSchema = z.number().min(1).max(5, 'Rating must be between 1 and 5');

// File upload validation
fieldSchema = z.instanceof(FileList).refine((files) => {
  return files && files.length > 0;
}, 'Please upload a file');
```

### Real-time Validation

- **onBlur**: Validate when user leaves field
- **onChange**: Real-time for specific fields (email, phone)
- **onSubmit**: Full form validation before submission
- **Step validation**: Validate current step before navigation

---

## Usage Examples

### Basic Form Implementation

```typescript
import { PublicFormRenderer } from '@/components/public-form';

const contactForm: ExtendedForm = {
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
      id: 'rating',
      type: 'numberRating',
      label: 'Rate our service',
      required: true,
      minRating: 1,
      maxRating: 5
    }
  ],
  layout: { type: 'singleColumn', options: {} },
  // ... other configuration
};

export default function ContactPage() {
  const handleSubmit = async (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    // Process submission
  };

  return (
    <PublicFormRenderer
      form={contactForm}
      onSubmit={handleSubmit}
      showValidation={true}
    />
  );
}
```

### Multi-Step Form

```typescript
const surveyForm: ExtendedForm = {
  id: 'user-survey',
  title: 'User Experience Survey',
  description: 'Help us improve our product',
  fields: [], // Fields will be in fieldGroups
  fieldGroups: [
    {
      id: 'demographics',
      title: 'About You',
      description: 'Basic demographic information',
      fields: [
        {
          id: 'age',
          type: 'dropdown',
          label: 'Age Range',
          required: true,
          options: ['18-24', '25-34', '35-44', '45-54', '55+']
        },
        {
          id: 'role',
          type: 'shortText',
          label: 'Job Title',
          required: true
        }
      ]
    },
    {
      id: 'experience',
      title: 'Your Experience',
      description: 'Tell us about your experience',
      fields: [
        {
          id: 'satisfaction',
          type: 'opinionScale',
          label: 'Overall satisfaction',
          required: true,
          minRating: 1,
          maxRating: 10
        },
        {
          id: 'feedback',
          type: 'longText',
          label: 'Additional feedback',
          required: false,
          maxLength: 500
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
        allowBackNavigation: true
      }
    }
  }
};
```

### Advanced Choice Field

```typescript
const preferencesField: ExtendedFormField = {
  id: 'contact-method',
  type: 'multipleChoice',
  label: 'How would you prefer to be contacted?',
  description: 'Select your preferred method of communication',
  required: true,
  options: [
    'Email',
    'Phone call',
    'Text message',
    'Video call',
    'Other'
  ],
  helpText: 'We will only contact you using your preferred method'
};

// With keyboard navigation support
// Arrow keys to navigate, Enter to select, Escape to close
```

### Legal Field with Scroll Requirement

```typescript
const termsField: ExtendedFormField = {
  id: 'terms-acceptance',
  type: 'legal',
  label: 'I have read and agree to the Terms of Service',
  description: `
    <div class="terms-content">
      <h3>Terms of Service</h3>
      <p>By using our service, you agree to the following terms...</p>
      <!-- Long terms content -->
    </div>
  `,
  required: true,
  validationRules: {
    requireScrollToAccept: true,
    customMessage: 'You must read the complete terms before accepting'
  },
  displayOptions: {
    termsTitle: 'Terms of Service',
    externalLinks: [
      { text: 'Privacy Policy', url: '/privacy' },
      { text: 'Cookie Policy', url: '/cookies' }
    ]
  }
};
```

---

## API Reference

### PublicFormRenderer Props

```typescript
interface PublicFormRendererProps {
  form: ExtendedForm;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onFieldChange?: (fieldId: string, value: any) => void;
  onStepChange?: (step: number) => void;
  initialData?: Record<string, any>;
  readonly?: boolean;
  showValidation?: boolean;
}
```

### useFormContext Hook

```typescript
const {
  form,                    // Form configuration
  formMethods,            // React Hook Form methods
  currentStep,            // Current step (0-based)
  totalSteps,             // Total steps
  currentStepFields,      // Fields for current step
  formState,              // Form state object
  nextStep,               // Navigate to next step
  previousStep,           // Navigate to previous step
  goToStep,               // Navigate to specific step
  validateCurrentStep,    // Validate current step
  submitForm,             // Submit the form
  getFieldValue,          // Get field value
  setFieldValue,          // Set field value
  isFieldTouched,         // Check if field is touched
  getFieldError           // Get field error message
} = useFormContext();
```

### Animation Hooks

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

1. **Lazy Loading**
```typescript
const LazyDropdownField = lazy(() => import('./fields/DropdownField'));

<Suspense fallback={<FieldSkeleton />}>
  <LazyDropdownField field={field} />
</Suspense>
```

2. **Memoization**
```typescript
const MemoizedFormQuestion = memo(FormQuestion, (prev, next) => 
  prev.field.id === next.field.id && 
  prev.questionNumber === next.questionNumber
);
```

3. **Animation Performance**
```typescript
// Use will-change for animated elements
const animatedStyle = {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden'
};
```

### Accessibility Guidelines

1. **Semantic HTML**
```typescript
<fieldset role="group" aria-labelledby="preferences-legend">
  <legend id="preferences-legend">Contact Preferences</legend>
  {/* Radio buttons */}
</fieldset>
```

2. **ARIA Attributes**
```typescript
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? `error-${field.id}` : `help-${field.id}`}
  aria-required={field.required}
/>
```

3. **Error Announcements**
```typescript
<div role="alert" aria-live="polite">
  {errorMessage}
</div>
```

### Form Design Patterns

1. **Progressive Disclosure**
   - Start with essential fields
   - Add optional fields later
   - Use conditional logic wisely

2. **Clear Visual Hierarchy**
   - Group related fields
   - Use consistent spacing
   - Highlight required fields

3. **Error Prevention**
   - Provide clear labels
   - Use appropriate input types
   - Offer format examples

### Mobile Optimization

1. **Touch Targets**
   - Minimum 44px touch targets
   - Adequate spacing between elements
   - Easy thumb navigation

2. **Input Types**
   - Use appropriate keyboard types
   - Enable autocomplete where helpful
   - Support autofill patterns

3. **Viewport Considerations**
   - Prevent zoom on input focus
   - Optimize for landscape mode
   - Handle on-screen keyboard

---

## Advanced Features

### Conditional Logic

```typescript
const conditionalField: ExtendedFormField = {
  id: 'other-details',
  type: 'longText',
  label: 'Please specify',
  required: true,
  conditionalLogic: {
    showWhen: [
      {
        fieldId: 'contact-method',
        operator: 'equals',
        value: 'Other'
      }
    ]
  }
};
```

### Custom Field Types

To add a new field type:

1. **Extend the Type System**
```typescript
type ExtendedFieldType = 
  | 'shortText'
  | 'customFieldType'  // Add your new type
  | ...
```

2. **Create the Field Component**
```typescript
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
case 'customFieldType':
  return <CustomField field={field} />;
```

### Custom Animations

```typescript
const customVariants = {
  hidden: { opacity: 0, rotateX: -90 },
  visible: { 
    opacity: 1, 
    rotateX: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

<AnimatedFieldContainer 
  customVariants={customVariants}
  field={field}
>
  <YourComponent />
</AnimatedFieldContainer>
```

### Progress Persistence

```typescript
// Auto-save progress
const { saveProgress, loadProgress, clearProgress } = useProgressSaving({
  formId: form.id,
  currentQuestionIndex,
  currentStep,
  formMethods,
  enabled: true
});

// Load saved progress
useEffect(() => {
  const savedProgress = loadProgress();
  if (savedProgress) {
    // Restore form state
    restoreProgress(savedProgress);
  }
}, []);
```

### Exit Intent Handling

```typescript
// Detect when user is about to leave
useEffect(() => {
  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientY <= 0 && formProgress > 10) {
      setShowExitIntent(true);
    }
  };

  document.addEventListener('mouseleave', handleMouseLeave);
  return () => document.removeEventListener('mouseleave', handleMouseLeave);
}, [formProgress]);
```

---

## Migration Guide

### From Legacy Forms

Use the conversion utility to migrate existing forms:

```typescript
import { convertToExtendedForm } from '@/components/public-form/utils/formUtils';

const extendedForm = convertToExtendedForm(legacyForm);
```

### Breaking Changes

1. **Field Type Names**: `text` → `shortText`, `rating` → `numberRating`
2. **Layout Props**: New layout configuration structure
3. **Animation API**: Updated animation configuration
4. **Validation**: New Zod-based validation system

---

## Contributing

### Adding New Field Types

1. Create field component in `components/fields/`
2. Add TypeScript types to `types/fields.ts`
3. Update `FieldRenderer.tsx`
4. Add documentation and examples
5. Write comprehensive tests

### Field Component Template

```typescript
// components/fields/CustomField.tsx
"use client";

import React from "react";
import { useController } from "react-hook-form";
import { motion } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import { QuestionContainer } from "./QuestionContainer";
import { AnimatedErrorMessage } from "../../animation/components";
import { AlertCircle } from "lucide-react";

interface CustomFieldProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  className?: string;
}

export const CustomField: React.FC<CustomFieldProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
  className = "",
}) => {
  const { formMethods } = useFormContext();

  const {
    field: controllerField,
    fieldState: { error, isTouched },
  } = useController({
    name: field.id,
    control: formMethods.control,
    rules: {
      required: field.required ? `${field.label} is required` : false,
      // Add custom validation rules
    },
  });

  const hasError = !!error && isTouched;

  return (
    <QuestionContainer
      field={field}
      questionNumber={questionNumber}
      showQuestionNumber={showQuestionNumber}
      className={className}
    >
      <div className="custom-field space-y-2">
        {/* Custom field implementation */}
        <motion.div
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {/* Your field input component */}
        </motion.div>

        {/* Error Message */}
        <AnimatedErrorMessage isVisible={hasError}>
          <div
            id={`error-${field.id}`}
            className="flex items-start gap-2 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error?.message}</span>
          </div>
        </AnimatedErrorMessage>
      </div>
    </QuestionContainer>
  );
};
```

### Animation Contributions

1. Add new presets to `animation/presets.ts`
2. Update animation types in `animation/types.ts`
3. Test accessibility compliance
4. Document usage examples

---

## Testing Guide

### Unit Testing

```typescript
// __tests__/fields/ShortTextField.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShortTextField } from '../components/fields/ShortTextField';
import { FormProvider } from '../providers/FormProvider';

const mockField: ExtendedFormField = {
  id: 'test-field',
  type: 'shortText',
  label: 'Test Field',
  required: true,
  maxLength: 50
};

const renderWithProvider = (field: ExtendedFormField) => {
  return render(
    <FormProvider form={mockForm} onSubmit={jest.fn()}>
      <ShortTextField field={field} />
    </FormProvider>
  );
};

describe('ShortTextField', () => {
  it('renders with label and placeholder', () => {
    renderWithProvider(mockField);
    
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows validation error for required field', async () => {
    renderWithProvider(mockField);
    
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
  });

  it('shows character count', () => {
    renderWithProvider(mockField);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    expect(screen.getByText('5/50')).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
// __tests__/layouts/SingleColumnLayout.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PublicFormRenderer } from '../components/PublicFormRenderer';

const mockForm: ExtendedForm = {
  id: 'test-form',
  title: 'Test Form',
  fields: [
    {
      id: 'name',
      type: 'shortText',
      label: 'Name',
      required: true
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      required: true
    }
  ],
  layout: { type: 'singleColumn', options: {} }
  // ... other required properties
};

describe('SingleColumnLayout', () => {
  it('navigates between questions', async () => {
    render(
      <PublicFormRenderer
        form={mockForm}
        onSubmit={jest.fn()}
      />
    );

    // Should show first question
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();

    // Fill first question and navigate
    fireEvent.change(screen.getByRole('textbox'), { 
      target: { value: 'John Doe' } 
    });
    
    fireEvent.click(screen.getByText('Next'));

    // Should show second question
    await waitFor(() => {
      expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });
  });
});
```

### Accessibility Testing

```typescript
// __tests__/accessibility/form.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PublicFormRenderer } from '../components/PublicFormRenderer';

expect.extend(toHaveNoViolations);

describe('Form Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <PublicFormRenderer form={mockForm} onSubmit={jest.fn()} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    render(<PublicFormRenderer form={mockForm} onSubmit={jest.fn()} />);

    const input = screen.getByRole('textbox');
    
    // Tab navigation
    fireEvent.keyDown(input, { key: 'Tab' });
    expect(screen.getByText('Next')).toHaveFocus();

    // Arrow key navigation
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    // Should trigger next question navigation
  });
});
```

---

## Performance Optimization

### Bundle Size Analysis

```bash
# Analyze bundle size
npm run build:analyze

# Component-level analysis
npm install --save-dev @next/bundle-analyzer
```

### Code Splitting

```typescript
// Lazy load field components
const fieldComponents = {
  shortText: lazy(() => import('./fields/ShortTextField')),
  email: lazy(() => import('./fields/EmailField')),
  // ... other fields
};

// Dynamic import in FieldRenderer
const FieldComponent = fieldComponents[field.type];

return (
  <Suspense fallback={<FieldSkeleton />}>
    <FieldComponent field={field} />
  </Suspense>
);
```

### Memory Management

```typescript
// Cleanup animations on unmount
useEffect(() => {
  return () => {
    // Cancel pending animations
    cancelAnimationFrame(animationId);
  };
}, []);

// Debounce form validation
const debouncedValidation = useMemo(
  () => debounce(validateField, 300),
  [validateField]
);
```

### Rendering Optimization

```typescript
// Virtual scrolling for long forms
import { FixedSizeList as List } from 'react-window';

const VirtualizedForm = ({ fields }) => (
  <List
    height={600}
    itemCount={fields.length}
    itemSize={80}
    itemData={fields}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <FormQuestion field={data[index]} />
      </div>
    )}
  </List>
);
```

---

## Deployment Considerations

### Environment Configuration

```typescript
// next.config.js
const nextConfig = {
  // Optimize fonts
  optimizeFonts: true,
  
  // Compress images
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Bundle analysis
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
    }
    return config;
  },
};
```

### CDN Optimization

```typescript
// Optimize asset loading
const optimizedImageLoader = ({ src, width, quality }) => {
  return `https://cdn.example.com/${src}?w=${width}&q=${quality || 75}`;
};

// Use next/image for form assets
<Image
  loader={optimizedImageLoader}
  src="/form-background.jpg"
  alt="Form background"
  width={1200}
  height={600}
  priority
/>
```

### Progressive Enhancement

```typescript
// Fallback for JavaScript disabled
<noscript>
  <style>
    .js-only { display: none; }
    .no-js-fallback { display: block; }
  </style>
</noscript>

// Basic form without JavaScript
<form className="no-js-fallback" style={{ display: 'none' }}>
  {/* Static HTML form fields */}
</form>
```

---

## Security Considerations

### Input Sanitization

```typescript
import DOMPurify from 'dompurify';

// Sanitize rich text content
const sanitizeHTML = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'title']
  });
};

// Use in StatementField
<div dangerouslySetInnerHTML={{ 
  __html: sanitizeHTML(field.description) 
}} />
```

### File Upload Security

```typescript
// Validate file types
const validateFileType = (file: File, allowedTypes: string[]) => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return allowedTypes.includes(`.${fileExtension}`);
};

// Scan for malicious content
const scanFile = async (file: File) => {
  // Integration with virus scanning service
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/scan-file', {
    method: 'POST',
    body: formData
  });
  
  return response.json();
};
```

### CSRF Protection

```typescript
// Include CSRF token in form submissions
const submitWithCSRF = async (data: Record<string, any>) => {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  
  return fetch('/api/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    },
    body: JSON.stringify(data)
  });
};
```

---

## Troubleshooting

### Common Issues

1. **Animation Performance**
   ```typescript
   // Reduce animation complexity for low-end devices
   const isLowEndDevice = navigator.hardwareConcurrency <= 2;
   const animationIntensity = isLowEndDevice ? 'subtle' : 'normal';
   ```

2. **Form Validation Errors**
   ```typescript
   // Debug validation schema
   console.log('Validation Schema:', validationSchema.shape);
   console.log('Form Data:', formMethods.getValues());
   console.log('Form Errors:', formMethods.formState.errors);
   ```

3. **Memory Leaks**
   ```typescript
   // Cleanup event listeners
   useEffect(() => {
     const cleanup = () => {
       document.removeEventListener('keydown', handleKeyDown);
       clearInterval(autoSaveInterval);
     };
     
     return cleanup;
   }, []);
   ```

### Debug Mode

```typescript
// Enable debug mode
const debugConfig = {
  enabled: process.env.NODE_ENV === 'development',
  logLevel: 'verbose',
  showAnimationBounds: true,
  trackPerformance: true
};

// Debug component
const FormDebugger = ({ form, formState }) => {
  if (!debugConfig.enabled) return null;
  
  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded">
      <h3>Form Debug Info</h3>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </div>
  );
};
```

---

## API Documentation

### Field Configuration Reference

```typescript
interface ExtendedFormField {
  // Core properties
  id: string;                          // Unique field identifier
  type: ExtendedFieldType;             // Field type (16 options)
  label: string;                       // Field label (supports HTML)
  description?: string;                // Help text (supports HTML)
  required: boolean;                   // Required validation
  
  // Input properties
  placeholder?: string;                // Input placeholder
  defaultValue?: any;                  // Default field value
  helpText?: string;                   // Additional help text
  
  // Choice field properties
  options?: string[];                  // Options for choice fields
  
  // Numeric field properties
  maxRating?: number;                  // Max rating value
  minRating?: number;                  // Min rating value
  
  // Text field properties
  maxLength?: number;                  // Character limit
  minLength?: number;                  // Minimum characters
  
  // File field properties
  acceptedFileTypes?: string[];        // Allowed file types
  maxFileSize?: number;                // Max file size (MB)
  
  // Validation
  validationRules?: {
    pattern?: string;                  // Regex pattern
    min?: number;                      // Min value/length
    max?: number;                      // Max value/length
    customMessage?: string;            // Custom error message
    requireScrollToAccept?: boolean;   // Legal field requirement
  };
  
  // Display options
  displayOptions?: {
    width?: 'full' | 'half' | 'third'; // Field width
    showLabel?: boolean;               // Show/hide label
    showDescription?: boolean;         // Show/hide description
    inline?: boolean;                  // Inline layout
    variant?: string;                  // Visual variant
    imageUrl?: string;                 // Image URL
    imageAlt?: string;                 // Image alt text
    links?: LinkConfig[];              // External links
    estimatedTime?: string;            // Completion time
    participantCount?: number;         // Participant count
    features?: string[];               // Feature highlights
    showDownload?: boolean;            // Download option
    showShare?: boolean;               // Share option
    showFeedback?: boolean;            // Feedback option
    redirectUrl?: string;              // Redirect URL
    redirectDelay?: number;            // Redirect delay
    customActions?: ActionConfig[];    // Custom actions
  };
  
  // Conditional logic
  conditionalLogic?: {
    showWhen?: ConditionConfig[];      // Show conditions
    hideWhen?: ConditionConfig[];      // Hide conditions
  };
}
```

### Form Configuration Reference

```typescript
interface ExtendedForm {
  id: string;                          // Unique form identifier
  title: string;                       // Form title
  description?: string;                // Form description
  fields: ExtendedFormField[];         // Form fields
  fieldGroups?: FieldGroup[];          // Multi-step groups
  customization: FormCustomization;    // Visual customization
  layout: FormLayoutConfig;            // Layout configuration
  theme: FormTheme;                    // Theme settings
  settings: FormSettings;              // Form settings
  createdAt: Date;                     // Creation date
  updatedAt: Date;                     // Last update
}
```

---

## Change Log

### Version 2.0.0 (Current)

**Major Features:**
- ✅ Complete field type library (16 types)
- ✅ Dual layout system (Single-column + Multi-step)
- ✅ Advanced animation framework
- ✅ Comprehensive validation system
- ✅ Progress management and persistence
- ✅ Accessibility compliance (WCAG 2.1 AA)

**Field Types Added:**
- ✅ Choice-based fields (MultipleChoice, Dropdown, YesNo, OpinionScale)
- ✅ Specialized fields (Statement, Legal, StartingPage, PostSubmission)
- ✅ Enhanced text fields with validation
- ✅ Rating fields with interactive scales

**Layout Improvements:**
- ✅ SingleColumnLayout with smooth scrolling
- ✅ MultiStepLayout with step management
- ✅ Keyboard navigation support
- ✅ Auto-save and exit intent handling

**Animation System:**
- ✅ 12 animation presets
- ✅ Performance optimization
- ✅ Reduced motion support
- ✅ Custom animation support

### Version 1.0.0 (Previous)

**Basic Features:**
- Basic field types (text, email, rating)
- Simple form rendering
- Basic validation
- Static layouts

---

## Roadmap

### Version 2.1.0 (Planned)

**Enhanced Features:**
- [ ] Conditional field logic
- [ ] Advanced file upload with preview
- [ ] Form analytics and insights
- [ ] A/B testing support
- [ ] Advanced theming system

**Performance:**
- [ ] Virtual scrolling for long forms
- [ ] Improved bundle splitting
- [ ] Service worker support
- [ ] Offline form completion

### Version 2.2.0 (Future)

**Advanced Capabilities:**
- [ ] Real-time collaboration
- [ ] Voice input support
- [ ] AI-powered field suggestions
- [ ] Advanced form logic builder
- [ ] Integration marketplace

**Mobile Enhancements:**
- [ ] Native mobile app wrapper
- [ ] Gesture navigation
- [ ] Biometric authentication
- [ ] Progressive web app features

---

# Public Form System - Themes Folder Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [ThemeProvider Component](#themeprovider-component)
4. [CSS Custom Property System](#css-custom-property-system)
5. [Theme State Management](#theme-state-management)
6. [Default Theme Configuration](#default-theme-configuration)
7. [Theme Context API](#theme-context-api)
8. [Performance Considerations](#performance-considerations)
9. [Usage Examples](#usage-examples)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Overview

The `/public-form/themes` folder contains the foundational theming infrastructure for the Public Form System. This system enables real-time theme customization without component re-renders through CSS custom properties and efficient state management.

### Key Features

- **Real-time Theme Updates**: Changes apply instantly without re-rendering components
- **CSS Custom Properties**: All themeable values use CSS variables for maximum performance
- **Theme Persistence**: Automatic saving/loading of theme configurations
- **TypeScript Support**: Complete type safety for theme objects
- **Preview Mode**: Test theme changes without persisting them
- **Error Boundaries**: Graceful handling of theme-related failures

### File Structure

```
src/components/public-form/themes/
├── index.ts                    # Main exports
├── ThemeProvider.tsx          # Core theme provider component
├── defaultTheme.ts            # Default theme configuration
├── themeUtils.ts              # Theme utility functions
├── cssPropertyManager.ts      # CSS custom property management
├── themeStateReducer.ts       # Theme state management
└── types.ts                   # Theme-specific TypeScript types
```

---

## Architecture

The theme system is built on four core principles:

### 1. CSS Custom Properties Foundation
All themeable values are implemented as CSS custom properties, allowing for instant updates without component re-renders.

### 2. Centralized State Management
Theme state is managed through a reducer pattern with React Context, providing predictable state updates and easy debugging.

### 3. Dynamic CSS Injection
CSS properties are dynamically generated and injected into the document head, updating in real-time as theme values change.

### 4. Performance Optimization
The system minimizes layout thrashing and ensures smooth theme transitions through optimized CSS property updates.

---

## ThemeProvider Component

The `ThemeProvider` is the root component that manages theme state and provides theme context to all child components.

### Core Responsibilities

1. **Theme State Management**: Maintains current theme configuration and handles updates
2. **CSS Property Injection**: Dynamically generates and injects CSS custom properties
3. **Context Provision**: Provides theme context to all child components
4. **Persistence Handling**: Automatically saves and loads theme configurations
5. **Error Boundary**: Handles theme-related errors gracefully

### Implementation Overview

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Partial<FormTheme>;
  enablePersistence?: boolean;
  onThemeChange?: (theme: FormTheme) => void;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
  enablePersistence = true,
  onThemeChange
}) => {
  // Theme state management with reducer
  // CSS property generation and injection
  // Context value creation and provision
};
```

### Key Features

- **Lazy Initialization**: Theme is initialized only when first accessed
- **Batch Updates**: Multiple theme changes are batched for performance
- **Fallback Handling**: Graceful degradation when theme loading fails
- **Memory Management**: Proper cleanup of CSS injections on unmount

---

## CSS Custom Property System

The CSS custom property system provides the foundation for real-time theme updates.

### Property Naming Convention

All CSS custom properties follow a consistent naming pattern:

```css
/* Color properties */
--form-color-primary: #3B82F6;
--form-color-secondary: #6B7280;
--form-color-background: #FFFFFF;

/* Typography properties */
--form-font-family-primary: 'Inter', sans-serif;
--form-font-size-title: 24px;
--form-font-weight-bold: 700;

/* Spacing properties */
--form-spacing-xs: 4px;
--form-spacing-sm: 8px;
--form-spacing-md: 16px;

/* Component-specific properties */
--form-button-border-radius: 8px;
--form-input-padding: 12px;
--form-shadow-elevation: 0 4px 6px rgba(0, 0, 0, 0.1);
```

### Dynamic Property Generation

The system automatically generates CSS properties from theme configuration:

```typescript
const generateCSSProperties = (theme: FormTheme): Record<string, string> => {
  return {
    '--form-color-primary': theme.colors.primary,
    '--form-color-secondary': theme.colors.secondary,
    '--form-font-family': theme.typography.fontFamily,
    // ... additional properties
  };
};
```

### Property Categories

1. **Colors**: Primary, secondary, background, text, borders
2. **Typography**: Font families, sizes, weights, line heights
3. **Spacing**: Margins, paddings, gaps
4. **Borders**: Radius, widths, styles
5. **Shadows**: Box shadows, text shadows
6. **Animations**: Durations, easings, delays

---

## Theme State Management

Theme state is managed through a reducer pattern for predictable updates and easy debugging.

### State Structure

```typescript
interface ThemeState {
  currentTheme: FormTheme;
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
  previewMode: boolean;
  history: FormTheme[];
  historyIndex: number;
}
```

### Action Types

```typescript
type ThemeAction = 
  | { type: 'SET_THEME'; payload: FormTheme }
  | { type: 'UPDATE_COLORS'; payload: Partial<ColorCustomization> }
  | { type: 'UPDATE_TYPOGRAPHY'; payload: Partial<TypographyCustomization> }
  | { type: 'TOGGLE_PREVIEW_MODE'; payload: boolean }
  | { type: 'RESET_THEME' }
  | { type: 'UNDO' }
  | { type: 'REDO' };
```

### Reducer Implementation

The theme reducer handles all state updates with proper immutability and validation:

```typescript
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        currentTheme: validateTheme(action.payload),
        isDirty: true
      };
    // ... other cases
  }
};
```

### Key Features

- **Immutable Updates**: All state changes create new objects
- **Validation**: Theme objects are validated before state updates
- **History Management**: Undo/redo functionality with configurable history size
- **Preview Mode**: Temporary theme changes that don't affect persisted state

---

## Default Theme Configuration

The default theme provides a comprehensive base configuration that can be customized.

### Structure Overview

```typescript
export const defaultTheme: FormTheme = {
  id: 'default',
  name: 'Default Theme',
  description: 'Clean and professional default theme',
  customization: {
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      // ... complete color palette
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: {
        title: 24,
        question: 16,
        // ... all font sizes
      }
      // ... complete typography config
    },
    // ... other customization categories
  }
};
```

### Design Principles

1. **Accessibility First**: High contrast ratios and readable font sizes
2. **Cross-Platform**: Fonts and colors that work across all devices
3. **Professional**: Clean, business-appropriate styling
4. **Extensible**: Easy to override and customize

### Customization Categories

- **Colors**: Complete color palette with semantic naming
- **Typography**: Font families, sizes, weights, and spacing
- **Layout**: Spacing, padding, margins, and alignment
- **Components**: Button styles, input styles, card styles
- **Animations**: Transitions, durations, and easing functions

---

## Theme Context API

The theme context provides components with access to theme values and update functions.

### Context Value Structure

```typescript
interface ThemeContextValue {
  // Current theme state
  theme: FormTheme;
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Theme update functions
  updateTheme: (updates: Partial<FormTheme>) => void;
  updateColors: (colors: Partial<ColorCustomization>) => void;
  updateTypography: (typography: Partial<TypographyCustomization>) => void;
  
  // Theme management
  resetTheme: () => void;
  saveTheme: () => Promise<void>;
  loadTheme: (themeId: string) => Promise<void>;
  
  // Preview mode
  enablePreviewMode: () => void;
  disablePreviewMode: () => void;
  
  // History management
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
```

### Usage Hook

```typescript
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### Component Integration

Components can access theme values through the context:

```typescript
const FormButton: React.FC = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <button 
      style={{
        backgroundColor: `var(--form-color-primary, ${theme.colors.primary})`,
        borderRadius: `var(--form-button-border-radius, 8px)`
      }}
    >
      {children}
    </button>
  );
};
```

---

## Performance Considerations

The theme system is optimized for performance and smooth user experience.

### CSS Property Updates

- **Batch Updates**: Multiple property changes are batched into single DOM updates
- **Debounced Changes**: Rapid theme changes are debounced to prevent excessive updates
- **Selective Updates**: Only changed properties are updated, not entire stylesheets

### Memory Management

- **Property Cleanup**: CSS properties are removed when components unmount
- **Event Listener Management**: Proper cleanup of event listeners and observers
- **Theme Caching**: Frequently used themes are cached in memory

### Render Optimization

- **No Re-renders**: Theme changes don't trigger component re-renders
- **CSS-Only Updates**: Visual changes happen purely through CSS property updates
- **Layout Stability**: Changes avoid triggering layout recalculations

### Browser Compatibility

- **Fallback Values**: CSS properties include fallback values for older browsers
- **Feature Detection**: Progressive enhancement for advanced CSS features
- **Polyfill Support**: Optional polyfills for CSS custom property support

---

## Usage Examples

### Basic Theme Usage

```typescript
import { ThemeProvider, useTheme } from '@/components/public-form/themes';

// Wrap your app with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <FormComponent />
    </ThemeProvider>
  );
}

// Use theme in components
function FormComponent() {
  const { theme, updateColors } = useTheme();
  
  const handleColorChange = (newPrimary: string) => {
    updateColors({ primary: newPrimary });
  };
  
  return (
    <div style={{ color: `var(--form-color-primary)` }}>
      {/* Component content */}
    </div>
  );
}
```

### Custom Theme Loading

```typescript
function CustomThemeLoader() {
  const { loadTheme, theme } = useTheme();
  
  const loadCustomTheme = async () => {
    try {
      await loadTheme('custom-brand-theme');
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };
  
  return (
    <button onClick={loadCustomTheme}>
      Load Custom Theme
    </button>
  );
}
```

### Preview Mode Usage

```typescript
function ThemePreview() {
  const { enablePreviewMode, disablePreviewMode, updateColors } = useTheme();
  
  const previewColorChange = (color: string) => {
    enablePreviewMode();
    updateColors({ primary: color });
    
    // Auto-disable preview after 5 seconds
    setTimeout(() => {
      disablePreviewMode();
    }, 5000);
  };
  
  return (
    <button onClick={() => previewColorChange('#FF6B6B')}>
      Preview Red Theme
    </button>
  );
}
```

---

## Best Practices

### Theme Design

1. **Semantic Naming**: Use descriptive names for theme properties
2. **Consistent Scaling**: Use consistent scaling ratios for sizes
3. **Accessibility**: Ensure adequate contrast ratios
4. **Fallbacks**: Always provide fallback values

### Performance

1. **Batch Updates**: Group related theme changes together
2. **Avoid Frequent Changes**: Debounce rapid theme updates
3. **Use CSS Properties**: Leverage CSS custom properties for all themeable values
4. **Memory Management**: Clean up resources properly

### Development

1. **Type Safety**: Use TypeScript interfaces for all theme objects
2. **Validation**: Validate theme objects before applying
3. **Error Handling**: Implement proper error boundaries
4. **Testing**: Test theme changes across different components

### User Experience

1. **Smooth Transitions**: Use CSS transitions for theme changes
2. **Preview Mode**: Allow users to preview changes before applying
3. **Undo/Redo**: Provide theme change history
4. **Persistence**: Save user theme preferences

---

## Troubleshooting

### Common Issues

#### Theme Changes Not Applying

**Symptoms**: Theme updates don't reflect in components
**Solutions**:
- Check CSS custom property naming consistency
- Verify ThemeProvider is wrapping components
- Ensure components are using CSS properties, not direct theme values

#### Performance Issues

**Symptoms**: Slow theme updates or janky animations
**Solutions**:
- Batch theme updates together
- Use debouncing for rapid changes
- Check for layout-triggering CSS changes

#### Persistence Problems

**Symptoms**: Themes not saving or loading correctly
**Solutions**:
- Verify localStorage permissions
- Check theme serialization/deserialization
- Validate theme object structure

### Debug Mode

```typescript
// Enable debug mode for detailed logging
const debugTheme = {
  enabled: process.env.NODE_ENV === 'development',
  logUpdates: true,
  trackPerformance: true
};
```

### Error Boundaries

```typescript
class ThemeErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Theme error:', error, errorInfo);
    // Reset to default theme
    this.resetToDefaultTheme();
  }
}
```

---

## API Reference

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Partial<FormTheme>;
  enablePersistence?: boolean;
  onThemeChange?: (theme: FormTheme) => void;
  onError?: (error: Error) => void;
  debugMode?: boolean;
}
```

### Theme Hook

```typescript
const {
  theme,           // Current theme object
  isDirty,         // Has unsaved changes
  isLoading,       // Theme loading state
  error,           // Current error state
  updateTheme,     // Update entire theme
  updateColors,    // Update colors only
  resetTheme,      // Reset to default
  saveTheme,       // Save current theme
  undo,           // Undo last change
  redo            // Redo last undone change
} = useTheme();
```

### CSS Property Categories

- **Colors**: `--form-color-*`
- **Typography**: `--form-font-*`
- **Spacing**: `--form-spacing-*`
- **Borders**: `--form-border-*`
- **Shadows**: `--form-shadow-*`
- **Animations**: `--form-animation-*`

---

## Integration with Form Builder

The theme system is designed to integrate seamlessly with the form builder:

1. **Real-time Preview**: Theme changes apply instantly in the form builder preview
2. **Component Compatibility**: All form components use CSS custom properties
3. **Export/Import**: Themes can be exported and imported as JSON
4. **Validation**: Theme objects are validated before application

---

**Version**: 2.0.0  
**Last Updated**: December 2024  
**Maintainer**: Forms Team

This documentation covers the foundational theming infrastructure. The theme system provides the base for building advanced customization features while maintaining performance and usability.


## Support and Resources

### Documentation
- [Getting Started Guide](./getting-started.md)
- [Field Type Reference](./field-types.md)
- [Animation Guide](./animations.md)
- [Accessibility Guide](./accessibility.md)

### Community
- [GitHub Issues](https://github.com/your-org/public-form/issues)
- [Discussions](https://github.com/your-org/public-form/discussions)
- [Contributing Guide](./CONTRIBUTING.md)

### Examples
- [CodeSandbox Examples](https://codesandbox.io/examples/public-form)
- [Storybook Components](https://storybook.public-form.dev)
- [Live Demos](https://demo.public-form.dev)

---

**Version**: 2.0.0  
**Last Updated**: December 2024  
**License**: MIT  
**Maintainer**: Forms Team

