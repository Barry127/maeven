import React, {
  FC,
  HTMLAttributes,
  AnchorHTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes
} from 'react';
import clsx from 'clsx';

import { classes, themeOverride } from './styles';
import { useTheme } from '../../hooks/useTheme';

function createHtmlElement<P extends HTMLAttributes<HTMLElement>>(
  TagName: keyof typeof classes
): FC<P> {
  const HTMLElement: FC<P> = ({ children, className, ...restProps }) => {
    const theme = useTheme();

    return (
      <TagName
        className={clsx(
          classes[TagName],
          themeOverride(theme, TagName),
          className
        )}
        {...restProps}
      >
        {children}
      </TagName>
    );
  };

  return HTMLElement;
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
