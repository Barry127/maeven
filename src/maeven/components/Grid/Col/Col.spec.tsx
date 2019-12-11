import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { reinit, getStyles } from 'typestyle';

import { MaevenDefault, ThemeProvider } from '../../..';

import { Col } from './Col';
import { classes, themeOverride } from './styles';

describe('Col', () => {
  beforeEach(reinit);

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

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Col: {
          color: 'pink'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Col>Hello world!</Col>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
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
      const styles = getStyles();

      expect(element).not.toHaveClass(classes.hidden);
      expect(styles.match(/display:none/g)).toBeNull();
    });

    it('sets hidden with boolean', () => {
      const { getByText } = render(<Col hidden>Hello world!</Col>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.hidden);
    });

    it('sets hidden with array', () => {
      const { getByText } = render(
        <Col hidden={['md', 'lg', 'xl']}>Hello world!</Col>
      );
      const element = getByText('Hello world!');
      const styles = getStyles();

      expect(element).not.toHaveClass(classes.hidden);
      expect(styles.match(/display:none/g)).toHaveLength(3);
    });

    it('sets hidden with string', () => {
      const { getByText } = render(<Col hidden="sm">Hello world!</Col>);
      const element = getByText('Hello world!');
      const styles = getStyles();

      expect(element).not.toHaveClass(classes.hidden);
      // hidden for sm and xl
      expect(styles.match(/display:none/g)).toHaveLength(2);
    });
  });

  describe('span width', () => {
    it('has an auto width by default', () => {
      render(<Col>Hello world!</Col>);
      const styles = getStyles();

      // sm md lg xl = 4x (default style removed by reinit)
      expect(styles.match(/flex:1 1 auto/g)).toHaveLength(4);
      //xs
      expect(
        styles.match(/flex:0 0 calc\(100% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(1);
    });

    it('sets xs', () => {
      render(
        <Col span={6} xs={12}>
          Hello world!
        </Col>
      );
      const styles = getStyles();

      // default-span sm md lg xl
      expect(
        styles.match(/flex:0 0 calc\(25% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(5);
      //xs
      expect(
        styles.match(/flex:0 0 calc\(50% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(1);
    });

    it('sets sm', () => {
      render(
        <Col span={6} sm={12} xs={0}>
          Hello world!
        </Col>
      );
      const styles = getStyles();

      // default-span md lg xl
      expect(
        styles.match(/flex:0 0 calc\(25% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(4);
      // xs sm
      expect(
        styles.match(/flex:0 0 calc\(50% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(2);
    });

    it('sets md', () => {
      render(
        <Col span={6} md={12} xs={0}>
          Hello world!
        </Col>
      );
      const styles = getStyles();

      // default-span lg xl
      expect(
        styles.match(/flex:0 0 calc\(25% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(3);
      // xs sm md
      expect(
        styles.match(/flex:0 0 calc\(50% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(3);
    });

    it('sets lg', () => {
      render(
        <Col span={6} lg={12} xs={0}>
          Hello world!
        </Col>
      );
      const styles = getStyles();

      // default-span xl
      expect(
        styles.match(/flex:0 0 calc\(25% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(2);
      // xs sm md lg
      expect(
        styles.match(/flex:0 0 calc\(50% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(4);
    });

    it('sets xl', () => {
      render(
        <Col span={6} xl={12} xs={0}>
          Hello world!
        </Col>
      );
      const styles = getStyles();

      // default-span
      expect(
        styles.match(/flex:0 0 calc\(25% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(1);
      // xs sm md lg xl
      expect(
        styles.match(/flex:0 0 calc\(50% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(5);
    });

    it('sets multiple spans', () => {
      render(
        <Col span={6} md={12} xs={18}>
          Hello world!
        </Col>
      );
      const styles = getStyles();

      // default-span lg xl
      expect(
        styles.match(/flex:0 0 calc\(25% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(3);
      // sm md
      expect(
        styles.match(/flex:0 0 calc\(50% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(2);
      //xs
      expect(
        styles.match(/flex:0 0 calc\(75% - var\(--maeven-row-gutter\)\)/g)
      ).toHaveLength(1);
    });
  });

  describe('transparent', () => {
    it('is not transparent by default', () => {
      const { getByText } = render(<Col>Hello world!</Col>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass(classes.transparent);
    });

    it('sets transparent', () => {
      const { getByText } = render(<Col transparent>Hello world!</Col>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass(classes.transparent);
    });
  });
});
