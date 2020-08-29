import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event'

import AddItemForm from '../../src/components/AddItemForm.vue';

describe('<AddItemForm />', () => {
  const componentIdentifier = "add-item-form"

  test('should render input label', () => {
    const { getByText } = render(AddItemForm)
    expect(getByText('New item:')).toBeInTheDocument()
  })

  test('should render input element', () => {
    const { getByRole } = render(AddItemForm)
    const name = `${componentIdentifier}_input`
    expect(getByRole('textbox', { name })).toBeInTheDocument()
  })

  test('should render submit button', () => {
    const { getByRole } = render(AddItemForm)
    const name = "Add"
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
      const { getByRole } = render(AddItemForm, { listeners })
      input = getByRole('textbox', { name: `${componentIdentifier}_input` })
      button = getByRole('button', { name: 'Add' })
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
    })
  })
})
