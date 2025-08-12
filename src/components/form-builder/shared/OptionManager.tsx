import { Plus, X, GripVertical } from "lucide-react";

interface OptionManagerProps {
  options: string[];
  onOptionsChange: (options: string[]) => void;
  label?: string;
  placeholder?: string;
  allowReorder?: boolean;
}

export default function OptionManager({
  options,
  onOptionsChange,
  label = "Options",
  placeholder = "Enter option text",
  allowReorder = true,
}: OptionManagerProps) {
  const addOption = () => {
    const newOption = `Option ${options.length + 1}`;
    onOptionsChange([...options, newOption]);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onOptionsChange(newOptions);
  };

  const removeOption = (index: number) => {
    if (options.length <= 1) return;
    const newOptions = options.filter((_, i) => i !== index);
    onOptionsChange(newOptions);
  };

  const moveOption = (fromIndex: number, toIndex: number) => {
    const newOptions = [...options];
    const [movedOption] = newOptions.splice(fromIndex, 1);
    newOptions.splice(toIndex, 0, movedOption);
    onOptionsChange(newOptions);
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-gray-700">{label}</label>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            {allowReorder && (
              <div className="text-gray-400 hover:text-gray-600 cursor-grab">
                <GripVertical className="w-4 h-4" />
              </div>
            )}

            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:border-blue-500 outline-none"
              placeholder={placeholder}
              onClick={(e) => e.stopPropagation()}
            />

            {options.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(index);
                }}
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          addOption();
        }}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <Plus className="w-4 h-4" />
        Add option
      </button>
    </div>
  );
}
