import {
  MDXProvider as Provider,
  MDXProviderComponentsProp
} from '@mdx-js/react';
import { H1, H4, H5, H6, Li, Link, Ol, P, Span, Ul } from 'maeven';
import NextLink from 'next/link';
import React, { FC } from 'react';
import { CodeBlock } from './CodeBlock';
import { MdxH2, MdxH3 } from './MdxH';
import { Table, Th } from './MdxTable';

const components: MDXProviderComponentsProp = {
  a: ({ ...props }: any) =>
    props.href?.startsWith('/') ? (
      <NextLink href={props.href}>
        <Link {...props} />
      </NextLink>
    ) : (
      <Link {...props} />
    ),
  code: CodeBlock,
  h1: H1,
  h2: MdxH2,
  h3: MdxH3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  li: Li,
  ol: Ol,
  pre: (props: any) => <div {...props} />,
  span: Span,
  table: Table,
  th: Th,
  ul: Ul
};

export const MDXProvider: FC = ({ children }) => (
  <Provider components={components}>{children}</Provider>
);
