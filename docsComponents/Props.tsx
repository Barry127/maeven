import { P } from 'maeven';
import props from 'pages/generated/props.json';
import React, { FC, ReactNode } from 'react';
import headingClasses from 'src/components/Heading/heading.module.scss';
import classes from './props.module.scss';

export const Props: FC<{ of: string }> = ({ of }) => {
  if (!props[of as ExistingProp]) return null;

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th className={headingClasses.h4}>Name</th>
          <th className={headingClasses.h4}>Description</th>
          <th className={headingClasses.h4}>Default</th>
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
                  <code>{formatType(value.type)}</code>
                  {/* <pre>{JSON.stringify(value.type, null, 2)}</pre> */}
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

function formatType(type: any): ReactNode {
  if (type.raw === 'ReactNode') return type.raw;
  if (type.raw === 'boolean') return type.raw;
  if (type?.raw?.includes('|')) return type.raw;
  if (type.name === 'enum') {
    let values = type.value;
    if (type.value.length > 20) {
      values = [
        ...type.value.slice(0, 18),
        { value: `... ${type.value.length - 19} more ...` },
        ...type.value.slice(-1)
      ];
    }
    return values.map((value: any) => value.value).join(' | ');
  }

  return type.name;
}
