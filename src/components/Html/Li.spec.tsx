import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { Li } from './Html';

describe('Li', () => {
  it('renders an Li element with given text', () => {
    render(<Li>Hello World!</Li>);
    const element = document.querySelector('li');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<Li className="li-class">Hello World!</Li>);
    const element = document.querySelector('li');
    expect(element).toHaveClass('li-class');
  });

  it('passes props', () => {
    render(
      <Li id="LiId" data-test="li-data">
        Hello World!
      </Li>
    );
    const element = document.querySelector('li');
    expect(element).toHaveAttribute('id', 'LiId');
    expect(element!.dataset.test).toBe('li-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLLIElement>();
      render(<Li ref={ref} />);
      const element = document.querySelector('li');
      expect(ref.current).toBe(element);
    });
  });
});
