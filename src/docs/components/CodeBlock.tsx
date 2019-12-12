import React, { FC } from 'react';
import clsx from 'clsx';
import { style } from 'typestyle';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import * as scope from 'maeven';
import { Row, Col } from 'maeven';

const liveProviderClass = style({
  border: `1px solid var(--maeven-color-grey)`,
  marginBottom: 'var(--maeven-base)'
});

const liveRowClass = style({
  background: 'var(--maeven-color-body-background)'
});

const livePreviewClass = style({
  padding: 'var(--maeven-base)'
});

const liveErrorClass = style({
  color: 'var(--maeven-color-danger)',
  overflowY: 'auto',
  padding: 'var(--maeven-base)'
});

export const CodeBlock: FC<{
  className: string;
  live?: boolean;
  withRender: boolean;
}> = ({ children, className, live = false, withRender = false }) => {
  if (live) {
    return (
      <div className={liveProviderClass}>
        <LiveProvider
          noInline={withRender}
          code={(children as string).trim()}
          scope={scope}
        >
          <Row>
            <Col span={24} className={liveRowClass}>
              <LiveError className={liveErrorClass} />
              <LivePreview className={clsx(livePreviewClass, 'example')} />
            </Col>
            <Col span={24}>
              <LiveEditor
                style={{
                  background: 'rgb(40, 42, 54)'
                }}
              />
            </Col>
          </Row>
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
