import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { Card } from './Card';

describe('Card', () => {
  it('renders div element with given text', () => {
    render(<Card>Hello world!</Card>);
    const element = document.querySelector('.mvn--card');
    expect(element?.tagName).toBe('DIV');
  });

  it('renders a main element', () => {
    render(<Card element="main">Hello world!</Card>);
    const element = document.querySelector('.mvn--card');
    expect(element?.tagName).toBe('MAIN');
  });

  it('sets className', () => {
    render(<Card className="card-class">Hello world!</Card>);
    const element = document.querySelector('.mvn--card');
    expect(element).toHaveClass('card-class');
  });

  it('passes props', () => {
    render(
      <Card id="CardId" data-test="card-data">
        Hello world!
      </Card>
    );
    const element = document.querySelector('.mvn--card');
    expect(element).toHaveAttribute('id', 'CardId');
    expect(element).toHaveAttribute('data-test', 'card-data');
  });

  describe('elevation', () => {
    it('has no elevation by default', () => {
      render(<Card>Hello world!</Card>);
      const element = document.querySelector('.mvn--card');
      expect(element).not.toHaveClass('elevation-2');
    });

    it('sets elevation', () => {
      render(<Card elevation={2}>Hello world!</Card>);
      const element = document.querySelector('.mvn--card');
      expect(element).toHaveClass('elevation-2');
    });
  });

  describe('interactive', () => {
    it('is not interactive by default', () => {
      render(<Card>Hello world!</Card>);
      const element = document.querySelector('.mvn--card');
      expect(element).not.toHaveClass('interactive');
      expect(element).not.toHaveAttribute('tabindex');
    });

    it('sets interactive', () => {
      render(<Card interactive>Hello world!</Card>);
      const element = document.querySelector('.mvn--card');
      expect(element).toHaveClass('interactive');
      expect(element).toHaveAttribute('tabindex', '0');
    });
  });

  describe('overlay', () => {
    it('has no overlay by default', () => {
      render(<Card>Hello world!</Card>);
      const element = document.querySelector('.mvn--card');
      expect(element).not.toHaveClass('has-overlay');
    });

    it('sets overlay', () => {
      render(<Card overlay={<h3>Overlay</h3>}>Hello world!</Card>);
      const element = document.querySelector('.mvn--card');
      const overlay = document.querySelector('.overlay');
      expect(element).toHaveClass('has-overlay');
      expect(overlay?.parentElement).toBe(element);
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref} />);
      const element = document.querySelector('.mvn--card');
      expect(ref.current).toBe(element);
    });
  });
});
