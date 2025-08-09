"use client";

import React from "react";
import { ExtendedFormField } from "../types";
import {
  ShortTextField,
  LongTextField,
  EmailField,
  WebsiteField,
  PhoneNumberField,
  NumberRatingField,
  MultipleChoiceField,
  DropdownField,
  YesNoField,
  OpinionScaleField,
  StatementField,
  LegalField,
  StartingPageField,
  PostSubmissionField,
} from "./fields";
import { FileFieldBase } from "./base-fields";

interface FieldRendererProps {
  field: ExtendedFormField;
  questionNumber?: number;
  showQuestionNumber?: boolean;
  onSpecialAction?: (action: string, data?: any) => void;
  className?: string;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  questionNumber,
  showQuestionNumber = false,
  onSpecialAction,
  className = "",
}) => {
  // Map field types to components
  const renderField = () => {
    switch (field.type) {
      // Text-based fields
      case "shortText":
        return (
          <ShortTextField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      case "longText":
        return (
          <LongTextField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      case "email":
        return (
          <EmailField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      case "website":
        return (
          <WebsiteField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      case "phoneNumber":
        return (
          <PhoneNumberField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      case "numberRating":
        return (
          <NumberRatingField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      // Choice-based fields
      case "multipleChoice":
        return (
          <MultipleChoiceField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      case "dropdown":
        return (
          <DropdownField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      case "yesNo":
        return (
          <YesNoField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            variant="buttons"
            className={className}
          />
        );

      case "opinionScale":
        return (
          <OpinionScaleField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      // Static/Content fields (NEW)
      case "statement":
        return (
          <StatementField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      case "legal":
        return (
          <LegalField
            field={field}
            questionNumber={questionNumber}
            showQuestionNumber={showQuestionNumber}
            className={className}
          />
        );

      // Special page fields (NEW)
      case "startingPage":
        return (
          <StartingPageField
            field={field}
            onStart={() => onSpecialAction?.("startForm")}
            className={className}
          />
        );

      case "postSubmission":
        return (
          <PostSubmissionField
            field={field}
            onAction={onSpecialAction}
            className={className}
          />
        );

      // File upload
      case "fileUpload":
        return <FileFieldBase field={field} className={className} />;

      // Page break for multi-step
      case "pageBreak":
        return (
          <div className="page-break-field py-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              Continue to next section
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
            <p className="text-red-700 text-sm">
              Unknown field type: <code>{field.type}</code>
            </p>
            <p className="text-red-600 text-xs mt-1">
              This field type is not yet implemented.
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className="field-renderer"
      data-field-type={field.type}
      data-field-id={field.id}
    >
      {renderField()}
    </div>
  );
};
