import { NestedCSSProperties } from 'typestyle/lib/types';
import { style } from 'typestyle';
import { Color } from 'csstype';

import { Theme } from '../themes/types';

/**
 * Export a dictionary of NestedCSSProperties to classesNames and NestedCSSProperties
 */
export function exportStyles(css: NestedCSSPropertiesDictionary): StylesExport {
  return {
    css,
    classes: Object.keys(css).reduce((classes: ClassNamesDictionary, name) => {
      classes[name] = style(css[name]);
      return classes;
    }, {})
  };
}

interface NestedCSSPropertiesDictionary {
  [name: string]: NestedCSSProperties;
}

interface ClassNamesDictionary {
  [name: string]: string;
}

interface StylesExport {
  css: NestedCSSPropertiesDictionary;
  classes: ClassNamesDictionary;
}

/**
 * Get color from theme by name or semantic value
 */
export function getColorFromTheme(color: string, theme: Theme): null | Color {
  if (color in theme.colors.name) {
    return theme.colors.name[color as keyof Theme['colors']['name']];
  }

  if (color in theme.colors.semantic) {
    return theme.colors.semantic[color as keyof Theme['colors']['semantic']];
  }

  return null;
}
