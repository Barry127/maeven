import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { activity } from 'icon-packs/cjs/feather';
import { render, fireEvent } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';
import { color } from 'csx';

import { Button } from './Button';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

describe('Button', () => {
  afterEach(reinit);

  it('renders a button element with given text', () => {
    render(<Button>Click Me</Button>);
    const element = document.querySelector('button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Click Me');
  });

  it('sets className', () => {
    render(<Button className="my-button-class">Click Me</Button>);
    const element = document.querySelector('button');
    expect(element).toHaveClass('my-button-class');
  });

  it('passes props', () => {
    render(
      <Button id="Button" data-test="test-attr">
        Click Me
      </Button>
    );
    const element = document.querySelector('button');
    expect(element).toHaveAttribute('id', 'Button');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        Button: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Button>Click Me</Button>
      </ThemeProvider>
    );

    const element = document.querySelector('button');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });

  describe('active', () => {
    it('is not active by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty(
        'backgroundColor',
        MaevenTheme.colors.semantic.secondary
      );
      expect(styles).not.toHaveProperty('backgroundImage', 'none');
    });

    it('sets active', () => {
      render(<Button active>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty(
        'backgroundColor',
        color(MaevenTheme.colors.semantic.secondary)
          .darken(0.1)
          .toString()
      );
      expect(styles).toHaveProperty('backgroundImage', 'none');
    });

    it('does not set active when button is disabled', () => {
      render(
        <Button disabled active>
          Click Me
        </Button>
      );
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty(
        'backgroundColor',
        color(MaevenTheme.colors.semantic.secondary)
          .darken(0.1)
          .toString()
      );
    });
  });

  describe('color', () => {
    it('defaults to default / secondary style', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty(
        'backgroundColor',
        MaevenTheme.colors.semantic.secondary
      );
    });

    it('sets primary color', () => {
      render(<Button color="primary">Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty(
        'backgroundColor',
        MaevenTheme.colors.semantic.primary
      );
    });
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<Button disabled>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveAttribute('disabled');
    });

    it('does not handle onClick when disabled', () => {
      const onClick = jest.fn();
      render(
        <Button disabled onClick={onClick}>
          Click Me
        </Button>
      );
      const element = document.querySelector('button');
      fireEvent.click(element!);
      expect(onClick.mock.calls.length).toBe(0);
    });
  });

  describe('fluid', () => {
    it('is not fluid by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('display', 'inline-flex');
      expect(styles).not.toHaveProperty('width');
    });

    it('sets fluid', () => {
      render(<Button fluid>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('display', 'flex');
      expect(styles).toHaveProperty('width', '100%');
    });
  });

  describe('icon', () => {
    it('has no icon by default', () => {
      render(<Button>Click Me</Button>);
      const svg = document.querySelector('svg');
      const img = document.querySelector('img');
      expect(svg).not.toBeInTheDocument();
      expect(img).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<Button icon={activity}>Click Me</Button>);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('iconRight', () => {
    it('has no iconRight by default', () => {
      render(<Button>Click Me</Button>);
      const svg = document.querySelector('svg');
      const img = document.querySelector('img');
      expect(svg).not.toBeInTheDocument();
      expect(img).not.toBeInTheDocument();
    });

    it('sets iconRight', () => {
      render(<Button iconRight={activity}>Click Me</Button>);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('link', () => {
    it('is not styled as link by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty('color', MaevenTheme.colors.types.link);
    });

    it('styles link', () => {
      render(<Button link>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('color', MaevenTheme.colors.types.link);
    });
  });

  describe('outline', () => {
    it('is not outlined by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty(
        'backgroundColor',
        MaevenTheme.colors.types.background
      );
      expect(styles).not.toHaveProperty('backgroundImage', 'none');
    });

    it('sets outline', () => {
      render(<Button outline>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty(
        'backgroundColor',
        MaevenTheme.colors.types.background
      );
      expect(styles).toHaveProperty('backgroundImage', 'none');
    });

    it('sets primary colored outline', () => {
      render(
        <Button color="primary" outline>
          Click Me
        </Button>
      );
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty(
        'backgroundColor',
        MaevenTheme.colors.types.background
      );
      expect(styles).toHaveProperty('backgroundImage', 'none');
      expect(styles).toHaveProperty('color', MaevenTheme.colors.types.link);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('minHeight', MaevenTheme.base * 8);
    });

    it('sets sm', () => {
      render(<Button size="sm">Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('minHeight', MaevenTheme.base * 6);
    });

    it('sets lg', () => {
      render(<Button size="lg">Click Me</Button>);
      const element = document.querySelector('button');
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('minHeight', MaevenTheme.base * 12);
    });
  });

  describe('type', () => {
    it('is button by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveAttribute('type', 'button');
    });

    it('sets submit', () => {
      render(<Button type="submit">Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveAttribute('type', 'submit');
    });
  });
});
