import { shallowMount } from '@vue/test-utils'
import Countdown from '@/components/Countdown'

const factory = (values = {}) => {
  return shallowMount(Countdown, {
    data () {
      return {
        ...values
      }
    }
  })
}

describe('Countdown.vue', () => {
  const event = { preventDefault: () => {} }

  beforeEach(() => {
    jest.spyOn(event, 'preventDefault')
  })

  it('Countdown, check if timer initialized to the good value', () => {
    const wrapper = factory({
      displaySeconds: '00',
      displayMinutes: '00',
      timer: null
    })
    const textEndGame = wrapper.find('.time')
    expect(textEndGame.text()).toBe('00:00')
  })
})
