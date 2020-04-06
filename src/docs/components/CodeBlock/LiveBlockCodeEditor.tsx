import React, { FC } from 'react';
import clsx from 'clsx';
import { LiveEditor } from 'react-live';

import './monokai.scss';

export const LiveBlockCodeEditor: FC = () => (
  <LiveEditor className={clsx('docs-live-editor', 'docs-monokai')} />
);
