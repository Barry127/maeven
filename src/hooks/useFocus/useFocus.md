useFocus keeps a local state `hasFocus` based on `onFocus` and `onBlur` props for a DOM Element. If given props contain an `onFocus` or `onBlur` handler it is wrapped.

### Example

```js
import React from 'react';
import { Button, Card, useFocus } from 'maeven';

const MyComponent = props => {
  const [hasFocus, focusProps] = useFocus(props);

  return (
    <Card style={{ borderColor: hasFocus ? 'red' : undefined }}>
      <Button {...props} {...focusProps}>
        Focus Me
      </Button>
    </Card>
  );
};

<MyComponent
  onFocus={() => console.log('onFocus')}
  onBlur={() => console.log('onBlur')}
/>;
```
