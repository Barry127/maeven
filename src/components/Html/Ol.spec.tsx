import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { Ol } from './Html';

describe('Ol', () => {
  it('renders an Ol element with given text', () => {
    render(<Ol>Hello World!</Ol>);
    const element = document.querySelector('ol');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<Ol className="ol-class">Hello World!</Ol>);
    const element = document.querySelector('ol');
    expect(element).toHaveClass('ol-class');
  });

  it('passes props', () => {
    render(
      <Ol id="OlId" data-test="ol-data">
        Hello World!
      </Ol>
    );
    const element = document.querySelector('ol');
    expect(element).toHaveAttribute('id', 'OlId');
    expect(element!.dataset.test).toBe('ol-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLOListElement>();
      render(<Ol ref={ref} />);
      const element = document.querySelector('ol');
      expect(ref.current).toBe(element);
    });
  });
});
