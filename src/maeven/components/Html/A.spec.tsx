import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { A } from './Html';
import { themeOverride } from './styles';

describe('A', () => {
  it('renders an a element with given text', () => {
    render(<A href="#">Hello World!</A>);
    const element = document.querySelector('a');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(
      <A href="#" className="a-class">
        Hello World!
      </A>
    );
    const element = document.querySelector('a');
    expect(element).toHaveClass('a-class');
  });

  it('passes props', () => {
    render(
      <A href="#" id="AId" data-test="a-data">
        Hello World!
      </A>
    );
    const element = document.querySelector('a');
    expect(element).toHaveAttribute('id', 'AId');
    expect(element!.dataset.test).toBe('a-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        A: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'a');

    render(
      <ThemeProvider theme={theme}>
        <A href="#">Hello World!</A>
      </ThemeProvider>
    );
    const element = document.querySelector('a');
    expect(element).toHaveClass(expectedClassName);
  });
});
