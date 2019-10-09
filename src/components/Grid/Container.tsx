import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';

import { containerStyles } from './styles';

/**
 * The Container component can contain the main content or a grid. It has a maxWidth and centers the content block.
 */
export const Container: FC<
  ContainerProps & HTMLAttributes<HTMLDivElement>
> = props => {
  const theme = useTheme();
  const { classes } = containerStyles(theme, props);
  const { children, className, element, fluid, ...restProps } = props;
  const Tag = element!;

  return (
    <Tag className={clsx(classes.container, className)} {...restProps}>
      {children}
    </Tag>
  );
};

Container.defaultProps = {
  element: 'div',
  fluid: false
};

export interface ContainerProps {
  /** HTML Element for Container */
  element?: 'article' | 'div' | 'main' | 'section';

  /** When Container is fluid, it has no maxWidth */
  fluid?: boolean;
}
