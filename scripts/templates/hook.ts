export const hookTemplate = (name: string) =>
  `/**
 * ${name} description
 */
export function ${name} () {
  
}
`;

export const indexTemplate = (name: string) =>
  `export { ${name} } from './${name}';
`;

export const mdxTemplate = (name: string) =>
  `import { Meta } from 'docsComponents';
import { ${name} } from 'src';

<Meta title={${name}} />

# ${name}

${name} description
`;

export const specTemplate = (name: string) =>
  `import { renderHook } from '@testing-library/react-hooks';
import { ${name} } from './${name}';

describe('${name}', () => {
  it.skip('', () => {});
});
`;
