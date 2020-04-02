import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { H5 } from './Html';

describe('H5', () => {
  it('renders an h5 element with given text', () => {
    render(<H5>Hello World!</H5>);
    const element = document.querySelector('h5');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H5 className="h5-class">Hello World!</H5>);
    const element = document.querySelector('h5');
    expect(element).toHaveClass('h5-class');
  });

  it('passes props', () => {
    render(
      <H5 id="H5Id" data-test="h5-data">
        Hello World!
      </H5>
    );
    const element = document.querySelector('h5');
    expect(element).toHaveAttribute('id', 'H5Id');
    expect(element!.dataset.test).toBe('h5-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<H5 ref={ref} />);
      const element = document.querySelector('h5');
      expect(ref.current).toBe(element);
    });
  });
});
