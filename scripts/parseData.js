const fs = require('fs');
const prettier = require('prettier');

const chokidar = require('chokidar');

const { paths } = require('./paths');
const parseProps = require('./parseProps');
const parseMDXData = require('./parseMDXData');

const watchMode = process.argv.includes('--watch');

if (watchMode) {
  chokidar.watch(`${paths.components}/**/*.tsx`).on('change', updateProps);
  chokidar.watch(`${paths.maeven}/**/*.md{,x}`).on('all', updateDocs);
} else {
  generateAll();
}

function generateAll() {
  const props = parseProps();
  const docs = parseMDXData();

  const propsData = `export const propsData = ${JSON.stringify(
    props,
    null,
    2
  )}`;
  writeData(propsData, paths.propsData);

  const docsData = `export const docsData = ${JSON.stringify(docs, null, 2)}`;
  writeData(docsData, paths.docsData);
}

function updateProps() {
  const props = parseProps();

  const propsData = `export const propsData = ${JSON.stringify(
    props,
    null,
    2
  )}`;
  writeData(propsData, paths.propsData);
}

function updateDocs() {
  const docs = parseMDXData();

  const docsData = `export const docsData = ${JSON.stringify(docs, null, 2)}`;
  writeData(docsData, paths.docsData);
}

function writeData(data, path) {
  fs.writeFileSync(
    path,
    prettier.format(data, { singleQuote: true, parser: 'babel' })
  );
}
