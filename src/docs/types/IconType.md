The `IconType` interface is used for all components that accept an icon prop.

```ts
import { AllHTMLAttributes, SVGProps } from 'react';

export interface IconType {
  tag: keyof JSX.IntrinsicElements;
  attrs: AllHTMLAttributes<any> & SVGProps<any>;
  children: this[] | string;
}
```
