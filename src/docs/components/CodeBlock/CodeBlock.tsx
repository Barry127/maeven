import React, { FC } from 'react';

import { StaticBlock } from './StaticBlock';
import { LiveBlock } from './LiveBlock';

export const CodeBlock: FC<CodeBlockPorps> = ({
  children,
  className,
  live = false,
  withRender = false
}) => {
  if (live) {
    return <LiveBlock code={children as string} withRender={withRender} />;
  }

  return (
    <StaticBlock
      code={children as string}
      language={className.replace(/language-/, '')}
    />
  );
};

interface CodeBlockPorps {
  className: string;
  live?: boolean;
  withRender?: boolean;
}
