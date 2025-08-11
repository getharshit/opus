import { Plus } from "lucide-react";
import {
  Type,
  FileText,
  Mail,
  Link,
  Phone,
  List,
  ChevronDown,
  ToggleLeft,
  Star,
  BarChart3,
  Info,
  Shield,
  Upload,
  Minus,
  Play,
  CheckCircle,
} from "lucide-react";
import { ExtendedFieldType } from "@/types/form";

interface FormBuilderSidebarProps {
  onAddField: (type: ExtendedFieldType) => void;
}

const ENHANCED_FIELD_TYPES = [
  // Text Input Fields
  {
    type: "shortText" as const,
    label: "Short Text",
    icon: Type,
    description: "Single-line text input",
  },
  {
    type: "longText" as const,
    label: "Long Text",
    icon: FileText,
    description: "Multi-line textarea",
  },
  {
    type: "email" as const,
    label: "Email",
    icon: Mail,
    description: "Email input with validation",
  },
  {
    type: "website" as const,
    label: "Website",
    icon: Link,
    description: "URL input with validation",
  },
  {
    type: "phoneNumber" as const,
    label: "Phone Number",
    icon: Phone,
    description: "Phone input with formatting",
  },

  // Choice Fields
  {
    type: "multipleChoice" as const,
    label: "Multiple Choice",
    icon: List,
    description: "Radio button selection",
  },
  {
    type: "dropdown" as const,
    label: "Dropdown",
    icon: ChevronDown,
    description: "Select dropdown menu",
  },
  {
    type: "yesNo" as const,
    label: "Yes/No",
    icon: ToggleLeft,
    description: "Boolean choice field",
  },
  {
    type: "numberRating" as const,
    label: "Number Rating",
    icon: Star,
    description: "Star or numeric rating",
  },
  {
    type: "opinionScale" as const,
    label: "Opinion Scale",
    icon: BarChart3,
    description: "1-10 opinion scale",
  },

  // Special Fields
  {
    type: "statement" as const,
    label: "Statement",
    icon: Info,
    description: "Display-only content",
  },
  {
    type: "legal" as const,
    label: "Legal",
    icon: Shield,
    description: "Terms acceptance field",
  },
  {
    type: "fileUpload" as const,
    label: "File Upload",
    icon: Upload,
    description: "File upload with validation",
  },

  // Form Structure
  {
    type: "pageBreak" as const,
    label: "Page Break",
    icon: Minus,
    description: "Section separator",
  },
  {
    type: "startingPage" as const,
    label: "Welcome Screen",
    icon: Play,
    description: "Form introduction page",
  },
  {
    type: "postSubmission" as const,
    label: "Thank You Page",
    icon: CheckCircle,
    description: "Form completion page",
  },
];

export default function FormBuilderSidebar({
  onAddField,
}: FormBuilderSidebarProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Field
      </h3>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {ENHANCED_FIELD_TYPES.map((fieldType) => {
          const IconComponent = fieldType.icon;

          return (
            <button
              key={fieldType.type}
              onClick={() => onAddField(fieldType.type)}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-gray-100 group-hover:bg-blue-100 flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900">
                    {fieldType.label}
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-blue-600">
                    {fieldType.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
