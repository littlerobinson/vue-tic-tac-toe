import { mount } from '@vue/test-utils'
import Summary from '@/components/Summary'

describe('Summary.vue', () => {
  const event = { preventDefault: () => {} }

  beforeEach(() => {
    jest.spyOn(event, 'preventDefault')
  })

  it('Summary, check if we have the good props name', () => {
    const wrapper = mount(Summary, {
      propsData: {
        playerName: 'john'
      }
    })
    expect(wrapper.props().playerName).toBe('john')
  })

  it('Summary, check if we have the good sentence when player win', () => {
    const wrapper = mount(Summary, {
      propsData: {
        playerName: 'john'
      }
    })
    const textEndGame = wrapper.find('#text-end-game')
    expect(textEndGame.text()).toBe('Bravo ! vous avez gagné, john')
  })

  it('Summary, check if we have the good sentence when AI win', () => {
    const wrapper = mount(Summary, {
      propsData: {
        playerName: '' // playerName is empty when it s AI
      }
    })
    const textEndGame = wrapper.find('#text-end-game')
    expect(textEndGame.text()).toBe('Pas de chance, j’ai encore gagné')
  })
})
