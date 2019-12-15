import React, { FC } from 'react';

import { P } from 'maeven';

import { propsData } from '../_data/props';

export const Description: FC<DescriptionProps> = ({ of: propName }) => {
  if (!propsData[propName as ExistingProp]) return null;

  return <P>{propsData[propName as ExistingProp].description}</P>;
};

type ExistingProp = keyof typeof propsData;

export interface DescriptionProps {
  of: string;
}
