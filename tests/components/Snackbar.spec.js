import { render } from '@testing-library/vue';

import Snackbar from '../../src/components/Snackbar.vue';

describe('<Snackbar />', () => {
  describe('when not open', () => {
    test('should not render snackbar', () => {
      const { queryByTestId } = render(Snackbar);
      expect(queryByTestId('snackbar')).not.toBeInTheDocument()
    })
  })

  describe('when open', () => {
    const propsData = { open: true };
    const defaultText = "Loading..."

    test('should render snackbar', () => {
      const { queryByTestId } = render(Snackbar, { propsData });
      expect(queryByTestId('snackbar')).toBeInTheDocument()
    })

    test('should render default snackbar content', () => {
      const { queryByText } = render(Snackbar, { propsData });
      expect(queryByText(defaultText)).toBeInTheDocument()
    })

    describe('when slot is provided', () => {
      const slots = { default: "Snackbar test" }

      test('should render provided slot content', () => {
        const { queryByText } = render(Snackbar, { propsData, slots });
        expect(queryByText(defaultText)).not.toBeInTheDocument()
        expect(queryByText(slots.default)).toBeInTheDocument()
      })
    })
  })
})