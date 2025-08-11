# Database Schema Documentation v2.0

## Overview

This document describes the enhanced database schema for the Public Forms System v2.0, which now supports 16 field types, advanced customization, multi-step forms, and comprehensive form management.

## Schema Changes Summary

### Version 2.0 Enhancements
- ✅ **Extended forms table** with new JSONB columns for enhanced features
- ✅ **Enhanced responses table** with user agent tracking
- ✅ **16 field type support** in existing fields column
- ✅ **Backward compatibility** maintained for existing forms
- ✅ **Advanced customization** storage capabilities

---

## Tables Structure

### forms Table

```sql
CREATE TABLE forms (
  id            TEXT PRIMARY KEY DEFAULT cuid(),     -- Unique form identifier
  title         TEXT NOT NULL,                       -- Form title
  description   TEXT,                                -- Optional form description
  prompt        TEXT,                                -- Original AI prompt (for AI-generated forms)
  fields        JSONB NOT NULL,                      -- Form structure (ExtendedFormField[])
  fieldGroups   JSONB,                              -- Multi-step form groups (FieldGroup[])
  theme         JSONB DEFAULT '{}',                  -- Theme configuration (FormTheme)
  customization JSONB DEFAULT '{}',                  -- Advanced styling (FormCustomization)
  layout        JSONB DEFAULT '{}',                  -- Layout configuration (FormLayoutConfig)
  settings      JSONB DEFAULT '{}',                  -- Form behavior settings (FormSettings)
  created_at    TIMESTAMP DEFAULT NOW(),             -- Form creation timestamp
  updated_at    TIMESTAMP DEFAULT NOW()              -- Last modification timestamp
);
```

### responses Table

```sql
CREATE TABLE responses (
  id           TEXT PRIMARY KEY DEFAULT cuid(),      -- Unique response identifier
  form_id      TEXT NOT NULL,                        -- Foreign key to forms.id
  data         JSONB NOT NULL,                       -- User response data (field_id -> value)
  submitted_at TIMESTAMP DEFAULT NOW(),              -- Submission timestamp
  ip_address   TEXT,                                 -- User IP address (optional)
  user_agent   TEXT,                                 -- User agent string (NEW in v2.0)
  
  FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE
);
```

---

## JSONB Column Structures

### fields Column (Enhanced)

The `fields` column stores an array of `ExtendedFormField` objects supporting 16 field types:

```typescript
interface ExtendedFormField {
  id: string;                          // Unique field identifier
  type: ExtendedFieldType;             // One of 16 supported types
  label: string;                       // Field label
  description?: string;                // Optional description
  required: boolean;                   // Required field flag
  
  // Type-specific properties
  placeholder?: string;                // For text inputs
  options?: string[];                 // For choice fields
  maxRating?: number;                 // For rating fields
  minRating?: number;                 // For rating fields
  maxLength?: number;                 // For text fields
  minLength?: number;                 // For text fields
  acceptedFileTypes?: string[];       // For file uploads
  maxFileSize?: number;               // For file uploads (MB)
  defaultValue?: any;                 // Default field value
  helpText?: string;                  // Additional help text
  
  // Validation rules
  validationRules?: {
    pattern?: string;                 // Regex pattern
    min?: number;                     // Min value/length
    max?: number;                     // Max value/length
    customMessage?: string;           // Custom error message
    requireScrollToAccept?: boolean;  // For legal fields
  };
  
  // Display options
  displayOptions?: {
    width?: 'full' | 'half' | 'third';
    showLabel?: boolean;
    showDescription?: boolean;
    inline?: boolean;
    variant?: string;                 // Visual variant
    imageUrl?: string;                // For statement fields
    imageAlt?: string;                // Image alt text
    links?: Array<{                   // External links
      text: string;
      url: string;
      external?: boolean;
    }>;
    // ... additional display options
  };
  
  // Conditional logic (future)
  conditionalLogic?: {
    showWhen?: Array<{
      fieldId: string;
      operator: string;
      value: any;
    }>;
  };
}
```

### fieldGroups Column (NEW)

Stores multi-step form configuration:

```typescript
interface FieldGroup {
  id: string;                         // Group identifier
  title: string;                      // Step title
  description?: string;               // Step description
  fields: ExtendedFormField[];        // Fields in this step
  showProgressBar?: boolean;          // Show progress for this step
  allowBackNavigation?: boolean;      // Allow navigating back
}
```

### customization Column (NEW)

Stores advanced form styling options:

```typescript
interface FormCustomization {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: string;
    textSecondary?: string;
    border?: string;
    error?: string;
    success?: string;
    warning?: string;
  };
  
  typography?: {
    fontFamily?: string;
    fontSize?: Record<string, number>;
    fontWeight?: Record<string, number>;
    lineHeight?: Record<string, number>;
  };
  
  spacing?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  
  borders?: {
    radius?: number;
    width?: number;
  };
  
  shadows?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
  
  buttons?: Record<string, any>;      // Button styling
  inputs?: Record<string, any>;       // Input styling
  layout?: Record<string, any>;       // Layout styling
  animations?: Record<string, any>;   // Animation preferences
  branding?: Record<string, any>;     // Brand elements
}
```

### layout Column (NEW)

Stores form layout configuration:

```typescript
interface FormLayoutConfig {
  type: 'singleColumn' | 'multiStep' | 'custom';
  options: {
    maxWidth?: number;
    padding?: number;
    backgroundColor?: string;
    
    singleColumn?: {
      showQuestionNumbers?: boolean;
      questionSpacing?: number;
      submitButtonPosition?: 'left' | 'center' | 'right';
    };
    
    multiStep?: {
      showProgressBar?: boolean;
      progressBarStyle?: 'bar' | 'dots' | 'numbers';
      allowBackNavigation?: boolean;
      showStepTitles?: boolean;
    };
  };
}
```

### settings Column (NEW)

Stores form behavior settings:

```typescript
interface FormSettings {
  allowMultipleSubmissions?: boolean;
  showProgressBar?: boolean;
  requireAllFields?: boolean;
  shuffleQuestions?: boolean;
  timeLimit?: number;                    // In minutes
  redirectUrl?: string;                  // Post-submission redirect
  customSubmissionMessage?: string;
  collectIPAddress?: boolean;
  collectUserAgent?: boolean;
  enableSaveAndContinue?: boolean;
  
  submitButtonText?: string;
  showResetButton?: boolean;
  confirmBeforeSubmit?: boolean;
  
  showPrivacyNotice?: boolean;
  privacyNoticeText?: string;
  gdprCompliant?: boolean;
}
```

### theme Column (Enhanced)

Extended from basic theme to comprehensive theming:

```typescript
interface FormTheme {
  // Legacy properties (backward compatible)
  primaryColor: string;
  fontFamily: string;
  logoUrl?: string;
  
  // Enhanced properties
  secondaryColor?: string;
  tertiaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  
  fontSize?: {
    title?: number;
    question?: number;
    input?: number;
    small?: number;
  };
  
  fontWeight?: {
    normal?: number;
    medium?: number;
    bold?: number;
  };
  
  borderRadius?: number;
  spacing?: number;
  buttonStyle?: 'rounded' | 'square' | 'pill';
  inputStyle?: 'outlined' | 'filled' | 'underline';
  shadowLevel?: 'none' | 'sm' | 'md' | 'lg';
}
```

---

## Supported Field Types

### Text-Based Fields
1. **shortText** - Single-line text input
2. **longText** - Multi-line textarea
3. **email** - Email input with validation
4. **website** - URL input with validation
5. **phoneNumber** - Phone number input

### Choice-Based Fields
6. **multipleChoice** - Radio button selection
7. **dropdown** - Select dropdown
8. **yesNo** - Boolean yes/no choice

### Rating Fields
9. **numberRating** - Numeric rating scale (1-5, 1-10, etc.)
10. **opinionScale** - 1-10 opinion scale

### Special Fields
11. **statement** - Display-only content with rich text
12. **legal** - Terms acceptance with scrollable content
13. **fileUpload** - File upload with validation
14. **pageBreak** - Multi-step form section breaks
15. **startingPage** - Welcome/intro screen
16. **postSubmission** - Thank you/completion screen

### Legacy Support
- **text** → maps to **shortText**
- **rating** → maps to **numberRating**
- **date** → dedicated date field

---

## Field Validation Rules

### Built-in Validation by Type

```typescript
// Email validation
email: {
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: 'Please enter a valid email address'
}

// Phone validation
phoneNumber: {
  pattern: /^[\+]?[1-9][\d]{0,15}$/,
  message: 'Please enter a valid phone number'
}

// Website validation
website: {
  pattern: /^https?:\/\/.+/,
  message: 'Please enter a valid website URL'
}

// Rating validation
numberRating: {
  min: field.minRating || 1,
  max: field.maxRating || 5,
  message: 'Rating must be within the specified range'
}

// Opinion scale validation
opinionScale: {
  min: 1,
  max: 10,
  message: 'Please select a value between 1 and 10'
}
```

### Custom Validation Rules

```typescript
validationRules: {
  pattern: '^[A-Za-z0-9]+$',           // Custom regex
  min: 5,                              // Minimum length/value
  max: 100,                            // Maximum length/value
  customMessage: 'Custom error text',   // Override default message
  requireScrollToAccept: true          // For legal fields
}
```

---

## Database Indexes

### Recommended Indexes for Performance

```sql
-- Form queries
CREATE INDEX idx_forms_created_at ON forms(created_at DESC);
CREATE INDEX idx_forms_updated_at ON forms(updated_at DESC);

-- Response queries
CREATE INDEX idx_responses_form_id ON responses(form_id);
CREATE INDEX idx_responses_submitted_at ON responses(submitted_at DESC);
CREATE INDEX idx_responses_form_submitted ON responses(form_id, submitted_at DESC);

-- Analytics queries
CREATE INDEX idx_responses_ip_submitted ON responses(ip_address, submitted_at) 
  WHERE ip_address IS NOT NULL;
```

### JSONB Queries

```sql
-- Query forms by field type
SELECT * FROM forms 
WHERE fields @> '[{"type": "email"}]';

-- Query forms with specific settings
SELECT * FROM forms 
WHERE settings ->> 'allowMultipleSubmissions' = 'true';

-- Query responses by field value
SELECT * FROM responses 
WHERE data ->> 'email-field-id' LIKE '%@example.com';
```

---

## Migration Scripts

### From v1.0 to v2.0

```sql
-- Add new columns to existing forms table
ALTER TABLE forms 
  ADD COLUMN fieldGroups JSONB,
  ADD COLUMN customization JSONB DEFAULT '{}',
  ADD COLUMN layout JSONB DEFAULT '{}',
  ADD COLUMN settings JSONB DEFAULT '{}';

-- Add user_agent to responses table
ALTER TABLE responses 
  ADD COLUMN user_agent TEXT;

-- Update existing records with default values
UPDATE forms 
SET 
  customization = '{}',
  layout = '{"type": "singleColumn", "options": {}}',
  settings = '{"allowMultipleSubmissions": false, "collectIPAddress": true}'
WHERE customization IS NULL 
   OR layout IS NULL 
   OR settings IS NULL;
```

### Data Migration for Field Types

```sql
-- Update legacy field types in existing forms
UPDATE forms 
SET fields = jsonb_set(
  fields,
  '{0,type}',
  '"shortText"'
)
WHERE fields -> 0 ->> 'type' = 'text';

UPDATE forms 
SET fields = jsonb_set(
  fields,
  '{0,type}',
  '"numberRating"'
)
WHERE fields -> 0 ->> 'type' = 'rating';
```

---

## Backup and Recovery

### Backup Strategy

```bash
# Full database backup
pg_dump -h localhost -U username -d forms_db > backup_$(date +%Y%m%d).sql

# Forms table only
pg_dump -h localhost -U username -d forms_db -t forms > forms_backup.sql

# Responses table only  
pg_dump -h localhost -U username -d forms_db -t responses > responses_backup.sql
```

### Recovery Procedures

```bash
# Restore full database
psql -h localhost -U username -d forms_db < backup_20241201.sql

# Restore specific table
psql -h localhost -U username -d forms_db < forms_backup.sql
```

---

## Performance Considerations

### Storage Optimization

- **JSONB Compression**: JSONB automatically compresses data
- **Selective Indexing**: Only index frequently queried JSONB fields
- **Field Cleanup**: Remove empty/null fields from JSONB objects

### Query Optimization

```sql
-- Efficient JSONB queries
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM forms 
WHERE fields @> '[{"type": "email"}]';

-- Use GIN indexes for complex JSONB queries
CREATE INDEX idx_forms_fields_gin ON forms USING GIN (fields);
CREATE INDEX idx_responses_data_gin ON responses USING GIN (data);
```

---

## Security Considerations

### Data Protection

- **PII Handling**: Email, phone, and IP address data requires careful handling
- **GDPR Compliance**: Support for data deletion and export
- **Input Sanitization**: All JSONB data is sanitized before storage
- **Access Control**: Implement proper database access controls

### Audit Trail

```sql
-- Track form modifications
CREATE TABLE form_audit (
  id SERIAL PRIMARY KEY,
  form_id TEXT NOT NULL,
  action VARCHAR(20) NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE'
  old_data JSONB,
  new_data JSONB,
  modified_by TEXT,
  modified_at TIMESTAMP DEFAULT NOW()
);
```

---

## Monitoring and Maintenance

### Health Checks

```sql
-- Check for orphaned responses
SELECT COUNT(*) FROM responses r 
LEFT JOIN forms f ON r.form_id = f.id 
WHERE f.id IS NULL;

-- Check JSONB data integrity
SELECT id, title FROM forms 
WHERE NOT jsonb_typeof(fields) = 'array';

-- Monitor storage usage
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public';
```

### Maintenance Tasks

```sql
-- Vacuum and analyze for JSONB performance
VACUUM ANALYZE forms;
VACUUM ANALYZE responses;

-- Update table statistics
ANALYZE forms;
ANALYZE responses;

-- Reindex JSONB indexes periodically
REINDEX INDEX idx_forms_fields_gin;
REINDEX INDEX idx_responses_data_gin;
```

---

## Version History

### v2.0.0 (Current)
- ✅ Added 11 new field types (total: 16)
- ✅ Enhanced database schema with new JSONB columns
- ✅ Multi-step form support
- ✅ Advanced customization capabilities
- ✅ Comprehensive validation system
- ✅ User agent tracking
- ✅ Backward compatibility maintained

### v1.0.0 (Legacy)
- Basic 5 field types (text, multipleChoice, dropdown, rating, date)
- Simple theme support
- Basic form and response storage

---

*Last Updated: December 2024*  
*Schema Version: 2.0.0*  
*Compatible with: Public Forms System v2.0+*