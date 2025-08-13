"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { useFormContext } from "../../providers/FormProvider";
import { Play, Clock, Users, Shield, ArrowRight } from "lucide-react";

interface StartingPageFieldProps {
  field: ExtendedFormField;
  onStart?: () => void;
  className?: string;
}

export const StartingPageField: React.FC<StartingPageFieldProps> = ({
  field,
  onStart,
  className = "",
}) => {
  const { form, totalSteps } = useFormContext();

  const handleStart = () => {
    onStart?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleStart();
    }
  };

  // Extract metadata from field configuration with safe access
  const estimatedTime = field.displayOptions?.estimatedTime || "5 minutes";
  const participantCount = field.displayOptions?.participantCount;
  const features = field.displayOptions?.features || [];

  // Safe access to nested theme properties with fallbacks
  const logoUrl =
    (form.theme as any)?.logoUrl ||
    (form.customization as any)?.branding?.logo?.url ||
    null;

  // Safe access to primary color with fallback
  const primaryColor =
    (form.customization as any)?.colors?.primary ||
    (form.theme as any)?.primaryColor ||
    "#3B82F6"; // Default blue color

  return (
    <div
      className={`starting-page-field min-h-screen ${className}`}
      style={{
        background: `linear-gradient(135deg, var(--form-color-primary-background, #EFF6FF) 0%, var(--form-background-color, #FFFFFF) 50%, var(--form-color-primary-light, #DBEAFE) 100%)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          {/* Logo */}
          {logoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex justify-center"
            >
              <img
                src={logoUrl}
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
            </motion.div>
          )}

          {/* Main Content */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--form-text-color, #1F2937)" }}
            >
              {form.title}
            </motion.h1>

            {form.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl max-w-2xl mx-auto leading-relaxed"
                style={{ color: "var(--form-text-secondary, #6B7280)" }}
              >
                {form.description}
              </motion.p>
            )}

            {field.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="prose prose-lg mx-auto"
                style={{ color: "var(--form-text-color, #374151)" }}
                dangerouslySetInnerHTML={{ __html: field.description }}
              />
            )}
          </div>

          {/* Form Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {/* Time Estimate */}
            <div
              className="backdrop-blur-sm rounded-lg p-4 border"
              style={{
                backgroundColor:
                  "var(--form-background-color, rgba(255, 255, 255, 0.8))",
                borderColor: "var(--form-border-color, #E5E7EB)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor:
                      "var(--form-color-primary-background, #EFF6FF)",
                  }}
                >
                  <Clock
                    className="w-5 h-5"
                    style={{ color: "var(--form-color-primary, #3B82F6)" }}
                  />
                </div>
                <div className="text-left">
                  <div
                    className="text-sm"
                    style={{ color: "var(--form-text-secondary, #6B7280)" }}
                  >
                    Estimated time
                  </div>
                  <div
                    className="font-medium"
                    style={{ color: "var(--form-text-color, #1F2937)" }}
                  >
                    {estimatedTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Steps Count */}
            {totalSteps > 1 && (
              <div
                className="backdrop-blur-sm rounded-lg p-4 border"
                style={{
                  backgroundColor:
                    "var(--form-background-color, rgba(255, 255, 255, 0.8))",
                  borderColor: "var(--form-border-color, #E5E7EB)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor:
                        "var(--form-color-success-background, #F0FDF4)",
                    }}
                  >
                    <Play
                      className="w-5 h-5"
                      style={{ color: "var(--form-color-success, #10B981)" }}
                    />
                  </div>
                  <div className="text-left">
                    <div
                      className="text-sm"
                      style={{ color: "var(--form-text-secondary, #6B7280)" }}
                    >
                      Total steps
                    </div>
                    <div
                      className="font-medium"
                      style={{ color: "var(--form-text-color, #1F2937)" }}
                    >
                      {totalSteps} sections
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Participant Count */}
            {participantCount && (
              <div
                className="backdrop-blur-sm rounded-lg p-4 border"
                style={{
                  backgroundColor:
                    "var(--form-background-color, rgba(255, 255, 255, 0.8))",
                  borderColor: "var(--form-border-color, #E5E7EB)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor:
                        "var(--form-color-secondary-background, #F3F4F6)",
                    }}
                  >
                    <Users
                      className="w-5 h-5"
                      style={{ color: "var(--form-color-secondary, #6B7280)" }}
                    />
                  </div>
                  <div className="text-left">
                    <div
                      className="text-sm"
                      style={{ color: "var(--form-text-secondary, #6B7280)" }}
                    >
                      Participants
                    </div>
                    <div
                      className="font-medium"
                      style={{ color: "var(--form-text-color, #1F2937)" }}
                    >
                      {participantCount}+ responses
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Features List */}
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-3"
            >
              <h3
                className="text-lg font-medium"
                style={{ color: "var(--form-text-color, #1F2937)" }}
              >
                What to expect:
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 border"
                    style={{
                      backgroundColor:
                        "var(--form-background-color, rgba(255, 255, 255, 0.8))",
                      borderColor: "var(--form-border-color, #E5E7EB)",
                    }}
                  >
                    <Shield
                      className="w-4 h-4"
                      style={{ color: "var(--form-color-success, #10B981)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--form-text-color, #374151)" }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="pt-4"
          >
            <motion.button
              type="button"
              onClick={handleStart}
              onKeyDown={handleKeyDown}
              className="group relative inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={
                {
                  backgroundColor:
                    primaryColor || "var(--form-color-primary, #3B82F6)",
                  color: "var(--form-background-color, #FFFFFF)",
                  "--tw-ring-color":
                    primaryColor || "var(--form-color-primary, #3B82F6)",
                } as React.CSSProperties
              }
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              <span>Start {form.title}</span>
              <motion.div
                className="flex items-center"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-sm max-w-md mx-auto"
            style={{ color: "var(--form-text-secondary, #6B7280)" }}
          >
            <div className="flex items-center justify-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Your responses are secure and confidential</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
