import React, { FC } from 'react';
import { LiveError, LivePreview } from 'react-live';
import { liveClasses } from './styles';

export const LiveBlockPreview: FC = () => (
  <>
    <LiveError className={liveClasses.error} />
    <LivePreview className="example" />
  </>
);
