// import webFont from 'webfontloader';
import { color } from 'csx';

import { Theme } from '../types';
import {
  blue,
  cyan,
  darkGrey,
  green,
  grey,
  indigo,
  orange,
  pink,
  purple,
  red,
  teal,
  white,
  yellow,
  secondary,
  textColor
} from './colors';
import { xs, sm, md, lg, xl } from './media';

const BASE = 4;

// webFont.load({
//   google: { families: ['Droid Sans:400,600,700'] }
// });

const meavenTheme: Theme = {
  name: 'Maeven',
  base: BASE,
  colors: {
    name: {
      black: textColor,
      blue,
      cyan,
      darkGrey,
      green,
      grey,
      indigo,
      orange,
      pink,
      purple,
      red,
      teal,
      white,
      yellow
    },
    semantic: {
      primary: blue,
      secondary,
      success: green,
      info: cyan,
      warning: orange,
      danger: red
    },
    types: {
      text: textColor,
      heading: textColor,
      link: blue,
      textSelection: white,
      textSelectionBackground: blue
    }
  },
  overrides: {
    A: {
      $nest: {
        '&:hover': {
          color: color(yellow)
            .darken(0.1)
            .toString()
        },
        '&:focus': {
          color: color(yellow)
            .darken(0.1)
            .toString()
        },
        '&:active': {
          color: color(yellow)
            .darken(0.125)
            .toString()
        }
      }
    }
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontFamilyMonospace:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    fontSize: BASE * 4,
    fontWeight: 400,
    lineHeight: `${BASE * 6}px`,
    headings: {
      fontWeight: 400
    }
  },
  media: {
    xs,
    sm,
    md,
    lg,
    xl
  }
};

export default meavenTheme;
