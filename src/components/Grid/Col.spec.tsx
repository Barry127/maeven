import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import {
  getStylesForElement,
  reinit,
  MEDIA_XS,
  MEDIA_SM,
  MEDIA_MD,
  MEDIA_LG,
  MEDIA_XL
} from '../../../testHelpers';

import { Col } from './Col';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

describe('Col', () => {
  afterEach(reinit);

  it('renders div element with given children', () => {
    render(<Col id="Col">My Col</Col>);
    const element = document.getElementById('Col');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('My Col');
  });

  it('sets className', () => {
    render(
      <Col id="Col" className="my-col-class">
        My Col
      </Col>
    );
    const element = document.getElementById('Col');
    expect(element!.classList).toContain('my-col-class');
  });

  it('passes props', () => {
    render(
      <Col id="Col" data-test="test-attr">
        My Col
      </Col>
    );
    const element = document.getElementById('Col');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('styles Theme ovrrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        Col: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Col id="Col">My Col</Col>
      </ThemeProvider>
    );

    const element = document.getElementById('Col');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });

  describe('hidden', () => {
    it('is not hidden by default', () => {
      render(<Col id="Col">My Col</Col>);
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty('display');
    });

    it('sets hidden with boolean', () => {
      render(
        <Col hidden id="Col">
          My Col
        </Col>
      );
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles.display).toBe('none');
    });

    it('sets hidden with array', () => {
      render(
        <Col hidden={['sm', 'lg']} id="Col">
          My Col
        </Col>
      );
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty('display');
      expect((styles.$nest![MEDIA_SM]! || {}).display).toBe('none');
      expect(styles.$nest![MEDIA_MD]! || {}).not.toHaveProperty('display');
      expect((styles.$nest![MEDIA_LG]! || {}).display).toBe('none');
    });

    it('sets hidden with string', () => {
      render(
        <Col hidden="md" id="Col">
          My Col
        </Col>
      );
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles).not.toHaveProperty('display');
      expect((styles.$nest![MEDIA_XS]! || {}).display).toBe('none');
      expect((styles.$nest![MEDIA_SM]! || {}).display).toBe('none');
      expect((styles.$nest![MEDIA_MD]! || {}).display).toBe('none');
      expect(styles.$nest![MEDIA_LG]! || {}).not.toHaveProperty('display');
    });
  });

  describe('span width', () => {
    it('has an auto width by default', () => {
      render(<Col id="Col">My Col</Col>);
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles.flex).toBe('1 1 auto');
    });

    it('sets xs', () => {
      render(
        <Col span={6} xs={24} id="Col">
          My Col
        </Col>
      );
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XS]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_SM]!.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_MD]!.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_LG]!.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XL]!.flex).toBe('0 0 calc(25% - 0px)');
    });

    it('sets sm', () => {
      render(
        <Col span={6} sm={24} id="Col">
          My Col
        </Col>
      );
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XS]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_SM]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_MD]!.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_LG]!.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XL]!.flex).toBe('0 0 calc(25% - 0px)');
    });

    it('sets md', () => {
      render(
        <Col span={6} md={24} id="Col">
          My Col
        </Col>
      );
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XS]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_SM]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_MD]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_LG]!.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XL]!.flex).toBe('0 0 calc(25% - 0px)');
    });

    it('sets lg', () => {
      render(
        <Col span={6} lg={24} id="Col">
          My Col
        </Col>
      );
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XS]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_SM]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_MD]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_LG]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_XL]!.flex).toBe('0 0 calc(25% - 0px)');
    });

    it('sets xl', () => {
      render(
        <Col span={6} xl={24} id="Col">
          My Col
        </Col>
      );
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XS]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_SM]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_MD]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_LG]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_XL]!.flex).toBe('0 0 calc(100% - 0px)');
    });

    it('sets multiple spans', () => {
      render(
        <Col span={6} md={12} xs={24} id="Col">
          My Col
        </Col>
      );
      const element = document.getElementById('Col');
      const styles = getStylesForElement(element!);
      expect(styles.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XS]!.flex).toBe('0 0 calc(100% - 0px)');
      expect(styles.$nest![MEDIA_SM]!.flex).toBe('0 0 calc(50% - 0px)');
      expect(styles.$nest![MEDIA_MD]!.flex).toBe('0 0 calc(50% - 0px)');
      expect(styles.$nest![MEDIA_LG]!.flex).toBe('0 0 calc(25% - 0px)');
      expect(styles.$nest![MEDIA_XL]!.flex).toBe('0 0 calc(25% - 0px)');
    });
  });
});
