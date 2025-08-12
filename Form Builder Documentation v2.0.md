# Form Builder Documentation v2.0

## Overview

The Form Builder is a comprehensive, drag-and-drop interface for creating professional forms with 16 field types, advanced customization options, and multi-step workflows. This documentation covers the enhanced v2.0 system with expanded capabilities and improved user experience.

## Builder Architecture

### Core Components Overview

```
Form Builder System v2.0
├── Four-Step Workflow
│   ├── 1. Build - Form structure and fields (COMPLETE ✅)
│   ├── 2. Design - Theme and visual customization  
│   ├── 3. Integrate - Webhooks and third-party connections
│   └── 4. Share - Distribution and analytics
├── Enhanced Field System
│   ├── 16 Field Editors - Complete field editing library
│   ├── Advanced Properties - Validation, display options
│   ├── Real-time Preview - Instant form preview
│   └── Accessibility Features - WCAG 2.1 AA compliance
├── Advanced Customization
│   ├── Modular Editors - Specialized editor per field type
│   ├── Shared Components - Reusable editing interfaces
│   ├── Auto-save Integration - Automatic form saving
│   └── Drag & Drop Support - Field reordering
└── Real-time Features
    ├── Live Preview - Instant form preview
    ├── Auto-save - Automatic form saving
    ├── Field Validation - Real-time validation testing
    └── Property Management - Advanced field configuration
```

---

## Step 1: Build - Form Construction (COMPLETE ✅)

### Enhanced Field Editing System v2.0

The form builder now features a completely modular field editing system with specialized editors for each field type.

#### Component Architecture

```
Form Builder Field Editing
├── QuestionTile.tsx (Main wrapper)
├── field-editors/
│   ├── BaseFieldEditor.tsx (Shared foundation)
│   ├── text-fields/ (5 editors)
│   ├── choice-fields/ (4 editors)  
│   ├── rating-fields/ (1 editor)
│   ├── special-fields/ (3 editors)
│   └── structure-fields/ (3 editors)
└── shared/
    ├── FieldSettingsTabs.tsx
    ├── OptionManager.tsx
    ├── ValidationEditor.tsx
    └── DisplayOptionsEditor.tsx
```

#### Field Editor Features

**All Field Editors Include:**
- Real-time preview of field appearance
- Field-specific property editing
- Validation rule configuration
- Display options customization
- Auto-save integration

**Advanced Features:**
- **Tabbed Settings Interface**: Basic, Validation, Display tabs
- **Option Management**: Drag-and-drop option reordering for choice fields
- **Rich Content Editing**: WYSIWYG-style editing for content fields
- **Default Value Configuration**: Pre-fill options for all applicable field types
- **Conditional Settings**: Only show relevant settings per field type

### Enhanced Field Palette

The field palette includes 16 field types organized by category with complete editor support:

#### Text-Based Fields ✅ **Full Editor Support**
```typescript
const textFields = [
  {
    type: 'shortText',
    icon: 'type',
    label: 'Short Text',
    description: 'Single-line text input for names, titles, etc.',
    editor: 'ShortTextEditor',
    features: ['placeholder', 'character limits', 'default values', 'pattern validation']
  },
  {
    type: 'longText', 
    icon: 'fileText',
    label: 'Long Text',
    description: 'Multi-line textarea for detailed responses',
    editor: 'LongTextEditor',
    features: ['placeholder', 'character limits', 'textarea height', 'default content']
  },
  {
    type: 'email',
    icon: 'mail',
    label: 'Email',
    description: 'Email input with built-in validation',
    editor: 'EmailEditor',
    features: ['placeholder', 'domain validation', 'default email', 'format checking']
  },
  {
    type: 'website',
    icon: 'link',
    label: 'Website',
    description: 'URL input with format validation',
    editor: 'WebsiteEditor',
    features: ['placeholder', 'URL validation', 'default URL', 'protocol checking']
  },
  {
    type: 'phoneNumber',
    icon: 'phone',
    label: 'Phone Number',
    description: 'Phone input with auto-formatting',
    editor: 'PhoneNumberEditor',
    features: ['placeholder', 'format validation', 'default number', 'auto-formatting']
  }
];
```

#### Choice-Based Fields ✅ **Full Editor Support**
```typescript
const choiceFields = [
  {
    type: 'multipleChoice',
    icon: 'radioButton',
    label: 'Multiple Choice',
    description: 'Radio buttons for single selection',
    editor: 'MultipleChoiceEditor',
    features: ['option management', 'layout control', 'default selection', 'inline display']
  },
  {
    type: 'dropdown',
    icon: 'chevronDown',
    label: 'Dropdown',
    description: 'Select menu for longer option lists',
    editor: 'DropdownEditor',
    features: ['option management', 'placeholder text', 'default selection', 'searchable options']
  },
  {
    type: 'yesNo',
    icon: 'toggleLeft',
    label: 'Yes/No',
    description: 'Boolean choice with toggle or buttons',
    editor: 'YesNoEditor',
    features: ['inline display', 'default selection', 'custom labels']
  },
  {
    type: 'opinionScale',
    icon: 'barChart',
    label: 'Opinion Scale', 
    description: '1-10 scale for agreement/likelihood',
    editor: 'OpinionScaleEditor',
    features: ['scale description', 'default rating', '1-10 fixed scale']
  }
];
```

#### Rating Fields ✅ **Full Editor Support**
```typescript
const ratingFields = [
  {
    type: 'numberRating',
    icon: 'star',
    label: 'Rating Scale',
    description: 'Star or number-based rating (customizable range)',
    editor: 'NumberRatingEditor',
    features: ['range configuration', 'default rating', 'display customization']
  }
];
```

#### Special Fields ✅ **Full Editor Support**
```typescript
const specialFields = [
  {
    type: 'statement',
    icon: 'info',
    label: 'Statement',
    description: 'Display-only content with rich formatting',
    editor: 'StatementEditor',
    features: ['rich content editing', 'display variants', 'image support']
  },
  {
    type: 'legal',
    icon: 'shield',
    label: 'Legal',
    description: 'Terms acceptance with scrollable content',
    editor: 'LegalEditor',
    features: ['acceptance text', 'terms content', 'scroll requirements']
  },
  {
    type: 'fileUpload',
    icon: 'upload',
    label: 'File Upload',
    description: 'File upload with validation and preview',
    editor: 'FileUploadEditor',
    features: ['file type restrictions', 'size limits', 'upload instructions']
  }
];
```

#### Structure Fields ✅ **Full Editor Support**
```typescript
const structureFields = [
  {
    type: 'pageBreak',
    icon: 'separator',
    label: 'Page Break',
    description: 'Section separator for multi-step forms',
    editor: 'PageBreakEditor',
    features: ['section titles', 'descriptions', 'progress indicators']
  },
  {
    type: 'startingPage',
    icon: 'play',
    label: 'Welcome Screen',
    description: 'Form introduction and context setting',
    editor: 'StartingPageEditor',
    features: ['welcome message', 'time estimates', 'feature highlights']
  },
  {
    type: 'postSubmission',
    icon: 'checkCircle',
    label: 'Thank You Page',
    description: 'Completion screen with custom actions',
    editor: 'PostSubmissionEditor',
    features: ['thank you message', 'redirect options', 'action buttons']
  }
];
```

### Field-Specific Editing Interfaces

Each field type now has a dedicated editor component with specialized functionality:

#### Text Field Editors
- **ShortTextEditor**: Placeholder, min/max length, default value, character limits
- **LongTextEditor**: Placeholder, min/max length, default value, textarea height
- **EmailEditor**: Placeholder, default value, domain validation
- **WebsiteEditor**: Placeholder, default value, URL validation
- **PhoneNumberEditor**: Placeholder, default value, format validation

#### Choice Field Editors  
- **MultipleChoiceEditor**: Option management, inline layout, default selection
- **DropdownEditor**: Option management, placeholder text, default selection
- **YesNoEditor**: Inline display toggle, default selection (Yes/No/None)
- **OpinionScaleEditor**: Scale description, default rating (1-10)

#### Rating Field Editors
- **NumberRatingEditor**: Min/max rating configuration, default rating selection

#### Special Field Editors
- **StatementEditor**: Rich content editing, display variants, image URL support
- **LegalEditor**: Acceptance text, terms title, scrollable legal content
- **FileUploadEditor**: Accepted file types, size limits, upload instructions

#### Structure Field Editors
- **PageBreakEditor**: Section titles and descriptions for multi-step forms
- **StartingPageEditor**: Welcome message, estimated time, feature highlights
- **PostSubmissionEditor**: Thank you message, redirect options, action buttons

#### Shared Components
- **OptionManager**: Reusable component for managing choice options with add/remove/reorder
- **ValidationEditor**: Unified validation rule configuration across field types
- **DisplayOptionsEditor**: Consistent display option settings (width, labels, etc.)

### Drag-and-Drop Interface

#### Enhanced Drag Experience
- **Visual Feedback**: Clear drop zones and insertion indicators
- **Smart Positioning**: Automatic field ordering and spacing
- **Field Editor Integration**: Drag-and-drop works with specialized editors
- **Undo/Redo**: Full action history with keyboard shortcuts

#### Drag Implementation
```typescript
// Enhanced drag-and-drop with @hello-pangea/dnd
<DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="field-palette" type="FIELD">
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {fieldTypes.map((field, index) => (
          <Draggable key={field.type} draggableId={field.type} index={index}>
            {(provided, snapshot) => (
              <FieldPaletteItem
                field={field}
                isDragging={snapshot.isDragging}
                dragProps={provided.draggableProps}
                dragHandleProps={provided.dragHandleProps}
                ref={provided.innerRef}
              />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
```

### Field Property Editor

#### Enhanced Property Panels

Each field type has a specialized property panel with tabbed interface:

##### Tabbed Interface Structure
```typescript
interface PropertyEditorTabs {
  basic: {
    // Field-specific configuration
    // Placeholder, options, default values, etc.
  };
  validation: {
    // Validation rules and error messages
    // Pattern validation, length limits, custom messages
  };
  display: {
    // Display and layout options
    // Width, labels, inline options, etc.
  };
}
```

##### Text Field Properties
```typescript
interface TextFieldProperties {
  basic: {
    label: string;
    description?: string;
    placeholder?: string;
    required: boolean;
    helpText?: string;
  };
  
  validation: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customMessage?: string;
  };
  
  display: {
    width: 'full' | 'half' | 'third';
    showCharacterCount: boolean;
    autoCapitalize?: 'none' | 'words' | 'sentences';
  };
}
```

##### Choice Field Properties
```typescript
interface ChoiceFieldProperties {
  basic: {
    label: string;
    description?: string;
    required: boolean;
    options: string[];
  };
  
  display: {
    layout: 'vertical' | 'horizontal' | 'grid';
    columns?: number;
    allowOther: boolean;
    otherLabel?: string;
    randomizeOptions: boolean;
  };
  
  advanced: {
    conditionalLogic?: ConditionalLogic;
    scoring?: ScoringOptions;
  };
}
```

##### Rating Field Properties
```typescript
interface RatingFieldProperties {
  basic: {
    label: string;
    description?: string;
    required: boolean;
    minRating: number;
    maxRating: number;
  };
  
  display: {
    style: 'stars' | 'numbers' | 'emoji';
    labels: {
      low?: string;
      high?: string;
    };
    showValue: boolean;
    allowHalf: boolean;
  };
}
```

#### Property Editor Interface

```typescript
const PropertyEditor: React.FC<{ field: ExtendedFormField }> = ({ field }) => {
  const [activeTab, setActiveTab] = useState('basic');
  
  const tabs = [
    { id: 'basic', label: 'Basic', icon: 'settings' },
    { id: 'validation', label: 'Validation', icon: 'shield' },
    { id: 'display', label: 'Display', icon: 'eye' },
    { id: 'logic', label: 'Logic', icon: 'git-branch' }
  ];
  
  return (
    <div className="property-editor">
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <div className="property-content">
        {activeTab === 'basic' && <BasicProperties field={field} />}
        {activeTab === 'validation' && <ValidationProperties field={field} />}
        {activeTab === 'display' && <DisplayProperties field={field} />}
        {activeTab === 'logic' && <LogicProperties field={field} />}
      </div>
    </div>
  );
};
```

### Form Settings Panel

#### Enhanced Form Configuration

```typescript
interface EnhancedFormSettings {
  basic: {
    title: string;
    description?: string;
    category?: string;
    tags?: string[];
  };
  
  behavior: {
    allowMultipleSubmissions: boolean;
    requireAllFields: boolean;
    shuffleQuestions: boolean;
    timeLimit?: number;
    autoSave: boolean;
  };
  
  privacy: {
    collectIPAddress: boolean;
    collectUserAgent: boolean;
    showPrivacyNotice: boolean;
    privacyNoticeText?: string;
    gdprCompliant: boolean;
  };
  
  notifications: {
    sendConfirmationEmail: boolean;
    confirmationEmailTemplate?: string;
    notifyOnSubmission: boolean;
    notificationEmails: string[];
  };
  
  advanced: {
    customCSS?: string;
    customJavaScript?: string;
    webhookUrl?: string;
    redirectUrl?: string;
    customSubmissionMessage?: string;
  };
}
```

### Live Preview System

#### Real-time Form Preview

```typescript
const LivePreview: React.FC<{ form: ExtendedForm }> = ({ form }) => {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewData, setPreviewData] = useState<Record<string, any>>({});
  
  return (
    <div className="live-preview">
      <PreviewToolbar 
        mode={previewMode}
        onModeChange={setPreviewMode}
        onReset={() => setPreviewData({})}
      />
      
      <PreviewContainer mode={previewMode}>
        <PublicFormRenderer
          form={form}
          initialData={previewData}
          onFieldChange={(fieldId, value) => {
            setPreviewData(prev => ({ ...prev, [fieldId]: value }));
          }}
          preview={true}
        />
      </PreviewContainer>
    </div>
  );
};
```

#### Preview Features
- **Multi-device Preview**: Desktop, tablet, mobile views
- **Interactive Testing**: Fill out form fields in preview
- **Real-time Updates**: Changes reflect immediately in specialized editors
- **Responsive Testing**: Test different screen sizes
- **Field-Specific Previews**: Each editor shows accurate field appearance
- **Accessibility Preview**: Screen reader simulation

---

## Step 2: Design - Visual Customization (PLACEHOLDER)

### Enhanced Theme System

#### Color Management
```typescript
interface ColorCustomization {
  primary: string;           // Main brand color
  secondary: string;         // Secondary accent color
  tertiary: string;          // Tertiary accent color
  background: string;        // Form background
  surface: string;           // Card/section backgrounds
  text: string;             // Primary text color
  textSecondary: string;    // Secondary text color
  border: string;           // Border colors
  error: string;            // Error state color
  success: string;          // Success state color
  warning: string;          // Warning state color
}
```

#### Typography Controls
```typescript
interface TypographyCustomization {
  fontFamily: string;        // Primary font family
  fontSize: {
    xs: number;             // 12px
    sm: number;             // 14px  
    base: number;           // 16px
    lg: number;             // 18px
    xl: number;             // 20px
    '2xl': number;          // 24px
    '3xl': number;          // 30px
  };
  fontWeight: {
    normal: number;         // 400
    medium: number;         // 500
    semibold: number;       // 600
    bold: number;           // 700
  };
  lineHeight: {
    tight: number;          // 1.25
    normal: number;         // 1.5
    relaxed: number;        // 1.75
  };
}
```

#### Spacing System
```typescript
interface SpacingCustomization {
  xs: number;               // 4px
  sm: number;               // 8px
  md: number;               // 16px
  lg: number;               // 24px
  xl: number;               // 32px
  '2xl': number;            // 48px
  '3xl': number;            // 64px
}
```

### Design Interface Components

#### Color Picker Component
```typescript
const ColorPicker: React.FC<{
  value: string;
  onChange: (color: string) => void;
  label: string;
}> = ({ value, onChange, label }) => {
  return (
    <div className="color-picker">
      <label className="color-picker-label">{label}</label>
      <div className="color-picker-input">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="hex-input"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
      <ColorPreset colors={popularColors} onSelect={onChange} />
    </div>
  );
};
```

#### Font Management
```typescript
const FontSelector: React.FC<{
  value: string;
  onChange: (font: string) => void;
}> = ({ value, onChange }) => {
  const fontOptions = [
    { family: 'Inter', category: 'Sans Serif', preview: 'Modern & clean' },
    { family: 'Roboto', category: 'Sans Serif', preview: 'Professional' },
    { family: 'Open Sans', category: 'Sans Serif', preview: 'Friendly' },
    { family: 'Playfair Display', category: 'Serif', preview: 'Elegant' },
    { family: 'Lora', category: 'Serif', preview: 'Readable' },
    { family: 'Fira Code', category: 'Monospace', preview: 'Technical' }
  ];
  
  return (
    <FontDropdown
      options={fontOptions}
      value={value}
      onChange={onChange}
      renderOption={(font) => (
        <div className="font-option" style={{ fontFamily: font.family }}>
          <span className="font-name">{font.family}</span>
          <span className="font-preview">{font.preview}</span>
        </div>
      )}
    />
  );
};
```

### Theme Presets

#### Built-in Theme Library
```typescript
const themePresets = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean and professional',
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      background: '#FFFFFF'
    },
    typography: {
      fontFamily: 'Inter'
    }
  },
  {
    id: 'warm-orange',
    name: 'Warm Orange',
    description: 'Friendly and approachable',
    colors: {
      primary: '#F97316',
      secondary: '#78716C',
      background: '#FFFBEB'
    },
    typography: {
      fontFamily: 'Open Sans'
    }
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    description: 'Sophisticated and premium',
    colors: {
      primary: '#7C3AED',
      secondary: '#64748B',
      background: '#FAFAFA'
    },
    typography: {
      fontFamily: 'Playfair Display'
    }
  }
];
```

### Animation Controls

#### Animation Intensity Settings
```typescript
interface AnimationSettings {
  intensity: 'none' | 'subtle' | 'moderate' | 'playful';
  respectReducedMotion: boolean;
  
  fieldAnimations: {
    entrance: 'fade' | 'slideUp' | 'slideDown' | 'scale';
    hover: boolean;
    focus: boolean;
  };
  
  buttonAnimations: {
    hover: { scale: number; duration: number };
    tap: { scale: number; duration: number };
  };
  
  transitionAnimations: {
    pageTransition: 'fade' | 'slide' | 'scale';
    duration: number;
  };
}
```

#### Animation Preview
```typescript
const AnimationPreview: React.FC<{ settings: AnimationSettings }> = ({ settings }) => {
  return (
    <div className="animation-preview">
      <h3>Animation Preview</h3>
      <div className="preview-area">
        <AnimatedButton intensity={settings.intensity}>
          Sample Button
        </AnimatedButton>
        <AnimatedFieldContainer 
          animationPreset={settings.fieldAnimations.entrance}
          intensity={settings.intensity}
        >
          <input type="text" placeholder="Sample field" />
        </AnimatedFieldContainer>
      </div>
    </div>
  );
};
```

*Currently shows placeholder content - theme customization UI needs implementation*

---

## Step 3: Integrate - Connections & Workflows (PLACEHOLDER)

### Webhook Integration

#### Webhook Configuration
```typescript
interface WebhookConfig {
  url: string;
  method: 'POST' | 'PUT';
  headers: Record<string, string>;
  events: WebhookEvent[];
  retryPolicy: {
    maxRetries: number;
    backoffStrategy: 'linear' | 'exponential';
    retryDelay: number;
  };
  authentication: {
    type: 'none' | 'bearer' | 'apiKey' | 'basic';
    credentials: Record<string, string>;
  };
}

type WebhookEvent = 
  | 'form.response.created'
  | 'form.response.updated'
  | 'form.response.deleted'
  | 'form.updated'
  | 'form.published';
```

#### Webhook Payload Format
```json
{
  "event": "form.response.created",
  "timestamp": "2024-12-01T18:00:00Z",
  "formId": "clx456...",
  "responseId": "clx789...",
  "form": {
    "title": "Customer Feedback Form",
    "version": "1.2"
  },
  "response": {
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "rating": 5
    },
    "metadata": {
      "submittedAt": "2024-12-01T18:00:00Z",
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0..."
    }
  },
  "signature": "sha256=abc123..." // HMAC signature for verification
}
```

### Third-Party Integrations

#### Email Service Providers
```typescript
interface EmailIntegration {
  provider: 'sendgrid' | 'mailchimp' | 'klaviyo' | 'hubspot';
  apiKey: string;
  listId?: string;
  templateId?: string;
  
  triggers: {
    onSubmission: boolean;
    onConfirmation: boolean;
    onFollowUp: boolean;
  };
  
  fieldMapping: {
    [formFieldId: string]: string; // Map to provider field names
  };
}
```

#### CRM Integrations
```typescript
interface CRMIntegration {
  provider: 'hubspot' | 'salesforce' | 'pipedrive' | 'airtable';
  credentials: {
    apiKey?: string;
    accessToken?: string;
    refreshToken?: string;
  };
  
  mapping: {
    contact: {
      [formFieldId: string]: string;
    };
    company?: {
      [formFieldId: string]: string;
    };
    deal?: {
      [formFieldId: string]: string;
    };
  };
  
  triggers: {
    createContact: boolean;
    updateContact: boolean;
    createDeal: boolean;
  };
}
```

#### Analytics Integrations
```typescript
interface AnalyticsIntegration {
  googleAnalytics?: {
    measurementId: string;
    trackFormViews: boolean;
    trackFormSubmissions: boolean;
    trackFieldInteractions: boolean;
  };
  
  facebookPixel?: {
    pixelId: string;
    trackSubmissions: boolean;
  };
  
  customEvents?: {
    provider: string;
    events: Array<{
      trigger: 'view' | 'start' | 'submit' | 'abandon';
      eventName: string;
      parameters: Record<string, string>;
    }>;
  };
}
```

### Notification Settings

#### Email Notifications
```typescript
interface NotificationSettings {
  adminNotifications: {
    enabled: boolean;
    recipients: string[];
    template: 'summary' | 'detailed' | 'custom';
    frequency: 'immediate' | 'daily' | 'weekly';
    conditions?: {
      fieldValues?: Record<string, any>;
      responseCount?: number;
    };
  };
  
  userConfirmations: {
    enabled: boolean;
    emailField: string; // Field ID containing user email
    template: EmailTemplate;
    sendFrom: {
      name: string;
      email: string;
    };
  };
  
  followUpEmails: {
    enabled: boolean;
    delay: number; // Hours after submission
    template: EmailTemplate;
    conditions?: Record<string, any>;
  };
}
```

*Currently shows placeholder content - integration UI planned*

---

## Step 4: Share - Distribution & Analytics (BASIC IMPLEMENTATION)

### Sharing Options

#### Multiple Distribution Methods
```typescript
interface SharingOptions {
  publicLink: {
    enabled: boolean;
    customSlug?: string;
    password?: string;
    expirationDate?: Date;
    viewLimit?: number;
  };
  
  embedCode: {
    iframe: string;
    javascript: string;
    react: string;
    options: {
      width: string;
      height: string;
      responsive: boolean;
      showBranding: boolean;
    };
  };
  
  socialSharing: {
    platforms: ('facebook' | 'twitter' | 'linkedin' | 'email')[];
    customMessage?: string;
    hashtags?: string[];
  };
  
  qrCode: {
    size: number;
    format: 'png' | 'svg';
    errorCorrection: 'L' | 'M' | 'Q' | 'H';
    customization?: {
      color: string;
      backgroundColor: string;
      logo?: string;
    };
  };
}
```

#### Share Modal Interface
```typescript
const ShareModal: React.FC<{ form: ExtendedForm }> = ({ form }) => {
  const [activeTab, setActiveTab] = useState('link');
  const [qrCode, setQrCode] = useState<string | null>(null);
  
  const shareUrl = `${window.location.origin}/form/${form.id}`;
  
  const generateQR = async () => {
    const response = await fetch('/api/qr/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: shareUrl, size: 200 })
    });
    const { qrCodeDataUrl } = await response.json();
    setQrCode(qrCodeDataUrl);
  };
  
  return (
    <Modal title="Share Your Form" size="lg">
      <TabContainer>
        <Tab id="link" label="Link" icon="link">
          <LinkShare url={shareUrl} />
        </Tab>
        <Tab id="embed" label="Embed" icon="code">
          <EmbedCode form={form} />
        </Tab>
        <Tab id="qr" label="QR Code" icon="qrCode">
          <QRCodeGenerator url={shareUrl} onGenerate={generateQR} />
        </Tab>
        <Tab id="social" label="Social" icon="share">
          <SocialShare url={shareUrl} form={form} />
        </Tab>
      </TabContainer>
    </Modal>
  );
};
```

### Analytics Dashboard

#### Form Performance Metrics
```typescript
interface FormAnalytics {
  overview: {
    totalViews: number;
    totalResponses: number;
    conversionRate: number;
    averageTimeToComplete: number;
    bounceRate: number;
    lastUpdated: Date;
  };
  
  timeSeriesData: {
    views: Array<{ date: string; count: number }>;
    responses: Array<{ date: string; count: number }>;
    conversionRate: Array<{ date: string; rate: number }>;
  };
  
  fieldAnalytics: Array<{
    fieldId: string;
    fieldLabel: string;
    fieldType: string;
    metrics: {
      viewRate: number;
      responseRate: number;
      abandonmentRate: number;
      averageTimeSpent: number;
      errorRate: number;
    };
    valueDistribution?: Record<string, number>;
  }>;
  
  trafficSources: Array<{
    source: string;
    views: number;
    responses: number;
    conversionRate: number;
  }>;
  
  deviceAnalytics: {
    desktop: { views: number; responses: number };
    tablet: { views: number; responses: number };
    mobile: { views: number; responses: number };
  };
  
  geographicData: Array<{
    country: string;
    region?: string;
    views: number;
    responses: number;
  }>;
}
```


### Export & Reporting

#### Response Export Options
```typescript
interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json' | 'pdf';
  dateRange: {
    start?: Date;
    end?: Date;
    preset?: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'all';
  };
  fields: {
    includeAll: boolean;
    selectedFields?: string[];
    includeMetadata: boolean;
    includeTimestamps: boolean;
  };
  filters: {
    fieldValues?: Record<string, any>;
    responseStatus?: 'complete' | 'partial';
    duplicates?: 'include' | 'exclude' | 'mark';
  };
  formatting: {
    includeHeaders: boolean;
    dateFormat: string;
    numberFormat: string;
    encoding: 'utf-8' | 'utf-16' | 'latin1';
  };
}
```

#### Automated Reports
```typescript
interface AutomatedReport {
  id: string;
  name: string;
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string; // HH:MM format
    timezone: string;
    dayOfWeek?: number; // For weekly reports
    dayOfMonth?: number; // For monthly reports
  };
  recipients: string[];
  format: 'pdf' | 'csv' | 'xlsx';
  content: {
    includeSummary: boolean;
    includeCharts: boolean;
    includeRawData: boolean;
    customSections?: Array<{
      type: 'text' | 'chart' | 'table';
      title: string;
      content: any;
    }>;
  };
  filters: ExportOptions['filters'];
}
```

*Basic sharing modal exists - missing embed code generation, advanced sharing options, and analytics integration*

---

## Multi-Step Form Builder

### Step Group Management

#### Field Grouping Interface
```typescript
interface FieldGroupEditor {
  groups: FieldGroup[];
  dragState: {
    draggedField?: string;
    targetGroup?: string;
    insertIndex?: number;
  };
}

const StepGroupEditor: React.FC<{ form: ExtendedForm }> = ({ form }) => {
  const [groups, setGroups] = useState<FieldGroup[]>(form.fieldGroups || []);
  
  const createNewGroup = () => {
    const newGroup: FieldGroup = {
      id: `group-${Date.now()}`,
      title: `Step ${groups.length + 1}`,
      description: '',
      fields: [],
      showProgressBar: true,
      allowBackNavigation: true
    };
    setGroups([...groups, newGroup]);
  };
  
  const moveFieldToGroup = (fieldId: string, targetGroupId: string, index: number) => {
    // Implementation for moving fields between groups
  };
  
  return (
    <div className="step-group-editor">
      <div className="group-list">
        {groups.map((group, index) => (
          <GroupEditor
            key={group.id}
            group={group}
            index={index}
            onUpdate={(updatedGroup) => updateGroup(group.id, updatedGroup)}
            onDelete={() => deleteGroup(group.id)}
            onMoveField={moveFieldToGroup}
          />
        ))}
      </div>
      
      <button onClick={createNewGroup} className="add-group-btn">
        <PlusIcon /> Add Step
      </button>
    </div>
  );
};
```

#### Group Configuration Panel
```typescript
const GroupEditor: React.FC<{
  group: FieldGroup;
  onUpdate: (group: FieldGroup) => void;
}> = ({ group, onUpdate }) => {
  return (
    <div className="group-editor">
      <div className="group-header">
        <input
          type="text"
          value={group.title}
          onChange={(e) => onUpdate({ ...group, title: e.target.value })}
          className="group-title-input"
          placeholder="Step title"
        />
        <GroupMenu group={group} onUpdate={onUpdate} />
      </div>
      
      <textarea
        value={group.description || ''}
        onChange={(e) => onUpdate({ ...group, description: e.target.value })}
        placeholder="Step description (optional)"
        className="group-description"
      />
      
      <div className="group-settings">
        <Toggle
          label="Show progress bar"
          checked={group.showProgressBar}
          onChange={(checked) => onUpdate({ ...group, showProgressBar: checked })}
        />
        <Toggle
          label="Allow back navigation"
          checked={group.allowBackNavigation}
          onChange={(checked) => onUpdate({ ...group, allowBackNavigation: checked })}
        />
      </div>
      
      <FieldDropZone
        groupId={group.id}
        fields={group.fields}
        onFieldsChange={(fields) => onUpdate({ ...group, fields })}
      />
    </div>
  );
};
```


---

## Accessibility Features

### WCAG 2.1 AA Compliance Tools

#### Accessibility Checker
```typescript
interface AccessibilityCheck {
  level: 'error' | 'warning' | 'info';
  rule: string;
  description: string;
  element?: string;
  recommendation: string;
}

const AccessibilityPanel: React.FC<{ form: ExtendedForm }> = ({ form }) => {
  const [checks, setChecks] = useState<AccessibilityCheck[]>([]);
  
  const runAccessibilityCheck = useCallback(() => {
    const newChecks: AccessibilityCheck[] = [];
    
    form.fields.forEach(field => {
      // Check for missing labels
      if (!field.label.trim()) {
        newChecks.push({
          level: 'error',
          rule: 'WCAG 3.3.2',
          description: 'Form field missing label',
          element: field.id,
          recommendation: 'Add a descriptive label for this field'
        });
      }
      
      // Check color contrast for custom colors
      if (field.displayOptions?.style) {
        // Color contrast validation logic
      }
      
      // Check for required field indicators
      if (field.required && !field.label.includes('*') && !field.description?.includes('required')) {
        newChecks.push({
          level: 'warning',
          rule: 'WCAG 3.3.2',
          description: 'Required field not clearly indicated',
          element: field.id,
          recommendation: 'Add visual indicator (asterisk) or text to show field is required'
        });
      }
    });
    
    setChecks(newChecks);
  }, [form]);
  
  useEffect(() => {
    runAccessibilityCheck();
  }, [runAccessibilityCheck]);
  
  return (
    <div className="accessibility-panel">
      <div className="accessibility-header">
        <h3>Accessibility Check</h3>
        <button onClick={runAccessibilityCheck}>Re-check</button>
      </div>
      
      <AccessibilitySummary checks={checks} />
      <AccessibilityChecklist checks={checks} />
    </div>
  );
};
```

#### Keyboard Navigation Testing
```typescript
const KeyboardNavigationTester: React.FC<{ form: ExtendedForm }> = ({ form }) => {
  const [tabOrder, setTabOrder] = useState<string[]>([]);
  const [focusTraps, setFocusTraps] = useState<string[]>([]);
  
  const testKeyboardNavigation = () => {
    // Simulate tab navigation through form
    const focusableElements = form.fields
      .filter(field => !['statement', 'pageBreak'].includes(field.type))
      .map(field => field.id);
    
    setTabOrder(focusableElements);
    
    // Check for focus traps
    const traps = focusableElements.filter(elementId => {
      // Logic to detect problematic focus behavior
      return false;
    });
    
    setFocusTraps(traps);
  };
  
  return (
    <div className="keyboard-tester">
      <button onClick={testKeyboardNavigation}>Test Keyboard Navigation</button>
      {tabOrder.length > 0 && (
        <div className="tab-order-display">
          <h4>Tab Order:</h4>
          <ol>
            {tabOrder.map(fieldId => (
              <li key={fieldId}>{form.fields.find(f => f.id === fieldId)?.label}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};
```

---

## Performance Optimization

### Builder Performance Features

#### Lazy Loading System
```typescript
const LazyFieldEditor = lazy(() => import('./FieldEditor'));
const LazyPreviewPanel = lazy(() => import('./PreviewPanel'));
const LazyAnalytics = lazy(() => import('./Analytics'));

const FormBuilder: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  return (
    <div className="form-builder">
      <BuilderNavigation activeStep={activeStep} onStepChange={setActiveStep} />
      
      <Suspense fallback={<BuilderSkeleton />}>
        {activeStep === 1 && <LazyFieldEditor />}
        {activeStep === 2 && <LazyPreviewPanel />}
        {activeStep === 4 && <LazyAnalytics />}
      </Suspense>
    </div>
  );
};
```

#### Auto-save Implementation
```typescript
const useAutoSave = (form: ExtendedForm, onSave: (form: ExtendedForm) => Promise<void>) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  
  const debouncedSave = useCallback(
    debounce(async (formData: ExtendedForm) => {
      try {
        await onSave(formData);
        setHasUnsavedChanges(false);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 2000),
    [onSave]
  );
  
  const saveForm = useCallback((formData: ExtendedForm) => {
    setHasUnsavedChanges(true);
    debouncedSave(formData);
  }, [debouncedSave]);
  
  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
  
  return { saveForm, hasUnsavedChanges, lastSaved };
};
```

#### Memory Management
```typescript
const useFormBuilder = () => {
  const [form, setForm] = useState<ExtendedForm>();
  const [history, setHistory] = useState<ExtendedForm[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Limit history to prevent memory issues
  const maxHistorySize = 50;
  
  const updateForm = useCallback((newForm: ExtendedForm) => {
    setForm(newForm);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newForm);
    
    // Trim history if too long
    if (newHistory.length > maxHistorySize) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }
    
    setHistory(newHistory);
  }, [history, historyIndex]);
  
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setForm(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);
  
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setForm(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);
  
  return { form, updateForm, undo, redo, canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1 };
};
```

---

## Testing & Quality Assurance

### Builder Testing Tools

#### Form Validation Testing
```typescript
const FormValidator: React.FC<{ form: ExtendedForm }> = ({ form }) => {
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  
  const runValidation = useCallback(() => {
    const results: ValidationResult[] = [];
    
    // Test form structure
    if (!form.title.trim()) {
      results.push({
        level: 'error',
        message: 'Form must have a title',
        field: 'title'
      });
    }
    
    // Test each field
    form.fields.forEach(field => {
      // Required properties check
      if (!field.label.trim()) {
        results.push({
          level: 'error',
          message: `Field "${field.id}" must have a label`,
          field: field.id
        });
      }
      
      // Field-specific validation
      if (field.type === 'multipleChoice' || field.type === 'dropdown') {
        if (!field.options || field.options.length === 0) {
          results.push({
            level: 'error',
            message: `Choice field "${field.label}" must have at least one option`,
            field: field.id
          });
        }
      }
      
      if (field.type === 'numberRating') {
        if (!field.maxRating || field.maxRating < 1) {
          results.push({
            level: 'error',
            message: `Rating field "${field.label}" must have a valid maximum rating`,
            field: field.id
          });
        }
      }
    });
    
    setValidationResults(results);
  }, [form]);
  
  return (
    <div className="form-validator">
      <button onClick={runValidation}>Validate Form</button>
      <ValidationResults results={validationResults} />
    </div>
  );
};
```

#### Preview Testing
```typescript
const PreviewTester: React.FC<{ form: ExtendedForm }> = ({ form }) => {
  const [testScenarios] = useState([
    {
      name: 'Complete Form',
      description: 'Fill out all required fields with valid data',
      data: generateValidTestData(form)
    },
    {
      name: 'Partial Form',
      description: 'Leave some optional fields empty',
      data: generatePartialTestData(form)
    },
    {
      name: 'Invalid Data',
      description: 'Submit with validation errors',
      data: generateInvalidTestData(form)
    }
  ]);
  
  const runTest = async (scenario: TestScenario) => {
    // Simulate form submission with test data
    try {
      const response = await fetch(`/api/forms/${form.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: scenario.data })
      });
      
      const result = await response.json();
      console.log(`Test "${scenario.name}":`, result);
    } catch (error) {
      console.error(`Test "${scenario.name}" failed:`, error);
    }
  };
  
  return (
    <div className="preview-tester">
      <h3>Automated Testing</h3>
      {testScenarios.map(scenario => (
        <div key={scenario.name} className="test-scenario">
          <div className="scenario-info">
            <h4>{scenario.name}</h4>
            <p>{scenario.description}</p>
          </div>
          <button onClick={() => runTest(scenario)}>Run Test</button>
        </div>
      ))}
    </div>
  );
};
```

---

## Advanced Builder Features

### Form Templates

#### Template Library
```typescript
interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  form: Partial<ExtendedForm>;
  popularity: number;
  createdBy: string;
  createdAt: Date;
}

const TemplateLibrary: React.FC<{
  onSelectTemplate: (template: FormTemplate) => void;
}> = ({ onSelectTemplate }) => {
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    'all', 'feedback', 'registration', 'survey', 'contact', 
    'application', 'booking', 'quiz', 'lead-generation'
  ];
  
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="template-library">
      <div className="template-filters">
        <SearchInput 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search templates..."
        />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      
      <div className="template-grid">
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => onSelectTemplate(template)}
          />
        ))}
      </div>
    </div>
  );
};
```

#### Custom Template Creation
```typescript
const TemplateCreator: React.FC<{ form: ExtendedForm }> = ({ form }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    category: '',
    tags: [],
    isPublic: false
  });
  
  const createTemplate = async () => {
    const template = {
      ...templateData,
      form: {
        fields: form.fields,
        theme: form.theme,
        customization: form.customization,
        layout: form.layout,
        settings: form.settings
      }
    };
    
    try {
      await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template)
      });
      
      // Show success message
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <Modal title="Save as Template">
      <TemplateForm data={templateData} onChange={setTemplateData} />
      <button onClick={createTemplate}>Create Template</button>
    </Modal>
  );
};
```

---

## Enhanced Project Structure

### Current Project Structure (As Implemented)

```
src/components/form-builder/
├── QuestionTile.tsx (Enhanced with modular editors)
├── FormBuilderSidebar.tsx
├── FormBuilderStepper.tsx
├── FormPreview.tsx
├── FormSettings.tsx
├── LivePreview.tsx
├── PromptInput.tsx
├── QuestionEditor.tsx (Legacy - replaced by field editors)
├── field-editors/
│   ├── index.ts (Exports all editors)
│   ├── BaseFieldEditor.tsx
│   ├── text-fields/
│   │   ├── ShortTextEditor.tsx
│   │   ├── LongTextEditor.tsx
│   │   ├── EmailEditor.tsx
│   │   ├── WebsiteEditor.tsx
│   │   └── PhoneNumberEditor.tsx
│   ├── choice-fields/
│   │   ├── MultipleChoiceEditor.tsx
│   │   ├── DropdownEditor.tsx
│   │   ├── YesNoEditor.tsx
│   │   └── OpinionScaleEditor.tsx
│   ├── rating-fields/
│   │   └── NumberRatingEditor.tsx
│   ├── special-fields/
│   │   ├── StatementEditor.tsx
│   │   ├── LegalEditor.tsx
│   │   └── FileUploadEditor.tsx
│   └── structure-fields/
│       ├── PageBreakEditor.tsx
│       ├── StartingPageEditor.tsx
│       └── PostSubmissionEditor.tsx
└── shared/
    ├── FieldSettingsTabs.tsx
    ├── OptionManager.tsx
    ├── ValidationEditor.tsx
    └── DisplayOptionsEditor.tsx
```

---

## API Integration

### Enhanced Form Builder State
```typescript
interface EnhancedBuilderState {
  form: ExtendedForm;
  activeField?: string;
  ui: {
    activeStep: number;
    selectedField?: string;
    sidebarOpen: boolean;
    previewMode: 'desktop' | 'tablet' | 'mobile';
    isDirty: boolean;
    showAdvancedSettings: boolean;
  };
  fieldEditors: {
    [fieldId: string]: {
      activeTab: 'basic' | 'validation' | 'display';
      showAdvanced: boolean;
    };
  };
  history: {
    past: ExtendedForm[];
    present: ExtendedForm;
    future: ExtendedForm[];
  };
}

const useBuilderState = () => {
  const [state, dispatch] = useReducer(builderReducer, initialState);
  
  const actions = {
    updateForm: (form: ExtendedForm) => dispatch({ type: 'UPDATE_FORM', payload: form }),
    addField: (field: ExtendedFormField) => dispatch({ type: 'ADD_FIELD', payload: field }),
    removeField: (fieldId: string) => dispatch({ type: 'REMOVE_FIELD', payload: fieldId }),
    updateField: (fieldId: string, updates: Partial<ExtendedFormField>) => 
      dispatch({ type: 'UPDATE_FIELD', payload: { fieldId, updates } }),
    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' })
  };
  
  return { state, actions };
};
```

### Advanced Features

#### Field Editor System

##### BaseFieldEditor Architecture
```typescript
interface BaseFieldEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
  preview: React.ReactNode;
  basicSettings?: React.ReactNode;
  showValidation?: boolean;
  showDisplay?: boolean;
}
```

##### Shared Component Library
- **FieldSettingsTabs**: Tabbed interface for organizing field settings
- **OptionManager**: Drag-and-drop option management for choice fields
- **ValidationEditor**: Unified validation rule configuration
- **DisplayOptionsEditor**: Consistent display option settings

##### Field Editor Integration
```typescript
// Example field editor implementation
const renderFieldEditor = () => {
  const editorProps = { field, onUpdate: updateFieldProperty };

  switch (field.type) {
    case 'shortText':
      return <ShortTextEditor {...editorProps} />;
    case 'multipleChoice':
      return <MultipleChoiceEditor {...editorProps} />;
    // ... all 16 field types supported
  }
};
```

---

## Migration & Upgrade Path

### Migrating from Legacy Builder

#### Field Editor Migration
The enhanced system automatically uses specialized editors for all field types:

```typescript
// Legacy approach
<QuestionTile field={field} /> // Used generic editing

// Enhanced approach (automatic)
<QuestionTile field={field} /> // Automatically uses specialized editor based on field.type
```


#### New Features Available
- **Tabbed settings interface** for organized property editing
- **Real-time validation testing** within the form builder
- **Advanced option management** for choice fields
- **Rich content editing** for statement and legal fields
- **Comprehensive display controls** for all field types

---

## Collaboration Features (Planned)

### Real-time Collaboration

#### Multi-user Editing




## Current Implementation Status

### What's Currently Working ✅

#### Step 1: Build (Fully Implemented) ✅
- **Complete field editing system** with 16 specialized field editors
- **Modular component architecture** with BaseFieldEditor and shared components
- **Advanced settings panels** with tabbed interface (Basic, Validation, Display)
- **Real-time field previews** showing exactly how fields appear to users
- **Comprehensive property editing** for all field-specific options
- **Auto-save functionality** on every field change
- **Drag-and-drop reordering** with specialized editors

#### Enhanced Features Completed ✅
- **16 Field Editors**: Individual editing components for each field type
- **Field-Specific Settings**: Custom editing interfaces per field type
- **Advanced Property Management**: Validation rules, display options, default values
- **Option Management System**: Add/remove/reorder choices for selection fields
- **Rich Content Editing**: Statement content, legal terms, upload instructions
- **Validation Configuration**: Custom patterns, error messages, field-specific rules
- **Display Customization**: Width settings, label visibility, inline options

#### Modular Architecture Implemented ✅
- **BaseFieldEditor**: Shared foundation with tabbed settings interface
- **Specialized Editors**: 16 individual field editor components
- **Shared Components**: OptionManager, ValidationEditor, DisplayOptionsEditor
- **Type Safety**: Complete TypeScript integration with proper interfaces

#### Basic Share Functionality ✅
- **Share modal integration** with one-click access
- **QR code generation** for mobile access
- **Social media sharing** options
- **Public form URLs** for distribution

### Implementation Gaps (Still TODO)

#### Step 2: Design (Placeholder)
- Currently shows placeholder content
- Theme customization UI needs implementation
- Color picker and typography controls planned
- Preview across devices functionality planned

#### Step 3: Integrate (Placeholder)
- Currently shows placeholder content
- Webhook integration UI planned
- Third-party service connections planned
- Email notification setup planned

#### Step 4: Share (Basic Implementation)
- Basic sharing modal exists
- Missing embed code generation
- Missing advanced sharing options
- Missing analytics integration

---

## Best Practices

### Field Editor Usage

1. **Field Selection Guidelines**
   - shortText: < 50 characters (names, titles)
   - longText: > 50 characters (comments, descriptions)
   - multipleChoice: 2-7 options
   - dropdown: 8+ options
   - yesNo: Binary decisions

2. **Editor Workflow**
   - Start with appropriate field type selection
   - Configure basic properties in Basic tab
   - Set validation rules in Validation tab
   - Customize display in Display tab
   - Test functionality in real-time preview

3. **Property Configuration**
   - Use descriptive placeholders that match expected input
   - Set reasonable character limits based on actual requirements
   - Configure default values thoughtfully
   - Order choice options logically (frequency, alphabetical, workflow)

### Technical Best Practices

1. **Performance**
   - Field editors load on-demand when fields are active
   - Auto-save debouncing prevents excessive API calls
   - Real-time previews use optimized rendering

2. **Accessibility**
   - All field editors include proper ARIA labels
   - Keyboard navigation support throughout
   - Screen reader compatibility with form builder interface

3. **Type Safety**
   - Complete TypeScript integration across all editors
   - Proper validation of field properties
   - Type-safe communication between editors and main component

---

## Technology Integration Details

### Current Tech Stack
- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS utility-first
- **UI Components**: Custom components with Lucide React icons
- **Drag & Drop**: @hello-pangea/dnd for builder interface
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: Ollama (local LLM server)
- **Animation**: Framer Motion (implemented)
- **State Management**: React Context API + useReducer

### Database Connection
```typescript
// src/lib/db.ts (existing)
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Environment Configuration (Current)
```env
# Database - Required
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"

# AI Configuration - Required
OLLAMA_BASE_URL="http://127.0.0.1:11434"
OLLAMA_MODEL="llama3.2"

# Next.js - Required
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

---

## User Experience & Workflows

### AI-Generated Form Creation Flow
1. **Homepage** (`/`) → Click "Create Form" → Select "✨ Create with AI"
2. **Create Page** (`/create`) → Enter prompt → AI generates form → Auto-save
3. **Form Builder** (`/builder/[id]`) → **Enhanced field editing** → Customize → Share
4. **Public Form** (`/form/[id]`) → Users complete form
5. **Analytics** (`/dashboard/[formId]`) → View responses and metrics

### Manual Form Creation Flow
1. **Homepage** (`/`) → Click "Create Form" → Select "📝 Start from scratch"
2. **New Form** (`/builder/new`) → Auto-creates blank form → Redirects to builder
3. **Form Builder** (`/builder/[id]`) → **Build with field editors** → Follow same flow

### Enhanced Form Management Features
- **Advanced field editing** with specialized editors for each field type
- **Real-time preview** with accurate field rendering
- **Comprehensive validation** with field-specific rules
- **Auto-save integration** with every property change
- **Drag-and-drop reordering** compatible with all field editors

---

## Known Limitations (Current State)

### Builder Limitations
1. **Step 2 (Design)**: Shows placeholder - needs theme UI implementation
2. **Step 3 (Integrate)**: Shows placeholder - needs integration UI
3. **Step 4 (Share)**: Basic implementation - missing advanced features
4. **Mobile Builder**: Form builder optimized for desktop editing
5. **Collaboration**: No real-time collaborative editing

### Form System Limitations
1. **Authentication**: No user system - forms are public
2. **File Uploads**: File upload field type exists but needs storage backend
3. **Conditional Logic**: Type definitions exist but UI not implemented
4. **Advanced Validation**: Basic validation implemented
5. **Form Logic**: No branching or conditional field display

### Technical Debt
1. **Testing**: No unit tests or integration tests
2. **Performance**: Could benefit from virtual scrolling for many fields
3. **Security**: No rate limiting or abuse prevention
4. **Accessibility**: Comprehensive audit needed for complex field editors
5. **Error Handling**: Enhanced error boundaries for field editor failures

---

## Immediate Development Priorities

### Phase 1: Complete Current Builder (Next 2-4 weeks)
1. **Design Step Implementation**
   - Color picker interface integration with field editors
   - Typography controls with real-time preview
   - Logo upload functionality
   - Theme preview system

2. **Integrate Step Implementation**
   - Webhook configuration UI
   - Email notification setup
   - Basic third-party integrations

3. **Enhanced Share Step**
   - Embed code generation
   - Advanced sharing options
   - Analytics integration

### Phase 2: Advanced Features (Next 3-6 months)
1. **Conditional Logic**
   - Show/hide fields based on responses
   - Skip logic implementation with field editor integration
   - Complex form flows

2. **Collaboration**
   - Real-time editing of field properties
   - Comments and reviews on individual fields
   - Team permissions for form editing

3. **Enterprise Features**
   - Advanced analytics
   - Custom domains
   - API access
   - Integrations marketplace

---

## Getting Started for New Developers

### Understanding the Field Editor System

1. **Review field editor structure** in `field-editors/` directory
2. **Examine BaseFieldEditor** for common patterns
3. **Study shared components** for reusable functionality
4. **Test field editing** in the form builder interface

### Setup Checklist
- [ ] Clone repository and install dependencies
- [ ] Set up PostgreSQL database (recommend Supabase)
- [ ] Configure environment variables
- [ ] Install and configure Ollama for AI features
- [ ] Run `npx prisma generate` and `npx prisma db push`
- [ ] Start development server with `npm run dev`

### Testing the Current System
- [ ] Test AI form generation flow
- [ ] Test manual form creation
- [ ] Test form builder interface (Step 1 only)
- [ ] Test public form submission
- [ ] Test response analytics dashboard
- [ ] Test form management (rename, delete)

### Code Architecture Understanding
- **Field editor components** in `form-builder/field-editors/`
- **Shared editing components** in `form-builder/shared/`
- **Type definitions** in `types/form.ts` and `components/public-form/types/fields.ts`
- **Main QuestionTile integration** in `QuestionTile.tsx`

---

*Last Updated: December 2024*  
*Builder Version: 2.0.0*  
*Field Types Supported: 16*  
*Field Editors: Complete (16/16)*  
*Multi-step Support: Full*  
*Current Implementation: Step 1 Complete, Enhanced Field Editing System*  
*Next Phase: Design & Integrate Steps*