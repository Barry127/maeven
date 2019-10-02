## Examples

### Basic

The most basic usage of Heading.

```js
import { Heading } from 'maeven';

<>
  <Heading level="h1">And why did 'I' have to take a cab?</Heading>
  <Heading level="h2">You wouldn't. Ask anyway!</Heading>
  <Heading level="h3">Can I use the gun?</Heading>
  <Heading level="h4">Hey, whatcha watching?</Heading>
  <Heading level="h5">Robot 1-X, save my friends! And Zoidberg!</Heading>
  <Heading level="h6">Oh right. I forgot about the battle.</Heading>
</>;
```

### Size

Headings can be styled with different sizes.

```js
import { Heading } from 'maeven';

<Heading level="h3" size="h1">
  I'm an h3 heading with an h1 size
</Heading>;
```

### Color

Headings can be styled in different (theme) colors.

```js
import { Heading } from 'maeven';

<div style={{ columns: '2 auto' }}>
  <Heading level="h4" color="black">
    Black
  </Heading>
  <Heading level="h4" color="blue">
    Blue
  </Heading>
  <Heading level="h4" color="cyan">
    Cyan
  </Heading>
  <Heading level="h4" color="darkGrey">
    DarkGrey
  </Heading>
  <Heading level="h4" color="green">
    Green
  </Heading>
  <Heading level="h4" color="grey">
    Grey
  </Heading>
  <Heading level="h4" color="indigo">
    Indigo
  </Heading>
  <Heading level="h4" color="orange">
    Orange
  </Heading>
  <Heading level="h4" color="pink">
    Pink
  </Heading>
  <Heading level="h4" color="purple">
    Purple
  </Heading>
  <Heading level="h4" color="red">
    Red
  </Heading>
  <Heading level="h4" color="teal">
    Teal
  </Heading>
  <Heading level="h4" color="white">
    White
  </Heading>
  <Heading level="h4" color="yellow">
    Yellow
  </Heading>
  <Heading level="h4" color="primary">
    Primary
  </Heading>
  <Heading level="h4" color="secondary">
    Secondary
  </Heading>
  <Heading level="h4" color="success">
    Success
  </Heading>
  <Heading level="h4" color="info">
    Info
  </Heading>
  <Heading level="h4" color="warning">
    Warning
  </Heading>
  <Heading level="h4" color="danger">
    Danger
  </Heading>
</div>;
```

### Truncate

Truncate text with ellipsis when text is longer than one line.

```js
<Heading level="h1" truncate>
  And so we say goodbye to our beloved pet, Nibbler, who's gone to a place where
  I, too, hope one day to go. The toilet.
</Heading>
```
