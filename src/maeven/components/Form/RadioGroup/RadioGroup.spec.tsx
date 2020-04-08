import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { RadioGroup } from './RadioGroup';

const options = [
  { label: 'Javascript', value: 'js' },
  { label: 'Typescript', value: 'ts' },
  { label: 'Coffescript', value: 'coffee' }
];

describe('RadioGroup', () => {
  it('renders 3 radiobuttons and checkes value', () => {
    render(
      <RadioGroup
        value="ts"
        onChange={jest.fn()}
        options={options}
        name="language"
      />
    );
    const inputs = document.querySelectorAll('input');
    expect(inputs).toHaveLength(3);
    for (const input of [...(inputs as any)]) {
      expect(input).toHaveAttribute('type', 'radio');
      expect(input).toHaveAttribute('name', 'language');
    }

    expect(inputs[1]).toHaveAttribute('checked');
  });

  it('sets className', () => {
    render(
      <RadioGroup
        className="radiogroup-class"
        options={options}
        name="language"
      />
    );
    const container = document.querySelector('.mvn-radio-group');
    expect(container).toHaveClass('radiogroup-class');
  });

  it('passes props', () => {
    render(
      <RadioGroup
        id="RadioGroupId"
        data-test="radiogroup-data"
        options={options}
        name="language"
      />
    );
    const container = document.querySelector('.mvn-radio-group');
    expect(container).toHaveAttribute('id', 'RadioGroupId');
    expect(container).toHaveAttribute('data-test', 'radiogroup-data');
  });

  describe('inline', () => {
    it('is not inline by default', () => {
      render(<RadioGroup options={options} name="language" />);
      const container = document.querySelector('.mvn-radio-group');
      expect(container).not.toHaveClass('mvn-radio-group-inline');
    });
    it('sets inline', () => {
      render(<RadioGroup inline options={options} name="language" />);
      const container = document.querySelector('.mvn-radio-group');
      expect(container).toHaveClass('mvn-radio-group-inline');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<RadioGroup options={options} name="language" />);
      const firstRadio = document.querySelector(`.mvn-radio-button`);
      expect(firstRadio).not.toHaveClass('mvn-radio-button-sm');
      expect(firstRadio).not.toHaveClass('mvn-radio-button-lg');
    });

    it('sets sm', () => {
      render(<RadioGroup size="sm" options={options} name="language" />);
      const firstRadio = document.querySelector(`.mvn-radio-button`);
      expect(firstRadio).toHaveClass('mvn-radio-button-sm');
    });

    it('sets lg', () => {
      render(<RadioGroup size="lg" options={options} name="language" />);
      const firstRadio = document.querySelector(`.mvn-radio-button`);
      expect(firstRadio).toHaveClass('mvn-radio-button-lg');
    });
  });
});
