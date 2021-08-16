import Vue from 'vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Notifications from 'vue-notification'
import Intro from '@/components/Intro'

Vue.use(Notifications)

const localVue = createLocalVue()

localVue.use(Vuex)

// Get the Data from the component object in a factory
const factory = (values = {}) => {
  let store = new Vuex.Store({
    state: values,
    mutations: {
      setGameMode (state, gameMode) {
        state.gameMode = gameMode
      },
      setPlayer1 (state, player1) {
        state.player1 = player1
      },
      setPlayer2 (state, player2) {
        state.player2 = player2
      },
      setCanAccessToGame (state, canAccessToGame) {
        state.canAccessToGame = canAccessToGame
      }
    },
    actions: {
      setGameMode (context, gameMode) {
        context.commit('setGameMode', gameMode)
      },
      setPlayer1 (context, player1) {
        context.commit('setPlayer1', player1)
      },
      setPlayer2 (context, player2) {
        context.commit('setPlayer2', player2)
      },
      setCanAccessToGame (context, canAccessToGame) {
        context.commit('setCanAccessToGame', canAccessToGame)
      }
    }
  })

  return shallowMount(Intro, {
    data () {
      return {
        ...values
      }
    },
    store,
    localVue
  })
}

describe('Intro.vue', () => {
  const event = { preventDefault: () => {} }

  beforeEach(() => {
    jest.spyOn(event, 'preventDefault')
  })

  it('Intro if the game mode section is visible on initialization', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: '',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    expect(wrapper.vm.isVisible).toEqual(true)
  })

  it('Intro if the game mode section is visible on initializationwith 2 buttons', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: '',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    const gameModeSection = wrapper.find('#step-choose-game-mode')
    expect(gameModeSection.element.id).toBe('step-choose-game-mode')
    expect(gameModeSection.findAll('.btn').length).toEqual(2)
  })

  it('Intro if the type game contains the 2 inputs diplayed in vs game mode', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: 'vs',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    const typeGameSection = wrapper.find('#step-player-info')
    expect(typeGameSection.find('.input-player-1').isVisible()).toBe(true)
    expect(typeGameSection.find('.input-player-2').isVisible()).toBe(true)
  })

  it('Intro if the type game contains 1 input diplayed in ai game mode', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: 'ai',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    const typeGameSection = wrapper.find('#step-player-info')
    expect(typeGameSection.find('.input-player-1').isVisible()).toBe(true)
    expect(typeGameSection.find('.input-player-2').isVisible()).toBe(false)
  })

  it('Intro if the type game vs, contain a validation button', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: 'vs',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    const typeGameSection = wrapper.find('#step-player-info')
    expect(typeGameSection.element.id).toBe('step-player-info')
    expect(typeGameSection.findAll('.btn').length).toEqual(1)
  })

  it('Intro if the type game contains 1 input in vs game mode', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: 'vs',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    const gameModeSection = wrapper.find('#step-choose-game-mode')
    expect(gameModeSection.element.id).toBe('step-choose-game-mode')
    expect(gameModeSection.findAll('.btn').length).toEqual(2)
  })

  it('Intro if the computed method is equal to false on default components values', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: '',
      player1: '',
      player2: '',
      canAccessToGame: false
    })

    expect(wrapper.vm.isChooseGameMode).toEqual(false)
  })

  it('Intro if the computed value is true with a good gamMode value', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({
      gameMode: 'vs',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    expect(wrapper.vm.isChooseGameMode).toEqual(true)
  })

  it('Intro if the computed value is false with a wrong gamMode value', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({
      gameMode: 'wrongValue',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    expect(wrapper.vm.isChooseGameMode).toEqual(false)
  })

  it('Intro the method to verify if players are created in vs gameMode with no player nicknames', () => {
    // restitute component with gameMode = vs
    jest.spyOn(event, 'preventDefault')
    const wrapper = factory({
      gameMode: 'vs',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(false)
  })

  it('Intro the method to verify if players are created in vs gameMode with only one player nickname', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({
      gameMode: 'vs',
      player1: 'player1',
      player2: '',
      canAccessToGame: false
    })
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(false)
  })

  it('Intro the method to verify if players are created in ai gameMode with no player nickname', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({
      gameMode: 'ai',
      player1: '',
      player2: '',
      canAccessToGame: false
    })
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(false)
  })

  it('Intro the method to verify if players are created in wrong gameMode', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({
      gameMode: 'wrongGameMode',
      player1: 'player1',
      player2: 'player2',
      canAccessToGame: false
    })
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(false)
  })
  // TODO : test don t work cause of the router
/*
  it('Intro the method to verify if players are created in ai gameMode with player nickname ok', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({
      gameMode: 'ai',
      player1: 'player1',
      player2: '',
      canAccessToGame: false
    })
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(true)
  })

  it('Intro the method to verify if players are created in vs gameMode with 2 player nicknames ok', () => {
    // restitute component with gameMode = vs
    const wrapper = factory({
      gameMode: 'vs',
      player1: 'player1',
      player2: 'player2',
      canAccessToGame: false
    })
    wrapper.vm.checkTypeGameForm()
    expect(wrapper.vm.isPlayersCreated).toEqual(true)
  })
*/
})
