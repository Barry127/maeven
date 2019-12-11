import React, { FC } from 'react';
import { style } from 'typestyle';

import { P, Span } from 'maeven';

import { propsData } from '../_data/props';

const tableStyles = style({
  border: 0,
  marginBottom: 'var(--maeven-base)',

  $nest: {
    '& thead th': {
      textAlign: 'left',
      paddingBottom: 'var(--maeven-base)',
      $nest: {
        '& span': {
          fontSize: 20
        }
      }
    },
    '& tbody td': {
      verticalAlign: 'top',
      borderBottom: '1px solid var(--maeven-color-grey)'
    },
    '& tbody tr:last-child td': {
      borderBottom: 0
    },
    '& code': {
      fontFamily: 'var(--maeven-typography-font-family-monospace)',
      fontSize: '.9em'
    },
    '& td, & th': {
      padding: 'calc(var(--maeven-base) / 2) var(--maeven-base)'
    }
  }
});

export const Props: FC<PropsProps> = ({ of: propName }) => {
  if (!propsData[propName as ExistingProp]) return null;

  return (
    <table className={tableStyles}>
      <thead>
        <tr>
          <th>
            <Span style={{ fontWeight: 'bold' }}>Name</Span>
          </th>
          <th>
            <Span style={{ fontWeight: 'bold' }}>Description</Span>
          </th>
          <th>
            <Span style={{ fontWeight: 'bold' }}>Default</Span>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(propsData[propName as ExistingProp].props).map(
          ([key, value]) => (
            <tr key={key}>
              <td>
                <Span style={{ fontWeight: 'bold' }}>
                  {key}
                  {value.required && '*'}
                </Span>
              </td>
              <td>
                {value.description && <P>{value.description}</P>}
                <P>
                  <code>
                    {value.type.name === 'enum'
                      ? (value.type as any).raw
                      : value.type.name}
                  </code>
                </P>
              </td>
              <td>
                <Span>
                  {value.defaultValue?.value !== undefined
                    ? `"${value.defaultValue?.value}"`
                    : '-'}
                </Span>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

type ExistingProp = keyof typeof propsData;

export interface PropsProps {
  of: 'string';
}
