import { Plus, Type, List, ChevronDown, Star, Calendar } from "lucide-react";
import { FormField } from "@/types/form";

interface FormBuilderSidebarProps {
  onAddField: (type: FormField["type"]) => void;
}

const FIELD_TYPES = [
  {
    type: "text" as const,
    label: "Short Answer",
    icon: Type,
    description: "Single line text input",
  },
  {
    type: "multipleChoice" as const,
    label: "Multiple Choice",
    icon: List,
    description: "Radio button options",
  },
  {
    type: "dropdown" as const,
    label: "Dropdown",
    icon: ChevronDown,
    description: "Select from dropdown",
  },
  {
    type: "rating" as const,
    label: "Rating Scale",
    icon: Star,
    description: "1-5 star rating",
  },
  {
    type: "date" as const,
    label: "Date",
    icon: Calendar,
    description: "Date picker input",
  },
];

export default function FormBuilderSidebar({
  onAddField,
}: FormBuilderSidebarProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Question
      </h3>

      <div className="space-y-2">
        {FIELD_TYPES.map((fieldType) => {
          const IconComponent = fieldType.icon;

          return (
            <button
              key={fieldType.type}
              onClick={() => onAddField(fieldType.type)}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-gray-100 group-hover:bg-blue-100">
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
