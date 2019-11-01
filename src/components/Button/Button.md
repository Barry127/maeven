## Examples

### Basic

A basic example of a button.

```js
import { Button } from 'maeven';

<Button onClick={() => alert('Button Clicked')}>Click Me!</Button>;
```

### Color

Buttons can be styled in different colors.

```js
import { Button, P } from 'maeven';

<>
  <P>
    <Button color="primary">Primary</Button>{' '}
    <Button color="secondary">Secondary</Button>{' '}
    <Button color="info">Info</Button> <Button color="success">Success</Button>{' '}
    <Button color="warning">Warning</Button>{' '}
    <Button color="danger">Danger</Button>
  </P>
  <P>
    <Button disabled color="primary">
      Disabled Primary
    </Button>{' '}
    <Button disabled color="secondary">
      Disabled Secondary
    </Button>{' '}
    <Button disabled color="info">
      Disabled Info
    </Button>{' '}
    <Button disabled color="success">
      Disabled Success
    </Button>{' '}
    <Button disabled color="warning">
      Disabled Warning
    </Button>{' '}
    <Button disabled color="danger">
      Disabled Danger
    </Button>
  </P>
</>;
```

### Outline

Buttons can be styled outlined for secondary actions.

```js
import { Button, P } from 'maeven';

<>
  <P>
    <Button outline color="primary">
      Primary
    </Button>{' '}
    <Button outline color="secondary">
      Secondary
    </Button>{' '}
    <Button outline color="info">
      Info
    </Button>{' '}
    <Button outline color="success">
      Success
    </Button>{' '}
    <Button outline color="warning">
      Warning
    </Button>{' '}
    <Button outline color="danger">
      Danger
    </Button>
  </P>
  <P>
    <Button outline disabled color="primary">
      Disabled Primary
    </Button>{' '}
    <Button outline disabled color="secondary">
      Disabled Secondary
    </Button>{' '}
    <Button outline disabled color="info">
      Disabled Info
    </Button>{' '}
    <Button outline disabled color="success">
      Disabled Success
    </Button>{' '}
    <Button outline disabled color="warning">
      Disabled Warning
    </Button>{' '}
    <Button outline disabled color="danger">
      Disabled Danger
    </Button>
  </P>
</>;
```

### Link

Buttons can be styled as a link.

```js
import { Button } from 'maeven';

<>
  <Button>Regular Button</Button> <Button link>Link Button</Button>{' '}
  <Button link disabled>
    Disabled Link Button
  </Button>
</>;
```

### Icons

A button can contain icons.

```js
import { Button } from 'maeven';
import { refreshCw } from 'icon-packs/feather';
import {
  userCircleSolid,
  caretDownSolid,
  arrowLeftSolid,
  arrowRightSolid,
  fileRegular,
  timesSolid,
  plusSolid
} from 'icon-packs/fa';

<>
  <Button color="primary" icon={refreshCw}>
    Refresh
  </Button>{' '}
  <Button icon={userCircleSolid} iconRight={caretDownSolid}>
    Profile
  </Button>{' '}
  <Button color="warning" iconRight={arrowRightSolid}>
    Next
  </Button>{' '}
  <Button icon={fileRegular} iconRight={timesSolid}>
    Upload...
  </Button>{' '}
  <Button color="success" icon={plusSolid} />{' '}
  <Button icon={arrowLeftSolid} iconRight={arrowRightSolid} />
</>;
```

### Sizes

Buttons can have different sizes.

```js
import { Button } from 'maeven';

<>
  <Button color="primary" size="sm">
    Small Button
  </Button>{' '}
  <Button color="primary" size="md">
    Medium Button
  </Button>{' '}
  <Button color="primary" size="lg">
    Large Button
  </Button>
</>;
```

### Fluid

A fluid button takes up the full width.

```js
import { Button } from 'maeven';

<Button color="primary" fluid>
  Fluid Button
</Button>;
```

### Active

A button can be styled to indacte it is active.

```js
import { Button } from 'maeven';

<>
  <Button color="primary">Normal</Button>{' '}
  <Button color="primary" active>
    Active
  </Button>
</>;
```
