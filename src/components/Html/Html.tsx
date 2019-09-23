import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';
import * as styles from './styles';

function createHtmlElement<P>(TagName: keyof JSX.IntrinsicElements): FC<P> {
  //@ts-ignore
  const HTMLElement: FC<P> = ({ children, className, ...restProps }) => {
    const theme = useTheme();

    return (
      <TagName
        className={clsx(
          (styles as any)[TagName] &&
            (styles as any)[TagName](theme).classes.element,
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

/**
 * Semantic HTML Components with theme styling.
 */
export const Html: FC = () => null; // Stub for docs

export const H1 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h1');
export const H2 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h2');
export const H3 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h3');
export const H4 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h4');
export const H5 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h5');
export const H6 = createHtmlElement<HTMLAttributes<HTMLHeadingElement>>('h6');

export const P = createHtmlElement<HTMLAttributes<HTMLParagraphElement>>('p');

export const Ul = createHtmlElement<HTMLAttributes<HTMLUListElement>>('ul');
export const Ol = createHtmlElement<HTMLAttributes<HTMLOListElement>>('ol');
export const Li = createHtmlElement<HTMLAttributes<HTMLLIElement>>('li');
