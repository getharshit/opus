// __tests__/integration/form-flow.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PublicFormRenderer } from "@/components/public-form";
import { testForms } from "@/app/test-forms/test-data";

describe("Form Flow Integration Tests", () => {
  const mockOnSubmit = jest.fn();
  const mockOnFieldChange = jest.fn();
  const mockOnStepChange = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnFieldChange.mockClear();
    mockOnStepChange.mockClear();
  });

  describe("Single Column Form Complete Flow", () => {
    it("completes entire single column form flow", async () => {
      const user = userEvent.setup();

      render(
        <PublicFormRenderer
          form={testForms["single-column"]}
          onSubmit={mockOnSubmit}
          onFieldChange={mockOnFieldChange}
          onStepChange={mockOnStepChange}
        />
      );

      // Step 1: Fill name field
      const nameInput = screen.getByPlaceholderText("John Doe");
      await user.type(nameInput, "Test User");
      await user.click(screen.getByText("Next"));

      // Step 2: Fill email field
      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("john@example.com")
        ).toBeInTheDocument();
      });

      const emailInput = screen.getByPlaceholderText("john@example.com");
      await user.type(emailInput, "test@example.com");
      await user.click(screen.getByText("Next"));

      // Step 3: Skip phone (optional)
      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("(555) 123-4567")
        ).toBeInTheDocument();
      });
      await user.click(screen.getByText("Next"));

      // Step 4: Skip website (optional)
      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("https://example.com")
        ).toBeInTheDocument();
      });
      await user.click(screen.getByText("Next"));

      // Step 5: Select multiple choice
      await waitFor(() => {
        expect(
          screen.getByText("What is your preferred contact method?")
        ).toBeInTheDocument();
      });
      await user.click(screen.getByLabelText("Email"));
      await user.click(screen.getByText("Next"));

      // Step 6: Select dropdown
      await waitFor(() => {
        expect(screen.getByText("What is your country?")).toBeInTheDocument();
      });
      const dropdown = screen.getByRole("button");
      await user.click(dropdown);
      await user.click(screen.getByText("United States"));
      await user.click(screen.getByText("Next"));

      // Step 7: Answer yes/no
      await waitFor(() => {
        expect(
          screen.getByText("Would you like to receive updates?")
        ).toBeInTheDocument();
      });
      await user.click(screen.getByText("Yes"));
      await user.click(screen.getByText("Next"));

      // Step 8: Rate service
      await waitFor(() => {
        expect(
          screen.getByText("How would you rate our service?")
        ).toBeInTheDocument();
      });
      const ratingButton = screen.getByLabelText(
        "Rating 5 out of 5 - Excellent"
      );
      await user.click(ratingButton);
      await user.click(screen.getByText("Next"));

      // Step 9: Opinion scale
      await waitFor(() => {
        expect(
          screen.getByText("How likely are you to recommend us?")
        ).toBeInTheDocument();
      });
      const scaleButton = screen.getByLabelText(
        "Rating 10 out of 10 - Strongly Agree"
      );
      await user.click(scaleButton);
      await user.click(screen.getByText("Next"));

      // Step 10: Optional long text
      await waitFor(() => {
        expect(
          screen.getByText("Any additional comments?")
        ).toBeInTheDocument();
      });
      await user.click(screen.getByText("Next"));

      // Step 11: Accept legal terms
      await waitFor(() => {
        expect(
          screen.getByText("I agree to the Terms and Conditions")
        ).toBeInTheDocument();
      });
      const legalCheckbox = screen.getByRole("checkbox");
      await user.click(legalCheckbox);
      await user.click(screen.getByText("Submit"));

      // Verify form submission
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          "short-text": "Test User",
          email: "test@example.com",
          "multiple-choice": "Email",
          dropdown: "United States",
          "yes-no": "yes",
          rating: 5,
          "opinion-scale": 10,
          legal: true,
        });
      });
    });

    it("validates required fields and shows errors", async () => {
      const user = userEvent.setup();

      render(
        <PublicFormRenderer
          form={testForms["single-column"]}
          onSubmit={mockOnSubmit}
        />
      );

      // Try to advance without filling required name field
      await user.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByText(/required/i)).toBeInTheDocument();
      });

      // Fill name and try email validation
      const nameInput = screen.getByPlaceholderText("John Doe");
      await user.type(nameInput, "Test User");
      await user.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("john@example.com")
        ).toBeInTheDocument();
      });

      // Enter invalid email
      const emailInput = screen.getByPlaceholderText("john@example.com");
      await user.type(emailInput, "invalid-email");
      await user.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument();
      });
    });
  });

  describe("Multi-Step Form Complete Flow", () => {
    it("completes multi-step form with step navigation", async () => {
      const user = userEvent.setup();

      render(
        <PublicFormRenderer
          form={testForms["multi-step"]}
          onSubmit={mockOnSubmit}
          onStepChange={mockOnStepChange}
        />
      );

      // Verify initial step
      expect(screen.getByText("Personal Information")).toBeInTheDocument();
      expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();

      // Fill Step 1: Personal Information
      const nameInput = screen.getByPlaceholderText("Enter your full name");
      await user.type(nameInput, "Test User");

      const emailInput = screen.getByPlaceholderText("your@email.com");
      await user.type(emailInput, "test@example.com");

      const roleDropdown = screen.getByText("Select an option...");
      await user.click(roleDropdown);
      await user.click(screen.getByText("Developer"));

      await user.click(screen.getByText("Continue"));

      // Verify step change callback
      await waitFor(() => {
        expect(mockOnStepChange).toHaveBeenCalledWith(1);
      });

      // Step 2: Your Experience
      await waitFor(() => {
        expect(screen.getByText("Your Experience")).toBeInTheDocument();
        expect(screen.getByText("Step 2 of 3")).toBeInTheDocument();
      });

      // Fill satisfaction scale
      const satisfactionButton = screen.getByLabelText(
        "Rating 8 out of 10 - Agree"
      );
      await user.click(satisfactionButton);

      // Fill ease of use rating
      const easeButton = screen.getByLabelText("Rating 4 out of 5 - Very Good");
      await user.click(easeButton);

      // Answer recommendation
      await user.click(screen.getByText("Yes"));

      await user.click(screen.getByText("Continue"));

      // Step 3: Detailed Feedback
      await waitFor(() => {
        expect(screen.getByText("Detailed Feedback")).toBeInTheDocument();
        expect(screen.getByText("Step 3 of 3")).toBeInTheDocument();
      });

      // Fill feedback (optional)
      const feedbackTextarea = screen.getByPlaceholderText(
        "Share your suggestions..."
      );
      await user.type(feedbackTextarea, "Great product overall!");

      // Select most used feature
      await user.click(screen.getByLabelText("Form Builder"));

      // Submit form
      await user.click(screen.getByText("Complete Form"));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: "Test User",
          email: "test@example.com",
          role: "Developer",
          satisfaction: 8,
          "ease-of-use": 4,
          recommend: "yes",
          improvements: "Great product overall!",
          features: "Form Builder",
        });
      });
    });

    it("allows navigation back to previous steps", async () => {
      const user = userEvent.setup();

      render(
        <PublicFormRenderer
          form={testForms["multi-step"]}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill and complete first step
      await user.type(
        screen.getByPlaceholderText("Enter your full name"),
        "Test User"
      );
      await user.type(
        screen.getByPlaceholderText("your@email.com"),
        "test@example.com"
      );

      const roleDropdown = screen.getByText("Select an option...");
      await user.click(roleDropdown);
      await user.click(screen.getByText("Developer"));

      await user.click(screen.getByText("Continue"));

      // Now on step 2, go back to step 1
      await waitFor(() => {
        expect(screen.getByText("Previous")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Previous"));

      // Verify we're back on step 1
      await waitFor(() => {
        expect(screen.getByText("Personal Information")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
      });
    });

    it("validates steps before allowing navigation", async () => {
      const user = userEvent.setup();

      render(
        <PublicFormRenderer
          form={testForms["multi-step"]}
          onSubmit={mockOnSubmit}
        />
      );

      // Try to advance without filling required fields
      await user.click(screen.getByText("Continue"));

      await waitFor(() => {
        expect(
          screen.getByText("Please fix the following errors:")
        ).toBeInTheDocument();
      });

      // Should still be on step 1
      expect(screen.getByText("Personal Information")).toBeInTheDocument();
      expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
    });
  });

  describe("Validation Test Form", () => {
    it("tests all validation scenarios", async () => {
      const user = userEvent.setup();

      render(
        <PublicFormRenderer
          form={testForms["validation"]}
          onSubmit={mockOnSubmit}
        />
      );

      // Test required field validation
      await user.click(screen.getByText("Next"));
      await waitFor(() => {
        expect(screen.getByText(/required/i)).toBeInTheDocument();
      });

      // Fill required field and advance
      await user.type(
        screen.getByPlaceholderText("This field is required"),
        "Test"
      );
      await user.click(screen.getByText("Next"));

      // Test pattern validation
      await waitFor(() => {
        expect(
          screen.getByText("Text with Pattern (letters only)")
        ).toBeInTheDocument();
      });

      await user.type(screen.getByRole("textbox"), "123");
      await user.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(
          screen.getByText("Only letters and spaces are allowed")
        ).toBeInTheDocument();
      });

      // Fix pattern validation
      await user.clear(screen.getByRole("textbox"));
      await user.type(screen.getByRole("textbox"), "Valid Text");
      await user.click(screen.getByText("Next"));

      // Test length validation
      await waitFor(() => {
        expect(
          screen.getByText("Text with Length Limits (5-20 chars)")
        ).toBeInTheDocument();
      });

      await user.type(screen.getByRole("textbox"), "Hi");
      await user.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByText(/Minimum 5 characters/i)).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("supports keyboard navigation", async () => {
      render(
        <PublicFormRenderer
          form={testForms["single-column"]}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByPlaceholderText("John Doe");
      nameInput.focus();

      // Test Tab navigation
      fireEvent.keyDown(nameInput, { key: "Tab" });
      expect(screen.getByText("Next")).toHaveFocus();

      // Test Enter key for form advancement
      await user.type(nameInput, "Test User");
      fireEvent.keyDown(document, { key: "Enter" });

      // Should advance to next question
      await waitFor(() => {
        expect(
          screen.getByText("What is your email address?")
        ).toBeInTheDocument();
      });
    });

    it("has proper ARIA labels and roles", () => {
      render(
        <PublicFormRenderer
          form={testForms["single-column"]}
          onSubmit={mockOnSubmit}
        />
      );

      // Check for proper form structure
      expect(screen.getByRole("form")).toBeInTheDocument();

      // Check for labeled inputs
      const nameInput = screen.getByLabelText(/What is your full name/);
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).toHaveAttribute("aria-required", "true");

      // Check for error message association
      fireEvent.blur(nameInput);
      waitFor(() => {
        const errorElement = screen.getByRole("alert");
        expect(errorElement).toBeInTheDocument();
      });
    });
  });

  describe("Performance", () => {
    it("renders large forms efficiently", () => {
      const startTime = performance.now();

      render(
        <PublicFormRenderer
          form={testForms["single-column"]}
          onSubmit={mockOnSubmit}
        />
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);
    });

    it("handles rapid user input without lag", async () => {
      const user = userEvent.setup({ delay: null }); // No delay for rapid input

      render(
        <PublicFormRenderer
          form={testForms["single-column"]}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByPlaceholderText("John Doe");

      const startTime = performance.now();
      await user.type(
        nameInput,
        "This is a very long name with many characters"
      );
      const endTime = performance.now();

      // Should handle input without significant delay
      expect(endTime - startTime).toBeLessThan(200);
    });
  });
});
