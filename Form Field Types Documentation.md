# Form Field Types Documentation v2.0

## Overview

This document provides comprehensive documentation for all 16 field types supported by the Public Forms System v2.0. Each field type includes specifications, validation rules, display options, and implementation examples.

## Field Types Summary

The system supports 16 distinct field types organized into categories:

### Text-Based Fields (5 types)
- **shortText** - Single-line text input
- **longText** - Multi-line textarea
- **email** - Email address input with validation
- **website** - URL input with validation
- **phoneNumber** - Phone number input with formatting

### Choice-Based Fields (3 types)
- **multipleChoice** - Radio button selection
- **dropdown** - Select dropdown menu
- **yesNo** - Boolean yes/no choice

### Rating Fields (2 types)
- **numberRating** - Numeric rating scale (customizable range)
- **opinionScale** - 1-10 opinion scale with semantic labels

### Special Fields (6 types)
- **statement** - Display-only content with rich formatting
- **legal** - Terms acceptance with scrollable content
- **fileUpload** - File upload with validation
- **pageBreak** - Multi-step form section breaks
- **startingPage** - Welcome/intro screen
- **postSubmission** - Thank you/completion screen

---

## Text-Based Fields

### 1. shortText

Single-line text input for names, titles, and short responses.

#### Properties

```typescript
interface ShortTextField extends BaseField {
  type: 'shortText';
  placeholder?: string;           // Input placeholder text
  maxLength?: number;            // Maximum character count
  minLength?: number;            // Minimum character count
  defaultValue?: string;         // Pre-filled value
  
  validationRules?: {
    pattern?: string;            // Regex pattern for validation
    customMessage?: string;      // Custom error message
  };
  
  displayOptions?: {
    width?: 'full' | 'half' | 'third';
    showCharacterCount?: boolean;
  };
}
```

#### Usage Example

```json
{
  "id": "firstName",
  "type": "shortText",
  "label": "First Name",
  "description": "Enter your legal first name",
  "required": true,
  "placeholder": "John",
  "maxLength": 50,
  "validationRules": {
    "pattern": "^[a-zA-Z\\s]+$",
    "customMessage": "Name can only contain letters and spaces"
  },
  "displayOptions": {
    "width": "half",
    "showCharacterCount": true
  }
}
```

#### Validation Rules

- **Required**: Validates non-empty input
- **Length**: Enforces min/max character limits
- **Pattern**: Custom regex validation
- **Character Count**: Visual feedback for length limits

#### Best Practices

- Use for single-line inputs (names, titles, IDs)
- Set appropriate maxLength (typically 50-100 characters)
- Provide clear placeholder examples
- Use pattern validation for specific formats

---

### 2. longText

Multi-line textarea for detailed responses and comments.

#### Properties

```typescript
interface LongTextField extends BaseField {
  type: 'longText';
  placeholder?: string;
  maxLength?: number;            // Character limit (default: 1000)
  minLength?: number;
  defaultValue?: string;
  
  validationRules?: {
    customMessage?: string;
  };
  
  displayOptions?: {
    rows?: number;               // Initial textarea height
    autoResize?: boolean;        // Auto-expand on typing
    showCharacterCount?: boolean;
  };
}
```

#### Usage Example

```json
{
  "id": "feedback",
  "type": "longText",
  "label": "Detailed Feedback",
  "description": "Please provide comprehensive feedback about your experience",
  "required": true,
  "placeholder": "Tell us about your experience, what went well, and areas for improvement...",
  "maxLength": 1000,
  "displayOptions": {
    "rows": 4,
    "autoResize": true,
    "showCharacterCount": true
  }
}
```

#### Features

- **Auto-resize**: Expands height as user types
- **Character counter**: Shows remaining characters
- **Rich text support**: Basic HTML formatting (planned)

#### Best Practices

- Use for detailed responses requiring multiple sentences
- Set reasonable maxLength (500-2000 characters)
- Enable character counter for long text
- Consider user experience on mobile devices

---

### 3. email

Email address input with built-in validation and formatting.

#### Properties

```typescript
interface EmailField extends BaseField {
  type: 'email';
  placeholder?: string;          // Default: "name@example.com"
  defaultValue?: string;
  
  validationRules?: {
    customMessage?: string;      // Override default email error
    allowedDomains?: string[];   // Restrict to specific domains
    blockedDomains?: string[];   // Block specific domains
  };
  
  displayOptions?: {
    showValidationIcon?: boolean; // Green checkmark when valid
  };
}
```

#### Usage Example

```json
{
  "id": "userEmail",
  "type": "email",
  "label": "Email Address",
  "description": "We'll use this to send you updates",
  "required": true,
  "placeholder": "name@company.com",
  "validationRules": {
    "allowedDomains": ["company.com", "partner.com"],
    "customMessage": "Please use your company email address"
  },
  "displayOptions": {
    "showValidationIcon": true
  }
}
```

#### Validation Features

- **Format Validation**: RFC 5322 compliant email validation
- **Real-time Validation**: Immediate feedback as user types
- **Domain Filtering**: Allow/block specific domains
- **Visual Feedback**: Success/error indicators

#### Best Practices

- Always include helpful placeholder text
- Use domain validation for business forms
- Provide clear error messages
- Consider autocomplete attributes

---

### 4. website

URL input with validation and auto-formatting.

#### Properties

```typescript
interface WebsiteField extends BaseField {
  type: 'website';
  placeholder?: string;          // Default: "https://example.com"
  defaultValue?: string;
  
  validationRules?: {
    requireHttps?: boolean;      // Force HTTPS URLs
    allowedProtocols?: string[]; // ['http', 'https', 'ftp']
    customMessage?: string;
  };
  
  displayOptions?: {
    autoAddProtocol?: boolean;   // Auto-add https:// if missing
    showLinkPreview?: boolean;   // Show clickable link when valid
  };
}
```

#### Usage Example

```json
{
  "id": "companyWebsite",
  "type": "website",
  "label": "Company Website",
  "description": "Your company's main website URL",
  "required": false,
  "placeholder": "https://yourcompany.com",
  "validationRules": {
    "requireHttps": true,
    "customMessage": "Please enter a secure HTTPS website URL"
  },
  "displayOptions": {
    "autoAddProtocol": true,
    "showLinkPreview": true
  }
}
```

#### Features

- **Auto-protocol**: Automatically adds https:// if missing
- **Link Preview**: Shows clickable link when valid
- **Protocol Validation**: Ensures proper URL format
- **Security Options**: Can require HTTPS

#### Best Practices

- Enable auto-protocol for better UX
- Use HTTPS requirement for business forms
- Provide example URLs in placeholder
- Consider link validation for active URLs

---

### 5. phoneNumber

Phone number input with formatting and international support.

#### Properties

```typescript
interface PhoneNumberField extends BaseField {
  type: 'phoneNumber';
  placeholder?: string;          // Default: "(555) 123-4567"
  defaultValue?: string;
  
  validationRules?: {
    format?: 'US' | 'international' | 'custom';
    customPattern?: string;      // Custom phone regex
    customMessage?: string;
  };
  
  displayOptions?: {
    autoFormat?: boolean;        // Format as user types
    showCountryCode?: boolean;   // Include country selector
    allowedCountries?: string[]; // ISO country codes
  };
}
```

#### Usage Example

```json
{
  "id": "contactPhone",
  "type": "phoneNumber",
  "label": "Phone Number",
  "description": "We'll only call during business hours",
  "required": false,
  "placeholder": "+1 (555) 123-4567",
  "validationRules": {
    "format": "international",
    "customMessage": "Please enter a valid phone number with country code"
  },
  "displayOptions": {
    "autoFormat": true,
    "showCountryCode": true,
    "allowedCountries": ["US", "CA", "GB"]
  }
}
```

#### Features

- **Auto-formatting**: Formats number as user types
- **International Support**: Country codes and formats
- **Flexible Validation**: Multiple format options
- **Visual Feedback**: Real-time format validation

#### Best Practices

- Enable auto-formatting for better UX
- Use international format for global forms
- Provide clear format examples
- Consider optional vs required based on use case

---

## Choice-Based Fields

### 6. multipleChoice

Radio button selection for single-choice questions.

#### Properties

```typescript
interface MultipleChoiceField extends BaseField {
  type: 'multipleChoice';
  options: string[];             // Array of choice options
  defaultValue?: string;         // Pre-selected option
  
  validationRules?: {
    customMessage?: string;
  };
  
  displayOptions?: {
    layout?: 'vertical' | 'horizontal' | 'grid';
    columns?: number;            // For grid layout
    allowOther?: boolean;        // Add "Other" option with text input
    otherLabel?: string;         // Custom "Other" option label
    randomizeOptions?: boolean;  // Randomize option order
  };
}
```

#### Usage Example

```json
{
  "id": "preferredContact",
  "type": "multipleChoice",
  "label": "How would you prefer to be contacted?",
  "description": "Select your preferred communication method",
  "required": true,
  "options": [
    "Email",
    "Phone call",
    "Text message",
    "Video call"
  ],
  "displayOptions": {
    "layout": "vertical",
    "allowOther": true,
    "otherLabel": "Other method",
    "randomizeOptions": false
  }
}
```

#### Features

- **Flexible Layouts**: Vertical, horizontal, or grid arrangement
- **"Other" Option**: Free-text input for unlisted choices
- **Option Randomization**: Prevent order bias
- **Keyboard Navigation**: Arrow key navigation

#### Best Practices

- Limit to 2-7 options for best UX
- Use clear, mutually exclusive options
- Consider "Other" option for completeness
- Order options logically (alphabetical, frequency, etc.)

---

### 7. dropdown

Select dropdown menu for longer option lists.

#### Properties

```typescript
interface DropdownField extends BaseField {
  type: 'dropdown';
  options: string[];
  defaultValue?: string;
  
  validationRules?: {
    customMessage?: string;
  };
  
  displayOptions?: {
    placeholder?: string;        // "Select an option..."
    searchable?: boolean;        // Enable option search
    grouping?: {                 // Group options by category
      [groupName: string]: string[];
    };
    maxHeight?: number;          // Dropdown max height (px)
  };
}
```

#### Usage Example

```json
{
  "id": "country",
  "type": "dropdown",
  "label": "Country",
  "description": "Select your country of residence",
  "required": true,
  "options": [
    "United States",
    "Canada", 
    "United Kingdom",
    "Australia",
    "Germany",
    "France"
  ],
  "displayOptions": {
    "placeholder": "Choose your country...",
    "searchable": true,
    "maxHeight": 200,
    "grouping": {
      "North America": ["United States", "Canada"],
      "Europe": ["United Kingdom", "Germany", "France"],
      "Oceania": ["Australia"]
    }
  }
}
```

#### Features

- **Searchable Options**: Type-to-filter functionality
- **Option Grouping**: Organize long lists by category
- **Keyboard Navigation**: Full keyboard support
- **Custom Styling**: Consistent with form theme

#### Best Practices

- Use for 8+ options (prefer radio buttons for fewer)
- Enable search for 15+ options
- Group related options logically
- Provide clear placeholder text

---

### 8. yesNo

Boolean choice field with multiple display variants.

#### Properties

```typescript
interface YesNoField extends BaseField {
  type: 'yesNo';
  defaultValue?: boolean;
  
  validationRules?: {
    customMessage?: string;
  };
  
  displayOptions?: {
    variant?: 'radio' | 'toggle' | 'buttons';
    labels?: {
      yes?: string;              // Custom "Yes" label
      no?: string;               // Custom "No" label
    };
    style?: 'default' | 'emphasized';
  };
}
```

#### Usage Example

```json
{
  "id": "newsletterSubscribe",
  "type": "yesNo",
  "label": "Subscribe to Newsletter",
  "description": "Would you like to receive our monthly newsletter?",
  "required": false,
  "defaultValue": false,
  "displayOptions": {
    "variant": "toggle",
    "labels": {
      "yes": "Yes, send me updates",
      "no": "No thanks"
    },
    "style": "emphasized"
  }
}
```

#### Display Variants

- **Radio**: Traditional radio buttons
- **Toggle**: Switch-style toggle
- **Buttons**: Large button-style selection

#### Best Practices

- Use toggle for settings/preferences
- Use radio buttons for important decisions
- Provide clear, descriptive labels
- Consider default values carefully

---

## Rating Fields

### 9. numberRating

Numeric rating scale with customizable range and styling.

#### Properties

```typescript
interface NumberRatingField extends BaseField {
  type: 'numberRating';
  minRating: number;             // Minimum rating value
  maxRating: number;             // Maximum rating value
  defaultValue?: number;
  
  validationRules?: {
    customMessage?: string;
  };
  
  displayOptions?: {
    style?: 'stars' | 'numbers' | 'emoji';
    labels?: {
      low?: string;              // Label for minimum value
      high?: string;             // Label for maximum value
    };
    showValue?: boolean;         // Display selected value
    allowHalf?: boolean;         // Allow half-star ratings
  };
}
```

#### Usage Example

```json
{
  "id": "serviceRating",
  "type": "numberRating",
  "label": "Rate Our Service",
  "description": "How would you rate your overall experience?",
  "required": true,
  "minRating": 1,
  "maxRating": 5,
  "displayOptions": {
    "style": "stars",
    "labels": {
      "low": "Poor",
      "high": "Excellent"
    },
    "showValue": true,
    "allowHalf": false
  }
}
```

#### Display Styles

- **Stars**: Traditional star rating (⭐⭐⭐⭐⭐)
- **Numbers**: Clickable number buttons (1 2 3 4 5)
- **Emoji**: Emotion-based scale (😞😐😊😄😍)

#### Best Practices

- Use 1-5 or 1-10 scales for consistency
- Provide semantic labels (Poor → Excellent)
- Consider context when choosing style
- Star ratings work well for satisfaction

---

### 10. opinionScale

1-10 opinion scale with semantic labels for agreement/disagreement.

#### Properties

```typescript
interface OpinionScaleField extends BaseField {
  type: 'opinionScale';
  defaultValue?: number;         // 1-10 default value
  
  validationRules?: {
    customMessage?: string;
  };
  
  displayOptions?: {
    labels?: {
      low?: string;              // Default: "Strongly Disagree"
      high?: string;             // Default: "Strongly Agree"
      neutral?: string;          // Label for middle values
    };
    showNumbers?: boolean;       // Show 1-10 numbers
    showLabels?: boolean;        // Show semantic labels
    highlightNeutral?: boolean;  // Highlight middle values
  };
}
```

#### Usage Example

```json
{
  "id": "recommendLikelihood",
  "type": "opinionScale",
  "label": "Likelihood to Recommend",
  "description": "How likely are you to recommend our service to others?",
  "required": true,
  "displayOptions": {
    "labels": {
      "low": "Not at all likely",
      "high": "Extremely likely",
      "neutral": "Neutral"
    },
    "showNumbers": true,
    "showLabels": true,
    "highlightNeutral": true
  }
}
```

#### Features

- **Fixed 1-10 Scale**: Standardized opinion measurement
- **Semantic Labels**: Clear meaning for scale endpoints
- **Net Promoter Score**: Perfect for NPS calculations
- **Visual Gradients**: Color coding from negative to positive

#### Best Practices

- Use for agreement/likelihood questions
- Standard for Net Promoter Score (NPS)
- Provide clear endpoint labels
- Consider cultural differences in scale interpretation

---

## Special Fields

### 11. statement

Display-only content field for instructions, information, and rich media.

#### Properties

```typescript
interface StatementField extends BaseField {
  type: 'statement';
  description: string;           // HTML content to display
  
  displayOptions?: {
    variant?: 'default' | 'highlighted' | 'info' | 'warning' | 'success';
    imageUrl?: string;           // Header image
    imageAlt?: string;           // Image alt text
    links?: Array<{             // External links
      text: string;
      url: string;
      external?: boolean;
    }>;
    allowHtml?: boolean;         // Allow full HTML content
    maxWidth?: number;           // Content max width
  };
}
```

#### Usage Example

```json
{
  "id": "welcomeMessage",
  "type": "statement",
  "label": "Welcome to Our Survey",
  "description": "<h3>Thank you for participating!</h3><p>This survey will help us improve our services. Your responses are <strong>confidential</strong> and will only be used for research purposes.</p><p>The survey should take approximately <em>5-7 minutes</em> to complete.</p>",
  "displayOptions": {
    "variant": "highlighted",
    "imageUrl": "https://example.com/welcome-banner.jpg",
    "imageAlt": "Welcome banner",
    "links": [
      {
        "text": "Privacy Policy",
        "url": "/privacy",
        "external": false
      },
      {
        "text": "Contact Support",
        "url": "mailto:support@example.com",
        "external": true
      }
    ],
    "allowHtml": true
  }
}
```

#### Display Variants

- **Default**: Standard text formatting
- **Highlighted**: Emphasized background/border
- **Info**: Blue info box styling
- **Warning**: Yellow warning box styling
- **Success**: Green success box styling

#### Best Practices

- Use for instructions, disclaimers, information
- Keep content concise and scannable
- Use appropriate variant for content type
- Include images for visual engagement

---

### 12. legal

Terms acceptance field with scrollable content and validation.

#### Properties

```typescript
interface LegalField extends BaseField {
  type: 'legal';
  label: string;                 // Acceptance text (e.g., "I agree to...")
  description: string;           // Full legal text (HTML)
  required: true;                // Always required
  
  validationRules?: {
    requireScrollToAccept?: boolean; // Must scroll to bottom
    customMessage?: string;
  };
  
  displayOptions?: {
    termsTitle?: string;         // Title for terms content
    maxHeight?: number;          // Scrollable area height
    externalLinks?: Array<{      // Additional legal documents
      text: string;
      url: string;
    }>;
    checkboxStyle?: 'default' | 'emphasized';
  };
}
```

#### Usage Example

```json
{
  "id": "termsAcceptance",
  "type": "legal",
  "label": "I have read and agree to the Terms of Service and Privacy Policy",
  "description": "<div class='legal-content'><h3>Terms of Service</h3><p>By using our service, you agree to the following terms...</p><h3>Privacy Policy</h3><p>We collect and use your information as described...</p></div>",
  "required": true,
  "validationRules": {
    "requireScrollToAccept": true,
    "customMessage": "You must read the complete terms before accepting"
  },
  "displayOptions": {
    "termsTitle": "Terms of Service & Privacy Policy",
    "maxHeight": 200,
    "externalLinks": [
      {
        "text": "Full Terms Document",
        "url": "/terms-full"
      },
      {
        "text": "Privacy Policy",
        "url": "/privacy"
      }
    ],
    "checkboxStyle": "emphasized"
  }
}
```

#### Features

- **Scrollable Content**: Long legal text in contained area
- **Scroll Validation**: Ensures user reads entire content
- **External Links**: Link to full legal documents
- **Clear Acceptance**: Prominent checkbox for agreement

#### Best Practices

- Always require scroll-to-accept for long terms
- Provide links to full legal documents
- Use clear, unambiguous acceptance language
- Consider accessibility for screen readers

---

### 13. fileUpload

File upload field with validation, preview, and progress tracking.

#### Properties

```typescript
interface FileUploadField extends BaseField {
  type: 'fileUpload';
  acceptedFileTypes: string[];   // File extensions ['.pdf', '.jpg']
  maxFileSize: number;           // Maximum size in MB
  
  validationRules?: {
    customMessage?: string;
  };
  
  displayOptions?: {
    multiple?: boolean;          // Allow multiple files
    dragAndDrop?: boolean;       // Enable drag-and-drop
    showPreview?: boolean;       // Show file preview
    compressionOptions?: {
      maxWidth?: number;         // Image compression
      maxHeight?: number;
      quality?: number;          // 0-1 quality
    };
  };
}
```

#### Usage Example

```json
{
  "id": "resume",
  "type": "fileUpload",
  "label": "Upload Resume",
  "description": "Please upload your current resume or CV",
  "required": true,
  "acceptedFileTypes": [".pdf", ".doc", ".docx"],
  "maxFileSize": 5,
  "displayOptions": {
    "multiple": false,
    "dragAndDrop": true,
    "showPreview": true,
    "compressionOptions": {
      "maxWidth": 1200,
      "quality": 0.8
    }
  }
}
```

#### Features

- **Drag & Drop**: Modern file upload interface
- **File Validation**: Type and size validation
- **Progress Tracking**: Upload progress indication
- **Preview Generation**: Image/document previews
- **Compression**: Automatic image optimization

#### Best Practices

- Clearly specify accepted file types
- Set reasonable file size limits
- Provide upload progress feedback
- Show file validation errors clearly
- Consider security scanning for uploads

---

### 14. pageBreak

Section separator for multi-step forms and logical grouping.

#### Properties

```typescript
interface PageBreakField extends BaseField {
  type: 'pageBreak';
  label?: string;                // Section title
  description?: string;          // Section description
  
  displayOptions?: {
    showProgress?: boolean;      // Show progress indicator
    style?: 'line' | 'card' | 'full';
    navigationButton?: {
      text?: string;             // Custom button text
      style?: 'primary' | 'secondary';
    };
  };
}
```

#### Usage Example

```json
{
  "id": "section2",
  "type": "pageBreak",
  "label": "Personal Information",
  "description": "Now we'll collect some basic personal details",
  "displayOptions": {
    "showProgress": true,
    "style": "card",
    "navigationButton": {
      "text": "Continue to Personal Info",
      "style": "primary"
    }
  }
}
```

#### Display Styles

- **Line**: Simple horizontal line separator
- **Card**: Card-style section break with content
- **Full**: Full-screen section transition

#### Best Practices

- Use to logically group related questions
- Provide clear section titles
- Show progress for long forms
- Keep section descriptions brief

---

### 15. startingPage

Welcome screen for form introduction and context setting.

#### Properties

```typescript
interface StartingPageField extends BaseField {
  type: 'startingPage';
  label: string;                 // Welcome title
  description: string;           // Welcome content
  
  displayOptions?: {
    estimatedTime?: string;      // "5-7 minutes"
    participantCount?: number;   // Social proof
    features?: string[];         // Form highlights
    imageUrl?: string;           // Hero image
    backgroundColor?: string;    // Custom background
    buttonText?: string;         // Start button text
  };
}
```

#### Usage Example

```json
{
  "id": "welcome",
  "type": "startingPage",
  "label": "Customer Satisfaction Survey",
  "description": "Help us improve our service by sharing your experience. Your feedback is valuable and will help us serve you better.",
  "displayOptions": {
    "estimatedTime": "5-7 minutes",
    "participantCount": 1247,
    "features": [
      "Anonymous responses",
      "Mobile-friendly",
      "Secure & encrypted"
    ],
    "imageUrl": "https://example.com/survey-hero.jpg",
    "buttonText": "Start Survey"
  }
}
```

#### Features

- **Estimated Time**: Set user expectations
- **Participant Count**: Social proof element
- **Feature Highlights**: Build trust and engagement
- **Visual Appeal**: Hero images and custom styling

#### Best Practices

- Set accurate time estimates
- Highlight privacy and security features
- Use engaging hero images
- Keep intro content concise

---

### 16. postSubmission

Thank you screen with custom actions and next steps.

#### Properties

```typescript
interface PostSubmissionField extends BaseField {
  type: 'postSubmission';
  label: string;                 // Thank you title
  description: string;           // Completion message
  
  displayOptions?: {
    showDownload?: boolean;      // Download response receipt
    showShare?: boolean;         // Social sharing options
    showFeedback?: boolean;      // Feedback on form itself
    redirectUrl?: string;        // Auto-redirect URL
    redirectDelay?: number;      // Delay before redirect (seconds)
    customActions?: Array<{      // Custom action buttons
      type: 'link' | 'download' | 'share';
      label: string;
      url?: string;
      icon?: string;
      style?: 'primary' | 'secondary';
    }>;
    celebrationAnimation?: boolean; // Show confetti/celebration
  };
}
```

#### Usage Example

```json
{
  "id": "thankYou",
  "type": "postSubmission",
  "label": "Thank You!",
  "description": "Your response has been recorded successfully. We appreciate you taking the time to share your feedback with us.",
  "displayOptions": {
    "showDownload": true,
    "showShare": false,
    "showFeedback": true,
    "celebrationAnimation": true,
    "customActions": [
      {
        "type": "link",
        "label": "Return to Homepage",
        "url": "/",
        "icon": "home",
        "style": "primary"
      },
      {
        "type": "download",
        "label": "Download Receipt",
        "icon": "download",
        "style": "secondary"
      }
    ]
  }
}
```

#### Features

- **Celebration Animations**: Positive reinforcement
- **Download Receipt**: PDF/email confirmation
- **Custom Actions**: Flexible next steps
- **Social Sharing**: Viral form sharing
- **Auto-redirect**: Seamless user journey

#### Best Practices

- Express genuine gratitude
- Provide clear next steps
- Offer receipt/confirmation options
- Consider user journey after submission

---

## Legacy Field Types

### Backward Compatibility

The system maintains support for legacy field types through automatic mapping:

| Legacy Type | Maps To | Notes |
|-------------|---------|-------|
| `text` | `shortText` | Single-line text input |
| `rating` | `numberRating` | Numeric rating scale |
| `date` | Dedicated `DateField` | Date input with picker |

### Migration Strategy

Legacy fields are automatically converted during form processing:

```typescript
// Legacy field
{
  "type": "text",
  "label": "Name",
  "placeholder": "Enter name"
}

// Automatically converts to
{
  "type": "shortText",
  "label": "Name", 
  "placeholder": "Enter name"
}
```

---

## Field Validation Reference

### Common Validation Properties

All fields support these validation options:

```typescript
interface BaseValidation {
  required?: boolean;            // Field is required
  customMessage?: string;        // Override default error message
}
```

### Type-Specific Validation

| Field Type | Validation Options |
|------------|-------------------|
| **shortText/longText** | `pattern`, `minLength`, `maxLength` |
| **email** | `allowedDomains`, `blockedDomains` |
| **website** | `requireHttps`, `allowedProtocols` |
| **phoneNumber** | `format`, `customPattern` |
| **multipleChoice/dropdown** | `options` validation |
| **numberRating** | `minRating`, `maxRating` |
| **opinionScale** | Fixed 1-10 validation |
| **legal** | `requireScrollToAccept` |
| **fileUpload** | `acceptedFileTypes`, `maxFileSize` |

### Custom Validation Messages

```json
{
  "validationRules": {
    "customMessage": "Please enter a valid business email address"
  }
}
```

---

## Display Options Reference

### Common Display Properties

All fields support these display options:

```typescript
interface BaseDisplayOptions {
  width?: 'full' | 'half' | 'third';
  showLabel?: boolean;
  showDescription?: boolean;
  inline?: boolean;
}
```

### Layout Width Options

- **full**: 100% width (default for most fields)
- **half**: 50% width (side-by-side layout)
- **third**: 33% width (three-column layout)

### Responsive Behavior

- Desktop: Respects width settings
- Tablet: Falls back to full width for half/third
- Mobile: Always full width

---

## Implementation Examples

### Complete Form Example

```json
{
  "id": "customer-survey",
  "title": "Customer Satisfaction Survey",
  "description": "Help us improve our service",
  "fields": [
    {
      "id": "start",
      "type": "startingPage",
      "label": "Welcome to Our Survey",
      "description": "Your feedback helps us improve our service quality",
      "displayOptions": {
        "estimatedTime": "5 minutes",
        "participantCount": 1250,
        "features": ["Anonymous", "Secure", "Mobile-friendly"]
      }
    },
    {
      "id": "name",
      "type": "shortText",
      "label": "Full Name",
      "required": true,
      "maxLength": 100,
      "displayOptions": {
        "width": "half"
      }
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "displayOptions": {
        "width": "half"
      }
    },
    {
      "id": "experience",
      "type": "multipleChoice",
      "label": "How was your overall experience?",
      "required": true,
      "options": ["Excellent", "Good", "Average", "Poor"],
      "displayOptions": {
        "layout": "horizontal"
      }
    },
    {
      "id": "rating",
      "type": "numberRating",
      "label": "Rate our service (1-5 stars)",
      "required": true,
      "minRating": 1,
      "maxRating": 5,
      "displayOptions": {
        "style": "stars",
        "labels": {
          "low": "Poor",
          "high": "Excellent"
        }
      }
    },
    {
      "id": "feedback",
      "type": "longText",
      "label": "Additional Comments",
      "required": false,
      "maxLength": 500,
      "placeholder": "Tell us more about your experience...",
      "displayOptions": {
        "rows": 4,
        "showCharacterCount": true
      }
    },
    {
      "id": "recommend",
      "type": "opinionScale",
      "label": "How likely are you to recommend us?",
      "required": true,
      "displayOptions": {
        "labels": {
          "low": "Not likely",
          "high": "Very likely"
        }
      }
    },
    {
      "id": "contact",
      "type": "yesNo",
      "label": "May we contact you about your feedback?",
      "required": false,
      "displayOptions": {
        "variant": "toggle"
      }
    },
    {
      "id": "thanks",
      "type": "postSubmission",
      "label": "Thank You!",
      "description": "Your feedback has been recorded and will help us improve our service.",
      "displayOptions": {
        "celebrationAnimation": true,
        "customActions": [
          {
            "type": "link",
            "label": "Visit Our Website",
            "url": "https://example.com",
            "style": "primary"
          }
        ]
      }
    }
  ]
}
```

---

## Field Conditional Logic (Future)

### Planned Conditional Logic Support

```typescript
interface ConditionalLogic {
  showWhen?: Array<{
    fieldId: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
    value: any;
  }>;
  hideWhen?: Array<{
    fieldId: string;
    operator: string;
    value: any;
  }>;
}
```

### Example Usage

```json
{
  "id": "followUp",
  "type": "longText",
  "label": "Please explain your poor rating",
  "conditionalLogic": {
    "showWhen": [
      {
        "fieldId": "rating",
        "operator": "lessThan",
        "value": 3
      }
    ]
  }
}
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

All field types are designed to meet accessibility standards:

#### Required Elements
- **Semantic HTML**: Proper form elements and labels
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators
- **Error Association**: Errors linked to fields

#### Implementation Examples

```html
<!-- Proper label association -->
<label for="email-field" class="required">
  Email Address
  <span aria-label="required">*</span>
</label>
<input 
  id="email-field"
  type="email"
  required
  aria-invalid="false"
  aria-describedby="email-help email-error"
/>
<div id="email-help">We'll never share your email</div>
<div id="email-error" role="alert" aria-live="polite">
  Please enter a valid email address
</div>
```

#### Rating Field Accessibility

```html
<fieldset role="group" aria-labelledby="rating-legend">
  <legend id="rating-legend">Rate our service</legend>
  <div role="radiogroup" aria-labelledby="rating-legend">
    <input type="radio" id="star-1" name="rating" value="1" />
    <label for="star-1">1 star - Poor</label>
    <!-- ... additional radio buttons -->
  </div>
</fieldset>
```

---

## Mobile Optimization

### Touch-Friendly Design

All field types are optimized for mobile devices:

#### Touch Targets
- **Minimum 44px**: All interactive elements
- **Adequate Spacing**: 8px minimum between elements
- **Thumb Navigation**: Easy one-handed operation

#### Mobile-Specific Features
- **Appropriate Keyboards**: Email, numeric, phone keyboards
- **Auto-zoom Prevention**: Proper input sizing
- **Scroll Optimization**: Smooth scrolling between fields
- **Orientation Support**: Portrait and landscape modes

#### Field-Specific Optimizations

| Field Type | Mobile Optimization |
|------------|-------------------|
| **email** | Email keyboard, autocomplete |
| **phoneNumber** | Numeric keyboard, formatting |
| **numberRating** | Large touch targets for ratings |
| **multipleChoice** | Stacked layout on small screens |
| **dropdown** | Native picker on iOS/Android |
| **fileUpload** | Camera integration, gallery access |

---

## Performance Considerations

### Rendering Optimization

#### Field Loading
- **Lazy Loading**: Load field components on demand
- **Code Splitting**: Separate bundles for complex fields
- **Progressive Enhancement**: Basic functionality first

#### Form Performance
- **Virtual Scrolling**: For forms with 50+ fields
- **Debounced Validation**: Avoid excessive API calls
- **Optimistic Updates**: Immediate UI feedback

#### Bundle Sizes

| Field Type | Bundle Impact | Loading Strategy |
|------------|---------------|------------------|
| **Text Fields** | Minimal | Always loaded |
| **Choice Fields** | Small | Always loaded |
| **Rating Fields** | Small | Always loaded |
| **File Upload** | Large | Lazy loaded |
| **Rich Content** | Medium | Lazy loaded |

---

## Testing Guidelines

### Field Testing Checklist

#### Functional Testing
- [ ] Field renders correctly
- [ ] Validation works as expected
- [ ] Required field validation
- [ ] Custom validation rules
- [ ] Error message display
- [ ] Success state indication

#### Accessibility Testing
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] ARIA attributes
- [ ] Color contrast ratios
- [ ] Error announcements

#### Mobile Testing
- [ ] Touch interactions
- [ ] Keyboard triggering
- [ ] Responsive layout
- [ ] Orientation changes
- [ ] Performance on slow devices

#### Cross-Browser Testing
- [ ] Chrome, Firefox, Safari, Edge
- [ ] iOS Safari, Chrome Mobile
- [ ] Validation behavior consistency
- [ ] Visual rendering accuracy

### Automated Testing

```typescript
// Example field test
describe('EmailField', () => {
  it('validates email format', () => {
    const field = render(<EmailField field={emailFieldConfig} />);
    fireEvent.change(field.getByRole('textbox'), { 
      target: { value: 'invalid-email' } 
    });
    fireEvent.blur(field.getByRole('textbox'));
    
    expect(field.getByText('Please enter a valid email address'))
      .toBeInTheDocument();
  });
  
  it('shows success state for valid email', () => {
    const field = render(<EmailField field={emailFieldConfig} />);
    fireEvent.change(field.getByRole('textbox'), { 
      target: { value: 'user@example.com' } 
    });
    
    expect(field.getByRole('textbox'))
      .toHaveAttribute('aria-invalid', 'false');
  });
});
```

---

## Best Practices Summary

### Field Selection Guidelines

1. **Text Input Length**
   - shortText: < 50 characters (names, titles)
   - longText: > 50 characters (comments, descriptions)

2. **Choice Field Options**
   - multipleChoice: 2-7 options
   - dropdown: 8+ options
   - yesNo: Binary decisions

3. **Rating Scales**
   - numberRating: General satisfaction (1-5, 1-10)
   - opinionScale: Agreement/likelihood (1-10)

### UX Best Practices

1. **Form Flow**
   - Start with easy questions
   - Group related fields
   - Use logical progression
   - End with optional fields

2. **Error Handling**
   - Show errors near fields
   - Use clear, helpful language
   - Provide correction guidance
   - Don't clear valid data

3. **Progressive Disclosure**
   - Show relevant fields only
   - Use conditional logic
   - Break long forms into steps
   - Indicate progress clearly

### Technical Best Practices

1. **Performance**
   - Lazy load complex fields
   - Debounce validation
   - Optimize bundle size
   - Use virtual scrolling for long forms

2. **Accessibility**
   - Always include proper labels
   - Associate errors with fields
   - Support keyboard navigation
   - Test with screen readers

3. **Security**
   - Validate on client and server
   - Sanitize all inputs
   - Use HTTPS for sensitive data
   - Implement rate limiting

---

## Migration Guide

### Upgrading from Legacy Fields

#### Automatic Migration

Legacy field types are automatically converted:

```typescript
// Before (Legacy)
{
  "type": "text",
  "label": "Name",
  "placeholder": "Enter name"
}

// After (Automatic conversion)
{
  "type": "shortText",
  "label": "Name",
  "placeholder": "Enter name",
  "validationRules": {},
  "displayOptions": {
    "width": "full",
    "showLabel": true
  }
}
```

#### Manual Migration

For enhanced features, manual migration is recommended:

```typescript
// Enhanced migration
{
  "type": "shortText",
  "label": "Full Name",
  "placeholder": "Enter your full name",
  "maxLength": 100,
  "validationRules": {
    "pattern": "^[a-zA-Z\\s]+$",
    "customMessage": "Name can only contain letters and spaces"
  },
  "displayOptions": {
    "width": "half",
    "showCharacterCount": true
  }
}
```

#### Breaking Changes

- **Field IDs**: Must remain the same for data consistency
- **Validation**: Legacy validation may need updating
- **Display**: New display options available but optional

---

## Future Enhancements

### Planned Field Types

1. **Advanced Fields**
   - Matrix/Grid questions
   - Ranking/sorting fields
   - Calculation fields
   - Signature capture

2. **Rich Media**
   - Video upload fields
   - Audio recording
   - Image annotation
   - Interactive maps

3. **Dynamic Fields**
   - Conditional field groups
   - Dynamic option loading
   - API-driven choices
   - Real-time validation

### Enhanced Features

1. **Field Intelligence**
   - Auto-complete suggestions
   - Smart validation
   - Format detection
   - Error prevention

2. **Collaboration**
   - Multi-user editing
   - Real-time updates
   - Comment system
   - Version control

---

*Last Updated: December 2024*  
*Field Types Version: 2.0.0*  
*Total Supported Types: 16*  
*Legacy Compatibility: Full*