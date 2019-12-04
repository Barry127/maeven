import React from 'react';
import { style } from 'typestyle';
import dashify from 'dashify';

import { A, H1, H2, H3, H4, H5, H6, Li, Ol, P, Span, Ul } from 'maeven';
import { CodeBlock } from 'docs/components/CodeBlock';

const p = style({
  $nest: {
    '& code': {
      fontFamily: 'var(--maeven-typography-font-family-monospace)',
      color: 'var(--maeven-color-danger)'
    }
  }
});

export const componentMap = {
  a: A,
  code: CodeBlock,
  h1: (props: any) => <H1 {...props} id={dashify(props.children)} />,
  h2: (props: any) => (
    <H2
      {...props}
      id={dashify(props.children)}
      style={{ borderBottom: `1px solid var(--maeven-color-secondary)` }}
    />
  ),
  h3: (props: any) => <H3 {...props} id={dashify(props.children)} />,
  h4: (props: any) => <H4 {...props} id={dashify(props.children)} />,
  h5: (props: any) => <H5 {...props} id={dashify(props.children)} />,
  h6: (props: any) => <H6 {...props} id={dashify(props.children)} />,
  li: Li,
  ol: Ol,
  p: (props: any) => <P {...props} className={p} />,
  pre: (props: any) => <div {...props} />,
  span: Span,
  ul: Ul
};
