import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import packageJson from '../package.json';
import { paths } from './paths';

//@ts-ignore
delete packageJson.private;
//@ts-ignore
packageJson.devDependencies = {};
//@ts-ignore
packageJson.scripts = {
  //@ts-ignore
  build: 'rollup -c'
};

//@ts-ignore
delete packageJson.husky;
//@ts-ignore
delete packageJson.eslintConfig;
//@ts-ignore
delete packageJson.jest;

fs.writeFileSync(
  path.join(paths.dist, 'package.json'),
  prettier.format(JSON.stringify(packageJson), { parser: 'json' })
);
