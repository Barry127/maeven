import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { H1 } from './Html';
import { themeOverride } from './styles';

describe('H1', () => {
  it('renders an h1 element with given text', () => {
    render(<H1>Hello World!</H1>);
    const element = document.querySelector('h1');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H1 className="h1-class">Hello World!</H1>);
    const element = document.querySelector('h1');
    expect(element).toHaveClass('h1-class');
  });

  it('passes props', () => {
    render(
      <H1 id="H1Id" data-test="h1-data">
        Hello World!
      </H1>
    );
    const element = document.querySelector('h1');
    expect(element).toHaveAttribute('id', 'H1Id');
    expect(element!.dataset.test).toBe('h1-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        H1: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'h1');

    render(
      <ThemeProvider theme={theme}>
        <H1>Hello World!</H1>
      </ThemeProvider>
    );
    const element = document.querySelector('h1');
    expect(element).toHaveClass(expectedClassName);
  });
});
