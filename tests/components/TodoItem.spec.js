import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event'

import TodoItem from '../../src/components/TodoItem.vue';

/**
 * when item is not complete
 *    should render checkbox as not checked
 *    should render checkbox as enabled
 *    should render edit button as enabled
 *    should render remove button as enabled
 *    should render content text
 *    should not render content input
 *    when checkbox is clicked
 *        should call "toggleComplete" handler
 *        should call "toggleComplete" handler with correct params 
 *    when edit button is clicked
 *        should render checkbox as disabled
 *        should render save button
 *        should not render edit button
 *        should render remove button as disabled
 *        should render content input
 *        should render content input with correct value
 *        should not render content text
 *        // TODO: When user inputs text?
 *        when save button is clicked
 *            should render content text
 *            should not render content input
 *            should render checkbox as enabled
 *            should render edit button
 *            should render remove button as enabled
 *            should call "edit" handler
 *            should call "edit" handler with correct params
 *        when remove button is clicked
 *            should not call "remove" handler
 *    when remove button is clicked
 *        should call "remove" handler
 *        should call "remove" handler with correct params
 */

describe('<TodoItem />', () => {
  describe('when item is complete', () => {
    const id = Date.now();
    const value = "Test todo item"
    const isComplete = true;
    const propsData = { id, value, isComplete }

    test('should render checkbox as checked', () => {
      const { getByRole } = render(TodoItem, { propsData })
      expect(getByRole('checkbox')).toBeChecked()
    })

    test('should render checkbox as enabled', () => {
      const { getByRole } = render(TodoItem, { propsData })
      expect(getByRole('checkbox')).toBeEnabled()
    })

    test('should render edit button as disabled', () => {
      const { getByRole } = render(TodoItem, { propsData })
      expect(getByRole('button', { name: "Edit" })).toBeDisabled()
    })

    test('should render remove button as enabled', () => {
      const { getByRole } = render(TodoItem, { propsData })
      expect(getByRole('button', { name: "Remove" })).toBeEnabled()
    })

    test('should render content paragraph', () => {
      const { getByText } = render(TodoItem, { propsData })
      expect(getByText(value)).toBeInTheDocument()
    })

    test('should not render content input', () => {
      const { queryByRole } = render(TodoItem, { propsData })
      expect(queryByRole("textbox")).toBeNull()
    })

    describe('when checkbox is clicked', () => {
      const listeners = {
        "on-toggle-complete": jest.fn()
      }
      let utils

      beforeEach(() => {
        utils = render(TodoItem, { propsData, listeners })
        userEvent.click(utils.getByRole('checkbox'))
      })

      test('should call "toggleComplete" handler', () => {
        expect(listeners['on-toggle-complete'].mock.calls.length).toEqual(1)
      })

      test('should call "toggleComplete" handler with correct params', () => {
        expect(listeners['on-toggle-complete'].mock.calls[0][0]).toEqual(id)
      })
    })

    describe('when edit button is clicked', () => {
      const listeners = {
        "on-edit": jest.fn()
      }
      let utils

      beforeEach(() => {
        utils = render(TodoItem, { propsData, listeners })
        userEvent.click(utils.getByRole('button', { name: "Edit" }))
      })

      test('should not call "edit" handler', () => {
        expect(listeners['on-edit'].mock.calls.length).toEqual(0)
      })
    })

    describe('when remove button is clicked', () => {
      const listeners = {
        "on-remove": jest.fn()
      }
      let utils

      beforeEach(() => {
        utils = render(TodoItem, { propsData, listeners })
        userEvent.click(utils.getByRole('button', { name: "Remove" }))
      })

      test('should call "remove" handler', () => {
        expect(listeners['on-remove'].mock.calls.length).toEqual(1)
      })

      test('should call "remove" handler with correct params', () => {
        expect(listeners['on-remove'].mock.calls[0][0]).toEqual(id)
      })
    })
  })

  describe('when item is not complete', () => {
    const id = Date.now();
    const value = "Test todo item"
    const isComplete = false;
    const propsData = { id, value, isComplete }

    test('should render checkbox as not checked', () => {
      const { getByRole } = render(TodoItem, { propsData })
      expect(getByRole('checkbox')).not.toBeChecked()
    })

    test('should render checkbox as enabled', () => {
      const { getByRole } = render(TodoItem, { propsData })
      expect(getByRole('checkbox')).toBeEnabled()
    })

    test('should render edit button as enabled', () => {
      const { getByRole } = render(TodoItem, { propsData })
      expect(getByRole('button', { name: "Edit" })).toBeEnabled()
    })

    test('should render remove button as enabled', () => {
      const { getByRole } = render(TodoItem, { propsData })
      expect(getByRole('button', { name: "Remove" })).toBeEnabled()
    })

    test('should render content paragraph', () => {
      const { getByText } = render(TodoItem, { propsData })
      expect(getByText(value)).toBeInTheDocument()
    })

    test('should not render content input', () => {
      const { queryByRole } = render(TodoItem, { propsData })
      expect(queryByRole("textbox")).toBeNull()
    })

    describe('when checkbox is clicked', () => {
      const listeners = {
        "on-toggle-complete": jest.fn()
      }
      let utils

      beforeEach(() => {
        utils = render(TodoItem, { propsData, listeners })
        userEvent.click(utils.getByRole('checkbox'))
      })

      test('should call "toggleComplete" handler', () => {
        expect(listeners['on-toggle-complete'].mock.calls.length).toEqual(1)
      })

      test('should call "toggleComplete" handler with correct params', () => {
        expect(listeners['on-toggle-complete'].mock.calls[0][0]).toEqual(id)
      })
    })

    describe('when edit button is clicked', () => {
      const listeners = {
        "on-edit": jest.fn(),
        "on-toggle-complete": jest.fn(),
        "on-remove": jest.fn()
      }
      let utils

      beforeEach(() => {
        utils = render(TodoItem, { propsData, listeners })
        userEvent.click(utils.getByRole('button', { name: "Edit" }))
      })

      test('should render checkbox as disabled', () => {
        expect(utils.getByRole('checkbox')).toBeDisabled()
      })

      test('should not render content paragraph', async () => {
        expect(utils.queryByText(value)).toBeNull()
      })

      test('should render content input', () => {
        expect(utils.getByRole("textbox")).toBeInTheDocument()
      })

      test('should render content input with correct value', () => {
        expect(utils.getByRole("textbox")).toHaveValue(value)
      })

      test('should render save button as enabled', () => {
        expect(utils.getByRole("button", { name: 'Save' })).toBeEnabled()
      })

      test('should not render edit button', () => {
        expect(utils.queryByRole("button", { name: 'Edit' })).toBeNull()
      })

      test('should render remove button as disabled', () => {
        expect(utils.getByRole("button", { name: 'Remove' })).toBeDisabled()
      })

      describe('when checkbox is clicked', () => {
        beforeEach(() => {
          userEvent.click(utils.getByRole('checkbox'))
        })

        test('should not call "toggleComplete" handler', () => {
          expect(listeners['on-toggle-complete'].mock.calls.length).toEqual(0)
        })
      })

      describe('when remove button is clicked', () => {
        beforeEach(() => {
          userEvent.click(utils.getByRole('button', { name: "Remove" }))
        })

        test('should not call "remove" handler', () => {
          expect(listeners['on-remove'].mock.calls.length).toEqual(0)
        })
      })
    })

    describe('when remove button is clicked', () => {
      const listeners = {
        "on-remove": jest.fn()
      }
      let utils

      beforeEach(() => {
        utils = render(TodoItem, { propsData, listeners })
        userEvent.click(utils.getByRole('button', { name: "Remove" }))
      })

      test('should call "remove" handler', () => {
        expect(listeners['on-remove'].mock.calls.length).toEqual(1)
      })

      test('should call "remove" handler with correct params', () => {
        expect(listeners['on-remove'].mock.calls[0][0]).toEqual(id)
      })
    })
  })
})
