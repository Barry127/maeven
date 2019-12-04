import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { P } from './Html';
import { themeOverride } from './styles';

describe('P', () => {
  it('renders a p element with given text', () => {
    render(<P>Hello World!</P>);
    const element = document.querySelector('p');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<P className="p-class">Hello World!</P>);
    const element = document.querySelector('p');
    expect(element).toHaveClass('p-class');
  });

  it('passes props', () => {
    render(
      <P id="PId" data-test="p-data">
        Hello World!
      </P>
    );
    const element = document.querySelector('p');
    expect(element).toHaveAttribute('id', 'PId');
    expect(element!.dataset.test).toBe('p-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        P: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'p');

    render(
      <ThemeProvider theme={theme}>
        <P>Hello World!</P>
      </ThemeProvider>
    );
    const element = document.querySelector('p');
    expect(element).toHaveClass(expectedClassName);
  });
});
