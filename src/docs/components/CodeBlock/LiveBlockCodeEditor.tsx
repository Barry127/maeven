import React, { FC } from 'react';
import clsx from 'clsx';
import { LiveEditor } from 'react-live';

import { liveClasses, monokai } from './styles';

export const LiveBlockCodeEditor: FC = () => (
  <LiveEditor className={clsx(liveClasses.editor, monokai)} />
);
