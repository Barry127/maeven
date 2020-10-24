import clsx from 'clsx';
import { Block, Col } from 'maeven';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FC,
  MouseEvent,
  useCallback,
  useLayoutEffect,
  useState
} from 'react';
import { animated, config, useSpring } from 'react-spring';
import useMeasure from 'react-use-measure';
import classes from './side-nav.module.scss';

export const SideNav: FC<SideNavProps> = ({ nav }) => {
  const [navHeight, setNavHeight] = useState(0);

  useLayoutEffect(() => {
    setNavHeight(
      document.querySelector('nav')?.getBoundingClientRect().height || 0
    );
  }, [setNavHeight]);

  return (
    <Col
      className={classes.container}
      hidden={['md', 'sm', 'xs']}
      role="complementary"
      background="background"
    >
      <Block
        padding
        className={classes.content}
        style={{
          top: navHeight,
          minHeight: `calc(100vh - ${navHeight}px)`,
          maxHeight: `calc(100vh - ${navHeight}px)`
        }}
      >
        <ul>
          {Object.entries(nav).map(([name, item]) =>
            typeof item === 'string' ? (
              <NavLink key={item} name={name} path={item} />
            ) : (
              <NavMenu key={name} name={name} nav={item} />
            )
          )}
        </ul>
      </Block>
    </Col>
  );
};

const NavLink: FC<{ name: string; path: string }> = ({ name, path }) => {
  const router = useRouter();
  return (
    <li>
      <NextLink href={path}>
        <a
          href={path}
          className={clsx({ [classes.active]: router.pathname === path })}
        >
          {name}
        </a>
      </NextLink>
    </li>
  );
};

const NavMenu: FC<{ name: string; nav: Nav }> = ({ name, nav }) => {
  const router = useRouter();
  const [ref, { height }] = useMeasure();
  const [isOpen, setOpen] = useState(
    nav.isOpen || router.pathname.startsWith(nav.basePath)
  );
  const toggleOpen = useCallback(
    (ev: MouseEvent<HTMLAnchorElement>) => {
      ev.preventDefault();
      setOpen(!isOpen);
    },
    [isOpen]
  );

  const props = useSpring({
    from: { height: isOpen ? height : 0 },
    to: { height: isOpen ? height : 0 },
    config: config.stiff
  });

  return (
    <li>
      <a
        href={nav.basePath}
        className={clsx(classes.group, {
          [classes.open]: isOpen,
          [classes.active]: router.pathname.startsWith(nav.basePath)
        })}
        onClick={toggleOpen}
      >
        {name}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
        </svg>
      </a>
      <animated.div style={props}>
        <ul ref={ref}>
          {Object.entries(nav.children).map(([name, item]) =>
            typeof item === 'string' ? (
              <NavLink key={item} name={name} path={item} />
            ) : (
              <NavMenu key={name} name={name} nav={item} />
            )
          )}
        </ul>
      </animated.div>
    </li>
  );
};

export interface SideNavProps {
  nav: NavList;
}

export interface Nav {
  children: NavList;
  isOpen?: boolean;
  basePath: string;
}

export interface NavList {
  [name: string]: Nav | string;
}
