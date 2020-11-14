import { render } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renders an input element and sets child text', () => {
    render(<TextInput>Hello world!</TextInput>);
    const container = document.querySelector('.mvn--text-input');
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<TextInput className="text-input-class">Hello world!</TextInput>);
    const element = document.querySelector('.mvn--text-input');
    expect(element).toHaveClass('text-input-class');
  });

  it('passes props', () => {
    render(
      <TextInput id="TextInputId" data-test="text-input-data">
        Hello world!
      </TextInput>
    );
    const element = document.querySelector('.mvn--text-input input');
    expect(element).toHaveAttribute('id', 'TextInputId');
    expect(element).toHaveAttribute('data-test', 'text-input-data');
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<TextInput />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<TextInput disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<TextInput />);
      const container = document.querySelector('.mvn--text-input');
      expect(container).not.toHaveClass('has-error');
    });

    it('sets error styling', () => {
      render(<TextInput hasError>Error Text</TextInput>);
      const container = document.querySelector('.mvn--text-input');
      expect(container).toHaveClass('has-error');
    });
  });

  describe('icons', () => {
    it('has no icon by default', () => {
      render(<TextInput />);
      const container = document.querySelector('.mvn--text-input');
      expect(container).not.toHaveClass('has-left-icon');
      expect(container).not.toHaveClass('has-right-icon');

      const svg = document.querySelector('svg');
      const img = document.querySelector('img');
      expect(svg).not.toBeInTheDocument();
      expect(img).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<TextInput icon={activity} />);
      const container = document.querySelector('.mvn--text-input');
      expect(container).toHaveClass('has-left-icon');
      expect(container).not.toHaveClass('has-right-icon');

      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(1);
    });

    it('sets iconRight', () => {
      render(<TextInput iconRight={activity} />);
      const container = document.querySelector('.mvn--text-input');
      expect(container).not.toHaveClass('has-left-icon');
      expect(container).toHaveClass('has-right-icon');

      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(1);
    });
  });

  describe('label', () => {
    it('has no aria-describedby by default', () => {
      render(<TextInput />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('sets aria-describedby by when input has a label', () => {
      render(<TextInput label="Label" />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('aria-describedby');
    });
  });

  describe('loading', () => {
    it('is not loading by default', () => {
      render(<TextInput iconRight={activity} />);
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).not.toBeInTheDocument();
      const icon = document.querySelector('.mvn--icon');
      expect(icon).toBeInTheDocument();
    });

    it('sets loading', () => {
      render(<TextInput loading />);
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('hides (right) icon when loading', () => {
      render(<TextInput loading iconRight={activity} />);
      const icon = document.querySelector('.mvn--icon');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('rightElement', () => {
    it('has no right element by default', () => {
      render(<TextInput />);
      const rightElementContainer = document.querySelector('.right-element');
      const input = document.querySelector('input');
      expect(rightElementContainer).not.toBeInTheDocument();
      expect(input).not.toHaveAttribute('style');
    });

    it('sets right element', () => {
      render(<TextInput rightElement={<button>Click Me</button>} />);
      const rightElementContainer = document.querySelector('.right-element');
      const button = document.querySelector('button');
      expect(rightElementContainer).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<TextInput />);
      const container = document.querySelector('.mvn--text-input');
      expect(container).toHaveClass('md');
      expect(container).not.toHaveClass('sm');
      expect(container).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<TextInput size="sm" />);
      const container = document.querySelector('.mvn--text-input');
      expect(container).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<TextInput size="lg" />);
      const container = document.querySelector('.mvn--text-input');
      expect(container).toHaveClass('lg');
    });
  });

  describe('type', () => {
    it('is text by default', () => {
      render(<TextInput />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('sets password type', () => {
      render(<TextInput type="password" />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TextInput ref={ref} />);
      const element = document.querySelector('.mvn--text-input input');
      expect(ref.current).toBe(element);
    });
  });
});
