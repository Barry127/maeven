import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { H5 } from './Html';
import { themeOverride } from './styles';

describe('H5', () => {
  it('renders an h5 element with given text', () => {
    render(<H5>Hello World!</H5>);
    const element = document.querySelector('h5');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H5 className="h5-class">Hello World!</H5>);
    const element = document.querySelector('h5');
    expect(element).toHaveClass('h5-class');
  });

  it('passes props', () => {
    render(
      <H5 id="H5Id" data-test="h5-data">
        Hello World!
      </H5>
    );
    const element = document.querySelector('h5');
    expect(element).toHaveAttribute('id', 'H5Id');
    expect(element!.dataset.test).toBe('h5-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        H5: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'h5');

    render(
      <ThemeProvider theme={theme}>
        <H5>Hello World!</H5>
      </ThemeProvider>
    );
    const element = document.querySelector('h5');
    expect(element).toHaveClass(expectedClassName);
  });
});
