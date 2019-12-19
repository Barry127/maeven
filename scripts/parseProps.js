const docgen = require('react-docgen-typescript');

const { listComponentPaths } = require('./paths');

function parse() {
  return docgen
    .withDefaultConfig({
      propFilter,
      shouldExtractLiteralValuesFromEnum: true
    })
    .parse(listComponentPaths())
    .reduce((dict, component) => {
      dict[component.displayName] = component;
      return dict;
    }, {});
}

module.exports = parse;

const whiteList = ['className'];
const blackList = ['forwardedRef'];
const componentWhitelist = {
  AnchorButton: ['href'],
  Button: ['type'],
  Link: ['href']
};

function propFilter(prop, component) {
  if (blackList.includes(prop.name)) return false;
  if (whiteList.includes(prop.name)) return true;

  if (
    componentWhitelist[component.name] &&
    componentWhitelist[component.name].includes(prop.name)
  )
    return true;

  if (prop.parent && prop.parent.fileName.includes('node_modules')) {
    return false;
  }

  if (prop.type.name === 'ReactText') {
    prop.type.name = 'string | number';
  }

  return true;
}
