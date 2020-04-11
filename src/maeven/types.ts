import {
  AllHTMLAttributes,
  SVGProps,
  ComponentClass,
  StatelessComponent
} from 'react';

export interface MaevenIcon {
  tag: keyof JSX.IntrinsicElements;
  attrs: AllHTMLAttributes<any> & SVGProps<any>;
  children?: this[] | string;
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

export type Color = ColorName | SemanticColorName;

export type BackgroundColor = Color | 'background' | 'textBackground';

export type InstrinctElement = keyof JSX.IntrinsicElements;

export type ReactComponent = ComponentClass<any> | StatelessComponent<any>;
