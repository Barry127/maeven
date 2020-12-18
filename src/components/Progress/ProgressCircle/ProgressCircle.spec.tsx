import { act, render } from '@testing-library/react';
import React, { createRef } from 'react';
import { ProgressCircle } from './ProgressCircle';

describe('ProgressCircle', () => {
  it('renders div element with svg and given text', () => {
    render(<ProgressCircle value={0}>Hello world!</ProgressCircle>);
    const element = document.querySelector('.mvn--progress-circle');
    expect(element?.tagName).toBe('DIV');
    expect(element).toHaveTextContent('Hello world!');
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('sets className', () => {
    render(
      <ProgressCircle className="progress-circle-class">
        Hello world!
      </ProgressCircle>
    );
    const element = document.querySelector('.mvn--progress-circle');
    expect(element).toHaveClass('progress-circle-class');
  });

  it('passes props', () => {
    render(
      <ProgressCircle id="ProgressCircleId" data-test="progress-circle-data">
        Hello world!
      </ProgressCircle>
    );
    const element = document.querySelector('.mvn--progress-circle');
    expect(element).toHaveAttribute('id', 'ProgressCircleId');
    expect(element).toHaveAttribute('data-test', 'progress-circle-data');
  });

  describe('color', () => {
    it('is primary by default', () => {
      render(<ProgressCircle />);
      const element = document.querySelector('.mvn--progress-circle');
      expect(element).toHaveClass('primary');
    });

    it('sets indigo  color', () => {
      render(<ProgressCircle color="indigo" />);
      const element = document.querySelector('.mvn--progress-circle');
      expect(element).toHaveClass('indigo');
    });

    it('set success color', () => {
      render(<ProgressCircle color="success" />);
      const element = document.querySelector('.mvn--progress-circle');
      expect(element).toHaveClass('success');
    });
  });

  describe('indeterminate', () => {
    it('is not indeterminate by default', () => {
      render(<ProgressCircle value={50} />);
      const element = document.querySelector('.mvn--progress-circle');
      const svg = document.querySelector('svg');
      expect(element).not.toHaveClass('indeterminate');
      expect(svg).toHaveAttribute('aria-valuenow');
    });

    it('sets indeterminate', () => {
      jest.useFakeTimers();
      render(<ProgressCircle indeterminate />);
      const element = document.querySelector('.mvn--progress-circle');
      act(() => {
        jest.runAllTimers();
      });
      act(() => {
        jest.runAllTimers();
      });
      const svg = document.querySelector('svg');
      expect(element).toHaveClass('indeterminate');
      expect(svg).not.toHaveAttribute('aria-valuenow');
    });

    it('indeterminate overrides value', () => {
      render(<ProgressCircle value={50} indeterminate />);
      const element = document.querySelector('.mvn--progress-circle');
      const svg = document.querySelector('svg');
      expect(element).toHaveClass('indeterminate');
      expect(svg).not.toHaveAttribute('aria-valuenow');
    });
  });

  describe('size', () => {
    it('is 128px by default', () => {
      render(<ProgressCircle />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle('height: 128px');
      expect(svg).toHaveStyle('width: 128px');
    });

    it('sets 92px', () => {
      render(<ProgressCircle size={92} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle('height: 92px');
      expect(svg).toHaveStyle('width: 92px');
    });

    it('sets 16em', () => {
      render(<ProgressCircle size="16em" />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle('height: 16em');
      expect(svg).toHaveStyle('width: 16em');
    });
  });

  describe('value', () => {
    it('sets value, min and max', () => {
      render(<ProgressCircle min={1} max={3} value={2} />);
      const svg = document.querySelector('svg');
      expect(svg).not.toHaveAttribute('aria-valuenow', 2);
      expect(svg).not.toHaveAttribute('aria-valuemin', 1);
      expect(svg).not.toHaveAttribute('aria-valuemax', 3);
    });
  });

  describe('width', () => {
    it('is calculated by default', () => {
      render(<ProgressCircle />);
      const track = document.querySelector('.track');
      const bar = document.querySelector('.bar');
      expect(track).toHaveStyle('strokeWidth: calc(128 / 25)');
      expect(bar).toHaveStyle('strokeWidth: calc(128 / 25)');
    });

    it('sets width', () => {
      render(<ProgressCircle width={6} />);
      const track = document.querySelector('.track');
      const bar = document.querySelector('.bar');
      expect(track).toHaveStyle('strokeWidth: 6');
      expect(bar).toHaveStyle('strokeWidth: 6');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<ProgressCircle ref={ref} />);
      const element = document.querySelector('.mvn--progress-circle');
      expect(ref.current).toBe(element);
    });
  });
});
