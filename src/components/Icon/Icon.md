Maeven does not include its own icon set. Instead the [Icon Packs](https://github.com/Barry127/icon-packs) package comes with more than a dozen of the most popular icon sets. All compatible with Maeven, only import the needed icons to keep your bundle size in check. Browse all icons at the [Icons Docs](/#/Docs/Icons).

## Examples

### Basic

A basic icon

```js
import { Icon, Text } from 'maeven';
import { arrowLeftCircle, arrowRightCircle } from 'icon-packs/feather';

<Text>
  <Icon icon={arrowLeftCircle} /> Hello World <Icon icon={arrowRightCircle} />
</Text>;
```

### Color

Icons can be styled in different (theme) colors.

```js
import { Icon, H2 } from 'maeven';
import { circleSolid } from 'icon-packs/fa';

<H2>
  <Icon icon={circleSolid} color="black" />{' '}
  <Icon icon={circleSolid} color="blue" />{' '}
  <Icon icon={circleSolid} color="cyan" />{' '}
  <Icon icon={circleSolid} color="darkGrey" />{' '}
  <Icon icon={circleSolid} color="green" />{' '}
  <Icon icon={circleSolid} color="grey" />{' '}
  <Icon icon={circleSolid} color="indigo" />{' '}
  <Icon icon={circleSolid} color="orange" />{' '}
  <Icon icon={circleSolid} color="pink" />{' '}
  <Icon icon={circleSolid} color="purple" />{' '}
  <Icon icon={circleSolid} color="red" />{' '}
  <Icon icon={circleSolid} color="teal" />{' '}
  <Icon icon={circleSolid} color="white" />{' '}
  <Icon icon={circleSolid} color="yellow" />{' '}
  <Icon icon={circleSolid} color="primary" />{' '}
  <Icon icon={circleSolid} color="secondary" />{' '}
  <Icon icon={circleSolid} color="success" />{' '}
  <Icon icon={circleSolid} color="info" />{' '}
  <Icon icon={circleSolid} color="warning" />{' '}
  <Icon icon={circleSolid} color="danger" />
</H2>;
```

### Fixed Width

Icons with fixed width have a 1:1 height/width ratio.

```js
import { Icon, Text } from 'maeven';
import { markGithub, logoGithub } from 'icon-packs/octicons';

<Text styleHtml>
  <h4>
    Normal: <Icon icon={markGithub} /> <Icon icon={logoGithub} />
  </h4>
  <h4>
    Fixed Width: <Icon icon={markGithub} fixedWidth />{' '}
    <Icon icon={logoGithub} fixedWidth />
  </h4>
</Text>;
```

### Inverted

Icons can be inverted.

```js
import { Icon, H1 } from 'maeven';
import { activity } from 'icon-packs/feather';

<H1>
  <Icon color="primary" icon={activity} />{' '}
  <Icon color="primary" icon={activity} inverted />
</H1>;
```

### Sizes

Icons can have different sizes.

```js
import { Text, Icon } from 'maeven';
import { checkCircle } from 'icon-packs/feather';

<Text styleHtml>
  <p>
    Regular: <Icon icon={checkCircle} />
  </p>
  <p>
    1em: <Icon icon={checkCircle} size="1em" />
  </p>
  <p>
    2em: <Icon icon={checkCircle} size="2em" />
  </p>
  <p>
    3em: <Icon icon={checkCircle} size="3em" />
  </p>
  <p>
    4em: <Icon icon={checkCircle} size="4em" />
  </p>
  <p>
    5em: <Icon icon={checkCircle} size="5em" />
  </p>
</Text>;
```
