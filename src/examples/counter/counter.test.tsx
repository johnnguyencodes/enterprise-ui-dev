// @vitest-environment happy-dom

import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('should increment when the increment button is pressed', () => {
  // Render the Counter component
  render(<Counter />);

  // Get the current count element and the increment button
  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: /Increment/i });

  // Verify initial count is 0
  expect(currentCount).toHaveTextContent('0');

  // Click the increment button
  fireEvent.click(incrementButton);

  // Verify the count is now 1
  expect(currentCount).toHaveTextContent('1');
});
