import React, { FC, ReactNode } from 'react';

import { P, Span, H4 } from 'maeven';

import { propsData } from '../_data/props';

import './props.scss';

export const Props: FC<PropsProps> = ({ of: propName }) => {
  if (!propsData[propName as ExistingProp]) return null;

  return (
    <table className="docs-props-table">
      <thead>
        <tr>
          <th>
            <H4>Name</H4>
          </th>
          <th>
            <H4>Description</H4>
          </th>
          <th>
            <H4>Default</H4>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(propsData[propName as ExistingProp].props).map(
          ([key, value]) => (
            <tr key={key}>
              <td>
                {key}
                {value.required && '*'}
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
                <Span>{styleDefaultValue(value.defaultValue?.value)}</Span>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

function styleDefaultValue(value: any): ReactNode {
  if (typeof value === 'boolean') {
    return <code className="boolean">{value ? 'true' : 'false'}</code>;
  }

  if (typeof value === 'number') {
    return <code className="number">{value}</code>;
  }

  if (typeof value === 'string') {
    if (value.startsWith('(')) return styleFunctionValue(value);

    return <code className="string">"{value}"</code>;
  }

  return value || '-';
}

// TODO highlight function default values
function styleFunctionValue(value: ReactNode): ReactNode {
  return <code>{value}</code>;
}

type ExistingProp = keyof typeof propsData;

export interface PropsProps {
  of: string;
}
