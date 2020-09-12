import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event'

import mockTodoItems from '../__data__/TodoItems';
import Home from '../../src/pages/Home.vue';
import * as TodoService from "../../src/services/TodoService";

/**
 * when multiple todo items are added
 *    When todo item "checkbox" is clicked
 *        should render x todo items
 *        should render correct todo items
 *        should render todo items with correct completion state
 */

/**
 * Add a new todo item to the list.
 * 
 * @param {Object} testUtils testing library utils from rendered output
 * @param {String} value Text value of the new todo item
 */
const addTodoItem = async (testUtils, value) => {
  await userEvent.type(testUtils.getByPlaceholderText('Add new item'), value)
  await userEvent.click(testUtils.getByRole('button', { name: 'Add Item' }))
}

const removeTodoItem = async (removeBtn) => {
  await userEvent.click(removeBtn)
}

describe('<Home />', () => {
  const numRandomItemsToAdd = 3;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(TodoService, 'getRandomTodos').mockResolvedValue([])
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
      jest.spyOn(TodoService, 'getRandomTodos').mockImplementation(async () => {
        await new Promise((cb) => setTimeout(cb, 2000))
        return mockTodoItems
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

    describe('when todo items are received', () => {

      beforeEach(() => {
        jest.runAllTimers();
      })

      test(`should render "Add ${numRandomItemsToAdd} Random" button as enabled`, () => {
        const { getByRole } = utils
        expect(getByRole('button', { name: `Add ${numRandomItemsToAdd} Random` })).not.toBeDisabled();
      })

      test('should not render snackbar', () => {
        const { queryByText, queryByTestId } = utils
        expect(queryByTestId('snackbar')).toBeNull();
        expect(queryByText('Adding todos...')).toBeNull();
      })

      test(`should render ${mockTodoItems.length} todo items`, () => {
        const { queryAllByTestId } = utils
        expect(queryAllByTestId('todo-item').length).toEqual(mockTodoItems.length)
      })

      test('should render correct todo items', () => {
        const { queryByText } = utils
        mockTodoItems.forEach(item => {
          expect(queryByText(item.value)).not.toBeNull()
          expect(queryByText(item.value)).toBeInTheDocument()
        })
      })
    })
  })

  describe('when multiple todo items are added', () => {
    let utils
    const newTodos = ['New item 1', 'New item 2', 'New item 3']

    beforeEach(async () => {
      utils = render(Home);

      await addTodoItem(utils, newTodos[0]);
      await addTodoItem(utils, newTodos[1]);
      await addTodoItem(utils, newTodos[2]);
    })

    test(`should render ${newTodos.length} todo items`, () => {
      expect(utils.queryAllByTestId('todo-item').length).toEqual(newTodos.length)
    })

    test('should render correct todo items', () => {
      const { queryByText } = utils
      newTodos.forEach(item => {
        expect(queryByText(item)).not.toBeNull()
        expect(queryByText(item)).toBeInTheDocument()
      })
    })

    describe('when todo item "remove" button is clicked', () => {
      const indexToRemove = 1;

      beforeEach(async () => {
        const todoItemRemoveBtns = utils.queryAllByRole('button', { name: 'Remove' })
        await removeTodoItem(todoItemRemoveBtns[indexToRemove])
      })

      test(`should render ${newTodos.length - 1} todo items`, () => {
        const { queryAllByTestId } = utils
        const expectedNumTodos = newTodos.length - 1
        expect(queryAllByTestId('todo-item').length).toEqual(expectedNumTodos)
      })

      test('should render correct todo items', () => {
        const { queryByText } = utils
        newTodos.forEach((item, index) => {
          if (index !== indexToRemove) {
            expect(queryByText(item)).not.toBeNull()
            expect(queryByText(item)).toBeInTheDocument()
          } else {
            expect(queryByText(item)).toBeNull()
            expect(queryByText(item)).not.toBeInTheDocument()
          }
        })
      })
    })

    describe('when todo item "completed" checkbox is clicked', () => {
      let todoItemCompletedCheckboxes;
      const indexToComplete = 1;

      beforeEach(async () => {
        todoItemCompletedCheckboxes = utils.queryAllByRole('checkbox')
        await userEvent.click(todoItemCompletedCheckboxes[indexToComplete])
      })

      test('should render todo item as completed', () => {
        expect(todoItemCompletedCheckboxes[indexToComplete]).toBeChecked();
      })

      describe('when todo item "completed" checkbox is clicked again', () => {
        beforeEach(async () => {
          todoItemCompletedCheckboxes = utils.queryAllByRole('checkbox')
          await userEvent.click(todoItemCompletedCheckboxes[indexToComplete])
        })

        test('should render todo item as not completed', () => {
          expect(todoItemCompletedCheckboxes[indexToComplete]).not.toBeChecked();
        })
      })
    })
  })
})