import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { reinit, getStyles } from 'typestyle';

import { MaevenDefault, ThemeProvider } from '../..';

describe('ThemeProvider', () => {
  beforeEach(reinit);

  describe('global', () => {
    it('Does not add any global styling by default', () => {
      render(<ThemeProvider theme={MaevenDefault}></ThemeProvider>);
      const styles = getStyles();
      expect(styles).not.toContain('body{');
    });

    it('Adds styling for body when global is true', () => {
      render(<ThemeProvider global theme={MaevenDefault}></ThemeProvider>);
      const styles = getStyles();
      expect(styles).toContain('body{');
    });
  });
});
