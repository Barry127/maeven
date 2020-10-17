import fs from 'fs';
import path from 'path';

const src = path.join(__dirname, '..', 'src');
const dist = path.join(__dirname, '..', 'dist');
const maeven = path.join(src, 'maeven');

export const paths = {
  components: path.join(maeven, 'components'),
  generated: path.join(__dirname, '..', 'pages', 'generated'),
  pages: path.join(__dirname, '..', 'docs'),
  src,
  dist
};

export const files = {
  props: path.join(paths.generated, 'props.json')
};

if (!fs.existsSync(paths.generated)) fs.mkdirSync(paths.generated);

export function getComponentPaths() {
  const components: string[] = [];

  function _listDir(dir: string) {
    fs.readdirSync(dir).forEach((file) => {
      const fullFile = path.join(dir, file);
      if (fs.statSync(fullFile).isDirectory()) {
        _listDir(fullFile);
      } else if (file.endsWith('.tsx') && !file.includes('.spec.ts')) {
        components.push(fullFile);
      }
    });
  }

  _listDir(paths.components);
  return components;
}

export function getPagesPaths() {
  const pages: string[] = [];

  function _listDir(dir: string) {
    fs.readdirSync(dir).forEach((file) => {
      const fullFile = path.join(dir, file);
      if (fs.statSync(fullFile).isDirectory()) {
        _listDir(fullFile);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        pages.push(fullFile);
      }
    });
  }

  _listDir(paths.pages);
  return pages;
}
