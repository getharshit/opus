"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

interface ShareableLinkProps {
  url: string;
  label?: string;
  showOpenButton?: boolean;
}

export default function ShareableLink({
  url,
  label,
  showOpenButton = true,
}: ShareableLinkProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
      <div className="flex-1 min-w-0">
        {label && <p className="text-xs text-gray-600 mb-1">{label}</p>}
        <p className="text-sm font-mono text-gray-800 truncate">{url}</p>
      </div>

      <div className="flex gap-1">
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
          title="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>

        {showOpenButton && (
          <button
            onClick={() => window.open(url, "_blank")}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
            title="Open link"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
