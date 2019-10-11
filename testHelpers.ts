import { Stylesheet, Rule, Declaration, Media } from 'css';
import { CSSProperties, NestedCSSProperties } from 'typestyle/lib/types';
import { getStyles as tsGetStyles } from 'typestyle';
import { parse } from 'css';

import { MaevenTheme } from './src';

export { reinit } from 'typestyle';

export const MEDIA_XS = MaevenTheme.media.xs.mediaMax;
export const MEDIA_SM = `${MaevenTheme.media.sm.mediaMin} and ${MaevenTheme.media.sm.mediaMax}`;
export const MEDIA_MD = `${MaevenTheme.media.md.mediaMin} and ${MaevenTheme.media.md.mediaMax}`;
export const MEDIA_LG = `${MaevenTheme.media.lg.mediaMin} and ${MaevenTheme.media.lg.mediaMax}`;
export const MEDIA_XL = MaevenTheme.media.xl.mediaMin;

export function getStylesForElement(element: Element): NestedCSSProperties {
  const className = '.' + element!.classList[0];
  const styles = getStyles();
  return styles[className];
}

export function getStylesForSelector(match: RegExp): NestedCSSProperties {
  const styles = getStyles();
  return styles[Object.keys(styles).filter(key => key.match(match))[0]] || {};
}

export function getStyles(): CSSPropertiesDictionary {
  return cssAst2CSSProperties(parse(tsGetStyles()));
}

export function cssAst2CSSProperties(
  stylesheet: Stylesheet
): CSSPropertiesDictionary {
  const allProperties: CSSPropertiesDictionary = {};

  stylesheet.stylesheet!.rules.forEach(rule => {
    switch (rule.type) {
      case 'rule':
        const { selector, map } = parseRule(rule);
        if (allProperties[selector]) {
          allProperties[selector] = {
            ...allProperties[selector],
            ...map
          };
        } else {
          allProperties[selector] = map;
        }
        break;

      case 'media':
        const { media, rules } = rule as Media;
        //@ts-ignore
        rules.forEach(rule => {
          if (rule.type === 'rule') {
            const { selector, map } = parseRule(rule);
            if (allProperties[selector]) {
              if (allProperties[selector].$nest) {
                allProperties[selector].$nest = {
                  ...allProperties[selector].$nest,
                  [media!]: map
                };
              } else {
                allProperties[selector].$nest = {
                  [media!]: map
                };
              }
            } else {
              allProperties[selector] = {
                $nest: {
                  [media!]: map
                }
              };
            }
          }
        });
        break;
    }
  });

  return nestPseudoSelectors(allProperties);
}

interface CSSPropertiesDictionary {
  [selector: string]: NestedCSSProperties;
}

interface ParsedRule {
  selector: string;
  map: CSSProperties;
}

interface ParsedDeclaration {
  property: string;
  value: string | number | null | undefined;
}

function nestPseudoSelectors(
  styles: CSSPropertiesDictionary
): CSSPropertiesDictionary {
  const nestedStyles = { ...styles };

  function _nestSelector(selector: string, breakPoint: string) {
    const offset = selector.indexOf(breakPoint);
    const parentSelector = selector.substr(0, offset);
    const nestedSelector = `&${selector.substr(offset)}`;
    if (!nestedStyles[parentSelector]) {
      nestedStyles[parentSelector] = {
        $nest: {}
      };
    }
    if (!nestedStyles[parentSelector].$nest) {
      nestedStyles[parentSelector].$nest = {};
    }
    nestedStyles[parentSelector].$nest = {
      ...nestedStyles[parentSelector].$nest,
      [nestedSelector]: nestedStyles[selector]
    };
  }

  Object.keys(nestedStyles).forEach(selector => {
    if (selector.includes(' ')) {
      _nestSelector(selector, ' ');
    } else if (selector.includes(':')) {
      _nestSelector(selector, ':');
    }
  });

  return nestedStyles;
}

function parseRule(rule: Rule): ParsedRule {
  const selector = rule.selectors!.join(' ');
  const map: CSSProperties = {};

  (rule as Rule).declarations!.forEach(declaration => {
    if (declaration.type === 'declaration') {
      const { property, value } = parseDeclaration(declaration);
      //@ts-ignore
      map[property] = value;
    }
  });
  return { selector, map };
}

function parseDeclaration(declaration: Declaration): ParsedDeclaration {
  const property = kebabCase2CamelCase(declaration.property!);

  let value: ParsedDeclaration['value'] = declaration.value;

  if (property !== 'lineHeight' && declaration.value!.endsWith('px')) {
    value = declaration.value!.substring(0, declaration.value!.length - 2);
  }

  if (!isNaN(value as any)) {
    value = Number(value);
  }

  return { property, value };
}

function kebabCase2CamelCase(str: string) {
  return str.split('-').reduce((prop, part, index) => {
    if (index === 0) {
      return part;
    }

    return `${prop}${part.charAt(0).toUpperCase()}${part.slice(1)}`;
  }, '');
}
