// @vitest-environment happy-dom

import Counter from '.';
import { render } from './test/utilities';

test('it should render the component', () => {
  const { debug } = render(<Counter />);
  debug();
});

test('should increment when the increment button is pressed', async () => {
  const { user, getByTestId, getByRole } = render(<Counter />);

  // Get the current count element and the increment button
  const currentCount = getByTestId('current-count');
  const incrementButton = getByRole('button', { name: /Increment/i });

  // Verify initial count is 0
  expect(currentCount).toHaveTextContent('0');

  // Click the increment button
  await user.click(incrementButton);

  // Verify the count is now 1
  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  // render component and set initial count
  const { getByTestId } = render(<Counter initialCount={4000} />);

  expect(getByTestId('current-count')).toHaveTextContent('4000');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  // render component and pull out user
  const { user, getByRole, getByTestId } = render(
    <Counter initialCount={4000} />,
  );

  // Verify initial count is 4000
  expect(getByTestId('current-count')).toHaveTextContent('4000');

  // Click the reset button
  await user.click(getByRole('button', { name: /Reset/i }));

  // Verify the count is now 0
  expect(getByTestId('current-count')).toHaveTextContent('0');
});
