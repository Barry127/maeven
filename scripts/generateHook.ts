import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import { paths } from './paths';
import {
  hookTemplate,
  indexTemplate,
  mdxTemplate,
  specTemplate
} from './templates/hook';

export async function generateHook() {
  let name = await getName();
  if (!name) process.exit(1);

  const check = await getCheck(name);
  if (!check) process.exit();

  const hookPath = path.join(paths.hooks, name);
  const shortPath = hookPath.slice(hookPath.indexOf('src'));

  console.log('');

  fs.mkdirSync(hookPath);
  console.log(chalk.italic(`created ${shortPath}`));

  fs.writeFileSync(path.join(hookPath, 'index.ts'), indexTemplate(name));
  console.log(chalk.italic(`created ${shortPath}/index.ts`));

  fs.writeFileSync(path.join(hookPath, `${name}.ts`), hookTemplate(name));
  console.log(chalk.italic(`created ${shortPath}/${name}.ts`));

  fs.writeFileSync(path.join(hookPath, `${name}.spec.ts`), specTemplate(name));
  console.log(chalk.italic(`created ${shortPath}/${name}.spec.ts`));

  console.log('');

  const indexPath = path.join(paths.hooks, 'index.ts');
  const indexData = fs.readFileSync(indexPath, 'utf8').split('\n');
  let spliceIndex = 0;

  indexData.forEach((line, index) => {
    if (line.startsWith(`export *`) && line.slice(17) < name) {
      spliceIndex = index + 1;
    }
  });
  indexData.splice(spliceIndex, 0, `export * from './${name}';`);
  fs.writeFileSync(indexPath, indexData.join('\n'));
  console.log(`updated ${shortPath.replace(`/${name}`, '')}/index.ts`);

  console.log('');

  fs.writeFileSync(
    path.join(paths.docs, 'hooks', `${name}.mdx`),
    mdxTemplate(name)
  );
  console.log(chalk.italic(`created docs/hooks/'${name}.mdx`));

  console.log('');
  console.log('');
}

async function getCheck(name: string) {
  const response = await prompts({
    type: 'confirm',
    name: 'check',
    message: `Create Hook ${name}?`,
    initial: true
  });

  return response.check as boolean;
}

async function getName() {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: 'Hook name:',
    validate: validateName
  });
  return response.name as string;
}

function validateName(name: string) {
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
