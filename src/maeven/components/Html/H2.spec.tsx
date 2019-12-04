import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { H2 } from './Html';
import { themeOverride } from './styles';

describe('H2', () => {
  it('renders an h2 element with given text', () => {
    render(<H2>Hello World!</H2>);
    const element = document.querySelector('h2');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H2 className="h2-class">Hello World!</H2>);
    const element = document.querySelector('h2');
    expect(element).toHaveClass('h2-class');
  });

  it('passes props', () => {
    render(
      <H2 id="H2Id" data-test="h2-data">
        Hello World!
      </H2>
    );
    const element = document.querySelector('h2');
    expect(element).toHaveAttribute('id', 'H2Id');
    expect(element!.dataset.test).toBe('h2-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        H2: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'h2');

    render(
      <ThemeProvider theme={theme}>
        <H2>Hello World!</H2>
      </ThemeProvider>
    );
    const element = document.querySelector('h2');
    expect(element).toHaveClass(expectedClassName);
  });
});
