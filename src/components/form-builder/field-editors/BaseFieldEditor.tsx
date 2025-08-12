import { FormField } from "@/types/form";
import FieldSettingsTabs from "../shared/FieldSettingsTabs";
import ValidationEditor from "../shared/ValidationEditor";
import DisplayOptionsEditor from "../shared/DisplayOptionsEditor";

interface BaseFieldEditorProps {
  field: FormField;
  onUpdate: (property: string, value: any) => void;
  preview: React.ReactNode;
  basicSettings?: React.ReactNode;
  showValidation?: boolean;
  showDisplay?: boolean;
}

export default function BaseFieldEditor({
  field,
  onUpdate,
  preview,
  basicSettings,
  showValidation = true,
  showDisplay = true,
}: BaseFieldEditorProps) {
  return (
    <div>
      {/* Field Preview */}
      <div className="mb-4">{preview}</div>

      {/* Settings Tabs */}
      <FieldSettingsTabs>
        {{
          basic: basicSettings,
          validation: showValidation ? (
            <ValidationEditor field={field} onUpdate={onUpdate} />
          ) : undefined,
          display: showDisplay ? (
            <DisplayOptionsEditor field={field} onUpdate={onUpdate} />
          ) : undefined,
        }}
      </FieldSettingsTabs>
    </div>
  );
}
