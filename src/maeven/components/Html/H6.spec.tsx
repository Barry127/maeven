import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { H6 } from './Html';
import { themeOverride } from './styles';

describe('H6', () => {
  it('renders an h6 element with given text', () => {
    render(<H6>Hello World!</H6>);
    const element = document.querySelector('h6');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H6 className="h6-class">Hello World!</H6>);
    const element = document.querySelector('h6');
    expect(element).toHaveClass('h6-class');
  });

  it('passes props', () => {
    render(
      <H6 id="H6Id" data-test="h6-data">
        Hello World!
      </H6>
    );
    const element = document.querySelector('h6');
    expect(element).toHaveAttribute('id', 'H6Id');
    expect(element!.dataset.test).toBe('h6-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        H6: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'h6');

    render(
      <ThemeProvider theme={theme}>
        <H6>Hello World!</H6>
      </ThemeProvider>
    );
    const element = document.querySelector('h6');
    expect(element).toHaveClass(expectedClassName);
  });
});
