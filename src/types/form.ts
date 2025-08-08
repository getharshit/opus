export interface FormField {
    id: string;
    type: 'text' | 'multipleChoice' | 'dropdown' | 'rating' | 'date';
    label: string;
    required: boolean;
    options?: string[]; // for multiple choice/dropdown
    maxRating?: number; // for rating fields
    placeholder?: string;
  }
  
  export interface FormTheme {
    primaryColor: string;
    fontFamily: string;
    logoUrl?: string;
  }
  
  export interface Form {
    id: string;
    title: string;
    description?: string;
    fields: FormField[];
    theme: FormTheme;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface FormResponse {
    id: string;
    formId: string;
    data: Record<string, any>;
    submittedAt: Date;
    ipAddress?: string;
  }

  export interface FormListItem {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    responseCount: number;
    theme: FormTheme;
  }