const fs = require('fs');
const path = require('path');

const paths = {
  components: path.join(__dirname, '..', 'src', 'maeven', 'components'),
  hooks: path.join(__dirname, '..', 'src', 'maeven', 'hooks'),
  propsData: path.join(__dirname, '..', 'src', 'docs', '_data', 'props.ts'),
  docsData: path.join(__dirname, '..', 'src', 'docs', '_data', 'docs.ts'),
  dataDir: path.join(__dirname, '..', 'src', 'docs', '_data'),
  maeven: path.join(__dirname, '..', 'src', 'maeven'),
  src: path.join(__dirname, '..', 'src')
};

if (!fs.existsSync(paths.dataDir)) {
  fs.mkdirSync(paths.dataDir);
}

function listComponentPaths() {
  const components = [];

  function listDir(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullFile = path.join(dir, file);
      if (fs.statSync(fullFile).isDirectory()) {
        listDir(fullFile);
      } else if (file.endsWith('.tsx') && !file.includes('.spec.ts')) {
        components.push(fullFile);
      }
    });
  }

  listDir(paths.components);

  return components;
}

function listDocPaths() {
  const docs = [];

  function listDir(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullFile = path.join(dir, file);
      if (fs.statSync(fullFile).isDirectory()) {
        listDir(fullFile);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        docs.push(fullFile);
      }
    });
  }

  listDir(paths.maeven);

  return docs;
}

module.exports = {
  paths,
  listComponentPaths,
  listDocPaths
};
