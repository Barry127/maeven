import { extend, media } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';

import { Theme } from '../../themes/types';
import { exportStyles } from '../../common/styleHelpers';
import { box } from '../../common/mixins';

import { ColProps } from './Col';
import { ContainerProps } from './Container';
import { RowProps } from './Row';

export const colStyles = (theme: Theme, props: ColProps, gutter: number) => {
  const size = props.span ? `${(props.span / 24) * 100}%` : 'auto';
  const gutterSize = gutter * theme.base;

  return exportStyles({
    col: extend(
      {
        ...box,
        flex: '1 1 auto',
        marginLeft: gutterSize / 2,
        marginRight: gutterSize / 2,
        marginBottom: gutterSize
      },
      props.span
        ? {
            flex: `0 0 calc(${size} - ${gutterSize}px)`,
            width: `calc(${size} - ${gutterSize}px)`,
            maxWidth: `calc(${size} -${gutterSize}px)`
          }
        : null,
      props.hidden === true
        ? {
            display: 'none'
          }
        : null,
      hasResponsiveProps(props)
        ? extend(
            media(
              { maxWidth: theme.media.xs.to },
              responsiveColMixin(
                getResponsiveSize(props, 'xs', size),
                gutterSize
              )
            ),
            media(
              { minWidth: theme.media.sm.from, maxWidth: theme.media.sm.to },
              responsiveColMixin(
                getResponsiveSize(props, 'sm', size),
                gutterSize
              )
            ),
            media(
              { minWidth: theme.media.md.from, maxWidth: theme.media.md.to },
              responsiveColMixin(
                getResponsiveSize(props, 'md', size),
                gutterSize
              )
            ),
            media(
              { minWidth: theme.media.lg.from, maxWidth: theme.media.lg.to },
              responsiveColMixin(
                getResponsiveSize(props, 'lg', size),
                gutterSize
              )
            ),
            media(
              { minWidth: theme.media.xl.from },
              responsiveColMixin(
                getResponsiveSize(props, 'xl', size),
                gutterSize
              )
            )
          )
        : null,
      typeof props.hidden !== 'boolean'
        ? extend(
            isHidden(props, 'xs')
              ? media({ maxWidth: theme.media.xs.to }, { display: 'none' })
              : null,
            isHidden(props, 'sm')
              ? media(
                  {
                    minWidth: theme.media.sm.from,
                    maxWidth: theme.media.sm.to
                  },
                  { display: 'none' }
                )
              : null,
            isHidden(props, 'md')
              ? media(
                  {
                    minWidth: theme.media.md.from,
                    maxWidth: theme.media.md.to
                  },
                  { display: 'none' }
                )
              : null,
            isHidden(props, 'lg')
              ? media(
                  {
                    minWidth: theme.media.lg.from,
                    maxWidth: theme.media.lg.to
                  },
                  { display: 'none' }
                )
              : null,
            isHidden(props, 'xl')
              ? media({ minWidth: theme.media.xl.from }, { display: 'none' })
              : null
          )
        : null,
      theme.overrides.Col
    )
  });
};

export const containerStyles = (theme: Theme, props: ContainerProps) =>
  exportStyles({
    container: extend(
      {
        ...box,
        width: '100%',
        paddingRight: theme.base * 5,
        paddingLeft: theme.base * 5,
        marginRight: 'auto',
        marginLeft: 'auto'
      },
      !props.fluid
        ? extend(
            media({ minWidth: theme.media.sm.from }, { maxWidth: 540 }),
            media({ minWidth: theme.media.md.from }, { maxWidth: 720 }),
            media({ minWidth: theme.media.lg.from }, { maxWidth: 960 }),
            media({ minWidth: theme.media.xl.from }, { maxWidth: 1140 })
          )
        : null,
      theme.overrides.Container
    )
  });

export const rowStyles = (theme: Theme, props: RowProps) => {
  const gutterSize = props.gutter! * theme.base;

  return exportStyles({
    row: extend(
      {
        ...box,
        display: 'flex',
        flexWrap: props.wrap ? 'wrap' : 'nowrap',
        marginLeft: -gutterSize / 2,
        marginRight: -gutterSize / 2,
        alignItems:
          props.align === 'top'
            ? 'flex-start'
            : props.align === 'bottom'
            ? 'flex-end'
            : props.align
      },
      theme.overrides.Row
    )
  });
};

function responsiveColMixin(
  size: string,
  gutterSize: number
): NestedCSSProperties {
  return {
    flex: `0 0 calc(${size} - ${gutterSize}px)`,
    width: `calc(${size} - ${gutterSize}px)`,
    maxWidth: `calc(${size} -${gutterSize}px)`
  };
}

export function getResponsiveSize(
  props: ColProps,
  size: Size,
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

export function hasResponsiveProps(props: ColProps) {
  return (
    typeof props.xs === 'number' ||
    typeof props.sm === 'number' ||
    typeof props.md === 'number' ||
    typeof props.lg === 'number' ||
    typeof props.xl === 'number'
  );
}

export function isHidden(props: ColProps, size: Size) {
  if (Array.isArray(props.hidden) && props.hidden.includes(size)) {
    return true;
  }

  switch (size) {
    case 'xs':
      return (
        props.hidden === 'xs' ||
        props.hidden === 'sm' ||
        props.hidden === 'md' ||
        props.hidden === 'lg' ||
        props.hidden === 'xl'
      );

    case 'sm':
      return (
        props.hidden === 'sm' ||
        props.hidden === 'md' ||
        props.hidden === 'lg' ||
        props.hidden === 'xl'
      );

    case 'md':
      return (
        props.hidden === 'md' || props.hidden === 'lg' || props.hidden === 'xl'
      );

    case 'lg':
      return props.hidden === 'lg' || props.hidden === 'xl';

    case 'xl':
      return props.hidden === 'xl';
  }
}

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
