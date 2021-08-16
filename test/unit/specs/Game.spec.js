import Vue from 'vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Notifications from 'vue-notification'
import Game from '@/components/Game'

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

  return shallowMount(Game, {
    data () {
      return {
        ...values
      }
    },
    store,
    localVue
  })
}

describe('Game.vue', () => {
  const event = { preventDefault: () => {} }

  beforeEach(() => {
    jest.spyOn(event, 'preventDefault')
  })

  it('Game check at the begining if it\'s the turn of the player 1', () => {
    // restitute component with init data
    const wrapper = factory({
      player1Name: 'player1',
      player2Name: 'player2',
      playersEntries: [null, null, null, null, null, null, null, null, null],
      nbEntries: 0,
      winnerName: null
    })
    expect(wrapper.vm.playerInGame).toEqual('player1')
  })

  it('Game check if on the second turn it s player 2 turn', () => {
    // restitute component with init data
    const wrapper = factory({
      player1Name: 'player1',
      player2Name: 'player2',
      playersEntries: ['player1', null, null, null, null, null, null, null, null],
      nbEntries: 1,
      winnerName: null
    })
    expect(wrapper.vm.playerInGame).toEqual('player2')
  })

  it('Game check if on the second turn against Ai it s AI turn', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: 'ai',
      player1Name: 'player1',
      player2Name: '',
      playersEntries: ['player1', null, null, null, null, null, null, null, null],
      nbEntries: 1,
      winnerName: null
    })
    expect(wrapper.vm.isAiToPlay).toEqual(true)
  })

  it('Game check if against AI with only one free square, the function radom take the good one', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: 'ai',
      player1Name: 'player1',
      player2Name: '',
      playersEntries: ['player1', null, 'player1', '', 'player1', 'player1', '', 'player1', ''],
      nbEntries: 8,
      winnerName: null
    })
    expect(wrapper.vm.randomFreeSquare()).toEqual(1)
  })

  it('Game check when player 2 select a free square', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: 'vs',
      player1Name: 'player1',
      player2Name: 'player2',
      playersEntries: ['player1', null, null, null, null, null, null, null, null],
      nbEntries: 1,
      winnerName: null
    })
    wrapper.vm.addEntry(1)
    expect(wrapper.vm.playersEntries).toEqual(['player1', 'player2', null, null, null, null, null, null, null])
  })

  it('Game check when player 2 select a not free square', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: 'vs',
      player1Name: 'player1',
      player2Name: 'player2',
      playersEntries: ['player1', null, null, null, null, null, null, null, null],
      nbEntries: 1,
      winnerName: null
    })
    wrapper.vm.addEntry(0)
    expect(wrapper.vm.playersEntries).toEqual(['player1', null, null, null, null, null, null, null, null])
  })

/* TODO : pb with timer
  it('Game check when player 1 select a free square and win', () => {
    // restitute component with init data
    const wrapper = factory({
      gameMode: 'vs',
      player1Name: 'player1',
      player2Name: 'player2',
      playersEntries: ['player1', 'player2', null, 'player1', 'player2', null, null, null, null],
      nbEntries: 4,
      winnerName: null
    })
    wrapper.vm.addEntry(6)
    expect(wrapper.vm.winnerName).toEqual('player1')
  })
*/
})
