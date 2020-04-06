import React, { FC } from 'react';
import { LiveError, LivePreview } from 'react-live';

export const LiveBlockPreview: FC = () => (
  <>
    <LiveError className="docs-live-error" />
    <LivePreview className="docs-example" />
  </>
);
