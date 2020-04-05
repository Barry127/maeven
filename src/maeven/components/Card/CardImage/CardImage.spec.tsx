import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { CardImage, CardImageF } from './CardImage';
import { CardImage as ExportedCardImage } from '../';

describe('CardImage', () => {
  it('renders image', () => {
    render(<CardImage />);
    const element = document.querySelector('img');
    expect(element).toBeInTheDocument();
  });

  it('sets className', () => {
    render(<CardImage className="cardimage-class" />);
    const element = document.querySelector('img');
    expect(element).toHaveClass('cardimage-class');
  });

  it('sets src', () => {
    render(<CardImage src="my-image.jpg" />);
    const element = document.querySelector('img');
    expect(element).toHaveAttribute('src', 'my-image.jpg');
  });

  it('passes props', () => {
    render(<CardImage id="CardImageId" data-test="cardimage-data" />);
    const element = document.querySelector('img');
    expect(element).toHaveAttribute('id', 'CardImageId');
    expect(element?.dataset.test).toBe('cardimage-data');
  });

  describe('forwarding ref', () => {
    it('exports CardImageForwardRef', () => {
      expect(ExportedCardImage).toBe(CardImageF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLImageElement>();
      render(<CardImageF ref={ref} />);
      const element = document.querySelector('img');
      expect(ref.current).toBe(element);
    });
  });
});
