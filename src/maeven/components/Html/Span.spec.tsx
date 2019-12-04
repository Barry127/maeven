import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Span } from './Html';
import { themeOverride } from './styles';

describe('Span', () => {
  it('renders an Span element with given text', () => {
    render(<Span>Hello World!</Span>);
    const element = document.querySelector('span');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<Span className="span-class">Hello World!</Span>);
    const element = document.querySelector('span');
    expect(element).toHaveClass('span-class');
  });

  it('passes props', () => {
    render(
      <Span id="SpanId" data-test="span-data">
        Hello World!
      </Span>
    );
    const element = document.querySelector('span');
    expect(element).toHaveAttribute('id', 'SpanId');
    expect(element!.dataset.test).toBe('span-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Span: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'span');

    render(
      <ThemeProvider theme={theme}>
        <Span>Hello World!</Span>
      </ThemeProvider>
    );
    const element = document.querySelector('span');
    expect(element).toHaveClass(expectedClassName);
  });
});
