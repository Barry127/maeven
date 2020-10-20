import { act, render } from '@testing-library/react';
import React, { Component, createRef, FC } from 'react';
import colorClasses from '../../common/colors.module.scss';
import { Link } from './Link';
import classes from './link.module.scss';

const FunctionalComponent: FC = ({ children, ...restProps }) => (
  <p {...restProps}>{children}</p>
);

class ClassComponent extends Component {
  render() {
    const { children, ...restProps } = this.props;
    return <span {...restProps}>{children}</span>;
  }
}

describe('Link', () => {
  it('renders a element with given text', () => {
    render(<Link>Hello world!</Link>);
    const element = document.querySelector('.link');
    expect(element?.tagName).toBe('A');
  });

  it('renders functional component as link', () => {
    render(<Link component={FunctionalComponent}>Hello world!</Link>);
    const element = document.querySelector('.link');
    expect(element?.tagName).toBe('P');
  });

  it('renders class component as link', () => {
    render(<Link component={ClassComponent}>Hello world!</Link>);
    const element = document.querySelector('.link');
    expect(element?.tagName).toBe('SPAN');
  });

  it('sets className', () => {
    render(<Link className="link-class">Hello world!</Link>);
    const element = document.querySelector('.link');
    expect(element).toHaveClass('link-class');
  });

  it('passes props', () => {
    render(
      <Link id="LinkId" data-test="link-data">
        Hello world!
      </Link>
    );
    const element = document.querySelector('.link');
    expect(element).toHaveAttribute('id', 'LinkId');
    expect(element).toHaveAttribute('data-test', 'link-data');
  });

  describe('color', () => {
    it('sets green color', () => {
      render(<Link color="green">Hello world!</Link>);
      const element = document.querySelector('.link');
      expect(element).toHaveClass(colorClasses['text-green']);
    });

    it('sets danger color', () => {
      render(<Link color="danger">Hello world!</Link>);
      const element = document.querySelector('.link');
      expect(element).toHaveClass(colorClasses['text-danger']);
    });
  });

  describe('outline', () => {
    it('has no focus outline class by default', () => {
      render(<Link>Hello world!</Link>);
      const element = document.querySelector('.link');
      expect(element).not.toHaveClass(classes.outline);
    });

    it('has a focus outline class when a key is clicked', () => {
      render(<Link>Hello world!</Link>);

      act(() => {
        const ev = document.createEvent('KeyboardEvent');
        ev.initEvent('keydown', false, true);
        document.dispatchEvent(ev);
      });

      const element = document.querySelector('.link');
      expect(element).toHaveClass(classes.outline);
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(<Link ref={ref} />);
      const element = document.querySelector('.link');
      expect(ref.current).toBe(element);
    });
  });
});
