import { mergeRefs } from './mergeRefs';

it('merges object and functional refs', () => {
  const refValue = 'HTMLElement';

  const objectRef = { current: null };
  const functionRef = jest.fn();

  const handleRefs = mergeRefs(objectRef, functionRef, null, undefined);

  //@ts-ignore
  handleRefs(refValue);

  expect(objectRef.current).toBe(refValue);
  expect(functionRef.mock.calls.length).toBe(1);
  expect(functionRef.mock.calls[0][0]).toBe(refValue);
});
