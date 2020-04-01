import {
  AllHTMLAttributes,
  SVGProps,
  ComponentClass,
  StatelessComponent
} from 'react';
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

export interface IconOverrides {
  check?: MaevenIcon;
  chevronDown?: MaevenIcon;
  chevronLeft?: MaevenIcon;
  chevronRight?: MaevenIcon;
  chevronUp?: MaevenIcon;
  close?: MaevenIcon;
  danger?: MaevenIcon;
  indeterminate?: MaevenIcon;
  info?: MaevenIcon;
  inlineLoading?: MaevenIcon;
  hidePassword?: MaevenIcon;
  maximize?: MaevenIcon;
  minimize?: MaevenIcon;
  showPassword?: MaevenIcon;
  success?: MaevenIcon;
  warning?: MaevenIcon;
}

export interface Theme {
  name: string;
  base: string | number;
  sizes: {
    borderRadius: {
      small: string | number;
      medium: string | number;
      large: string | number;
    };
  };
  animations: {
    defaultTiming: string;
    defaultTimingFunction: string;
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
      border: string;
      focus: string;
      focusBorder: string;
      heading: string;
      link: string;
      linkHover: string;
      linkFocus: string;
      linkActive: string;
      text: string;
      textInverted: string;
      textLight: string;
      textDark: string;
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
  iconOverrides?: IconOverrides;
  styleOverrides?: {
    [ComponentName: string]: NestedCSSProperties;
  };
}

export type ColorName =
  | 'black'
  | 'white'
  | 'darkGrey'
  | 'grey'
  | 'lightGrey'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'pink';

export type SemanticColorName = 'primary' | 'success' | 'warning' | 'danger';

// remove in 0.2
export type ThemeColor = ColorName | SemanticColorName;

export type Color = ColorName | SemanticColorName;

export type InstrinctElement = keyof JSX.IntrinsicElements;

export type ReactComponent = ComponentClass<any> | StatelessComponent<any>;
