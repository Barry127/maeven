import '@testing-library/jest-dom/extend-expect';

import { createModalContainer, removeModalContainer, toggleBlur } from './dom';
import { classes } from './styles';

describe('createModalContainer', () => {
  it('creates a div element in the body and returns it', () => {
    const before = Array.from(document.body.children);

    const modalContainer = createModalContainer();

    const after = Array.from(document.body.children);

    expect(after).toHaveLength(before.length + 1);
    expect(after).toContain(modalContainer);
    expect(before).not.toContain(modalContainer);

    removeModalContainer(modalContainer);
  });
});

describe('removeModalContainer', () => {
  it('removes given div element from the body', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    const before = Array.from(document.body.children);

    removeModalContainer(element);

    const after = Array.from(document.body.children);

    expect(after).toHaveLength(before.length - 1);
    expect(before).toContain(element);
    expect(after).not.toContain(element);
  });
});

describe('toggleBlur', () => {
  const el1 = document.createElement('div');
  const el2 = document.createElement('div');
  const modalContainer = document.createElement('div');

  beforeAll(() => {
    document.body.appendChild(el1);
    document.body.appendChild(el2);
    document.body.appendChild(modalContainer);
  });

  afterAll(() => {
    document.body.removeChild(el1);
    document.body.removeChild(el2);
    document.body.removeChild(modalContainer);
  });

  it('Adds blurAnimation and blurred classes to all elements except modal container', () => {
    expect(el1).not.toHaveClass(classes.blurAnimation);
    expect(el2).not.toHaveClass(classes.blurAnimation);
    expect(modalContainer).not.toHaveClass(classes.blurAnimation);
    expect(el1).not.toHaveClass(classes.blurred);
    expect(el2).not.toHaveClass(classes.blurred);
    expect(modalContainer).not.toHaveClass(classes.blurred);

    toggleBlur(true, modalContainer);

    expect(el1).toHaveClass(classes.blurAnimation);
    expect(el2).toHaveClass(classes.blurAnimation);
    expect(modalContainer).not.toHaveClass(classes.blurAnimation);
    expect(el1).toHaveClass(classes.blurred);
    expect(el2).toHaveClass(classes.blurred);
    expect(modalContainer).not.toHaveClass(classes.blurred);
  });

  it('Adds blurAnimation and not blurred class when isOpen is false', () => {
    toggleBlur(true, modalContainer);
    toggleBlur(false, modalContainer);

    expect(el1).toHaveClass(classes.blurAnimation);
    expect(el2).toHaveClass(classes.blurAnimation);
    expect(modalContainer).not.toHaveClass(classes.blurAnimation);
    expect(el1).not.toHaveClass(classes.blurred);
    expect(el2).not.toHaveClass(classes.blurred);
    expect(modalContainer).not.toHaveClass(classes.blurred);
  });
});
