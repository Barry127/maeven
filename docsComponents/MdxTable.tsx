import clsx from 'clsx';
import React, { FC, HTMLAttributes, TableHTMLAttributes } from 'react';
import headingClasses from 'src/components/Heading/heading.module.scss';
import classes from './props.module.scss';

export const Table: FC<TableHTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => <table className={clsx(classes.table, className)} {...props} />;

export const Th: FC<HTMLAttributes<HTMLTableHeaderCellElement>> = ({
  className,
  ...props
}) => <th className={clsx(headingClasses.h4, className)} {...props} />;
