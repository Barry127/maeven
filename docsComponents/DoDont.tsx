import { Col, H4, Li, Row, Ul } from 'maeven';
import React, { FC } from 'react';
import { MdxH3 } from './MdxH';

export const DoDont: FC<DoDontProps> = ({ do: dos = [], dont: donts = [] }) => (
  <>
    <MdxH3>Do's and Don'ts</MdxH3>
    <Row gutter={1}>
      <Col span={12}>
        <H4 color="success">Do</H4>
        <Ul>
          {dos.map((dos) => (
            <Li key={dos}>{dos}</Li>
          ))}
        </Ul>
      </Col>
      <Col span={12}>
        <H4 color="danger">Don't</H4>
        <Ul>
          {donts.map((dont) => (
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
