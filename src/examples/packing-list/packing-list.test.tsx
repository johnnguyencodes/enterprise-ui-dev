// @vitest-environment jsdom

import PackingList from '.';
import { render, waitFor } from 'test/utilities';

const renderPackingList = () => {
  const { user, getByText, getByLabelText, getByRole, getByTestId } = render(
    <PackingList />,
  );
  const h1Title = getByText('Packing List');

  const inputField = getByLabelText('New Item Name');
  const addButton = getByRole('button', { name: /add new item/i });
  const unpackedList = getByTestId('unpacked-items-list');

  return { user, h1Title, inputField, addButton, unpackedList };
};

it('renders the Packing List application', () => {
  const { debug } = render(<PackingList />);
  debug();
});

it('has the correct title', () => {
  const { h1Title } = renderPackingList();
  expect(h1Title).toHaveTextContent('Packing List');
});

it('has an input field for a new item', () => {
  const { inputField } = renderPackingList();
  expect(inputField).toHaveValue('');
});

it('has a "Add New Item" button that is disabled when the input is empty', async () => {
  const { inputField, addButton } = renderPackingList();
  expect(inputField).toHaveValue('');
  expect(addButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user, inputField, addButton } = renderPackingList();
  expect(inputField).toHaveValue('');
  expect(addButton).toBeDisabled();

  await user.type(inputField, 'Macbook Pro');
  expect(inputField).toHaveValue('Macbook Pro');

  expect(addButton).not.toBeDisabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user, inputField, addButton, unpackedList } = renderPackingList();

  await user.type(inputField, 'Macbook Pro');
  expect(inputField).toHaveValue('Macbook Pro');

  await user.click(addButton);
  expect(unpackedList).toHaveTextContent('Macbook Pro');
});
