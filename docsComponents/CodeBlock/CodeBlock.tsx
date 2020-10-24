import React, { FC } from 'react';
import { LiveBlock } from './LiveBlock';
import { StaticBlock } from './StaticBlock';

export const CodeBlock: FC<CodeBlockProps> = ({
  children,
  className,
  live = false,
  withRender = false
}) => {
  if (live)
    return <LiveBlock code={children as string} withRender={withRender} />;

  return (
    <StaticBlock
      code={children as string}
      language={className.replace(/language-/, '')}
    />
  );
};

interface CodeBlockProps {
  className: string;
  live?: boolean;
  withRender?: boolean;
}
