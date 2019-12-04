import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { H4 } from './Html';
import { themeOverride } from './styles';

describe('H4', () => {
  it('renders an h4 element with given text', () => {
    render(<H4>Hello World!</H4>);
    const element = document.querySelector('h4');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H4 className="h4-class">Hello World!</H4>);
    const element = document.querySelector('h4');
    expect(element).toHaveClass('h4-class');
  });

  it('passes props', () => {
    render(
      <H4 id="H4Id" data-test="h4-data">
        Hello World!
      </H4>
    );
    const element = document.querySelector('h4');
    expect(element).toHaveAttribute('id', 'H4Id');
    expect(element!.dataset.test).toBe('h4-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        H4: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'h4');

    render(
      <ThemeProvider theme={theme}>
        <H4>Hello World!</H4>
      </ThemeProvider>
    );
    const element = document.querySelector('h4');
    expect(element).toHaveClass(expectedClassName);
  });
});
