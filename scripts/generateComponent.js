const fs = require('fs');
const path = require('path');

const prompts = require('prompts');
const chalk = require('chalk');

const { paths } = require('./paths');

module.exports = async () => {
  let name = await getName();
  let parent;

  if (!name) process.exit();

  const nested = await getNested();

  let parentPath = paths.components;

  if (nested) {
    parent = await getParentPath();
    parentPath = path.join(parentPath, parent);
  }

  // validate if component exists if it does, new name
  while (fs.existsSync(path.join(parentPath, name))) {
    console.log(chalk.red(`Component ${name} already exists.`));

    name = await getName();

    if (!name) process.exit();
  }

  const check = await getCheck(name, parent);

  if (!check) process.exit();

  const componentPath = path.join(parentPath, name);
  const shortPath = componentPath.slice(componentPath.indexOf('src'));
  const className = name.slice(0, 1).toLowerCase() + name.slice(1);

  console.log('');

  fs.mkdirSync(componentPath);
  console.log(chalk.italic(`created ${shortPath}`));

  if (!nested) {
    fs.writeFileSync(
      path.join(componentPath, 'index.ts'),
      templates.index(name)
    );
    console.log(chalk.italic(`created ${shortPath}/index.ts`));
  }

  fs.writeFileSync(
    path.join(componentPath, `${name}.tsx`),
    templates.component(name, className, nested)
  );
  console.log(chalk.italic(`created ${shortPath}/${name}.tsx`));

  fs.writeFileSync(
    path.join(componentPath, `${name}.spec.tsx`),
    templates.spec(name, nested)
  );
  console.log(chalk.italic(`created ${shortPath}/${name}.spec.tsx`));

  fs.writeFileSync(
    path.join(componentPath, `${name}.mdx`),
    templates.mdx(name, nested, parent)
  );
  console.log(chalk.italic(`created ${shortPath}/${name}.mdx`));

  fs.writeFileSync(
    path.join(componentPath, 'styles.ts'),
    templates.styles(name, className, nested)
  );
  console.log(chalk.italic(`created ${shortPath}/styles.ts`));

  console.log('');

  if (nested) {
    const parentIndexFile = path.join(componentPath, '..', 'index.ts');

    const parentIndexContent = fs
      .readFileSync(parentIndexFile, 'utf8')
      .split('\n');

    let spliceIndex = 0;

    parentIndexContent.forEach((line, index) => {
      if (line.startsWith(`export { `) && line.slice(9) < name) {
        spliceIndex = index + 1;
      }
    });

    parentIndexContent.splice(
      spliceIndex,
      0,
      `export { ${name} } from './${name}/${name}';`
    );

    fs.writeFileSync(parentIndexFile, parentIndexContent.join('\n'));
    console.log(`updated ${shortPath.replace(`/${parent}`, '')}/index.ts`);
  } else {
    const indexPath = path.join(paths.maeven, 'index.ts');
    const indexData = fs.readFileSync(indexPath, 'utf8').split('\n');
    const startIndex = indexData.indexOf('// Components') + 1;
    const endIndex = indexData.indexOf('// Hooks');

    let spliceIndex = startIndex;

    for (let i = startIndex; i < endIndex; i++) {
      const line = indexData[i];
      if (line.startsWith(`export *`) && line.slice(28) < name) {
        spliceIndex = i + 1;
      }
    }

    indexData.splice(spliceIndex, 0, `export * from './components/${name}';`);

    fs.writeFileSync(indexPath, indexData.join('\n'));
    console.log(
      `updated ${shortPath.replace(`/components/${name}`, '')}/index.ts`
    );
  }

  console.log('');
  console.log('');
};

async function getName() {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: 'Component Name:',
    validate: validateName
  });

  return response.name;
}

async function getNested() {
  const response = await prompts({
    type: 'confirm',
    name: 'nested',
    message: 'Nested Component?',
    initial: false
  });

  return response.nested;
}

async function getParentPath() {
  const dirs = fs
    .readdirSync(paths.components)
    .filter(file =>
      fs.statSync(path.join(paths.components, file)).isDirectory()
    )
    .map(file => ({
      title: file,
      value: file
    }));

  const response = await prompts({
    type: 'select',
    name: 'parent',
    message: 'Generate:',
    choices: dirs
  });

  return response.parent;
}

async function getCheck(name, parent) {
  const response = await prompts({
    type: 'confirm',
    name: 'check',
    message: `Create Component ${name}${parent ? ' in ' + parent : ''}?`,
    initial: true
  });

  return response.check;
}

function validateName(name) {
  if (!name) {
    return 'A Component name is required';
  }

  if (!name.match(/^[A-Z][A-Za-z0-9]/)) {
    return 'Invalid Component name';
  }

  return true;
}

const templates = {
  index: name => `export { ${name} } from './${name}';`,

  component: (name, className, nested) =>
    `import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '${nested ? '../' : ''}../../hooks/useTheme';

import { classes, themeOverride } from './styles';

/**
 * ${name} description
 */
export const ${name}: FC<${name}Props & HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <div
      className={clsx(classes.${className}, themeOverride(theme), className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export interface ${name}Props {}
`,

  spec: (name, nested) =>
    `import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '${nested ? '../' : ''}../..';

import { ${name} } from './${name}';
import { classes, themeOverride } from './styles';

describe('${name}', () => {
  it.skip('renders div element with given text', () => {
    const { getByText } = render(<${name}>Hello world!</${name}>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it.skip('sets className', () => {
    const { getByText } = render(
      <${name} className="${name.toLowerCase()}-class">Hello world!</${name}>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('${name.toLowerCase()}-class');
  });

  it.skip('passes props', () => {
    const { getByText } = render(
      <${name} id="${name}Id" data-test="${name.toLowerCase()}-data">
        Hello world!
      </${name}>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', '${name}Id');
    expect(element.dataset.test).toBe('${name.toLowerCase()}-data');
  });

  it.skip('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        ${name}: {
          color: 'hotpink'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <${name}>Hello world!</${name}>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
  });

  it.skip('', () => {});
});
`,

  mdx: (name, nested, parent) =>
    `---
title: ${name}
path: Components${nested ? '/' + parent : ''}/${name}
---

import { ${name} } from 'maeven';
import { Description, DoDont, Props } from 'docs/components';

# ${name}

<Description of="${name}" />

## Props

<Props of="${name}" />

## Examples

### Basic

A basic usage of ${name}.

\`\`\`js live
<${name}>Hello World!</${name}>
\`\`\`
`,

  styles: (name, className, nested) =>
    `import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0 } from '${nested ? '../' : ''}../../common/styles';
import { themeOverrideFactory } from '${
      nested ? '../' : ''
    }../../common/themeOverrideFactory';

const ${className} = style({
  color: 'red'
});

export const classes = {
  ${className}: clsx(box, pm0, ${className})
};

export const themeOverride = themeOverrideFactory('${name}');
`
};
