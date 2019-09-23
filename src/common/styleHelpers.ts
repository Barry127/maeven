import { NestedCSSProperties } from 'typestyle/lib/types';
import { style } from 'typestyle';

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
