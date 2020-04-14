const fs = require('fs');
const path = require('path');

const prompts = require('prompts');
const chalk = require('chalk');

const { paths } = require('./paths');

module.exports = async () => {
  let name = await getName();

  if (!name) process.exit();

  const check = await getCheck(name);

  if (!check) process.exit();

  const hookPath = path.join(paths.hooks, name);
  const shortPath = hookPath.slice(hookPath.indexOf('src'));

  console.log('');

  fs.mkdirSync(hookPath);
  console.log(chalk.italic(`created ${shortPath}`));

  fs.writeFileSync(path.join(hookPath, 'index.ts'), templates.index(name));
  console.log(chalk.italic(`created ${shortPath}/index.ts`));

  fs.writeFileSync(path.join(hookPath, `${name}.ts`), templates.hook(name));
  console.log(chalk.italic(`created ${shortPath}/${name}.ts`));

  fs.writeFileSync(
    path.join(hookPath, `${name}.spec.ts`),
    templates.spec(name)
  );
  console.log(chalk.italic(`created ${shortPath}/${name}.spec.ts`));

  fs.writeFileSync(path.join(hookPath, `${name}.mdx`), templates.mdx(name));
  console.log(chalk.italic(`created ${shortPath}/${name}.mdx`));

  console.log('');

  const indexPath = path.join(paths.maeven, 'hooks', 'index.ts');
  const indexData = fs.readFileSync(indexPath, 'utf8').split('\n');
  const startIndex = 0;

  let spliceIndex = startIndex;

  indexData.forEach((line, index) => {
    if (line.startsWith(`export *`) && line.slice(17) < name) {
      spliceIndex = index + 1;
    }
  });

  indexData.splice(spliceIndex, 0, `export * from './${name}';`);

  fs.writeFileSync(indexPath, indexData.join('\n'));
  console.log(`updated ${shortPath.replace(`/${name}`, '')}/index.ts`);

  console.log('');
  console.log('');
};

async function getName() {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: 'Hook name:',
    validate: validateName
  });

  return response.name;
}

async function getCheck(name) {
  const response = await prompts({
    type: 'confirm',
    name: 'check',
    message: `Create Hook ${name}?`,
    initial: true
  });

  return response.check;
}

function validateName(name) {
  if (!name) {
    return 'A Hook name is required';
  }

  if (!name.match(/^use[A-Z]{1}[A-Za-z0-9]/)) {
    return 'Invalid hook name';
  }

  if (fs.existsSync(path.join(paths.hooks, name))) {
    return `Hook ${name} already exists.`;
  }

  return true;
}

const templates = {
  index: name => `export { ${name} } from './${name}';`,

  hook: name =>
    `export function ${name}() {
  
}
`,

  spec: name =>
    `import { renderHook } from '@testing-library/react-hooks';

import { ${name} } from './${name}';

describe('${name}', () => {
  it.skip('', () => {});
});
`,

  mdx: name => `---
title: ${name}
path: 'Hooks/${name}'
---

import { DoDont } from 'docs/components';

# ${name}

${name} description.
`
};
