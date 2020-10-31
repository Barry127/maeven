import { act, render } from '@testing-library/react';
import React, { createRef } from 'react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders div element with given text', () => {
    render(<Spinner text="Hello World" />);
    const element = document.querySelector('.mvn--spinner');
    const svg = document.querySelector('svg');
    expect(element).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World');
  });

  it('renders spinner with given text and children', () => {
    render(<Spinner text="Hello world">Content Text</Spinner>);
    const element = document.querySelector('.mvn--spinner');
    const content = document.querySelector('.content');
    const svg = document.querySelector('svg');
    expect(element).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello world');
    expect(content).toHaveTextContent('Content Text');
  });

  it('sets className', () => {
    render(<Spinner className="spinner-class" />);
    const element = document.querySelector('.mvn--spinner');
    expect(element).toHaveClass('spinner-class');
  });

  it('passes props', () => {
    render(<Spinner id="SpinnerId" data-test="spinner-data" />);
    const element = document.querySelector('.mvn--spinner');
    expect(element).toHaveAttribute('id', 'SpinnerId');
    expect(element).toHaveAttribute('data-test', 'spinner-data');
  });

  describe('color', () => {
    it('sets pink color', () => {
      render(<Spinner color="pink" />);
      const element = document.querySelector('.mvn--spinner');
      expect(element).toHaveClass('text-pink');
    });

    it('sets primary color', () => {
      render(<Spinner color="primary" />);
      const element = document.querySelector('.mvn--spinner');
      expect(element).toHaveClass('text-primary');
    });
  });

  describe('delay', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('has no delay by default', () => {
      const { rerender } = render(<Spinner spinning={false}>Content</Spinner>);
      const spinner1 = document.querySelector('.mvn--spinner');
      expect(spinner1).not.toBeInTheDocument();

      rerender(<Spinner spinning={true}>Content</Spinner>);

      const spinner2 = document.querySelector('.mvn--spinner');
      expect(spinner2).toBeInTheDocument();
    });

    it('sets delay', async () => {
      const { rerender } = render(
        <Spinner delay={100} spinning={false}>
          Content
        </Spinner>
      );

      const spinner1 = document.querySelector('.mvn--spinner');
      expect(spinner1).not.toBeInTheDocument();

      rerender(
        <Spinner delay={100} spinning={true}>
          Content
        </Spinner>
      );

      const spinner2 = document.querySelector('.mvn--spinner');
      expect(spinner2).not.toBeInTheDocument();

      act(() => {
        jest.runAllTimers();
      });

      const spinner3 = document.querySelector('.mvn--spinner');
      expect(spinner3).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('is 1.5em by default', () => {
      render(<Spinner text="Hello World" />);
      const element = document.querySelector('.mvn--spinner');
      expect(element).toHaveStyle('font-size:1.5em');
    });

    it('sets size with a number', () => {
      render(<Spinner text="Hello World" size={24} />);
      const element = document.querySelector('.mvn--spinner');
      expect(element).toHaveStyle('font-size:24px');
    });

    it('sets size with a string', () => {
      render(<Spinner text="Hello World" size="3em" />);
      const element = document.querySelector('.mvn--spinner');
      expect(element).toHaveStyle('font-size:3em');
    });
  });

  describe('spinning', () => {
    it('is true by default', () => {
      render(<Spinner />);
      const element = document.querySelector('.mvn--spinner');
      expect(element).toBeInTheDocument();
    });

    it('sets false', () => {
      render(<Spinner spinning={false} />);
      const element = document.querySelector('.mvn--spinner');
      expect(element).not.toBeInTheDocument();
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Spinner ref={ref} />);
      const element = document.querySelector('.mvn--spinner');
      expect(ref.current).toBe(element);
    });
  });
});
