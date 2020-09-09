import { render } from '@testing-library/vue';

import Snackbar from '../../src/components/Snackbar.vue';

describe('<Snackbar />', () => {
  describe('when not open', () => {
    const propsData = { open: false };

    test('should render snackbar', () => {
      const { queryByText } = render(Snackbar, { propsData });
      expect(queryByText('Loading...')).toBeNull()
    })
  })

  describe('when open', () => {
    const propsData = { open: true };

    test('should render snackbar', () => {
      const { queryByText } = render(Snackbar, { propsData });
      expect(queryByText('Loading...')).toBeInTheDocument()
    })

    describe('when slot is provided', () => {
      const slots = { default: "Snackbar test" }

      test('should render provided slot content', () => {
        const { queryByText } = render(Snackbar, { propsData, slots });
        expect(queryByText('Loading...')).not.toBeInTheDocument()
        expect(queryByText(slots.default)).toBeInTheDocument()
      })
    })
  })
})