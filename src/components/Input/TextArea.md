## Examples

### Basic

A basic TextArea

```js
import { TextArea } from 'maeven';

<TextArea rows={3} placeholder="Type here...">
  Childeren are placed under the textarea
</TextArea>;
```

### Autosize

Textarea autosizing can be on or off.

```js
import { TextArea, Row, Col } from 'maeven';

<Row gutter={3}>
  <Col>
    <TextArea placeholder="I will grow in height as my input grows" />
  </Col>
  <Col>
    <TextArea autoSize={false} placeholder="I will not grow in height" />
  </Col>
</Row>;
```

### Disabled

Textares can be disabled

```js
import { TextArea, Row, Col } from 'maeven';

<Row gutter={3}>
  <Col>
    <TextArea disabled value="Disabled" />
  </Col>
  <Col>
    <TextArea readOnly value="Read Only" />
  </Col>
</Row>;
```
