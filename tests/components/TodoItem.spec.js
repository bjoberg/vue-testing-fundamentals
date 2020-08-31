import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event'

import TodoItem from '../../src/components/TodoItem.vue';

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

    test('should render remove button as enabled', () => {
      const { getByRole } = render(TodoItem, { propsData })
      expect(getByRole('button', { name: "Remove" })).toBeEnabled()
    })

    test('should render content paragraph', () => {
      const { getByText } = render(TodoItem, { propsData })
      expect(getByText(value)).toBeInTheDocument()
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
