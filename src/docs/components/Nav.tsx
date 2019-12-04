import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { docsData } from '../_data/docs';

export const Nav: FC = () => (
  <nav style={{ width: 200, flexShrink: 0 }}>
    <h2>Maeven</h2>
    <ul style={{ padding: 0 }}>
      {parseChildren(docsData.children as Node[], 3)}
    </ul>
  </nav>
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
