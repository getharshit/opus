import { useState } from "react";

interface FieldSettingsTabsProps {
  children: {
    basic?: React.ReactNode;
    validation?: React.ReactNode;
    display?: React.ReactNode;
  };
}

export default function FieldSettingsTabs({
  children,
}: FieldSettingsTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "basic" | "validation" | "display"
  >("basic");

  const tabs = [
    { id: "basic", label: "Basic", content: children.basic },
    { id: "validation", label: "Validation", content: children.validation },
    { id: "display", label: "Display", content: children.display },
  ].filter((tab) => tab.content);

  if (tabs.length === 0) return null;

  return (
    <div className="border-t border-gray-100 bg-gray-50">
      {/* Tab Navigation */}
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(tab.id as any);
              }}
              className={`text-sm px-3 py-1 rounded transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-3">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
