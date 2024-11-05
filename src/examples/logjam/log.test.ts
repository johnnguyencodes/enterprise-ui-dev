import { test, expect, vi } from 'vitest';
import { log } from './log';

test('it mocks the mock method', () => {
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

test('it spies on the log method', () => {
  const spy = vi.spyOn(console, 'log');

  log('log', 1, 2, 3);

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith(1, 2, 3);
});

test('the log method turns into a no-op', () => {
  // turn console.log into a no-op function that doesn't do anything, but we can still track how it's used
  const spyNoOp = vi.spyOn(console, 'log').mockImplementation(() => {});

  log('log', 1, 2, 3);

  expect(spyNoOp).toHaveBeenCalled();
  expect(spyNoOp).toHaveBeenCalledWith(1, 2, 3);
  expect(console.log).toHaveBeenCalledWith(1, 2, 3);
});

beforeEach(() => {
  // Define a mock for localStorage
  global.localStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  } as unknown as Storage;
});

afterEach(() => {
  // Clean up the mock after each test
  vi.restoreAllMocks();
});

test('it calls localStorage.setItem with the correct arguments', () => {
  // Spy on the setItem method of localStorage
  const spySetLocalStorage = vi.spyOn(localStorage, 'setItem');

  // Simulate the function that calls localStorage.setItem
  localStorage.setItem('key', 'value');

  // Check if the setItem method was called with the right arguments
  expect(spySetLocalStorage).toHaveBeenCalledWith('key', 'value');

  // Optionally restore the original method after spying
  spySetLocalStorage.mockRestore();
});

// Mocking third party libraries
// use the name of the library is the first argument
// Example of mocking Axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: {} })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));
