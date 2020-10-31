import {
  ParserOptions,
  ComponentDoc,
  withDefaultConfig
} from 'react-docgen-typescript';
import { getComponentPaths } from './paths';

interface DocList {
  [component: string]: ComponentDoc;
}

export function parseProps() {
  return withDefaultConfig({
    propFilter,
    shouldExtractLiteralValuesFromEnum: true,
    shouldExtractValuesFromUnion: true
  })
    .parse(getComponentPaths())
    .reduce((componentsList, component) => {
      componentsList[component.displayName] = component;
      return componentsList;
    }, {} as DocList);
}

const whiteList = ['className'];
const blackList = [''];
const componentWhitelist = {
  Button: ['type'],
  Link: ['href']
};

const propFilter: ParserOptions['propFilter'] = (prop, component) => {
  if (blackList.includes(prop.name)) return false;
  if (whiteList.includes(prop.name)) return true;

  if ((componentWhitelist as any)[component.name]?.includes(prop.name))
    return true;

  if (prop.parent?.fileName.includes('node_modules')) return false;

  return true;
};
