import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Text } from './Text';
import { classes, themeOverride, styleHtmlThemeOverride } from './styles';

describe('Text', () => {
  it('renders a div element with given text', () => {
    const { getByText } = render(<Text>Hello world!</Text>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Text className="text-class">Hello world!</Text>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('text-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Text id="TextId" data-test="text-data">
        Hello world!
      </Text>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'TextId');
    expect(element.dataset.test).toBe('text-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        A: {
          color: 'indigo'
        },
        Text: {
          color: 'yellow'
        }
      }
    };

    const expectedClassName = themeOverride(theme);
    const styleHtmlOverrideClassName = styleHtmlThemeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Text>Hello world!</Text>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
    expect(element).not.toHaveClass(styleHtmlOverrideClassName);
  });

  it('styles Theme overrides for styleHtml', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        A: {
          color: 'red'
        },
        Text: {
          color: 'blue'
        }
      }
    };

    const expectedClassName = themeOverride(theme);
    const styleHtmlOverrideClassName = styleHtmlThemeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Text styleHtml>Hello world!</Text>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
    expect(element).toHaveClass(styleHtmlOverrideClassName);
  });

  describe('color', () => {
    it('sets indigo color', () => {
      const { getByText } = render(<Text color="indigo">Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.color.indigo);
    });

    it('sets danger color', () => {
      const { getByText } = render(<Text color="danger">Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.color.danger);
    });
  });

  describe('inline', () => {
    it('defaults to block (div)', () => {
      const { getByText } = render(<Text>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('DIV');
    });

    it('sets inline (span)', () => {
      const { getByText } = render(<Text inline>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('SPAN');
    });
  });

  describe('styleHtml', () => {
    it('does not style html by default', () => {
      const { getByText } = render(<Text>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.styleHtml);
    });

    it('styles html', () => {
      const { getByText } = render(<Text styleHtml>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.styleHtml);
    });
  });

  describe('truncate', () => {
    it('does not truncate by default', () => {
      const { getByText } = render(<Text>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.truncate);
    });

    it('sets truncate', () => {
      const { getByText } = render(<Text truncate>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.truncate);
    });

    it('it does not set truncate when inline', () => {
      const { getByText } = render(
        <Text inline truncate>
          Hello world!
        </Text>
      );
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.truncate);
    });
  });
});
