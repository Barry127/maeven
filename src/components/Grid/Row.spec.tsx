import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { Row } from './Row';
import { Col } from './Col';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

describe('Row', () => {
  afterEach(reinit);

  it('renders div element with given children', () => {
    render(<Row id="Row">My Row</Row>);
    const element = document.getElementById('Row');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('My Row');
  });

  it('sets className', () => {
    render(
      <Row id="Row" className="my-row-class">
        My Row
      </Row>
    );
    const element = document.getElementById('Row');
    expect(element!.classList).toContain('my-row-class');
  });

  it('passes props', () => {
    render(
      <Row id="Row" data-test="test-attr">
        My Row
      </Row>
    );
    const element = document.getElementById('Row');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('styles Theme ovrrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        Row: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Row id="Row">My Row</Row>
      </ThemeProvider>
    );

    const element = document.getElementById('Row');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });

  describe('align', () => {
    it('is normal by default', () => {
      render(<Row id="Row">My Row</Row>);
      const element = document.getElementById('Row');
      const styles = getStylesForElement(element!);
      expect(styles.alignItems).toBe('normal');
    });

    it('sets align top', () => {
      render(
        <Row id="Row" align="top">
          My Row
        </Row>
      );
      const element = document.getElementById('Row');
      const styles = getStylesForElement(element!);
      expect(styles.alignItems).toBe('flex-start');
    });

    it('sets align center', () => {
      render(
        <Row id="Row" align="center">
          My Row
        </Row>
      );
      const element = document.getElementById('Row');
      const styles = getStylesForElement(element!);
      expect(styles.alignItems).toBe('center');
    });
  });

  describe('gutter', () => {
    it('has no gutter by default', () => {
      render(
        <Row id="Row">
          <Col id="Col" />
        </Row>
      );
      const row = document.getElementById('Row');
      const col = document.getElementById('Col');
      const rowStyles = getStylesForElement(row!);
      const colStyles = getStylesForElement(col!);

      expect(rowStyles.marginLeft).toBe(0);
      expect(rowStyles.marginRight).toBe(0);
      expect(colStyles.marginLeft).toBe(0);
      expect(colStyles.marginRight).toBe(0);
      expect(colStyles.marginBottom).toBe(0);
    });

    it('sets gutter', () => {
      render(
        <Row id="Row" gutter={3}>
          <Col id="Col" />
        </Row>
      );
      const row = document.getElementById('Row');
      const col = document.getElementById('Col');
      const rowStyles = getStylesForElement(row!);
      const colStyles = getStylesForElement(col!);

      expect(rowStyles.marginLeft).toBe(-1.5 * MaevenTheme.base);
      expect(rowStyles.marginRight).toBe(-1.5 * MaevenTheme.base);
      expect(colStyles.marginLeft).toBe(1.5 * MaevenTheme.base);
      expect(colStyles.marginRight).toBe(1.5 * MaevenTheme.base);
      expect(colStyles.marginBottom).toBe(3 * MaevenTheme.base);
    });
  });

  describe('wrap', () => {
    it('wraps columns by default', () => {
      render(<Row id="Row">My Row</Row>);
      const element = document.getElementById('Row');
      const styles = getStylesForElement(element!);
      expect(styles.flexWrap).toBe('wrap');
    });

    it('sets wrap to false', () => {
      render(
        <Row wrap={false} id="Row">
          My Row
        </Row>
      );
      const element = document.getElementById('Row');
      const styles = getStylesForElement(element!);
      expect(styles.flexWrap).toBe('nowrap');
    });
  });
});
