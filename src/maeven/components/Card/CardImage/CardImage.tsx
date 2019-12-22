import React, { FC, ImgHTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';

import { classes, themeOverride } from './styles';

/**
 * A CardImage adds a visual cue in the form af an image to a card.
 */
export const CardImage: FC<CardImageProps &
  ImgHTMLAttributes<HTMLImageElement>> = ({ alt, className, ...restProps }) => {
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <img
        alt={alt}
        className={clsx(classes.image, themeOverride(theme), className)}
        {...restProps}
      />
    </div>
  );
};

export interface CardImageProps {
  children?: never;

  /** image src */
  src?: string;
}
