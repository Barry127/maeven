Maeven comes with a full responsive 24 column grid support.

## Examples

### Basic

A basic grid

```js
import { Container, Row, Col, Text } from 'maeven';

<Text>
  <Container>
    <Row>
      <Col span={24}>Col-24</Col>
    </Row>
    <Row>
      <Col span={12}>Col-12</Col>
      <Col span={12}>Col-12</Col>
    </Row>
    <Row>
      <Col span={8}>Col-8</Col>
      <Col span={8}>Col-8</Col>
      <Col span={8}>Col-8</Col>
    </Row>
    <Row>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
    </Row>
    <Row>
      <Col span={4}>Col-4</Col>
      <Col span={4}>Col-4</Col>
      <Col span={4}>Col-4</Col>
      <Col span={4}>Col-4</Col>
      <Col span={4}>Col-4</Col>
      <Col span={4}>Col-4</Col>
    </Row>
  </Container>
</Text>;
```

### Alignment

Columns can ban vertically aligned.

```js
import { Container, Row, Col, Text, H1, H3, H5, P } from 'maeven';

<Text>
  <Container>
    <H5>Default</H5>
    <Row>
      <Col span={8} style={{ height: 75 }}>
        Col-8
      </Col>
      <Col span={8} style={{ height: 50 }}>
        Col-8
      </Col>
      <Col span={8} style={{ height: 150 }}>
        Col-8
      </Col>
    </Row>
    <H5>Top</H5>
    <Row align="top">
      <Col span={8} style={{ height: 75 }}>
        Col-8
      </Col>
      <Col span={8} style={{ height: 50 }}>
        Col-8
      </Col>
      <Col span={8} style={{ height: 150 }}>
        Col-8
      </Col>
    </Row>
    <H5>center</H5>
    <Row align="center">
      <Col span={8} style={{ height: 75 }}>
        Col-8
      </Col>
      <Col span={8} style={{ height: 50 }}>
        Col-8
      </Col>
      <Col span={8} style={{ height: 150 }}>
        Col-8
      </Col>
    </Row>
    <H5>Bottom</H5>
    <Row align="bottom">
      <Col span={8} style={{ height: 75 }}>
        Col-8
      </Col>
      <Col span={8} style={{ height: 50 }}>
        Col-8
      </Col>
      <Col span={8} style={{ height: 150 }}>
        Col-8
      </Col>
    </Row>
    <H5>Baseline</H5>
    <Row align="baseline">
      <Col span={8} style={{ height: 75 }}>
        Col-8
      </Col>
      <Col span={8}>
        <H1>Col-8</H1>
      </Col>
      <Col span={8} style={{ height: 150 }}>
        Col-8
      </Col>
    </Row>
    <H5>stretch</H5>
    <Row>
      <Col span={8}>Col-8</Col>
      <Col span={8}>Col-8</Col>
      <Col span={8}>
        <H3>Col-8</H3>
        <P>Some text to make sure this column is longer than the others.</P>
      </Col>
    </Row>
  </Container>
</Text>;
```

### Resizing

Grid Columns can resize in different viewports

```js
import { Container, Row, Col, Text } from 'maeven';

<Text>
  <Container>
    <Row>
      <Col span={2} xs={24} sm={8} lg={6}>
        Col 2 / xs-24 / sm-8 / lg-6
      </Col>
      <Col span={2} xs={12} sm={8} lg={6}>
        Col 2 / xs-12 / sm-8 / lg-6
      </Col>
      <Col span={2} xs={12} sm={8} lg={12}>
        Col 2 / xs-12 / sm-8 / lg-12
      </Col>
    </Row>
  </Container>
</Text>;
```

### Gutter

You can use the `gutter` prop on the Row to set spacing between Columns.

```js
import { Container, Row, Col, Text } from 'maeven';

<Text>
  <Container>
    <Row gutter={3}>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
    </Row>
    <Row gutter={4}>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
    </Row>
    <Row gutter={10}>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
    </Row>
  </Container>
</Text>;
```

### Wrapping

Columns wrap to to a new line. But this can be prevented.

```js
import { Container, Row, Col, Text, H5 } from 'maeven';

<Text>
  <Container>
    <H5>Wrap (default)</H5>
    <Row gutter={2}>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={8}>Col-8</Col>
    </Row>
    <H5>No wrap</H5>
    <Row gutter={2} wrap={false}>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={6}>Col-6</Col>
      <Col span={8}>Col-8</Col>
    </Row>
  </Container>
</Text>;
```

### Adaptive

Columns without a span resize adaptive to fill up a row.

```js
import { Container, Row, Col, Text } from 'maeven';

<Text>
  <Container>
    <Row>
      <Col span={4}>Col-4</Col>
      <Col>Col</Col>
    </Row>
    <Row>
      <Col>Col</Col>
      <Col span={12}>Col-12</Col>
      <Col>Col</Col>
    </Row>
  </Container>
</Text>;
```

### Hidden

Columns can be (selectively) hidden

```js
import { Container, Row, Col, Text } from 'maeven';

<Text>
  <Container>
    <Row>
      <Col span={8} hidden>
        Col-8 hidden
      </Col>
      <Col span={16}>Col-16</Col>
    </Row>
    <Row>
      <Col span={8}>Col-8</Col>
      <Col span={16} hidden="md">
        Col-16 hidden from md and down
      </Col>
    </Row>
    <Row>
      <Col span={8}>Col-8</Col>
      <Col span={16} hidden={['sm', 'lg']}>
        Col-16 hidden on sm and lg
      </Col>
    </Row>
  </Container>
</Text>;
```

<style>
  div[class^='rsg--preview'] div div div div div {
    background: #4191ff;
    color: #fff;
    text-align: center;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  div[class^='rsg--preview'] div div div div div:nth-child(even) {
    background: #7420ff;
  }

  div[class^='rsg--preview'] div div div div div * {
    color: #fff;
  }
</style>
