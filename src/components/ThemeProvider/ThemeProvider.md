## Example

```js
import { ThemeProvider as t, MaevenTheme } from 'maeven';

<ThemeProvider theme={MaevenTheme}>
  All child components and deeply nested components have the Maeven Theme.
</ThemeProvider>;
```

## Design Guidelines

Use the ThemeProvider to brand Maeven Components to your own style.

<div class="dd">

| Do's                                   | Dont's                            |
| -------------------------------------- | --------------------------------- |
| Use theme provider to customize Maeven | Have more than one theme per page |
|                                        |                                   |

</div>
