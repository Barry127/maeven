Currently supported components: `H1`, `H2`, `H3`, `H4`, `H5`, `H6`, `Li`, `Ol`, `P`, `Ul`

## Examples

### Headings

Headings are text in a larger size than regular text

```js
import { H1, H2, H3, H4, H5, H6 } from 'maeven';

<>
  <H1>Heading 1</H1>
  <H2>Heading 2</H2>
  <H3>Heading 3</H3>
  <H4>Heading 4</H4>
  <H5>Heading 5</H5>
  <H6>Heading 6</H6>
</>;
```

### Text

Some text with paragraphs and lists

```js
import { H1, H2, H3, P, Ul, Ol, Li } from 'maeven';

<>
  <H1>You know how I sometimes have really brilliant ideas?</H1>
  <P>
    Annihilate? No. No violence. I won't stand for it. Not now, not ever, do you
    understand me?! I'm the Doctor, the Oncoming Storm - and you basically meant
    beat them in a football match, didn't you? Annihilate? No. No violence. I
    won't stand for it. Not now, not ever, do you understand me?! I'm the
    Doctor, the Oncoming Storm - and you basically meant beat them in a football
    match, didn't you?
  </P>
  <P>
    You know how I sometimes have really brilliant ideas? No… It's a thing; it's
    like a plan, but with more greatness.{' '}
    <strong>
      The way I see it, every life is a pile of good things and bad things.
    </strong>{' '}
    <em>…hey.</em> …the good things don't always soften the bad things; but
    vice-versa the bad things don't necessarily spoil the good things and make
    them unimportant.
  </P>
  <H2>Aw, you're all Mr. Grumpy Face today.</H2>
  <P>
    It's art! A statement on modern society, 'Oh Ain't Modern Society Awful?'!
    Saving the world with meals on wheels. All I've got to do is pass as an
    ordinary human being. Simple. What could possibly go wrong?
  </P>
  <Ol>
    <Li>
      All I've got to do is pass as an ordinary human being. Simple. What could
      possibly go wrong?
    </Li>
    <Li>
      All I've got to do is pass as an ordinary human being. Simple. What could
      possibly go wrong?
    </Li>
    <Li>Did I mention we have comfy chairs?</Li>
  </Ol>
  <H3>Aw, you're all Mr. Grumpy Face today.</H3>
  <P>
    No, I'll fix it. I'm good at fixing rot. Call me the Rotmeister. No, I'm the
    Doctor. Don't call me the Rotmeister. Saving the world with meals on wheels.
    I'm the Doctor. Well, they call me the Doctor. I don't know why. I call me
    the Doctor too. I still don't know why.
  </P>
  <Ul>
    <Li>
      The way I see it, every life is a pile of good things and bad
      things.…hey.…the good things don't always soften the bad things; but
      vice-versa the bad things don't necessarily spoil the good things and make
      them unimportant.
    </Li>
    <Li>
      No, I'll fix it. I'm good at fixing rot. Call me the Rotmeister. No, I'm
      the Doctor. Don't call me the Rotmeister.
    </Li>
    <Li>Aw, you're all Mr. Grumpy Face today.</Li>
  </Ul>
  <P>
    I'm nobody's taxi service; I'm not gonna be there to catch you every time
    you feel like jumping out of a spaceship. All I've got to do is pass as an
    ordinary human being. Simple. What could possibly go wrong?
  </P>
  <P>
    You hit me with a cricket bat. Saving the world with meals on wheels. Did I
    mention we have comfy chairs? I hate yogurt. It's just stuff with bits in.
    Sorry, checking all the water in this area; there's an escaped fish.
  </P>
  <P>
    Saving the world with meals on wheels. The way I see it, every life is a
    pile of good things and bad things.…hey.…the good things don't always soften
    the bad things; but vice-versa the bad things don't necessarily spoil the
    good things and make them unimportant.
  </P>
</>;
```
