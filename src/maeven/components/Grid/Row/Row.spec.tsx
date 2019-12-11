import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { reinit, getStyles } from 'typestyle';

import { MaevenDefault, ThemeProvider } from '../../..';

import { Row } from './Row';
import { classes, themeOverride } from './styles';

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

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Row: {
          color: 'teal'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Row>Hello world!</Row>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
  });

  describe('align', () => {
    it('is normal by default', () => {
      const { getByText } = render(<Row>Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.align.normal);
    });

    it('sets top', () => {
      const { getByText } = render(<Row align="top">Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.align.top);
    });

    it('sets center', () => {
      const { getByText } = render(<Row align="center">Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.align.center);
    });

    it('sets bottom', () => {
      const { getByText } = render(<Row align="bottom">Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.align.bottom);
    });

    it('sets baseline', () => {
      const { getByText } = render(<Row align="baseline">Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.align.baseline);
    });

    it('sets stretch', () => {
      const { getByText } = render(<Row align="stretch">Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.align.stretch);
    });
  });

  describe('gutter', () => {
    beforeEach(reinit);

    it('has no gutter by default', () => {
      render(<Row>Hello world!</Row>);
      const styles = getStyles();
      expect(styles).toContain(
        'margin-left:calc((var(--maeven-base) * -0) / 2)'
      );
    });

    it('sets gutter', () => {
      render(<Row gutter={2}>Hello world!</Row>);
      const styles = getStyles();
      expect(styles).toContain(
        'margin-left:calc((var(--maeven-base) * -2) / 2)'
      );
    });
  });

  describe('wrap', () => {
    it('wraps columns by default', () => {
      const { getByText } = render(<Row>Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.wrap);
    });

    it('sets wrap to false', () => {
      const { getByText } = render(<Row wrap={false}>Hello world!</Row>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.noWrap);
    });
  });
});
