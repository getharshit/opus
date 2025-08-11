# API Endpoints Documentation v2.0

## Overview

This document describes the enhanced REST API endpoints for the Public Forms System v2.0, supporting 16 field types, advanced form customization, multi-step forms, and comprehensive validation.

## Base URL

```
Production: https://your-domain.com/api
Development: http://localhost:3000/api
```

## API Changes Summary

### Version 2.0 Enhancements
- ✅ **16 field type support** across all endpoints
- ✅ **Enhanced validation** with type-specific rules
- ✅ **Extended form properties** (customization, layout, settings)
- ✅ **Advanced error handling** with detailed validation messages
- ✅ **Backward compatibility** maintained for existing API consumers
- ✅ **Enhanced analytics** and export capabilities

---

## Authentication

Currently no authentication required. Future versions will implement:
- API key authentication
- JWT token-based authentication
- Rate limiting per API key

---

## Forms Management

### GET /api/forms

Retrieve all forms with enhanced metadata and response counts.

#### Response

```json
{
  "forms": [
    {
      "id": "clx123...",
      "title": "Customer Feedback Form",
      "description": "Help us improve our service",
      "createdAt": "2024-12-01T10:00:00Z",
      "updatedAt": "2024-12-01T15:30:00Z",
      "responseCount": 245,
      "theme": {
        "primaryColor": "#3B82F6",
        "fontFamily": "Inter",
        "logoUrl": "https://example.com/logo.png"
      },
      "settings": {
        "allowMultipleSubmissions": false,
        "collectIPAddress": true,
        "showProgressBar": true
      }
    }
  ]
}
```

#### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `limit` | number | Maximum forms to return | `?limit=50` |
| `offset` | number | Number of forms to skip | `?offset=20` |
| `sortBy` | string | Sort field (`createdAt`, `updatedAt`, `title`) | `?sortBy=updatedAt` |
| `order` | string | Sort order (`asc`, `desc`) | `?order=desc` |

---

### POST /api/forms

Create a new form with enhanced field types and properties.

#### Request Body

```json
{
  "title": "Enhanced Contact Form",
  "description": "Contact us with your questions",
  "fields": [
    {
      "id": "name",
      "type": "shortText",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name",
      "maxLength": 100,
      "validationRules": {
        "pattern": "^[a-zA-Z\\s]+$",
        "customMessage": "Name can only contain letters and spaces"
      }
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "name@example.com",
      "helpText": "We'll never share your email"
    },
    {
      "id": "phone",
      "type": "phoneNumber",
      "label": "Phone Number",
      "required": false,
      "placeholder": "(555) 123-4567"
    },
    {
      "id": "satisfaction",
      "type": "numberRating",
      "label": "How satisfied are you?",
      "required": true,
      "minRating": 1,
      "maxRating": 5
    },
    {
      "id": "contact-method",
      "type": "multipleChoice",
      "label": "Preferred contact method",
      "required": true,
      "options": ["Email", "Phone", "SMS", "Mail"]
    },
    {
      "id": "terms",
      "type": "legal",
      "label": "I agree to the Terms of Service",
      "required": true,
      "description": "<div><h3>Terms of Service</h3><p>By submitting this form...</p></div>",
      "validationRules": {
        "requireScrollToAccept": true
      }
    }
  ],
  "theme": {
    "primaryColor": "#3B82F6",
    "fontFamily": "Inter",
    "backgroundColor": "#FFFFFF"
  },
  "customization": {
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#6B7280",
      "accent": "#10B981"
    },
    "typography": {
      "fontFamily": "Inter, system-ui, sans-serif"
    },
    "spacing": {
      "md": 16,
      "lg": 24
    }
  },
  "layout": {
    "type": "singleColumn",
    "options": {
      "maxWidth": 600,
      "showQuestionNumbers": true
    }
  },
  "settings": {
    "allowMultipleSubmissions": false,
    "showProgressBar": true,
    "collectIPAddress": true,
    "collectUserAgent": true,
    "submitButtonText": "Send Message"
  },
  "prompt": "Create a contact form for customer support"
}
```

#### Response

```json
{
  "id": "clx456...",
  "title": "Enhanced Contact Form",
  "description": "Contact us with your questions",
  "fields": [...],
  "theme": {...},
  "customization": {...},
  "layout": {...},
  "settings": {...},
  "createdAt": "2024-12-01T16:00:00Z",
  "updatedAt": "2024-12-01T16:00:00Z"
}
```

#### Field Type Validation

The API validates each field type and returns specific errors:

**Email Field Validation:**
```json
{
  "error": "Invalid field structure",
  "details": [
    "Email field 'user-email' must have a valid email format validation"
  ]
}
```

**Choice Field Validation:**
```json
{
  "error": "Invalid field structure", 
  "details": [
    "Field 'contact-method' must have at least one option"
  ]
}
```

**Rating Field Validation:**
```json
{
  "error": "Invalid field structure",
  "details": [
    "Field 'satisfaction' must have a valid maxRating greater than 0"
  ]
}
```

---

### GET /api/forms/[id]

Retrieve a specific form with complete configuration.

#### Response

```json
{
  "id": "clx456...",
  "title": "Enhanced Contact Form",
  "description": "Contact us with your questions",
  "prompt": "Create a contact form for customer support",
  "fields": [
    {
      "id": "name",
      "type": "shortText",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name",
      "maxLength": 100,
      "validationRules": {
        "pattern": "^[a-zA-Z\\s]+$",
        "customMessage": "Name can only contain letters and spaces"
      },
      "displayOptions": {
        "width": "full",
        "showLabel": true
      }
    }
  ],
  "fieldGroups": null,
  "theme": {
    "primaryColor": "#3B82F6",
    "fontFamily": "Inter",
    "backgroundColor": "#FFFFFF",
    "fontSize": {
      "title": 24,
      "question": 16
    }
  },
  "customization": {
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#6B7280"
    }
  },
  "layout": {
    "type": "singleColumn",
    "options": {
      "maxWidth": 600
    }
  },
  "settings": {
    "allowMultipleSubmissions": false,
    "collectIPAddress": true
  },
  "responseCount": 0,
  "createdAt": "2024-12-01T16:00:00Z",
  "updatedAt": "2024-12-01T16:00:00Z"
}
```

#### Error Responses

```json
{
  "error": "Form not found",
  "message": "No form found with ID: clx456..."
}
```

---

### PUT /api/forms/[id]

Update an existing form with partial or complete data.

#### Request Body (Partial Update)

```json
{
  "title": "Updated Contact Form",
  "settings": {
    "allowMultipleSubmissions": true,
    "submitButtonText": "Submit Updated Form"
  },
  "customization": {
    "colors": {
      "primary": "#FF6B6B"
    }
  }
}
```

#### Response

Returns the complete updated form object.

#### Validation Rules

- **Field Updates**: When updating fields, all field validation rules apply
- **Partial Updates**: Only provided properties are updated
- **Nested Objects**: Nested objects (settings, customization) are merged, not replaced
- **Type Validation**: All field types are validated against supported types

---

### DELETE /api/forms/[id]

Delete a form and all associated responses.

#### Response

```json
{
  "message": "Form deleted successfully",
  "deletedFormId": "clx456...",
  "deletedResponsesCount": 42
}
```

#### Error Responses

```json
{
  "error": "Form not found",
  "message": "No form found with ID: clx456..."
}
```

---

## Form Submission

### POST /api/forms/[id]/submit

Submit a response to a form with comprehensive validation.

#### Request Body

```json
{
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-123-4567",
    "satisfaction": 4,
    "contact-method": "Email",
    "terms": true
  }
}
```

#### Response (Success)

```json
{
  "success": true,
  "responseId": "clx789...",
  "submittedAt": "2024-12-01T17:00:00Z",
  "message": "Form submitted successfully"
}
```

#### Response (Validation Errors)

```json
{
  "error": "Validation failed",
  "details": [
    "Email Address must be a valid email address",
    "Phone Number must be a valid phone number", 
    "How satisfied are you? must be between 1 and 5",
    "Terms of Service must be accepted"
  ]
}
```

#### Field-Specific Validation

**Email Validation:**
```json
{
  "error": "Validation failed",
  "details": ["Email Address must be a valid email address"]
}
```

**Phone Number Validation:**
```json
{
  "error": "Validation failed", 
  "details": ["Phone Number must be a valid phone number"]
}
```

**Rating Validation:**
```json
{
  "error": "Validation failed",
  "details": ["Rating must be between 1 and 5"]
}
```

**Choice Field Validation:**
```json
{
  "error": "Validation failed",
  "details": ["Preferred contact method must be one of the provided options"]
}
```

**Required Field Validation:**
```json
{
  "error": "Validation failed",
  "details": ["Full Name is required"]
}
```

**Custom Pattern Validation:**
```json
{
  "error": "Validation failed",
  "details": ["Name can only contain letters and spaces"]
}
```

#### Multiple Submission Handling

If form settings prevent multiple submissions:

```json
{
  "error": "You have already submitted a response to this form",
  "code": "DUPLICATE_SUBMISSION"
}
```

---

## Response Management

### GET /api/forms/[id]/responses

Retrieve all responses for a specific form.

#### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `limit` | number | Max responses to return | `?limit=100` |
| `offset` | number | Number to skip | `?offset=50` |
| `sortBy` | string | Sort field (`submittedAt`) | `?sortBy=submittedAt` |
| `order` | string | Sort order (`asc`, `desc`) | `?order=desc` |
| `dateFrom` | string | Filter from date (ISO) | `?dateFrom=2024-12-01` |
| `dateTo` | string | Filter to date (ISO) | `?dateTo=2024-12-31` |

#### Response

```json
{
  "responses": [
    {
      "id": "clx789...",
      "formId": "clx456...",
      "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "satisfaction": 4,
        "contact-method": "Email"
      },
      "submittedAt": "2024-12-01T17:00:00Z",
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
  ],
  "totalCount": 245,
  "hasMore": true
}
```

---

### DELETE /api/forms/[id]/responses/[responseId]

Delete a specific response.

#### Response

```json
{
  "success": true,
  "message": "Response deleted successfully",
  "deletedResponseId": "clx789..."
}
```

---

## Analytics and Export

### GET /api/forms/[id]/analytics

Get comprehensive analytics for a form.

#### Response

```json
{
  "formId": "clx456...",
  "totalResponses": 245,
  "completionRate": 87.5,
  "averageTimeToComplete": 180,
  "abandonmentRate": 12.5,
  "fieldAnalytics": [
    {
      "fieldId": "satisfaction",
      "fieldLabel": "How satisfied are you?",
      "fieldType": "numberRating",
      "responseRate": 95.2,
      "averageValue": 3.8,
      "distribution": {
        "1": 5,
        "2": 12,
        "3": 45,
        "4": 89,
        "5": 67
      }
    },
    {
      "fieldId": "contact-method",
      "fieldLabel": "Preferred contact method",
      "fieldType": "multipleChoice",
      "responseRate": 98.1,
      "distribution": {
        "Email": 156,
        "Phone": 45,
        "SMS": 32,
        "Mail": 8
      }
    }
  ],
  "responsesByDate": [
    {
      "date": "2024-12-01",
      "count": 23
    },
    {
      "date": "2024-12-02", 
      "count": 31
    }
  ],
  "topAbandonmentFields": [
    {
      "fieldId": "phone",
      "fieldLabel": "Phone Number",
      "abandonmentRate": 15.2
    }
  ]
}
```

---

### GET /api/forms/[id]/export

Export form responses in various formats.

#### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `format` | string | Export format (`csv`, `json`, `xlsx`) | `?format=csv` |
| `dateRange` | string | Date range (`all`, `week`, `month`, `custom`) | `?dateRange=month` |
| `dateFrom` | string | Custom range start | `?dateFrom=2024-12-01` |
| `dateTo` | string | Custom range end | `?dateTo=2024-12-31` |
| `fields` | string | Comma-separated field IDs | `?fields=name,email,satisfaction` |

#### Response (CSV)

```
Content-Type: text/csv
Content-Disposition: attachment; filename="responses_2024-12-01.csv"

"Response ID","Submitted At","Full Name","Email Address","Phone Number","Satisfaction","Contact Method","IP Address"
"clx789...","2024-12-01T17:00:00Z","John Doe","john@example.com","+1-555-123-4567","4","Email","192.168.1.1"
```

#### Response (JSON)

```json
{
  "exportedAt": "2024-12-01T18:00:00Z",
  "formId": "clx456...",
  "formTitle": "Enhanced Contact Form",
  "totalResponses": 245,
  "responses": [
    {
      "responseId": "clx789...",
      "submittedAt": "2024-12-01T17:00:00Z",
      "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "satisfaction": 4
      },
      "metadata": {
        "ipAddress": "192.168.1.1",
        "userAgent": "Mozilla/5.0..."
      }
    }
  ]
}
```

---

## Utility Endpoints

### POST /api/qr/generate

Generate QR code for form sharing.

#### Request Body

```json
{
  "url": "https://your-domain.com/form/clx456...",
  "size": 200,
  "format": "png"
}
```

#### Response

```json
{
  "qrCodeDataUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "size": 200,
  "format": "png"
}
```

---

### GET /api/forms/[id]/preview

Get form preview data for embedding.

#### Response

```json
{
  "formId": "clx456...",
  "title": "Enhanced Contact Form",
  "description": "Contact us with your questions",
  "fieldCount": 6,
  "estimatedTime": "3-5 minutes",
  "theme": {
    "primaryColor": "#3B82F6",
    "fontFamily": "Inter"
  },
  "isActive": true,
  "allowsMultipleSubmissions": false
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Description | Usage |
|------|-------------|--------|
| `200` | Success | Successful GET, PUT operations |
| `201` | Created | Successful POST operations |
| `400` | Bad Request | Validation errors, malformed requests |
| `404` | Not Found | Form or response not found |
| `409` | Conflict | Duplicate submissions, concurrency issues |
| `422` | Unprocessable Entity | Business logic validation errors |
| `500` | Internal Server Error | Server errors |

### Error Response Format

```json
{
  "error": "Validation failed",
  "message": "One or more fields failed validation",
  "details": [
    "Email Address must be a valid email address",
    "Phone Number is required"
  ],
  "code": "VALIDATION_ERROR",
  "timestamp": "2024-12-01T18:00:00Z"
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Field validation failed |
| `FORM_NOT_FOUND` | Requested form doesn't exist |
| `RESPONSE_NOT_FOUND` | Requested response doesn't exist |
| `DUPLICATE_SUBMISSION` | Multiple submission not allowed |
| `INVALID_FIELD_TYPE` | Unsupported field type |
| `MISSING_REQUIRED_FIELD` | Required field not provided |

---

## Rate Limiting

Current implementation has no rate limiting. Future versions will implement:

```
- 1000 requests per hour per IP
- 100 form submissions per hour per IP
- 10 form creations per hour per IP
```

### Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## Supported Field Types Reference

### Text-Based Fields

| Type | Description | Validation | Example |
|------|-------------|------------|---------|
| `shortText` | Single-line text | Pattern, length | Name, title |
| `longText` | Multi-line text | Length | Comments, feedback |
| `email` | Email address | Email format | user@example.com |
| `website` | Website URL | URL format | https://example.com |
| `phoneNumber` | Phone number | Phone format | +1-555-123-4567 |

### Choice-Based Fields

| Type | Description | Validation | Example |
|------|-------------|------------|---------|
| `multipleChoice` | Radio buttons | Options list | Gender, preference |
| `dropdown` | Select dropdown | Options list | Country, category |
| `yesNo` | Boolean choice | Boolean | Consent, agreement |

### Rating Fields

| Type | Description | Validation | Example |
|------|-------------|------------|---------|
| `numberRating` | Numeric rating | Min/max range | 1-5 stars |
| `opinionScale` | 1-10 scale | 1-10 range | Satisfaction |

### Special Fields

| Type | Description | Validation | Example |
|------|-------------|------------|---------|
| `statement` | Display content | None | Instructions |
| `legal` | Terms acceptance | Boolean | Terms of service |
| `fileUpload` | File upload | File type/size | Document upload |
| `pageBreak` | Section separator | None | Multi-step forms |
| `startingPage` | Welcome screen | None | Form introduction |
| `postSubmission` | Thank you page | None | Completion message |

---

## Webhooks (Future)

Planned webhook support for form events:

```json
{
  "event": "form.response.created",
  "formId": "clx456...",
  "responseId": "clx789...",
  "timestamp": "2024-12-01T18:00:00Z",
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Planned Webhook Events

- `form.created`
- `form.updated`
- `form.deleted`
- `form.response.created`
- `form.response.updated` 
- `form.response.deleted`

---

## API Versioning

Current version: `v2.0`

Future API versions will be accessible via:
```
/api/v2/forms
/api/v3/forms
```

### Deprecation Policy

- API versions supported for minimum 12 months
- 6-month advance notice for deprecation
- Migration guides provided for major version changes

---

*Last Updated: December 2024*  
*API Version: 2.0.0*  
*Compatible with: Public Forms System v2.0+*