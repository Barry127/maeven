/**
 * @jest-environment node
 */

import { createModalContainer } from './dom';

describe('createModalContainer', () => {
  it('returns null on server', () => {
    const modalContainer = createModalContainer();

    expect(modalContainer).toBe(null);
  });
});
