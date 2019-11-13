## Examples

### Basic

A basic PasswordInput

```js
import { PasswordInput } from 'maeven';

<PasswordInput />;
```

### Toggle

A password input can show and hide the toggle button

```js
import { PasswordInput, Row, Col } from 'maeven';

<Row gutter={3}>
  <Col span={12}>
    <PasswordInput>A password field with a toggle button.</PasswordInput>
  </Col>
  <Col span={12}>
    <PasswordInput showToggle={false}>
      A password field without a toggle button.
    </PasswordInput>
  </Col>
</Row>;
```

### Disabled

Password inputs can be disabled

```js
import { PasswordInput, Row, Col } from 'maeven';

<Row gutter={3}>
  <Col span={12}>
    <PasswordInput disabled value="Disabled">
      A disabled password input does not show a show password toggle
    </PasswordInput>
  </Col>
  <Col span={12}>
    <PasswordInput readOnly value="Read Only">
      A read only password input does show a show password toggle
    </PasswordInput>
  </Col>
</Row>;
```

### Size

Password inputs can have different sizes.

```js
import { PasswordInput, Row, Col } from 'maeven';
import { lock } from 'icon-packs/feather';

<Row gutter={3}>
  <Col span={12}>
    <PasswordInput icon={lock} size="sm" placeholder="sm" />
  </Col>
  <Col span={12}>
    <PasswordInput size="sm" placeholder="sm" />
  </Col>
  <Col span={12}>
    <PasswordInput icon={lock} size="md" placeholder="md" />
  </Col>
  <Col span={12}>
    <PasswordInput size="md" placeholder="md" />
  </Col>
  <Col span={12}>
    <PasswordInput icon={lock} size="lg" placeholder="lg" />
  </Col>
  <Col span={12}>
    <PasswordInput size="lg" placeholder="lg" />
  </Col>
</Row>;
```

### Error

a password input can indicate it has an error.

```js
import { PasswordInput } from 'maeven';
import { lock } from 'icon-packs/feather';

<PasswordInput icon={lock} hasError>
  Invalid password
</PasswordInput>;
```
