import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import { dashify } from './dashify';
import { paths } from './paths';
import {
  componentTemplate,
  indexTemplate,
  mdxTemplate,
  specTemplate,
  stylesTemplate
} from './templates/component';

export async function generateComponent() {
  let name = await getName();
  let parent;
  let parentPath = paths.components;

  if (!name) process.exit(1);

  const nested = await getNested();

  if (nested) {
    parent = await getParentPath();
    parentPath = path.join(parentPath, parent);
  }

  while (fs.existsSync(path.join(parentPath, name))) {
    console.log(chalk.red(`Component ${name} already exists.`));
    name = await getName();
    if (!name) process.exit(1);
  }

  const check = await getCheck(name, parent);
  if (!check) process.exit();

  const componentPath = path.join(parentPath, name);
  const shortPath = componentPath.slice(componentPath.indexOf('src'));
  console.log('');

  fs.mkdirSync(componentPath);
  console.log(chalk.italic(`created ${shortPath}`));

  fs.writeFileSync(path.join(componentPath, 'index.ts'), indexTemplate(name));
  console.log(chalk.italic(`created ${shortPath}/index.ts`));

  fs.writeFileSync(
    path.join(componentPath, `${name}.tsx`),
    componentTemplate(name)
  );
  console.log(chalk.italic(`created ${shortPath}/${name}.tsx`));

  fs.writeFileSync(
    path.join(componentPath, `${name}.spec.tsx`),
    specTemplate(name)
  );
  console.log(chalk.italic(`created ${shortPath}/${name}.spec.tsx`));

  fs.writeFileSync(
    path.join(componentPath, `${dashify(name)}.module.scss`),
    stylesTemplate(name)
  );
  console.log(
    chalk.italic(`created ${shortPath}/${dashify(name)}.module.scss`)
  );

  console.log('');

  if (nested) {
    const parentIndexFile = path.join(componentPath, '..', 'index.ts');
    const parentIndexContent = fs
      .readFileSync(parentIndexFile, 'utf8')
      .split('\n');
    let spliceIndex = 0;

    parentIndexContent.forEach((line) => {
      if (line.startsWith('export *') && line.slice(17) < name) {
        spliceIndex++;
      }
    });

    parentIndexContent.splice(spliceIndex, 0, `export * from './${name}'`);
    fs.writeFileSync(parentIndexFile, parentIndexContent.join('\n'));
    console.log(`updated ${shortPath.replace(`/${parent}`, '')}/index.ts`);
  } else {
    const indexPath = path.join(paths.components, 'index.ts');
    const indexData = fs.readFileSync(indexPath, 'utf8').split('\n');
    let spliceIndex = 0;

    indexData.forEach((line) => {
      if (line.startsWith('export *') && line.slice(17) < name) {
        spliceIndex++;
      }
    });

    indexData.splice(spliceIndex, 0, `export * from './${name}';`);
    fs.writeFileSync(indexPath, indexData.join('\n'));
    console.log(`updated ${shortPath.replace(`/${name}`, '')}/index.ts`);
  }

  console.log('');

  if (nested) {
    fs.mkdirSync(path.join(paths.docs, 'components', parent || ''));
    console.log(chalk.italic(`created docs/components/${name}`));
  }

  fs.writeFileSync(
    path.join(paths.docs, 'components', parent || '', `${name}.mdx`),
    mdxTemplate(name)
  );
  console.log(
    chalk.italic(
      `created docs/components/${nested ? name + '/' : ''}${name}.mdx`
    )
  );

  console.log('');
  console.log('');
}

async function getCheck(name: string, parent?: string) {
  const response = await prompts({
    type: 'confirm',
    name: 'check',
    message: `Create Component ${name}${parent ? ' in ' + parent : ''}`,
    initial: true
  });
  return response.check as boolean;
}

async function getName() {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: 'Component Name:',
    validate: validateName
  });
  return response.name as string;
}

async function getNested() {
  const response = await prompts({
    type: 'confirm',
    name: 'nested',
    message: 'Nested Component?',
    initial: false
  });
  return response.nested as boolean;
}

async function getParentPath() {
  const dirs = fs
    .readdirSync(paths.components)
    .filter((file) =>
      fs.statSync(path.join(paths.components, file)).isDirectory()
    )
    .map((file) => ({
      title: file,
      value: file
    }));

  const response = await prompts({
    type: 'select',
    name: 'parent',
    message: 'Generate:',
    choices: dirs
  });

  return response.parent as string;
}

function validateName(name: string) {
  if (!name) {
    return 'A Component name is required';
  }
  if (!name.match(/^[A-Z][A-Za-z0-9]/)) {
    return 'Invalid Component name';
  }
  return true;
}
