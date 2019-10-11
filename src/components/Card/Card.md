## Examples

### Basic

Basic usage of a Card with and image.

```js
import { Container, Row, Col, Card, CardImage, H3, P } from 'maeven';
import skyline from '@maeven-doc-assets/skyline.jpg';
import bubbles from '@maeven-doc-assets/bubbles.jpg';
import trees from '@maeven-doc-assets/trees.jpg';

<Container>
  <Row gutter={5}>
    <Col span={8}>
      <Card>
        <CardImage src={skyline} />
        <H3>Title</H3>
        <P>Card content with a short text containing a description.</P>
        <P>CTA</P>
      </Card>
    </Col>
    <Col span={8}>
      <Card>
        <CardImage src={bubbles} />
        <H3>Title</H3>
        <P>Card content with a short text containing a description.</P>
        <P>CTA</P>
      </Card>
    </Col>
    <Col span={8}>
      <Card>
        <CardImage src={trees} />
        <H3>Title</H3>
        <P>Card content with a short text containing a description.</P>
        <P>CTA</P>
      </Card>
    </Col>
  </Row>
</Container>;
```

### Elevation

Cards can have different elevations (heights) styled with a drop shadow.

```js
import { Container, Row, Col, Card, CardImage, H3, P } from 'maeven';
import skyline from '@maeven-doc-assets/skyline.jpg';

<Container>
  <Row gutter={5} wrap={false}>
    <Col>
      <Card elevation={0}>
        <CardImage src={skyline} />
        <H3>Elevation 0</H3>
        <P>Card content with a short text containing a description.</P>
      </Card>
    </Col>
    <Col>
      <Card elevation={1}>
        <CardImage src={skyline} />
        <H3>Elevation 1</H3>
        <P>Card content with a short text containing a description.</P>
      </Card>
    </Col>
    <Col>
      <Card elevation={2}>
        <CardImage src={skyline} />
        <H3>Elevation 2</H3>
        <P>Card content with a short text containing a description.</P>
      </Card>
    </Col>
    <Col>
      <Card elevation={3}>
        <CardImage src={skyline} />
        <H3>Elevation 3</H3>
        <P>Card content with a short text containing a description.</P>
      </Card>
    </Col>
    <Col>
      <Card elevation={4}>
        <CardImage src={skyline} />
        <H3>Elevation 4</H3>
        <P>Card content with a short text containing a description.</P>
      </Card>
    </Col>
  </Row>
</Container>;
```

### Interactive

When card is interactive it responds to mouse over.

```js
import { Container, Row, Col, Card, CardImage, H3, P } from 'maeven';
import skyline from '@maeven-doc-assets/skyline.jpg';
import bubbles from '@maeven-doc-assets/bubbles.jpg';
import trees from '@maeven-doc-assets/trees.jpg';

<Container>
  <Row gutter={5}>
    <Col span={8}>
      <Card interactive onClick={() => console.log('clicked skyline')}>
        <CardImage src={skyline} />
        <H3>Title</H3>
        <P>Card content with a short text containing a description.</P>
        <P>CTA</P>
      </Card>
    </Col>
    <Col span={8}>
      <Card interactive onClick={() => console.log('clicked bubbles')}>
        <CardImage src={bubbles} />
        <H3>Title</H3>
        <P>Card content with a short text containing a description.</P>
        <P>CTA</P>
      </Card>
    </Col>
    <Col span={8}>
      <Card interactive onClick={() => console.log('clicked trees')}>
        <CardImage src={trees} />
        <H3>Title</H3>
        <P>Card content with a short text containing a description.</P>
        <P>CTA</P>
      </Card>
    </Col>
  </Row>
</Container>;
```

### Overlay

An overlay appears on a mouse over.

```js
import { Container, Row, Col, Card, CardImage, Text } from 'maeven';
import skyline from '@maeven-doc-assets/skyline.jpg';
import bubbles from '@maeven-doc-assets/bubbles.jpg';
import trees from '@maeven-doc-assets/trees.jpg';

<Container>
  <Row gutter={5}>
    <Col span={8}>
      <Card
        overlay={
          <Text color="white">
            <h2>Skyline</h2>
          </Text>
        }
      >
        <CardImage src={skyline} />
      </Card>
    </Col>
    <Col span={8}>
      <Card
        overlay={
          <Text color="white">
            <h2>Bubbles</h2>
          </Text>
        }
      >
        <CardImage src={bubbles} />
      </Card>
    </Col>
    <Col span={8}>
      <Card
        overlay={
          <Text color="white">
            <h2>Trees</h2>
          </Text>
        }
      >
        <CardImage src={trees} />
      </Card>
    </Col>
  </Row>
</Container>;
```

## Design Guidelines

Use cards to group content in the ui.

<div class="dd">

| Do's                                 | Dont's                                          |
| ------------------------------------ | ----------------------------------------------- |
| Use Cards in combination with a Grid | Use interactive style without an Onclick action |
|                                      |                                                 |

</div>
