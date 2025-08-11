# Form Builder Documentation v2.0

## Overview

The Form Builder is a comprehensive, drag-and-drop interface for creating professional forms with 16 field types, advanced customization options, and multi-step workflows. This documentation covers the enhanced v2.0 system with expanded capabilities and improved user experience.

## Builder Architecture

### Core Components Overview

```
Form Builder System v2.0
├── Four-Step Workflow
│   ├── 1. Build - Form structure and fields
│   ├── 2. Design - Theme and visual customization  
│   ├── 3. Integrate - Webhooks and third-party connections
│   └── 4. Share - Distribution and analytics
├── Enhanced Field System
│   ├── 16 Field Types - Complete field library
│   ├── Advanced Properties - Validation, display options
│   ├── Conditional Logic - Show/hide field behavior
│   └── Accessibility Features - WCAG 2.1 AA compliance
├── Advanced Customization
│   ├── Theme System - Colors, typography, spacing
│   ├── Layout Options - Single-column, multi-step
│   ├── Animation Controls - Interaction animations
│   └── Branding Options - Logos, custom styling
└── Real-time Features
    ├── Live Preview - Instant form preview
    ├── Auto-save - Automatic form saving
    ├── Collaboration - Multi-user editing (planned)
    └── Version Control - Form history (planned)
```

---

## Step 1: Build - Form Construction

### Enhanced Field Palette

The field palette now includes 16 field types organized by category:

#### Text-Based Fields
```typescript
const textFields = [
  {
    type: 'shortText',
    icon: 'type',
    label: 'Short Text',
    description: 'Single-line text input for names, titles, etc.'
  },
  {
    type: 'longText', 
    icon: 'fileText',
    label: 'Long Text',
    description: 'Multi-line textarea for detailed responses'
  },
  {
    type: 'email',
    icon: 'mail',
    label: 'Email',
    description: 'Email input with built-in validation'
  },
  {
    type: 'website',
    icon: 'link',
    label: 'Website',
    description: 'URL input with format validation'
  },
  {
    type: 'phoneNumber',
    icon: 'phone',
    label: 'Phone Number',
    description: 'Phone input with auto-formatting'
  }
];
```

#### Choice-Based Fields
```typescript
const choiceFields = [
  {
    type: 'multipleChoice',
    icon: 'radioButton',
    label: 'Multiple Choice',
    description: 'Radio buttons for single selection'
  },
  {
    type: 'dropdown',
    icon: 'chevronDown',
    label: 'Dropdown',
    description: 'Select menu for longer option lists'
  },
  {
    type: 'yesNo',
    icon: 'toggleLeft',
    label: 'Yes/No',
    description: 'Boolean choice with toggle or buttons'
  }
];
```

#### Rating Fields
```typescript
const ratingFields = [
  {
    type: 'numberRating',
    icon: 'star',
    label: 'Rating Scale',
    description: 'Star or number-based rating (customizable range)'
  },
  {
    type: 'opinionScale',
    icon: 'barChart',
    label: 'Opinion Scale', 
    description: '1-10 scale for agreement/likelihood'
  }
];
```

#### Special Fields
```typescript
const specialFields = [
  {
    type: 'statement',
    icon: 'info',
    label: 'Statement',
    description: 'Display-only content with rich formatting'
  },
  {
    type: 'legal',
    icon: 'shield',
    label: 'Legal',
    description: 'Terms acceptance with scrollable content'
  },
  {
    type: 'fileUpload',
    icon: 'upload',
    label: 'File Upload',
    description: 'File upload with validation and preview'
  },
  {
    type: 'pageBreak',
    icon: 'separator',
    label: 'Page Break',
    description: 'Section separator for multi-step forms'
  },
  {
    type: 'startingPage',
    icon: 'play',
    label: 'Welcome Screen',
    description: 'Form introduction and context setting'
  },
  {
    type: 'postSubmission',
    icon: 'checkCircle',
    label: 'Thank You Page',
    description: 'Completion screen with custom actions'
  }
];
```

### Drag-and-Drop Interface

#### Enhanced Drag Experience
- **Visual Feedback**: Clear drop zones and insertion indicators
- **Smart Positioning**: Automatic field ordering and spacing
- **Multi-selection**: Drag multiple fields at once (planned)
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

Each field type has a specialized property panel:

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
- **Real-time Updates**: Changes reflect immediately
- **Responsive Testing**: Test different screen sizes
- **Accessibility Preview**: Screen reader simulation

---

## Step 2: Design - Visual Customization

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

---

## Step 3: Integrate - Connections & Workflows

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

---

## Step 4: Share - Distribution & Analytics

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

#### Analytics Visualization Components
```typescript
const AnalyticsDashboard: React.FC<{ formId: string }> = ({ formId }) => {
  const { data: analytics, loading } = useFormAnalytics(formId);
  
  if (loading) return <AnalyticsLoader />;
  
  return (
    <div className="analytics-dashboard">
      <OverviewCards metrics={analytics.overview} />
      
      <div className="analytics-grid">
        <ChartCard title="Form Views & Responses">
          <TimeSeriesChart 
            data={analytics.timeSeriesData}
            metrics={['views', 'responses']}
          />
        </ChartCard>
        
        <ChartCard title="Conversion Rate">
          <LineChart data={analytics.timeSeriesData.conversionRate} />
        </ChartCard>
        
        <ChartCard title="Field Performance">
          <FieldAnalyticsTable data={analytics.fieldAnalytics} />
        </ChartCard>
        
        <ChartCard title="Traffic Sources">
          <PieChart data={analytics.trafficSources} />
        </ChartCard>
        
        <ChartCard title="Device Breakdown">
          <BarChart data={analytics.deviceAnalytics} />
        </ChartCard>
        
        <ChartCard title="Geographic Distribution">
          <WorldMap data={analytics.geographicData} />
        </ChartCard>
      </div>
    </div>
  );
};
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

## Conditional Logic Builder

### Logic Configuration Interface

#### Condition Builder
```typescript
interface ConditionalRule {
  id: string;
  fieldId: string;        // Target field to show/hide
  conditions: Array<{
    sourceFieldId: string;  // Field that triggers the condition
    operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan' | 'isEmpty' | 'isNotEmpty';
    value: any;            // Comparison value
    logicalOperator?: 'AND' | 'OR'; // For multiple conditions
  }>;
  action: 'show' | 'hide' | 'require' | 'unrequire';
}

const ConditionalLogicBuilder: React.FC<{
  form: ExtendedForm;
  onRulesChange: (rules: ConditionalRule[]) => void;
}> = ({ form, onRulesChange }) => {
  const [rules, setRules] = useState<ConditionalRule[]>([]);
  
  const addRule = () => {
    const newRule: ConditionalRule = {
      id: `rule-${Date.now()}`,
      fieldId: '',
      conditions: [{
        sourceFieldId: '',
        operator: 'equals',
        value: ''
      }],
      action: 'show'
    };
    setRules([...rules, newRule]);
  };
  
  return (
    <div className="conditional-logic-builder">
      <div className="rules-header">
        <h3>Conditional Logic Rules</h3>
        <button onClick={addRule} className="add-rule-btn">
          Add Rule
        </button>
      </div>
      
      <div className="rules-list">
        {rules.map((rule) => (
          <RuleEditor
            key={rule.id}
            rule={rule}
            availableFields={form.fields}
            onUpdate={(updatedRule) => updateRule(rule.id, updatedRule)}
            onDelete={() => deleteRule(rule.id)}
          />
        ))}
      </div>
      
      <LogicPreview rules={rules} form={form} />
    </div>
  );
};
```

#### Rule Editor Component
```typescript
const RuleEditor: React.FC<{
  rule: ConditionalRule;
  availableFields: ExtendedFormField[];
  onUpdate: (rule: ConditionalRule) => void;
}> = ({ rule, availableFields, onUpdate }) => {
  const fieldOptions = availableFields.map(field => ({
    value: field.id,
    label: field.label,
    type: field.type
  }));
  
  return (
    <div className="rule-editor">
      <div className="rule-target">
        <label>When conditions are met:</label>
        <Select
          value={rule.action}
          onChange={(action) => onUpdate({ ...rule, action })}
          options={[
            { value: 'show', label: 'Show field' },
            { value: 'hide', label: 'Hide field' },
            { value: 'require', label: 'Make required' },
            { value: 'unrequire', label: 'Make optional' }
          ]}
        />
        <Select
          value={rule.fieldId}
          onChange={(fieldId) => onUpdate({ ...rule, fieldId })}
          options={fieldOptions}
          placeholder="Select field"
        />
      </div>
      
      <div className="rule-conditions">
        <label>Conditions:</label>
        {rule.conditions.map((condition, index) => (
          <ConditionEditor
            key={index}
            condition={condition}
            availableFields={fieldOptions}
            onUpdate={(updatedCondition) => updateCondition(index, updatedCondition)}
            onDelete={() => deleteCondition(index)}
            showLogicalOperator={index > 0}
          />
        ))}
        <button onClick={addCondition} className="add-condition-btn">
          Add Condition
        </button>
      </div>
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

## Collaboration Features (Planned)

### Real-time Collaboration

#### Multi-user Editing
```typescript
interface CollaborationState {
  users: Array<{
    id: string;
    name: string;
    avatar?: string;
    cursor?: { x: number; y: number };
    selection?: string; // Field ID being edited
  }>;
  
  conflicts: Array<{
    fieldId: string;
    users: string[];
    timestamp: Date;
  }>;
}

const CollaborationProvider: React.FC<{ formId: string; children: React.ReactNode }> = ({ 
  formId, 
  children 
}) => {
  const [collaborationState, setCollaborationState] = useState<CollaborationState>({
    users: [],
    conflicts: []
  });
  
  // WebSocket connection for real-time updates
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3001/collaborate/${formId}`);
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleCollaborationMessage(message);
    };
    
    return () => ws.close();
  }, [formId]);
  
  return (
    <CollaborationContext.Provider value={collaborationState}>
      {children}
    </CollaborationContext.Provider>
  );
};
```

#### Comment System
```typescript
interface FormComment {
  id: string;
  fieldId?: string;     // Associated field (optional)
  userId: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
  replies?: FormComment[];
}

const CommentSystem: React.FC<{ form: ExtendedForm }> = ({ form }) => {
  const [comments, setComments] = useState<FormComment[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  
  const addComment = (fieldId: string | undefined, message: string) => {
    const comment: FormComment = {
      id: `comment-${Date.now()}`,
      fieldId,
      userId: 'current-user-id',
      message,
      timestamp: new Date(),
      resolved: false
    };
    
    setComments([...comments, comment]);
  };
  
  return (
    <div className="comment-system">
      <CommentsList 
        comments={comments}
        selectedField={selectedField}
        onFieldSelect={setSelectedField}
      />
      <CommentComposer onSubmit={addComment} />
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

### Form Versioning

#### Version Control System
```typescript
interface FormVersion {
  id: string;
  formId: string;
  version: string;      // e.g., "1.2.0"
  form: ExtendedForm;
  changes: string[];    // List of changes made
  createdBy: string;
  createdAt: Date;
  isPublished: boolean;
}

const VersionControl: React.FC<{ formId: string }> = ({ formId }) => {
  const [versions, setVersions] = useState<FormVersion[]>([]);
  const [selectedVersions, setSelectedVersions] = useState<[string, string] | null>(null);
  
  const createVersion = async (changes: string[]) => {
    const currentForm = await fetchForm(formId);
    const newVersion = generateVersionNumber(versions);
    
    const version: FormVersion = {
      id: `version-${Date.now()}`,
      formId,
      version: newVersion,
      form: currentForm,
      changes,
      createdBy: 'current-user-id',
      createdAt: new Date(),
      isPublished: false
    };
    
    await saveVersion(version);
    setVersions([version, ...versions]);
  };
  
  return (
    <div className="version-control">
      <VersionHistory 
        versions={versions}
        onCompare={(v1, v2) => setSelectedVersions([v1, v2])}
      />
      
      {selectedVersions && (
        <VersionComparison
          version1={versions.find(v => v.id === selectedVersions[0])}
          version2={versions.find(v => v.id === selectedVersions[1])}
        />
      )}
    </div>
  );
};
```

---

## Migration & Upgrade Path

### Migrating from Legacy Builder

#### Migration Wizard
```typescript
const MigrationWizard: React.FC<{ legacyForm: any }> = ({ legacyForm }) => {
  const [migrationStep, setMigrationStep] = useState(1);
  const [migrationOptions, setMigrationOptions] = useState({
    preserveData: true,
    upgradeFieldTypes: true,
    addNewFeatures: false,
    createBackup: true
  });
  
  const steps = [
    { id: 1, title: 'Backup & Preparation', component: BackupStep },
    { id: 2, title: 'Field Type Mapping', component: FieldMappingStep },
    { id: 3, title: 'Feature Upgrades', component: FeatureUpgradeStep },
    { id: 4, title: 'Review & Migrate', component: ReviewStep }
  ];
  
  const runMigration = async () => {
    try {
      const migratedForm = await migrateForm(legacyForm, migrationOptions);
      // Navigate to new form builder
    } catch (error) {
      // Handle migration error
    }
  };
  
  return (
    <MigrationWizardContainer>
      <MigrationSteps steps={steps} currentStep={migrationStep} />
      <StepContent>
        {/* Render current step component */}
      </StepContent>
      <MigrationControls 
        onNext={() => setMigrationStep(migrationStep + 1)}
        onPrevious={() => setMigrationStep(migrationStep - 1)}
        onMigrate={runMigration}
      />
    </MigrationWizardContainer>
  );
};
```

---

## Builder API Integration

### Builder State Management
```typescript
interface BuilderState {
  form: ExtendedForm;
  ui: {
    activeStep: number;
    selectedField?: string;
    sidebarOpen: boolean;
    previewMode: 'desktop' | 'tablet' | 'mobile';
    isDirty: boolean;
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

---

## Current Implementation Status

### What's Currently Working ✅

Based on the existing MVP implementation:

#### Step 1: Build (Fully Implemented)
- **Google Forms-style interface** with question tiles
- **Drag-and-drop reordering** using @hello-pangea/dnd
- **Live preview panel** (toggle on/off)
- **Field type switching** between available types
- **Question editing** with real-time updates
- **Form settings** (title, description, basic theme)
- **Auto-save functionality** on every change

#### Enhanced Features Already Built
- **16 Field Types**: Complete field library implemented
- **Advanced Validation**: Type-specific validation for all fields
- **Enhanced API**: Supports all new field types and properties
- **Database Schema**: Extended to support new features
- **Form Conversion**: Legacy form migration utilities
- **Field Rendering**: Complete rendering system for all field types

#### Basic Share Functionality
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

## Current Project Structure (As Implemented)

```
DevForms
|
|-- devformsv1
|   |
|   |-- Documentation.md
|   |-- eslint.config.mjs
|   |-- next.config.ts
|   |-- package.json
|   |-- postcss.config.mjs
|   |-- README.md
|   |-- tsconfig.json
|   |
|   |-- prisma
|   |   |-- schema.prisma
|   |
|   |-- public
|   |   |-- file.svg
|   |   |-- globe.svg
|   |   |-- next.svg
|   |   |-- vercel.svg
|   |   |-- window.svg
|   |
|   |-- src
|       |
|       |-- app
|       |   |
|       |   |-- api
|       |   |   |
|       |   |   |-- ai
|       |   |   |   |-- generate-form
|       |   |   |       |-- route.ts
|       |   |   |
|       |   |   |-- forms
|       |   |   |   |
|       |   |   |   |-- [id]
|       |   |   |   |   |
|       |   |   |   |   |-- analytics
|       |   |   |   |   |   |-- route.ts
|       |   |   |   |   |-- export
|       |   |   |   |   |   |-- route.ts
|       |   |   |   |   |-- responses
|       |   |   |   |   |   |-- [responseId]
|       |   |   |   |   |   |   |-- route.ts
|       |   |   |   |   |   |-- route.ts
|       |   |   |   |   |-- route.ts
|       |   |   |   |   |-- submit
|       |   |   |   |       |-- route.ts
|       |   |   |   |-- route.ts
|       |   |   |   |-- route.ts
|       |   |   |
|       |   |   |-- qr
|       |   |       |-- generate
|       |   |           |-- route.ts
|       |   |
|       |   |-- builder
|       |   |   |-- [id]
|       |   |   |   |-- page.tsx
|       |   |   |-- new
|       |   |       |-- page.tsx
|       |   |
|       |   |-- create
|       |   |   |-- page.tsx
|       |   |
|       |   |-- dashboard
|       |   |   |-- [formId]
|       |   |       |-- page.tsx
|       |   |
|       |   |-- favicon.ico
|       |   |
|       |   |-- form
|       |   |   |-- [id]
|       |   |       |-- page.tsx
|       |   |
|       |   |-- globals.css
|       |   |-- layout.tsx
|       |   |-- page.tsx
|       |
|       |-- components
|       |   |
|       |   |-- dashboard
|       |   |   |-- AnalyticsCards.tsx
|       |   |   |-- ExportModal.tsx
|       |   |   |-- ResponseModal.tsx
|       |   |   |-- ResponsesTable.tsx
|       |   |
|       |   |-- form-builder
|       |   |   |-- FormBuilderSidebar.tsx
|       |   |   |-- FormBuilderStepper.tsx
|       |   |   |-- FormPreview.tsx
|       |   |   |-- FormSettings.tsx
|       |   |   |-- LivePreview.tsx
|       |   |   |-- PromptInput.tsx
|       |   |   |-- QuestionEditor.tsx
|       |   |   |-- QuestionTile.tsx
|       |   |
|       |   |-- form-renderer
|       |   |
|       |   |-- sharing
|       |   |   |-- ShareableLink.tsx
|       |   |   |-- ShareModal.tsx
|       |   |
|       |   |-- ui
|       |       |-- LoadingState.tsx
|       |       |-- Toast.tsx
|       |
|       |-- generated
|       |
|       |-- lib
|           |
|           |-- ai
|           |   |-- form-generator.ts
|           |   |-- ollama-client.ts
|           |
|           |-- db
|           |   |-- index.ts
|           |
|           |-- utils
|           |
|       |-- types
|           |-- form.ts
|
```

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

## User Experience & Workflows (Current Implementation)

### AI-Generated Form Creation Flow
1. **Homepage** (`/`) → Click "Create Form" → Select "✨ Create with AI"
2. **Create Page** (`/create`) → Enter prompt → AI generates form → Auto-save
3. **Form Builder** (`/builder/[id]`) → Edit generated form → Customize → Share
4. **Public Form** (`/form/[id]`) → Users complete form
5. **Analytics** (`/dashboard/[formId]`) → View responses and metrics

### Manual Form Creation Flow
1. **Homepage** (`/`) → Click "Create Form" → Select "📝 Start from scratch"
2. **New Form** (`/builder/new`) → Auto-creates blank form → Redirects to builder
3. **Form Builder** (`/builder/[id]`) → Build from scratch → Follow same flow

### Form Management (Current Features)
- **Inline form renaming** with real-time updates
- **Form deletion** with confirmation dialogs
- **Response viewing** with analytics dashboard
- **Form duplication** (planned)
- **Form templates** (planned)

---

## Known Limitations (Current State)

### Builder Limitations
1. **Step 2 (Design)**: Shows placeholder - needs theme UI implementation
2. **Step 3 (Integrate)**: Shows placeholder - needs integration UI
3. **Step 4 (Share)**: Basic implementation - missing advanced features
4. **Mobile Builder**: Not optimized for mobile editing
5. **Collaboration**: No real-time collaborative editing

### Form System Limitations
1. **Authentication**: No user system - forms are public
2. **File Uploads**: File upload field type exists but needs storage backend
3. **Conditional Logic**: Type definitions exist but UI not implemented
4. **Advanced Validation**: Basic validation implemented
5. **Form Logic**: No branching or conditional field display

### Technical Debt
1. **Testing**: No unit tests or integration tests
2. **Performance**: No caching layer for forms
3. **Security**: No rate limiting or abuse prevention
4. **Accessibility**: Basic ARIA support, needs comprehensive audit
5. **Error Handling**: Basic error boundaries, needs improvement

---

## Immediate Development Priorities

### Phase 1: Complete Current Builder (Next 2-4 weeks)
1. **Design Step Implementation**
   - Color picker interface
   - Typography controls  
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

### Phase 2: User Management (Next 1-2 months)
1. **Authentication System**
   - User registration/login
   - Form ownership
   - Access control

2. **Form Organization**
   - Folders/categories
   - Form templates
   - Bulk operations

### Phase 3: Advanced Features (Next 3-6 months)
1. **Conditional Logic**
   - Show/hide fields based on responses
   - Skip logic implementation
   - Complex form flows

2. **Collaboration**
   - Real-time editing
   - Comments and reviews
   - Team permissions

3. **Enterprise Features**
   - Advanced analytics
   - Custom domains
   - API access
   - Integrations marketplace

---

## Getting Started for New Developers

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
- [ ] Review form type definitions in `types/form.ts`
- [ ] Understand field rendering system in `components/FieldRenderer.tsx`
- [ ] Study form builder components in `form-builder/`
- [ ] Examine API endpoints in `app/api/`
- [ ] Review database schema in `prisma/schema.prisma`

---

*Last Updated: December 2024*  
*Builder Version: 2.0.0*  
*Field Types Supported: 16*  
*Multi-step Support: Full*  
*Current Implementation: MVP Complete*  
*Next Phase: Design & Integrate Steps*