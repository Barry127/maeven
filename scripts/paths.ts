import fs from 'fs';
import path from 'path';

const src = path.join(__dirname, '..', 'src');
const dist = path.join(__dirname, '..', 'dist');
const docs = path.join(__dirname, '..', 'pages', 'docs');

export const paths = {
  components: path.join(src, 'components'),
  hooks: path.join(src, 'hooks'),
  generated: path.join(__dirname, '..', 'pages', 'generated'),
  src,
  dist,
  docs
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
