import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import blockClasses from '../../Block/block.module.scss';
import { Container } from './Container';

describe('Container', () => {
  it('renders div element with given text', () => {
    render(<Container>Hello world!</Container>);
    const element = document.querySelector('.mvn--container');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(<Container className="container-class">Hello world!</Container>);
    const element = document.querySelector('.mvn--container');
    expect(element).toHaveClass('container-class');
  });

  it('passes props', () => {
    render(
      <Container id="ContainerId" data-test="container-data">
        Hello world!
      </Container>
    );
    const element = document.querySelector('.mvn--container');
    expect(element).toHaveAttribute('id', 'ContainerId');
    expect(element).toHaveAttribute('data-test', 'container-data');
  });

  describe('background', () => {
    it('sets textBackground color', () => {
      render(<Container background="textBackground">Hello world!</Container>);
      const element = document.querySelector('.mvn--container');
      expect(element).toHaveClass(blockClasses['background-textBackground']);
    });
  });

  describe('element', () => {
    it('renders main element', () => {
      render(<Container element="main">Hello world!</Container>);
      const element = document.querySelector('.mvn--container');
      expect(element?.tagName).toBe('MAIN');
    });

    it('renders article element', () => {
      render(<Container element="article">Hello world!</Container>);
      const element = document.querySelector('.mvn--container');
      expect(element?.tagName).toBe('ARTICLE');
    });
  });

  describe('fluid', () => {
    it('is not fluid by default', () => {
      render(<Container>Hello world!</Container>);
      const element = document.querySelector('.mvn--container');
      expect(element).toHaveClass('responsive');
    });

    it('sets fluid', () => {
      render(<Container fluid>Hello world!</Container>);
      const element = document.querySelector('.mvn--container');
      expect(element).not.toHaveClass('responsive');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Container ref={ref} />);
      const element = document.querySelector('.mvn--container');
      expect(ref.current).toBe(element);
    });
  });
});
