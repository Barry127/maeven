import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { ProgressGauge } from './ProgressGauge';

describe('ProgressGauge', () => {
  it('renders div element with svg and given text', () => {
    render(<ProgressGauge value={0}>Hello world!</ProgressGauge>);
    const element = document.querySelector('.mvn--progress-gauge');
    expect(element?.tagName).toBe('DIV');
    expect(element).toHaveTextContent('Hello world!');
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('sets className', () => {
    render(
      <ProgressGauge className="progress-gauge-class">
        Hello world!
      </ProgressGauge>
    );
    const element = document.querySelector('.mvn--progress-gauge');
    expect(element).toHaveClass('progress-gauge-class');
  });

  it('passes props', () => {
    render(
      <ProgressGauge id="ProgressGaugeId" data-test="progress-gauge-data">
        Hello world!
      </ProgressGauge>
    );
    const element = document.querySelector('.mvn--progress-gauge');
    expect(element).toHaveAttribute('id', 'ProgressGaugeId');
    expect(element).toHaveAttribute('data-test', 'progress-gauge-data');
  });

  describe('color', () => {
    it('is primary by default', () => {
      render(<ProgressGauge />);
      const element = document.querySelector('.mvn--progress-gauge');
      expect(element).toHaveClass('primary');
    });

    it('sets indigo  color', () => {
      render(<ProgressGauge color="indigo" />);
      const element = document.querySelector('.mvn--progress-gauge');
      expect(element).toHaveClass('indigo');
    });

    it('set success color', () => {
      render(<ProgressGauge color="success" />);
      const element = document.querySelector('.mvn--progress-gauge');
      expect(element).toHaveClass('success');
    });
  });

  describe('size', () => {
    it('is 128px by default', () => {
      render(<ProgressGauge />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle('height: 128px');
      expect(svg).toHaveStyle('width: 128px');
    });

    it('sets 92px', () => {
      render(<ProgressGauge size={92} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle('height: 92px');
      expect(svg).toHaveStyle('width: 92px');
    });

    it('sets 16em', () => {
      render(<ProgressGauge size="16em" />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle('height: 16em');
      expect(svg).toHaveStyle('width: 16em');
    });
  });

  describe('value', () => {
    it('sets value, min and max', () => {
      render(<ProgressGauge min={1} max={3} value={2} />);
      const svg = document.querySelector('svg');
      expect(svg).not.toHaveAttribute('aria-valuenow', 2);
      expect(svg).not.toHaveAttribute('aria-valuemin', 1);
      expect(svg).not.toHaveAttribute('aria-valuemax', 3);
    });
  });

  describe('width', () => {
    it('is calculated by default', () => {
      render(<ProgressGauge />);
      const track = document.querySelector('.track');
      const bar = document.querySelector('.bar');
      expect(track).toHaveStyle('strokeWidth: calc(128 / 25)');
      expect(bar).toHaveStyle('strokeWidth: calc(128 / 25)');
    });

    it('sets width', () => {
      render(<ProgressGauge width={6} />);
      const track = document.querySelector('.track');
      const bar = document.querySelector('.bar');
      expect(track).toHaveStyle('strokeWidth: 6');
      expect(bar).toHaveStyle('strokeWidth: 6');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<ProgressGauge ref={ref} />);
      const element = document.querySelector('.mvn--progress-gauge');
      expect(ref.current).toBe(element);
    });
  });
});
