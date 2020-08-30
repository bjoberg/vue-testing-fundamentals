import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event'

import AddItemForm from '../../src/components/AddItemForm.vue';

describe('<AddItemForm />', () => {

  test('should render input element', () => {
    const { getByPlaceholderText } = render(AddItemForm)
    expect(getByPlaceholderText('Add new item')).toBeInTheDocument()
  })

  test('should render submit button', () => {
    const { getByRole } = render(AddItemForm)
    const name = "Add Item"
    expect(getByRole('button', { name })).toBeInTheDocument()
  })

  describe('when user inputs text into the input field', () => {
    const inputValue = "Test todo item"
    const listeners = {
      'on-add': jest.fn()
    }
    let input
    let button

    beforeEach(() => {
      const { getByRole, getByPlaceholderText } = render(AddItemForm, { listeners })
      input = getByPlaceholderText('Add new item')
      button = getByRole('button', { name: 'Add Item' })
      userEvent.type(input, inputValue)
    })

    test('submit button should not be disabled', () => {
      expect(button).not.toBeDisabled();
    })

    describe('when user clicks submit button', () => {
      beforeEach(() => {
        userEvent.click(button)
      })

      test('should call "submit" handler', () => {
        expect(listeners['on-add'].mock.calls.length).toEqual(1)
      })

      test('should call "submit" handler with correct params', () => {
        expect(listeners['on-add'].mock.calls[0][0]).toEqual(inputValue)
      })

      test('should clear input value', () => {
        expect(input.value).toEqual("")
      })

      test('should set submit button to disabled', () => {
        expect(button).toBeDisabled()
      })
    })
  })

  describe('when user does not input text into the input field', () => {
    const listeners = {
      'on-add': jest.fn()
    }
    let button

    beforeEach(() => {
      const { getByRole } = render(AddItemForm, { listeners })
      button = getByRole('button', { name: 'Add Item' })
    })

    test('submit button should be disabled', () => {
      expect(button).toBeDisabled();
    })

    describe('when user clicks submit button', () => {
      beforeEach(() => {
        userEvent.click(button)
      })

      test('should not call "submit" handler', () => {
        expect(listeners['on-add'].mock.calls.length).toEqual(0)
      })
    })
  })
})
