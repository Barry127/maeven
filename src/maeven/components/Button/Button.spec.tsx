import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';

import { Button, ButtonF } from './Button';
import { Button as ExportedButton } from './';

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

  describe('active', () => {
    it('is not active by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).not.toHaveClass('mvn-button-active');
    });

    it('sets active', () => {
      render(<Button active>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass('mvn-button-active');
    });

    it('does not set active when button is disabled', () => {
      render(
        <Button active disabled>
          Click Me
        </Button>
      );
      const element = document.querySelector('button');
      expect(element).not.toHaveClass('mvn-button-active');
    });
  });

  describe('buttonType', () => {
    it('defaults to  default style', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).not.toHaveClass('mvn-button-primary');
      expect(element).not.toHaveClass('mvn-button-link');
    });

    it('sets primary color', () => {
      render(<Button buttonType="primary">Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass('mvn-button-primary');
    });

    it('sets link style', () => {
      render(<Button buttonType="link">Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass('mvn-button-link');
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
      expect(element).not.toHaveClass('mvn-button-fluid');
    });

    it('sets fluid', () => {
      render(<Button fluid>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass('mvn-button-fluid');
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

  describe('loading', () => {
    it('is not loading by default', () => {
      render(<Button icon={activity}>Click Me</Button>);
      const spinner = document.querySelector('.mvn-spinner');
      expect(spinner).not.toBeInTheDocument();
      const icon = document.querySelector('.mvn-icon');
      expect(icon).toBeInTheDocument();
    });

    it('sets loading', () => {
      render(<Button loading>Click Me</Button>);
      const spinner = document.querySelector('.mvn-spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('is disabled when loading', () => {
      render(<Button loading>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveAttribute('disabled');
    });

    it('hides (left) icon when loading', () => {
      render(
        <Button loading icon={activity}>
          Click Me
        </Button>
      );
      const icon = document.querySelector('.mvn-icon');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).not.toHaveClass('mvn-button-sm');
      expect(element).not.toHaveClass('mvn-button-lg');
    });

    it('sets sm', () => {
      render(<Button size="sm">Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass('mvn-button-sm');
    });

    it('sets lg', () => {
      render(<Button size="lg">Click Me</Button>);
      const element = document.querySelector('button');
      expect(element).toHaveClass('mvn-button-lg');
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
      expect(ExportedButton).toBe(ButtonF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<ButtonF ref={ref} />);
      const element = document.querySelector('.mvn-button');
      expect(ref.current).toBe(element);
    });
  });
});
