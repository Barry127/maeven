import { fireEvent, render } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import { Button } from './Button';

describe('Button', () => {
  it('renders button element with given text', () => {
    render(<Button>Hello world!</Button>);
    const element = document.querySelector('.mvn--button');
    expect(element?.tagName).toBe('BUTTON');
  });

  it('sets className', () => {
    render(<Button className="button-class">Hello world!</Button>);
    const element = document.querySelector('.mvn--button');
    expect(element).toHaveClass('button-class');
  });

  it('passes props', () => {
    render(
      <Button id="ButtonId" data-test="button-data">
        Hello world!
      </Button>
    );
    const element = document.querySelector('.mvn--button');
    expect(element).toHaveAttribute('id', 'ButtonId');
    expect(element).toHaveAttribute('data-test', 'button-data');
  });

  describe('buttonType', () => {
    it('defaults to  default style', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveClass('default');
      expect(element).not.toHaveClass('primary');
      expect(element).not.toHaveClass('link');
    });

    it('sets primary color', () => {
      render(<Button buttonType="primary">Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveClass('primary');
    });

    it('sets link style', () => {
      render(<Button buttonType="link">Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveClass('link');
    });
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<Button disabled>Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveAttribute('disabled');
    });

    it('does not respond to onClick when disabled', () => {
      const onClick = jest.fn();
      render(
        <Button disabled onClick={onClick}>
          Click Me
        </Button>
      );
      const element = document.querySelector('.mvn--button');
      fireEvent.click(element!);
      expect(onClick.mock.calls.length).toBe(0);
    });
  });

  describe('fluid', () => {
    it('is not fluid by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).not.toHaveClass('fluid');
    });

    it('sets fluid', () => {
      render(<Button fluid>Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveClass('fluid');
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
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).not.toBeInTheDocument();
      const icon = document.querySelector('.mvn--icon');
      expect(icon).toBeInTheDocument();
    });

    it('sets loading', () => {
      render(<Button loading>Click Me</Button>);
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('is disabled when loading', () => {
      render(<Button loading>Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveAttribute('disabled');
    });

    it('hides (left) icon when loading', () => {
      render(
        <Button loading icon={activity}>
          Click Me
        </Button>
      );
      const icon = document.querySelector('.mvn--icon');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveClass('md');
      expect(element).not.toHaveClass('sm');
      expect(element).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<Button size="sm">Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<Button size="lg">Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveClass('lg');
    });
  });

  describe('type', () => {
    it('is button by default', () => {
      render(<Button>Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveAttribute('type', 'button');
    });

    it('sets submit', () => {
      render(<Button type="submit">Click Me</Button>);
      const element = document.querySelector('.mvn--button');
      expect(element).toHaveAttribute('type', 'submit');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref} />);
      const element = document.querySelector('.mvn--button');
      expect(ref.current).toBe(element);
    });
  });
});
