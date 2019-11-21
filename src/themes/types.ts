import { NestedCSSProperties } from 'typestyle/lib/types';
import { Color } from 'csstype';

import { IconType } from '../components/types';

export interface Overrides {
  [Component: string]: NestedCSSProperties;
}

export interface IconOverrides {
  hidePassword?: IconType;
  showPassword?: IconType;
}

export interface MediaQuery {
  from: number;
  to: number;
  mediaMin: string;
  mediaMax: string;
}

type CSSFontWeight =
  | number
  | 'normal'
  | 'bold'
  | 'lighter'
  | 'bolder'
  | 'inherit'
  | 'initial'
  | 'unset';

export interface Theme {
  name: string;
  base: number;
  sizes: {
    borderRadius: {
      medium: number | string;
      large: number | string;
    };
  };
  animations: {
    defaultTiming: string;
    defaultTimingFunction: string;
  };
  colors: {
    name: {
      black: Color;
      blue: Color;
      cyan: Color;
      darkGrey: Color;
      green: Color;
      grey: Color;
      indigo: Color;
      orange: Color;
      pink: Color;
      purple: Color;
      red: Color;
      teal: Color;
      white: Color;
      yellow: Color;
    };
    semantic: {
      primary: Color;
      secondary: Color;
      success: Color;
      info: Color;
      warning: Color;
      danger: Color;
    };
    types: {
      background: Color;
      gobalBackground: Color;
      border: Color;
      text: Color;
      heading: Color;
      link: Color;
      textSelection: Color;
      textSelectionBackground: Color;
      focus: Color;
    };
  };
  overrides: Overrides;
  iconOverrides: IconOverrides;
  typography: {
    fontFamily: string;
    fontFamilyMonospace: string;
    fontSize: number;
    fontWeight: CSSFontWeight;
    lineHeight: number | string;
    headings: {
      fontWeight: CSSFontWeight;
    };
  };
  media: {
    xs: MediaQuery;
    sm: MediaQuery;
    md: MediaQuery;
    lg: MediaQuery;
    xl: MediaQuery;
  };
}
