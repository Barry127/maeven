import React, {
  FC,
  ComponentClass,
  StatelessComponent,
  AnchorHTMLAttributes,
  forwardRef,
  Ref
} from 'react';
import clsx from 'clsx';

import { useOutline } from '../../hooks/useOutline';
import { Color } from '../../types';

/**
 * Links are accesible elements used for navigation.
 */
export const Link: FC<AllLinkProps> = ({
  children,
  className,
  color,
  component,
  forwardedRef,
  ...restProps
}) => {
  const outline = useOutline();

  const props = {
    className: clsx(
      'mvn-link',
      color && `mvn-link-color-${color}`,
      { 'mvn-link-outline': outline },
      className
    ),
    ...restProps
  };

  const LinkComponent = component || 'a';

  return (
    <LinkComponent {...props} ref={forwardedRef}>
      {children}
    </LinkComponent>
  );
};

export const LinkF = forwardRef<HTMLAnchorElement, AllLinkProps>(
  (props, ref) => <Link {...props} forwardedRef={ref} />
);

type AllLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export interface LinkProps {
  /** Styling color for link, defaults to theme's link color */
  color?: Color;

  /** Custom component to use instead of html anchor element */
  component?: ComponentClass<any> | StatelessComponent<any>;

  forwardedRef?: Ref<HTMLAnchorElement>;

  /** In order to work with custom custom components */
  [prop: string]: any;
}
