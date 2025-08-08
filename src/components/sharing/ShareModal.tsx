"use client";

import { useState, useEffect } from "react";
import { X, Link, QrCode, Copy, Check, ExternalLink } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  formTitle: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  formId,
  formTitle,
}: ShareModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  const formUrl = `${window.location.origin}/form/${formId}`;
  const embedCode = `<iframe src="${formUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  useEffect(() => {
    if (isOpen) {
      generateQRCode();
    }
  }, [isOpen, formId]);

  const generateQRCode = async () => {
    setIsGeneratingQR(true);
    try {
      const response = await fetch("/api/qr/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: formUrl,
          size: 256,
        }),
      });

      if (response.ok) {
        const { qrCodeDataUrl } = await response.json();
        setQrCodeUrl(qrCodeDataUrl);
      }
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const copyToClipboard = async (text: string, type: "link" | "embed") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "link") {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedEmbed(true);
        setTimeout(() => setCopiedEmbed(false), 2000);
      }
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.download = `${formTitle}-qr-code.png`;
      link.href = qrCodeUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Share Form</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Form Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-1">{formTitle}</h3>
            <p className="text-sm text-gray-600">
              Share this form with others to collect responses
            </p>
          </div>

          {/* Shareable Link */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Link className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Shareable Link
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={formUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              />
              <button
                onClick={() => copyToClipboard(formUrl, "link")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={() => window.open(formUrl, "_blank")}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <QrCode className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">QR Code</span>
            </div>

            <div className="flex gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                {isGeneratingQR ? (
                  <div className="w-32 h-32 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                    Failed to generate
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-sm text-gray-600">
                  Scan this QR code to open the form on mobile devices
                </p>
                <div className="space-y-2">
                  <button
                    onClick={downloadQRCode}
                    disabled={!qrCodeUrl}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Download QR Code
                  </button>
                  <button
                    onClick={generateQRCode}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                  >
                    Regenerate QR Code
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Embed Code */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-700">
                Embed Code
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                Coming Soon
              </span>
            </div>

            <div className="flex gap-2">
              <textarea
                value={embedCode}
                readOnly
                rows={3}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono resize-none"
              />
              <button
                onClick={() => copyToClipboard(embedCode, "embed")}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2 self-start"
              >
                {copiedEmbed ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Paste this code into your website to embed the form
            </p>
          </div>

          {/* Social Sharing (Optional) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-700">
                Share on Social Media
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const text = `Check out this form: ${formTitle}`;
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    text
                  )}&url=${encodeURIComponent(formUrl)}`;
                  window.open(url, "_blank", "width=550,height=420");
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Share on Twitter
              </button>

              <button
                onClick={() => {
                  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    formUrl
                  )}`;
                  window.open(url, "_blank", "width=550,height=420");
                }}
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors text-sm"
              >
                Share on Facebook
              </button>

              <button
                onClick={() => {
                  const text = `Check out this form: ${formTitle} - ${formUrl}`;
                  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    formUrl
                  )}`;
                  window.open(url, "_blank", "width=550,height=420");
                }}
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors text-sm"
              >
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
