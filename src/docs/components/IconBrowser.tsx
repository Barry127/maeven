import React, { FC, useState, useEffect } from 'react';
import { style } from 'typestyle';
//@ts-ignore
import unpkg from 'require-unpkg';
import {
  MaevenIcon,
  Container,
  Row,
  Col,
  P,
  MaevenDefault,
  Text,
  Icon
} from 'maeven';
import { IconProps } from 'maeven/components/Icon/Icon';

export const IconBrowser: FC = () => {
  const [loading, setLoading] = useState(true);
  const [pack, setPack] = useState<keyof typeof PACKS>('feather');
  const [icons, setIcons] = useState<Pack>({});
  const [query, setQuery] = useState('');
  const [color, setColor] = useState<keyof typeof COLORS>('none');
  const [fw, setFw] = useState(false);
  const [inverted, setInverted] = useState(false);

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
          <input
            type="search"
            value={query}
            onChange={ev => setQuery(ev.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={1}>
        <Col>
          <P>
            <label htmlFor="pack">Icon Pack:</label>
            <br />
            <select
              value={pack}
              onChange={ev => {
                setPack(ev.target.value as keyof typeof PACKS);
              }}
              name="pack"
            >
              {Object.keys(PACKS).map(packName => (
                <option key={packName} value={packName}>
                  {PACKS[packName as keyof typeof PACKS]}
                </option>
              ))}
            </select>
          </P>
        </Col>
        <Col>
          <P>
            <label htmlFor="color">Color:</label>
            <br />
            <select
              value={color as string}
              name="color"
              onChange={ev => setColor(ev.target.value)}
            >
              {Object.keys(COLORS).map(col => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </P>
        </Col>
        <Col>
          <P>
            <label>
              <input type="checkbox" onChange={() => setFw(!fw)} />
              FixedWidth
            </label>
            <br />
            <label>
              <input type="checkbox" onChange={() => setInverted(!inverted)} />
              Inverted
            </label>
          </P>
        </Col>
      </Row>
      <Row
        gutter={1}
        style={{
          justifyContent: 'center'
        }}
      >
        {loading ? (
          <Text>Loading {PACKS[pack]}</Text>
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
                <div className={interactiveCard}>
                  <div
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    <Icon
                      icon={icon}
                      fixedWidth={fw}
                      color={COLORS[color] as IconProps['color']}
                      size="3em"
                      inverted={inverted}
                    />
                    <br />
                    <Text truncate>{name}</Text>
                  </div>
                </div>
              </Col>
            ))
        )}
      </Row>
    </Container>
  );
};

const PACKS = {
  ant: 'Ant Design Icons',
  blueprint: 'Blueprint Icons',
  clarity: 'Clarity Icons',
  devicons: 'Devicons',
  feather: 'Feather Icons',
  fa: 'Font Awsome Free',
  game: 'Game Icons',
  octicons: 'GitHub Octicons',
  ionicons: 'Ionicons',
  material: 'Material Icons',
  remix: 'Remix Icons',
  simple: 'Simple Icons',
  typicons: 'Typicons',
  weather: 'Weather Icons'
};

const COLORS = {
  none: undefined,
  ...Object.keys(MaevenDefault.colors.name).reduce((map, colorName) => {
    map[colorName] = colorName;
    return map;
  }, {} as any),
  ...Object.keys(MaevenDefault.colors.semantic).reduce((map, colorName) => {
    map[colorName] = colorName;
    return map;
  }, {} as any)
};

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
