import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Heading } from './Heading';
import { classes, themeOverride } from './styles';

describe('Heading', () => {
  it('renders h1 element with given text', () => {
    const { getByText } = render(<Heading level="h1">Hello world!</Heading>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('H1');
    expect(element).toHaveClass(classes.h1);
  });

  it('renders h5 element with given text', () => {
    const { getByText } = render(<Heading level="h5">Hello world!</Heading>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('H5');
    expect(element).toHaveClass(classes.h5);
  });

  it('sets className', () => {
    const { getByText } = render(
      <Heading level="h1" className="heading-class">
        Hello world!
      </Heading>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('heading-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Heading level="h1" id="HeadingId" data-test="heading-data">
        Hello world!
      </Heading>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'HeadingId');
    expect(element.dataset.test).toBe('heading-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Heading: {
          color: 'yellow'
        }
      }
    };

    const expectedClassName = themeOverride(theme, 'h1');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Heading level="h1">Hello world!</Heading>
      </ThemeProvider>
    );

    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
  });

  describe('color', () => {
    it('sets green color', () => {
      const { getByText } = render(
        <Heading level="h1" color="green">
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.color.green);
    });

    it('sets info color', () => {
      const { getByText } = render(
        <Heading level="h1" color="info">
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.color.info);
    });
  });

  describe('size', () => {
    it('defaults to level size', () => {
      const { getByText } = render(<Heading level="h2">Hello world!</Heading>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.h2);
    });

    it('it sets h3 size for a h1 level', () => {
      const { getByText } = render(
        <Heading level="h1" size="h3">
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.h3);
      expect(element).not.toHaveClass(classes.h1);
    });
  });

  describe('truncate', () => {
    it('does not truncate by default', () => {
      const { getByText } = render(<Heading level="h1">Hello world!</Heading>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.truncate);
    });

    it('sets truncate', () => {
      const { getByText } = render(
        <Heading level="h1" truncate>
          Hello world!
        </Heading>
      );
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.truncate);
    });
  });
});
