import { style } from 'typestyle';

import { hidden } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';
import { responsiveStyle } from '../../../common/responsiveStyle';
import { Theme } from '../../../types';

import { ColProps, ColSize } from './Col';
import { NestedCSSProperties } from 'typestyle/lib/types';

const col = style({
  flex: '1 1 auto',
  marginLeft: 'calc(var(--maeven-row-gutter) / 2)',
  marginRight: 'calc(var(--maeven-row-gutter) / 2)',
  marginBottom: 'var(--maeven-row-gutter)'
});

const transparent = style({
  background: 'transparent'
});

export const classes = {
  col,
  transparent,
  span: (span: number) => {
    const size = `${(span / 24) * 100}%`;
    return style({
      flex: `0 0 calc(${size} - var(--maeven-row-gutter))`,
      width: `calc(${size} - var(--maeven-row-gutter))`,
      maxWidth: `calc(${size} - var(--maeven-row-gutter))`
    });
  },
  hidden,
  responsiveCol: (
    theme: Theme,
    sizeProps: Pick<ColProps, 'lg' | 'md' | 'sm' | 'span' | 'xl' | 'xs'>
  ) => {
    const size = sizeProps.span ? `${(sizeProps.span / 24) * 100}%` : 'auto';
    return responsiveStyle(theme, {
      xs: responsiveColMixin(getResponsiveSize(sizeProps, 'xs', size)),
      sm: responsiveColMixin(getResponsiveSize(sizeProps, 'sm', size)),
      md: responsiveColMixin(getResponsiveSize(sizeProps, 'md', size)),
      lg: responsiveColMixin(getResponsiveSize(sizeProps, 'lg', size)),
      xl: responsiveColMixin(getResponsiveSize(sizeProps, 'xl', size))
    });
  },
  responsiveHidden: (theme: Theme, hidden: ColProps['hidden']) =>
    responsiveStyle(theme, {
      xs: isHidden(hidden, 'xs') ? { display: 'none' } : undefined,
      sm: isHidden(hidden, 'sm') ? { display: 'none' } : undefined,
      md: isHidden(hidden, 'md') ? { display: 'none' } : undefined,
      lg: isHidden(hidden, 'lg') ? { display: 'none' } : undefined,
      xl: isHidden(hidden, 'xl') ? { display: 'none' } : undefined
    })
};

export const themeOverride = themeOverrideFactory('Col');

function responsiveColMixin(size: string): NestedCSSProperties {
  return size === 'auto'
    ? {
        flex: '1 1 auto'
      }
    : {
        flex: `0 0 calc(${size} - var(--maeven-row-gutter))`,
        width: `calc(${size} - var(--maeven-row-gutter))`,
        maxWidth: `calc(${size} - var(--maeven-row-gutter))`
      };
}

export function isHidden(hidden: ColProps['hidden'], size: ColSize) {
  if (Array.isArray(hidden) && hidden.includes(size)) {
    return true;
  }

  switch (size) {
    case 'xs':
      return (
        hidden === 'xs' ||
        hidden === 'sm' ||
        hidden === 'md' ||
        hidden === 'lg' ||
        hidden === 'xl'
      );

    case 'sm':
      return (
        hidden === 'sm' || hidden === 'md' || hidden === 'lg' || hidden === 'xl'
      );

    case 'md':
      return hidden === 'md' || hidden === 'lg' || hidden === 'xl';

    case 'lg':
      return hidden === 'lg' || hidden === 'xl';

    case 'xl':
      return hidden === 'xl';
  }
}

export function getResponsiveSize(
  props: Pick<ColProps, 'lg' | 'md' | 'sm' | 'xl' | 'xs'>,
  size: ColSize,
  spanSize: string
) {
  const { xs, sm, md, lg, xl } = props;

  switch (size) {
    case 'xs':
      if (xs || sm || md || lg || xl) {
        return `${((xs || sm || md || lg || xl!) / 24) * 100}%`;
      }
      return spanSize;

    case 'sm':
      if (sm || md || lg || xl) {
        return `${((sm || md || lg || xl!) / 24) * 100}%`;
      }
      return spanSize;

    case 'md':
      if (md || lg || xl) {
        return `${((md || lg || xl!) / 24) * 100}%`;
      }
      return spanSize;

    case 'lg':
      if (lg || xl) {
        return `${((lg || xl!) / 24) * 100}%`;
      }
      return spanSize;

    case 'xl':
      if (xl) {
        return `${(xl / 24) * 100}%`;
      }
      return spanSize;
  }
}
