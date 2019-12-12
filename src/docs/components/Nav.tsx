import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { style } from 'typestyle';

import { Block, Text } from 'maeven';

import { docsData } from '../_data/docs';

const navClass = style({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 200,
  overflow: 'auto'
});

export const Nav: FC = () => (
  <Block className={navClass}>
    <Text styleHtml>
      <nav>
        <h2>Maeven</h2>
        <ul style={{ padding: 0 }}>
          {parseChildren(docsData.children as Node[], 3)}
        </ul>
      </nav>
    </Text>
  </Block>
);

const Link: FC<Node> = ({ title, path = '' }) => (
  <NavLink
    to={`${path.startsWith('/') ? '' : '/'}${path}`}
    activeStyle={{ fontWeight: 'bold', color: 'red', textDecoration: 'none' }}
  >
    {title}
  </NavLink>
);

function parseChildren(nodes: Node[], h: number) {
  const H = `h${h}` as any;
  return nodes.map(node => (
    <li key={node.path || node.title}>
      {node.type === 'leaf' ? (
        <Link {...node} />
      ) : (
        <>
          <H>{node.title}</H>
          <ul>{parseChildren(node.children!, h + 1)}</ul>
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
