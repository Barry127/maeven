import React, { FC, useState, useEffect, useCallback } from 'react';
import { search } from 'icon-packs/feather';
//@ts-ignore
import unpkg from 'require-unpkg';
import {
  MaevenIcon,
  Container,
  Row,
  Col,
  Card,
  Select,
  Text,
  TextInput,
  Checkbox,
  Icon
} from 'maeven';
import { IconProps } from 'maeven/components/Icon/Icon';

import './icon-browser.scss';

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

  const onChangePack = useCallback(ev => setPack(ev.selectedItem?.value), []);
  const onChangeColor = useCallback(ev => setColor(ev.selectedItem?.value), []);

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
    <Container fluid className="docs-icon-browser">
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
              onChange={onChangePack}
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
            <Select value={color} onChange={onChangeColor} options={COLORS} />
          </Card>
        </Col>
        <Col>
          <Card>
            <Checkbox onChange={() => setFw(!fw)} checked={fw}>
              FixedWidth
            </Checkbox>
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
                <Card interactive className="docs-interactive-card">
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
  { value: 'black' },
  { value: 'white' },
  { value: 'darkGrey' },
  { value: 'grey' },
  { value: 'lightGrey' },
  { value: 'red' },
  { value: 'orange' },
  { value: 'yellow' },
  { value: 'green' },
  { value: 'teal' },
  { value: 'blue' },
  { value: 'indigo' },
  { value: 'pink' },
  { value: 'primary' },
  { value: 'success' },
  { value: 'warning' },
  { value: 'danger' }
];

interface Pack {
  [name: string]: MaevenIcon;
}

interface Cache {
  [key: string]: any;
}
