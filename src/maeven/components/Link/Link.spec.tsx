import '@testing-library/jest-dom/extend-expect';

import React, { FC, Component, createRef } from 'react';
import { act, render } from '@testing-library/react';

import { Link, LinkF } from './Link';
import { Link as ExportedLink } from './';

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
    const { getByText } = render(<Link>Hello world!</Link>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('A');
    expect(element).toHaveClass('mvn-link');
  });

  it('renders functional component as link', () => {
    const { getByText } = render(
      <Link component={FunctionalComponent}>Hello world!</Link>
    );
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('mvn-link');
  });

  it('renders class component as link', () => {
    const { getByText } = render(
      <Link component={ClassComponent}>Hello world!</Link>
    );
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('mvn-link');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Link className="link-class">Hello world!</Link>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('link-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Link id="LinkId" data-test="link-data">
        Hello world!
      </Link>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'LinkId');
    expect(element.dataset.test).toBe('link-data');
  });

  describe('color', () => {
    it('defaults to theme default', () => {
      const { getByText } = render(<Link>Hello world!</Link>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-link-color-green');
    });

    it('sets green color', () => {
      const { getByText } = render(<Link color="green">Hello world!</Link>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-link-color-green');
    });

    it('sets danger color', () => {
      const { getByText } = render(<Link color="danger">Hello world!</Link>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-link-color-danger');
    });
  });

  describe('outline', () => {
    it('has no focus outline class by default', () => {
      const { getByText } = render(<Link>Hello world!</Link>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-link-outline');
    });

    it('has a focus outline class when a key is clicked', () => {
      const { getByText } = render(<Link>Hello world!</Link>);

      act(() => {
        const ev = document.createEvent('KeyboardEvent');
        ev.initEvent('keydown', false, true);
        document.dispatchEvent(ev);
      });

      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-link-outline');
    });
  });

  describe('forwarding ref', () => {
    it('exports LinkForwardRef', () => {
      expect(ExportedLink).toBe(LinkF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(<LinkF ref={ref} />);
      const element = document.querySelector('.mvn-link');
      expect(ref.current).toBe(element);
    });
  });
});
