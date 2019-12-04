import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Ul } from './Html';
import { themeOverride } from './styles';

describe('Ul', () => {
  it('renders an Ul element with given text', () => {
    render(<Ul>Hello World!</Ul>);
    const element = document.querySelector('ul');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<Ul className="ul-class">Hello World!</Ul>);
    const element = document.querySelector('ul');
    expect(element).toHaveClass('ul-class');
  });

  it('passes props', () => {
    render(
      <Ul id="UlId" data-test="ul-data">
        Hello World!
      </Ul>
    );
    const element = document.querySelector('ul');
    expect(element).toHaveAttribute('id', 'UlId');
    expect(element!.dataset.test).toBe('ul-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Ul: {
          color: 'green'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'ul');

    render(
      <ThemeProvider theme={theme}>
        <Ul>Hello World!</Ul>
      </ThemeProvider>
    );
    const element = document.querySelector('ul');
    expect(element).toHaveClass(expectedClassName);
  });
});
