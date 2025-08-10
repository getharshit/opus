"use client";

import React, { useState } from "react";
import {
  AnimationProvider,
  AnimationIntensityControl,
  AnimationIntensityDemo,
  CompactAnimationControl,
  VerticalAnimationControl,
} from "@/components/public-form/animation";
import {
  AnimatedButton,
  AnimatedFieldContainer,
  AnimatedErrorMessage,
  AnimatedProgressIndicator,
  AnimatedStepTransition,
} from "@/components/public-form/animation/components";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Play,
  Pause,
  RotateCcw,
  Zap,
  AlertCircle,
  CheckCircle,
  Settings,
  Eye,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function AnimationTestPage() {
  // Test state
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(45);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepDirection, setStepDirection] = useState<"forward" | "backward">(
    "forward"
  );
  const [fieldVisible, setFieldVisible] = useState(true);

  // Demo form fields
  const demoFields = [
    { id: "name", label: "Full Name", type: "text" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "message", label: "Your Message", type: "textarea" },
  ];

  const handleStepChange = (direction: "forward" | "backward") => {
    setStepDirection(direction);
    if (direction === "forward" && currentStep < demoFields.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (direction === "backward" && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const triggerError = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const animateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const toggleFieldVisibility = () => {
    setFieldVisible(!fieldVisible);
  };

  return (
    <AnimationProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Animation System Test Page
            </h1>
            <p className="text-gray-600">
              Test all animation components and intensity levels in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Animation Controls */}
            <div className="space-y-6">
              {/* Primary Intensity Control */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Animation Intensity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimationIntensityControl showLabels={true} size="md" />
                </CardContent>
              </Card>

              {/* Compact Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Compact Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <CompactAnimationControl />
                </CardContent>
              </Card>

              {/* Vertical Control */}
              <Card>
                <CardHeader>
                  <CardTitle>Vertical Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <VerticalAnimationControl />
                </CardContent>
              </Card>

              {/* Live Demo */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimationIntensityDemo />
                </CardContent>
              </Card>
            </div>

            {/* Middle Column - Component Tests */}
            <div className="space-y-6">
              {/* Button Tests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Button Animations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <AnimatedButton
                      variant="primary"
                      onClick={() => console.log("Primary clicked")}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Primary Button
                    </AnimatedButton>

                    <AnimatedButton
                      variant="secondary"
                      onClick={() => console.log("Secondary clicked")}
                      className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
                    >
                      Secondary
                    </AnimatedButton>

                    <AnimatedButton
                      variant="default"
                      disabled
                      className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed"
                    >
                      Disabled
                    </AnimatedButton>

                    <AnimatedButton
                      variant="primary"
                      onClick={triggerSuccess}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Success Test
                    </AnimatedButton>
                  </div>
                </CardContent>
              </Card>

              {/* Error/Success Messages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={triggerError}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Trigger Error
                    </button>
                    <button
                      onClick={triggerSuccess}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Trigger Success
                    </button>
                  </div>

                  <AnimatedErrorMessage isVisible={showError}>
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                      <AlertCircle className="w-4 h-4" />
                      <span>
                        This is an error message with shake animation!
                      </span>
                    </div>
                  </AnimatedErrorMessage>

                  <AnimatedErrorMessage isVisible={showSuccess}>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md border border-green-200">
                      <CheckCircle className="w-4 h-4" />
                      <span>Success! This message has smooth animations.</span>
                    </div>
                  </AnimatedErrorMessage>
                </CardContent>
              </Card>

              {/* Field Container Tests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Field Animations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <button
                    onClick={toggleFieldVisibility}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Toggle Field Visibility
                  </button>

                  <AnimatedFieldContainer
                    fieldId="demo-field"
                    isVisible={fieldVisible}
                    animationPreset="slideUp"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Demo Input Field
                      </label>
                      <input
                        type="text"
                        placeholder="Type something..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500">
                        This field animates in and out based on visibility
                      </p>
                    </div>
                  </AnimatedFieldContainer>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Progress & Steps */}
            <div className="space-y-6">
              {/* Progress Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RotateCcw className="w-5 h-5" />
                    Progress Animations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <button
                    onClick={animateProgress}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Animate Progress
                  </button>

                  {/* Bar Progress */}
                  <div>
                    <h4 className="font-medium mb-2">Progress Bar</h4>
                    <AnimatedProgressIndicator
                      progress={progress}
                      type="bar"
                      showPercentage={true}
                    />
                  </div>

                  {/* Circle Progress */}
                  <div>
                    <h4 className="font-medium mb-2">Circle Progress</h4>
                    <AnimatedProgressIndicator
                      progress={progress}
                      type="circle"
                    />
                  </div>

                  {/* Steps Progress */}
                  <div>
                    <h4 className="font-medium mb-2">Steps Progress</h4>
                    <AnimatedProgressIndicator
                      progress={progress}
                      type="steps"
                      steps={5}
                      currentStep={Math.floor(progress / 20)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Step Transitions */}
              <Card>
                <CardHeader>
                  <CardTitle>Step Transitions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStepChange("backward")}
                      disabled={currentStep === 0}
                      className="flex items-center gap-1 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Back
                    </button>
                    <button
                      onClick={() => handleStepChange("forward")}
                      disabled={currentStep === demoFields.length - 1}
                      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="border rounded-lg p-4 bg-white min-h-[120px]">
                    <AnimatedStepTransition
                      currentStep={currentStep}
                      direction={stepDirection}
                    >
                      <div className="space-y-3">
                        <h3 className="font-medium text-lg">
                          Step {currentStep + 1}:{" "}
                          {demoFields[currentStep].label}
                        </h3>
                        <input
                          type={demoFields[currentStep].type}
                          placeholder={`Enter your ${demoFields[
                            currentStep
                          ].label.toLowerCase()}`}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-600">
                          Use the buttons above to see step transition
                          animations
                        </p>
                      </div>
                    </AnimatedStepTransition>
                  </div>
                </CardContent>
              </Card>

              {/* Test Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Test Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p>
                      <strong>1.</strong> Change animation intensity using the
                      controls
                    </p>
                    <p>
                      <strong>2.</strong> Test buttons by hovering and clicking
                    </p>
                    <p>
                      <strong>3.</strong> Trigger error/success messages
                    </p>
                    <p>
                      <strong>4.</strong> Toggle field visibility
                    </p>
                    <p>
                      <strong>5.</strong> Animate progress bars
                    </p>
                    <p>
                      <strong>6.</strong> Navigate between steps
                    </p>
                    <p>
                      <strong>7.</strong> Check browser dev tools for
                      performance
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AnimationProvider>
  );
}
