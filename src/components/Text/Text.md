## Examples

### Basic

The most basic usage of Text.

```js
import { Text } from 'maeven';

<Text>
  Alderaan? I'm not going to Alderaan. I've got to go home. It's late, I'm in
  for it as it is.
</Text>;
```

### Inline

Text can be styled as inline (span) or block (div) elements.

```js
import { Text } from 'maeven';

<Text>
  The plans you refer to will soon be back in our hands. Leave that to me.{' '}
  <Text inline color="indigo">
    (inline)Send a distress signal
  </Text>
  , and inform the Senate that all on board were killed. <Text color="indigo">
    (block)I find your lack of faith disturbing. But with the blast shield down,
    I can't even see!
  </Text> How am I supposed to fight?
</Text>;
```

### Style HTML

Text can style html elements in current theme style.

```js
import { Text } from 'maeven';

<>
  <Text>
    <h1>In my experience, there is no such thing as luck.</h1>
    <p>
      Hey, Luke! <a href="#">May</a> the Force be with you. You mean it controls
      your actions? Leave that to me. Send a distress signal, and inform the
      Senate that all on board were killed. But with the blast shield down, I
      can't even see! How am I supposed to fight?
    </p>
    <p>
      What!? The plans you refer to will soon be back in our hands. I call it
      luck. The Force is strong with this one. I have you now. All right. Well,
      take care of yourself, Han. I guess that's what you're best at, ain't it?
    </p>
    <h2>Escape is not his plan. I must face him, alone.</h2>
    <p>
      Hey, Luke! May the Force be with you. Red Five standing by. All right.
      Well, take care of yourself, Han. I guess that's what you're best at,
      ain't it? Don't underestimate the Force. The plans you refer to will soon
      be back in our hands.
    </p>
    <ol>
      <li>Oh God, my uncle. How am I ever gonna explain this?</li>
      <li>
        I suggest you try it again, Luke. This time, let go your conscious self
        and act on instinct.
      </li>
      <li>Don't underestimate the Force.</li>
    </ol>
    <h3>Still, she's got a lot of spirit. I don't know, what do you think? </h3>
    <p>
      Look, I can take you as far as Anchorhead. You can get a transport there
      to Mos Eisley or wherever you're going. Escape is not his plan. I must
      face him, alone. What good is a reward if you ain't around to use it?
      Besides, attacking that battle station ain't my idea of courage. It's more
      like…suicide.
    </p>
  </Text>
  <hr />
  <Text styleHtml>
    <h1>Hey, Luke! May the Force be with you.</h1>
    <p>
      You're all <a href="#">clear</a>, kid. Let's blow this thing and go home!
      Hokey religions and ancient weapons are no match for a good blaster at
      your side, kid. Still, she's got a lot of spirit. I don't know, what do
      you think?
    </p>
    <p>
      Dantooine. They're on Dantooine. Oh God, my uncle. How am I ever gonna
      explain this? I'm trying not to, kid. The more you tighten your grip,
      Tarkin, the more star systems will slip through your fingers.
    </p>
    <h2>Obi-Wan is here. The Force is with him.</h2>
    <p>
      Don't be too proud of this technological terror you've constructed. The
      ability to destroy a planet is insignificant next to the power of the
      Force. But with the blast shield down, I can't even see! How am I supposed
      to fight?
    </p>
    <ol>
      <li>
        You are a part of the Rebel Alliance and a traitor! Take her away!
      </li>
      <li>The Force is strong with this one. I have you now.</li>
      <li>He is here.</li>
    </ol>

    <h3>
      Alderaan? I'm not going to Alderaan. I've got to go home. It's late, I'm
      in for it as it is.
    </h3>
    <p>
      Kid, I've flown from one side of this galaxy to the other. I've seen a lot
      of strange stuff, but I've never seen anything to make me believe there's
      one all-powerful Force controlling everything. There's no mystical energy
      field that controls my destiny. It's all a lot of simple tricks and
      nonsense. Don't be too proud of this technological terror you've
      constructed. The ability to destroy a planet is insignificant next to the
      power of the Force.
    </p>
    <ul>
      <li>Escape is not his plan. I must face him, alone.</li>
      <li>Ye-ha!</li>
      <li>You're all clear, kid. Let's blow this thing and go home!</li>
    </ul>
  </Text>
</>;
```

### Color

Text can be styled in different (theme) colors.

```js
import { Text } from 'maeven';

<div style={{ columns: '2 auto' }}>
  <Text color="black">Black</Text>
  <Text color="blue">Blue</Text>
  <Text color="cyan">Cyan</Text>
  <Text color="darkGrey">DarkGrey</Text>
  <Text color="green">Green</Text>
  <Text color="grey">Grey</Text>
  <Text color="indigo">Indigo</Text>
  <Text color="orange">Orange</Text>
  <Text color="pink">Pink</Text>
  <Text color="purple">Purple</Text>
  <Text color="red">Red</Text>
  <Text color="teal">Teal</Text>
  <Text color="white">White</Text>
  <Text color="yellow">Yellow</Text>
  <Text color="primary">Primary</Text>
  <Text color="secondary">Secondary</Text>
  <Text color="success">Success</Text>
  <Text color="info">Info</Text>
  <Text color="warning">Warning</Text>
  <Text color="danger">Danger</Text>
</div>;
```

### Truncate

Truncate text with ellipsis when text is longer than one line. Only works when inline is `false`.

```js
import { Text } from 'maeven';

<Text truncate>
  A tremor in the Force. The last time I felt it was in the presence of my old
  master. What good is a reward if you ain't around to use it? Besides,
  attacking that battle station ain't my idea of courage. It's more
  like…suicide.
</Text>;
```
