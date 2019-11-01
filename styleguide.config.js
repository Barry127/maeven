const path = require('path');
const fs = require('fs');
const { version } = require('./package.json');

module.exports = {
  title: 'Maeven',
  version,
  moduleAliases: {
    '@maeven-doc-assets': path.resolve(__dirname, 'src', 'docs', 'assets'),
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
      name: 'Docs',
      sectionDepth: 2,
      sections: [
        {
          name: 'Grid',
          content: './src/docs/grid.md'
        },
        {
          name: 'Icons',
          content: './src/docs/icons.md'
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
    },
    {
      name: 'Types',
      content: './src/docs/types.md',
      sections: getTypeDocs()
    }
  ],
  updateExample
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

function getTypeDocs() {
  return fs.readdirSync('./src/docs/types').map(fileName => ({
    name: fileName.slice(0, -3),
    content: `./src/docs/types/${fileName}`
  }));
}

const whiteList = ['className'];
const componentWhitelist = {
  AnchorButton: ['href'],
  Button: ['type'],
  Link: ['href']
};

function propFilter(prop, component) {
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

function updateExample(props, exampleFilePath) {
  const { settings, lang } = props;
  if (typeof settings.file === 'string') {
    const filePath = settings.file.startsWith('.')
      ? path.resolve(exampleFilePath, settings.file)
      : path.join(__dirname, settings.file);
    delete settings.file;
    return {
      content: fs.readFileSync(filePath, 'utf8'),
      settings,
      lang
    };
  }

  return props;
}
