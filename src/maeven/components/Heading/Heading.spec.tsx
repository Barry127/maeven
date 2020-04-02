import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { Heading, HeadingF } from './Heading';
import { Heading as ExportedHeading } from './';

describe('Heading', () => {
  it('renders h1 element with given text', () => {
    const { getByText } = render(<Heading level="h1">Hello world!</Heading>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('H1');
    expect(element).toHaveClass('mvn-h1');
  });

  it('renders h5 element with given text', () => {
    const { getByText } = render(<Heading level="h5">Hello world!</Heading>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('H5');
    expect(element).toHaveClass('mvn-h5');
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
      expect(element).toHaveClass('mvn-text-color-green');
    });

    it('sets primary color', () => {
      const { getByText } = render(
        <Heading level="h1" color="primary">
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-text-color-primary');
    });
  });

  describe('size', () => {
    it('defaults to level size', () => {
      const { getByText } = render(<Heading level="h2">Hello world!</Heading>);
      const element = getByText('Hello world!');
      expect(element).toBe(element);
      expect(element).toHaveClass('mvn-h2');
    });

    it('it sets h3 size for a h1 level', () => {
      const { getByText } = render(
        <Heading level="h1" size="h3">
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toBe(element);
      expect(element).toHaveClass('mvn-h3');
      expect(element).not.toHaveClass('mvn-h1');
    });
  });

  describe('truncate', () => {
    it('does not truncate by default', () => {
      const { getByText } = render(<Heading level="h1">Hello world!</Heading>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-heading-truncate');
    });

    it('sets truncate', () => {
      const { getByText } = render(
        <Heading level="h1" truncate>
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-heading-truncate');
    });
  });

  describe('forwarding ref', () => {
    it('exports HeadingForwardRef', () => {
      expect(ExportedHeading).toBe(HeadingF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<HeadingF level="h1" ref={ref} />);
      const element = document.querySelector('.mvn-h1');
      expect(ref.current).toBe(element);
    });
  });
});
