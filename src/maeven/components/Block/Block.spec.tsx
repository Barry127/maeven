import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { Block, BlockF } from './Block';
import { Block as ExportedBlock } from './';

describe('Block', () => {
  it('renders a div element with given text', () => {
    const { getByText } = render(<Block>Hello world!</Block>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Block className="block-class">Hello world!</Block>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('block-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Block id="BlockId" data-test="block-data">
        Hello world!
      </Block>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'BlockId');
    expect(element.dataset.test).toBe('block-data');
  });

  it('renders a main element', () => {
    const { getByText } = render(<Block element="main">Hello world!</Block>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('MAIN');
  });

  it('renders an article element', () => {
    const { getByText } = render(<Block element="article">Hello world!</Block>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('ARTICLE');
  });

  describe('padding', () => {
    it('has no padding by default', () => {
      const { getByText } = render(<Block>Hello world!</Block>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-block-padding');
    });

    it('sets padding', () => {
      const { getByText } = render(<Block padding>Hello world!</Block>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-block-padding');
    });
  });

  describe('background', () => {
    it('sets background color', () => {
      const { getByText } = render(
        <Block background="primary">Hello world!</Block>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-background-color-primary');
    });
  });

  describe('textColor', () => {
    it('sets text color', () => {
      const { getByText } = render(<Block textColor="red">Hello world!</Block>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-text-color-red');
    });
  });

  describe('forwarding ref', () => {
    it('exports BlockForwardRef', () => {
      expect(ExportedBlock).toBe(BlockF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLElement>();
      render(<BlockF ref={ref} />);
      const element = document.querySelector('.mvn-block');
      expect(ref.current).toBe(element);
    });
  });
});
