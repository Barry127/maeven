import React, { FC } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import clsx from 'clsx';

import { monokai } from './styles';

export const StaticBlock: FC<StaticBlockProps> = ({ code, language }) => (
  <Highlight {...defaultProps} code={code.trim()} language={language as any}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={clsx(className, monokai)}
        style={{
          ...style,
          padding: 'var(--maeven-base)',
          background: '#0d1011'
        }}
      >
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

interface StaticBlockProps {
  code: string;
  language: string;
}
