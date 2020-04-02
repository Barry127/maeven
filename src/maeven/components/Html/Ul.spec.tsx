import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { Ul } from './Html';

describe('Ul', () => {
  it('renders an Ul element with given text', () => {
    render(<Ul>Hello World!</Ul>);
    const element = document.querySelector('ul');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World!');
  });

  it('sets className', () => {
    render(<Ul className="ul-class">Hello World!</Ul>);
    const element = document.querySelector('ul');
    expect(element).toHaveClass('ul-class');
  });

  it('passes props', () => {
    render(
      <Ul id="UlId" data-test="ul-data">
        Hello World!
      </Ul>
    );
    const element = document.querySelector('ul');
    expect(element).toHaveAttribute('id', 'UlId');
    expect(element!.dataset.test).toBe('ul-data');
  });

  describe('forwarding ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLUListElement>();
      render(<Ul ref={ref} />);
      const element = document.querySelector('ul');
      expect(ref.current).toBe(element);
    });
  });
});
