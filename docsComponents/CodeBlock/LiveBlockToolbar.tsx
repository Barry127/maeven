import { code, eye, eyeOff, maximize2, minimize2 } from 'icon-packs/feather';
import { Block, Button, Col, Row } from 'maeven';
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
        <Button
          buttonType="link"
          onClick={toggleTransparent}
          icon={transparent ? eyeOff : eye}
          title="Toggle transparent background"
        />
      </Col>
      <Col xs={12} style={{ textAlign: 'right' }}>
        <Button
          buttonType={showCode ? 'primary' : 'link'}
          icon={code}
          onClick={toggleCode}
          title={showCode ? 'Hide code' : 'Show code'}
        />
        <Button
          buttonType="link"
          onClick={toggleFullscreen}
          title={fullscreen ? 'Minimize' : 'Maximize'}
          icon={fullscreen ? minimize2 : maximize2}
        />
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
