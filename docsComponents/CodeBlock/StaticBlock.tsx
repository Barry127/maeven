import clsx from 'clsx';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import React, { FC } from 'react';
import classes from './code-block.module.scss';

export const StaticBlock: FC<staticBlockProps> = ({ code, language }) => (
  <Highlight
    {...defaultProps}
    code={code.trim()}
    language={language as Language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={clsx(className, classes.static, classes.monokai)}
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

interface staticBlockProps {
  code: string;
  language: string;
}
