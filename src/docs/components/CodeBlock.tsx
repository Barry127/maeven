import React, { FC } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import * as scope from 'maeven';

export const CodeBlock: FC<{
  className: string;
  live?: boolean;
  withRender: boolean;
}> = ({ children, className, live = false, withRender = false }) => {
  if (live) {
    return (
      <div>
        <LiveProvider
          noInline={withRender}
          code={(children as string).trim()}
          scope={scope}
        >
          <LivePreview />
          <LiveEditor
            style={{
              background: 'rgb(40, 42, 54)'
            }}
          />
          <LiveError />
        </LiveProvider>
      </div>
    );
  }

  const language = className.replace(/language-/, '');

  return (
    <Highlight
      {...defaultProps}
      code={children as any}
      language={language as any}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: 20 }}>
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
};
