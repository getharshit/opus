import { Sparkles } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <div className="text-center">
        <div className="animate-pulse">
          <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          AI is creating your form...
        </h3>
        <p className="text-gray-600 text-sm">
          This may take a few seconds while we analyze your prompt and generate
          the perfect form.
        </p>

        {/* Loading skeleton */}
        <div className="mt-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
