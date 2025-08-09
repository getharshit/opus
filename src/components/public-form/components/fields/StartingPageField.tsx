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

  // Extract metadata from field configuration
  const estimatedTime = field.displayOptions?.estimatedTime || "5 minutes";
  const participantCount = field.displayOptions?.participantCount;
  const features = field.displayOptions?.features || [];
  const logoUrl = form.theme.customization.branding?.logo?.url;

  return (
    <div
      className={`starting-page-field min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ${className}`}
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
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              {form.title}
            </motion.h1>

            {form.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              >
                {form.description}
              </motion.p>
            )}

            {field.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="prose prose-lg mx-auto text-gray-700"
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
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-500">Estimated time</div>
                  <div className="font-medium text-gray-900">
                    {estimatedTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Steps Count */}
            {totalSteps > 1 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-500">Total steps</div>
                    <div className="font-medium text-gray-900">
                      {totalSteps} sections
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Participant Count */}
            {participantCount && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-500">Participants</div>
                    <div className="font-medium text-gray-900">
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
              <h3 className="text-lg font-medium text-gray-900">
                What to expect:
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200"
                  >
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
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
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: form.theme.customization.colors.primary,
              }}
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
            className="text-sm text-gray-500 max-w-md mx-auto"
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
