import '@testing-library/jest-dom/extend-expect';

import React, { FC, Component } from 'react';
import { act, render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Link } from './Link';
import { classes, themeOverride } from './styles';

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
    expect(element).toHaveClass(classes.link);
  });

  it('renders functional component as link', () => {
    const { getByText } = render(
      <Link component={FunctionalComponent}>Hello world!</Link>
    );
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass(classes.link);
  });

  it('renders class component as link', () => {
    const { getByText } = render(
      <Link component={ClassComponent}>Hello world!</Link>
    );
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass(classes.link);
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

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Link: {
          color: 'hotpink'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Link>Hello world!</Link>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
  });

  describe('color', () => {
    it('defaults to theme default', () => {
      const { getByText } = render(<Link>Hello world!</Link>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.default);
      expect(element).not.toHaveClass(classes.colorStates);
    });

    it('sets green color', () => {
      const { getByText } = render(<Link color="green">Hello world!</Link>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.default);
      expect(element).toHaveClass(classes.color.green);
      expect(element).toHaveClass(classes.colorStates);
    });

    it('sets info color', () => {
      const { getByText } = render(<Link color="info">Hello world!</Link>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.default);
      expect(element).toHaveClass(classes.color.info);
      expect(element).toHaveClass(classes.colorStates);
    });
  });

  describe('outline', () => {
    it('has no focus outline class by default', () => {
      const { getByText } = render(<Link>Hello world!</Link>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.focusOutline);
    });

    it('has a focus outline class when a key is clicked', () => {
      const { getByText } = render(<Link>Hello world!</Link>);

      act(() => {
        const ev = document.createEvent('KeyboardEvent');
        ev.initEvent('keydown', false, true);
        document.dispatchEvent(ev);
      });

      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.focusOutline);
    });
  });
});
