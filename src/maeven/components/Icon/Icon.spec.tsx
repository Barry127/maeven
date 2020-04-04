import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';
import { circleSolid } from 'icon-packs/cjs/fa';

import { MaevenIcon } from '../../types';

import { Icon, IconF } from './Icon';
import { Icon as ExportedIcon } from './';

const imgIcon: MaevenIcon = {
  tag: 'img',
  attrs: {
    src: 'icon.jpg'
  }
};

describe('Icon', () => {
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

  describe('color', () => {
    it('sets indigo color', () => {
      render(<Icon icon={activity} color="indigo" />);
      const container = document.querySelector('span');
      expect(container).toHaveClass('mvn-text-color-indigo');
    });

    it('sets darGrey color', () => {
      render(<Icon icon={activity} color="darkGrey" />);
      const container = document.querySelector('span');
      expect(container).toHaveClass('mvn-text-color-darkGrey');
    });

    it('sets danger color', () => {
      render(<Icon icon={circleSolid} color="danger" />);
      const container = document.querySelector('span');
      expect(container).toHaveClass('mvn-text-color-danger');
    });
  });

  describe('fixedWidth', () => {
    it('has no fixed width by default', () => {
      render(<Icon icon={activity} />);
      const icon = document.querySelector('svg');
      expect(icon).not.toHaveClass('mvn-icon-fw');
    });

    it('sets fixed width', () => {
      render(<Icon icon={activity} fixedWidth />);
      const icon = document.querySelector('svg');
      expect(icon).toHaveClass('mvn-icon-fw');
    });
  });

  describe('size', () => {
    it('is 1em by default', () => {
      render(<Icon icon={activity} />);
      const container = document.querySelector('span');
      expect(container).toHaveStyle('font-size:1em');
    });

    it('sets size with a number', () => {
      render(<Icon icon={activity} size={24} />);
      const container = document.querySelector('span');
      expect(container).toHaveStyle('font-size:24px');
    });

    it('sets size with a string', () => {
      render(<Icon icon={activity} size="3em" />);
      const container = document.querySelector('span');
      expect(container).toHaveStyle('font-size:3em');
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

  describe('forwarding ref', () => {
    it('exports IconForwardRef', () => {
      expect(ExportedIcon).toBe(IconF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<IconF icon={activity} ref={ref} />);
      const element = document.querySelector('span');
      expect(ref.current).toBe(element);
    });
  });
});
