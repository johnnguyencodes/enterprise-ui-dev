// @vitest-environment jsdom

import PackingList from '.';
import { render, screen, waitFor } from 'test/utilities';

const renderPackingList = () => {
  const { user, getByText, getByLabelText, getByRole, getByTestId } = render(
    <PackingList />,
  );

  const h1Title = getByText('Packing List');
  const newItemInput = getByLabelText('New Item Name');
  const addNewItemButton = getByRole('button', { name: /add new item/i });
  const unpackedList = getByTestId('unpacked-items-list');

  return { user, h1Title, newItemInput, addNewItemButton, unpackedList };
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
  const { newItemInput } = renderPackingList();
  expect(newItemInput).toHaveValue('');
});

it('has a "Add New Item" button that is disabled when the input is empty', async () => {
  const { newItemInput, addNewItemButton } = renderPackingList();
  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user, newItemInput, addNewItemButton } = renderPackingList();
  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();

  await user.type(newItemInput, 'iPhone');
  expect(newItemInput).toHaveValue('iPhone');

  expect(addNewItemButton).not.toBeDisabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user, newItemInput, addNewItemButton, unpackedList } =
    renderPackingList();

  await user.type(newItemInput, 'Apple Watch');
  expect(newItemInput).toHaveValue('Apple Watch');

  await user.click(addNewItemButton);
  expect(unpackedList).toHaveTextContent('Apple Watch');
  expect(screen.getByLabelText('Apple Watch')).not.toBeChecked();
  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it('removes the item from the unpacked item list after it has been added', async () => {
  const { user, newItemInput, addNewItemButton, unpackedList } =
    renderPackingList();

  await user.type(newItemInput, 'iPad');
  await user.click(addNewItemButton);

  const removeItemButton = screen.getByRole('button', {
    name: /remove ipad/i,
  });
  await user.click(removeItemButton);

  await waitFor(() => expect(unpackedList).not.toHaveTextContent('iPad'));
});
