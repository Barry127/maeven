import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { H6 } from './Html';

describe('H6', () => {
  it('renders an h6 element with given text', () => {
    render(<H6>Hello World!</H6>);
    const element = document.querySelector('h6');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H6 className="h6-class">Hello World!</H6>);
    const element = document.querySelector('h6');
    expect(element).toHaveClass('h6-class');
  });

  it('passes props', () => {
    render(
      <H6 id="H6Id" data-test="h6-data">
        Hello World!
      </H6>
    );
    const element = document.querySelector('h6');
    expect(element).toHaveAttribute('id', 'H6Id');
    expect(element!.dataset.test).toBe('h6-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<H6 ref={ref} />);
      const element = document.querySelector('h6');
      expect(ref.current).toBe(element);
    });
  });
});
