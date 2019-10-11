import React, { FC, ImgHTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';

import { cardImageStyles } from './styles';

/**
 * A CardImage adds a visual cue in the form af an image to a card.
 */
export const CardImage: FC<
  CardImageProps & ImgHTMLAttributes<HTMLImageElement>
> = props => {
  const theme = useTheme();
  const { classes } = cardImageStyles(theme, props);
  const { alt, className, ...restProps } = props;

  return (
    <div className={classes.container}>
      <img
        alt={alt}
        className={clsx(classes.image, className)}
        {...restProps}
      />
    </div>
  );
};

export interface CardImageProps {
  /** image src */
  src?: string;
}
