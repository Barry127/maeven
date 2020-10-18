import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { H4 } from './Html';

describe('H4', () => {
  it('renders an h4 element with given text', () => {
    render(<H4>Hello World!</H4>);
    const element = document.querySelector('h4');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H4 className="h4-class">Hello World!</H4>);
    const element = document.querySelector('h4');
    expect(element).toHaveClass('h4-class');
  });

  it('passes props', () => {
    render(
      <H4 id="H4Id" data-test="h4-data">
        Hello World!
      </H4>
    );
    const element = document.querySelector('h4');
    expect(element).toHaveAttribute('id', 'H4Id');
    expect(element!.dataset.test).toBe('h4-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<H4 ref={ref} />);
      const element = document.querySelector('h4');
      expect(ref.current).toBe(element);
    });
  });
});
