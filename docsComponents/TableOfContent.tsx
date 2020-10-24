import throttle from 'lodash/throttle';
import { Block, Col, Li, Link, Ul } from 'maeven';
import { useRouter } from 'next/router';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import mdxHClasses from './mdx-h.module.scss';
import classes from './table-of-content.module.scss';

export const TableOfContent: FC = () => {
  const router = useRouter();
  const [anchors, setAnchors] = useState<AnchorList>([]);

  useEffect(() => {
    let anchors = document.querySelectorAll(`.${mdxHClasses.anchor}`);

    const setActive = throttle(() => {
      if (anchors.length === 0) return;
      let activeAnchor = anchors[0];
      let currentAnchor = activeAnchor;
      let i = 0;

      while (
        i < anchors.length &&
        currentAnchor.getBoundingClientRect().y < 0
      ) {
        activeAnchor = currentAnchor;
        i++;
        currentAnchor = anchors[i];
      }

      document
        .querySelectorAll(`.${classes.container} a`)
        .forEach((element) => element.classList.remove(classes.active));

      document
        .querySelector(
          `.${classes.container} a[href='#${activeAnchor.getAttribute('id')}']`
        )
        ?.classList.add(classes.active);
    }, 50);

    setTimeout(() => {
      setAnchors(makeAnchorList());
      anchors = document.querySelectorAll(`.${mdxHClasses.anchor}`);
    });

    window.addEventListener('scroll', setActive);

    return () => window.removeEventListener('scroll', setActive);
  }, [router.pathname]);

  return (
    <Col span={6} hidden={['md', 'sm', 'xs']}>
      <Block
        style={anchors?.length === 0 ? { display: 'none' } : {}}
        className={classes.container}
      >
        <List list={anchors} />
      </Block>
    </Col>
  );
};

const List: FC<{ list: AnchorList }> = ({ list }) => (
  <Ul>
    {list.map((item) => (
      <Li key={item.id}>
        <Link
          href={`#${item.id}`}
          onClick={(ev: MouseEvent<HTMLAnchorElement>) => scrollTo(ev, item.id)}
        >
          {item.text}
        </Link>
        {item.children && <List list={item.children} />}
      </Li>
    ))}
  </Ul>
);

function scrollTo(ev: MouseEvent<HTMLAnchorElement>, id: string) {
  ev.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function makeAnchorList(): AnchorList {
  const list: AnchorList = [];
  document.querySelectorAll(`.${mdxHClasses.anchor}`).forEach((anchor) => {
    const id = anchor.getAttribute('id')!;
    const text = anchor.parentElement?.innerText.slice(0, -1)!;
    const parentTagName = anchor.parentElement?.tagName;

    if (parentTagName === 'H2') {
      list.push({ id, text });
    }
    if (parentTagName === 'H3' && list.length > 0) {
      const listParent = list[list.length - 1];
      if (!listParent.children) listParent.children = [];
      listParent.children.push({ id, text });
    }
  });

  return list;
}

interface Anchor {
  id: string;
  text: string;
  children?: AnchorList;
}

type AnchorList = Anchor[];
