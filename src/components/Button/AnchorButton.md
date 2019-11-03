## Examples

### Basic

A basic example of an anchor button.

```js
import { AnchorButton } from 'maeven';

<AnchorButton href="#/Components/AnchorButton">Click Me!</AnchorButton>;
```

### Color

Buttons can be styled in different colors.

```js
import { Button, P } from 'maeven';

<>
  <P>
    <AnchorButton href="#/Components/AnchorButton" color="primary">
      Primary
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" color="secondary">
      Secondary
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" color="info">
      Info
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" color="success">
      Success
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" color="warning">
      Warning
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" color="danger">
      Danger
    </AnchorButton>
  </P>
  <P>
    <AnchorButton href="#/Components/AnchorButton" disabled color="primary">
      Disabled Primary
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" disabled color="secondary">
      Disabled Secondary
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" disabled color="info">
      Disabled Info
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" disabled color="success">
      Disabled Success
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" disabled color="warning">
      Disabled Warning
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" disabled color="danger">
      Disabled Danger
    </AnchorButton>
  </P>
</>;
```

### Outline

Buttons can be styled outlined for secondary actions.

```js
import { Button, P } from 'maeven';

<>
  <P>
    <AnchorButton href="#/Components/AnchorButton" outline color="primary">
      Primary
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" outline color="secondary">
      Secondary
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" outline color="info">
      Info
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" outline color="success">
      Success
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" outline color="warning">
      Warning
    </AnchorButton>{' '}
    <AnchorButton href="#/Components/AnchorButton" outline color="danger">
      Danger
    </AnchorButton>
  </P>
  <P>
    <AnchorButton
      href="#/Components/AnchorButton"
      outline
      disabled
      color="primary"
    >
      Disabled Primary
    </AnchorButton>{' '}
    <AnchorButton
      href="#/Components/AnchorButton"
      outline
      disabled
      color="secondary"
    >
      Disabled Secondary
    </AnchorButton>{' '}
    <AnchorButton
      href="#/Components/AnchorButton"
      outline
      disabled
      color="info"
    >
      Disabled Info
    </AnchorButton>{' '}
    <AnchorButton
      href="#/Components/AnchorButton"
      outline
      disabled
      color="success"
    >
      Disabled Success
    </AnchorButton>{' '}
    <AnchorButton
      href="#/Components/AnchorButton"
      outline
      disabled
      color="warning"
    >
      Disabled Warning
    </AnchorButton>{' '}
    <AnchorButton
      href="#/Components/AnchorButton"
      outline
      disabled
      color="danger"
    >
      Disabled Danger
    </AnchorButton>
  </P>
</>;
```

### Link

Buttons can be styled as a link.

```js
import { AnchorButton } from 'maeven';

<>
  <AnchorButton href="#/Components/AnchorButton">Regular Button</AnchorButton>{' '}
  <AnchorButton href="#/Components/AnchorButton" link>
    Link Button
  </AnchorButton>{' '}
  <AnchorButton href="#/Components/AnchorButton" link disabled>
    Disabled Link Button
  </AnchorButton>
</>;
```

### Icons

A button can contain icons.

```js
import { AnchorButton } from 'maeven';
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
  <AnchorButton
    href="#/Components/AnchorButton"
    color="primary"
    icon={refreshCw}
  >
    Refresh
  </AnchorButton>{' '}
  <AnchorButton
    href="#/Components/AnchorButton"
    icon={userCircleSolid}
    iconRight={caretDownSolid}
  >
    Profile
  </AnchorButton>{' '}
  <AnchorButton
    href="#/Components/AnchorButton"
    color="warning"
    iconRight={arrowRightSolid}
  >
    Next
  </AnchorButton>{' '}
  <AnchorButton
    href="#/Components/AnchorButton"
    icon={fileRegular}
    iconRight={timesSolid}
  >
    Upload...
  </AnchorButton>{' '}
  <AnchorButton
    href="#/Components/AnchorButton"
    color="success"
    icon={plusSolid}
  />{' '}
  <AnchorButton
    href="#/Components/AnchorButton"
    icon={arrowLeftSolid}
    iconRight={arrowRightSolid}
  />
</>;
```

### Sizes

Buttons can have different sizes.

```js
import { AnchorButton } from 'maeven';

<>
  <AnchorButton href="#/Components/AnchorButton" color="primary" size="sm">
    Small Button
  </AnchorButton>{' '}
  <AnchorButton href="#/Components/AnchorButton" color="primary" size="md">
    Medium Button
  </AnchorButton>{' '}
  <AnchorButton href="#/Components/AnchorButton" color="primary" size="lg">
    Large Button
  </AnchorButton>
</>;
```

### Fluid

A fluid button takes up the full width.

```js
import { AnchorButton } from 'maeven';

<AnchorButton href="#/Components/AnchorButton" color="primary" fluid>
  Fluid Button
</AnchorButton>;
```

### Active

A button can be styled to indacte it is active.

```js
import { AnchorButton } from 'maeven';

<>
  <AnchorButton href="#/Components/AnchorButton" color="primary">
    Normal
  </AnchorButton>{' '}
  <AnchorButton href="#/Components/AnchorButton" color="primary" active>
    Active
  </AnchorButton>
</>;
```
