import { render, fireEvent } from '@testing-library/vue';
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
    const submitHandlerMock = jest.fn()
    const listeners = {
      'on-add': submitHandlerMock
    }
    let input
    let button

    beforeEach(() => {
      const { getByRole, getByPlaceholderText } = render(AddItemForm, { listeners })
      input = getByPlaceholderText('Add new item')
      button = getByRole('button', { name: 'Add Item' })
      userEvent.type(input, inputValue)
    })

    describe('when user clicks add button', () => {
      beforeEach(() => {
        fireEvent.click(button)
      })

      test('should call "submit" handler', () => {
        expect(submitHandlerMock.mock.calls.length).toEqual(1)
      })

      test('should call "submit" handler with correct params', () => {
        expect(submitHandlerMock.mock.calls[0][0]).toEqual(inputValue)
      })

      test('should clear input value', () => {
        expect(input.value).toEqual("")
      })
    })
  })
})
