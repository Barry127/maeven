import '@testing-library/jest-dom/extend-expect';

import React, { createRef, Component, FC } from 'react';
import { render } from '@testing-library/react';

import { Col, ColF } from './Col';
import { Col as ExportedCol } from '../';

const FunctionalComponent: FC = ({ children, ...restProps }) => (
  <p {...restProps}>{children}</p>
);

class ClassComponent extends Component {
  render() {
    const { children, ...restProps } = this.props;
    return <span {...restProps}>{children}</span>;
  }
}

describe('Col', () => {
  it('renders div element with given children', () => {
    const { getByText } = render(<Col>Hello world!</Col>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('sets className', () => {
    const { getByText } = render(<Col className="col-class">Hello world!</Col>);
    const element = getByText('Hello world!');
    expect(element).toHaveClass('col-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Col id="ColId" data-test="col-data">
        Hello world!
      </Col>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'ColId');
    expect(element.dataset.test).toBe('col-data');
  });

  describe('background', () => {
    it('sets textBackground color', () => {
      const { getByText } = render(
        <Col background="textBackground">Hello world!</Col>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-background-color-textBackground');
    });
  });

  describe('component', () => {
    it('renders functional component as link', () => {
      const { getByText } = render(
        <Col component={FunctionalComponent}>Hello world!</Col>
      );
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('P');
      expect(element).toHaveClass('mvn-grid-col');
    });

    it('renders class component as link', () => {
      const { getByText } = render(
        <Col component={ClassComponent}>Hello world!</Col>
      );
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('SPAN');
      expect(element).toHaveClass('mvn-grid-col');
    });
  });

  describe('element', () => {
    it('renders main element', () => {
      const { getByText } = render(<Col element="main">Hello world!</Col>);
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('MAIN');
    });

    it('renders article element', () => {
      const { getByText } = render(<Col element="article">Hello world!</Col>);
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('ARTICLE');
    });
  });

  describe('hidden', () => {
    it('is not hidden by default', () => {
      const { getByText } = render(<Col>Hello world!</Col>);
      const element = getByText('Hello world!');

      expect(Array.from(element.classList).join()).not.toContain('hidden');
    });

    it('sets hidden with boolean', () => {
      const { getByText } = render(<Col hidden>Hello world!</Col>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-hidden');
    });

    it('sets hidden with array', () => {
      const { getByText } = render(
        <Col hidden={['md', 'lg', 'xl']}>Hello world!</Col>
      );
      const element = getByText('Hello world!');

      expect(element).not.toHaveClass('mvn-hidden');
      expect(element).toHaveClass('mvn-col-hidden-md');
      expect(element).toHaveClass('mvn-col-hidden-lg');
      expect(element).toHaveClass('mvn-col-hidden-xl');
    });

    it('sets hidden with string', () => {
      const { getByText } = render(<Col hidden="sm">Hello world!</Col>);
      const element = getByText('Hello world!');

      expect(element).not.toHaveClass('mvn-hidden');
      // hidden for sm and xs
      expect(element).toHaveClass('mvn-col-hidden-sm');
      expect(element).toHaveClass('mvn-col-hidden-xs');
    });
  });

  describe('span width', () => {
    it('sets xs', () => {
      const { getByText } = render(
        <Col span={6} xs={12}>
          Hello world!
        </Col>
      );
      const element = getByText('Hello world!');

      expect(element).toHaveClass('mvn-col-6');
      expect(element).toHaveClass('mvn-col-xs-12');
    });

    it('sets sm', () => {
      const { getByText } = render(
        <Col span={6} sm={12}>
          Hello world!
        </Col>
      );
      const element = getByText('Hello world!');

      expect(element).toHaveClass('mvn-col-6');
      expect(element).toHaveClass('mvn-col-sm-12');
    });

    it('sets md', () => {
      const { getByText } = render(
        <Col span={6} md={12}>
          Hello world!
        </Col>
      );
      const element = getByText('Hello world!');

      expect(element).toHaveClass('mvn-col-6');
      expect(element).toHaveClass('mvn-col-md-12');
    });

    it('sets lg', () => {
      const { getByText } = render(
        <Col span={6} lg={12}>
          Hello world!
        </Col>
      );
      const element = getByText('Hello world!');

      expect(element).toHaveClass('mvn-col-6');
      expect(element).toHaveClass('mvn-col-lg-12');
    });

    it('sets xl', () => {
      const { getByText } = render(
        <Col span={6} xl={12}>
          Hello world!
        </Col>
      );
      const element = getByText('Hello world!');

      expect(element).toHaveClass('mvn-col-6');
      expect(element).toHaveClass('mvn-col-xl-12');
    });

    it('sets multiple spans', () => {
      const { getByText } = render(
        <Col span={6} md={12} xs={18}>
          Hello world!
        </Col>
      );
      const element = getByText('Hello world!');

      expect(element).toHaveClass('mvn-col-6');
      expect(element).toHaveClass('mvn-col-md-12');
      expect(element).toHaveClass('mvn-col-xs-18');
    });
  });

  describe('forwarding ref', () => {
    it('exports ColForwardRef', () => {
      expect(ExportedCol).toBe(ColF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLElement>();
      render(<ColF ref={ref} />);
      const element = document.querySelector('.mvn-grid-col');
      expect(ref.current).toBe(element);
    });
  });
});
