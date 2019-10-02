import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import {
  getStylesForElement,
  reinit,
  getStylesForSelector
} from '../../../testHelpers';

import { Text } from './Text';
import { MaevenTheme } from '../..';

describe('Text', () => {
  afterEach(reinit);

  it('renders div element with given text', () => {
    render(<Text id="Text">Hello World!</Text>);
    const element = document.getElementById('Text');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('Hello World!');
  });

  it('sets className', () => {
    render(
      <Text id="Text" className="my-text-class">
        Hello World!
      </Text>
    );
    const element = document.getElementById('Text');
    expect(element!.classList).toContain('my-text-class');
  });

  it('passes props', () => {
    render(
      <Text id="Text" className="my-text-class" data-test="test-attr">
        Hello World!
      </Text>
    );
    const element = document.getElementById('Text');
    expect(element!.dataset.test).toBe('test-attr');
  });

  describe('color', () => {
    it('defaults to text color', () => {
      render(<Text id="Text">Hello World!</Text>);
      const element = document.getElementById('Text');
      const styles = getStylesForElement(element!);
      expect(styles.color).toBe(MaevenTheme.colors.types.text);
    });

    it('sets the orange', () => {
      render(
        <Text id="Text" color="orange">
          Hello World!
        </Text>
      );
      const element = document.getElementById('Text');
      const styles = getStylesForElement(element!);
      expect(styles.color).toBe(MaevenTheme.colors.name.orange);
    });

    it('sets the info color', () => {
      render(
        <Text id="Text" color="info">
          Hello World!
        </Text>
      );
      const element = document.getElementById('Text');
      const styles = getStylesForElement(element!);
      expect(styles.color).toBe(MaevenTheme.colors.semantic.info);
    });
  });

  describe('inline', () => {
    it('defaults to block (div)', () => {
      render(<Text id="Text">Hello World!</Text>);
      const element = document.getElementById('Text');
      expect(element!.tagName).toBe('DIV');
    });

    it('sets inline (span)', () => {
      render(
        <Text id="Text" inline>
          Hello World!
        </Text>
      );
      const element = document.getElementById('Text');
      expect(element!.tagName).toBe('SPAN');
    });
  });

  describe('styleHtml', () => {
    it('does not style html by default', () => {
      render(
        <Text id="Text">
          <h1>Title</h1>
          <p>
            Paragraph with <a href="#">Link</a>.
          </p>
        </Text>
      );
      const h1Styles = getStylesForSelector(/h1$/);
      const aStyles = getStylesForSelector(/a$/);
      expect(h1Styles).toEqual({});
      expect(aStyles).toEqual({});
    });

    it('styles html', () => {
      render(
        <Text id="Text" styleHtml>
          <h1>Title</h1>
          <p>
            Paragraph with <a href="#">Link</a>.
          </p>
        </Text>
      );
      const h1Styles = getStylesForSelector(/h1$/);
      const aStyles = getStylesForSelector(/a$/);
      expect(h1Styles.color).toBe(MaevenTheme.colors.types.heading);
      expect(aStyles.color).toBe(MaevenTheme.colors.types.link);
    });
  });

  describe('truncate', () => {
    it('does not truncate by default', () => {
      render(<Text id="Text">Without Truncate</Text>);
      const element = document.getElementById('Text');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty('textOverflow');
      expect(styles).not.toHaveProperty('whiteSpace');
    });

    it('sets truncate', () => {
      render(
        <Text id="Text" truncate>
          Without Truncate
        </Text>
      );
      const element = document.getElementById('Text');
      const styles = getStylesForElement(element!);
      expect(styles.textOverflow).toBe('ellipsis');
      expect(styles.whiteSpace).toBe('nowrap');
    });

    it('does not set truncate when inline', () => {
      render(
        <Text id="Text" truncate inline>
          Without Truncate
        </Text>
      );
      const element = document.getElementById('Text');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty('textOverflow');
      expect(styles).not.toHaveProperty('whiteSpace');
    });
  });
});
