import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';

import { MaevenDefault, ThemeProvider } from '../..';

import { Button, ButtonForwardRef } from './Button';
import { Button as ExportedButton } from './';
import { classes, themeOverride } from './styles';

describe('Button', () => {
  it('renders button element with given text', () => {
    render(<Button>Click Me</Button>);
    const element = document.querySelector('button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Click Me');
  });

  it('sets className', () => {
    render(<Button className="button-class">Click Me</Button>);
    const element = document.querySelector('button');
    expect(element).toHaveClass('button-class');
  });

  it('passes props', () => {
    render(
      <Button id="ButtonId" data-test="button-data">
        Click Me
      </Button>
    );
    const element = document.querySelector('button');
    expect(element).toHaveAttribute('id', 'ButtonId');
    expect(element?.dataset.test).toBe('button-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Button: {
          color: 'navy'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <Button>Click Me</Button>
      </ThemeProvider>
    );
    const element = document.querySelector('button');
    expect(element).toHaveClass(expectedClassName);
  });

  describe('active', () => {
    it('is not active by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).not.toHaveClass(classes.active);
    });

    it('sets active', () => {
      render(<Button active>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass(classes.active);
    });

    it('does not set active when button is disabled', () => {
      render(
        <Button active disabled>
          Click Me
        </Button>
      );
      const element = document.querySelector('button');
      expect(element).not.toHaveClass(classes.active);
    });
  });

  describe('buttonType', () => {
    it('defaults to  default style', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass(classes.buttonTypes.default);
    });

    it('sets primary color', () => {
      render(<Button buttonType="primary">Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass(classes.buttonTypes.primary);
    });

    it('sets link style', () => {
      render(<Button buttonType="link">Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass(classes.buttonTypes.link);
    });
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).not.toHaveClass(classes.disabled);
      expect(element).not.toHaveAttribute('disabled');
    });

    it('sets and styles disabled', () => {
      render(<Button disabled>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass(classes.disabled);
      expect(element).toHaveAttribute('disabled');
    });

    it('does not respond to onClick when disabled', () => {
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
      expect(element).not.toHaveClass(classes.fluid);
    });

    it('sets fluid', () => {
      render(<Button fluid>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass(classes.fluid);
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
    it('has no right icon by default', () => {
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

  describe('outline', () => {
    it('is not outlined by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).not.toHaveClass(classes.outline);
    });

    it('sets outline', () => {
      render(<Button outline>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass(classes.outline);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).not.toHaveClass(classes.sm);
      expect(element).not.toHaveClass(classes.lg);
    });

    it('sets sm', () => {
      render(<Button size="sm">Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass(classes.sm);
    });

    it('sets lg', () => {
      render(<Button size="lg">Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass(classes.lg);
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

  describe('forwarding ref', () => {
    it('exports ButtonForwardRef', () => {
      expect(ExportedButton).toBe(ButtonForwardRef);
    });

    it('sets ref', () => {
      let ref = createRef<HTMLButtonElement>();

      render(<ButtonForwardRef ref={ref}>Click Me</ButtonForwardRef>);
      const element = document.querySelector('button');

      expect(ref.current).toBe(element);
    });
  });
});
