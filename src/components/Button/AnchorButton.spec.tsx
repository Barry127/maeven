import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { AnchorButton } from './AnchorButton';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

describe('AnchorButton', () => {
  it('renders an anchor element with given text', () => {
    render(<AnchorButton>Click Me</AnchorButton>);
    const element = document.querySelector('a');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Click Me');
  });

  it('sets className', () => {
    render(
      <AnchorButton className="my-anchor-button-class">Click Me</AnchorButton>
    );
    const element = document.querySelector('a');
    expect(element).toHaveClass('my-anchor-button-class');
  });

  it('passes props', () => {
    render(
      <AnchorButton href="#" id="Anchor" data-test="test-attr">
        Click Me
      </AnchorButton>
    );
    const element = document.querySelector('a');
    expect(element).toHaveAttribute('href', '#');
    expect(element).toHaveAttribute('id', 'Anchor');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        AnchorButton: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <AnchorButton>Click Me</AnchorButton>
      </ThemeProvider>
    );

    const element = document.querySelector('a');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<AnchorButton>Click Me</AnchorButton>);
      const element = document.querySelector('a');
      expect(element).not.toHaveAttribute('tab-index');
    });

    it('sets disabled', () => {
      render(<AnchorButton disabled>Click Me</AnchorButton>);
      const element = document.querySelector('a');
      expect(element).not.toHaveAttribute('tab-index', -1);
      const styles = getStylesForElement(element!);
      expect(styles).toHaveProperty('pointerEvents', 'none');
    });
  });
});
