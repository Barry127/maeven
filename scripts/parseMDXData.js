const fs = require('fs');
const nodePath = require('path');

const fm = require('front-matter');
const sh = require('shorthash');
const prettier = require('prettier');

const { paths, listDocPaths } = require('./paths');

const template = fs.readFileSync(
  nodePath.join(__dirname, 'DocComponent.template'),
  'utf8'
);

function parse() {
  const tree = {
    name: 'root',
    type: 'node',
    children: []
  };

  listDocPaths().forEach(docPath => {
    const doc = fs.readFileSync(docPath, 'utf8');
    const name = docPath.slice(
      docPath.lastIndexOf('/') + 1,
      docPath.lastIndexOf('.')
    );

    const meta = fm(doc);
    const hash = sh.unique(doc);
    const fileName = `${hash}.mdx`;
    const tsFileName = `${hash}.tsx`;

    const metaData = {
      title: meta.attributes.title || name,
      type: 'leaf',
      fileHash: hash,
      path: meta.attributes.path || name
    };

    if (meta.attributes.sortKey) {
      metaData.sortKey = meta.attributes.sortKey;
    }

    const tsFileContent = template
      .replace('{{FILENAME}}', `./${fileName}`)
      .replace('{{META}}', JSON.stringify(metaData));

    fs.writeFileSync(nodePath.join(paths.dataDir, fileName), meta.body);
    fs.writeFileSync(
      nodePath.join(paths.dataDir, tsFileName),
      prettier.format(tsFileContent, { singleQuote: true, parser: 'babel' })
    );

    const path = metaData.path.split('/');

    if (path.length === 1) {
      tree.children.push(metaData);
      tree.children.sort(sortTree);
    } else {
      path.pop();
      let currentTree = tree;
      path.forEach(title => {
        const index = currentTree.children.findIndex(
          node => node.type === 'node' && node.title === title
        );
        const newNode = {
          title,
          type: 'node',
          children: []
        };

        if (index === -1) {
          currentTree.children.push(newNode);
          currentTree.children.sort(sortTree);
          currentTree = newNode;
        } else {
          if (currentTree.children[index].title !== newNode.title) {
            currentTree.children[index].children.push(newNode);
            currentTree.children.sort(sortTree);
            currentTree = newNode;
          } else {
            currentTree = currentTree.children[index];
          }
        }
      });

      currentTree.children.push(metaData);
      currentTree.children.sort(sortTree);
    }
  });

  makeRouter(tree);
  return tree;
}

module.exports = parse;

function sortTree(a, b) {
  if (a.type !== b.type) {
    return a.type === 'node' ? 1 : -1;
  }
  const aSort = a.sortKey || a.title;
  const bSort = b.sortKey || b.title;
  return aSort > bSort ? 1 : -1;
}

function makeRouter(tree) {
  let imports = ``;
  let routes = ``;
  const router = `import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

{{IMPORTS}}

export const Router: FC = () => (
  <Switch>
    {{ROUTES}}
  </Switch>
);`;

  let first = true;
  let count = 0;
  readChildren(tree);

  function readChildren(tree) {
    tree.children.forEach(child => {
      if (child.type === 'node') {
        readChildren(child);
      } else {
        imports += `import { MdxDoc as Doc${count} } from './${child.fileHash}'\n`;
        if (first) {
          first = false;
          routes += `<Route exact path="/"><Doc${count} /></Route>\n`;
        }
        routes += `<Route path="${child.path.startsWith('/') ? '' : '/'}${
          child.path
        }"><Doc${count} /></Route>`;

        count++;
      }
    });
  }

  const routerData = router
    .replace('{{IMPORTS}}', imports)
    .replace('{{ROUTES}}', routes);

  fs.writeFileSync(
    nodePath.join(paths.dataDir, 'Router.tsx'),
    prettier.format(routerData, { singleQuote: true, parser: 'babel' })
  );
}
