import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import colorClasses from '../../common/colors.module.scss';
import { Block } from './Block';
import classes from './block.module.scss';

describe('Block', () => {
  it('renders div element with given text', () => {
    render(<Block>Hello world!</Block>);
    const element = document.querySelector('.block');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(<Block className="block-class">Hello world!</Block>);
    const element = document.querySelector('.block');
    expect(element).toHaveClass('block-class');
  });

  it('passes props', () => {
    render(
      <Block id="BlockId" data-test="block-data">
        Hello world!
      </Block>
    );
    const element = document.querySelector('.block');
    expect(element).toHaveAttribute('id', 'BlockId');
    expect(element).toHaveAttribute('data-test', 'block-data');
  });

  it('renders a main element', () => {
    render(<Block element="main">Hello World!</Block>);
    const element = document.querySelector('.block');
    expect(element?.tagName).toBe('MAIN');
  });

  it('renders an article element', () => {
    render(<Block element="article">Hello World!</Block>);
    const element = document.querySelector('.block');
    expect(element?.tagName).toBe('ARTICLE');
  });

  describe('padding', () => {
    it('has no padding by default', () => {
      render(<Block>Hello world!</Block>);
      const element = document.querySelector('.block');
      expect(element).not.toHaveClass(classes.padding);
    });

    it('sets padding', () => {
      render(<Block padding>Hello world!</Block>);
      const element = document.querySelector('.block');
      expect(element).toHaveClass(classes.padding);
    });
  });

  describe('background', () => {
    it('sets background color', () => {
      render(<Block background="primary">Hello world!</Block>);
      const element = document.querySelector('.block');
      expect(element).toHaveClass(colorClasses['background-primary']);
    });
  });

  describe('textColor', () => {
    it('sets text color', () => {
      render(<Block textColor="red">Hello world!</Block>);
      const element = document.querySelector('.block');
      expect(element).toHaveClass(colorClasses['text-red']);
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Block ref={ref} />);
      const element = document.querySelector('.block');
      expect(ref.current).toBe(element);
    });
  });
});
