import React, { FC, HTMLAttributes, Ref, forwardRef } from 'react';
import clsx from 'clsx';

import { Block } from '../../Block/Block';
import { InstrinctElement, BackgroundColor } from '../../../types';

/**
 * The Container component can contain the main content or a grid. It has a maxWidth and centers the content block.
 */
export const Container: FC<AllContainerProps> = ({
  children,
  className,
  fluid = false,
  ...restProps
}) => (
  <Block
    className={clsx(
      'mvn-grid-container',
      { 'mvn-responsive-grid-container': !fluid },
      className
    )}
    {...restProps}
  >
    {children}
  </Block>
);

export const ContainerF = forwardRef<HTMLElement, AllContainerProps>(
  (props, ref) => <Container {...props} forwardedRef={ref} />
);

type AllContainerProps = ContainerProps & HTMLAttributes<HTMLElement>;

export interface ContainerProps {
  /** Background color for Container content */
  background?: BackgroundColor;

  /** Type of html element to render. */
  element?: InstrinctElement;

  forwardedRef?: Ref<HTMLElement>;

  /** When Container is fluid, it has no maxWidth */
  fluid?: boolean;
}
