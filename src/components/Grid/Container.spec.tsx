import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { getStyles } from 'typestyle';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { Container } from './Container';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

describe('Container', () => {
  afterEach(reinit);

  it('renders div element with given children', () => {
    render(<Container id="Container">My Container</Container>);
    const element = document.getElementById('Container');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('My Container');
  });

  it('sets className', () => {
    render(
      <Container id="Container" className="my-container-class">
        My Container
      </Container>
    );
    const element = document.getElementById('Container');
    expect(element!.classList).toContain('my-container-class');
  });

  it('passes props', () => {
    render(
      <Container id="Container" data-test="test-attr">
        My Container
      </Container>
    );
    const element = document.getElementById('Container');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('styles Theme ovrrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        Container: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Container id="Container">My Container</Container>
      </ThemeProvider>
    );

    const element = document.getElementById('Container');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });

  describe('element', () => {
    it('renders a div element by default', () => {
      render(<Container id="Container">My Container</Container>);
      const element = document.getElementById('Container');
      expect(element!.tagName).toBe('DIV');
    });

    it('renders a main element', () => {
      render(
        <Container id="Container" element="main">
          My Container
        </Container>
      );
      const element = document.getElementById('Container');
      expect(element!.tagName).toBe('MAIN');
    });
  });

  describe('fluid', () => {
    it('is not fluid by default (has @media queries)', () => {
      render(<Container id="Container">My Container</Container>);
      const styles = getStyles();
      expect(styles).toContain('@media');
    });

    it('has no @media queries when fluid', () => {
      render(
        <Container fluid id="Container">
          My Container
        </Container>
      );
      const styles = getStyles();
      expect(styles).not.toContain('@media');
    });
  });
});
