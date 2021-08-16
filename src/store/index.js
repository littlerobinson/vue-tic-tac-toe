import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gameMode: 'vs',
    player1: '',
    player2: '',
    canAccessToGame: false

  },
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

export default store
