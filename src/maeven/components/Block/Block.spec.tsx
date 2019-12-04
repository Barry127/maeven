import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Block } from './Block';
import { themeOverride } from './styles';

describe('Block', () => {
  it('renders a div element with given text', () => {
    const { getByText } = render(<Block>Hello world!</Block>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Block className="block-class">Hello world!</Block>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('block-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Block id="BlockId" data-test="block-data">
        Hello world!
      </Block>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'BlockId');
    expect(element.dataset.test).toBe('block-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Block: {
          color: 'yellow'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Block>Hello world!</Block>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
  });

  it('renders a main component', () => {
    const { getByText } = render(<Block component="main">Hello world!</Block>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('MAIN');
  });

  it('renders an article component', () => {
    const { getByText } = render(
      <Block component="article">Hello world!</Block>
    );
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('ARTICLE');
  });
});
