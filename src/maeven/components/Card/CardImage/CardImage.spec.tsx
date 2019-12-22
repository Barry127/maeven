import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../../..';

import { CardImage } from './CardImage';
import { themeOverride } from './styles';

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

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        CardImage: {
          border: '3px solid green'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <CardImage />
      </ThemeProvider>
    );
    const element = document.querySelector('img');
    expect(element).toHaveClass(expectedClassName);
  });
});
