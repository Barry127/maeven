import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import colorClasses from '../../../common/colors.module.scss';
import { Container } from './Container';
import classes from './container.module.scss';

describe('Container', () => {
  it('renders div element with given text', () => {
    render(<Container>Hello world!</Container>);
    const element = document.querySelector('.container');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(<Container className="container-class">Hello world!</Container>);
    const element = document.querySelector('.container');
    expect(element).toHaveClass('container-class');
  });

  it('passes props', () => {
    render(
      <Container id="ContainerId" data-test="container-data">
        Hello world!
      </Container>
    );
    const element = document.querySelector('.container');
    expect(element).toHaveAttribute('id', 'ContainerId');
    expect(element).toHaveAttribute('data-test', 'container-data');
  });

  describe('background', () => {
    it('sets textBackground color', () => {
      render(<Container background="textBackground">Hello world!</Container>);
      const element = document.querySelector('.container');
      expect(element).toHaveClass(colorClasses['background-textBackground']);
    });
  });

  describe('element', () => {
    it('renders main element', () => {
      render(<Container element="main">Hello world!</Container>);
      const element = document.querySelector('.container');
      expect(element?.tagName).toBe('MAIN');
    });

    it('renders article element', () => {
      render(<Container element="article">Hello world!</Container>);
      const element = document.querySelector('.container');
      expect(element?.tagName).toBe('ARTICLE');
    });
  });

  describe('fluid', () => {
    it('is not fluid by default', () => {
      render(<Container>Hello world!</Container>);
      const element = document.querySelector('.container');
      expect(element).toHaveClass(classes.responsive);
    });

    it('sets fluid', () => {
      render(<Container fluid>Hello world!</Container>);
      const element = document.querySelector('.container');
      expect(element).not.toHaveClass(classes.responsive);
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Container ref={ref} />);
      const element = document.querySelector('.container');
      expect(ref.current).toBe(element);
    });
  });
});
