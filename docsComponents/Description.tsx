import { P } from 'maeven';
import props from 'pages/generated/props.json';
import React, { FC } from 'react';

export const Description: FC<{ of: string }> = ({ of }) => {
  if (!props[of as ExistingProp]) return null;

  return <P>{props[of as ExistingProp].description}</P>;
};

type ExistingProp = keyof typeof props;
