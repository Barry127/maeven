import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { activity } from 'icon-packs/feather';
import { render } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { Icon } from './Icon';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';
import { IconType } from '../types';

const imgIcon: IconType = {
  tag: 'img',
  attrs: {
    src: 'icon.jpg'
  }
};

describe('Icon', () => {
  afterEach(reinit);

  it('renders a span element with icon', () => {
    render(<Icon icon={activity} />);
    const element = document.querySelector('span');
    expect(element).toBeInTheDocument();
    expect(element!.firstChild!.nodeName).toBe('svg');
  });

  it('sets className', () => {
    render(<Icon icon={activity} className="my-icon-class" />);
    const element = document.querySelector('span');
    expect(element).toHaveClass('my-icon-class');
  });

  it('passes props', () => {
    render(<Icon icon={activity} id="Icon" data-test="test-attr" />);
    const element = document.querySelector('span');
    expect(element).toHaveAttribute('id', 'Icon');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        Icon: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Icon icon={activity} />
      </ThemeProvider>
    );

    const element = document.querySelector('span');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });

  describe('color', () => {
    it('defaults to currentColor', () => {
      render(<Icon icon={activity} />);
      const icon = document.querySelector('svg');
      const styles = getStylesForElement(icon!);
      expect(styles).toHaveProperty('stroke', 'currentColor');
    });

    it('sets indigo color', () => {
      render(<Icon icon={activity} color="indigo" />);
      const icon = document.querySelector('svg');
      const styles = getStylesForElement(icon!);
      expect(styles).toHaveProperty('stroke', MaevenTheme.colors.name.indigo);
    });

    it('sets danger color', () => {
      render(<Icon icon={activity} color="danger" />);
      const icon = document.querySelector('svg');
      const styles = getStylesForElement(icon!);
      expect(styles).toHaveProperty(
        'stroke',
        MaevenTheme.colors.semantic.danger
      );
    });
  });

  describe('fixedWidth', () => {
    it('has no fixed width by default', () => {
      render(<Icon icon={activity} />);
      const icon = document.querySelector('svg');
      const styles = getStylesForElement(icon!);
      expect(styles).not.toHaveProperty('width');
    });

    it('sets fixed width', () => {
      render(<Icon icon={activity} fixedWidth />);
      const icon = document.querySelector('svg');
      const styles = getStylesForElement(icon!);
      expect(styles).toHaveProperty('width', '1em');
    });
  });

  describe('inverted', () => {
    it('is not inverted by default', () => {
      render(<Icon icon={activity} />);
      const icon = document.querySelector('svg');
      const styles = getStylesForElement(icon!);
      expect(styles).toHaveProperty('stroke', 'currentColor');
      expect(styles).toHaveProperty('fill', 'none');
      const element = document.querySelector('span');
      const elementStyles = getStylesForElement(element!);
      expect(elementStyles).not.toHaveProperty('backgroundColor');
    });

    it('it sets inverted', () => {
      render(<Icon icon={activity} inverted />);
      const icon = document.querySelector('svg');
      const styles = getStylesForElement(icon!);
      expect(styles).toHaveProperty('stroke', MaevenTheme.colors.name.white);
      expect(styles).toHaveProperty('fill', 'none');
      const element = document.querySelector('span');
      const elementStyles = getStylesForElement(element!);
      expect(elementStyles).toHaveProperty('backgroundColor', 'currentColor');
    });
  });

  describe('size', () => {
    it('is 1em by default', () => {
      render(<Icon icon={activity} />);
      const element = document.querySelector('span');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('fontSize', '1em');
    });

    it('sets a size with number', () => {
      render(<Icon icon={activity} size={24} />);
      const element = document.querySelector('span');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('fontSize', 24);
    });

    it('sets a size with string', () => {
      render(<Icon icon={activity} size="3em" />);
      const element = document.querySelector('span');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('fontSize', '3em');
    });
  });

  describe('title', () => {
    it('has no title by default', () => {
      render(<Icon icon={activity} />);
      render(<Icon icon={imgIcon} />);
      const svgIcon = document.querySelector('svg');
      expect(svgIcon).not.toHaveAttribute('aria-label');
      const desc = document.querySelector('desc');
      expect(desc).not.toBeInTheDocument();
      const img = document.querySelector('img');
      expect(img).not.toHaveAttribute('alt');
    });

    it('sets title', () => {
      render(<Icon icon={activity} title="Activity" />);
      const svgIcon = document.querySelector('svg');
      expect(svgIcon).toHaveAttribute('aria-label', 'Activity');
    });

    it('sets title to desc on svg icon', () => {
      render(<Icon icon={activity} title="Activity" />);
      const desc = document.querySelector('desc');
      expect(desc).toHaveTextContent('Activity');
    });

    it('sets title on img icon', () => {
      render(<Icon icon={imgIcon} title="Img Icon" />);
      const img = document.querySelector('img');
      expect(img).toHaveAttribute('alt', 'Img Icon');
      expect(img).toHaveAttribute('aria-label', 'Img Icon');
    });
  });
});
