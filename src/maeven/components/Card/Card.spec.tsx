import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Card } from './Card';
import { classes, themeOverride } from './styles';

describe('Card', () => {
  it('renders div element with given text', () => {
    const { getByText } = render(<Card>Hello world!</Card>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('renders a main element', () => {
    const { getByText } = render(<Card element="main">Hello world!</Card>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('MAIN');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Card className="card-class">Hello world!</Card>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('card-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Card id="CardId" data-test="card-data">
        Hello world!
      </Card>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'CardId');
    expect(element.dataset.test).toBe('card-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Card: {
          borderColor: 'hotpink'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Card>Hello world!</Card>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
  });

  describe('elevation', () => {
    it('has no elevation by default', () => {
      const { getByText } = render(<Card>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.elevation[0]);
    });

    it('sets elevation', () => {
      const { getByText } = render(<Card elevation={2}>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.elevation[2]);
    });
  });

  describe('interactive', () => {
    it('is not interactive by default', () => {
      const { getByText } = render(<Card>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.interactive);
      expect(element).not.toHaveAttribute('tabindex');
    });

    it('sets interactive', () => {
      const { getByText } = render(<Card interactive>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.interactive);
      expect(element).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('overlay', () => {
    it('has no overlay by default', () => {
      const { getByText } = render(<Card>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.overlay);
    });

    it('sets overlay', () => {
      const { getByText } = render(
        <Card overlay={<h3>Overlay</h3>}>Hello world!</Card>
      );
      const element = getByText('Hello world!');
      const overlay = getByText('Overlay').parentElement;
      expect(element).toHaveClass(classes.overlay);
      expect(overlay?.parentElement).toBe(element);
    });
  });
});
