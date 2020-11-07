import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { CardImage } from './CardImage';

describe('CardImage', () => {
  it('renders div element with given text', () => {
    render(<CardImage />);
    const element = document.querySelector('.mvn--card-image');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className on container', () => {
    render(<CardImage className="card-image-class" />);
    const element = document.querySelector('.mvn--card-image');
    expect(element).toHaveClass('card-image-class');
  });

  it('sets src', () => {
    render(<CardImage src="my-image.jpg" />);
    const element = document.querySelector('img');
    expect(element).toHaveAttribute('src', 'my-image.jpg');
  });

  it('passes props to image', () => {
    render(<CardImage id="CardImageId" data-test="card-image-data" />);
    const element = document.querySelector('.mvn--card-image img');
    expect(element).toHaveAttribute('id', 'CardImageId');
    expect(element).toHaveAttribute('data-test', 'card-image-data');
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLImageElement>();
      render(<CardImage ref={ref} />);
      const element = document.querySelector('.mvn--card-image img');
      expect(ref.current).toBe(element);
    });
  });
});
