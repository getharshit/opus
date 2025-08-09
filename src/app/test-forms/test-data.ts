// src/app/test-forms/test-data.ts
import { ExtendedForm } from '@/components/public-form/types';

// Helper function to create default customization
const createDefaultCustomization = () => ({
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      title: 24,
      question: 16,
      description: 14,
      input: 16,
      button: 16
    },
    fontWeight: {
      title: 'bold' as const,
      question: 'medium' as const,
      description: 'normal' as const
    },
    lineHeight: {
      title: 1.2,
      question: 1.4,
      description: 1.5
    }
  },
  colors: {
    primary: '#3B82F6',
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
      focus: '#3B82F6',
      error: '#EF4444',
      hover: '#9CA3AF'
    },
    button: {
      primary: {
        background: '#3B82F6',
        text: '#FFFFFF',
        border: '#3B82F6',
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
    size: 'medium' as const,
    fullWidth: false
  },
  inputs: {
    borderRadius: 8,
    borderWidth: 1,
    focusRing: {
      width: 2,
      color: '#3B82F6',
      offset: 0
    },
    placeholder: {
      color: '#9CA3AF',
      opacity: 1
    }
  },
  layout: {
    questionAlignment: 'left' as const,
    inputAlignment: 'left' as const
  },
  animations: {
    enableAnimations: true,
    transitions: {
      duration: 200,
      easing: 'ease-in-out'
    }
  },
  branding: {
    watermark: {
      show: false,
      text: '',
      position: 'bottom-right' as const
    }
  }
});

const createDefaultTheme = () => ({
  id: 'default',
  name: 'Default Theme',
  customization: createDefaultCustomization(),
  isDefault: true,
  isCustom: false
});

const createDefaultSettings = () => ({
  allowMultipleSubmissions: true,
  showProgressBar: true,
  requireAllFields: false,
  collectIPAddress: false,
  collectUserAgent: false,
  enableSaveAndContinue: true
});

// Test Form 1: Single Column Layout with All Field Types
const singleColumnForm: ExtendedForm = {
  id: 'test-single-column',
  title: 'Complete Field Types Test',
  description: 'Testing all field types in a single column layout',
  fields: [
    {
      id: 'short-text',
      type: 'shortText',
      label: 'What is your full name?',
      description: 'Please enter your first and last name',
      required: true,
      placeholder: 'John Doe',
      maxLength: 100
    },
    {
      id: 'email',
      type: 'email',
      label: 'What is your email address?',
      required: true,
      placeholder: 'john@example.com'
    },
    {
      id: 'phone',
      type: 'phoneNumber',
      label: 'What is your phone number?',
      required: false,
      placeholder: '(555) 123-4567'
    },
    {
      id: 'website',
      type: 'website',
      label: 'Do you have a website?',
      required: false,
      placeholder: 'https://example.com'
    },
    {
      id: 'multiple-choice',
      type: 'multipleChoice',
      label: 'What is your preferred contact method?',
      required: true,
      options: ['Email', 'Phone', 'Text', 'Video Call', 'Other']
    },
    {
      id: 'dropdown',
      type: 'dropdown',
      label: 'What is your country?',
      required: true,
      options: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Other']
    },
    {
      id: 'yes-no',
      type: 'yesNo',
      label: 'Would you like to receive updates?',
      required: true
    },
    {
      id: 'rating',
      type: 'numberRating',
      label: 'How would you rate our service?',
      required: true,
      minRating: 1,
      maxRating: 5
    },
    {
      id: 'opinion-scale',
      type: 'opinionScale',
      label: 'How likely are you to recommend us?',
      required: true,
      minRating: 1,
      maxRating: 10
    },
    {
      id: 'long-text',
      type: 'longText',
      label: 'Any additional comments?',
      description: 'Please share any feedback or suggestions',
      required: false,
      placeholder: 'Type your detailed feedback here...',
      maxLength: 500
    },
    {
      id: 'legal',
      type: 'legal',
      label: 'I agree to the Terms and Conditions',
      description: '<p>By submitting this form, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.</p><p>We will use your information to improve our services and may contact you with updates.</p>',
      required: true,
      validationRules: {
        requireScrollToAccept: false
      }
    }
  ],
  customization: createDefaultCustomization(),
  layout: {
    type: 'singleColumn',
    options: {
      singleColumn: {
        maxWidth: 768,
        questionSpacing: 24,
        showAllQuestions: false
      }
    }
  },
  theme: createDefaultTheme(),
  settings: createDefaultSettings(),
  createdAt: new Date(),
  updatedAt: new Date()
};

// Test Form 2: Multi-Step Form
const multiStepForm: ExtendedForm = {
  id: 'test-multi-step',
  title: 'User Feedback Survey',
  description: 'Help us improve our product with your feedback',
  fields: [], // Fields will be in fieldGroups
  fieldGroups: [
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      fields: [
        {
          id: 'name',
          type: 'shortText',
          label: 'Your Name',
          required: true,
          placeholder: 'Enter your full name'
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          required: true,
          placeholder: 'your@email.com'
        },
        {
          id: 'role',
          type: 'dropdown',
          label: 'What is your role?',
          required: true,
          options: ['Developer', 'Designer', 'Product Manager', 'Founder', 'Other']
        }
      ]
    },
    {
      id: 'experience',
      title: 'Your Experience',
      description: 'Rate your experience with our product',
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
          id: 'ease-of-use',
          type: 'numberRating',
          label: 'Ease of use',
          required: true,
          minRating: 1,
          maxRating: 5
        },
        {
          id: 'recommend',
          type: 'yesNo',
          label: 'Would you recommend us?',
          required: true
        }
      ]
    },
    {
      id: 'feedback',
      title: 'Detailed Feedback',
      description: 'Share your thoughts and suggestions',
      fields: [
        {
          id: 'improvements',
          type: 'longText',
          label: 'What could we improve?',
          required: false,
          maxLength: 500,
          placeholder: 'Share your suggestions...'
        },
        {
          id: 'features',
          type: 'multipleChoice',
          label: 'Which feature do you use most?',
          required: true,
          options: ['Form Builder', 'Templates', 'Analytics', 'Integrations', 'API']
        }
      ]
    }
  ],
  customization: createDefaultCustomization(),
  layout: {
    type: 'multiStep',
    options: {
      multiStep: {
        showProgressBar: true,
        progressBarStyle: 'bar',
        showStepTitles: true,
        allowBackNavigation: true,
        saveProgress: true,
        showQuestionNumbers: true
      }
    }
  },
  theme: createDefaultTheme(),
  settings: createDefaultSettings(),
  createdAt: new Date(),
  updatedAt: new Date()
};

// Test Form 3: Welcome and Thank You Pages
const fullJourneyForm: ExtendedForm = {
  id: 'test-full-journey',
  title: 'Complete User Journey',
  description: 'Testing the full form experience',
  fields: [
    {
      id: 'welcome',
      type: 'startingPage',
      label: 'Welcome to Our Survey',
      description: 'Help us understand your needs better. This survey takes about 3 minutes to complete.',
      required: false,
      displayOptions: {
        estimatedTime: '3 minutes',
        participantCount: 1250,
        features: ['Anonymous', 'Secure', 'Mobile-friendly']
      }
    },
    {
      id: 'contact-method',
      type: 'multipleChoice',
      label: 'How did you hear about us?',
      required: true,
      options: ['Google Search', 'Social Media', 'Friend Referral', 'Advertisement', 'Other']
    },
    {
      id: 'experience',
      type: 'opinionScale',
      label: 'Rate your overall experience',
      required: true,
      minRating: 1,
      maxRating: 10
    },
    {
      id: 'statement',
      type: 'statement',
      label: 'Important Information',
      description: '<div class="space-y-3"><p><strong>Your Privacy Matters</strong></p><p>We take your privacy seriously. All data collected through this survey is:</p><ul class="list-disc list-inside space-y-1"><li>Encrypted and stored securely</li><li>Used only for research purposes</li><li>Never shared with third parties</li><li>Anonymized before analysis</li></ul></div>',
      required: false,
      displayOptions: {
        variant: 'info',
        links: [
          { text: 'Privacy Policy', url: '/privacy', external: false }
        ]
      }
    },
    {
      id: 'thanks',
      type: 'postSubmission',
      label: 'Thank You!',
      description: 'Your feedback has been recorded successfully. We appreciate your time and insights.',
      required: false,
      displayOptions: {
        showDownload: true,
        showShare: true,
        showFeedback: true,
        customActions: [
          {
            type: 'redirect',
            label: 'Back to Website',
            icon: 'home',
            style: 'secondary'
          }
        ]
      }
    }
  ],
  customization: createDefaultCustomization(),
  layout: {
    type: 'singleColumn',
    options: {
      singleColumn: {
        maxWidth: 768,
        questionSpacing: 32,
        showAllQuestions: false
      }
    }
  },
  theme: createDefaultTheme(),
  settings: createDefaultSettings(),
  createdAt: new Date(),
  updatedAt: new Date()
};

// Test Form 4: Validation Testing
const validationTestForm: ExtendedForm = {
  id: 'test-validation',
  title: 'Validation Testing Form',
  description: 'Testing all validation scenarios',
  fields: [
    {
      id: 'required-text',
      type: 'shortText',
      label: 'Required Text Field',
      required: true,
      placeholder: 'This field is required'
    },
    {
      id: 'pattern-text',
      type: 'shortText',
      label: 'Text with Pattern (letters only)',
      required: true,
      validationRules: {
        pattern: '^[a-zA-Z\\s]+$',
        customMessage: 'Only letters and spaces are allowed'
      }
    },
    {
      id: 'min-max-text',
      type: 'shortText',
      label: 'Text with Length Limits (5-20 chars)',
      required: true,
      minLength: 5,
      maxLength: 20
    },
    {
      id: 'email-validation',
      type: 'email',
      label: 'Email Validation',
      required: true,
      validationRules: {
        customMessage: 'Please enter a valid business email'
      }
    },
    {
      id: 'phone-validation',
      type: 'phoneNumber',
      label: 'Phone Number Validation',
      required: true
    },
    {
      id: 'website-validation',
      type: 'website',
      label: 'Website URL Validation',
      required: true
    },
    {
      id: 'rating-validation',
      type: 'numberRating',
      label: 'Rating (required)',
      required: true,
      minRating: 1,
      maxRating: 5
    },
    {
      id: 'legal-scroll',
      type: 'legal',
      label: 'Terms requiring scroll',
      description: '<div style="height: 200px; overflow-y: auto; padding: 16px; background: #f9fafb; border-radius: 8px;"><h3>Terms and Conditions</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p><p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p><p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p><p>Please scroll to the bottom to accept these terms.</p></div>',
      required: true,
      validationRules: {
        requireScrollToAccept: true
      }
    }
  ],
  customization: createDefaultCustomization(),
  layout: {
    type: 'singleColumn',
    options: {
      singleColumn: {
        maxWidth: 768,
        questionSpacing: 24,
        showAllQuestions: false
      }
    }
  },
  theme: createDefaultTheme(),
  settings: createDefaultSettings(),
  createdAt: new Date(),
  updatedAt: new Date()
};

export const testForms: Record<string, ExtendedForm> = {
  'single-column': singleColumnForm,
  'multi-step': multiStepForm,
  'full-journey': fullJourneyForm,
  'validation': validationTestForm
};