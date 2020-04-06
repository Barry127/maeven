import React, { FC, useEffect, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import {
  codeSandboxOutline,
  folderOpenOutline,
  folderOutline
} from 'icon-packs/ant';
import { codeLine, documentLine } from 'icon-packs/clarity';

import { Block, H2, Heading, Icon, useOutline } from 'maeven';

import { docsData } from '../_data/docs';

import './nav.scss';

export const Nav: FC<{ isDark: boolean; toggleDark: () => void }> = ({
  toggleDark,
  isDark
}) => {
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
    <Block element="nav" className="docs-nav">
      <label>
        <input type="checkbox" checked={isDark} onChange={toggleDark} />
        DarkMode
      </label>
      <H2 className="nav-title">Maeven</H2>
      <ul className="nav-list">
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
    className="nav-link"
    to={`${path.startsWith('/') ? '' : '/'}${path}`}
    activeClassName={clsx('nav-link-active', outline && 'nav-link-outline')}
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
          <Heading level="h3" size="h4" className="nav-title nav-sub-title">
            {node.title}
          </Heading>
          <ul className="nav-list">
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
            className="nav-cb"
          />
          <label
            tabIndex={0}
            onKeyDown={keyDown}
            className={clsx('nav-link', outline && 'nav-link-outline')}
            htmlFor={`${parent}/${node.title}`}
          >
            <Icon icon={folderOutline} className="closed" />
            <Icon icon={folderOpenOutline} className="open" /> {node.title}
          </label>
          <ul className={clsx('nav-list', `nav-padding-${h - 2}`)}>
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
    const nodes = Array.from(document.querySelectorAll('.nav-link'));

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
