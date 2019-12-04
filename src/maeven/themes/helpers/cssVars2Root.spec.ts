import { cssVars2Root } from './cssVars2Root';
import { CSSProperties } from 'react';

describe('cssVars2Root', () => {
  it('makes a root selector', () => {
    const vars = {
      '--maeven-a': 'value-a',
      '--maeven-b': 'value-b'
    } as CSSProperties;

    const selector = cssVars2Root(vars);
    expect(selector).toBe(`:root {--maeven-a: value-a;--maeven-b: value-b;}`);
  });
});
