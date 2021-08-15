import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Notifications from 'vue-notification'
import Intro from '@/components/Intro'

Vue.use(Notifications)

// Get the Data from the component object in a factory
const factory = (values = {}) => {
  return shallowMount(Intro, {
    data () {
      return {
        ...values
      }
    }
  })
}

describe('Intro.vue', () => {
  it('should render correct contents with the correct message', () => {
    const Constructor = Vue.extend(Intro)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#step-choose-game-mode h3').textContent)
      .toEqual('Choisissez votre mode de jeu')
  })

  it('Check if the game mode section is visible on initialization', () => {
    // restitute component with init data
    const wrapper = factory()
    expect(wrapper.vm.isVisible).toEqual(true)
  })

  it('Check if the game mode section is visible on initializationwith 2 buttons', () => {
    // restitute component with init data
    const wrapper = factory()
    const gameModeSection = wrapper.find('#step-choose-game-mode')
    expect(gameModeSection.element.id).toBe('step-choose-game-mode')
    expect(gameModeSection.findAll('.btn').length).toEqual(2)
  })

  it('Check if the type game contains the 2 inputs diplayed in vs game mode', () => {
    // restitute component with init data
    const wrapper = factory({gameMode: 'vs'})
    const typeGameSection = wrapper.find('#step-player-info')
    expect(typeGameSection.find('.input-player-1').isVisible()).toBe(true)
    expect(typeGameSection.find('.input-player-2').isVisible()).toBe(true)
  })

  it('Check if the type game contains 1 input diplayed in ai game mode', () => {
    // restitute component with init data
    const wrapper = factory({gameMode: 'ai'})
    const typeGameSection = wrapper.find('#step-player-info')
    expect(typeGameSection.find('.input-player-1').isVisible()).toBe(true)
    expect(typeGameSection.find('.input-player-2').isVisible()).toBe(false)
  })

  it('Check if the type game contain a validation button', () => {
    // restitute component with init data
    const wrapper = factory({gameMode: 'vs'})
    const typeGameSection = wrapper.find('#step-player-info')
    expect(typeGameSection.element.id).toBe('step-player-info')
    expect(typeGameSection.findAll('.btn').length).toEqual(1)
  })

  it('Check if the type game contains 1 input in vs game mode', () => {
    // restitute component with init data
    const wrapper = factory()
    const gameModeSection = wrapper.find('#step-choose-game-mode')
    expect(gameModeSection.element.id).toBe('step-choose-game-mode')
    expect(gameModeSection.findAll('.btn').length).toEqual(2)
  })

  it('Check if the computed method is equal to false on default components values', () => {
    // restitute component with init data
    const wrapper = factory()

    expect(wrapper.vm.isChooseGameMode).toEqual(false)
  })

  it('Check if the computed value is true with a good gamMode value', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({gameMode: 'vs'})
    expect(wrapper.vm.isChooseGameMode).toEqual(true)
  })

  it('Check if the computed value is false with a wrong gamMode value', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({gameMode: 'wrongValue'})
    expect(wrapper.vm.isChooseGameMode).toEqual(false)
  })

  it('Check the method to verify if players are created in vs gameMode with no nicknplayer nicknames', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({gameMode: 'vs'})
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(false)
  })

  it('Check the method to verify if players are created in vs gameMode with only one player nickname', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({gameMode: 'vs', player1: 'player1'})
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(false)
  })

  it('Check the method to verify if players are created in vs gameMode with 2 player nicknames ok', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({gameMode: 'vs', player1: 'player1', player2: 'player2'})
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(true)
  })

  it('Check the method to verify if players are created in ai gameMode with no player nickname', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({gameMode: 'ai'})
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(false)
  })

  it('Check the method to verify if players are created in ai gameMode with player nickname ok', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({gameMode: 'ai', player1: 'player1', player2: ''})
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(true)
  })

  it('Check the method to verify if players are created in wrong gameMode', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({gameMode: 'wrongGameMode', player1: 'player1', player2: 'player2'})
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(false)
  })
})
