import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { Container, ContainerF } from './Container';
import { Container as ExportedContainer } from '../';

describe('Container', () => {
  it('renders div element with given children', () => {
    const { getByText } = render(<Container>Hello world!</Container>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Container className="container-class">Hello world!</Container>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('container-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Container id="ContainerId" data-test="container-data">
        Hello world!
      </Container>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'ContainerId');
    expect(element.dataset.test).toBe('container-data');
  });

  describe('background', () => {
    it('sets textBackground color', () => {
      const { getByText } = render(
        <Container background="textBackground">Hello world!</Container>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-background-color-textBackground');
    });
  });

  describe('element', () => {
    it('renders main element', () => {
      const { getByText } = render(
        <Container element="main">Hello world!</Container>
      );
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('MAIN');
    });

    it('renders article element', () => {
      const { getByText } = render(
        <Container element="article">Hello world!</Container>
      );
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('ARTICLE');
    });
  });

  describe('fluid', () => {
    it('is not fluid by default', () => {
      const { getByText } = render(<Container>Hello world!</Container>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-responsive-grid-container');
    });

    it('sets fluid', () => {
      const { getByText } = render(<Container fluid>Hello world!</Container>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-responsive-grid-container');
    });
  });

  describe('forwarding ref', () => {
    it('exports ContainerForwardRef', () => {
      expect(ExportedContainer).toBe(ContainerF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<ContainerF ref={ref} />);
      const element = document.querySelector('.mvn-grid-container');
      expect(ref.current).toBe(element);
    });
  });
});
