import { color } from 'csx';

import { Theme } from '../../types';

import { classes as buttonClasses } from '../../components/Button/styles';

import {
  black,
  blue,
  border,
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
} from './colors';
import { xs, sm, md, lg, xl } from './media';

const theme: Theme = {
  name: 'Maeven',
  base: 16,
  sizes: {
    borderRadius: {
      medium: 6,
      large: 12
    }
  },
  animations: {
    defaultTiming: '.2s',
    defaultTimingFunction: 'cubic-bezier(0.4,1,0.75,0.9)'
  },
  colors: {
    name: {
      black,
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
      danger: red,
      info: cyan,
      primary: blue,
      secondary: '#f5f8f5',
      success: green,
      warning: orange
    },
    role: {
      background: white,
      bodyBackground: '#f5f8fb',
      border,
      focus: color(blue)
        .fade(0.5)
        .toString(),
      focusBorder: blue,
      heading: black,
      link: blue,
      linkHover: color(yellow)
        .darken(0.1)
        .toString(),
      linkFocus: color(yellow)
        .darken(0.1)
        .toString(),
      linkActive: color(yellow)
        .darken(0.125)
        .toString(),
      text: black,
      textInverted: white,
      textLight: white,
      textDark: black,
      textSelection: white,
      textSelectionBackground: blue
    }
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontFamilyMonospace:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    fontWeight: 400,
    lineHeight: '1.5',
    heading: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fontWeight: 400
    }
  },
  media: {
    xs,
    sm,
    md,
    lg,
    xl
  },
  styleOverrides: {
    Button: {
      $nest: {
        [`&.${buttonClasses.outline}.${buttonClasses.buttonTypes.secondary}`]: {
          color: black
        }
      }
    }
  }
};

export default theme;
