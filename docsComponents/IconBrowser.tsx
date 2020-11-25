import { search } from 'icon-packs/feather';
import {
  Alert,
  Block,
  Card,
  Col,
  Form,
  Icon,
  Row,
  Select,
  SelectOnchangeEvent,
  Spinner,
  TextInput,
  Toggle
} from 'maeven';
import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
//@ts-ignore
import unpkg from 'require-unpkg';
import { Color, MaevenIcon } from 'src/types';
import classes from './icon-browser.module.scss';

// no localStorage because icon-packs exceeds max size
unpkg.cache.set = function (k: string, v: any) {
  this.obj[k] = { content: v, timestamp: Date.now() };
};

const noSubmit = (ev: FormEvent) => {
  ev.preventDefault();
};

export const IconBrowser: FC = () => {
  const [loading, setLoading] = useState(true);
  const [pack, setPack] = useState('feather');
  const [icons, setIcons] = useState<Pack>({});
  const [query, setQuery] = useState('');
  const [color, setColor] = useState<Color | 'none'>('none');
  const [fw, setFw] = useState(false);

  const matcher = new RegExp(query, 'i');

  const onChangePack = useCallback((ev: SelectOnchangeEvent) => {
    setPack(ev.selectedItem?.value);
  }, []);
  const onChangeColor = useCallback(
    (ev: SelectOnchangeEvent<Color | 'none'>) => {
      setColor(ev.selectedItem?.value!);
    },
    []
  );

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

  const filteredIcons = Object.entries(icons).filter(([name]) =>
    name.match(matcher)
  );

  return (
    <>
      <div className={classes.controls}>
        <Row gutter={1}>
          <Col>
            <TextInput
              icon={search}
              onChange={(ev) => setQuery(ev.target.value)}
              type="search"
              value={query}
            />
          </Col>
        </Row>
        <Row gutter={1}>
          <Col span={8}>
            <Card>
              <Form layout="vertical" onSubmit={noSubmit}>
                <Select
                  initialValue={{ value: 'feather' }}
                  itemToString={(item) => item.text}
                  label="Icon Pack:"
                  onChange={onChangePack}
                  options={PACKS}
                  renderItem={(item) => item.text}
                />
              </Form>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Form layout="vertical" onSubmit={noSubmit}>
                <Select
                  initialValue={{ value: color }}
                  label="Color:"
                  onChange={onChangeColor}
                  options={COLORS}
                />
              </Form>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Form layout="vertical" onSubmit={noSubmit}>
                <Toggle
                  checked={fw}
                  onChange={() => setFw(!fw)}
                  label="Fixed Width:"
                >
                  {fw ? 'On' : 'Off'}
                </Toggle>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
      <Row gutter={1} style={{ justifyContent: 'center' }}>
        {loading ? (
          <Spinner
            color="primary"
            text={`Loading ${PACKS.find((p) => p.value === pack)?.text}`}
          />
        ) : filteredIcons.length === 0 ? (
          <Alert closable={false}>
            No icons with "<code>{query}</code>" found.
          </Alert>
        ) : (
          filteredIcons.map(([name, icon]) => (
            <Col key={name} className={classes.col}>
              <Card interactive className={classes.card}>
                <Block className={classes['icon-container']}>
                  <Icon
                    className={classes.icon}
                    color={color === 'none' ? undefined : color}
                    fixedWidth={fw}
                    icon={icon}
                    size="3em"
                  />
                </Block>
                <Block className={classes.name}>{name}</Block>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

const PACKS = [
  { value: 'ant', text: 'Ant Design Icons' },
  { value: 'blueprint', text: 'Blueprint Icons' },
  { value: 'bootstrap', text: 'Bootstrap Icons' },
  { value: 'clarity', text: 'Clarity Icons' },
  { value: 'devicons', text: 'Devicons' },
  { value: 'feather', text: 'Feather Icons' },
  { value: 'fa', text: 'Font Awesome Free' },
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

const COLORS: { value: Color | 'none' }[] = [
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
