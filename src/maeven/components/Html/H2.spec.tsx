import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { H2 } from './Html';

describe('H2', () => {
  it('renders an h2 element with given text', () => {
    render(<H2>Hello World!</H2>);
    const element = document.querySelector('h2');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H2 className="h2-class">Hello World!</H2>);
    const element = document.querySelector('h2');
    expect(element).toHaveClass('h2-class');
  });

  it('passes props', () => {
    render(
      <H2 id="H2Id" data-test="h2-data">
        Hello World!
      </H2>
    );
    const element = document.querySelector('h2');
    expect(element).toHaveAttribute('id', 'H2Id');
    expect(element!.dataset.test).toBe('h2-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<H2 ref={ref} />);
      const element = document.querySelector('h2');
      expect(ref.current).toBe(element);
    });
  });
});
