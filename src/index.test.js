import reactReduxTestUtils from '.';

test('output', () => {
  expect(reactReduxTestUtils('🐰')).toBe('🐰');
  expect(reactReduxTestUtils()).toBe('No args passed!');
});
