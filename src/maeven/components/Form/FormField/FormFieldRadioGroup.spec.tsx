import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { FormFieldRadioGroup } from './FormFieldRadioGroup';

const radioOptions = [
  { label: 'Javascript', value: 'js' },
  { label: 'Typescript', value: 'ts' },
  { label: 'Coffescript', value: 'coffee' }
];

describe('FormFieldRadioGroup', () => {
  it('renders RadioGroup and label', () => {
    render(
      <FormFieldRadioGroup
        name="language"
        label="Label Text"
        options={radioOptions}
        onChange={jest.fn()}
      />
    );
    const label = document.querySelector('label') as HTMLLabelElement;
    const inputs = document.querySelectorAll('input');

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');

    expect(inputs).toHaveLength(3);
    for (const input of [...(inputs as any)]) {
      expect(input).toHaveAttribute('type', 'radio');
      expect(input).toHaveAttribute('name', 'language');
    }
  });

  it('sets container className', () => {
    render(
      <FormFieldRadioGroup
        name="language"
        options={radioOptions}
        onChange={jest.fn()}
        containerClassName="formfield-class"
      />
    );
    const container = document.querySelector('.mvn-form-field');
    expect(container).toHaveClass('formfield-class');
  });
});
