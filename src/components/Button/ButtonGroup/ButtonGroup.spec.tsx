import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { Button } from '../Button/Button';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders div element with given text', () => {
    render(<ButtonGroup>Hello world!</ButtonGroup>);
    const element = document.querySelector('.mvn--button-group');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(
      <ButtonGroup className="button-group-class">Hello world!</ButtonGroup>
    );
    const element = document.querySelector('.mvn--button-group');
    expect(element).toHaveClass('button-group-class');
  });

  it('passes props', () => {
    render(
      <ButtonGroup id="ButtonGroupId" data-test="button-group-data">
        Hello world!
      </ButtonGroup>
    );
    const element = document.querySelector('.mvn--button-group');
    expect(element).toHaveAttribute('id', 'ButtonGroupId');
    expect(element).toHaveAttribute('data-test', 'button-group-data');
  });

  it('ignores non Button instances', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
        <button>B</button>
        <p>C</p>
        <Button>D</Button>
      </ButtonGroup>
    );
    const element = document.querySelector('.mvn--button-group');

    expect(element).toHaveTextContent('AD');

    const p = document.querySelector('p');
    expect(p).toBeNull();

    const buttons = document.querySelectorAll('button');
    expect(buttons).toHaveLength(2);
  });

  describe('fluid', () => {
    it('is not fluid by default', () => {
      render(
        <ButtonGroup>
          <Button>Hello World</Button>
        </ButtonGroup>
      );
      const element = document.querySelector('.mvn--button-group');
      expect(element).not.toHaveClass('fluid');
    });

    it('sets fluid', () => {
      render(
        <ButtonGroup fluid>
          <Button>Hello World</Button>
        </ButtonGroup>
      );
      const element = document.querySelector('.mvn--button-group');
      expect(element).toHaveClass('fluid');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(
        <ButtonGroup>
          <Button>Hello World</Button>
        </ButtonGroup>
      );
      const button = document.querySelector('.mvn--button');
      expect(button).toHaveClass('md');
    });

    it('sets lg', () => {
      render(
        <ButtonGroup size="lg">
          <Button>Hello World</Button>
        </ButtonGroup>
      );
      const button = document.querySelector('.mvn--button');
      expect(button).toHaveClass('lg');
    });

    it('overwrites size in button props', () => {
      render(
        <ButtonGroup>
          <Button size="sm">Hello World</Button>
        </ButtonGroup>
      );
      const button = document.querySelector('.mvn--button');
      expect(button).not.toHaveClass('sm');
      expect(button).toHaveClass('md');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<ButtonGroup ref={ref} />);
      const element = document.querySelector('.mvn--button-group');
      expect(ref.current).toBe(element);
    });
  });
});
