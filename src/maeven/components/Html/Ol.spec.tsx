import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Ol } from './Html';
import { themeOverride } from './styles';

describe('Ol', () => {
  it('renders an Ol element with given text', () => {
    render(<Ol>Hello World!</Ol>);
    const element = document.querySelector('ol');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<Ol className="ol-class">Hello World!</Ol>);
    const element = document.querySelector('ol');
    expect(element).toHaveClass('ol-class');
  });

  it('passes props', () => {
    render(
      <Ol id="OlId" data-test="ol-data">
        Hello World!
      </Ol>
    );
    const element = document.querySelector('ol');
    expect(element).toHaveAttribute('id', 'OlId');
    expect(element!.dataset.test).toBe('ol-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Ol: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'ol');

    render(
      <ThemeProvider theme={theme}>
        <Ol>Hello World!</Ol>
      </ThemeProvider>
    );
    const element = document.querySelector('ol');
    expect(element).toHaveClass(expectedClassName);
  });
});
