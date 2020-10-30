import { render } from '@testing-library/react';
import React, { Component, createRef, FC } from 'react';
import { Block } from './Block';

const FunctionalComponent: FC = ({ children, ...restProps }) => (
  <p {...restProps}>{children}</p>
);

class ClassComponent extends Component {
  render() {
    const { children, ...restProps } = this.props;
    return <span {...restProps}>{children}</span>;
  }
}

describe('Block', () => {
  it('renders div element with given text', () => {
    render(<Block>Hello world!</Block>);
    const element = document.querySelector('.mvn--block');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(<Block className="block-class">Hello world!</Block>);
    const element = document.querySelector('.mvn--block');
    expect(element).toHaveClass('block-class');
  });

  it('passes props', () => {
    render(
      <Block id="BlockId" data-test="block-data">
        Hello world!
      </Block>
    );
    const element = document.querySelector('.mvn--block');
    expect(element).toHaveAttribute('id', 'BlockId');
    expect(element).toHaveAttribute('data-test', 'block-data');
  });

  it('renders a main element', () => {
    render(<Block element="main">Hello World!</Block>);
    const element = document.querySelector('.mvn--block');
    expect(element?.tagName).toBe('MAIN');
  });

  it('renders an article element', () => {
    render(<Block element="article">Hello World!</Block>);
    const element = document.querySelector('.mvn--block');
    expect(element?.tagName).toBe('ARTICLE');
  });

  describe('padding', () => {
    it('has no padding by default', () => {
      render(<Block>Hello world!</Block>);
      const element = document.querySelector('.mvn--block');
      expect(element).not.toHaveClass('padding');
    });

    it('sets padding', () => {
      render(<Block padding>Hello world!</Block>);
      const element = document.querySelector('.mvn--block');
      expect(element).toHaveClass('padding');
    });
  });

  describe('background', () => {
    it('sets background color', () => {
      render(<Block background="primary">Hello world!</Block>);
      const element = document.querySelector('.mvn--block');
      expect(element).toHaveClass('background-primary');
    });
  });

  describe('color', () => {
    it('sets text color', () => {
      render(<Block color="red">Hello world!</Block>);
      const element = document.querySelector('.mvn--block');
      expect(element).toHaveClass('text-red');
    });
  });

  describe('component', () => {
    it('renders functional component as link', () => {
      render(<Block component={FunctionalComponent}>Hello world!</Block>);
      const element = document.querySelector('.mvn--block');
      expect(element?.tagName).toBe('P');
    });

    it('renders class component as link', () => {
      render(<Block component={ClassComponent}>Hello world!</Block>);
      const element = document.querySelector('.mvn--block');
      expect(element?.tagName).toBe('SPAN');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Block ref={ref} />);
      const element = document.querySelector('.mvn--block');
      expect(ref.current).toBe(element);
    });
  });
});
