// @vitest-environment happy-dom

import Counter from '.';
import { render } from './test/utilities';

const setup = (initialCount = 0) => {
  const { user, getByRole, getByTestId } = render(
    <Counter initialCount={initialCount} />,
  );
  const incrementButton = getByRole('button', { name: /increment/i });
  const resetButton = getByRole('button', { name: /reset/i });
  const currentCount = getByTestId('current-count');
  return { user, incrementButton, resetButton, currentCount };
};

test('it should render the component', () => {
  const { debug } = render(<Counter />);
  debug();
});

test('should increment when the increment button is pressed', async () => {
  const { user, currentCount, incrementButton } = setup(0);

  // Verify initial count is 0
  expect(currentCount).toHaveTextContent('0');

  // Click the increment button
  await user.click(incrementButton);

  // Verify the count is now 1
  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  const { currentCount } = setup(4000);

  expect(currentCount).toHaveTextContent('4000');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user, currentCount, resetButton } = setup(4000);

  // Verify initial count is 4000
  expect(currentCount).toHaveTextContent('4000');

  // Click the reset button
  await user.click(resetButton);

  // Verify the count is now 0
  expect(currentCount).toHaveTextContent('0');
});
