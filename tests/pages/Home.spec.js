import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event'

import MockTodoItems from '../__data__/TodoItems';
import Home from '../../src/pages/Home.vue';
import * as TodoService from "../../src/services/TodoService";
/** 
 * when 'Add x Random' button is clicked
 *    should render 'Add x Random' button as disabled
 *    should render snackbar
 *    when action is complete
 *      should not render snackbar
 *      should render 'Add x Random' button as enabled
 *      should render 'x' number of todo items
 */


//  TODO Mock the service request

describe('<Home />', () => {
  let getRandomTodosMock;
  const numRandomItemsToAdd = 3;

  beforeEach(() => {
    jest.useFakeTimers();
    getRandomTodosMock = jest.spyOn(TodoService, 'getRandomTodos').mockResolvedValue([])
  })

  test('should render title', () => {
    const { getByRole } = render(Home);
    expect(getByRole('heading', { name: 'Things I Need To Do' })).toBeInTheDocument()
  })

  test('should render subtitle', () => {
    const { getByRole } = render(Home);
    expect(getByRole('heading', { name: 'Add items to your list using the textbox below.' })).toBeInTheDocument()
  })

  test(`should render "Add ${numRandomItemsToAdd} Random" button`, () => {
    const { getByRole } = render(Home);
    expect(getByRole('button', { name: `Add ${numRandomItemsToAdd} Random` })).toBeInTheDocument()
  })

  test('should render AddItemForm', () => {
    const { queryByTestId } = render(Home);
    const addItemForm = queryByTestId('add-item-form');
    expect(addItemForm).not.toBeNull();
    expect(addItemForm).toBeInTheDocument();
  })

  // Careful ... this could be a false positive ... should I add a test for the test id in child
  test('should render 0 todo items', () => {
    const { queryAllByTestId } = render(Home);
    expect(queryAllByTestId('todo-item').length).toEqual(0);
  })

  // Careful ... this could be a false positive ... should I add a test for the test id in child
  test('should not render snackbar', () => {
    const { queryByTestId } = render(Home);
    expect(queryByTestId('snackbar')).toBeNull();
    expect(queryByTestId('snackbar')).not.toBeInTheDocument();
  })

  describe(`when "Add ${numRandomItemsToAdd} Random" button is clicked`, () => {
    let utils

    beforeEach(() => {
      getRandomTodosMock = jest.spyOn(TodoService, 'getRandomTodos').mockImplementation(async () => {
        await new Promise((cb) => setTimeout(cb, 2000))
        return MockTodoItems
      })
      utils = render(Home);
      userEvent.click(utils.getByRole('button', { name: `Add ${numRandomItemsToAdd} Random` }))
    })

    test(`should render "Add ${numRandomItemsToAdd} Random" button as disabled`, () => {
      const { getByRole } = utils
      expect(getByRole('button', { name: `Add ${numRandomItemsToAdd} Random` })).toBeDisabled();
    })

    test('should render snackbar', () => {
      const { queryByTestId } = utils
      expect(queryByTestId('snackbar')).not.toBeNull();
    })

    test('should render correct snackbar text', () => {
      const { queryByText } = utils
      expect(queryByText('Adding todos...')).not.toBeNull();
    })

    describe('when request finishes', () => {
      beforeEach(() => {
        jest.runAllTimers();
      })
      test('fail', () => {
        const { debug } = utils
        debug()
        expect(false).toEqual(true)
      })
    })
  })
})