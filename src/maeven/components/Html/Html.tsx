import React, {
  FC,
  HTMLAttributes,
  AnchorHTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes,
  forwardRef
} from 'react';
import clsx from 'clsx';

import { InstrinctElement } from '../../types';

function createHtmlElement<P extends HTMLAttributes<HTMLElement | SVGElement>>(
  TagName: InstrinctElement
) {
  const Element: FC<P & { forwardedRef: any }> = ({
    children,
    className,
    forwardedRef,
    ...restProps
  }) => {
    return (
      <TagName
        className={clsx(`mvn-${TagName}`, className)}
        {...restProps}
        {
          // @ts-ignore
          ...{ ref: forwardedRef }
        }
      >
        {children}
      </TagName>
    );
  };

  return forwardRef<HTMLElement | SVGElement, P>((props, ref) => (
    <Element {...props} forwardedRef={ref} />
  ));
}

export const A = createHtmlElement<AnchorHTMLAttributes<HTMLAnchorElement>>(
  'a'
);
export const H1 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h1');
export const H2 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h2');
export const H3 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h3');
export const H4 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h4');
export const H5 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h5');
export const H6 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h6');
export const Li = createHtmlElement<LiHTMLAttributes<HTMLLIElement>>('li');
export const Ol = createHtmlElement<OlHTMLAttributes<HTMLOListElement>>('ol');
export const P = createHtmlElement<HTMLAttributes<HTMLParagraphElement>>('p');
export const Span = createHtmlElement<HTMLAttributes<HTMLSpanElement>>('span');
export const Ul = createHtmlElement<HTMLAttributes<HTMLUListElement>>('ul');
