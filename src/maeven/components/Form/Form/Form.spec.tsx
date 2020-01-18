import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../../..';

import { Form } from './Form';
import { classes, themeOverride } from './styles';

describe('Form', () => {
  it('renders form element with given text', () => {
    const { getByText } = render(<Form>Hello world!</Form>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('FORM');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Form className="form-class">Hello world!</Form>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('form-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Form id="FormId" data-test="form-data">
        Hello world!
      </Form>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'FormId');
    expect(element.dataset.test).toBe('form-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Form: {
          color: 'papayewhip'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Form>Hello world!</Form>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
  });

  describe('layout', () => {
    it('is horizontal by default', () => {
      const { getByText } = render(<Form>Hello world!</Form>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.vertical);
    });

    it('sets vertical', () => {
      const { getByText } = render(<Form layout="vertical">Hello world!</Form>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.vertical);
    });
  });
});
