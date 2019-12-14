import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { reinit, getStyles } from 'typestyle';
import { activity } from 'icon-packs/cjs/feather';
import { circleSolid } from 'icon-packs/cjs/fa';

import { MaevenDefault, ThemeProvider } from '../..';
import { MaevenIcon } from '../../types';

import { Icon } from './Icon';
import { classes, themeOverride } from './styles';

const imgIcon: MaevenIcon = {
  tag: 'img',
  attrs: {
    src: 'icon.jpg'
  }
};

describe('Icon', () => {
  afterEach(reinit);

  it('renders span element with icon', () => {
    render(<Icon icon={activity} />);
    const element = document.querySelector('span');
    expect(element).toBeInTheDocument();
    expect(element?.firstChild?.nodeName).toBe('svg');
  });

  it('sets className', () => {
    render(<Icon icon={activity} className="icon-class" />);
    const element = document.querySelector('span');
    expect(element).toHaveClass('icon-class');
  });

  it('passes props', () => {
    render(<Icon icon={activity} id="IconId" data-test="icon-data" />);
    const element = document.querySelector('span');
    expect(element).toHaveAttribute('id', 'IconId');
    expect(element?.dataset.test).toBe('icon-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Icon: {
          color: 'hotpink'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <Icon icon={activity} />
      </ThemeProvider>
    );
    const element = document.querySelector('span');
    expect(element).toHaveClass(expectedClassName);
  });

  describe('color', () => {
    it('defaults to currentColor', () => {
      // stroke
      render(<Icon icon={activity} />);
      // fill
      render(<Icon icon={circleSolid} />);
      const styles = getStyles();
      expect(styles).toContain('stroke:currentColor');
      expect(styles).toContain('fill:currentColor');
    });

    it('sets indigo color', () => {
      render(<Icon icon={activity} color="indigo" />);
      const styles = getStyles();
      expect(styles).toContain('stroke:var(--maeven-color-indigo)');
    });

    it('sets darGrey color', () => {
      render(<Icon icon={activity} color="darkGrey" />);
      const styles = getStyles();
      expect(styles).toContain('stroke:var(--maeven-color-dark-grey)');
    });

    it('sets danger color', () => {
      render(<Icon icon={circleSolid} color="danger" />);
      const styles = getStyles();
      expect(styles).toContain('fill:var(--maeven-color-danger)');
    });
  });

  describe('fixedWidth', () => {
    it('has no fixed width by default', () => {
      render(<Icon icon={activity} />);
      const icon = document.querySelector('svg');
      expect(icon).not.toHaveClass(classes.fixedWidth);
    });

    it('sets fixed width', () => {
      render(<Icon icon={activity} fixedWidth />);
      const icon = document.querySelector('svg');
      expect(icon).toHaveClass(classes.fixedWidth);
    });
  });

  describe('inverted', () => {
    it('is not inverted by default', () => {
      render(<Icon icon={activity} />);
      const styles = getStyles();
      expect(styles).not.toContain('background-color:currentColor');
      expect(styles).toContain('stroke:currentColor');
    });

    it('sets inverted', () => {
      // stroke
      render(<Icon icon={activity} inverted />);
      // fill
      render(<Icon icon={circleSolid} inverted />);
      const styles = getStyles();
      expect(styles).toContain('background-color:currentColor');
      expect(styles).toContain('stroke:var(--maeven-color-text-inverted)');
      expect(styles).toContain('fill:var(--maeven-color-text-inverted)');
    });

    it('sets inverted with a color', () => {
      render(<Icon icon={activity} inverted color="pink" />);
      const styles = getStyles();
      expect(styles).toContain('background-color:var(--maeven-color-pink)');
      expect(styles).toContain('stroke:var(--maeven-color-text-inverted)');
    });
  });

  describe('size', () => {
    it('is 1em by default', () => {
      render(<Icon icon={activity} />);
      const styles = getStyles();
      expect(styles).not.toContain('font-size');
    });

    it('sets size with a number', () => {
      render(<Icon icon={activity} size={24} />);
      const styles = getStyles();
      expect(styles).toContain('font-size:24px');
    });

    it('sets size with a string', () => {
      render(<Icon icon={activity} size="3em" />);
      const styles = getStyles();
      expect(styles).toContain('font-size:3em');
    });
  });

  describe('title', () => {
    it('has no title by default', () => {
      render(<Icon icon={activity} />);
      render(<Icon icon={imgIcon} />);
      const svgIcon = document.querySelector('svg');
      expect(svgIcon).not.toHaveAttribute('aria-label');
      const desc = document.querySelector('desc');
      expect(desc).not.toBeInTheDocument();
      const img = document.querySelector('img');
      expect(img).not.toHaveAttribute('alt');
      expect(img).not.toHaveAttribute('aria-label');
    });

    it('sets title on svg icon', () => {
      render(<Icon icon={activity} title="Activity" />);
      const svgIcon = document.querySelector('svg');
      expect(svgIcon).toHaveAttribute('aria-label', 'Activity');
    });

    it('sets title to desc on svg icon', () => {
      render(<Icon icon={activity} title="Activity" />);
      const desc = document.querySelector('desc');
      expect(desc).toHaveTextContent('Activity');
    });

    it('sets title on img icon', () => {
      render(<Icon icon={imgIcon} title="Img Icon" />);
      const img = document.querySelector('img');
      expect(img).toHaveAttribute('alt', 'Img Icon');
      expect(img).toHaveAttribute('aria-label', 'Img Icon');
    });
  });
});
