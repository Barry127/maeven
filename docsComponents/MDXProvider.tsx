import {
  MDXProvider as Provider,
  MDXProviderComponentsProp
} from '@mdx-js/react';
import { H1, H2, H3, H4, H5, H6, Link, P, Span } from 'maeven';
import React, { FC } from 'react';

const components: MDXProviderComponentsProp = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  span: Span
};

export const MDXProvider: FC = ({ children }) => (
  <Provider components={components}>{children}</Provider>
);
