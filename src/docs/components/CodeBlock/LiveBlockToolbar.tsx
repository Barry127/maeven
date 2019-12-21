import React, { FC } from 'react';
import { minimize2, maximize2, code, eye, eyeOff } from 'icon-packs/feather';

import { Button, Block, Row, Col } from 'maeven';

import { liveClasses } from './styles';

export const LiveBlockToolbar: FC<LiveBlockToolbarProps> = ({
  fullscreen,
  showCode,
  toggleCode,
  toggleFullscreen,
  toggleTransparent,
  transparent
}) => (
  <Block className={liveClasses.toolbar}>
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
          onClick={toggleCode}
          icon={code}
        />
        <Button
          buttonType="link"
          onClick={toggleFullscreen}
          icon={fullscreen ? minimize2 : maximize2}
        />
      </Col>
    </Row>
  </Block>
);

interface LiveBlockToolbarProps {
  fullscreen: boolean;
  showCode: boolean;
  toggleCode: () => void;
  toggleFullscreen: () => void;
  toggleTransparent: () => void;
  transparent: boolean;
}
