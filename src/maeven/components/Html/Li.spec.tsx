import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Li } from './Html';
import { themeOverride } from './styles';

describe('Li', () => {
  it('renders an Li element with given text', () => {
    render(<Li>Hello World!</Li>);
    const element = document.querySelector('li');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<Li className="li-class">Hello World!</Li>);
    const element = document.querySelector('li');
    expect(element).toHaveClass('li-class');
  });

  it('passes props', () => {
    render(
      <Li id="LiId" data-test="li-data">
        Hello World!
      </Li>
    );
    const element = document.querySelector('li');
    expect(element).toHaveAttribute('id', 'LiId');
    expect(element!.dataset.test).toBe('li-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Li: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'li');

    render(
      <ThemeProvider theme={theme}>
        <Li>Hello World!</Li>
      </ThemeProvider>
    );
    const element = document.querySelector('li');
    expect(element).toHaveClass(expectedClassName);
  });
});
