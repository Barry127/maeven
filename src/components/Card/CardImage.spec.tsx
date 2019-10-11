import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { CardImage } from './CardImage';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

describe('CardImage', () => {
  afterEach(reinit);

  it('renders image', () => {
    render(<CardImage />);
    const element = document.querySelector('img');
    expect(element!).toBeInTheDocument();
  });

  it('sets className', () => {
    render(<CardImage className="my-card-image-class" />);
    const element = document.querySelector('img');
    expect(element).toHaveClass('my-card-image-class');
  });

  it('sets src', () => {
    render(<CardImage src="my-image.jpg" />);
    const element = document.querySelector('img');
    expect(element).toHaveAttribute('src', 'my-image.jpg');
  });

  it('passes props', () => {
    render(<CardImage id="cardImage" data-test="test-attr" />);
    const element = document.querySelector('img');
    expect(element).toHaveAttribute('id', 'cardImage');
    expect(element).toHaveAttribute('data-test', 'test-attr');
  });

  it('styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        CardImage: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <CardImage />
      </ThemeProvider>
    );

    const element = document.querySelector('img');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});
