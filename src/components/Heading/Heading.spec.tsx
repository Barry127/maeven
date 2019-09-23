import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { Heading } from './Heading';
import { MaevenTheme } from '../..';
import { h1, h3 } from '../Html/styles';

describe('Heading', () => {
  afterEach(reinit);

  it('renders h1 element with given text', () => {
    render(<Heading level="h1">H1 Heading</Heading>);
    const element = document.querySelector('h1');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('H1 Heading');
  });

  it('renders h5 element with given text', () => {
    render(<Heading level="h5">H5 Heading</Heading>);
    const element = document.querySelector('h5');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('H5 Heading');
  });

  it('sets className', () => {
    render(
      <Heading level="h2" className="my-heading-class">
        Hello World
      </Heading>
    );
    const element = document.querySelector('h2');
    expect(element!.classList).toContain('my-heading-class');
  });

  it('passes props', () => {
    render(
      <Heading level="h1" id="heading" data-test="test-attr">
        Test
      </Heading>
    );
    const element = document.querySelector('h1');
    expect(element!.id).toBe('heading');
    expect(element!.dataset.test).toBe('test-attr');
  });

  describe('color', () => {
    it('defaults to heading color', () => {
      render(<Heading level="h2">Default Heading</Heading>);
      const element = document.querySelector('h2');
      const styles = getStylesForElement(element!);
      expect(styles.color).toBe(MaevenTheme.colors.types.heading);
    });

    it('sets the indigo color', () => {
      render(
        <Heading level="h2" color="indigo">
          Default Heading
        </Heading>
      );
      const element = document.querySelector('h2');
      const styles = getStylesForElement(element!);
      expect(styles.color).toBe(MaevenTheme.colors.name.indigo);
    });

    it('sets the primary color', () => {
      render(
        <Heading level="h2" color="primary">
          Default Heading
        </Heading>
      );
      const element = document.querySelector('h2');
      const styles = getStylesForElement(element!);
      expect(styles.color).toBe(MaevenTheme.colors.semantic.primary);
    });
  });

  describe('size', () => {
    it('defaults to default size for level', () => {
      render(<Heading level="h1">H1 Heading</Heading>);
      const element = document.querySelector('h1');
      expect(element).toBeInTheDocument();

      const calculatedH1Styles = h1(MaevenTheme);
      const styles = getStylesForElement(element!);
      expect(styles.fontSize).toBe(calculatedH1Styles.css.element.fontSize);
    });

    it('sets size', () => {
      render(
        <Heading level="h1" size="h3">
          H1 Heading
        </Heading>
      );
      const element = document.querySelector('h1');
      expect(element).toBeInTheDocument();

      const calculatedH3Styles = h3(MaevenTheme);
      const styles = getStylesForElement(element!);
      expect(styles.fontSize).toBe(calculatedH3Styles.css.element.fontSize);
    });
  });

  describe('truncate', () => {
    it('does not truncate by default', () => {
      render(<Heading level="h4">Without Truncate</Heading>);
      const element = document.querySelector('h4');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty('textOverflow');
      expect(styles).not.toHaveProperty('whiteSpace');
    });

    it('Sets truncate', () => {
      render(
        <Heading level="h4" truncate>
          Without Truncate
        </Heading>
      );
      const element = document.querySelector('h4');
      const styles = getStylesForElement(element!);
      expect(styles.textOverflow).toBe('ellipsis');
      expect(styles.whiteSpace).toBe('nowrap');
    });
  });
});
