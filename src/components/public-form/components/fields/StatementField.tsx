"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExtendedFormField } from "../../types";
import { QuestionContainer } from "./QuestionContainer";
import { Eye, EyeOff, Image, ExternalLink } from "lucide-react";

interface StatementFieldProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  className?: string;
}

export const StatementField: React.FC<StatementFieldProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  // Check if content is lengthy (more than 300 characters)
  const isLongContent = (field.description?.length || 0) > 300;
  const hasImage = field.displayOptions?.imageUrl;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError("Failed to load image");
  };

  const renderRichContent = (content: string) => {
    // Basic rich text rendering - in production, you might want to use a library like DOMPurify
    return (
      <div
        className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <QuestionContainer
      field={field}
      questionNumber={questionNumber}
      showQuestionNumber={showQuestionNumber}
      className={className}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="statement-field"
      >
        {/* Statement Card */}
        <div
          className={`
          bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 
          rounded-xl p-6 shadow-sm
          ${
            field.displayOptions?.variant === "highlighted"
              ? "bg-yellow-50 border-yellow-200"
              : ""
          }
          ${
            field.displayOptions?.variant === "info"
              ? "bg-blue-50 border-blue-200"
              : ""
          }
          ${
            field.displayOptions?.variant === "warning"
              ? "bg-orange-50 border-orange-200"
              : ""
          }
        `}
        >
          {/* Image Display */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-6"
            >
              {imageLoading && (
                <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
              )}

              {!imageError ? (
                <img
                  src={field.displayOptions?.imageUrl}
                  alt={field.displayOptions?.imageAlt || ""}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={`
                    w-full max-h-64 object-cover rounded-lg shadow-md
                    ${imageLoading ? "hidden" : "block"}
                  `}
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Image className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">{imageError}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Content */}
          <div className="statement-content">
            {field.description && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {isLongContent ? (
                  <div className="space-y-4">
                    {/* Collapsible Content */}
                    <motion.div
                      animate={{ height: isExpanded ? "auto" : "120px" }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden relative"
                    >
                      {renderRichContent(field.description)}

                      {/* Fade overlay when collapsed */}
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-50 to-transparent" />
                      )}
                    </motion.div>

                    {/* Expand/Collapse Button */}
                    <motion.button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isExpanded ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Read More
                        </>
                      )}
                    </motion.button>
                  </div>
                ) : (
                  renderRichContent(field.description)
                )}
              </motion.div>
            )}

            {/* Call-to-Action Links */}
            {field.displayOptions?.links &&
              field.displayOptions.links.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="mt-4 flex flex-wrap gap-3"
                >
                  {field.displayOptions.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target={link.external ? "_blank" : "_self"}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      {link.text}
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  ))}
                </motion.div>
              )}
          </div>
        </div>
      </motion.div>
    </QuestionContainer>
  );
};
