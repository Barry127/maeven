import clsx from 'clsx';
import { Col, Row } from 'maeven';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import classes from './code-block.module.scss';
import { LiveBlockToolbar } from './LiveBlockToolbar';
import { scope } from './scope';

export const LiveBlock: FC<LiveBlockProps> = ({ code, withRender }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [transparent, setTransparent] = useState(false);

  useEffect(() => {
    if (fullscreen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [fullscreen]);

  const toggleFullscreen = useCallback(() => setFullscreen(!fullscreen), [
    setFullscreen,
    fullscreen
  ]);

  const toggleCode = useCallback(() => setShowCode(!showCode), [
    setShowCode,
    showCode
  ]);

  const toggleTransparent = useCallback(() => setTransparent(!transparent), [
    setTransparent,
    transparent
  ]);

  return (
    <div ref={containerRef} className={classes.live}>
      <LiveProvider noInline={withRender} code={code.trim()} scope={scope}>
        <div className={clsx({ [classes.fullscreen]: fullscreen })}>
          <LiveBlockToolbar
            fullscreen={fullscreen}
            showCode={showCode}
            toggleCode={toggleCode}
            toggleFullscreen={toggleFullscreen}
            toggleTransparent={toggleTransparent}
            transparent={transparent}
          />
          <Row>
            <Col
              className={clsx(classes.preview, {
                [classes.transparent]: transparent
              })}
              span={fullscreen ? (showCode ? 12 : 24) : 24}
            >
              <LiveError className={classes.error} />
              <LivePreview />
            </Col>
            {showCode && (
              <Col span={fullscreen ? 12 : 24}>
                <LiveEditor className={clsx(classes.editor, classes.monokai)} />
              </Col>
            )}
          </Row>
        </div>
      </LiveProvider>
    </div>
  );
};

export interface LiveBlockProps {
  code: string;
  withRender: boolean;
}
