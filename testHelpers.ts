import { Stylesheet, Rule, Declaration } from 'css';
import { CSSProperties } from 'typestyle/lib/types';
import { getStyles as tsGetStyles } from 'typestyle';
import { parse } from 'css';

export { reinit } from 'typestyle';

export function getStylesForElement(element: Element): CSSProperties {
  const className = '.' + element!.classList[0];
  const styles = getStyles();
  return styles[className];
}

export function getStylesForSelector(match: RegExp): CSSProperties {
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
    if (rule.type === 'rule') {
      const { selector, map } = parseRule(rule);
      allProperties[selector] = map;
    }
  });

  return allProperties;
}

interface CSSPropertiesDictionary {
  [selector: string]: CSSProperties;
}

interface ParsedRule {
  selector: string;
  map: CSSProperties;
}

interface ParsedDeclaration {
  property: string;
  value: string | number | null | undefined;
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
