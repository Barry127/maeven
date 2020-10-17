import Head from 'next/head';
import React, { FC } from 'react';

export const Meta: FC<MetaProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
  </Head>
);

export interface MetaProps {
  title: string;
}
