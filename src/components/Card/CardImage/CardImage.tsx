import clsx from 'clsx';
import React, { forwardRef, ImgHTMLAttributes } from 'react';
import classes from './card-image.module.scss';

/**
 * A CardImage adds a visual cue in the form af an image to a card.
 */
export const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ alt, className, style, ...props }, ref) => (
    <div
      className={clsx('mvn--card-image', classes.container, className)}
      style={style}
    >
      <img {...props} alt={alt} ref={ref} />
    </div>
  )
);

export interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  children?: never;

  /** Image src */
  src?: string;
}
