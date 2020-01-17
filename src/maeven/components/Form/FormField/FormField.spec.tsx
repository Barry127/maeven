import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../../..';

import { FormField } from './FormField';
import { classes, themeOverride } from './styles';

describe('FormField', () => {
  it('renders div element with given text and label', () => {
    render(
      <FormField label="Label Text" htmlFor="labelFor">
        Hello world!
      </FormField>
    );
    const field = document.querySelector(`.${classes.fieldCol}`);
    const label = document.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(field).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', 'labelFor');
    expect(field).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<FormField className="formfield-class">Hello world!</FormField>);
    const container = document.querySelector(`.${classes.container}`);
    expect(container).toHaveClass('formfield-class');
  });

  it('passes props', () => {
    render(
      <FormField id="FormFieldId" data-test="formfield-data">
        Hello world!
      </FormField>
    );
    const container = document.querySelector(
      `.${classes.container}`
    ) as HTMLDivElement;
    expect(container).toHaveAttribute('id', 'FormFieldId');
    expect(container.dataset.test).toBe('formfield-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        FormField: {
          color: 'plum'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <FormField>Hello world!</FormField>
      </ThemeProvider>
    );
    const container = document.querySelector(`.${classes.container}`);
    expect(container).toHaveClass(expectedClassName);
  });

  it('does not render a label when no label is provided', () => {
    render(<FormField>Hello world!</FormField>);
    const label = document.querySelector('label');
    expect(label).not.toBeInTheDocument();
  });

  it('sets labelId', () => {
    render(
      <FormField label="Hello" labelId="LabelId">
        Hello world!
      </FormField>
    );
    const label = document.querySelector('label');
    expect(label).toHaveAttribute('id', 'LabelId');
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<FormField />);
      const container = document.querySelector(`.${classes.container}`);
      expect(container).not.toHaveClass(classes.sm);
      expect(container).not.toHaveClass(classes.lg);
    });

    it('sets sm', () => {
      render(<FormField size="sm" />);
      const container = document.querySelector(`.${classes.container}`);
      expect(container).toHaveClass(classes.sm);
    });

    it('sets lg', () => {
      render(<FormField size="lg" />);
      const container = document.querySelector(`.${classes.container}`);
      expect(container).toHaveClass(classes.lg);
    });
  });
});
