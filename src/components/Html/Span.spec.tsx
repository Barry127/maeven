import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { Span } from './Html';

describe('Span', () => {
  it('renders an Span element with given text', () => {
    render(<Span>Hello World!</Span>);
    const element = document.querySelector('span');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<Span className="span-class">Hello World!</Span>);
    const element = document.querySelector('span');
    expect(element).toHaveClass('span-class');
  });

  it('passes props', () => {
    render(
      <Span id="SpanId" data-test="span-data">
        Hello World!
      </Span>
    );
    const element = document.querySelector('span');
    expect(element).toHaveAttribute('id', 'SpanId');
    expect(element!.dataset.test).toBe('span-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Span ref={ref} />);
      const element = document.querySelector('span');
      expect(ref.current).toBe(element);
    });
  });
});
