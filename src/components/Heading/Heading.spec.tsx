import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders h1 element with given text', () => {
    const { getByText } = render(<Heading level="h1">Hello world!</Heading>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('H1');
    expect(element).toHaveClass('h1');
  });

  it('renders h5 element with given text', () => {
    const { getByText } = render(<Heading level="h5">Hello world!</Heading>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('H5');
    expect(element).toHaveClass('h5');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Heading level="h1" className="heading-class">
        Hello world!
      </Heading>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('heading-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Heading level="h1" id="HeadingId" data-test="heading-data">
        Hello world!
      </Heading>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'HeadingId');
    expect(element.dataset.test).toBe('heading-data');
  });

  describe('color', () => {
    it('sets green color', () => {
      const { getByText } = render(
        <Heading level="h1" color="green">
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass('text-green');
    });

    it('sets primary color', () => {
      const { getByText } = render(
        <Heading level="h1" color="primary">
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass('text-primary');
    });
  });

  describe('size', () => {
    it('defaults to level size', () => {
      const { getByText } = render(<Heading level="h2">Hello world!</Heading>);
      const element = getByText('Hello world!');
      expect(element).toBe(element);
      expect(element).toHaveClass('h2');
    });

    it('it sets h3 size for a h1 level', () => {
      const { getByText } = render(
        <Heading level="h1" size="h3">
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toBe(element);
      expect(element).toHaveClass('h3');
      expect(element).not.toHaveClass('h1');
    });
  });

  describe('truncate', () => {
    it('does not truncate by default', () => {
      const { getByText } = render(<Heading level="h1">Hello world!</Heading>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('truncate');
    });

    it('sets truncate', () => {
      const { getByText } = render(
        <Heading level="h1" truncate>
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass('truncate');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<Heading level="h1" ref={ref} />);
      const element = document.querySelector('h1');
      expect(ref.current).toBe(element);
    });
  });
});
