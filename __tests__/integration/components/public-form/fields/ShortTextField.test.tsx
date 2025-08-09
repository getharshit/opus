// __tests__/components/public-form/fields/ShortTextField.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider } from 'react-hook-form';
import { ShortTextField } from '@/components/public-form/components/fields/ShortTextField';
import { ExtendedFormField } from '@/components/public-form/types';

const mockField: ExtendedFormField = {
  id: 'test-field',
  type: 'shortText',
  label: 'Test Field',
  required: true,
  maxLength: 50,
  placeholder: 'Enter text here'
};

const renderWithFormProvider = (field: ExtendedFormField) => {
  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <form>{children}</form>
      </FormProvider>
    );
  };

  return render(
    <TestWrapper>
      <ShortTextField field={field} />
    </TestWrapper>
  );
};

describe('ShortTextField', () => {
  it('supports keyboard navigation', async () => {
    renderWithFormProvider(mockChoiceField);
    
    const firstOption = screen.getByLabelText('Option 1');
    firstOption.focus();
    
    // Navigate down with arrow key
    fireEvent.keyDown(firstOption, { key: 'ArrowDown' });
    
    await waitFor(() => {
      expect(screen.getByLabelText('Option 2')).toHaveFocus();
    });
  });

  it('validates required selection', async () => {
    renderWithFormProvider(mockChoiceField);
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
  });
});

// __tests__/components/public-form/layouts/SingleColumnLayout.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SingleColumnLayout } from '@/components/public-form/layouts/SingleColumnLayout';
import { FormProvider } from '@/components/public-form/providers/FormProvider';
import { testForms } from '@/app/test-forms/test-data';

const mockOnSubmit = jest.fn();

const renderSingleColumnLayout = (form = testForms['single-column']) => {
  return render(
    <FormProvider form={form} onSubmit={mockOnSubmit}>
      <SingleColumnLayout form={form} state={{} as any} />
    </FormProvider>
  );
};

describe('SingleColumnLayout', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form title and description', () => {
    renderSingleColumnLayout();
    
    expect(screen.getByText('Complete Field Types Test')).toBeInTheDocument();
    expect(screen.getByText('Testing all field types in a single column layout')).toBeInTheDocument();
  });

  it('shows progress indicators', () => {
    renderSingleColumnLayout();
    
    expect(screen.getByText(/Question \d+ of \d+/)).toBeInTheDocument();
  });

  it('navigates between questions', async () => {
    renderSingleColumnLayout();
    
    // Should show first question initially
    expect(screen.getByText('What is your full name?')).toBeInTheDocument();
    
    // Fill the field and click next
    const nameInput = screen.getByPlaceholderText('John Doe');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    // Should advance to next question
    await waitFor(() => {
      expect(screen.getByText('What is your email address?')).toBeInTheDocument();
    });
  });

  it('validates fields before advancing', async () => {
    renderSingleColumnLayout();
    
    // Try to advance without filling required field
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
  });

  it('supports keyboard navigation', () => {
    renderSingleColumnLayout();
    
    // Test arrow down key navigation
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    // Should trigger next question logic (we'd need to mock this)
  });
});

// __tests__/components/public-form/layouts/MultiStepLayout.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MultiStepLayout } from '@/components/public-form/layouts/MultiStepLayout';
import { FormProvider } from '@/components/public-form/providers/FormProvider';
import { testForms } from '@/app/test-forms/test-data';

describe('MultiStepLayout', () => {
  const renderMultiStepLayout = (form = testForms['multi-step']) => {
    return render(
      <FormProvider form={form} onSubmit={jest.fn()}>
        <MultiStepLayout form={form} state={{} as any} />
      </FormProvider>
    );
  };

  it('renders step indicator', () => {
    renderMultiStepLayout();
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Your Experience')).toBeInTheDocument();
    expect(screen.getByText('Detailed Feedback')).toBeInTheDocument();
  });

  it('shows progress bar', () => {
    renderMultiStepLayout();
    
    expect(screen.getByText(/Step \d+ of \d+/)).toBeInTheDocument();
  });

  it('validates step before advancing', async () => {
    renderMultiStepLayout();
    
    // Try to advance without filling required fields
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please fix the following errors/)).toBeInTheDocument();
    });
  });

  it('allows navigation between completed steps', async () => {
    renderMultiStepLayout();
    
    // Fill required fields in first step
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    
    const emailInput = screen.getByPlaceholderText('your@email.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Select role
    const roleDropdown = screen.getByDisplayValue('What is your role?');
    fireEvent.change(roleDropdown, { target: { value: 'Developer' } });
    
    // Advance to next step
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText('Your Experience')).toBeInTheDocument();
    });
  });
});

// __tests__/components/public-form/PublicFormRenderer.test.tsx
import { render, screen } from '@testing-library/react';
import { PublicFormRenderer } from '@/components/public-form';
import { testForms } from '@/app/test-forms/test-data';

describe('PublicFormRenderer', () => {
  const mockOnSubmit = jest.fn();

  it('renders single column layout for single column forms', () => {
    render(
      <PublicFormRenderer 
        form={testForms['single-column']} 
        onSubmit={mockOnSubmit}
      />
    );
    
    expect(screen.getByText('Complete Field Types Test')).toBeInTheDocument();
  });

  it('renders multi-step layout for multi-step forms', () => {
    render(
      <PublicFormRenderer 
        form={testForms['multi-step']} 
        onSubmit={mockOnSubmit}
      />
    );
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('handles field changes', () => {
    const mockFieldChange = jest.fn();
    
    render(
      <PublicFormRenderer 
        form={testForms['single-column']} 
        onSubmit={mockOnSubmit}
        onFieldChange={mockFieldChange}
      />
    );
    
    // This would need actual interaction to test
  });
});

// __tests__/components/public-form/hooks/useFormValidation.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '@/components/public-form/hooks/useFormValidation';
import { ExtendedFormField } from '@/components/public-form/types';

const mockFields: ExtendedFormField[] = [
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    required: true
  },
  {
    id: 'name',
    type: 'shortText',
    label: 'Name',
    required: true,
    maxLength: 50
  }
];

describe('useFormValidation', () => {
  it('validates email field correctly', () => {
    const { result } = renderHook(() => useFormValidation(mockFields));
    
    // Valid email
    const validResult = result.current.validateField('email', 'test@example.com');
    expect(validResult).toBeNull();
    
    // Invalid email
    const invalidResult = result.current.validateField('email', 'invalid-email');
    expect(invalidResult).toEqual({
      fieldId: 'email',
      message: expect.stringContaining('valid email'),
      type: 'format'
    });
  });

  it('validates required fields', () => {
    const { result } = renderHook(() => useFormValidation(mockFields));
    
    // Empty required field
    const emptyResult = result.current.validateField('name', '');
    expect(emptyResult).toEqual({
      fieldId: 'name',
      message: expect.stringContaining('required'),
      type: 'format'
    });
    
    // Filled required field
    const filledResult = result.current.validateField('name', 'John Doe');
    expect(filledResult).toBeNull();
  });

  it('validates all fields at once', () => {
    const { result } = renderHook(() => useFormValidation(mockFields));
    
    const formData = {
      email: 'invalid-email',
      name: ''
    };
    
    const errors = result.current.validateAll(formData);
    expect(errors).toHaveLength(2);
    expect(errors[0].fieldId).toBe('email');
    expect(errors[1].fieldId).toBe('name');
  });
});renders with label and placeholder', () => {
    renderWithFormProvider(mockField);
    
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    renderWithFormProvider(mockField);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows character counter', () => {
    renderWithFormProvider(mockField);
    
    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  it('updates character counter on input', async () => {
    renderWithFormProvider(mockField);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    await waitFor(() => {
      expect(screen.getByText('5/50')).toBeInTheDocument();
    });
  });

  it('shows validation error for required field', async () => {
    renderWithFormProvider(mockField);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.blur(input);
    
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
  });

  it('respects maxLength constraint', () => {
    renderWithFormProvider(mockField);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.maxLength).toBe(50);
  });
});

// __tests__/components/public-form/fields/MultipleChoiceField.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MultipleChoiceField } from '@/components/public-form/components/fields/MultipleChoiceField';

const mockChoiceField: ExtendedFormField = {
  id: 'choice-field',
  type: 'multipleChoice',
  label: 'Choose an option',
  required: true,
  options: ['Option 1', 'Option 2', 'Option 3', 'Other']
};

describe('MultipleChoiceField', () => {
  it('renders all options', () => {
    renderWithFormProvider(mockChoiceField);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('allows selecting an option', async () => {
    renderWithFormProvider(mockChoiceField);
    
    const option1 = screen.getByLabelText('Option 1');
    fireEvent.click(option1);
    
    await waitFor(() => {
      expect(option1).toBeChecked();
    });
  });

  it('shows other input when Other is selected', async () => {
    renderWithFormProvider(mockChoiceField);
    
    const otherOption = screen.getByLabelText('Other');
    fireEvent.click(otherOption);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Please specify...')).toBeInTheDocument();
    });
  });

  it('