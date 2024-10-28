import { render } from 'test/utilities';
import { axe, toHaveNoViolations } from 'jest-axe';
import ObstacleCourse from '.';

const renderObstacleCourse = () => {
  const { user } = render(<ObstacleCourse />);
  return { user };
};

// extend expect with the toHaveNoViolations matcher
expect.extend(toHaveNoViolations);

it('should be accessible', async () => {
  const { debug, container } = render(<ObstacleCourse />);
  debug();

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});
