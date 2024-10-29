import { test, expect, vi } from 'vitest';

test('it spies on the multiply method', () => {
  const mock = vi.fn((x?: string) => {
    if (x) {
      return x.repeat(3);
    }
  });

  mock();
  mock();
  mock();
  const result = mock('wow');

  expect(mock).toHaveBeenLastCalledWith('wow');
  expect(mock).toHaveBeenCalledTimes(4);
  expect(result).toMatchInlineSnapshot(`"wowwowwow"`);
});
