import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { H3 } from './Html';

describe('H3', () => {
  it('renders an h3 element with given text', () => {
    render(<H3>Hello World!</H3>);
    const element = document.querySelector('h3');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H3 className="h3-class">Hello World!</H3>);
    const element = document.querySelector('h3');
    expect(element).toHaveClass('h3-class');
  });

  it('passes props', () => {
    render(
      <H3 id="H3Id" data-test="h3-data">
        Hello World!
      </H3>
    );
    const element = document.querySelector('h3');
    expect(element).toHaveAttribute('id', 'H3Id');
    expect(element!.dataset.test).toBe('h3-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<H3 ref={ref} />);
      const element = document.querySelector('h3');
      expect(ref.current).toBe(element);
    });
  });
});
