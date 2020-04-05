import React, { FC, ImgHTMLAttributes, Ref, forwardRef } from 'react';

/**
 * A CardImage adds a visual cue in the form af an image to a card.
 */
export const CardImage: FC<AllCardImageProps> = ({
  alt,
  forwardedRef,
  ...restProps
}) => {
  return (
    <div className="mvn-card-image">
      <img {...restProps} alt={alt} ref={forwardedRef} />
    </div>
  );
};

export const CardImageF = forwardRef<HTMLImageElement, AllCardImageProps>(
  (props, ref) => <CardImage {...props} forwardedRef={ref} />
);

type AllCardImageProps = CardImageProps & ImgHTMLAttributes<HTMLImageElement>;

export interface CardImageProps {
  children?: never;

  forwardedRef?: Ref<HTMLImageElement>;

  /** image src */
  src?: string;
}
