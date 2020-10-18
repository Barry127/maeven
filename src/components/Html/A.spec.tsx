import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { A } from './Html';

describe('A', () => {
  it('renders an a element with given text', () => {
    render(<A href="#">Hello World!</A>);
    const element = document.querySelector('a');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(
      <A href="#" className="a-class">
        Hello World!
      </A>
    );
    const element = document.querySelector('a');
    expect(element).toHaveClass('a-class');
  });

  it('passes props', () => {
    render(
      <A href="#" id="AId" data-test="a-data">
        Hello World!
      </A>
    );
    const element = document.querySelector('a');
    expect(element).toHaveAttribute('id', 'AId');
    expect(element!.dataset.test).toBe('a-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(<A ref={ref} />);
      const element = document.querySelector('a');
      expect(ref.current).toBe(element);
    });
  });
});
