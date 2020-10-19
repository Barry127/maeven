import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { Row } from './Row';
import classes from './row.module.scss';

describe('Row', () => {
  it('renders div element with given text', () => {
    render(<Row>Hello world!</Row>);
    const element = document.querySelector('.row');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(<Row className="row-class">Hello world!</Row>);
    const element = document.querySelector('.row');
    expect(element).toHaveClass('row-class');
  });

  it('passes props', () => {
    render(
      <Row id="RowId" data-test="row-data">
        Hello world!
      </Row>
    );
    const element = document.querySelector('.row');
    expect(element).toHaveAttribute('id', 'RowId');
    expect(element).toHaveAttribute('data-test', 'row-data');
  });

  describe('align', () => {
    it('is normal by default', () => {
      render(<Row>Hello world!</Row>);
      const element = document.querySelector('.row');
      expect(element).toHaveClass(classes.normal);
    });

    it('sets top', () => {
      render(<Row align="top">Hello world!</Row>);
      const element = document.querySelector('.row');
      expect(element).toHaveClass(classes.top);
    });

    it('sets center', () => {
      render(<Row align="center">Hello world!</Row>);
      const element = document.querySelector('.row');
      expect(element).toHaveClass(classes.center);
    });
  });

  describe('gutter', () => {
    it('has no gutter by default', () => {
      render(<Row>Hello world!</Row>);
      const element = document.querySelector('.row');
      expect(element).toHaveStyle('--mvn-grid-gutter: 0rem');
    });

    it('sets gutter', () => {
      render(<Row gutter={2}>Hello world!</Row>);
      const element = document.querySelector('.row');
      expect(element).toHaveStyle('--mvn-grid-gutter: 2rem');
    });
  });

  describe('wrap', () => {
    it('wraps columns by default', () => {
      render(<Row>Hello world!</Row>);
      const element = document.querySelector('.row');
      expect(element).not.toHaveClass(classes['no-wrap']);
    });

    it('sets wrap to false', () => {
      render(<Row wrap={false}>Hello world!</Row>);
      const element = document.querySelector('.row');
      expect(element).toHaveClass(classes['no-wrap']);
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Row ref={ref} />);
      const element = document.querySelector('.row');
      expect(ref.current).toBe(element);
    });
  });
});
