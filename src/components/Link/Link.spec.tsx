import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { Link } from './Link';
import { MaevenTheme } from '../..';

describe('Link', () => {
  afterEach(reinit);

  it('renders a element with given text', () => {
    render(<Link>My Link</Link>);
    const element = document.querySelector('a');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('My Link');
  });

  it('sets className', () => {
    render(<Link className="my-link-class">My Link</Link>);
    const element = document.querySelector('a');
    expect(element!.classList).toContain('my-link-class');
  });

  it('passes props', () => {
    render(
      <Link id="link" data-test="test-attr" href="#">
        My Link
      </Link>
    );
    const element = document.querySelector('a');
    expect(element!.id).toBe('link');
    expect(element!.dataset.test).toBe('test-attr');
    expect(element!.getAttribute('href')).toBe('#');
  });

  describe('color', () => {
    it("defaults to theme's link color", () => {
      render(<Link>Default Link</Link>);
      const element = document.querySelector('a');
      const styles = getStylesForElement(element!);
      expect(styles.color).toBe(MaevenTheme.colors.types.link);
    });

    it('sets the green color', () => {
      render(<Link color="green">Default Link</Link>);
      const element = document.querySelector('a');
      const styles = getStylesForElement(element!);
      expect(styles.color).toBe(MaevenTheme.colors.name.green);
    });

    it('sets the info color', () => {
      render(<Link color="info">Default Link</Link>);
      const element = document.querySelector('a');
      const styles = getStylesForElement(element!);
      expect(styles.color).toBe(MaevenTheme.colors.semantic.info);
    });
  });
});
