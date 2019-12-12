import React, { FC } from 'react';

import { Col, Heading, Li, Row, Ul } from 'maeven';

export const DoDont: FC<DoDontProps> = ({ do: dos = [], dont: donts = [] }) => (
  <>
    <Heading level="h3" id="do-dont">
      Do's & Don'ts
    </Heading>
    <Row gutter={1}>
      <Col span={12}>
        <Heading level="h4" id="do" color="success">
          Do
        </Heading>
        <Ul>
          {dos.map(dos => (
            <Li key={dos}>{dos}</Li>
          ))}
        </Ul>
      </Col>
      <Col span={12}>
        <Heading level="h4" id="dont" color="danger">
          Don't
        </Heading>
        <Ul>
          {donts.map(dont => (
            <Li key={dont}>{dont}</Li>
          ))}
        </Ul>
      </Col>
    </Row>
  </>
);

export interface DoDontProps {
  do?: string[];
  dont?: string[];
}
