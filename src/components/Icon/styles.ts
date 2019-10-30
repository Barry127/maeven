import { extend } from 'typestyle';

import { Theme } from '../../themes/types';
import { exportStyles, getColorFromTheme } from '../../common/styleHelpers';
import { box } from '../../common/mixins';

import { IconProps } from './Icon';

export const iconStyles = (theme: Theme, props: IconProps) => {
  const styleColor = getColorFromTheme(props.color || '', theme);

  return exportStyles({
    span: extend(
      {
        ...box,
        display: 'inline-block',
        fontSize: props.size,
        lineHeight: 0,
        verticalAlign: props.size === '1em' ? '-.125em' : 'middle'
      },
      props.inverted
        ? {
            backgroundColor: styleColor || 'currentColor'
          }
        : {},
      theme.overrides.Icon
    ),
    icon: extend(
      {
        ...box,
        height: '1em'
      },
      props.icon.tag === 'svg'
        ? {
            fill: props.icon.attrs.stroke
              ? 'none'
              : props.inverted
              ? theme.colors.name.white
              : styleColor || 'currentColor',
            stroke: props.icon.attrs.stroke
              ? props.inverted
                ? theme.colors.name.white
                : styleColor || 'currentColor'
              : 'none',
            $nest: {
              // Ant Design Two Tone Styling
              '.secondaryFill': {
                opacity: 0.2
              },
              // Clarity Variations Styling
              '.clr-i-alert': {
                fill: theme.colors.semantic.warning
              },
              '.clr-i-badge': {
                fill: theme.colors.name.red
              }
            }
          }
        : {},
      props.fixedWidth ? { width: '1em' } : {}
    )
  });
};
