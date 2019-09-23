const path = require('path');
const fs = require('fs');
const { version } = require('./package.json');

module.exports = {
  title: 'Maeven',
  version,
  moduleAliases: {
    maeven: path.resolve(__dirname, 'src')
  },
  styleguideDir: './docs',
  propsParser: require('react-docgen-typescript').withDefaultConfig({
    propFilter
  }).parse,
  pagePerSection: true,
  sections: [
    {
      name: 'Maeven',
      content: './src/docs/maeven.md',
      sectionDepth: 2,
      sections: [
        {
          name: 'Getting Started',
          content: './src/docs/gettingStarted.md'
        },
        {
          name: 'License',
          content: './LICENSE'
        }
      ]
    },
    {
      name: 'Components',
      sectionDepth: 2,
      usageMode: 'expand',
      components: () => ['./src/components/**/[A-Z]*.{js,jsx,ts,tsx}']
    },
    {
      name: 'Hooks',
      sectionDepth: 2,
      sections: getHooksDocs()
    }
  ]
};

function getHooksDocs() {
  return fs
    .readdirSync('./src/hooks')
    .filter(fileName => fs.lstatSync(`./src/hooks/${fileName}`).isDirectory())
    .filter(fileName => fs.existsSync(`./src/hooks/${fileName}/${fileName}.md`))
    .map(fileName => ({
      name: fileName,
      content: `./src/hooks/${fileName}/${fileName}.md`
    }));
}

const whiteList = ['className'];

function propFilter(prop, component) {
  if (whiteList.includes(prop.name)) return true;

  if (prop.parent && prop.parent.fileName.includes('node_modules')) {
    return false;
  }

  return true;
}
