// @vitest-environment happy-dom

import { screen } from '@testing-library/react';
import Counter from '.';
import { render } from './test/utilities';

test('it should render the component', () => {
  render(<Counter />);
});

test('should increment when the increment button is pressed', async () => {
  const { user } = render(<Counter />);

  // Get the current count element and the increment button
  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: /Increment/i });

  // Verify initial count is 0
  expect(currentCount).toHaveTextContent('0');

  // Click the increment button
  await user.click(incrementButton);

  // Verify the count is now 1
  expect(currentCount).toHaveTextContent('1');
});
