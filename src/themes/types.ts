import { NestedCSSProperties } from 'typestyle/lib/types';
import { Color } from 'csstype';

export interface Overrides {
  [Component: string]: NestedCSSProperties;
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
      border: Color;
      text: Color;
      heading: Color;
      link: Color;
      textSelection: Color;
      textSelectionBackground: Color;
    };
  };
  overrides: Overrides;
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
