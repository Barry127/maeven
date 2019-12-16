import React, { FC, useEffect, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { style } from 'typestyle';
import {
  codeSandboxOutline,
  folderOpenOutline,
  folderOutline
} from 'icon-packs/ant';
import { codeLine, documentLine } from 'icon-packs/clarity';

import { Block, H2, Heading, Icon, useOutline } from 'maeven';

import { docsData } from '../_data/docs';

const p1 = style({
  padding: '0 var(--maeven-base)'
});

const pl = (n: number) =>
  style({
    $nest: {
      '& > li > a': {
        paddingLeft: `calc(var(--maeven-base) * ${n})`
      }
    }
  });

const navClass = style({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 200,
  overflowX: 'hidden',
  overflowY: 'auto'
});

const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none'
});

const checkbox = style({
  display: 'none',
  $nest: {
    '&:checked ~ label .closed': {
      display: 'none'
    },
    '&:not(:checked) ~ label .open': {
      display: 'none'
    },
    '&:not(:checked) ~ ul': {
      display: 'none'
    }
  }
});

const link = style({
  border: '1px solid transparent',
  userSelect: 'none',
  cursor: 'pointer',
  padding: '0 var(--maeven-base)',
  color: 'var(--maeven-color-link)',
  textDecoration: 'none',
  display: 'block',
  lineHeight: 1.75,
  $nest: {
    '&:hover': {
      background: 'var(--maeven-color-grey)'
    },
    '&:focus': {
      outline: 'none',
      background: 'var(--maeven-color-grey)'
    },
    '& svg': {
      fill: 'var(--maeven-color-text)'
    }
  }
});

const active = style({
  boxSizing: 'border-box',
  position: 'relative',
  color: 'var(--maeven-color-text-inverted)',
  background: 'var(--maeven-color-link)',
  margin: 1,
  $nest: {
    '&:focus, &:hover': {
      background: 'var(--maeven-color-link)'
    },
    '& svg': {
      fill: 'var(--maeven-color-text-inverted)'
    }
  }
});

const activeOutline = style({
  $nest: {
    '&:focus': {
      // boxShadow: '0 0 0 2px var(--maeven-color-link)'
      border: '1px dashed rgba(255,255,255,.5)'
    }
  }
});

export const Nav: FC = () => {
  const { pathname } = useLocation();
  const outline = useOutline();

  useEffect(() => {
    const checkboxes = document.querySelectorAll('nav input[type="checkbox"]');
    checkboxes.forEach(cb => {
      if (pathname.startsWith(cb?.id.slice(4))) {
        cb.setAttribute('checked', 'checked');
      }
    });
  }, [pathname]);

  return (
    <Block element="nav" className={navClass}>
      <H2 className={p1}>Maeven</H2>
      <ul className={list}>
        {parseChildren(docsData.children as Node[], 3, 'root', outline)}
      </ul>
    </Block>
  );
};

const DocLink: FC<Node & { parent: string; outline: boolean }> = ({
  title,
  path = '',
  parent,
  outline
}) => (
  <NavLink
    className={link}
    to={`${path.startsWith('/') ? '' : '/'}${path}`}
    activeClassName={clsx(active, outline && activeOutline)}
    onKeyDown={keyDown}
  >
    {parent === 'root' && (
      <>
        <Icon icon={documentLine} />{' '}
      </>
    )}
    {parent.includes('Components') && (
      <>
        <Icon icon={codeSandboxOutline} />{' '}
      </>
    )}
    {title.startsWith('use') && (
      <>
        <Icon icon={codeLine} />{' '}
      </>
    )}
    {title}
  </NavLink>
);

function parseChildren(
  nodes: Node[],
  h: number,
  parent: string,
  outline: boolean
) {
  return nodes.map(node => (
    <li key={node.path || node.title}>
      {node.type === 'leaf' ? (
        <DocLink {...node} parent={parent} outline={outline} />
      ) : h === 3 ? (
        <>
          <Heading
            level="h3"
            size="h4"
            style={{
              marginBottom: 'calc(var(--maeven-base) / 4)',
              marginTop: 'var(--maeven-base)'
            }}
            className={p1}
          >
            {node.title}
          </Heading>
          <ul className={list}>
            {parseChildren(
              node.children!,
              h + 1,
              `${parent}/${node.title}`,
              outline
            )}
          </ul>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            name={`${parent}/${node.title}`}
            id={`${parent}/${node.title}`}
            className={checkbox}
          />
          <label
            tabIndex={0}
            onKeyDown={keyDown}
            className={clsx(link, outline && activeOutline)}
            htmlFor={`${parent}/${node.title}`}
          >
            <Icon icon={folderOutline} className="closed" />
            <Icon icon={folderOpenOutline} className="open" /> {node.title}
          </label>
          <ul className={clsx(list, pl(h - 2))}>
            {parseChildren(
              node.children!,
              h + 1,
              `${parent}/${node.title}`,
              outline
            )}
          </ul>
        </>
      )}
    </li>
  ));
}

interface Node {
  title: string;
  type: 'leaf' | 'node';
  children?: Node[];
  fileHash?: string;
  path?: string;
}

function keyDown(ev: KeyboardEvent<Element>) {
  // down, up, left right
  const keys = [40, 38, 37, 39];

  if (keys.includes(ev.keyCode)) {
    const nodes = Array.from(document.querySelectorAll(`.${link}`));

    switch (ev.keyCode) {
      //down
      case 40:
        let next = nodes[nodes.indexOf(ev.target as any) + 1];
        if (!next) break;
        // @ts-ignore
        next.focus();
        if (
          next.tagName === 'LABEL' &&
          (document.getElementById(
            next.getAttribute('for') as string
          ) as HTMLInputElement)?.checked
        ) {
          break;
        }
        // @ts-ignore
        next.click();
        break;

      //up
      case 38:
        const prev = nodes[nodes.indexOf(ev.target as any) - 1];
        if (!prev) break;
        // @ts-ignore
        prev.focus();

        if (
          prev.tagName === 'LABEL' &&
          !(document.getElementById(
            prev.getAttribute('for') as string
          ) as HTMLInputElement)?.checked
        ) {
          // @ts-ignore
          prev.click();
          keyDown(ev);
          break;
        }

        if (
          prev.tagName === 'LABEL' &&
          (document.getElementById(
            prev.getAttribute('for') as string
          ) as HTMLInputElement)?.checked
        ) {
          break;
        }
        // @ts-ignore
        prev.click();
        break;

      // left
      case 37:
        const currentLeft = nodes[nodes.indexOf(ev.target as any)];
        if (
          currentLeft?.tagName === 'LABEL' &&
          (document.getElementById(
            currentLeft.getAttribute('for') as string
          ) as HTMLInputElement)?.checked
        ) {
          //@ts-ignore
          currentLeft.click();
        }
        break;

      // right
      case 39:
        const currentRight = nodes[nodes.indexOf(ev.target as any)];
        if (
          currentRight?.tagName === 'LABEL' &&
          !(document.getElementById(
            currentRight.getAttribute('for') as string
          ) as HTMLInputElement)?.checked
        ) {
          //@ts-ignore
          currentRight.click();
        }
        break;
    }
  }
}
