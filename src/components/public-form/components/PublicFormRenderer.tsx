"use client";

import React from "react";
import { PublicFormRendererProps, ProgressConfig } from "../types";
import { FormProvider } from "../providers/FormProvider";
import { AnimationProvider, useAnimationFromCustomization } from "../animation";
import { FormQuestion } from "./FormQuestion";
import { FormNavigation } from "./FormNavigation";
import { SingleColumnLayout, MultiStepLayout } from "../layouts";
import { useFormContext } from "../providers/FormProvider";

// Internal component that has access to FormContext
const FormContent: React.FC = () => {
  const {
    form,
    currentStep,
    totalSteps,
    currentStepFields,
    formState,
    nextStep,
    previousStep,
    submitForm,
  } = useFormContext();

  // Initialize animation system with form customization
  useAnimationFromCustomization(form.customization);

  const isMultiStep = totalSteps > 1;

  // For single-column layout, we don't need manual navigation controls
  // The layout handles everything internally
  return (
    <>
      {isMultiStep ? (
        <MultiStepLayout
          form={form}
          state={formState}
          progressConfig={{
            type:
              form.layout.options.multiStep?.progressBarStyle === "dots"
                ? "circle"
                : form.layout.options.multiStep?.progressBarStyle === "numbers"
                ? "steps"
                : "bar",
            position: "top",
            showPercentage: true,
            showStepLabels:
              form.layout.options.multiStep?.showStepTitles || false,
            animated: true,
          }}
        >
          <div className="form-questions-container space-y-8">
            {currentStepFields.map((field, index) => {
              const questionNumber =
                form.fields.findIndex((f) => f.id === field.id) + 1;
              return (
                <FormQuestion
                  key={field.id}
                  field={field}
                  questionNumber={questionNumber}
                  showQuestionNumber={true}
                  showValidation={true}
                  className="mb-8"
                />
              );
            })}
          </div>

          <FormNavigation
            config={{
              showBackButton: currentStep > 0,
              showNextButton: currentStep < totalSteps - 1,
              showSubmitButton: currentStep === totalSteps - 1,
              showProgressIndicator: true,
              showQuestionCounter: true,
              buttonLabels: {
                back: "Back",
                next: "Next",
                submit: "Submit",
                continue: "Continue",
              },
              keyboardNavigation: true,
            }}
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
            canGoBack={currentStep > 0}
            canGoNext={!formState.isSubmitting}
            onBack={previousStep}
            onNext={nextStep}
            onSubmit={submitForm}
            isSubmitting={formState.isSubmitting}
          />
        </MultiStepLayout>
      ) : (
        <SingleColumnLayout form={form} state={formState} />
      )}
    </>
  );
};

// Main component that provides form and animation context
export const PublicFormRenderer: React.FC<PublicFormRendererProps> = (
  props
) => {
  return (
    <AnimationProvider>
      <FormProvider {...props}>
        <FormContent />
      </FormProvider>
    </AnimationProvider>
  );
};
