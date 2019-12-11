import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../../..';

import { Container } from './Container';
import { classes, themeOverride } from './styles';

describe('Container', () => {
  it('renders div element with given children', () => {
    const { getByText } = render(<Container>Hello world!</Container>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Container className="container-class">Hello world!</Container>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('container-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Container id="ContainerId" data-test="container-data">
        Hello world!
      </Container>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'ContainerId');
    expect(element.dataset.test).toBe('container-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Container: {
          color: 'navy'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Container>Hello world!</Container>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
  });

  describe('element', () => {
    it('renders main element', () => {
      const { getByText } = render(
        <Container element="main">Hello world!</Container>
      );
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('MAIN');
    });

    it('renders article element', () => {
      const { getByText } = render(
        <Container element="article">Hello world!</Container>
      );
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('ARTICLE');
    });
  });

  describe('fluid', () => {
    it('is not fluid by default', () => {
      const { getByText } = render(<Container>Hello world!</Container>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.responsive(MaevenDefault));
    });

    it('sets fluid', () => {
      const { getByText } = render(<Container fluid>Hello world!</Container>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.responsive(MaevenDefault));
    });
  });
});
