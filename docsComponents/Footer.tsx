import { Block } from 'maeven';
import React, { FC } from 'react';
import classes from './footer.module.scss';

export const Footer: FC = () => (
  <Block background="darkGrey" element="footer" className={classes.footer}>
    Copyright © 2020 Barry de Kleijn.
  </Block>
);
