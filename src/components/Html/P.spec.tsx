import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { P } from './Html';

describe('P', () => {
  it('renders a p element with given text', () => {
    render(<P>Hello World!</P>);
    const element = document.querySelector('p');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<P className="p-class">Hello World!</P>);
    const element = document.querySelector('p');
    expect(element).toHaveClass('p-class');
  });

  it('passes props', () => {
    render(
      <P id="PId" data-test="p-data">
        Hello World!
      </P>
    );
    const element = document.querySelector('p');
    expect(element).toHaveAttribute('id', 'PId');
    expect(element!.dataset.test).toBe('p-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLParagraphElement>();
      render(<P ref={ref} />);
      const element = document.querySelector('p');
      expect(ref.current).toBe(element);
    });
  });
});
