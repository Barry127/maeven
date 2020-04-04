import React, { FC, useState, useEffect } from 'react';
import { style } from 'typestyle';
import { search } from 'icon-packs/feather';
//@ts-ignore
import unpkg from 'require-unpkg';
import {
  MaevenIcon,
  Container,
  Row,
  Col,
  Card,
  P,
  MaevenDefault,
  Select,
  Text,
  TextInput,
  Icon
} from 'maeven';
import { IconProps } from 'maeven/components/Icon/Icon';

// no localStorage because icon-packs exceeds max size
unpkg.cache.set = function(k: string, v: any) {
  this.obj[k] = { content: v, timestamp: Date.now() };
};

export const IconBrowser: FC = () => {
  const [loading, setLoading] = useState(true);
  const [pack, setPack] = useState('feather');
  const [icons, setIcons] = useState<Pack>({});
  const [query, setQuery] = useState('');
  const [color, setColor] = useState('none');
  const [fw, setFw] = useState(false);

  const matcher = new RegExp(query, 'i');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    unpkg(`icon-packs/cjs/${pack}`).then((pack: Pack) => {
      if (cancelled) return;

      delete pack.VERSION;
      delete pack.allIconNames;
      setIcons(pack);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [pack]);

  return (
    <Container fluid>
      <Row gutter={1}>
        <Col>
          <TextInput
            icon={search}
            type="search"
            value={query}
            onChange={ev => setQuery(ev.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={1}>
        <Col>
          <Card>
            <label htmlFor="pack">Icon Pack:</label>
            <br />
            <Select
              value={pack}
              onChange={ev => setPack(ev.selectedItem?.value)}
              options={PACKS}
              renderItem={item => <>{item.text}</>}
              itemToString={item => item.text}
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <label htmlFor="color">Color:</label>
            <br />
            <Select
              value={color}
              onChange={ev => setColor(ev.selectedItem?.value)}
              options={COLORS}
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <P>
              <label>
                <input type="checkbox" onChange={() => setFw(!fw)} />
                FixedWidth
              </label>
            </P>
          </Card>
        </Col>
      </Row>
      <Row
        gutter={1}
        style={{
          justifyContent: 'center'
        }}
      >
        {loading ? (
          <Text>Loading {PACKS.find(p => p.value === pack)?.text}</Text>
        ) : (
          Object.entries(icons)
            .filter(([name]) => name.match(matcher))
            .map(([name, icon]) => (
              <Col
                key={name}
                style={{
                  flexGrow: 0,
                  width: '6em',
                  height: '6em',
                  position: 'relative'
                }}
              >
                <Card interactive className={interactiveCard}>
                  <div
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    <Icon
                      icon={icon}
                      fixedWidth={fw}
                      color={
                        color === 'none'
                          ? undefined
                          : ((color as any) as IconProps['color'])
                      }
                      size="3em"
                    />
                    <br />
                    <Text truncate>{name}</Text>
                  </div>
                </Card>
              </Col>
            ))
        )}
      </Row>
    </Container>
  );
};

const PACKS = [
  { value: 'ant', text: 'Ant Design Icons' },
  { value: 'blueprint', text: 'Blueprint Icons' },
  { value: 'bootstrap', text: 'Bootstrap Icons' },
  { value: 'clarity', text: 'Clarity Icons' },
  { value: 'devicons', text: 'Devicons' },
  { value: 'feather', text: 'Feather Icons' },
  { value: 'fa', text: 'Font Awsome Free' },
  { value: 'game', text: 'Game Icons' },
  { value: 'octicons', text: 'GitHub Octicons' },
  { value: 'ionicons', text: 'Ionicons' },
  { value: 'jam', text: 'JAM Icons' },
  { value: 'la', text: 'Line Awesome Icons' },
  { value: 'material', text: 'Material Icons' },
  { value: 'remix', text: 'Remix Icons' },
  { value: 'simple', text: 'Simple Icons' },
  { value: 'typicons', text: 'Typicons' },
  { value: 'weather', text: 'Weather Icons' }
];

const COLORS: { value: string }[] = [
  { value: 'none' },
  ...Object.keys(MaevenDefault.colors.name).reduce((map, colorName) => {
    return [...map, { value: colorName }];
  }, [] as { value: string }[]),
  ...Object.keys(MaevenDefault.colors.semantic).reduce((map, colorName) => {
    return [...map, { value: colorName }];
  }, [] as { value: string }[])
];

interface Pack {
  [name: string]: MaevenIcon;
}

export const interactiveCard = style({
  width: '6em',
  height: '6em',
  position: 'absolute',
  transition: makeTransitionFor([
    'boxShadow',
    'width',
    'height',
    'top',
    'left'
  ]),
  top: 0,
  left: 0,
  $nest: {
    '& > div': {
      transition: makeTransitionFor(['padding'])
    },
    '& > div > span:first-child': {
      transition: makeTransitionFor(['color', 'font-size'])
    },
    '&:focus': {
      zIndex: 2,
      width: '12em',
      height: '12em',
      top: '-3em',
      left: '-3em',
      background: 'white',
      $nest: {
        '& > div': {
          paddingTop: '1.5em'
        },
        '& > div > span:first-child': {
          fontSize: '5.5em'
        },
        '& > div > div:last-child': {
          marginTop: '.5em'
        }
      }
    }
  }
});

function makeTransitionFor(keys: string[]): string {
  return keys.map(key => `${key} .2s cubic-bezier(0.4,1,0.75,0.9)`).join(',');
}

interface Cache {
  [key: string]: any;
}
