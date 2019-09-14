Exposes current theme (provided by ThemeProvider) to current component. Defaults to MaevenTheme.

## Example

```js
import React from 'react';
import { useTheme } from 'maeven';

const MyComponent = () => {
  const currentTheme = useTheme();

  return (
    <p>
      CurrentTheme: <strong>{currentTheme.name}</strong>
    </p>
  );
};

<MyComponent />;
```
