import {
  MDXProvider as Provider,
  MDXProviderComponentsProp
} from '@mdx-js/react';
import React, { FC } from 'react';

const components: MDXProviderComponentsProp = {
  h1: (props) => <h1 style={{ color: 'limegreen' }} {...props} />
};

export const MDXProvider: FC = ({ children }) => (
  <Provider components={components}>{children}</Provider>
);
