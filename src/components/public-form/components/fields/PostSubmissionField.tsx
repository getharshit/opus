"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import {
  CheckCircle,
  Download,
  Share2,
  Home,
  ExternalLink,
  Copy,
  Mail,
  MessageCircle,
  Star,
} from "lucide-react";

interface PostSubmissionFieldProps {
  field: ExtendedFormField;
  submissionData?: Record<string, any>;
  onAction?: (action: string, data?: any) => void;
  className?: string;
}

export const PostSubmissionField: React.FC<PostSubmissionFieldProps> = ({
  field,
  submissionData,
  onAction,
  className = "",
}) => {
  const { form } = useFormContext();
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti animation on mount
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleAction = (actionType: string, data?: any) => {
    onAction?.(actionType, data);
  };

  // Extract configuration from field
  const showDownload = field.displayOptions?.showDownload ?? false;
  const showShare = field.displayOptions?.showShare ?? false;
  const showFeedback = field.displayOptions?.showFeedback ?? false;
  const redirectUrl = field.displayOptions?.redirectUrl;
  const redirectDelay = field.displayOptions?.redirectDelay || 5;
  const customActions = field.displayOptions?.customActions || [];

  // Safe access to nested theme properties with fallbacks
  const logoUrl =
    form.theme?.customization?.branding?.logo?.url ||
    form.customization?.branding?.logo?.url ||
    form.theme?.logoConfig?.file?.url;

  // Auto-redirect timer
  const [redirectCountdown, setRedirectCountdown] = useState(
    redirectUrl ? redirectDelay : 0
  );

  useEffect(() => {
    if (redirectUrl && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (redirectUrl && redirectCountdown === 0) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl, redirectCountdown]);

  return (
    <div
      className={`post-submission-field min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden ${className}`}
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 800),
                y: -10,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y:
                  (typeof window !== "undefined" ? window.innerHeight : 600) +
                  10,
                rotate: 360,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-8 w-full"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="flex justify-center"
          >
            <div className="relative">
              <CheckCircle className="w-24 h-24 text-green-500" />
              <motion.div
                className="absolute inset-0 w-24 h-24 border-4 border-green-200 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Logo */}
          {logoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-center"
            >
              <img
                src={logoUrl}
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </motion.div>
          )}

          {/* Main Message */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              {field.label || "Thank You!"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {field.description ||
                "Your response has been submitted successfully. We appreciate your time and feedback."}
            </motion.p>
          </div>

          {/* Submission Summary */}
          {submissionData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 max-w-md mx-auto"
            >
              <h3 className="font-medium text-gray-900 mb-3">
                Submission Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Submitted at:</span>
                  <span className="text-gray-700">
                    {new Date().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Response ID:</span>
                  <span className="text-gray-700 font-mono text-xs">
                    {submissionData.id || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Questions answered:</span>
                  <span className="text-gray-700">
                    {Object.keys(submissionData).length - 1} questions
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* Download Response */}
            {showDownload && (
              <motion.button
                type="button"
                onClick={() => handleAction("download", submissionData)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Download Response
              </motion.button>
            )}

            {/* Share Form */}
            {showShare && (
              <motion.button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Share Form
                  </>
                )}
              </motion.button>
            )}

            {/* Custom Actions */}
            {customActions.map((action, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => handleAction(action.type, action.data)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  action.style === "primary"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {action.icon === "external" && (
                  <ExternalLink className="w-4 h-4" />
                )}
                {action.icon === "home" && <Home className="w-4 h-4" />}
                {action.icon === "mail" && <Mail className="w-4 h-4" />}
                {action.icon === "message" && (
                  <MessageCircle className="w-4 h-4" />
                )}
                {action.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Feedback Request */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto"
            >
              <h4 className="font-medium text-yellow-800 mb-2">
                Help us improve
              </h4>
              <p className="text-sm text-yellow-700 mb-3">
                How was your experience with this form?
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    type="button"
                    onClick={() => handleAction("feedback", { rating })}
                    className="p-1 text-yellow-400 hover:text-yellow-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Social Sharing */}
          {showShare && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="space-y-3"
            >
              <h4 className="text-sm font-medium text-gray-700">
                Share this form
              </h4>
              <div className="flex justify-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => handleAction("share", { platform: "twitter" })}
                  className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() =>
                    handleAction("share", { platform: "linkedin" })
                  }
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => handleAction("share", { platform: "email" })}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Auto-redirect Notice */}
          {redirectUrl && redirectCountdown > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto"
            >
              <div className="text-sm text-blue-700">
                Redirecting in {redirectCountdown} seconds...
              </div>
              <motion.button
                type="button"
                onClick={() => setRedirectCountdown(0)}
                className="mt-2 text-xs text-blue-600 hover:text-blue-700 underline"
                whileHover={{ scale: 1.02 }}
              >
                Go now
              </motion.button>
            </motion.div>
          )}

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-sm text-gray-500"
          >
            Thank you for taking the time to complete this form.
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
