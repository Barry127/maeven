import { render } from '@testing-library/react';
import { circle as circleIcon } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import maeven from '../../../themes/maeven';
import { ThemeProvider } from '../../ThemeProvider';
import { CheckBox } from './CheckBox';

describe('CheckBox', () => {
  it('renders input element and sets child text', () => {
    render(<CheckBox>Hello world!</CheckBox>);
    const container = document.querySelector('.mvn--check-box');
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<CheckBox className="checkbox-class">Hello world!</CheckBox>);
    const element = document.querySelector('.mvn--check-box');
    expect(element).toHaveClass('checkbox-class');
  });

  it('passes props', () => {
    render(
      <CheckBox id="CheckBoxId" data-test="checkbox-data">
        Hello world!
      </CheckBox>
    );
    const element = document.querySelector('input');
    expect(element).toHaveAttribute('id', 'CheckBoxId');
    expect(element).toHaveAttribute('data-test', 'checkbox-data');
  });

  describe('checkIcon', () => {
    it('defaults to check', () => {
      render(<CheckBox checked onChange={jest.fn()} />);
      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();
    });

    it('sets checkIcon', () => {
      render(<CheckBox checkIcon={circleIcon} checked onChange={jest.fn()} />);
      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });

    it('overrides check icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          check: circleIcon
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <CheckBox checked onChange={jest.fn()} />
        </ThemeProvider>
      );
      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<CheckBox />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<CheckBox disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<CheckBox />);
      const container = document.querySelector('.mvn--check-box');
      expect(container).not.toHaveClass('has-error');
    });

    it('sets error styling', () => {
      render(<CheckBox hasError>Error Text</CheckBox>);
      const container = document.querySelector('.mvn--check-box');
      expect(container).toHaveClass('has-error');
    });
  });

  describe('indeterminate', () => {
    it('is not indeterminate by default', () => {
      render(<CheckBox checked onChange={jest.fn()} />);
      const checkbox = document.querySelector('input');
      expect(checkbox?.indeterminate).toBe(false);
      expect(checkbox?.checked).toBe(true);
    });

    it('sets indeterminate', () => {
      render(<CheckBox indeterminate checked={false} onChange={jest.fn()} />);
      const checkbox = document.querySelector('input');
      expect(checkbox?.indeterminate).toBe(true);
      expect(checkbox?.checked).toBe(false);
    });

    it('indeterminate overrides checked', () => {
      render(<CheckBox indeterminate checked onChange={jest.fn()} />);
      const checkbox = document.querySelector('input');
      expect(checkbox?.indeterminate).toBe(true);
      expect(checkbox?.checked).toBe(false);
    });

    it('removes indeterminate state when changed', () => {
      const { rerender } = render(
        <CheckBox indeterminate checked onChange={jest.fn()} />
      );
      const checkbox = document.querySelector('input');
      expect(checkbox?.checked).toBe(false);
      expect(checkbox?.indeterminate).toBe(true);

      rerender(<CheckBox indeterminate={false} checked onChange={jest.fn()} />);
      expect(checkbox?.checked).toBe(true);
      expect(checkbox?.indeterminate).toBe(false);
    });
  });

  describe('indeterminateIcon', () => {
    it('defaults to minus', () => {
      render(<CheckBox indeterminate onChange={jest.fn()} />);
      const circle = document.querySelector('circle');
      const line = document.querySelector('line');
      expect(circle).not.toBeInTheDocument();
      expect(line).toBeInTheDocument();
    });

    it('sets indeterminateIcon', () => {
      render(
        <CheckBox
          indeterminateIcon={circleIcon}
          indeterminate
          onChange={jest.fn()}
        />
      );
      const circle = document.querySelector('circle');
      const line = document.querySelector('line');
      expect(circle).toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
    });

    it('overrides check icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          indeterminate: circleIcon
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <CheckBox indeterminate onChange={jest.fn()} />
        </ThemeProvider>
      );
      const circle = document.querySelector('circle');
      const line = document.querySelector('line');
      expect(circle).toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
    });
  });

  describe('label', () => {
    it('has no aria-describedby by default', () => {
      render(<CheckBox />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('sets aria-describedby by when input has a label', () => {
      render(<CheckBox label="Label" />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('aria-describedby');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<CheckBox />);
      const container = document.querySelector('.mvn--check-box');
      expect(container).not.toHaveClass('sm');
      expect(container).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<CheckBox size="sm" />);
      const container = document.querySelector('.mvn--check-box');
      expect(container).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<CheckBox size="lg" />);
      const container = document.querySelector('.mvn--check-box');
      expect(container).toHaveClass('lg');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<CheckBox ref={ref} />);
      const element = document.querySelector('input');
      expect(ref.current).toBe(element);
    });
  });
});
