import { extend } from 'typestyle';

import { Theme } from '../../themes/types';
import { exportStyles } from '../../common/styleHelpers';

import { CardProps } from './Card';
import { CardImageProps } from './CardImage';
import { box, elevation } from '../../common/mixins';
import { color } from 'csx';

const BOX_PADDING_FACTOR = 3;

export const cardStyles = (theme: Theme, props: CardProps) =>
  exportStyles({
    card: extend(
      {
        ...box,
        boxShadow: elevation(props.elevation),
        padding: BOX_PADDING_FACTOR * theme.base,
        borderRadius: theme.sizes.borderRadius.large,
        border: `1px solid ${theme.colors.types.border}`
      },
      props.overlay ? { position: 'relative' } : null,
      props.interactive
        ? {
            cursor: 'pointer',
            transition: `box-shadow ${theme.animations.defaultTiming} ${theme.animations.defaultTimingFunction}`,
            $nest: {
              '&:hover': {
                boxShadow: elevation(3)
              },
              '&:focus': {
                outline: 'none',
                boxShadow: elevation(3)
              }
            }
          }
        : null,
      theme.overrides.Card
    ),
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: theme.sizes.borderRadius.large,
      background: color(theme.colors.name.black)
        .fade(0.8)
        .toString(),
      opacity: 0,
      transition: `opacity ${theme.animations.defaultTiming} ${theme.animations.defaultTimingFunction}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      $nest: {
        '&:hover': {
          opacity: 1
        },
        [`& + .${cardImageStyles(theme, {}).classes.container}`]: {
          marginTop: -(BOX_PADDING_FACTOR * theme.base),
          borderTopLeftRadius: theme.sizes.borderRadius.large,
          borderTopRightRadius: theme.sizes.borderRadius.large
        }
      }
    }
  });

export const cardImageStyles = (theme: Theme, props: CardImageProps) =>
  exportStyles({
    container: extend({
      ...box,
      marginTop: BOX_PADDING_FACTOR * theme.base,
      marginRight: -(BOX_PADDING_FACTOR * theme.base),
      marginBottom: BOX_PADDING_FACTOR * theme.base,
      marginLeft: -(BOX_PADDING_FACTOR * theme.base),
      $nest: {
        '&:first-child': {
          marginTop: -(BOX_PADDING_FACTOR * theme.base),
          borderTopLeftRadius: theme.sizes.borderRadius.large,
          borderTopRightRadius: theme.sizes.borderRadius.large
        },
        '&:last-child': {
          marginBottom: -((BOX_PADDING_FACTOR + 1) * theme.base),
          borderBottomLeftRadius: theme.sizes.borderRadius.large,
          borderBottomRightRadius: theme.sizes.borderRadius.large
        }
      }
    }),
    image: extend(
      {
        maxWidth: '100%',
        borderRadius: 'inherit'
      },
      theme.overrides.CardImage
    )
  });
