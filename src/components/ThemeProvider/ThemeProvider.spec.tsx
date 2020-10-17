import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import maeven from '../../themes/maeven';

describe('ThemeProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ThemeProvider theme={maeven}>
        <h1>Hello World!</h1>
      </ThemeProvider>
    );
    const element = getByText('Hello World!');
    expect(element.tagName).toBe('H1');
  });

  it('renders style', () => {
    const theme = { ...maeven, colors: { blue3: 'blue' } };
    render(<ThemeProvider theme={theme}>Hello</ThemeProvider>);
    const style = document.querySelector('style')?.innerHTML;
    expect(style).toContain('--mvn-blue3: blue');
    expect(style).toContain('--mvn-primary: blue');
  });
});
