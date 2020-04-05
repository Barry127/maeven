import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { Card, CardF } from './Card';
import { Card as ExportedCard } from './';

describe('Card', () => {
  it('renders div element with given text', () => {
    const { getByText } = render(<Card>Hello world!</Card>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('renders a main element', () => {
    const { getByText } = render(<Card element="main">Hello world!</Card>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('MAIN');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Card className="card-class">Hello world!</Card>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('card-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Card id="CardId" data-test="card-data">
        Hello world!
      </Card>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'CardId');
    expect(element.dataset.test).toBe('card-data');
  });

  describe('elevation', () => {
    it('has no elevation by default', () => {
      const { getByText } = render(<Card>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-card-elevation-2');
    });

    it('sets elevation', () => {
      const { getByText } = render(<Card elevation={2}>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-card-elevation-2');
    });
  });

  describe('interactive', () => {
    it('is not interactive by default', () => {
      const { getByText } = render(<Card>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-card-interactive');
      expect(element).not.toHaveAttribute('tabindex');
    });

    it('sets interactive', () => {
      const { getByText } = render(<Card interactive>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-card-interactive');
      expect(element).toHaveAttribute('tabindex', '0');
    });
  });

  describe('overlay', () => {
    it('has no overlay by default', () => {
      const { getByText } = render(<Card>Hello world!</Card>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-card-has-overlay');
    });

    it('sets overlay', () => {
      const { getByText } = render(
        <Card overlay={<h3>Overlay</h3>}>Hello world!</Card>
      );
      const element = getByText('Hello world!');
      const overlay = getByText('Overlay').parentElement;
      expect(element).toHaveClass('mvn-card-has-overlay');
      expect(overlay?.parentElement).toBe(element);
    });
  });

  describe('forwarding ref', () => {
    it('exports CardForwardRef', () => {
      expect(ExportedCard).toBe(CardF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLElement>();
      render(<CardF ref={ref} />);
      const element = document.querySelector('.mvn-card');
      expect(ref.current).toBe(element);
    });
  });
});
