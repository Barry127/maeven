import clsx from 'clsx';
import React, {
  AnchorHTMLAttributes,
  FC,
  forwardRef,
  HTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes
} from 'react';
import { BackgroundColor, Color } from '../../types';
import { Block, BlockProps } from '../Block';
import classes from './html.module.scss';

function createHtmlElement<
  P extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
  E = HTMLElement
>(tagName: keyof JSX.IntrinsicElements) {
  const Element: FC<P & BlockProps & { forwardedRef: any }> = ({
    children,
    className,
    component,
    element,
    forwardedRef,
    padding,
    ...props
  }) => (
    <Block
      {...props}
      className={clsx(
        `mvn--${tagName}`,
        classes[tagName],
        { [classes['has-color']]: props.color },
        className
      )}
      element={tagName}
      ref={forwardedRef}
    >
      {children}
    </Block>
  );

  return forwardRef<E, P>((props, ref) => (
    <Element {...props} forwardedRef={ref} />
  ));
}

export const A = createHtmlElement<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> & ColorStylingProps,
  HTMLAnchorElement
>('a');
export const H1 = createHtmlElement<
  Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> & ColorStylingProps,
  HTMLHeadingElement
>('h1');
export const H2 = createHtmlElement<
  Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> & ColorStylingProps,
  HTMLHeadingElement
>('h2');
export const H3 = createHtmlElement<
  Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> & ColorStylingProps,
  HTMLHeadingElement
>('h3');
export const H4 = createHtmlElement<
  Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> & ColorStylingProps,
  HTMLHeadingElement
>('h4');
export const H5 = createHtmlElement<
  Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> & ColorStylingProps,
  HTMLHeadingElement
>('h5');
export const H6 = createHtmlElement<
  Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> & ColorStylingProps,
  HTMLHeadingElement
>('h6');
export const Li = createHtmlElement<
  LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>('li');
export const Ol = createHtmlElement<
  OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>('ol');
export const P = createHtmlElement<
  Omit<HTMLAttributes<HTMLParagraphElement>, 'color'> & ExtendedStylingProps,
  HTMLParagraphElement
>('p');
export const Span = createHtmlElement<
  Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & ExtendedStylingProps,
  HTMLSpanElement
>('span');
export const Ul = createHtmlElement<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>('ul');

interface ExtendedStylingProps {
  /** Background color for Element */
  background?: BackgroundColor;

  /** Text color for Element */
  color?: Color | 'inherit';
}

interface ColorStylingProps {
  /** Text color for Element */
  color?: Color | 'inherit';
}
