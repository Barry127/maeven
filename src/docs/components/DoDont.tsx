import React, { FC } from 'react';

import { H3, H4, Li, Ul } from 'maeven';

export const DoDont: FC<DoDontProps> = ({ do: dos = [], dont: donts = [] }) => (
  <>
    <H3 id="do-dont">Do's & Don'ts</H3>
    <div>
      <div>
        <H4 id="do">Do</H4>
        <Ul>
          {dos.map(dos => (
            <Li key={dos}>{dos}</Li>
          ))}
        </Ul>
      </div>
      <div>
        <H4 id="dont">Don't</H4>
        <Ul>
          {donts.map(dont => (
            <Li key={dont}>{dont}</Li>
          ))}
        </Ul>
      </div>
    </div>
  </>
);

export interface DoDontProps {
  do?: string[];
  dont?: string[];
}
