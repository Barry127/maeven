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
    templates.component(name, nested)
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
    path.join(componentPath, `_${dashify(name)}.scss`),
    templates.styles(name, nested)
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
      `export { ${name}F as ${name} } from './${name}/${name}';`
    );

    fs.writeFileSync(parentIndexFile, parentIndexContent.join('\n'));
    console.log(`updated ${shortPath.replace(`/${parent}`, '')}/index.ts`);
  } else {
    const indexPath = path.join(paths.maeven, 'components', 'index.ts');
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

    const scssPath = path.join(paths.maeven, 'components', '_index.scss');
    const scssData = fs.readFileSync(scssPath, 'utf8').split('\n');

    spliceIndex = 0;

    scssData.forEach((line, index) => {
      if (line.startsWith(`@import`) && line.slice(9) < name) {
        spliceIndex = index + 1;
      }
    });

    scssData.splice(spliceIndex, 0, `@import '${name}/${dashify(name)}';`);

    fs.writeFileSync(scssPath, scssData.join('\n'));
    console.log(`updated ${shortPath.replace(`/${name}`, '')}/_index.scss`);
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
  index: name => `export { ${name}F as ${name} } from './${name}';`,

  component: (name, nested) =>
    `import React, { FC, Ref, HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

/**
 * ${name} description
 */
export const ${name}: FC<All${name}Props> = ({
  children,
  className,
  forwardedRef,
  ...restProps
}) => (
  <div
    {...restProps}
    className={clsx('mvn-${dashify(name)}', className)}
    ref={forwardedRef}
  >
    {children}
  </div>
);

export const ${name}F = forwardRef<HTMLDivElement, All${name}Props>((props, ref) => (
  <${name} {...props} forwardedRef={ref} />
));

type All${name}Props = ${name}Props & HTMLAttributes<HTMLDivElement>;

export interface ${name}Props {
  forwardedRef?: Ref<HTMLDivElement>;
}
`,

  spec: (name, nested) =>
    `import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { ${name}, ${name}F } from './${name}';
import { ${name} as Exported${name} } from '.${nested ? '.' : ''}/';


describe('${name}', () => {
  it('renders div element with given text', () => {
    render(<${name}>Hello world!</${name}>);
    const element = document.querySelector('.${dashify(name)}')
    expect(element!.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(
      <${name} className="${name.toLowerCase()}-class">Hello world!</${name}>
    );
    const element = document.querySelector('.${dashify(name)}')
    expect(element).toHaveClass('${name.toLowerCase()}-class');
  });

  it('passes props', () => {
    render(
      <${name} id="${name}Id" data-test="${name.toLowerCase()}-data">
        Hello world!
      </${name}>
    );
    const element = document.querySelector('.${dashify(name)}')
    expect(element).toHaveAttribute('id', '${name}Id');
    expect(element).toHaveAttribute('data-test', '${name.toLowerCase()}-data');
  });

  it.skip('', () => {});

  describe('forwarding ref', () => {
    it('exports ${name}ForwardRef', () => {
      expect(Exported${name}).toBe(${name}F);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<${name}F ref={ref} />);
      const element = document.querySelector('.${dashify(name)}');
      expect(ref.current).toBe(element);
    });
  });
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

  styles: (name, nested) =>
    `@import '${nested ? '../' : ''}../../common/mixins';

.${dashify(name)} {
  @include bpm0();
  color: red;
}
`
};

function dashify(str) {
  return str
    .split('')
    .map((letter, index) => {
      if (index === 0) {
        return letter.toLowerCase();
      }
      if (letter.toLowerCase() !== letter) {
        return `-${letter.toLowerCase()}`;
      }
      return letter;
    })
    .join('');
}
