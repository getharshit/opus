"use client";

import { Check } from "lucide-react";

export type BuilderStep = "build" | "design" | "integrate" | "share";

interface Step {
  id: BuilderStep;
  name: string;
}

interface FormBuilderStepperProps {
  currentStep: BuilderStep;
  onStepChange: (step: BuilderStep) => void;
  completedSteps?: BuilderStep[];
}

const steps: Step[] = [
  {
    id: "build",
    name: "Build",
  },
  {
    id: "design",
    name: "Design",
  },
  {
    id: "integrate",
    name: "Integrate",
  },
  {
    id: "share",
    name: "Share",
  },
];

export default function FormBuilderStepper({
  currentStep,
  onStepChange,
  completedSteps = [],
}: FormBuilderStepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  const getStepStatus = (stepIndex: number, stepId: BuilderStep) => {
    if (completedSteps.includes(stepId)) return "completed";
    if (stepIndex === currentStepIndex) return "current";
    if (stepIndex < currentStepIndex) return "completed";
    return "upcoming";
  };

  const getStepClasses = (status: string) => {
    switch (status) {
      case "completed":
        return {
          container: "cursor-pointer",
          circle: "bg-green-600 text-white border-green-600",
          connector: "bg-green-600",
          text: "text-gray-900",
        };
      case "current":
        return {
          container: "cursor-pointer",
          circle: "bg-blue-600 text-white border-blue-600",
          connector: "bg-gray-300",
          text: "text-blue-600 font-medium",
        };
      case "upcoming":
        return {
          container: "cursor-pointer",
          circle: "bg-white text-gray-400 border-gray-300",
          connector: "bg-gray-300",
          text: "text-gray-500",
        };
      default:
        return {
          container: "",
          circle: "",
          connector: "",
          text: "",
        };
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-center justify-space-around">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center gap-5 ">
            {steps.map((step, stepIndex) => {
              const status = getStepStatus(stepIndex, step.id);
              const classes = getStepClasses(status);
              const isLast = stepIndex === steps.length - 1;

              return (
                <li key={step.id} className="flex-1 flex items-center">
                  <div
                    className={`flex flex-col items-center ${classes.container}`}
                    onClick={() => onStepChange(step.id)}
                  >
                    {/* Step Circle */}
                    <div className="flex items-center justify-center">
                      <div
                        className={`
                          w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium
                          transition-all duration-200 hover:scale-105
                          ${classes.circle}
                        `}
                      >
                        {status === "completed" ? (
                          <Check size={20} />
                        ) : (
                          stepIndex + 1
                        )}
                      </div>
                    </div>

                    {/* Step Labels */}
                    <div className="mt-3 text-center">
                      <div className={`text-sm font-medium ${classes.text}`}>
                        {step.name}
                      </div>
                      <div
                        className={`text-xs mt-1 max-w-24 ${classes.description}`}
                      >
                        {step.description}
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {!isLast && (
                    <div className="flex-1 mx-4 mt-5">
                      <div className={`h-0.5 ${classes.connector}`} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
