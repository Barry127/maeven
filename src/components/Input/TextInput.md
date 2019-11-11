## Examples

### Basic

A basic TextInput

```js
import { TextInput } from 'maeven';

<TextInput placeholder="Type here...">
  Children are placed under the input.
</TextInput>;
```

### Disabled

Text inputs can be disabled

```js
import { TextInput, Row, Col } from 'maeven';

<Row gutter={3}>
  <Col>
    <TextInput disabled value="Disabled" />
  </Col>
  <Col>
    <TextInput readOnly value="Read Only" />
  </Col>
</Row>;
```

### Icons

Text inputs can have icons on both sides.

```js
import { TextInput, Row, Col } from 'maeven';
import { tag, check } from 'icon-packs/feather';

<Row gutter={3}>
  <Col>
    <TextInput icon={tag} placeholder="left" />
  </Col>
  <Col>
    <TextInput icon={tag} iconRight={check} placeholder="both" />
  </Col>
  <Col>
    <TextInput iconRight={check} placeholder="right" />
  </Col>
</Row>;
```

### Right Element

A Text input can have an element on the right.

```js
import { TextInput, Button } from 'maeven';
import { helpCircle } from 'icon-packs/feather';

<TextInput
  placeholder="Right Element"
  rightElement={<Button icon={helpCircle} link />}
/>;
```

### Size

Text inputs can have different sizes.

```js
import { TextInput, Row, Col } from 'maeven';
import { user } from 'icon-packs/feather';

<Row gutter={3}>
  <Col span={12}>
    <TextInput icon={user} size="sm" placeholder="sm" />
  </Col>
  <Col span={12}>
    <TextInput size="sm" placeholder="sm" />
  </Col>
  <Col span={12}>
    <TextInput icon={user} size="md" placeholder="md" />
  </Col>
  <Col span={12}>
    <TextInput size="md" placeholder="md" />
  </Col>
  <Col span={12}>
    <TextInput icon={user} size="lg" placeholder="lg" />
  </Col>
  <Col span={12}>
    <TextInput size="lg" placeholder="lg" />
  </Col>
</Row>;
```

### Error

A text input can indicate it has an error.

```js
import { TextInput, Row, Col } from 'maeven';
import { x } from 'icon-packs/feather';

<Row gutter={3}>
  <Col span={12}>
    <TextInput hasError placeholder="Error..." iconRight={x} />
  </Col>
  <Col span={12}>
    <TextInput hasError placeholder="Error input">
      Text indicating error
    </TextInput>
  </Col>
</Row>;
```
