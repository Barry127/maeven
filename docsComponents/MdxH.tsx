import { H2, H3, Link } from 'maeven';
import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  useCallback,
  useRef
} from 'react';
import classes from './mdx-h.module.scss';

export const MdxH2: FC<Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>> = (
  props
) => <MdxH {...props} level="h2" />;

export const MdxH3: FC<Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>> = (
  props
) => <MdxH {...props} level="h3" />;

const MdxH: FC<Omit<
  HTMLAttributes<HTMLHeadingElement> & { level: 'h2' | 'h3' },
  'color'
>> = ({ children, level, ...props }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const name = dashify(String(children));

  const Component = level === 'h2' ? H2 : H3;

  const scrollToAnchor = useCallback((ev: MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Component {...props}>
      <Link
        aria-hidden="true"
        id={name}
        ref={ref}
        tabIndex={-1}
        className={classes.anchor}
      />
      {children}
      <Link
        aria-hidden="true"
        tabIndex={-1}
        className={classes.hash}
        href={`#${name}`}
        onClick={scrollToAnchor}
        title="Direct link"
      >
        #
      </Link>
    </Component>
  );
};

function dashify(str: string) {
  return str
    .split('')
    .map((letter, index) => {
      if (index === 0) {
        return letter.toLowerCase();
      }
      if (letter.toLowerCase() !== letter) {
        return `-${letter.toLowerCase()}`;
      }
      return letter;
    })
    .join('');
}
