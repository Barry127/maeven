import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';
import { Block } from '../../Block';

import { classes, themeOverride } from './styles';

/**
 * The Container component can contain the main content or a grid. It has a maxWidth and centers the content block.
 */
export const Container: FC<ContainerProps & HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  element = 'div',
  fluid = false,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <Block
      element={element}
      className={clsx(
        classes.container,
        !fluid && classes.responsive(theme),
        themeOverride(theme),
        className
      )}
      {...restProps}
    >
      {children}
    </Block>
  );
};

export interface ContainerProps {
  /** Type of html element to render. */
  element?:
    | 'article'
    | 'aside'
    | 'div'
    | 'footer'
    | 'header'
    | 'main'
    | 'nav'
    | 'section';

  /** When Container is fluid, it has no maxWidth */
  fluid?: boolean;
}
