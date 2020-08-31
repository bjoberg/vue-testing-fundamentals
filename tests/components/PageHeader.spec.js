import { render } from '@testing-library/vue';

import PageHeader from '../../src/components/PageHeader.vue';

describe('<PageHeader />', () => {
  describe('when title slot is provided', () => {
    const slots = {
      title: 'Test title'
    }
    let utils

    beforeEach(() => {
      utils = render(PageHeader, { slots })
    })

    test('should render title slot content', () => {
      expect(utils.getByText(slots.title)).toBeInTheDocument()
    })
  })

  describe('when title slot is not provided', () => {
    const slots = {
      title: 'Test title'
    }
    let utils

    beforeEach(() => {
      utils = render(PageHeader)
    })

    test('should not render title slot content', () => {
      expect(utils.queryByText(slots.title)).toBeNull()
    })
  })

  describe('when subtitle slot is provided', () => {
    const slots = {
      subtitle: 'This is the subtitle'
    }
    let utils

    beforeEach(() => {
      utils = render(PageHeader, { slots })
    })

    test('should render subtitle slot content', () => {
      expect(utils.getByText(slots.subtitle)).toBeInTheDocument()
    })
  })

  describe('when subtitle slot is not provided', () => {
    const slots = {
      subtitle: 'This is the subtitle'
    }
    let utils

    beforeEach(() => {
      utils = render(PageHeader)
    })

    test('should not render subtitle slot content', () => {
      expect(utils.queryByText(slots.subtitle)).toBeNull()
    })
  })
})
