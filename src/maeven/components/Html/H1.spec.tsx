import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { H1 } from './Html';

describe('H1', () => {
  it('renders an h1 element with given text', () => {
    render(<H1>Hello World!</H1>);
    const element = document.querySelector('h1');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<H1 className="h1-class">Hello World!</H1>);
    const element = document.querySelector('h1');
    expect(element).toHaveClass('h1-class');
  });

  it('passes props', () => {
    render(
      <H1 id="H1Id" data-test="h1-data">
        Hello World!
      </H1>
    );
    const element = document.querySelector('h1');
    expect(element).toHaveAttribute('id', 'H1Id');
    expect(element!.dataset.test).toBe('h1-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<H1 ref={ref} />);
      const element = document.querySelector('h1');
      expect(ref.current).toBe(element);
    });
  });
});
