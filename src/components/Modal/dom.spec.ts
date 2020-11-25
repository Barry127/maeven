import '@testing-library/jest-dom/extend-expect';

import { createModalContainer, removeModalContainer } from './dom';

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

  it('does nothing when element is null', () => {
    removeModalContainer(null);
  });
});
