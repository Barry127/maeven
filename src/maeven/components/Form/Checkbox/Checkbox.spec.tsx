import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { Checkbox, CheckboxF } from './Checkbox';
import { Checkbox as ExportedCheckbox } from '../';

describe('Checkbox', () => {
  it('renders an input checkbox and sets child text', () => {
    render(<Checkbox>Hello world!</Checkbox>);
    const container = document.querySelector('.mvn-checkbox');
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<Checkbox className="checkbox-class">Hello world!</Checkbox>);
    const container = document.querySelector('.mvn-checkbox');
    expect(container).toHaveClass('checkbox-class');
  });

  it('passes props', () => {
    render(
      <Checkbox id="CheckboxId" data-test="checkbox-data">
        Hello world!
      </Checkbox>
    );
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('id', 'CheckboxId');
    expect(input?.dataset.test).toBe('checkbox-data');
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<Checkbox />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<Checkbox disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<Checkbox />);
      const container = document.querySelector('.mvn-checkbox');
      expect(container).not.toHaveClass('mvn-checkbox-error');
    });

    it('sets error styling', () => {
      render(<Checkbox hasError>Error Text</Checkbox>);
      const container = document.querySelector('.mvn-checkbox');
      expect(container).toHaveClass('mvn-checkbox-error');
      const text = document.querySelector('.mvn-checkbox > .mvn-block');
      expect(text).toHaveClass('mvn-text-color-danger');
    });
  });

  describe('indeterminate', () => {
    it('is not indeterminate by default', () => {
      render(<Checkbox checked onChange={jest.fn()} />);
      const checkbox = document.querySelector('input');
      expect(checkbox?.indeterminate).toBe(false);
      expect(checkbox?.checked).toBe(true);
    });

    it('sets indeterminate', () => {
      render(<Checkbox indeterminate checked={false} onChange={jest.fn()} />);
      const checkbox = document.querySelector('input');
      expect(checkbox?.indeterminate).toBe(true);
      expect(checkbox?.checked).toBe(false);
    });

    it('indeterminate overrides checked', () => {
      render(<Checkbox indeterminate checked onChange={jest.fn()} />);
      const checkbox = document.querySelector('input');
      expect(checkbox?.indeterminate).toBe(true);
      expect(checkbox?.checked).toBe(false);
    });

    it('removes indeterminate state when changed', () => {
      const { rerender } = render(
        <Checkbox indeterminate checked onChange={jest.fn()} />
      );
      const checkbox = document.querySelector('input');
      expect(checkbox?.checked).toBe(false);
      expect(checkbox?.indeterminate).toBe(true);

      rerender(<Checkbox indeterminate={false} checked onChange={jest.fn()} />);
      expect(checkbox?.checked).toBe(true);
      expect(checkbox?.indeterminate).toBe(false);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Checkbox />);
      const container = document.querySelector('.mvn-checkbox');
      expect(container).not.toHaveClass('mvn-checkbox-sm');
      expect(container).not.toHaveClass('mvn-checkbox-lg');
    });

    it('sets sm', () => {
      render(<Checkbox size="sm" />);
      const container = document.querySelector('.mvn-checkbox');
      expect(container).toHaveClass('mvn-checkbox-sm');
    });

    it('sets lg', () => {
      render(<Checkbox size="lg" />);
      const container = document.querySelector('.mvn-checkbox');
      expect(container).toHaveClass('mvn-checkbox-lg');
    });
  });

  describe('forwarding ref', () => {
    it('exports CheckboxForwardRef', () => {
      expect(ExportedCheckbox).toBe(CheckboxF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<CheckboxF ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
