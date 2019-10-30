import React, { FC, useState, useEffect } from 'react';

import { Card, Container, Col, Icon, P, Row, Text } from '../../../../../src';

import { PACKS, COLORS } from './consts';
import { interactiveCard } from './styles';
import { loadIconModule } from './loadIconsModule';

export const IconBrowser: FC = () => {
  const [pack, setPack] = useState<keyof typeof PACKS>('feather');
  const [color, setColor] = useState<keyof typeof COLORS>('none');
  const [fw, setFw] = useState(false);
  const [inverted, setInverted] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const match = new RegExp(query, 'i');

  useEffect(() => {
    loadIconModule(pack);
    let intervalRate = 10;
    let to: NodeJS.Timeout;
    function awaitLoad() {
      to = setTimeout(() => {
        //@ts-ignore
        if (!window[pack] || window[pack].allIconNames.length === 0) {
          awaitLoad();
          intervalRate *= 2;
        } else {
          setLoading(false);
        }
      }, intervalRate);
    }

    awaitLoad();

    return () => {
      clearTimeout(to);
    };
  }, [pack]);

  return (
    <Text styleHtml>
      <Container fluid>
        <Row gutter={5}>
          <Col>
            <Card>
              <input
                type="text"
                value={query}
                onChange={ev => setQuery(ev.target.value)}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col>
            <Card>
              <P>
                <label htmlFor="pack">Icon Pack:</label>
                <br />
                <select
                  value={pack}
                  onChange={ev => {
                    setLoading(true);
                    //@ts-ignore
                    setPack(ev.target.value);
                  }}
                  name="pack"
                >
                  {Object.keys(PACKS).map(packName => (
                    <option key={packName} value={packName}>
                      {
                        //@ts-ignore
                        PACKS[packName]
                      }
                    </option>
                  ))}
                </select>
              </P>
            </Card>
          </Col>
          <Col>
            <Card>
              <P>
                <label htmlFor="color">Color:</label>
                <br />
                <select
                  value={color as string}
                  name="color"
                  onChange={ev => setColor(ev.target.value)}
                >
                  {Object.keys(COLORS).map(col => (
                    <option value={COLORS[col]} key={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </P>
            </Card>
          </Col>
          <Col>
            <Card>
              <P>
                <label>
                  <input type="checkbox" onChange={() => setFw(!fw)} />
                  FixedWidth
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setInverted(!inverted)}
                  />
                  Inverted
                </label>
              </P>
            </Card>
          </Col>
        </Row>
        <Row gutter={5} style={{ justifyContent: 'center' }}>
          {loading ? (
            <Text>Loading {pack}</Text>
          ) : (
            //@ts-ignore
            window[pack].allIconNames
              .filter((name: string) => name.match(match))
              .map((name: string) => (
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
                    <div style={{ textAlign: 'center' }}>
                      <Icon
                        fixedWidth={fw /*
                  //@ts-ignore */}
                        color={color /*
                  //@ts-ignore */}
                        icon={window[pack][name]}
                        size="3em"
                        inverted={inverted}
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
    </Text>
  );
};
