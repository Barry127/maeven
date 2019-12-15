import { AllHTMLAttributes, SVGProps } from 'react';
import { NestedCSSProperties } from 'typestyle/lib/types';

export interface MaevenIcon {
  tag: keyof JSX.IntrinsicElements;
  attrs: AllHTMLAttributes<any> & SVGProps<any>;
  children?: this[] | string;
}

export interface MediaDefinition {
  from: number;
  to: number;
  mediaMin: string;
  mediaMax: string;
}

export interface Theme {
  name: string;
  base: string | number;
  sizes: {
    borderRadius: {
      medium: string | number;
      large: string | number;
    };
  };
  colors: {
    name: {
      black: string;
      blue: string;
      cyan: string;
      darkGrey: string;
      green: string;
      grey: string;
      indigo: string;
      orange: string;
      pink: string;
      purple: string;
      red: string;
      teal: string;
      white: string;
      yellow: string;
    };
    semantic: {
      danger: string;
      info: string;
      primary: string;
      secondary: string;
      success: string;
      warning: string;
    };
    role: {
      background: string;
      bodyBackground: string;
      focus: string;
      heading: string;
      link: string;
      linkHover: string;
      linkFocus: string;
      linkActive: string;
      text: string;
      textInverted: string;
      textSelection: string;
      textSelectionBackground: string;
    };
  };
  typography: {
    fontFamily: string;
    fontFamilyMonospace: string;
    fontWeight:
      | number
      | 'normal'
      | 'bold'
      | 'lighter'
      | 'bolder'
      | 'inherit'
      | 'initial'
      | 'unset';
    lineHeight: number | string;
    heading: {
      fontFamily: string;
      fontWeight:
        | number
        | 'normal'
        | 'bold'
        | 'lighter'
        | 'bolder'
        | 'inherit'
        | 'initial'
        | 'unset';
    };
  };
  media: {
    xs: MediaDefinition;
    sm: MediaDefinition;
    md: MediaDefinition;
    lg: MediaDefinition;
    xl: MediaDefinition;
  };
  styleOverrides?: {
    [ComponentName: string]: NestedCSSProperties;
  };
}

export type ColorName = keyof Theme['colors']['name'];

export type SemanticColorName = keyof Theme['colors']['semantic'];

export type ThemeColor = ColorName | SemanticColorName;
