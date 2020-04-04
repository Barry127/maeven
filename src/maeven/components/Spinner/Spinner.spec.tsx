import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, act } from '@testing-library/react';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders spinner with given text', () => {
    render(<Spinner text="Hello world" />);
    const element = document.querySelector('.mvn-spinner');
    const svg = document.querySelector('svg');
    expect(element).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello world');
  });

  it('renders spinner with given text and children', () => {
    render(<Spinner text="Hello world">Content Text</Spinner>);
    const element = document.querySelector('.mvn-spinner');
    const content = document.querySelector('.mvn-spinner-content');
    const svg = document.querySelector('svg');
    expect(element).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello world');
    expect(content).toHaveTextContent('Content Text');
  });

  it('sets className', () => {
    render(<Spinner className="spinner-class" />);
    const element = document.querySelector('.mvn-spinner');
    expect(element).toHaveClass('spinner-class');
  });

  it('passes props', () => {
    render(<Spinner id="SpinnerId" data-test="spinner-data" />);
    const element = document.querySelector('.mvn-spinner') as HTMLDivElement;
    expect(element).toHaveAttribute('id', 'SpinnerId');
    expect(element.dataset.test).toBe('spinner-data');
  });

  describe('color', () => {
    it('sets pink color', () => {
      render(<Spinner color="pink" />);
      const element = document.querySelector('.mvn-spinner') as HTMLDivElement;
      expect(element).toHaveClass('mvn-text-color-pink');
    });

    it('sets primary color', () => {
      render(<Spinner color="primary" />);
      const element = document.querySelector('.mvn-spinner');
      expect(element).toHaveClass('mvn-text-color-primary');
    });
  });

  describe('delay', () => {
    let restoreSuppress: () => void;

    beforeAll(() => {
      restoreSuppress = suppressActError();
    });

    afterAll(() => {
      restoreSuppress();
    });

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('has no delay by default', () => {
      const { rerender } = render(<Spinner spinning={false}>Content</Spinner>);
      const spinner1 = document.querySelector('.mvn-spinner');
      expect(spinner1).not.toBeInTheDocument();

      rerender(<Spinner spinning={true}>Content</Spinner>);

      const spinner2 = document.querySelector('.mvn-spinner');
      expect(spinner2).toBeInTheDocument();
    });

    it('sets delay', async () => {
      const { rerender } = render(
        <Spinner delay={100} spinning={false}>
          Content
        </Spinner>
      );

      const spinner1 = document.querySelector('.mvn-spinner');
      expect(spinner1).not.toBeInTheDocument();

      rerender(
        <Spinner delay={100} spinning={true}>
          Content
        </Spinner>
      );

      const spinner2 = document.querySelector('.mvn-spinner');
      expect(spinner2).not.toBeInTheDocument();

      act(() => {
        jest.runAllTimers();
      });

      const spinner3 = document.querySelector('.mvn-spinner');
      expect(spinner3).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Spinner />);
      const element = document.querySelector('.mvn-spinner');
      expect(element).toHaveClass('mvn-spinner-md');
      expect(element).not.toHaveClass('mvn-spinner-sm');
      expect(element).not.toHaveClass('mvn-spinner-lg');
    });

    it('sets sm', () => {
      render(<Spinner size="sm" />);
      const element = document.querySelector('.mvn-spinner');
      expect(element).toHaveClass('mvn-spinner-sm');
      expect(element).not.toHaveClass('mvn-spinner-md');
      expect(element).not.toHaveClass('mvn-spinner-lg');
    });

    it('sets lg', () => {
      render(<Spinner size="lg" />);
      const element = document.querySelector('.mvn-spinner');
      expect(element).toHaveClass('mvn-spinner-lg');
      expect(element).not.toHaveClass('mvn-spinner-sm');
      expect(element).not.toHaveClass('mvn-spinner-md');
    });

    it('sets 100', () => {
      render(<Spinner size={100} />);
      const element = document.querySelector('.mvn-spinner');
      expect(element).not.toHaveClass('mvn-spinner-sm');
      expect(element).not.toHaveClass('mvn-spinner-md');
      expect(element).not.toHaveClass('mvn-spinner-lg');
      expect(element).toHaveAttribute('style', 'font-size: 100px;');
    });
  });

  describe('spinning', () => {
    it('is true by default', () => {
      render(<Spinner />);
      const element = document.querySelector('.mvn-spinner');
      expect(element).toBeInTheDocument();
    });

    it('sets false', () => {
      render(<Spinner spinning={false} />);
      const element = document.querySelector('.mvn-spinner');
      expect(element).not.toBeInTheDocument();
    });
  });
});

/** dirty hack to suppress error in delay tests:
 *
 * Warning: An update to Spinner inside a test was not wrapped in act(...).
 *
 * When testing, code that causes React state updates should be wrapped into act(...):
 *
 * The error sometimes pops up for lines with const { rerender } = render(...<Spinner />)
 * Tests run as expected if anyone knows a fix please make a PR.
 * hours wasted so far: 3
 **/
function suppressActError() {
  const original = console.error;
  global.console.error = (err: string) => {
    if (err.includes('test was not wrapped in act')) return;
    return original(err);
  };

  return () => {
    global.console.error = original;
  };
}
