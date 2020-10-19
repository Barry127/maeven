import { render } from '@testing-library/react';
import React, { Component, createRef, FC } from 'react';
import colorClasses from '../../../common/colors.module.scss';
import { Col } from './Col';
import classes from './col.module.scss';

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
  it('renders div element with given text', () => {
    render(<Col>Hello world!</Col>);
    const element = document.querySelector('.col');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(<Col className="col-class">Hello world!</Col>);
    const element = document.querySelector('.col');
    expect(element).toHaveClass('col-class');
  });

  it('passes props', () => {
    render(
      <Col id="ColId" data-test="col-data">
        Hello world!
      </Col>
    );
    const element = document.querySelector('.col');
    expect(element).toHaveAttribute('id', 'ColId');
    expect(element).toHaveAttribute('data-test', 'col-data');
  });

  describe('background', () => {
    it('sets textBackground color', () => {
      render(<Col background="textBackground">Hello world!</Col>);
      const element = document.querySelector('.col');
      expect(element).toHaveClass(colorClasses['background-textBackground']);
    });
  });

  describe('component', () => {
    it('renders functional component as link', () => {
      render(<Col component={FunctionalComponent}>Hello world!</Col>);
      const element = document.querySelector('.col');
      expect(element?.tagName).toBe('P');
    });

    it('renders class component as link', () => {
      render(<Col component={ClassComponent}>Hello world!</Col>);
      const element = document.querySelector('.col');
      expect(element?.tagName).toBe('SPAN');
    });
  });

  describe('element', () => {
    it('renders main element', () => {
      render(<Col element="main">Hello world!</Col>);
      const element = document.querySelector('.col');
      expect(element?.tagName).toBe('MAIN');
    });

    it('renders article element', () => {
      render(<Col element="article">Hello world!</Col>);
      const element = document.querySelector('.col');
      expect(element?.tagName).toBe('ARTICLE');
    });
  });

  describe('hidden', () => {
    it('is not hidden by default', () => {
      render(<Col>Hello world!</Col>);
      const element = document.querySelector('.col');

      expect(Array.from(element!.classList).join()).not.toContain('hidden');
    });

    it('sets hidden with boolean', () => {
      render(<Col hidden>Hello world!</Col>);
      const element = document.querySelector('.col');
      expect(element).toHaveClass(classes.hidden);
    });

    it('sets hidden with array', () => {
      render(<Col hidden={['md', 'lg', 'xl']}>Hello world!</Col>);
      const element = document.querySelector('.col');

      expect(element).not.toHaveClass(classes.hidden);
      expect(element).toHaveClass(classes['hidden-md']);
      expect(element).toHaveClass(classes['hidden-lg']);
      expect(element).toHaveClass(classes['hidden-xl']);
    });

    it('sets hidden with string', () => {
      render(<Col hidden="sm">Hello world!</Col>);
      const element = document.querySelector('.col');

      expect(element).not.toHaveClass(classes.hidden);
      // hidden for sm and xs
      expect(element).toHaveClass(classes['hidden-sm']);
      expect(element).toHaveClass(classes['hidden-xs']);
    });
  });

  describe('span width', () => {
    it('sets xs', () => {
      render(
        <Col span={6} xs={12}>
          Hello world!
        </Col>
      );
      const element = document.querySelector('.col');

      expect(element).toHaveClass(classes['col-6']);
      expect(element).toHaveClass(classes['xs-12']);
    });

    it('sets sm', () => {
      render(
        <Col span={6} sm={12}>
          Hello world!
        </Col>
      );
      const element = document.querySelector('.col');

      expect(element).toHaveClass(classes['col-6']);
      expect(element).toHaveClass(classes['sm-12']);
    });

    it('sets md', () => {
      render(
        <Col span={6} md={12}>
          Hello world!
        </Col>
      );
      const element = document.querySelector('.col');

      expect(element).toHaveClass(classes['col-6']);
      expect(element).toHaveClass(classes['md-12']);
    });

    it('sets lg', () => {
      render(
        <Col span={6} lg={12}>
          Hello world!
        </Col>
      );
      const element = document.querySelector('.col');

      expect(element).toHaveClass(classes['col-6']);
      expect(element).toHaveClass(classes['lg-12']);
    });

    it('sets xl', () => {
      render(
        <Col span={6} xl={12}>
          Hello world!
        </Col>
      );
      const element = document.querySelector('.col');

      expect(element).toHaveClass(classes['col-6']);
      expect(element).toHaveClass(classes['xl-12']);
    });

    it('sets multiple spans', () => {
      render(
        <Col span={6} md={12} xs={18}>
          Hello world!
        </Col>
      );
      const element = document.querySelector('.col');

      expect(element).toHaveClass(classes['col-6']);
      expect(element).toHaveClass(classes['md-12']);
      expect(element).toHaveClass(classes['xs-18']);
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Col ref={ref} />);
      const element = document.querySelector('.col');
      expect(ref.current).toBe(element);
    });
  });
});
