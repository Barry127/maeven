import { render } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders an input element and sets child text', () => {
    render(<Toggle>Hello world!</Toggle>);
    const container = document.querySelector('.mvn--toggle');
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<Toggle className="toggle-class">Hello world!</Toggle>);
    const element = document.querySelector('.mvn--toggle');
    expect(element).toHaveClass('toggle-class');
  });

  it('passes props', () => {
    render(
      <Toggle id="ToggleId" data-test="toggle-data">
        Hello world!
      </Toggle>
    );
    const element = document.querySelector('input');
    expect(element).toHaveAttribute('id', 'ToggleId');
    expect(element).toHaveAttribute('data-test', 'toggle-data');
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<Toggle />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<Toggle disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('icons', () => {
    it('has no icon by default', () => {
      render(<Toggle />);
      const svg = document.querySelector('svg');
      const img = document.querySelector('img');
      expect(svg).not.toBeInTheDocument();
      expect(img).not.toBeInTheDocument();
    });

    it('sets offIcon', () => {
      render(<Toggle offIcon={activity} />);
      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(1);
    });

    it('sets onIcon', () => {
      render(<Toggle onIcon={activity} />);
      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(1);
    });

    it('sets both icons', () => {
      render(<Toggle offIcon={activity} onIcon={activity} />);
      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(2);
    });
  });

  describe('label', () => {
    it('has no aria-describedby by default', () => {
      render(<Toggle />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('sets aria-describedby by when input has a label', () => {
      render(<Toggle label="Label" />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('aria-describedby');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Toggle />);
      const container = document.querySelector('.mvn--toggle');
      expect(container).toHaveClass('md');
      expect(container).not.toHaveClass('sm');
      expect(container).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<Toggle size="sm" />);
      const container = document.querySelector('.mvn--toggle');
      expect(container).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<Toggle size="lg" />);
      const container = document.querySelector('.mvn--toggle');
      expect(container).toHaveClass('lg');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Toggle ref={ref} />);
      const element = document.querySelector('input');
      expect(ref.current).toBe(element);
    });
  });
});
