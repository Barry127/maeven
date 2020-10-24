import { Block, Col, Row } from 'maeven';
import React, { FC } from 'react';
import classes from './code-block.module.scss';

export const LiveBlockToolbar: FC<LiveBlockToolbarProps> = ({
  fullscreen,
  showCode,
  toggleCode,
  toggleFullscreen,
  toggleTransparent,
  transparent
}) => (
  <Block className={classes.toolbar}>
    <Row>
      <Col xs={12}>
        <button
          onClick={toggleTransparent}
          title="Toggle transparent background"
          style={transparent ? { background: 'transparent' } : {}}
        >
          o.0
        </button>
      </Col>
      <Col xs={12} style={{ textAlign: 'right' }}>
        <button
          onClick={toggleCode}
          title={showCode ? 'Hide code' : 'Show code'}
        >
          ...
        </button>
        <button
          onClick={toggleFullscreen}
          title={fullscreen ? 'Minimize' : 'Maximize'}
        >
          {fullscreen ? '-' : '+'}
        </button>
      </Col>
    </Row>
  </Block>
);

export interface LiveBlockToolbarProps {
  fullscreen: boolean;
  showCode: boolean;
  toggleCode: () => void;
  toggleFullscreen: () => void;
  toggleTransparent: () => void;
  transparent: boolean;
}
