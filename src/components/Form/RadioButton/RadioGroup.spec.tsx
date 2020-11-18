import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { RadioGroup } from './RadioGroup';

const options = [
  { label: 'Javascript', value: 'js' },
  { label: 'Typescript', value: 'ts' },
  { label: 'Coffescript', value: 'coffee' }
];

describe('RadioGroup', () => {
  it('renders 3 radio buttons and checks value', () => {
    render(
      <RadioGroup
        options={options}
        name="language"
        value="ts"
        onChange={jest.fn()}
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
        options={options}
        name="language"
        className="radio-button-class"
      />
    );
    const element = document.querySelector('.mvn--radio-group');
    expect(element).toHaveClass('radio-button-class');
  });

  it('passes props', () => {
    render(
      <RadioGroup
        options={options}
        name="language"
        id="RadioGroupId"
        data-test="radio-button-data"
      />
    );
    const element = document.querySelector('.mvn--radio-group');
    expect(element).toHaveAttribute('id', 'RadioGroupId');
    expect(element).toHaveAttribute('data-test', 'radio-button-data');
  });

  describe('inline', () => {
    it('is not inline by default', () => {
      render(<RadioGroup options={options} name="language" />);
      const container = document.querySelector('.mvn--radio-group');
      expect(container).not.toHaveClass('inline');
    });
    it('sets inline', () => {
      render(<RadioGroup inline options={options} name="language" />);
      const container = document.querySelector('.mvn--radio-group');
      expect(container).toHaveClass('inline');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<RadioGroup options={options} name="language" />);
      const firstRadio = document.querySelector(`.mvn--radio-button`);
      expect(firstRadio).toHaveClass('md');
      expect(firstRadio).not.toHaveClass('sm');
      expect(firstRadio).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<RadioGroup size="sm" options={options} name="language" />);
      const firstRadio = document.querySelector(`.mvn--radio-button`);
      expect(firstRadio).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<RadioGroup size="lg" options={options} name="language" />);
      const firstRadio = document.querySelector(`.mvn--radio-button`);
      expect(firstRadio).toHaveClass('lg');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<RadioGroup options={options} name="language" ref={ref} />);
      const element = document.querySelector('.mvn--radio-group');
      expect(ref.current).toBe(element);
    });
  });
});
