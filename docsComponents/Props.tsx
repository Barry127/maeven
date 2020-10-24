import { P } from 'src';
import props from 'pages/generated/props.json';
import React, { FC, ReactNode } from 'react';
import htmlClasses from 'src/components/Html/html.module.scss';
import classes from './props.module.scss';

export const Props: FC<{ of: string }> = ({ of }) => {
  if (!props[of as ExistingProp]) return null;

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th className={htmlClasses.h4}>Name</th>
          <th className={htmlClasses.h4}>Description</th>
          <th className={htmlClasses.h4}>Default</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(props[of as ExistingProp].props)
          .sort(sortProps)
          .map(([key, value]) => (
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
                      ? value.type.raw
                      : value.type.name}
                  </code>
                </P>
              </td>
              <td>{styleDefaultValue(value.defaultValue?.value)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

type ExistingProp = keyof typeof props;

function sortProps(
  [aKey, aValue]: [string, any],
  [bKey, bValue]: [string, any]
) {
  if (aValue.required && !bValue.required) return -1;
  if (bValue.required && !aValue.required) return 1;

  if (aKey < bKey) return -1;
  if (aKey > bKey) return 1;

  return 0;
}

function styleDefaultValue(value: any): ReactNode {
  if (typeof value === 'boolean') {
    return <code className={classes.boolean}>{value ? 'true' : 'false'}</code>;
  }

  if (typeof value === 'number') {
    return <code className={classes.number}>{value}</code>;
  }

  if (typeof value === 'string') {
    if (value.startsWith('(')) return <code>{value}</code>;

    return <code className={classes.string}>"{value}"</code>;
  }

  return value || '-';
}
