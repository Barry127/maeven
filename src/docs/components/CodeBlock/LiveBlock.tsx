import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import { LiveProvider } from 'react-live';

import { Row, Col } from 'maeven';

import { scope } from './scope';
import { LiveBlockToolbar } from './LiveBlockToolbar';
import { LiveBlockCodeEditor } from './LiveBlockCodeEditor';
import { LiveBlockPreview } from './LiveBlockPreview';
import clsx from 'clsx';

import './live-block.scss';

export const LiveBlock: FC<LiveBlockProps> = ({ code, withRender }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | 'auto'>(
    'auto'
  );

  // eslint-disable-next-line
  useEffect(() => {
    if (containerRef.current && !fullscreen) {
      setContainerHeight(containerRef.current.getBoundingClientRect().height);
    }
  });

  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = 'hidden';
    }
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
    <div
      ref={containerRef}
      className="docs-live-container"
      style={fullscreen ? { height: containerHeight } : {}}
    >
      <LiveProvider noInline={withRender} code={code.trim()} scope={scope}>
        <div className={fullscreen ? 'docs-fullscreen' : undefined}>
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
              className={clsx(
                'docs-live-preview',
                transparent ? 'docs-bg-transparent' : 'docs-bg-default'
              )}
              span={fullscreen ? (showCode ? 12 : 24) : 24}
            >
              <LiveBlockPreview />
            </Col>
            {showCode && (
              <Col span={fullscreen ? 12 : 24}>
                <LiveBlockCodeEditor />
              </Col>
            )}
          </Row>
        </div>
      </LiveProvider>
    </div>
  );
};

interface LiveBlockProps {
  code: string;
  withRender: boolean;
}
