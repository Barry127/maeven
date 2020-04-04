import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { Row, RowF } from './Row';
import { Row as ExportedRow } from '../';

describe('Row', () => {
  it('renders div element with given children', () => {
    const { getByText } = render(<Row>Hello world!</Row>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('sets className', () => {
    const { getByText } = render(<Row className="row-class">Hello world!</Row>);
    const element = getByText('Hello world!');
    expect(element).toHaveClass('row-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Row id="RowId" data-test="row-data">
        Hello world!
      </Row>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'RowId');
    expect(element.dataset.test).toBe('row-data');
  });

  describe('align', () => {
    it('is normal by default', () => {
      const { getByText } = render(<Row>Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-grid-row-align-normal');
    });

    it('sets top', () => {
      const { getByText } = render(<Row align="top">Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-grid-row-align-top');
    });

    it('sets center', () => {
      const { getByText } = render(<Row align="center">Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-grid-row-align-center');
    });
  });

  describe('gutter', () => {
    it('has no gutter by default', () => {
      const { getByText } = render(<Row>Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-grid-gutter-1');
      expect(element).not.toHaveClass('mvn-grid-gutter-2');
      expect(element).not.toHaveClass('mvn-grid-gutter-3');
      expect(element).not.toHaveClass('mvn-grid-gutter-4');
      expect(element).not.toHaveClass('mvn-grid-gutter-5');
      expect(element).not.toHaveClass('mvn-grid-gutter-6');
      expect(element).not.toHaveClass('mvn-grid-gutter-7');
      expect(element).not.toHaveClass('mvn-grid-gutter-8');
      expect(element).not.toHaveClass('mvn-grid-gutter-9');
      expect(element).not.toHaveClass('mvn-grid-gutter-10');
      expect(element).not.toHaveClass('mvn-grid-gutter-11');
      expect(element).not.toHaveClass('mvn-grid-gutter-12');
    });

    it('sets gutter', () => {
      const { getByText } = render(<Row gutter={2}>Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-grid-gutter-2');
    });
  });

  describe('wrap', () => {
    it('wraps columns by default', () => {
      const { getByText } = render(<Row>Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-grid-row-no-wrap');
    });

    it('sets wrap to false', () => {
      const { getByText } = render(<Row wrap={false}>Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-grid-row-no-wrap');
    });
  });

  describe('forwarding ref', () => {
    it('exports RowForwardRef', () => {
      expect(ExportedRow).toBe(RowF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<RowF ref={ref} />);
      const element = document.querySelector('.mvn-grid-row');
      expect(ref.current).toBe(element);
    });
  });
});
