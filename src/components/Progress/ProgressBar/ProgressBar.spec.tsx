import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders div element', () => {
    render(<ProgressBar />);
    const element = document.querySelector('.mvn--progress-bar');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(<ProgressBar className="progress-bar-class" />);
    const element = document.querySelector('.mvn--progress-bar');
    expect(element).toHaveClass('progress-bar-class');
  });

  it('passes props', () => {
    render(<ProgressBar id="ProgressBarId" data-test="progress-bar-data" />);
    const element = document.querySelector('.mvn--progress-bar');
    expect(element).toHaveAttribute('id', 'ProgressBarId');
    expect(element).toHaveAttribute('data-test', 'progress-bar-data');
  });

  describe('active', () => {
    it('is not active by default', () => {
      render(<ProgressBar />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(element).not.toHaveClass('active');
    });

    it('sets active', () => {
      render(<ProgressBar active />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(element).toHaveClass('active');
    });
  });

  describe('color', () => {
    it('is primary by default', () => {
      render(<ProgressBar />);
      const bar = document.querySelector('.bar');
      expect(bar).toHaveClass('background-primary');
    });

    it('sets indigo  color', () => {
      render(<ProgressBar color="indigo" />);
      const bar = document.querySelector('.bar');
      expect(bar).toHaveClass('background-indigo');
    });

    it('set success color', () => {
      render(<ProgressBar color="success" />);
      const bar = document.querySelector('.bar');
      expect(bar).toHaveClass('background-success');
    });
  });

  describe('indeterminate', () => {
    it('is not indeterminate by default', () => {
      render(<ProgressBar value={50} />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(element).not.toHaveClass('indeterminate');
      expect(element).toHaveAttribute('aria-valuenow');
    });

    it('sets indeterminate', () => {
      render(<ProgressBar indeterminate />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(element).toHaveClass('indeterminate');
      expect(element).not.toHaveAttribute('aria-valuenow');
    });

    it('indeterminate overrides value', () => {
      render(<ProgressBar value={50} indeterminate />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(element).toHaveClass('indeterminate');
      expect(element).not.toHaveAttribute('aria-valuenow');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<ProgressBar />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(element).toHaveClass('md');
      expect(element).not.toHaveClass('sm');
      expect(element).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<ProgressBar size="sm" />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(element).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<ProgressBar size="lg" />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(element).toHaveClass('lg');
    });
  });

  describe('text', () => {
    it('has no text by default', () => {
      render(<ProgressBar />);
      const bar = document.querySelector('.bar');
      const track = document.querySelector('.track');
      expect(bar).toHaveTextContent('');
      expect(track).toHaveTextContent('');
    });

    it('sets text', () => {
      render(<ProgressBar text="Hello World" />);
      const bar = document.querySelector('.bar');
      const track = document.querySelector('.track');
      expect(bar).toHaveTextContent('Hello World');
      expect(track).toHaveTextContent('Hello World');
    });
  });

  describe('value', () => {
    it('sets value, min and max', () => {
      render(<ProgressBar min={1} max={3} value={2} />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(element).not.toHaveAttribute('aria-valuenow', 2);
      expect(element).not.toHaveAttribute('aria-valuemin', 1);
      expect(element).not.toHaveAttribute('aria-valuemax', 3);
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<ProgressBar ref={ref} />);
      const element = document.querySelector('.mvn--progress-bar');
      expect(ref.current).toBe(element);
    });
  });
});
