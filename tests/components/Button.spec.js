import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import Button from '../../src/components/Button.vue';

describe('<Button />', () => {
  describe('when slot is provided', () => {
    const slots = { default: 'Test Button' }

    test('should render button with provided slot content', () => {
      const { getByRole } = render(Button, { slots });
      expect(getByRole('button', { name: slots.default })).toBeInTheDocument()
    })
  })

  describe('when slot is not provided', () => {
    test('should render button with default slot content', () => {
      const { getByRole } = render(Button);
      expect(getByRole('button', { name: "Button" })).toBeInTheDocument()
    })
  })

  describe('when variant is not provided', () => {
    const slots = { default: 'Test Button' }

    test('should render button with primary class', () => {
      const { getByRole } = render(Button, { slots });
      expect(getByRole('button', { name: slots.default })).toHaveClass('primary_btn')
    })
  })

  describe('when variant is provided', () => {
    const slots = { default: 'Test Button' }

    describe('when variant is "primary"', () => {
      const propsData = { variant: "primary" };

      test('should render button with primary class', () => {
        const { getByRole } = render(Button, { slots, propsData });
        expect(getByRole('button', { name: slots.default })).toHaveClass('primary_btn')
      })
    })

    describe('when variant is "secondary"', () => {
      const propsData = { variant: "secondary" };

      test('should render button with secondary class', () => {
        const { getByRole } = render(Button, { slots, propsData });
        expect(getByRole('button', { name: slots.default })).toHaveClass('secondary_btn')
      })
    })

    describe('when variant is "error"', () => {
      const propsData = { variant: "error" };

      test('should render button with error class', () => {
        const { getByRole } = render(Button, { slots, propsData });
        expect(getByRole('button', { name: slots.default })).toHaveClass('error_btn')
      })
    })

    describe('when variant is "other"', () => {
      const propsData = { variant: "other" };

      test('should render button with primary class', () => {
        const { getByRole } = render(Button, { slots, propsData });
        expect(getByRole('button', { name: slots.default })).toHaveClass('primary_btn')
      })
    })
  })

  describe('when button is disabled', () => {
    const listeners = { "on-click": jest.fn() }
    const propsData = { isDisabled: true }
    const slots = { default: 'Test button' }
    let utils;

    beforeEach(() => {
      utils = render(Button, { propsData, listeners, slots })
    })

    test('should render button as disabled', () => {
      expect(utils.getByRole('button', { name: slots.default })).toBeDisabled();
    })

    describe('when button is clicked', () => {
      beforeEach(() => {
        userEvent.type(utils.getByRole('button', { name: slots.default }))
      })

      test('should not emit click event', () => {
        expect(listeners["on-click"].mock.calls.length).toEqual(0)
      })
    })
  })

  describe('when button is not disabled', () => {
    const listeners = { "on-click": jest.fn() }
    const propsData = { isDisabled: false }
    const slots = { default: 'Test button' }
    let utils;

    beforeEach(() => {
      utils = render(Button, { propsData, listeners, slots })
    })

    test('should render button as not disabled', () => {
      expect(utils.getByRole('button', { name: slots.default })).not.toBeDisabled();
    })

    describe('when button is clicked', () => {
      beforeEach(() => {
        userEvent.type(utils.getByRole('button', { name: slots.default }))
      })

      test('should emit click event', () => {
        expect(listeners["on-click"].mock.calls.length).toEqual(1)
      })
    })
  })
})