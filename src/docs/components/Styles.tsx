import React, { FC } from 'react';
import { classes as rowClasses } from 'maeven/components/Grid/Row/styles';

const row = `.${
  rowClasses.row.split(' ')[rowClasses.row.split(' ').length - 1]
}`;

const grid = `
${row} > div {
  background: var(--maeven-color-blue);
  color: var(--maeven-color-white);
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
}

${row} > div * {
  color: var(--maeven-color-white) !important;
}

${row} > div:nth-child(even) {
  background: var(--maeven-color-indigo);
}
`;

const styles = {
  grid
};

export const Styles: FC<{ for: 'grid' }> = props => (
  <style>{styles[props.for]}</style>
);
