import chokidar from 'chokidar';
import fs from 'fs';
import prettier from 'prettier';
// import { generateRouter, parseMdx } from './parseMdx';
import { parseProps } from './parseProps';
import { files, paths } from './paths';

const watchMode = process.argv.includes('--watch');

if (watchMode) {
  chokidar.watch(`${paths.components}/**/*.tsx`).on('change', generateProps);
  // chokidar.watch(`${paths.pages}/**.*.md{,x}`).on('change', generatePages);
}

generateProps();
// generatePages();

function generateProps() {
  const props = parseProps();
  fs.writeFileSync(
    files.props,
    prettier.format(JSON.stringify(props), {
      parser: 'json'
    })
  );
}

// function generatePages() {
//   const tree = parseMdx();
//   generateRouter(tree);
// }
