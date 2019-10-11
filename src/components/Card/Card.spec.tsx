import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { Card } from './Card';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

describe('Card', () => {
  afterEach(reinit);

  it('renders div element with given children', () => {
    render(<Card id="card">My Card</Card>);
    const element = document.getElementById('card');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('My Card');
  });

  it('sets className', () => {
    render(
      <Card id="card" className="my-card-class">
        My Card
      </Card>
    );
    const element = document.getElementById('card');
    expect(element).toHaveClass('my-card-class');
  });

  it('passes props', () => {
    render(
      <Card id="card" data-test="test-attr">
        My Card
      </Card>
    );
    const element = document.getElementById('card');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        Card: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Card id="card">My Card</Card>
      </ThemeProvider>
    );

    const element = document.getElementById('card');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });

  describe('elevation', () => {
    it('has no elevation by default', () => {
      render(<Card id="card">My Card</Card>);
      const element = document.getElementById('card');
      const styles = getStylesForElement(element!);
      expect(styles.boxShadow).toBe('none');
    });

    it('sets elevation', () => {
      render(
        <Card id="card" elevation={2}>
          My Card
        </Card>
      );
      const element = document.getElementById('card');
      const styles = getStylesForElement(element!);
      expect(styles.boxShadow).not.toBe('none');
    });
  });

  describe('interactive', () => {
    it('is not interactive by default', () => {
      render(<Card id="card">My Card</Card>);
      const element = document.getElementById('card');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty('$nest.&:hover');
      expect(element).not.toHaveAttribute('tabindex');
    });

    it('sets interactive', () => {
      render(
        <Card id="card" interactive>
          My Card
        </Card>
      );
      const element = document.getElementById('card');
      const styles = getStylesForElement(element!);
      expect(styles.cursor).toBe('pointer');
      expect(styles).toHaveProperty('$nest.&:hover');
      expect(element).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('onClick', () => {
    it('handles onClick handler', () => {
      const onClick = jest.fn();
      render(
        <Card id="card" onClick={onClick}>
          My Card
        </Card>
      );
      const element = document.getElementById('card');
      fireEvent.click(element!);
      expect(onClick.mock.calls).toHaveLength(1);
    });
  });

  describe('overlay', () => {
    it('has no overlay by default', () => {
      render(<Card id="card">My Card</Card>);
      const overlayElement = document.querySelector('#card > div');
      expect(overlayElement).not.toBeInTheDocument();
    });

    it('sets overlay', () => {
      render(
        <Card id="card" overlay={<h3>Overlay</h3>}>
          My Card
        </Card>
      );
      const overlayElement = document.querySelector('#card > div');
      expect(overlayElement).toBeInTheDocument();
      expect(overlayElement).toHaveTextContent('Overlay');
      const styles = getStylesForElement(overlayElement!);

      expect(styles.opacity).toBe(0);
      expect(styles).toHaveProperty('$nest.&:hover.opacity', 1);
    });
  });
});
