import React, { FC } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import clsx from 'clsx';

// import { monokai } from './styles';
import './static-block.scss';
import './monokai.scss';

export const StaticBlock: FC<StaticBlockProps> = ({ code, language }) => (
  <Highlight {...defaultProps} code={code.trim()} language={language as any}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={clsx('docs-static-block', className, 'docs-monokai')}
        style={style}
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
